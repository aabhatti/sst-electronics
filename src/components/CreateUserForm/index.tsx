"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "../../utils/zodValidations";
import { createUserDefaultValues } from "../../utils/defaultValues";
import { ICreateUserInput } from "../../utils/interfaces";
import FormBody from "./FormBody";
import { useRouter } from "next/navigation";
import { handleCreateUser } from "../../app/(admin)/users/helper";

const CreateUserForm: React.FC = ({}) => {
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

  const handleNavigate = () => router.push("/users");

  const onSubmit: SubmitHandler<ICreateUserInput> = async (data) => {
    await handleCreateUser({ data, navigate: handleNavigate });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormBody
        errors={errors}
        isSubmitting={isSubmitting}
        watch={watch}
        trigger={trigger}
        setValue={setValue}
        loading={loading}
      />
    </form>
  );
};

export default CreateUserForm;
