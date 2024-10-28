import { authenticate } from "@/lib/actions/auth.actions";
import { ILoginInput } from "@/utils/interfaces";
import { showError, error, success } from "../shared/alert";

type RedirectFunction = () => void;
export const handleLogin = async (
  data: ILoginInput,
  redirect: RedirectFunction
) => {
  try {
    const resp = await authenticate(data);
    if (resp) redirect();
    console.log("resp in handleLogin from authenticate>>>", resp);
  } catch (err: any) {
    showError("err in handleLogin");

    console.log("err in handleLogin>>>", err, err.message);

    if (err instanceof Error) {
      error(err.message);
    } else {
      error("An unknown error occurred.");
    }
  }
};
