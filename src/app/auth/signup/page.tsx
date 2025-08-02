import AuthFormLayout from "@/components/custom-ui/AuthForm"
import SignupForm from "@/components/custom-ui/SignInForm"
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="max-w-[500px] mx-auto max-md:px-5 max-md:py-10">
      <AuthFormLayout
        title="Create a new account"
        subtitle={
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Sign In
            </Link>
          </p>
        }
      >
        <SignupForm />
      </AuthFormLayout>
    </div>
  );
}
