"use client";

import { AnimatedGroup } from "@/components/ui/animated-group";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, PlayCircle, X } from "lucide-react";
import { useScroll, Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AnimatedGridPattern } from "../magicui/animated-grid-pattern";
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";
import { useSession } from "next-auth/react";
import ProfileAvatarWithDropdownMenu from "./ProfileAvatarWithDropdownMenu";

const transitionVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(12px)",
    y: 12,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 1.5,
    },
  },
};

export function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden bg-white pb-20">
        <section>
          <AnimatedGridPattern
            className={cn(
              "[mask-image:radial-gradient(1100px_circle_at_right,white,transparent)]"
            )}
            width={70}
            height={70}
            numSquares={20}
            maxOpacity={0.1}
            repeatDelay={1}
            color="#60A5FA"
          />

          <div className="relative pt-16">
            <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]"></div>
            <BackgroundBeamsWithCollision className="h-fit">
              <div className="mx-auto p-8 md:p-[70px]">
                <div className="sm:mx-auto lg:mr-auto">
                  <AnimatedGroup
                    variants={{
                      container: {
                        visible: {
                          transition: {
                            staggerChildren: 0.05,
                            delayChildren: 0.75,
                          },
                        },
                      },
                      ...transitionVariants,
                    }}
                  >
                    <h1 className="mt-4 max-w-2xl text-balance text-4xl sm:text-5xl font-medium md:text-6xl lg:mt-8">
                      Read, Break Down, and Sign Docs with AI
                    </h1>
                    <p className="mt-4 max-w-2xl text-pretty text-base md:text-lg">
                      Upload contracts, policies, or academic papers and get
                      clear AI-powered explanations. Mint tamper-proof NFTs on
                      Cardano as verifiable proof of understanding.
                    </p>
                    <div className="mt-8 flex items-center gap-2">
                      <div
                        key={1}
                        className="bg-foreground/10 rounded-[14px] border p-0.5"
                      >
                        <Button
                          asChild
                          size="lg"
                          className="px-5 text-base bg-blue-600"
                        >
                          <Link href="/dashboard">
                            <span className="text-nowrap">Get Started</span>
                          </Link>
                        </Button>
                      </div>
                      <Button
                        key={2}
                        asChild
                        size="lg"
                        variant="outline"
                        className="border-black/30 px-5 text-base"
                      >
                        <Link
                          href="#link"
                          className="flex"
                        >
                          <PlayCircle />
                          <span className="text-nowrap">Watch demo</span>
                        </Link>
                      </Button>
                    </div>
                  </AnimatedGroup>
                </div>
              </div>
            </BackgroundBeamsWithCollision>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="relative -mr-56 mt-4 overflow-hidden sm:mr-0 sm:mt-8 px-8 md:px-[70px] ">
                <div
                  aria-hidden
                  className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                />
                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto overflow-hidden rounded-2xl border shadow-lg shadow-zinc-950/15 ring-1">
                  <img
                    className="bg-background aspect-15/8 relative hidden rounded-2xl dark:block"
                    src="/demo/dashboard-demo.png"
                    alt="app screen"
                    width="2700"
                    height="1440"
                  />
                  <img
                    className="z-2 border-border/25 aspect-15/8 relative rounded-2xl border dark:hidden"
                    src="/demo/dashboard-demo.png"
                    alt="app screen"
                    width="2700"
                    height="1440"
                  />
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>
        {/* <section className="bg-background pb-16 pt-16 md:pb-32">
          <div className="group relative m-auto max-w-5xl px-6">
            <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
              <Link
                href="/"
                className="block text-sm duration-150 hover:opacity-75"
              >
                <span> Meet Our Customers</span>

                <ChevronRight className="ml-1 inline-block size-3" />
              </Link>
            </div>
            <div className="group-hover:blur-xs mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:gap-x-16 sm:gap-y-14">
              <div className="flex">
                <img
                  className="mx-auto h-5 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/nvidia.svg"
                  alt="Nvidia Logo"
                  height="20"
                  width="auto"
                />
              </div>

              <div className="flex">
                <img
                  className="mx-auto h-4 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/column.svg"
                  alt="Column Logo"
                  height="16"
                  width="auto"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-4 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/github.svg"
                  alt="GitHub Logo"
                  height="16"
                  width="auto"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-5 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/nike.svg"
                  alt="Nike Logo"
                  height="20"
                  width="auto"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-5 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                  alt="Lemon Squeezy Logo"
                  height="20"
                  width="auto"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-4 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/laravel.svg"
                  alt="Laravel Logo"
                  height="16"
                  width="auto"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-7 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/lilly.svg"
                  alt="Lilly Logo"
                  height="28"
                  width="auto"
                />
              </div>

              <div className="flex">
                <img
                  className="mx-auto h-6 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/openai.svg"
                  alt="OpenAI Logo"
                  height="24"
                  width="auto"
                />
              </div>
            </div>
          </div>
        </section> */}
      </main>
    </>
  );
}

