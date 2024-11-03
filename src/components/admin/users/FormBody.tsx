"use client";
import React from "react";
import TextField from "@/components/shared/inputs/TextField";
import TextFieldPassword from "@/components/shared/inputs/TextFieldPassword";
import Button from "@/components/shared/button";
import { TYPE, LABELS, PLACEHOLDERS, NAMES, GENERIC } from "@/utils/constants";
import {
  FieldErrors,
  UseFormWatch,
  UseFormTrigger,
  UseFormSetValue,
} from "react-hook-form";
import { IRegisterInput } from "@/utils/interfaces";

interface FormBodyProps {
  errors: FieldErrors<IRegisterInput>;
  isSubmitting: boolean;
  watch: UseFormWatch<IRegisterInput>;
  trigger: UseFormTrigger<IRegisterInput>;
  setValue: UseFormSetValue<IRegisterInput>;
  loading: boolean;
}

const FormBody: React.FC<FormBodyProps> = ({
  errors,
  isSubmitting,
  watch,
  trigger,
  setValue,
  loading,
}) => {
  const { FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, CONFIRM_PASSWORD } = NAMES;
  return (
    <div className="mt-5">
      <TextField
        type={TYPE.TEXT}
        name={FIRST_NAME}
        label={LABELS.FIRST_NAME}
        placeholder={PLACEHOLDERS.FIRST_NAME}
        value={watch(FIRST_NAME)}
        error={errors?.[FIRST_NAME]?.message}
        onBlur={() => trigger(FIRST_NAME)}
        onChange={(e) => {
          setValue(FIRST_NAME, e.target.value);
          trigger(FIRST_NAME);
        }}
      />

      <TextField
        type={TYPE.TEXT}
        name={LAST_NAME}
        label={LABELS.LAST_NAME}
        placeholder={PLACEHOLDERS.LAST_NAME}
        value={watch(LAST_NAME)}
        error={errors?.[LAST_NAME]?.message}
        onBlur={() => trigger(LAST_NAME)}
        onChange={(e) => {
          setValue(LAST_NAME, e.target.value);
          trigger(LAST_NAME);
        }}
      />

      <TextField
        type={TYPE.TEXT}
        name={EMAIL}
        label={LABELS.EMAIL}
        placeholder={PLACEHOLDERS.EMAIL}
        value={watch(EMAIL)}
        error={errors?.[EMAIL]?.message}
        onBlur={() => trigger(EMAIL)}
        onChange={(e) => {
          setValue(EMAIL, e.target.value);
          trigger(EMAIL);
        }}
      />

      <TextFieldPassword
        type={TYPE.PASSWORD}
        name={PASSWORD}
        label={LABELS.PASSWORD}
        placeholder={PLACEHOLDERS.PASSWORD}
        value={watch(PASSWORD)}
        error={errors?.[PASSWORD]?.message}
        onBlur={() => trigger(PASSWORD)}
        onChange={(e) => {
          setValue(PASSWORD, e.target.value);
          trigger(PASSWORD);
        }}
      />

      <TextFieldPassword
        type={TYPE.PASSWORD}
        name={CONFIRM_PASSWORD}
        label={LABELS.CONFIRM_PASSWORD}
        placeholder={PLACEHOLDERS.CONFIRM_PASSWORD}
        value={watch(CONFIRM_PASSWORD)}
        error={errors?.[CONFIRM_PASSWORD]?.message}
        onBlur={() => trigger(CONFIRM_PASSWORD)}
        onChange={(e) => {
          setValue(CONFIRM_PASSWORD, e.target.value);
          trigger(CONFIRM_PASSWORD);
        }}
      />

      <Button
        type={"submit"}
        disabled={isSubmitting || loading}
        loading={isSubmitting || loading}
        className="w-full mb-0"
      >
        {GENERIC.SUBMIT}
      </Button>
    </div>
  );
};

export default FormBody;
