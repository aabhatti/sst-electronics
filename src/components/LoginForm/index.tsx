"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../utils/zodValidations";
import { loginDefaultValues } from "../../utils/defaultValues";
import { ILoginInput } from "../../utils/interfaces";
import FormBody from "./FormBody";
import { useFormState, useFormStatus } from "react-dom";
import { handleLogin } from "./helper";
import { useRouter } from "next/navigation";
import { DEFAULT_LOGGED_IN_REDIRECT } from "@/utils/routes";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  const {
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: loginDefaultValues,
    resolver: zodResolver(loginSchema),
  });

  const redirectDefaultRoute = () => router.push(DEFAULT_LOGGED_IN_REDIRECT);
  const onSubmit: SubmitHandler<ILoginInput> = async (data) => {
    await handleLogin(data, redirectDefaultRoute);
  };

  const { pending } = useFormStatus();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormBody
        errors={errors}
        isSubmitting={isSubmitting || pending}
        watch={watch}
        trigger={trigger}
        setValue={setValue}
        loading={loading || pending}
      />
    </form>
  );
};

export default LoginForm;
