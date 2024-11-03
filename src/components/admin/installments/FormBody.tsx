"use client";
import React from "react";
import TextField from "@/components/shared/inputs/TextField";
import Button from "@/components/shared/button";
import { TYPE, LABELS, PLACEHOLDERS, NAMES, GENERIC } from "@/utils/constants";
import type {
  FieldErrors,
  UseFormWatch,
  UseFormTrigger,
  UseFormSetValue,
} from "react-hook-form";
import { ICreateInstallmentInput } from "@/utils/interfaces";
// import UserAutoComplete from "@/components/shared/userAutocomplete";

interface FormBodyProps {
  errors: FieldErrors<ICreateInstallmentInput>;
  isSubmitting: boolean;
  watch: UseFormWatch<ICreateInstallmentInput>;
  trigger: UseFormTrigger<ICreateInstallmentInput>;
  setValue: UseFormSetValue<ICreateInstallmentInput>;
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
  const { USER_ID, DEAL_ID, AMOUNT } = NAMES;
  return (
    <div className="mt-5 grid lg:grid-cols-3 sm:grid-cols-1 gap-4">
      <div>
        <TextField
          type={TYPE.TEXT}
          name={USER_ID}
          label={LABELS.USER_ID}
          placeholder={PLACEHOLDERS.USER_ID}
          value={watch(USER_ID)}
          error={errors?.[USER_ID]?.message}
          onBlur={() => trigger(USER_ID)}
          onChange={(e) => {
            setValue(USER_ID, e.target.value);
            trigger(USER_ID);
          }}
        />
        {/* <UserAutoComplete
          name={USER_ID}
          label={LABELS.USER_ID}
          // placeholder={PLACEHOLDERS.USER_ID}
          value={watch(USER_ID)}
          error={errors?.[USER_ID]?.message}
          onBlur={() => trigger(USER_ID)}
          onChange={(e) => {
            setValue(USER_ID, e.target.value);
            trigger(USER_ID);
          }}
        /> */}
      </div>
      <div>
        <TextField
          type={TYPE.TEXT}
          name={DEAL_ID}
          label={LABELS.DEAL_ID}
          placeholder={PLACEHOLDERS.DEAL_ID}
          value={watch(DEAL_ID)}
          error={errors?.[DEAL_ID]?.message}
          onBlur={() => trigger(DEAL_ID)}
          onChange={(e) => {
            setValue(DEAL_ID, e.target.value);
            trigger(DEAL_ID);
          }}
        />
      </div>

      <div>
        <TextField
          type={TYPE.NUMBER}
          name={AMOUNT}
          label={LABELS.AMOUNT}
          placeholder={PLACEHOLDERS.AMOUNT}
          value={watch(AMOUNT)}
          error={errors?.[AMOUNT]?.message}
          onBlur={() => trigger(AMOUNT)}
          min={0}
          onChange={(e) => {
            setValue(AMOUNT, Number(e.target.value));
            trigger(AMOUNT);
          }}
        />
      </div>

      <div className="lg:col-span-3">
        <Button
          type={"submit"}
          disabled={isSubmitting || loading}
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
