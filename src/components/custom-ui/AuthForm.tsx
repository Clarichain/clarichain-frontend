// components/auth/auth-form-layout.tsx
"use client";

import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button as ShadcnButtonComp } from "../ui/button";
import { LogoWithText } from "./hero-section";
import { InteractiveGridPattern } from "../magicui/interactive-grid-pattern";

type AuthFormLayoutProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: React.ReactNode;
};

const AuthFormLayout: React.FC<AuthFormLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="bg-white dark:bg-zinc-950 py-20 text-zinc-800 dark:text-zinc-200 selection:bg-zinc-300 dark:selection:bg-zinc-600">
      <BackButton />
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.25, ease: "easeInOut" }}
        className="relative z-10 mx-auto w-full max-w-xl p-4"
      >
        <div className="mb-6 flex justify-center">
          <LogoWithText
            variant="blue"
            textClassName="!text-xl !font-bold"
            logoClassName="!w-8 !h-8"
          />
        </div>
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold">
            {title || "Sign in to your account"}
          </h1>
          {subtitle}
        </div>

        {children}

        <p className="mt-9 text-xs text-zinc-500 dark:text-zinc-400">
          By signing in, you agree to our{" "}
          <a
            href="#"
            className="text-blue-600 dark:text-blue-400"
          >
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-blue-600 dark:text-blue-400"
          >
            Privacy Policy
          </a>
          .
        </p>
      </motion.div>
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(1100px_circle_at_right,white,transparent)]"
        )}
        opacity={0.6}
        width={70}
        height={70}
        squaresClassName="hover:fill-blue-500/60"
      />
    </div>
  );
};


const BackButton: React.FC = () => {
  const router = useRouter();
  return (
    <ShadcnButtonComp
      onClick={() => router.back()}
      className="!p-0 bg-transparent"
    >
      <SocialButton icon={<ChevronLeft size={16} />}>Go back</SocialButton>
    </ShadcnButtonComp>
  );
};


const SocialButton: React.FC<{
  icon?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
}> = ({ icon, fullWidth, children }) => (
  <button
    className={`relative z-10 flex items-center justify-center gap-2 overflow-hidden rounded-md 
    border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 
    px-4 py-2 font-semibold text-zinc-800 dark:text-zinc-200 transition-all duration-500
    before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5]
    before:rounded-[100%] before:bg-zinc-800 dark:before:bg-zinc-200 before:transition-transform before:duration-1000 before:content-[""]
    hover:scale-105 hover:text-zinc-100 dark:hover:text-zinc-900 hover:before:translate-x-[0%] hover:before:translate-y-[0%] active:scale-95 
    ${fullWidth ? "col-span-2" : ""}`}
  >
    {icon}
    <span>{children}</span>
  </button>
);


export default AuthFormLayout;
