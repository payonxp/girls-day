const nodemailer = require('nodemailer');



var mail = {}

mail.sendEmail = function(title, address, descp, name1, promt_name2, phone) {
  let smtpConfig = {
      host: 'smtp.mxhichina.com',
      port: 25,
      secure: false, // upgrade later with STARTTLS
      auth: {
          user: 'administrator@helmap.com',
          pass: '1a2b3c4d.'
      }
  };

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(smtpConfig);
// setup email data with unicode symbols
let mailOptions = {
    from: '"Helmap" <administrator@helmap.com>', // sender address
    to: address, // list of receivers
    subject: title, // Subject line
    html: `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<style type="text/css">
		.p1{
		color: #222;
		font-family: 'Helvetica', 'Arial', sans-serif;
		font-size: 16px;
		margin: 0 0 10px;
		padding: 0
		}

    .p2{
			color: #222;
      font-family: 'Helvetica', 'Arial', sans-serif;
      font-size: 16px;
      margin: 24px 0;
      padding: 0
		}

		#t1{
		background: #fff;
		border-collapse: collapse;
  	border-spacing: 0;
		color: #222;
		font-family: 'Helvetica', 'Arial', sans-serif;
	  font-size: 16px;
		height: 100%;
		margin: 0;
		padding: 0; width: 100%
		}

		#t2{
		border-collapse: collapse;
		border-spacing: 0;
		font-size: 16px;
		line-height: 1.5;
		margin: 0 auto;
		max-width: 680px
		}

    #smallp{
  	color: #999999;
  	font-family: 'Helvetica', 'Arial', sans-serif;
  	font-size: 12px;
  	margin: 0 0 10px;
  	padding: 0
    }

	</style>
</head>
<body >
	<table id="t1"  bgcolor="#fff" >
    <tbody><tr>
      <td  valign="top" align="center">
        <center>
          <table >
            <tbody><tr>
              <td >
                <table style="border-collapse: collapse; border-spacing: 0; margin-top: 30px" width="100%">
                  <tbody><tr>
                    <td  width="110" valign="bottom">
                      <a href="106.14.60.110" target="_blank" style="color: #2ba6cb; text-decoration: none"><img src="http://wx3.sinaimg.cn/mw690/7599a4f1gy1fdd080l2rlj20h103cjrj.jpg" style="-ms-interpolation-mode: bicubic; border: none; clear: both; display: block; float: left; height: auto; max-width: 100%; outline: none; text-decoration: none; width: 100px" align="left"></a>
                    </td>
                  </tr></tbody>
                </table>
                <hr style="background: #ddd; border: none; color: #ddd; height: 1px; margin: 20px 0 30px">
                <table style="border-collapse: collapse; border-spacing: 0" width="100%">
                  <tbody><tr>
                    <td style="-moz-hyphens: auto; -webkit-hyphens: auto; border-collapse: collapse !important; color: #222; font-family: 'Helvetica', 'Arial', sans-serif; font-size: 16px; hyphens: auto; margin: 0; padding: 0; word-break: break-word">
                      <div>
                        <p class="p1">` + name1 + `同学，你好！</p>
                        <p class="p1">欢迎使用心愿墙，</p>
                        <p class="p1">` + promt_name2 + `: </p>
                        <p class="p1">` + descp + `</p>
                        <p class="p1">以下是他/她的联系方式，请尽快与其联系：</p>
                        <p class="p2">
                          <a target="_blank"  style="background: #83a198; border-radius: 4px; color: #fff; padding: 8px 16px; text-decoration: none; word-break: break-all">手机号码：`+ phone +`</a>
                        </p>
                        <p id="smallp" >如果你没有使用过心愿墙，请忽略此邮件。</p>
                      </div>
                    </td>
                  </tr></tbody>
                </table>
                <hr style="background: #ddd; border: none; color: #ddd; height: 1px; margin: 20px 0">
                <table style="border-collapse: collapse; border-spacing: 0" width="100%">
                  <tbody><tr>
                    <td colspan="2"  align="center">
                      <p id="smallp" >copyright @ 2017 rights reserved </p>
                    </td>
                  </tr></tbody>
                </table>
              </td>
            </tr></tbody>
          </table>
        </center>
      </td>
    </tr></tbody>
  </table>
</body>
</html>` // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});

}

module.exports = mail
