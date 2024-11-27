namespace ArtGalleryManagementSystemAPI.HubModels;

public class PersonInfo
{
    public string email { get; set; }
    public string password { get; set; }
}

//4Tutorial
public class Userr
{
    public int id { get; set; }
    public string name { get; set; }
    public string avatar { get; set; }
    public string connId { get; set; } //signalrId

    public Userr(int someId, string someName,string someAvatar, string someConnId)
    {
        id = someId;
        name = someName;
        avatar = someAvatar;
        connId = someConnId;
    }
}
