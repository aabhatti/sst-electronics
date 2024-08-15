import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const RegisterPage = async () => {
  // await delay(50000);
  return (
    <>
      <h2 className="text-lg font-bold text-primary text-center border border-primary rounded-lg mb-1">
        Register Form
      </h2>
      <div className="flex flex-col h-fit overflow-auto">
        <RegisterForm />
      </div>
      <p className="text-base text-primary text-center m-0 mt-1">
        <span>{"Already have account?"}</span>
        <Link href={"/login"} className="ml-1 border-b border-primary">
          {"LOGIN"}{" "}
        </Link>
      </p>
    </>
  );
};

export default RegisterPage;
