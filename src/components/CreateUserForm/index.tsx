"use client";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "../../utils/zodValidations";
import { createUserDefaultValues } from "../../utils/defaultValues";
import { ICreateUserInput } from "../../utils/interfaces";
import FormBody from "./FormBody";
import { useRouter } from "next/navigation";
import {
  handleCreateUser,
  handleUpdateUser,
} from "../../app/(admin)/users/helper";
import { handleGetUserById } from "./helper";
import Loading from "@/app/(admin)/loading";

interface CreateUserFormProps {
  id?: string | null;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ id }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ICreateUserInput>({
    defaultValues: createUserDefaultValues,
    resolver: zodResolver(createUserSchema),
  });

  useEffect(() => {
    if (id && !loading) {
      handleGetUserById({ id, setValue, setLoading });
    }
  }, [id]);

  const handleNavigate = () => router.push("/users");

  const onSubmit: SubmitHandler<ICreateUserInput> = async (data) => {
    if (!id) {
      await handleCreateUser({ data, navigate: handleNavigate });
    } else {
      await handleUpdateUser({
        data: { id, ...data },
        navigate: handleNavigate,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {loading ? (
        <Loading />
      ) : (
        <FormBody
          isExists={!!id}
          errors={errors}
          isSubmitting={isSubmitting}
          watch={watch}
          trigger={trigger}
          setValue={setValue}
          loading={loading}
        />
      )}
    </form>
  );
};

export default CreateUserForm;
