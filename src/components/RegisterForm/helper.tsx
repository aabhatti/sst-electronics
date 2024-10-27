import { register } from "@/lib/actions/auth.actions";
import { IRegisterInput } from "@/utils/interfaces";
import { HttpStatusCode } from "../../../constants";
import { error, success } from "../shared/alert";

type RedirectFunction = () => void;

export const handleRegister = async (
  data: IRegisterInput,
  redirect: RedirectFunction
) => {
  try {
    const resp = await register(data);
    if (resp.code === HttpStatusCode.CREATED) {
      if (resp.message) success(resp.message.toString());
      redirect();
    } else {
      if (resp.message) error(resp.message.toString());
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      error(err?.message);
    } else {
      error("An unknown error occurred.");
    }
  }
};
