"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { getSignerStatusIcon, getStatusBadge } from "@/lib/helpers";
import { CoSigner } from "@/types";
import { Clock, Plus, Send } from "lucide-react";
import { useState } from "react";
import { TabsContent } from "../ui/tabs";
import { Textarea } from "../ui/textarea";

export default function CoSignersTab({
  initialCoSigners,
}: {
  initialCoSigners: CoSigner[];
}) {
  const [coSigners, setCoSigners] = useState<CoSigner[]>(initialCoSigners);
  const [newSignerEmail, setNewSignerEmail] = useState("");
  const [newSignerName, setNewSignerName] = useState("");
  const [newSignerRole, setNewSignerRole] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");
  const [isInviting, setIsInviting] = useState(false);

  const addCoSigner = async () => {
    if (!newSignerEmail || !newSignerName) return;

    setIsInviting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newSigner: CoSigner = {
      id: Date.now().toString(),
      name: newSignerName,
      email: newSignerEmail,
      role: newSignerRole || "Reviewer",
      status: "invited",
      invitedAt: new Date().toISOString(),
      avatar: newSignerName
        .split(" ")
        .map((n) => n[0])
        .join(""),
    };

    setCoSigners([...coSigners, newSigner]);
    setNewSignerEmail("");
    setNewSignerName("");
    setNewSignerRole("");
    setInviteMessage("");
    setIsInviting(false);
  };

  const getSigningProgress = () => {
    const signed = coSigners.filter(
      (signer) => signer.status === "signed"
    ).length;
    const total = coSigners.length;
    return total > 0 ? (signed / total) * 100 : 0;
  };

  return (
    <TabsContent
      value="cosigners"
      className="space-y-6"
    >
      {/* Signing Progress */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="text-[#1E293B]">Signing Progress</CardTitle>
          <CardDescription className="text-[#64748B]">
            Track the status of all co-signers and their interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#1E293B]">
                {coSigners?.filter((s) => s.status === "signed").length} of{" "}
                {coSigners.length} signed
              </span>
              <span className="text-sm text-[#64748B]">
                {Math.round(getSigningProgress())}% complete
              </span>
            </div>
            <Progress
              value={getSigningProgress()}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Co-signers List */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#1E293B]">
                Co-signers ({coSigners?.length})
              </CardTitle>
              <CardDescription className="text-[#64748B]">
                Manage and track co-signer interactions
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#2453CC] hover:bg-[#1e42a4] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Co-signer
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className="text-[#1E293B]">
                    Invite Co-signer
                  </DialogTitle>
                  <DialogDescription className="text-[#64748B]">
                    Add a new person to review and sign this document
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-[#1E293B]"
                      >
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={newSignerName}
                        onChange={(e) => setNewSignerName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="role"
                        className="text-[#1E293B]"
                      >
                        Role
                      </Label>
                      <Input
                        id="role"
                        placeholder="Reviewer"
                        value={newSignerRole}
                        onChange={(e) => setNewSignerRole(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-[#1E293B]"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={newSignerEmail}
                      onChange={(e) => setNewSignerEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-[#1E293B]"
                    >
                      Custom Message (Optional)
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Please review and sign this document..."
                      value={inviteMessage}
                      onChange={(e) => setInviteMessage(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <Button
                    onClick={addCoSigner}
                    disabled={!newSignerEmail || !newSignerName || isInviting}
                    className="w-full bg-[#38B26C] hover:bg-[#2d8f57] text-white"
                  >
                    {isInviting ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Sending Invitation...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Invitation
                      </>
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {coSigners.map((signer) => (
              <div
                key={signer.id}
                className="flex items-start space-x-4 p-4 bg-[#F9FAFB] rounded-lg border"
              >
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-[#2453CC] text-white">
                    {signer.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-[#1E293B]">
                        {signer.name}
                      </h4>
                      <p className="text-sm text-[#64748B]">{signer.email}</p>
                      <p className="text-xs text-[#64748B]">{signer.role}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getSignerStatusIcon(signer.status)}
                      {getStatusBadge(signer.status)}
                    </div>
                  </div>
                  <div className="text-xs text-[#64748B]">
                    <p>
                      Invited: {new Date(signer.invitedAt).toLocaleString()}
                    </p>
                    {signer.signedAt && (
                      <p>
                        Signed: {new Date(signer.signedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                  {signer.comments && (
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-[#1E293B]">
                        {signer.comments}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
