"use client";

import { Formik, Form } from "formik";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthLayout from "@/components/AuthLayout";
import Input from "@/components/shared/Input";
import { LoginSchema } from "@/validations/auth";
import { loginInitialValues } from "@/initials/auth";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (values: typeof loginInitialValues, { setSubmitting }: any) => {
    try {
      // Simulate API call using axios
      // const response = await axios.post('/api/auth/login', values);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to access your facial recognition attendance dashboard and tools."
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkHref="/signup"
    >
      <Formik
        initialValues={loginInitialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-2 mt-4">
            <Input label="Email" name="email" type="email" placeholder="Your email" />
            
            <div className="flex flex-col mb-4">
              <Input label="Password" name="password" type="password" placeholder="Enter your password" />
              <div className="flex justify-end mt-2">
                <Link href="/forgotpassword" className="text-sm text-blue-600 font-medium hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex justify-center items-center"
            >
              {isSubmitting ? (
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              ) : (
                "Log in"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}