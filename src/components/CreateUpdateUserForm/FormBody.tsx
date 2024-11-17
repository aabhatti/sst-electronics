"use client";
import React from "react";
import TextField from "../shared/inputs/TextField";
import Button from "../shared/button";
import {
  TYPE,
  LABELS,
  PLACEHOLDERS,
  NAMES,
  GENERIC,
} from "../../utils/constants";
import {
  FieldErrors,
  UseFormWatch,
  UseFormTrigger,
  UseFormSetValue,
} from "react-hook-form";
import { ICreateUserInput } from "../../utils/interfaces";

interface FormBodyProps {
  isExists: boolean;
  errors: FieldErrors<ICreateUserInput>;
  isSubmitting: boolean;
  watch: UseFormWatch<ICreateUserInput>;
  trigger: UseFormTrigger<ICreateUserInput>;
  setValue: UseFormSetValue<ICreateUserInput>;
  loading: boolean;
}

const FormBody: React.FC<FormBodyProps> = ({
  isExists,
  errors,
  isSubmitting,
  watch,
  trigger,
  setValue,
  loading,
}) => {
  const { FIRST_NAME, LAST_NAME, EMAIL, MOBILE, CNIC, ADDRESS } = NAMES;
  return (
    <div className="mt-5 grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
      <div>
        <TextField
          type={TYPE.TEXT}
          name={FIRST_NAME}
          label={LABELS.NAME}
          placeholder={PLACEHOLDERS.FIRST_NAME}
          value={watch(FIRST_NAME)}
          error={errors?.[FIRST_NAME]?.message}
          onBlur={() => trigger(FIRST_NAME)}
          onChange={(e) => {
            setValue(FIRST_NAME, e.target.value);
            trigger(FIRST_NAME);
          }}
        />
      </div>
      <div>
        <TextField
          type={TYPE.TEXT}
          name={LAST_NAME}
          label={LABELS.FATHER_NAME}
          placeholder={PLACEHOLDERS.LAST_NAME}
          value={watch(LAST_NAME)}
          error={errors?.[LAST_NAME]?.message}
          onBlur={() => trigger(LAST_NAME)}
          onChange={(e) => {
            setValue(LAST_NAME, e.target.value);
            trigger(LAST_NAME);
          }}
        />
      </div>
      <div>
        <TextField
          disabled={isExists}
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
      </div>
      <div>
        <TextField
          type={TYPE.TEXT}
          name={MOBILE}
          label={LABELS.MOBILE}
          placeholder={PLACEHOLDERS.MOBILE}
          value={watch(MOBILE)}
          error={errors?.[MOBILE]?.message}
          onBlur={() => trigger(MOBILE)}
          onChange={(e) => {
            setValue(MOBILE, e.target.value);
            trigger(MOBILE);
          }}
        />
      </div>
      <div>
        <TextField
          type={TYPE.TEXT}
          name={CNIC}
          label={LABELS.CNIC}
          placeholder={PLACEHOLDERS.CNIC}
          value={watch(CNIC)}
          error={errors?.[CNIC]?.message}
          onBlur={() => trigger(CNIC)}
          onChange={(e) => {
            setValue(CNIC, e.target.value);
            trigger(CNIC);
          }}
        />
      </div>
      <div>
        <TextField
          type={TYPE.TEXT}
          name={ADDRESS}
          label={LABELS.ADDRESS}
          placeholder={PLACEHOLDERS.ADDRESS}
          value={watch(ADDRESS)}
          error={errors?.[ADDRESS]?.message}
          onBlur={() => trigger(ADDRESS)}
          onChange={(e) => {
            setValue(ADDRESS, e.target.value);
            trigger(ADDRESS);
          }}
        />
      </div>
      <div className="lg:col-span-2">
        <Button
          type={"submit"}
          disabled={loading}
          loading={isSubmitting || loading}
          className="w-full mb-0"
        >
          {GENERIC.SUBMIT}
        </Button>
      </div>
    </div>
  );
};

export default FormBody;
