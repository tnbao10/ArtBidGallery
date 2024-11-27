using ArtGalleryManagementSystemAPI.HubModels;
using ArtGalleryManagementSystemAPI.Models;
using Microsoft.AspNetCore.SignalR;

namespace ArtGalleryManagementSystemAPI.HubConfig;

public partial class MyHub : Hub
{
    //2Tutorial
    private readonly DatabaseContext ctx;

    public MyHub(DatabaseContext context)
    {
        ctx = context;
    }

    //4Tutorial(Tắt trình duyệt hoặc ngắt kết nối Internet)
    public override Task OnDisconnectedAsync(Exception exception)
    {
        int currUserId = ctx.Connections.Where(c => c.SignalrId == Context.ConnectionId).Select(c => c.UserId).SingleOrDefault();
        ctx.Connections.RemoveRange(ctx.Connections.Where(p => p.UserId == currUserId).ToList());
        ctx.SaveChanges();
        Clients.Others.SendAsync("userOff", currUserId);
        return base.OnDisconnectedAsync(exception);
    }



    //2Tutorial
    public async Task authMe(PersonInfo personInfo)
    {
        string currSignalrID = Context.ConnectionId;
        User tempPerson = ctx.Users.Where(u => u.Email == personInfo.email).SingleOrDefault();

        if (tempPerson != null)
        {
            bool isPasswordCorrect = false;

            // Kiểm tra nếu đăng nhập bằng Google thì bỏ qua bước xác thực mật khẩu
            if (string.IsNullOrEmpty(personInfo.password) || personInfo.password == "GoogleLogin")
            {
                isPasswordCorrect = true; // Cho phép bỏ qua xác thực mật khẩu
            }
            else
            {
                // Nếu không đăng nhập bằng Google thì thực hiện xác thực mật khẩu
                isPasswordCorrect = BCrypt.Net.BCrypt.Verify(personInfo.password, tempPerson.Password);
            }

            if (isPasswordCorrect)
            {
                // Xóa các kết nối cũ của người dùng trước khi thêm kết nối mới
                var oldConnections = ctx.Connections.Where(c => c.UserId == tempPerson.Id);
                ctx.Connections.RemoveRange(oldConnections);

                // Thêm kết nối mới
                Connection currUser = new Connection
                {
                    UserId = tempPerson.Id,
                    SignalrId = currSignalrID,
                    TimeStamp = DateTime.Now
                };
                await ctx.Connections.AddAsync(currUser);
                await ctx.SaveChangesAsync();

                Userr newUser = new Userr(tempPerson.Id, tempPerson.Username, tempPerson.Avatar, currSignalrID);
                await Clients.Caller.SendAsync("authMeResponseSuccess", newUser);
                await Clients.Others.SendAsync("userOn", newUser);
            }
            else
            {
                await Clients.Caller.SendAsync("authMeResponseFail");
            }
        }
        else
        {
            await Clients.Caller.SendAsync("authMeResponseFail");
        }
    }






    //3Tutorial
    public async Task reauthMe(int personId)
    {
        string currSignalrID = Context.ConnectionId;
        User tempPerson = ctx.Users.Where(u => u.Id == personId).SingleOrDefault();

        if (tempPerson != null)
        {
            Console.WriteLine("\n" + tempPerson.Email + " logged in" + "\nSignalrID: " + currSignalrID);

            // Xóa các kết nối cũ trước khi thêm kết nối mới
            var oldConnections = ctx.Connections.Where(c => c.UserId == tempPerson.Id);
            ctx.Connections.RemoveRange(oldConnections);

            // Thêm kết nối mới
            Connection currUser = new Connection
            {
                UserId = tempPerson.Id,
                SignalrId = currSignalrID,
                TimeStamp = DateTime.Now
            };
            await ctx.Connections.AddAsync(currUser);
            await ctx.SaveChangesAsync();

            Userr newUser = new Userr(tempPerson.Id, tempPerson.Username, tempPerson.Avatar, currSignalrID);
            await Clients.Caller.SendAsync("reauthMeResponse", newUser);
            await Clients.Others.SendAsync("userOn", newUser);
        }
    }
    //end of reauthMe


    //4Tutorial
    public void logOut(int personId)
    {
        ctx.Connections.RemoveRange(ctx.Connections.Where(c => c.UserId == personId).ToList());
        ctx.SaveChanges();
        Clients.Caller.SendAsync("logoutResponse");
        Clients.Others.SendAsync("userOff", personId);
    }
}
