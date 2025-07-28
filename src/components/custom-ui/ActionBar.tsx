"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Coins, ArrowRight } from "lucide-react";
import { CoSigner } from "@/types";

export default function ActionBar({ coSigners }: { coSigners: CoSigner[] }) {
  const signedCount = coSigners.filter((s) => s.status === "signed").length;
  const totalSigners = coSigners.length;

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-[#1E293B]">
              Ready for Next Steps?
            </h3>
            <p className="text-sm text-[#64748B]">
              {signedCount === totalSigners
                ? "All co-signers have approved. Ready to mint NFT certificate."
                : `Waiting for ${totalSigners - signedCount} more signature${
                    totalSigners - signedCount !== 1 ? "s" : ""
                  }.`}
            </p>
          </div>
          <div className="flex space-x-3">
            {signedCount === totalSigners ? (
              <Button
                className="bg-[#38B26C] hover:bg-[#2d8f57] text-white"
                onClick={() => (window.location.href = "/dashboard/mint")}
              >
                <Coins className="w-4 h-4 mr-2" />
                Mint NFT Certificate
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                className="bg-[#2453CC] hover:bg-[#1e42a4] text-white"
                onClick={() => (window.location.href = "/dashboard/invite")}
              >
                <Users className="w-4 h-4 mr-2" />
                Manage Co-signers
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
