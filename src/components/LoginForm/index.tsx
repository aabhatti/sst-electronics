"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../utils/zodValidations";
import { loginDefaultValues } from "../../utils/defaultValues";
import { ILoginInput } from "../../utils/interfaces";
import FormBody from "./FormBody";
import { authenticate } from "@/app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

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

  // const onSubmit: SubmitHandler<ILoginInput> = (data) => {
  //   console.log("data>>", data);
  //   authenticate();
  // };
  console.log("errorMessage>>>", errorMessage);
  const { pending } = useFormStatus();

  return (
    <form onSubmit={handleSubmit(dispatch)}>
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
