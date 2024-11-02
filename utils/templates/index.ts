interface InstallmentReceiptData {
  no?: string;
  amount?: number;
  methode?: string;
  date?: string;
  userName?: string;
  cnic?: string;
  mobile?: string;
  email?: string;
  deal?: string;
  paidInstallments?: number;
  dueInstallments?: number;
  totalAmount?: number;
  paidAmount?: number;
  dueAmount?: number;
  receivedBy?: string;
  signature?: string;
}

const InstallmentReceiptTemplate = (data: InstallmentReceiptData): string => {
  const notExist = "N/A";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Installment Payment Receipt</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f6f9;
      color: #333;
    }
    .container {
      width: 90%;
      max-width: 800px;
      margin: 40px auto;
      padding: 30px;
      background-color: #ffffff;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #9568ff;
      border-bottom: 2px solid #9568ff;
      padding-bottom: 15px;
      gap: 10px;
    }
    .header p{
     margin:0;
    }
    .header h3 {
      font-size: 24px;
      font-weight: bold;
      margin: 0;
      color: #9568ff;
      text-align: center;
      flex: 1;
    }
    .brand-name, .brand-info {
      font-size: 12px;
      color: #555;
    }
    .brand-name {
      font-weight: bold;
    }
    .brand-info {
      text-align: right;
    }
    .section {
      margin-top: 10px;
    }
    .basic-info {
      display: flex;
      justify-content: space-between;
      font-size: 15px;
      padding: 0px 0;
    }
    .basic-info p {
      margin: 0;
      color: #555;
    }
    .center-value, .receipt-title{
      display: flex;
      flex-grow: 1;
      text-align: center;
      align-items: center;
      justify-content: center;
    }
    .section h2 {
      font-size: 20px;
      color: #9568ff;
      border-bottom: 2px solid #9568ff;
      padding-bottom: 8px;
      margin-bottom: 12px;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
      font-size: 15px;
    }
    .info-table th, .info-table td {
      padding: 12px 15px;
      text-align: left;
      border: 1px solid #ddd;
    }
    .info-table th {
      background-color: #f1f1f1;
      color: #333;
      font-weight: bold;
    }
    .info-table td {
      color: #555;
    }
    /* Custom background colors */
    .customer-info td {
      background-color: #9568ff1a;
      color: #333;
    }
    .customer-name {
      color: #9568ff;
      font-weight: bold;
    }
    .deal-info {
      background-color: #bee3f8;
    }
    .installment-paid-info {
      background-color: #c6f6d5;
    }
    .installment-due-info {
      background-color: #fed7d7;
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #666;
      border: 1px solid #ddd;
      padding: 10px;
      background-color: #9568ff1a;
      border-radius: 6px;
    }
    .disclaimer {
      text-align: center;
      font-size: 14px;
      color: #d9534f;
      font-weight: bold;
      margin-top: 10px;
      padding: 10px;
      background-color: #fff0f0;
      border-radius: 6px;
      border: 1px solid #f5c6cb;
    }
    .highlight-value {
      font-weight: bold;
      color: #333;
    }
    .received-signature{
      padding: 20px 0px 10px 0px;
    }
    .received-signature p {
      font-weight: bold;
      color: #333;
    }
    .font-11{
      font-size: 12px;
    }
     .font-12{
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <p class="brand-name">SST Electronics Center</p>
      <h3 class="receipt-title">Installment Receipt</h3>
      <p class="brand-info">
        <span>sst.electronics.center@gmail.com</span><br>
        <span>Badami Bagh, Lahore</span>
      </p>
    </div>

    <!-- User and Deal Information -->
    <div class="section">
      <div class="basic-info">
        <p>Installment No: <span class="highlight-value">${
          data.no || notExist
        }</span></p>
        <p class="center-value">Amount: <span class="highlight-value">Rs ${
          data.amount || notExist
        }/- ${data.methode || ""}</span></p>
        <p>Date: <span class="highlight-value">${
          data.date || notExist
        }</span></p>
      </div>

      <table class="info-table">
        <tr class="customer-info font-12">
          <td colspan="3">Customer Name:<span class="customer-name"> ${
            data.userName || notExist
          }</span></td>
        </tr>
        <tr class="customer-info">
          <td class="font-11">CNIC: <span class="highlight-value">${
            data.cnic || notExist
          }</span></td>
          <td class="font-11">Mobile: <span class="highlight-value">${
            data.mobile || notExist
          }</span></td>
          <td class="font-11">Email: <span class="highlight-value">${
            data.email || notExist
          }</span></td>
        </tr>
        <tr class="font-12">
          <td class="deal-info">Deal Name: <span class="highlight-value">${
            data.deal || notExist
          }</span></td>
          <td class="installment-paid-info">Installments Paid: <span class="highlight-value">${
            data.paidInstallments || notExist
          }</span></td>
          <td class="installment-due-info">Installments Due: <span class="highlight-value">${
            data.dueInstallments || notExist
          }</span></td>
        </tr>
        <tr class="font-12">
          <td class="deal-info">Total Amount: <span class="highlight-value">Rs ${
            data.totalAmount || notExist
          }/-</span></td>
          <td class="installment-paid-info">Total Amount Paid: <span class="highlight-value">Rs ${
            data.paidAmount || notExist
          }/-</span></td>
          <td class="installment-due-info">Total Amount Due: <span class="highlight-value">Rs ${
            data.dueAmount || notExist
          }/-</span></td>
        </tr>
      </table>

      <div class="basic-info received-signature">
        <p>Received By: ${data.receivedBy || "Admin"}</p>
        <p>Signature: ${data.signature || "SST"}</p>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      Thank you for your payment
      <!--<strong>SST Electronics Center</strong>-->
    </div>

    <!-- Disclaimer -->
    <div class="disclaimer">
      قسط ہمیشہ آفس میں جمع کروائیں اور کمپیوٹرائزڈ رسید حاصل کریں۔
    </div>
  </div>
</body>
</html>


`;
};

export { InstallmentReceiptTemplate };
