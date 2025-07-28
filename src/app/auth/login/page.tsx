import AuthFormLayout from "@/components/custom-ui/AuthForm";
import LoginForm from "@/components/custom-ui/LoginForm";

export default function SignInPage() {
  return (
    <div className="max-w-[500px] mx-auto max-md:px-5 max-md:py-10">
      <AuthFormLayout
        title="Sign in to your account"
        subtitle={
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Don’t have an account?{" "}
            <a
              href="/auth/signup"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Create one
            </a>
          </p>
        }
      >
        <LoginForm />
      </AuthFormLayout>
    </div>
  );
}
