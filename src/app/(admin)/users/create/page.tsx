import CreateUserForm from "@/components/CreateUserForm";
import Link from "next/link";

const CreateDealPage = async () => {
  return (
    <>
      <h2 className="text-lg font-bold text-primary text-center border border-primary rounded-lg mb-1">
        Create User
      </h2>
      <div className="flex flex-col h-fit overflow-auto">
        <CreateUserForm />
      </div>
      <p className="text-base text-primary text-center m-0 mt-1">
        <Link href={"/deals"} className="ml-1 border-b border-primary">
          {"Go to Back"}
        </Link>
      </p>
    </>
  );
};

export default CreateDealPage;
