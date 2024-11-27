using ArtGalleryManagementSystemAPI.Dtos;
using ArtGalleryManagementSystemAPI.Models;
using AutoMapper;

namespace ArtGalleryManagementSystemAPI.Services;

public class CartServiceImpl : CartService
{
    private DatabaseContext db;
    private IMapper mapper;
    public CartServiceImpl(DatabaseContext _db, IMapper _mapper)
    {
        db = _db;
        mapper = _mapper;
    }

    public bool AddProductToCart(CartItemDto cartItemDto)
    {
        var cartItem = mapper.Map<CartItem>(cartItemDto);
        cartItem.CreatedAt = DateTime.Now;
        db.CartItems.Add(cartItem);
        if (db.SaveChanges() > 0)
        {
            var cartItemProduct = new CartItemProduct();
            cartItemProduct.ProductsId = (int)cartItem.ProductId;
            cartItemProduct.CartItemProductId = (int)cartItem.Id;
            db.CartItemProducts.Add(cartItemProduct);
        }
        return db.SaveChanges() > 0;
    }

    public bool CreateOrder(OrderDetailDto orderDetailDto, List<OrderItemDto> orderItems)
    {
        var orderDetail = mapper.Map<OrderDetail>(orderDetailDto);
        db.OrderDetails.Add(orderDetail);
        if (db.SaveChanges() > 0)
        {
            foreach (var item in orderItems)
            {
                var product = db.Products.Find(item.ProductId);
                product.Quantity -= item.Quantity;
                db.Entry(product).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();
                item.CreatedAt = orderDetailDto.CreatedAt;
                item.OrderId = orderDetail.Id;
                var orderItem = mapper.Map<OrderItem>(item);
                db.OrderItems.Add(orderItem);
                if (db.SaveChanges() > 0)
                {
                    var OrderItems_Product = new OrderItemProduct();
                    OrderItems_Product.ProductsId = (int)orderItem.ProductId;
                    OrderItems_Product.OrderItemProductId = (int)orderItem.Id;
                    db.OrderItemProducts.Add(OrderItems_Product);
                    if (db.SaveChanges() > 0)
                    {
                        var cartItems = FindAllCartItem((int)orderDetail.UserId);
                        foreach (var cartItem in cartItems)
                        {
                            var cartItem_product = db.CartItemProducts.SingleOrDefault(i => i.ProductsId == orderItem.ProductId && i.CartItemProductId == cartItem.Id);
                            if (cartItem_product != null)
                            {
                                db.CartItemProducts.Remove(cartItem_product);
                                if (db.SaveChanges() > 0)
                                {
                                    var ci = db.CartItems.SingleOrDefault(i => i.ProductId == orderItem.ProductId && i.Id == cartItem.Id);
                                    db.CartItems.Remove(ci);
                                }
                            }
                        }
                    }
                }

            }
        }
        return db.SaveChanges() > 0;
    }

    public bool DeleteAllItem(int cartId)
    {

        var item = db.CartItems.Where(c => c.CartId == cartId).ToList();
        var cartproduct = db.CartItemProducts.Where(c => c.CartItemProductNavigation.CartId == cartId).ToList();
        db.CartItemProducts.RemoveRange(cartproduct);
        db.CartItems.RemoveRange(item);
        return db.SaveChanges() > 0;
    }

    public bool DeleteItem(int id)
    {
        var item = db.CartItems.Find(id);
        var cartproduct = db.CartItemProducts.SingleOrDefault(c => c.CartItemProductId == id);
        db.CartItemProducts.Remove(cartproduct);
        db.CartItems.Remove(item);
        return db.SaveChanges() > 0;
    }

    public List<CartItemDto> FindAllCartItem(int id)
    {
        return mapper.Map<List<CartItemDto>>(db.CartItems.Where(c => c.CartId == id).ToList());
    }

    public List<OrderDetailDto> FindAllOrder(int id)
    {
        return mapper.Map<List<OrderDetailDto>>(db.OrderDetails.Where(p => p.UserId == id).SelectMany(od => od.OrderItems, (od, oi) => new OrderDetailDto()
        {
            ProductName = oi.OrderItemProducts.Select(op => op.Products.Name).FirstOrDefault(),
            ProductImage = oi.OrderItemProducts.Select(op => op.Products.Image).FirstOrDefault(),
            ProductPrice = oi.OrderItemProducts.Select(op => op.Products.Price).FirstOrDefault(),
            ProductQuantity = oi.Quantity,
            SellerName = oi.OrderItemProducts.Select(op => op.Products.Seller.IdNavigation.Username).FirstOrDefault(),
            SellerAvatar = oi.OrderItemProducts.Select(op => op.Products.Seller.IdNavigation.Avatar).FirstOrDefault(),
            CreatedAt = oi.CreatedAt.ToString("dd-MM-yyyy HH:mm:ss"),
            ProductId = (int)oi.ProductId
        }).ToList());
    }

    public CartDto FindById(int id)
    {
        return mapper.Map<CartDto>(db.Carts.Find(id));
    }

    public CartItemDto FindByProId(int id)
    {
        return mapper.Map<CartItemDto>(db.CartItems.SingleOrDefault(src => src.ProductId == id));
    }

    public bool UpdateProductInCart(CartItemDto cartItemDto)
    {
        var item = db.CartItems.SingleOrDefault(i => i.ProductId == cartItemDto.ProductId && i.CartId == cartItemDto.CartId);
        if (item != null)
        {
            item.Quantity += cartItemDto.Quantity;
            db.Entry(item).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            return db.SaveChanges() > 0;
        }
        else { return false; }

    }
}
