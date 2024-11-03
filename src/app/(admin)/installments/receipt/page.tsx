"use client";
import InstallmentReceipt from "@/components/admin/installments/InstallmentReceipt";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const InstallmentReceiptPage = () => {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <div className="flex flex-col items-center flex-1">
        <InstallmentReceipt dataString={data} />
      </div>
      <p className="text-base text-primary text-center m-0 mt-1">
        <Link href={"/installments"} className="ml-1 border-b border-primary">
          {"Go to Back"}
        </Link>
      </p>
    </div>
  );
};

export default InstallmentReceiptPage;
