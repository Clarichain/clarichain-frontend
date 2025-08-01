"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Feature {
  step: string;
  title?: string;
  content: string;
  image: string;
}

interface FeatureStepsProps {
  features: Feature[];
  className?: string;
  title?: React.ReactNode;
  description: string;
  autoPlayInterval?: number;
  imageHeight?: string;
}

export function FeatureSteps({
  features,
  className,
  title,
  description,
  autoPlayInterval = 3000,
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100));
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [progress, features.length, autoPlayInterval]);

  return (
    <div className={cn("p-8 mt-20 md:p-[70px]", className)}>
      <div className="max-w-7xl mx-auto w-full space-y-16">
        <div>
          <h2 className="text-balance text-4xl sm:text-5xl font-medium md:text-6xl mb-2">
            {title}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-[800px] text-balance">
            {description}
          </p>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10">
          <div className="order-2 md:order-1 space-y-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-6 md:gap-8"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: index === currentFeature ? 1 : 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2",
                    index === currentFeature
                      ? "bg-blue-700 border-blue-700 text-primary-foreground scale-110"
                      : "bg-muted border-muted-foreground"
                  )}
                >
                  {index <= currentFeature ? (
                    <span className="text-lg font-bold">✓</span>
                  ) : (
                    <span className="text-lg font-semibold">{index + 1}</span>
                  )}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {feature.title || feature.step}
                  </h3>
                  <p className="text-sm md:text-lg text-muted-foreground">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className={cn(
              "order-1 md:order-2 relative h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-lg"
            )}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <div
                      key={index}
                      className=" w-full aspect-video bg-black/5 p-4 overflow-hidden"
                    >
                      <div className="w-full h-full relative">
                        <motion.div
                          className="absolute inset-0 rounded-lg overflow-hidden border border-black/10 shadow-sm z-10"
                          initial={{ y: 100, opacity: 0, rotateX: -20 }}
                          animate={{ y: 0, opacity: 1, rotateX: 0 }}
                          exit={{ y: -100, opacity: 0, rotateX: 20 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                          <div className="w-full h-full relative">
                            <Image
                              src={feature.image}
                              alt={feature.step}
                              className="w-full h-full object-cover transition-transform transform object-right-top"
                              fill
                            />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-background via-background/50 to-transparent" />
                        </motion.div>
                      </div>
                    </div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
