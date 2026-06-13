"use client";

import { Formik, Form } from "formik";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthLayout from "@/components/AuthLayout";
import Input from "@/components/shared/Input";
import { SignupSchema } from "@/validations/auth";
import { signupInitialValues } from "@/initials/auth";

export default function SignupPage() {
  const router = useRouter();

  const handleSubmit = async (values: typeof signupInitialValues, { setSubmitting }: any) => {
    try {
      // Simulate API call using axios
      // const response = await axios.post('/api/auth/signup', values);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Account created successfully!");
      router.push("/login");
    } catch (error) {
      toast.error("Something went wrong during signup. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Start exploring and utilizing all the resources that will help you elevate every design you make."
      footerText="Already have an account?"
      footerLinkText="Log in"
      footerLinkHref="/login"
    >
      <Formik
        initialValues={signupInitialValues}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-3">
            <div className="flex gap-4">
              <Input label="First Name" name="firstName" type="text" placeholder="John" />
              <Input label="Last Name" name="lastName" type="text" placeholder="Doe" />
            </div>
            
            <Input label="Email" name="email" type="email" placeholder="Your email" />
            <Input label="Password" name="password" type="password" placeholder="Create a password" />
            <Input label="Confirm Password" name="confirmPassword" type="password" placeholder="Confirm your password" />

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex justify-center items-center"
            >
              {isSubmitting ? (
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              ) : (
                "Create account"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}