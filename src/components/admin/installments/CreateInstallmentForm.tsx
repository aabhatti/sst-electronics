"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInstallmentSchema } from "@/utils/zodValidations";
import { createInstallmentDefaultValues } from "@/utils/defaultValues";
import { ICreateInstallmentInput } from "@/utils/interfaces";
import FormBody from "./FormBody";
import { useRouter } from "next/navigation";
import { handleCreateInstallment } from "@/app/(admin)/installments/helper";

const CreateInstallmentForm: React.FC = ({}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    reset,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ICreateInstallmentInput>({
    defaultValues: createInstallmentDefaultValues,
    resolver: zodResolver(createInstallmentSchema),
  });

  const handleNavigate = () => router.push("/installments");

  const onSubmit: SubmitHandler<ICreateInstallmentInput> = async (data) => {
    await handleCreateInstallment({ data, navigate: handleNavigate, reset });
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

export default CreateInstallmentForm;
