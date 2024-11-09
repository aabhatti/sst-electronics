import { fetchUserById } from "@/lib/actions/users.actions";
import { error, success } from "../shared/alert";
import { HttpStatusCode } from "../../../constants";
import { ICreateUserInput } from "@/utils/interfaces";
import { UseFormSetValue } from "react-hook-form";
import { createUserDefaultValues } from "@/utils/defaultValues";

// The fetchUser by Id function
export const handleGetUserById = async ({
  id,
  setValue,
  setLoading,
}: {
  id: string;
  setValue: UseFormSetValue<ICreateUserInput>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<void> => {
  try {
    setLoading(true);
    const resp = await fetchUserById(id);
    if (resp?.code === HttpStatusCode.OK) {
      if (resp.message) success(resp.message.toString());
      const user = resp.data;
      Object.keys(createUserDefaultValues).forEach((key) => {
        setValue(
          key as keyof ICreateUserInput,
          user[key as keyof ICreateUserInput]
        );
      });
      setLoading(false);
    } else {
      if (resp?.message) error(resp.message.toString());
      setLoading(false);
    }
  } catch (err) {
    setLoading(false);
    if (err instanceof Error) {
      error(err?.message);
    } else {
      error("An unknown error occurred.");
    }
  }
};
