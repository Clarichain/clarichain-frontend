"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PenTool } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function SignDialog() {
  const [isSigned, setIsSigned] = useState(false);
  const [privateKey, setPrivateKey] = useState("");

  return isSigned ? (
    <div className="bg-blue-200/40 text-blue-700 px-5 py-1 rounded-md">
      Signed
    </div>
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-blue-700 text-white hover:bg-blue-700/80"
        >
          <PenTool className="w-4 h-4 mr-2" />
          Sign Contract
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Signature</DialogTitle>
          <DialogDescription>
            For your security, please enter your private key to sign this
            contract.
            <br />
            <span className="text-sm text-muted-foreground">
              (This is the same password you used when creating your account)
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            type="password"
            placeholder="Enter your private key"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
          />

          <Button
            className="w-full bg-blue-700 text-white hover:bg-blue-700/90"
            onClick={() => {
              if (privateKey.trim()) {
                setIsSigned(true);
              }
            }}
          >
            Sign Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
