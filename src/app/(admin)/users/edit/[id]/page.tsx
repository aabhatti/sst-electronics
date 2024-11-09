import CreateUpdateUserForm from "@/components/CreateUpdateUserForm";
import Link from "next/link";

const UpdateUserPage = async ({ params }: { params: { id: string } }) => {
  return (
    <>
      <h2 className="text-lg font-bold text-primary text-center border border-primary rounded-lg mb-1">
        Edit User
      </h2>
      <div className="flex flex-col h-fit overflow-auto">
        <CreateUpdateUserForm id={params?.id || ""} />
      </div>
      <p className="text-base text-primary text-center m-0 mt-1">
        <Link href={"/users"} className="ml-1 border-b border-primary">
          {"Go to Back"}
        </Link>
      </p>
    </>
  );
};

export default UpdateUserPage;
