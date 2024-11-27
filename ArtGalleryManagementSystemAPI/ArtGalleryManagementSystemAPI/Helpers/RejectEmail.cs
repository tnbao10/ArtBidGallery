using ArtGalleryManagementSystemAPI.Dtos;

namespace ArtGalleryManagementSystemAPI.Helpers;

public static class RejectEmail
{
    public static string EmailStringBody(ProductWithSellerDto product, UserDto user)
    {
        return $@"<html lang=""en-US"">

<head>
    <meta content=""text/html; charset=utf-8"" http-equiv=""Content-Type"" />
    <title>Reset Password Email Template</title>
    <meta name=""description"" content=""Reset Password Email Template."">
    <style type=""text/css"">
        a:hover {{text-decoration: underline !important;}}
    </style>
</head>

<body marginheight=""0"" topmargin=""0"" marginwidth=""0"" style=""margin: 0px; background-color: #f2f3f8;"" leftmargin=""0"">
    <!--100% body table-->
    <table cellspacing=""0"" border=""0"" cellpadding=""0"" width=""100%"" bgcolor=""#f2f3f8""
        style=""@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"">
        <tr>
            <td>
                <table style=""background-color: #f2f3f8; max-width:670px;  margin:0 auto;"" width=""100%"" border=""0""
                    align=""center"" cellpadding=""0"" cellspacing=""0"">
                    <tr>
                        <td style=""height:80px;"">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style=""text-align:center;"">
                            <img width=""60"" height=""60"" src=""https://lh3.googleusercontent.com/a/ACg8ocKIjsJoYwEbnk1-i7GLYJ1cQ2gee4U2PFafR2PWKF0OidfWW1M=s96-c-rg-br100"" referrerpolicy=""no-referrer"" title=""logo"" alt=""logo"">
                        </td>
                    </tr>
                    <tr>
                        <td style=""height:20px;"">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width=""95%"" border=""0"" align=""center"" cellpadding=""0"" cellspacing=""0""
                                style=""max-width:670px;background:#fff; border-radius:3px; -webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"">
                                <tr>
                                    <td style=""height:40px;"">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style=""padding:0 35px;"">
                                        <h1 style=""color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;"">Product Rejected</h1>
                                        <span
                                            style=""display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;""></span>
                                        
                                        <p style=""color:#455056; font-size:15px;line-height:24px; margin:0;"">Dear""{user.Username}"",</p>
                                        <p style=""color:#455056; font-size:15px;line-height:24px; margin:0;"">We are writing to inform you that your product submission, ""{product.Name},"" has been rejected. Unfortunately, your product does not meet our platform's requirements for auction.</p>
                                        <p style=""color:#455056; font-size:15px;line-height:24px; margin:0;"">If you would like to sell your product, please click Sell in Árt gallery.</p>
                                        <p style=""color:#455056; font-size:15px;line-height:24px; margin:0;"">If not, please click Cancle</p>
                                        <p style=""color:#455056; font-size:15px;line-height:24px; margin:0;"">Thank you for your understanding.</p>
                                        <p style=""color:#455056; font-size:15px;line-height:24px; margin:0;"">Sincerely,</p>
                                        <p style=""color:#455056; font-size:15px;line-height:24px; margin:0;"">Árt gallery</p>
                                        
                                       <form action=""http://localhost:5204/api/auction/auctiontoproduct/{product.Id}"" method=""post"">
                                            <button type=""submit"" style=""background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;"">Sell it on Árt</button>
                                       </form>
                                       <form action=""http://localhost:5204/api/auction/auctiontoproductcancle/{product.Id}"" method=""post"">
                                            <button type=""submit"" style=""background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;"">Cancle</button>
                                       </form>
                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td style=""height:40px;"">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    <tr>
                        <td style=""height:20px;"">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style=""height:80px;"">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
</body>

</html>";
    }
}
