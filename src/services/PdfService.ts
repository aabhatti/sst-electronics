import moment from "moment";
import fs from "fs";
import puppeteer from "puppeteer";
import { InstallmentReceiptTemplate } from "../../utils/templates";

interface InstallmentReceiptData {
  fileName?: string;
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

class PdfService {
  generateInstallmentReceiptPDF = async (
    data: InstallmentReceiptData
  ): Promise<{ filepath: string }> => {
    const template = InstallmentReceiptTemplate(data);

    if (!fs.existsSync("public/receipts")) {
      if (!fs.existsSync("public")) fs.mkdirSync("public");
      fs.mkdirSync("public/receipts");
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(template);
    await page.pdf({
      path: `./public/receipts/${data.fileName}`,
      printBackground: true,
    });

    await browser.close();
    const localPath = `/public/receipts/${data.fileName}`;
    return { filepath: localPath };
  };
}

export { PdfService };
