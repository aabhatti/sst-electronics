"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../utils/zodValidations";
import { loginDefaultValues } from "../../utils/defaultValues";
import { ILoginInput } from "../../utils/interfaces";
import FormBody from "./FormBody";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

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

  const onSubmit: SubmitHandler<ILoginInput> = (data) => {
    console.log(data);
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

export default LoginForm;
