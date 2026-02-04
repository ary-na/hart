// src/components/site/CheckoutPage.tsx

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FormField, SubmitButton } from "@hart/lib/ui";
import { useCartContext, useToast } from "@hart/hooks";

type CheckoutFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postCode: string;
  country: string;
  billingSameAsShipping: boolean;
  billingStreet: string;
  billingCity: string;
  billingState: string;
  billingPostCode: string;
  billingCountry: string;
  paymentMethod: "card" | "paypal" | "apple_pay" | "google_pay";
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
};

const CheckoutPage = () => {
  const { items, loading, fetchCart } = useCartContext();
  const { showToast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<
    CheckoutFormValues["paymentMethod"]
  >("card");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    defaultValues: {
      billingSameAsShipping: true,
      paymentMethod: "card",
    },
  });

  const billingSameAsShipping = watch("billingSameAsShipping", true);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price, 0),
    [items]
  );

  const onSubmit = async () => {
    showToast("Checkout is coming soon.", "info");
  };

  return (
    <section className="px-6 py-10 md:px-10 lg:px-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1>Checkout</h1>
          <p className="opacity-70">Secure your artwork with a few details.</p>
        </div>
        <Link href="/user/cart" className="btn btn-ghost">
          Back to cart
        </Link>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-8"
          noValidate
        >
          <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
            <h2 className="text-xl font-semibold">Shipping details</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <FormField
                id="firstName"
                label="First name"
                placeholder="Hilda"
                registerProps={register("firstName", { required: true })}
                error={errors.firstName ? "First name is required" : undefined}
              />
              <FormField
                id="lastName"
                label="Last name"
                placeholder="Okara"
                registerProps={register("lastName")}
                required={false}
              />
              <FormField
                id="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
                registerProps={register("email", { required: true })}
                error={errors.email ? "Email is required" : undefined}
              />
              <FormField
                id="phone"
                label="Phone"
                type="tel"
                placeholder="+1 555 000 000"
                registerProps={register("phone")}
                required={false}
              />
              <FormField
                id="street"
                label="Street address"
                placeholder="123 Art Street"
                registerProps={register("street", { required: true })}
                error={errors.street ? "Street is required" : undefined}
              />
              <FormField
                id="city"
                label="City"
                placeholder="Melbourne"
                registerProps={register("city", { required: true })}
                error={errors.city ? "City is required" : undefined}
              />
              <FormField
                id="state"
                label="State"
                placeholder="VIC"
                registerProps={register("state")}
                required={false}
              />
              <FormField
                id="postCode"
                label="Post code"
                placeholder="3000"
                registerProps={register("postCode", { required: true })}
                error={errors.postCode ? "Post code is required" : undefined}
              />
              <FormField
                id="country"
                label="Country"
                placeholder="Australia"
                registerProps={register("country", { required: true })}
                error={errors.country ? "Country is required" : undefined}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Billing details</h2>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  {...register("billingSameAsShipping")}
                />
                Same as shipping
              </label>
            </div>

            {!billingSameAsShipping && (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <FormField
                  id="billingStreet"
                  label="Street address"
                  placeholder="123 Art Street"
                  registerProps={register("billingStreet", { required: true })}
                  error={
                    errors.billingStreet
                      ? "Billing street is required"
                      : undefined
                  }
                />
                <FormField
                  id="billingCity"
                  label="City"
                  placeholder="Melbourne"
                  registerProps={register("billingCity", { required: true })}
                  error={
                    errors.billingCity ? "Billing city is required" : undefined
                  }
                />
                <FormField
                  id="billingState"
                  label="State"
                  placeholder="VIC"
                  registerProps={register("billingState")}
                  required={false}
                />
                <FormField
                  id="billingPostCode"
                  label="Post code"
                  placeholder="3000"
                  registerProps={register("billingPostCode", { required: true })}
                  error={
                    errors.billingPostCode
                      ? "Billing post code is required"
                      : undefined
                  }
                />
                <FormField
                  id="billingCountry"
                  label="Country"
                  placeholder="Australia"
                  registerProps={register("billingCountry", { required: true })}
                  error={
                    errors.billingCountry
                      ? "Billing country is required"
                      : undefined
                  }
                />
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
            <h2 className="text-xl font-semibold">Payment method</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {[
                { value: "card", label: "Card" },
                { value: "paypal", label: "PayPal" },
                { value: "apple_pay", label: "Apple Pay" },
                { value: "google_pay", label: "Google Pay" },
              ].map((method) => (
                <label
                  key={method.value}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                    paymentMethod === method.value
                      ? "border-primary bg-primary/5"
                      : "border-base-300"
                  }`}
                >
                  <input
                    type="radio"
                    className="radio radio-sm"
                    value={method.value}
                    {...register("paymentMethod")}
                    checked={paymentMethod === method.value}
                    onChange={() =>
                      setPaymentMethod(method.value as CheckoutFormValues["paymentMethod"])
                    }
                  />
                  <span className="text-sm font-medium">{method.label}</span>
                </label>
              ))}
            </div>

            {paymentMethod === "card" && (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <FormField
                  id="cardName"
                  label="Name on card"
                  placeholder="Hilda Okara"
                  registerProps={register("cardName", { required: true })}
                  error={errors.cardName ? "Name is required" : undefined}
                />
                <FormField
                  id="cardNumber"
                  label="Card number"
                  placeholder="1234 5678 9012 3456"
                  registerProps={register("cardNumber", { required: true })}
                  error={errors.cardNumber ? "Card number is required" : undefined}
                />
                <FormField
                  id="cardExpiry"
                  label="Expiry"
                  placeholder="MM/YY"
                  registerProps={register("cardExpiry", { required: true })}
                  error={errors.cardExpiry ? "Expiry is required" : undefined}
                />
                <FormField
                  id="cardCvc"
                  label="CVC"
                  placeholder="123"
                  registerProps={register("cardCvc", { required: true })}
                  error={errors.cardCvc ? "CVC is required" : undefined}
                />
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <SubmitButton
              isLoading={loading}
              text="Place order"
              loadingText="Processing..."
              disabled={items.length === 0}
            />
          </div>
        </form>

        <aside className="h-fit rounded-2xl border border-base-300 bg-base-100 p-6">
          <h2 className="text-xl font-semibold">Order summary</h2>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={item.drawingId} className="flex justify-between text-sm">
                <span className="opacity-80">{item.title}</span>
                <span>${item.price.toLocaleString()}</span>
              </div>
            ))}
            {items.length === 0 && !loading && (
              <p className="text-sm opacity-70">
                Your cart is empty. Add a drawing to continue.
              </p>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-base-300 pt-4 text-base font-semibold">
            <span>Subtotal</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default CheckoutPage;