const menuItems = [
  { name: "Features", href: "#link" },
  { name: "Solution", href: "#link" },
  { name: "Pricing", href: "#link" },
  { name: "About", href: "#link" },
];

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollYProgress } = useScroll();
  const { data: session } = useSession();

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrolled(latest > 0.05);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <header className="relative z-50">
      <nav
        data-state={menuState && "active"}
        className={cn(
          "group fixed z-50 w-full border-b transition-colors duration-150 bg-white",
          scrolled && "bg-background/50 backdrop-blur-3xl"
        )}
      >
        <div className="mx-auto px-8 md:px-[70px] transition-all duration-300">
          <div className="relative flex items-center justify-between gap-14 py-3 lg:py-4">
            <div className="flex max-md:w-full items-center justify-between gap-12">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <LogoWithText variant="blue" logoClassName="md:size-7" textClassName="md:text-[18px] md:font-medium md:tracking-wide" />
              </Link>

              {/* Hamburger Menu Toggle */}
              {!session?.user && (
                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState ? "Close Menu" : "Open Menu"}
                  className="relative z-50 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                >
                  <Menu
                    className={cn(
                      "m-auto size-6 duration-200",
                      menuState && "rotate-180 scale-0 opacity-0"
                    )}
                  />
                  <X
                    className={cn(
                      "absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200",
                      menuState && "rotate-0 scale-100 opacity-100"
                    )}
                  />
                </button>
              )}
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden lg:block mx-auto">
              <ul className="flex gap-8 text-base">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop CTA Buttons */}
            {!session?.user ? (
              <div className="hidden lg:flex w-fit gap-6">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                >
                  <Link href="/auth/login">
                    <span>Login</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-blue-600 text-primary-foreground px-5 text-base "
                >
                  <Link href="/auth/signup">
                    <span>Sign Up</span>
                  </Link>
                </Button>
              </div>
            ) : (
              <ProfileAvatarWithDropdownMenu session={session} />
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuState && (
          <div className="lg:hidden absolute top-full left-0 w-full px-8 md:px-12 z-40 bg-white pb-6 border-b shadow-2xl">
            <ul className="space-y-6 py-6 text-base">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-accent-foreground block duration-150"
                  >
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0">
              <Button
                asChild
                variant="outline"
                size="sm"
              >
                <Link href="/auth/login">
                  <span>Login</span>
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-blue-600 text-primary-foreground rounded-xl px-5 text-base"
              >
                <Link href="/auth/signup">
                  <span>Sign Up</span>
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export const Logo = ({
  variant,
  className,
}: {
  variant: "white" | "blue";
  className?: string;
}) => {
  return (
    <div className={cn("relative w-[23px] h-[20px]", className)}>
      <Image
        src={
          variant === "blue" ? "/logo/blue-logo.svg" : "/logo/white-logo.svg"
        }
        alt="logo"
        fill
        priority
      />
    </div>
  );
};

export const LogoWithText = ({
  variant,
  className,
  textClassName,
  logoClassName,
}: {
  variant: "white" | "blue";
  className?: string;
  textClassName?: string;
  logoClassName?: string;
}) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Logo
        variant={variant}
        className={cn("w-full min-w-6 h-6", logoClassName)}
      />
      <h2
        className={cn("font-medium font-inter text-foreground", textClassName)}
      >
        ClariChain
      </h2>
    </div>
  );
};
