"use client";
import React, { useState, useEffect } from "react";
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
import Autocomplete from "@/components/shared/autocomplete";
import UserAutoComplete from "@/components/shared/userAutocomplete";
import { handleFetchUserDealsByUserId, initialDealsValue } from "./helper";

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
  const { USER, USER_ID, DEAL, DEAL_ID, AMOUNT } = NAMES;
  const [deals, setDeals] = useState(initialDealsValue);
  useEffect(() => {
    if (watch(USER_ID)) {
      handleFetchUserDealsByUserId({
        userId: watch(USER_ID),
        setDeals,
      });
    }
  }, [watch(USER_ID)]);

  return (
    <div className="mt-5 grid lg:grid-cols-3 sm:grid-cols-1 gap-4">
      <div>
        <UserAutoComplete
          name={USER_ID}
          label={LABELS.USER_ID}
          value={watch(USER)}
          error={errors?.[USER_ID]?.message}
          onBlur={() => trigger(USER_ID)}
          onChange={(val) => {
            const userId = (val && val[0] && val[0].id) || "";
            setValue(USER, val || []);
            if (!userId) {
              setValue(DEAL, []);
              setValue(DEAL_ID, "");
            }
            setValue(USER_ID, userId);
            trigger(USER_ID);
          }}
        />
      </div>
      <div>
        <Autocomplete
          disabled={!watch(USER_ID)}
          loading={deals.loading}
          name={DEAL_ID}
          label={LABELS.DEAL_ID}
          placeholder={PLACEHOLDERS.DEAL_ID}
          data={deals.data || []}
          value={watch(DEAL)}
          error={errors?.[DEAL_ID]?.message}
          onBlur={() => trigger(DEAL_ID)}
          onChange={(d) => {
            console.log("d>>>>", d);
            setValue(DEAL, d);
            setValue(DEAL_ID, (d && d[0] && d[0].id) || "");
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
