"use client";
import { Button } from "@mui/material";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const PaymentForm = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleClickOnPay = async () => {
    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: "http://localhost:5173/",
      },
    });

    if (error) {
      setErrorMsg(error.message ?? "Unknown error");
    } else {
      localStorage.removeItem("paymentIntentId");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <PaymentElement />

      <Button disabled={isLoading} onClick={handleClickOnPay} variant="contained">
        {isLoading ? "LOADING..." : "PAY"}
      </Button>
      {errorMsg && <span>{errorMsg}</span>}
    </div>
  );
};

export default PaymentForm;
