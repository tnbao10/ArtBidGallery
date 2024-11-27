using ArtGalleryManagementSystemAPI.Dtos;
using ArtGalleryManagementSystemAPI.HubConfig;
using ArtGalleryManagementSystemAPI.Models;
using ArtGalleryManagementSystemAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

//cau hinh auto mapper
builder.Services.AddAutoMapper(typeof(MappingDto));

builder.Services.AddControllers();
//ket noi database
string connectionString = builder.Configuration["ConnectionStrings:DefaultConnection"].ToString();
builder.Services.AddDbContext<DatabaseContext>(option => option.UseLazyLoadingProxies().UseSqlServer(connectionString));
builder.Services.AddScoped<UserService, UserServiceImpl>();
builder.Services.AddScoped<AddressService, AddressServiceImpl>();
builder.Services.AddScoped<ProductService, ProductServiceImpl>();
builder.Services.AddScoped<AdminService, AdminServiceImpl>();
builder.Services.AddScoped<CartService, CartServiceImpl>();
builder.Services.AddScoped<WishLishService, WishListServiceImpl>();
builder.Services.AddScoped<PayPalService, PayPalServiceImpl>();
builder.Services.AddScoped<AuctionService, AuctionServiceImpl>();


builder.Services.AddSignalR(
    options =>
    {
        options.EnableDetailedErrors = true;
    }
);


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseRouting();



app.MapPost("/createpayment", ([FromBody] IEnumerable<ItemDto> items, IConfiguration configuration, HttpContext context) =>
{
    var base_url = context.Request.Host.Value;
    return new PayPalServiceImpl(configuration).CreatePayment(items, base_url);
});
app.MapPost("/executepayment", ([FromBody] ExecutePaymentDto dto, IConfiguration configuration) =>
{
    return new PayPalServiceImpl(configuration).ExecutePayment(dto);
});

app.UseCors(builder => builder
                .AllowAnyHeader()
                .AllowAnyMethod()
                .SetIsOriginAllowed((host) => true)
                .AllowCredentials()
            );

app.UseStaticFiles();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<MyHub>("/toastr");

});

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action}");

app.Run();