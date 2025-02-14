'use client';

import { useUpdatePaymentIntentMutation, useCreatePaymentIntentMutation, OrderItems} from './PaymentSlice';
import { ChangeEvent, useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import { useAppSelector } from '../../app/hooks';
import { selectCart } from '../Cart/Cart';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutFlow = () => {
  const curretCart = useAppSelector(selectCart);
  const [stripeClientSecret, setStripeClientSecret] = useState<string | null>(
    null
  );
  const [currency, setCurrency] = useState<string>('usd');

  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [updatePaymentIntent] = useUpdatePaymentIntentMutation();

  const handleClickOnCurrency = async (e: ChangeEvent<HTMLSelectElement>) => {
    const paymentIntentId = localStorage.getItem('paymentIntentId')!;

    const { data} = await updatePaymentIntent({ paymentIntentId, currency: 'usd', totalAmount: curretCart.totalAmount,  cartItems: curretCart.cartItems.map((c) => ({
      id: c.id,
      quantity: c.quantity,
      price: c.product.precio
    })) as OrderItems,});
    if(data){
      const {clientSecret } = data
      setStripeClientSecret(clientSecret);
      setCurrency(e.target.value);
    }
  };

  useEffect(() => {
    const initClientSecret = async () => {
      const paymentIntentId = localStorage.getItem('paymentIntentId');

      if (paymentIntentId) {
        console.log("pagando....")
        const { data } = await updatePaymentIntent(
          {paymentIntentId, currency: 'usd', totalAmount: curretCart.totalAmount,  cartItems: curretCart.cartItems.map((c) => ({
            id: c.id,
            quantity: c.quantity,
            price: c.product.precio
          })) as OrderItems,}
        );
        if(data){
          const {clientSecret} = data
          setStripeClientSecret(clientSecret);
        }
      } else {
        const { data } = await createPaymentIntent( {currency: 'usd', totalAmount: curretCart.totalAmount,  cartItems: curretCart.cartItems.map((c) => ({
          id: c.id,
          quantity: c.quantity,
          price: c.product.precio
        })) as OrderItems,});
        if( data){
          console.log("pagando....")
          const {clientSecret, paymentIntentId } = data
          localStorage.setItem('paymentIntentId', paymentIntentId);
          setStripeClientSecret(clientSecret);
        }
      }
    };
    initClientSecret();
  }, []);

  return (
    <>

      {stripeClientSecret && (
        <>
          <select onChange={handleClickOnCurrency}>
            <option value='usd'>USD</option>
          </select>
          <Elements
            key={currency}
            stripe={stripePromise}
            options={{
              clientSecret: stripeClientSecret,
            }}
          >
            <PaymentForm />
          </Elements>
        </>
      )}
    </>
  );
};

export default CheckoutFlow;