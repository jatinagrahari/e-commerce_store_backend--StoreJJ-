const orderConfirmationEmail = ({
  name,
  orderId,
  orderDate,
  totalAmount,
  orderItems,
  address,
}) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Order Confirmed - Store JJ</title>
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
            <td style="padding: 35px 45px 45px;">

              <!-- Small Label -->
              <p style="
                margin: 0 0 14px;
                color: #16a085;
                font-size: 12px;
                font-weight: 700;
                letter-spacing: 1.5px;
                text-transform: uppercase;
              ">
                Order Confirmation
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
                Your Order Has Been<br />
                <span style="
                  color: #16a085;
                  font-style: italic;
                ">Confirmed</span>
              </h1>

              <!-- Greeting -->
              <p style="
                margin: 25px 0 10px;
                color: #111111;
                font-size: 15px;
                line-height: 1.7;
              ">
                Hi ${name},
              </p>

              <p style="
                margin: 0 0 30px;
                color: #667085;
                font-size: 15px;
                line-height: 1.7;
              ">
                Thank you for your order! We've received your order
                and will begin processing it shortly.
              </p>

              <!-- Order Details -->
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="
                  border: 1px solid #e1e5e8;
                  border-radius: 8px;
                "
              >
                <tr>
                  <td style="padding: 20px;">

                    <p style="
                      margin: 0 0 12px;
                      color: #667085;
                      font-size: 13px;
                    ">
                      Order ID
                    </p>

                    <p style="
                      margin: 0 0 18px;
                      color: #111111;
                      font-size: 15px;
                      font-weight: 700;
                    ">
                      ${orderId}
                    </p>

                    <p style="
                      margin: 0 0 12px;
                      color: #667085;
                      font-size: 13px;
                    ">
                      Order Date
                    </p>

                    <p style="
                      margin: 0 0 18px;
                      color: #111111;
                      font-size: 15px;
                    ">
                      ${orderDate}
                    </p>

                    <p style="
                      margin: 0 0 12px;
                      color: #667085;
                      font-size: 13px;
                    ">
                      Total Amount
                    </p>

                    <p style="
                      margin: 0;
                      color: #16a085;
                      font-size: 20px;
                      font-weight: 700;
                    ">
                      ₹${totalAmount}
                    </p>

                  </td>
                </tr>
              </table>

              <!-- Order Items -->
              <h2 style="
                margin: 30px 0 15px;
                font-size: 18px;
                color: #111111;
              ">
                Order Items
              </h2>

              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="
                  border: 1px solid #e1e5e8;
                  border-radius: 8px;
                "
              >
                <tr>
                  <td style="
                    padding: 20px;
                    color: #667085;
                    font-size: 14px;
                    line-height: 1.7;
                  ">
                    ${orderItems}
                  </td>
                </tr>
              </table>

              <!-- Delivery Address -->
              <h2 style="
                margin: 30px 0 15px;
                font-size: 18px;
                color: #111111;
              ">
                Delivery Address
              </h2>

              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="
                  border: 1px solid #e1e5e8;
                  border-radius: 8px;
                "
              >
                <tr>
                  <td style="
                    padding: 20px;
                    color: #667085;
                    font-size: 14px;
                    line-height: 1.7;
                  ">
                    ${address}
                  </td>
                </tr>
              </table>

              <!-- Closing -->
              <p style="
                margin: 30px 0 0;
                color: #667085;
                font-size: 14px;
                line-height: 1.7;
              ">
                We'll keep you updated as your order moves through
                each stage of the delivery process.
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

export { orderConfirmationEmail };
