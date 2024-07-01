import LoginForm from "@/components/LoginForm";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div>
      <h2 className="text-lg font-bold text-primary text-center border border-primary rounded-lg mb-1">
        Login Form
      </h2>
      <LoginForm />
      <p className="text-base text-primary text-center m-0 mt-1">
        <span>{"Donot have account?"}</span>
        <Link href={"/register"} className="ml-1 border-b border-primary">
          {"REGISTER"}{" "}
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
