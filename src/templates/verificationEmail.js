const verificationEmail = (otp) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify your Store JJ account</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
  font-family: Arial, Helvetica, sans-serif;
  color: #111111;
">

  <table
    role="presentation"
    width="100%"
    cellspacing="0"
    cellpadding="0"
    border="0"
    style="background-color: #f4f4f4;"
  >
    <tr>
      <td align="center" style="padding: 40px 16px;">

        <!-- Main Container -->
        <table
          role="presentation"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          border="0"
          style="
            max-width: 600px;
            background-color: #ffffff;
          "
        >

          <!-- Header -->
          <tr>
            <td align="center" style="padding: 32px 30px 20px;">
              <div style="
                font-size: 28px;
                font-weight: 700;
                letter-spacing: -1px;
              ">
                Store <span style="color: #16a085;">JJ</span>
              </div>
            </td>
          </tr>


          <!-- Content -->
          <tr>
            <td
              align="center"
              style="padding: 35px 45px 45px;"
            >

              <!-- Small Label -->
              <p style="
                margin: 0 0 14px;
                color: #16a085;
                font-size: 12px;
                font-weight: 700;
                letter-spacing: 1.5px;
                text-transform: uppercase;
              ">
                Account Verification
              </p>


              <!-- Heading -->
              <h1 style="
                margin: 0;
                font-size: 32px;
                line-height: 1.2;
                font-weight: 700;
                letter-spacing: -1px;
                color: #111111;
              ">
                Confirm Your Email to<br />
                Secure Your <span style="
                  color: #16a085;
                  font-style: italic;
                ">Account</span>
              </h1>


              <!-- Description -->
              <p style="
                margin: 25px 0 30px;
                max-width: 460px;
                color: #667085;
                font-size: 15px;
                line-height: 1.7;
              ">
                Thanks for signing up! To complete your registration,
                please confirm your email address using the verification
                code below.
              </p>


              <!-- OTP Box -->
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
              >
                <tr>
                  <td
                    align="center"
                    style="
                      border: 1px solid #e1e5e8;
                      border-radius: 8px;
                      padding: 22px;
                    "
                  >
                    <span style="
                      font-size: 30px;
                      font-weight: 700;
                      letter-spacing: 6px;
                      color: #667085;
                    ">
                      ${otp}
                    </span>
                  </td>
                </tr>
              </table>


              <!-- Expiry -->
              <p style="
                margin: 22px 0 0;
                color: #98a2b3;
                font-size: 13px;
                line-height: 1.6;
              ">
                This verification code will expire in
                <strong>10 minutes</strong>.
              </p>


              <!-- Security -->
              <p style="
                margin: 25px 0 0;
                color: #667085;
                font-size: 13px;
                line-height: 1.6;
              ">
                Didn't create a Store JJ account?
                You can safely ignore this email.
              </p>

            </td>
          </tr>


          <!-- Footer -->
          <tr>
            <td
              align="center"
              style="
                background-color: #0d0d0d;
                padding: 32px 30px;
              "
            >

              <div style="
                font-size: 20px;
                font-weight: 700;
                color: #ffffff;
                margin-bottom: 20px;
              ">
                Store <span style="color: #16a085;">JJ</span>
              </div>


              <p style="
                margin: 0;
                color: #8c8c8c;
                font-size: 12px;
                line-height: 1.6;
              ">
                © 2026 Store JJ. All rights reserved.
              </p>


              <p style="
                margin: 10px 0 0;
                color: #666666;
                font-size: 11px;
              ">
                This is an automated email. Please do not reply.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
};

export { verificationEmail };
