"use client";
import React from "react";
import TextField from "../../components/shared/inputs/TextField";
import TextFieldPassword from "../../components/shared/inputs/TextFieldPassword";
import Button from "../../components/shared/button";
import {
  TYPE,
  LABELS,
  PLACEHOLDERS,
  LOGIN_NAMES,
  GENERIC,
} from "../../utils/constants";
import {
  FieldErrors,
  UseFormWatch,
  UseFormTrigger,
  UseFormSetValue,
} from "react-hook-form";
import { ILoginInput } from "../../utils/interfaces";

interface FormBodyProps {
  errors: FieldErrors<ILoginInput>;
  isSubmitting: boolean;
  watch: UseFormWatch<ILoginInput>;
  trigger: UseFormTrigger<ILoginInput>;
  setValue: UseFormSetValue<ILoginInput>;
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
  const { EMAIL, PASSWORD } = LOGIN_NAMES;
  return (
    <div className="mt-5">
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

      <Button
        type={"submit"}
        disabled={loading}
        loading={isSubmitting || loading}
        className="w-full mb-0"
      >
        {GENERIC.SUBMIT}
      </Button>
    </div>
  );
};

export default FormBody;
