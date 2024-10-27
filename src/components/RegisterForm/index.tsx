"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../utils/zodValidations";
import { registerDefaultValues } from "../../utils/defaultValues";
import { IRegisterInput } from "../../utils/interfaces";
import FormBody from "./FormBody";
import { handleRegister } from "./helper";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: registerDefaultValues,
    resolver: zodResolver(registerSchema),
  });

  const redirectToLogin = () => router.push("/login");
  const onSubmit: SubmitHandler<IRegisterInput> = async (data) => {
    await handleRegister(data, redirectToLogin);
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

export default RegisterForm;
