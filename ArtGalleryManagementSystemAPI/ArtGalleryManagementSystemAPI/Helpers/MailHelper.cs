
using System.Net;
using System.Net.Mail;

namespace ArtGalleryManagementSystemAPI.Helpers;

public class MailHelper
{
    public IConfiguration configuration { get; set; }
    public MailHelper(IConfiguration _configuration)
    {
        configuration = _configuration;
    }

    public bool Send(string from, string to, string title, string content)
    {
        try
        {
            var host = configuration["Gmail:Host"];
            var post = int.Parse(configuration["Gmail:Port"]);
            var username = configuration["Gmail:Username"];
            var password = configuration["Gmail:Password"];
            var enable = bool.Parse(configuration["Gmail:SMTP:starttls:enable"]);
            var smptClient = new SmtpClient
            {
                Host = host,
                Port = post,
                EnableSsl = enable,
                Credentials = new NetworkCredential(username, password),
            };
            var mailMessage = new MailMessage(from, to, title, content);
            mailMessage.IsBodyHtml = true;
            smptClient.Send(mailMessage);
            return true;
        }
        catch
        {
            return false;
        }
    }
}
