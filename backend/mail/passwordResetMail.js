import transporter from "./transporter.js";

const passwordResetMail = (to, token) => {
  const html = `<b> Hello, </b>
              <p>Your Password reset code is.</p>
              <b style="text-align: center"> http://localhost:3000/password-reset/${token} </b>
            `;

  try {
    let info = transporter.sendMail({
      from: '"Escrow " <escrow@eswcrow-trade.com>',
      to: to,
      subject: "Password Reset Code",
      html: html,
    });

    if (info.error) {
      console.log("something went wrong");
    }
  } catch (e) {
    console.log(e);
  }
};

export default passwordResetMail;
