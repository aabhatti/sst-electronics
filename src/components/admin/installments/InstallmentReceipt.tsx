"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { decryptData } from "../../../../utils/encryptDecrypt";
import Spinner from "@/components/shared/spinner";
import Image from "next/image";

const GeneratePdf = dynamic(() => import("@/components/shared/generatePDF"), {
  ssr: false,
});

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
  fileName?: string | undefined;
}

interface InstallmentReceiptProps {
  dataString: string | undefined | null;
}

const InstallmentReceipt: React.FC<InstallmentReceiptProps> = ({
  dataString,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<InstallmentReceiptData | null>(null);
  const notExist = "N/A";

  useEffect(() => {
    const fetchData = async () => {
      const decryptedData = (await decryptData(
        dataString || ""
      )) as InstallmentReceiptData;
      setData(decryptedData);
    };
    fetchData();
  }, [dataString]);

  if (!data)
    return (
      <div className="flex justify-center items-center flex-1">
        <Spinner color="" />
      </div>
    );

  return (
    <>
      <GeneratePdf html={ref} fileName={data?.fileName || "Receipt.pdf"} />
      <div className="container" ref={ref}>
        <div className="receipt-header">
          <Image src={"/images/logo.jpg"} alt={"SST"} width={200} height={50} />
          <h3 className="receipt-title">Installment Receipt</h3>
          <p className="brand-info">
            <span>sst.electronics.center@gmail.com</span>
            <br />
            <span>Badami Bagh, Lahore</span>
          </p>
        </div>

        <div className="section">
          <div className="basic-info">
            <p>
              Installment No:{" "}
              <span className="highlight-value">{data.no ?? notExist}</span>
            </p>
            <p className="center-value">
              Amount:{" "}
              <span className="highlight-value ml-1">
                Rs {data.amount ?? notExist}/- {data.methode ?? ""}
              </span>
            </p>
            <p>
              Date:{" "}
              <span className="highlight-value">{data.date ?? notExist}</span>
            </p>
          </div>

          <table className="info-table">
            <tbody>
              <tr className="customer-info font-12">
                <td colSpan={3}>
                  Customer Name:{" "}
                  <span className="customer-name">
                    {data.userName ?? notExist}
                  </span>
                </td>
              </tr>
              <tr className="customer-info">
                <td className="font-11">
                  CNIC:{" "}
                  <span className="highlight-value">
                    {data.cnic ?? notExist}
                  </span>
                </td>
                <td className="font-11">
                  Mobile:{" "}
                  <span className="highlight-value">
                    {data.mobile ?? notExist}
                  </span>
                </td>
                <td className="font-11">
                  Email:{" "}
                  <span className="highlight-value">
                    {data.email ?? notExist}
                  </span>
                </td>
              </tr>
              <tr className="font-12">
                <td className="deal-info">
                  Deal Name:{" "}
                  <span className="highlight-value">
                    {data.deal ?? notExist}
                  </span>
                </td>
                <td className="installment-paid-info">
                  Installments Paid:{" "}
                  <span className="highlight-value">
                    {data.paidInstallments ?? notExist}
                  </span>
                </td>
                <td className="installment-due-info">
                  Installments Due:{" "}
                  <span className="highlight-value">
                    {data.dueInstallments ?? notExist}
                  </span>
                </td>
              </tr>
              <tr className="font-12">
                <td className="deal-info">
                  Total Amount:{" "}
                  <span className="highlight-value">
                    Rs {data.totalAmount ?? notExist}/-
                  </span>
                </td>
                <td className="installment-paid-info">
                  Total Amount Paid:{" "}
                  <span className="highlight-value">
                    Rs {data.paidAmount ?? notExist}/-
                  </span>
                </td>
                <td className="installment-due-info">
                  Total Amount Due:{" "}
                  <span className="highlight-value">
                    Rs {data.dueAmount ?? notExist}/-
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="basic-info received-signature">
            <p>Received By: {data.receivedBy ?? "Admin"}</p>
            <p>Signature: {data.signature ?? "SST"}</p>
          </div>
        </div>

        <div className="footer">Thank you for your payment</div>
        <div className="disclaimer">
          قسط ہمیشہ آفس میں جمع کروائیں اور کمپیوٹرائزڈ رسید حاصل کریں۔
        </div>
      </div>
    </>
  );
};

export default InstallmentReceipt;
