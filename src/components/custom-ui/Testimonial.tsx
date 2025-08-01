import React from "react";
import CircularTestimonials from "./TestimonialLayout";

const testimonials = [
  {
    quote:
      "ClariChain helped our clients understand complex legal agreements with ease. What used to require back-and-forth explanations and legal consultations is now simplified into clear, digestible insights. Since integrating it into our workflow, we've seen a 60% drop in client misunderstandings and disputes.",
    name: "Sarah Chen - Legal Partner",
    designation: "Legal Contracts",
    src: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "ClariChain has been perfect for streamlining thesis approvals and managing research collaborations across departments. The blockchain-based verification ensures every document is authentic and tamper-proof, which gives us full confidence when reviewing submissions.",
    name: "Dr. Michael Torres - University Professor",
    designation: "Academic Research",
    src: "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
  {
    quote:
      "With ClariChain, government policies are now easily accessible to everyday citizens. It has effectively bridged the long-standing communication gap between policymakers and the public. By breaking down complex documents into clear, ClariChain has empowered more people to stay informed and engaged in governance.",
    name: "Alex Rodriguez - Policy Director",
    designation: "Policy Documents",
    src: "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
];

export const Testimonials = () => (
  <section>
    <div className="bg-white p-8 py-20 md:p-20 md:px-[70px] rounded-lg min-h-[300px] flex flex-wrap gap-6  relative">
      <div className="mb-10">
        <h2 className="text-balance text-4xl sm:text-5xl font-medium md:text-6xl mb-2">
          Trusted <span className="text-blue-600">Across</span> Industries
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-[800px] text-balance">
          From AI-powered document analysis to secure on-chain signatures,
          ClariChain helps individuals and teams simplify complex contracts and
          prove compliance where it matters.
        </p>
      </div>
      <div
        className="items-center justify-center relative flex"
        style={{ maxWidth: "1456px" }}
      >
        <CircularTestimonials
          testimonials={testimonials}
          autoplay={true}
          colors={{
            name: "#0a0a0a",
            designation: "#454545",
            testimony: "#171717",
            arrowBackground: "#141414",
            arrowForeground: "#f1f1f7",
            arrowHoverBackground: "#00A6FB",
          }}
          fontSizes={{
            name: "24px",
            designation: "18px",
            quote: "18px",
          }}
        />
      </div>
    </div>
  </section>
);
