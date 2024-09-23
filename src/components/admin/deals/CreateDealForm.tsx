"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDealSchema } from "@/utils/zodValidations";
import { createDealDefaultValues } from "@/utils/defaultValues";
import { ICreateDealInput } from "@/utils/interfaces";
import FormBody from "./FormBody";
import { useRouter } from "next/navigation";
import { handleCreateDeal } from "@/app/(admin)/deals/helper";

const CreateDealForm: React.FC = ({}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ICreateDealInput>({
    defaultValues: createDealDefaultValues,
    resolver: zodResolver(createDealSchema),
  });

  const handleNavigate = () => router.push("/deals");

  const onSubmit: SubmitHandler<ICreateDealInput> = async (data) => {
    await handleCreateDeal({ data, navigate: handleNavigate });
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

export default CreateDealForm;
