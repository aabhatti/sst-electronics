import CreateDealForm from "@/components/admin/deals/CreateDealForm";
import Link from "next/link";

const CreateUserPage = async () => {
  return (
    <>
      <h2 className="text-lg font-bold text-primary text-center border border-primary rounded-lg mb-1">
        Create Deal
      </h2>
      <div className="flex flex-col h-fit overflow-auto">
        <CreateDealForm />
      </div>
      <p className="text-base text-primary text-center m-0 mt-1">
        <Link href={"/users"} className="ml-1 border-b border-primary">
          {"Go to Back"}
        </Link>
      </p>
    </>
  );
};

export default CreateUserPage;
