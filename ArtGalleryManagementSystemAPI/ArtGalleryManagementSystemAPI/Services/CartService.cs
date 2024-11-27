using ArtGalleryManagementSystemAPI.Dtos;

namespace ArtGalleryManagementSystemAPI.Services;

public interface CartService
{
    public CartDto FindById(int id);
    public CartItemDto FindByProId(int id);

    public bool AddProductToCart(CartItemDto cartItemDto);
    public bool UpdateProductInCart(CartItemDto cartItemDto);
    public List<CartItemDto> FindAllCartItem(int id);
    public bool DeleteItem(int id);
    public bool DeleteAllItem(int cartId);
    public bool CreateOrder(OrderDetailDto orderDetailDto, List<OrderItemDto> orderItems);
    public List<OrderDetailDto> FindAllOrder(int id);

}
