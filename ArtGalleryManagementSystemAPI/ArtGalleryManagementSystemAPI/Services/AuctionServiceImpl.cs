using ArtGalleryManagementSystemAPI.Dtos;
using ArtGalleryManagementSystemAPI.Models;
using AutoMapper;
using System.Diagnostics;
using System.Text;

namespace ArtGalleryManagementSystemAPI.Services;

public class AuctionServiceImpl : AuctionService
{
    private DatabaseContext db;
    private IMapper mapper;
    private ProductService productService;
    public AuctionServiceImpl(DatabaseContext _db, IMapper _mapper, ProductService _productService)
    {
        db = _db;
        mapper = _mapper;
        productService = _productService;
    }

    public bool AddBidOrder(List<ProductWithSellerDto> bidlist, BidOrderDto bidinfo)
    {
        var bidorder = mapper.Map<BidOrder>(bidinfo);
        bidorder.BidStamp = Encoding.UTF8.GetBytes("0000000000");
        foreach (var pro in bidlist)
        {
            bidorder.ProductId = pro.Id;
            db.BidOrders.Add(bidorder);
            if (db.SaveChanges() > 0)
            {
                var product = db.Products.Find(pro.Id);
                product.Type = 4;
                db.Entry(product).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            }
        }
        return db.SaveChanges() > 0;
    }

    public bool AddBidOrderUser(BidOrderUserDto bidorderuserdto)
    {
        var bidOrderUser = mapper.Map<BidOrderUser>(bidorderuserdto);
        db.BidOrderUsers.Add(bidOrderUser);
        return db.SaveChanges() > 0;
    }

    public bool AuctionToProduct(int id)
    {
        var product = db.Products.Find(id);
        if (product != null)
        {
            product.Type = 1;
        }
        db.Entry(product).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        return db.SaveChanges() > 0;
    }

    public bool AuctionToProductCancle(int id)
    {
        var product = db.Products.Find(id);
        if (product != null)
        {
            product.DeletedAt = DateTime.Now;
        }
        db.Entry(product).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        return db.SaveChanges() > 0;
    }

    public List<BidOrderUserDto> FindAllBidOrderUserById(int id)
    {
        return mapper.Map<List<BidOrderUserDto>>(db.BidOrderUsers.Where(b => b.BidOrderUserId == id).ToList());
    }

    public List<BidOrderDto> FindAllValidAuction()
    {
        var validBidOrders = new List<BidOrderDto>();
        var bidOrders = db.BidOrders;
        foreach (var bidOrder in bidOrders)
        {
            Debug.WriteLine("byte to int:" + BitConverter.ToInt64(bidOrder.BidStamp));
            Debug.WriteLine(BitConverter.ToString(bidOrder.BidStamp));
            byte[] bytes = BitConverter.ToString(bidOrder.BidStamp).Split('-').Select(hex => Convert.ToByte(hex, 16)).ToArray();
            Debug.WriteLine(BitConverter.ToInt32(bytes, 1));

            if (BitConverter.ToInt32(bytes, 0) < 1)
            {

                validBidOrders.Add(mapper.Map<BidOrderDto>(bidOrder));
            }
        }
        return validBidOrders;
    }

    public BidOrderDto FindAuctionById(int id)
    {
        return mapper.Map<BidOrderDto>(db.BidOrders.Find(id));
    }

    public bool RejectAuction(int id)
    {
        var product = db.Products.Find(id);
        if (product != null)
        {
            product.Type = 3;
        }
        db.Entry(product).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        return db.SaveChanges() > 0;
    }

    public bool UpdateBidOrder(BidOrderDto bidOrderDto)
    {
        var bidOrder = db.BidOrders.Find(bidOrderDto.Id);
        bidOrder.BidStamp = bidOrderDto.BidStamp;
        db.Entry(bidOrder).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        return db.SaveChanges() > 0;
    }
}
