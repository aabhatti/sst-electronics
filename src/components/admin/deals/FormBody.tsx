"use client";
import React from "react";
import TextField from "@/components/shared/inputs/TextField";
import Button from "@/components/shared/button";
import { TYPE, LABELS, PLACEHOLDERS, NAMES, GENERIC } from "@/utils/constants";
import {
  FieldErrors,
  UseFormWatch,
  UseFormTrigger,
  UseFormSetValue,
} from "react-hook-form";
import { ICreateDealInput } from "@/utils/interfaces";
import UserAutoComplete from "@/components/shared/userAutocomplete";
import Autocomplete from "@/components/shared/autocomplete";
import { paymentMethodeOptions } from "../installments/helper";

interface FormBodyProps {
  errors: FieldErrors<ICreateDealInput>;
  isSubmitting: boolean;
  watch: UseFormWatch<ICreateDealInput>;
  trigger: UseFormTrigger<ICreateDealInput>;
  setValue: UseFormSetValue<ICreateDealInput>;
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
  const {
    USER,
    USER_ID,
    NAME,
    DESCRIPTION,
    WORTH,
    ADVANCE,
    NO_OF_INSTALLMENTS,
    REFERENCE_ONE,
    REFERENCE_ONE_USER,
    REFERENCE_TWO,
    REFERENCE_TWO_USER,
    DATE,
    PAYMENT_METHODE,
    METHODE,
  } = NAMES;
  return (
    <div className="mt-5 grid lg:grid-cols-12 sm:grid-cols-1 gap-4">
      <div className="lg:col-span-6">
        <UserAutoComplete
          // required={true}
          name={USER_ID}
          label={LABELS.USER_ID}
          value={watch(USER)}
          error={errors?.[USER_ID]?.message}
          onBlur={() => trigger(USER_ID)}
          onChange={(val) => {
            const userId = (val && val[0] && val[0].id) || "";
            setValue(USER, val || []);
            setValue(USER_ID, userId);
            trigger(USER_ID);
          }}
        />
      </div>
      <div className="lg:col-span-6">
        <TextField
          type={TYPE.TEXT}
          name={NAME}
          label={LABELS.NAME}
          placeholder={PLACEHOLDERS.NAME}
          value={watch(NAME)}
          error={errors?.[NAME]?.message}
          onBlur={() => trigger(NAME)}
          onChange={(e) => {
            setValue(NAME, e.target.value);
            trigger(NAME);
          }}
        />
      </div>
      <div className="lg:col-span-8">
        <TextField
          type={TYPE.TEXT}
          name={DESCRIPTION}
          label={LABELS.DESCRIPTION}
          placeholder={PLACEHOLDERS.DESCRIPTION}
          value={watch(DESCRIPTION)}
          error={errors?.[DESCRIPTION]?.message}
          onBlur={() => trigger(DESCRIPTION)}
          onChange={(e) => {
            setValue(DESCRIPTION, e.target.value);
            trigger(DESCRIPTION);
          }}
        />
      </div>
      <div className="lg:col-span-4">
        <TextField
          type={TYPE.DATE}
          name={DATE}
          label={LABELS.DATE}
          placeholder={PLACEHOLDERS.DATE}
          value={watch(DATE)}
          error={errors?.[DATE]?.message}
          onBlur={() => trigger(DATE)}
          min={0}
          onChange={(e) => {
            setValue(DATE, e.target.value);
            trigger(DATE);
          }}
        />
      </div>
      <div className="lg:col-span-3">
        <TextField
          type={TYPE.NUMBER}
          name={WORTH}
          label={LABELS.WORTH}
          placeholder={PLACEHOLDERS.WORTH}
          value={watch(WORTH)}
          error={errors?.[WORTH]?.message}
          onBlur={() => trigger(WORTH)}
          min={0}
          onChange={(e) => {
            setValue(WORTH, Number(e.target.value));
            trigger(WORTH);
          }}
        />
      </div>
      <div className="lg:col-span-3">
        <TextField
          type={TYPE.NUMBER}
          name={ADVANCE}
          label={LABELS.ADVANCE}
          placeholder={PLACEHOLDERS.ADVANCE}
          value={watch(ADVANCE)}
          error={errors?.[ADVANCE]?.message}
          onBlur={() => trigger(ADVANCE)}
          min={0}
          onChange={(e) => {
            setValue(ADVANCE, Number(e.target.value));
            trigger(ADVANCE);
          }}
        />
      </div>

      <div className="lg:col-span-3">
        <Autocomplete
          required={true}
          name={PAYMENT_METHODE}
          label={LABELS.PAYMENT_METHODE}
          placeholder={PLACEHOLDERS.PAYMENT_METHODE}
          data={paymentMethodeOptions}
          value={watch(METHODE)}
          error={errors?.[PAYMENT_METHODE]?.message}
          onBlur={() => trigger(PAYMENT_METHODE)}
          onChange={(d) => {
            setValue(METHODE, d);
            setValue(PAYMENT_METHODE, (d && d[0] && d[0].id) || "");
            trigger(PAYMENT_METHODE);
          }}
        />
      </div>
      <div className="lg:col-span-3">
        <TextField
          type={TYPE.NUMBER}
          name={NO_OF_INSTALLMENTS}
          label={LABELS.NO_OF_INSTALLMENTS}
          placeholder={PLACEHOLDERS.NO_OF_INSTALLMENTS}
          value={watch(NO_OF_INSTALLMENTS)}
          error={errors?.[NO_OF_INSTALLMENTS]?.message}
          onBlur={() => trigger(NO_OF_INSTALLMENTS)}
          min={0}
          onChange={(e) => {
            setValue(NO_OF_INSTALLMENTS, Number(e.target.value));
            trigger(NO_OF_INSTALLMENTS);
          }}
        />
      </div>
      <div className="lg:col-span-6">
        <UserAutoComplete
          name={REFERENCE_ONE}
          label={LABELS.REFERENCE_ONE}
          value={watch(REFERENCE_ONE_USER)}
          error={errors?.[REFERENCE_ONE]?.message}
          onBlur={() => trigger(REFERENCE_ONE)}
          onChange={(val) => {
            const userId = (val && val[0] && val[0].id) || "";
            setValue(REFERENCE_ONE_USER, val || []);
            setValue(REFERENCE_ONE, userId);
            trigger(REFERENCE_ONE);
          }}
        />
      </div>

      <div className="lg:col-span-6">
        <UserAutoComplete
          name={REFERENCE_TWO}
          label={LABELS.REFERENCE_TWO}
          // value={watch(REFERENCE_ONE_USER)}
          value={watch(REFERENCE_TWO_USER)}
          error={errors?.[REFERENCE_TWO]?.message}
          onBlur={() => trigger(REFERENCE_TWO)}
          onChange={(val) => {
            const userId = (val && val[0] && val[0].id) || "";
            setValue(REFERENCE_TWO_USER, val || []);
            setValue(REFERENCE_TWO, userId);
            trigger(REFERENCE_TWO);
          }}
        />
      </div>

      <div className="lg:col-span-12">
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
