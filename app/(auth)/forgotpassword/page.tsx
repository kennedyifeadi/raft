"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import { toast } from "react-hot-toast";
import AuthLayout from "@/components/AuthLayout";
import Input from "@/components/shared/Input";
import { forgotPasswordInitialValues } from "@/initials/auth";
import { ForgotPasswordSchema } from "@/validations/auth";
import axiosInstance from "@/libs/axios";

export default function ForgotPasswordPage() {
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async (values: typeof forgotPasswordInitialValues) => {
    setSubmitting(true);
    try {
      await axiosInstance.post("/auth/forgot-password", values);
      toast.success("If that email exists, we've sent password reset instructions.");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to send reset link. Please try again later."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your email address to receive password reset instructions."
      footerText="Remembered your password?"
      footerLinkText="Log in"
      footerLinkHref="/login"
    >
      <Formik
        initialValues={forgotPasswordInitialValues}
        validationSchema={ForgotPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting: formikSubmitting }) => (
          <Form className="flex flex-col gap-4 mt-4">
            <Input label="Email Address" name="email" type="email" placeholder="Enter your registered email" />

            <button
              type="submit"
              disabled={isSubmitting || formikSubmitting}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex justify-center items-center"
            >
              {isSubmitting || formikSubmitting ? (
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}