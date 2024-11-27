using ArtGalleryManagementSystemAPI.HubModels;
using ArtGalleryManagementSystemAPI.Models;
using Microsoft.AspNetCore.SignalR;

namespace ArtGalleryManagementSystemAPI.HubConfig;

public partial class MyHub
{
    public async Task getOnlineUsers()
    {
        int currUserId = ctx.Connections.Where(c => c.SignalrId == Context.ConnectionId).Select(c => c.UserId).SingleOrDefault();
        List<Userr> onlineUsers = ctx.Connections
            .Where(c => c.UserId != currUserId)
            .Select(c =>
                new Userr(c.UserId, ctx.Users.Where(u => u.Id == c.UserId).Select(u => u.Username).SingleOrDefault(), ctx.Users.Where(u => u.Id == c.UserId).Select(u => u.Avatar).SingleOrDefault(), c.SignalrId)
            ).ToList();
        await Clients.Caller.SendAsync("getOnlineUsersResponse", onlineUsers);
    }


    public async Task sendMsg(string connId, string msg)
    {
        Console.WriteLine("Sending message to connId: " + connId);
        Console.WriteLine("Message: " + msg);
        await Clients.Client(connId).SendAsync("sendMsgResponse", Context.ConnectionId, msg);
    }
}
