import { FeatureSteps } from "./feature-section";

const features = [
  {
    step: "Step 1",
    title: "AI Analysis",
    content: `Upload your document and get instant AI-powered explanations in plain English, including an "Explain Like I'm 5" mode.`,
    image: "/demo/ai-summary-demo.png",
  },
  {
    step: "Step 2",
    title: "Co-Signing",
    content:
      "Invite multiple parties to review and approve the document. Track signatures and approvals in real-time.",
    image: "/demo/co-signing-demo.png",
  },
  {
    step: "Step 3",
    title: "NFT Minting",
    content:
      "Once all parties approve, mint a tamper-proof NFT on Cardano blockchain as permanent verification.",
    image: "/demo/nft-vault-demo.png",
  },
];

export function HowItWorks() {
  return (
    <div className="py-14">
      <FeatureSteps
        features={features}
        title="How ClariChain Works"
        autoPlayInterval={4000}
        imageHeight="h-[500px]"
      />
    </div>
  );
}
