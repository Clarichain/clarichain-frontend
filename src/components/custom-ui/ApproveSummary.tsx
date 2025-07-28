"use client";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Edit3,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const ApproveSummary = () => {
  const [isApproved, setIsApproved] = useState(false);

  const handleApprove = () => {
    setIsApproved(true);
    // router.push('/dashboard/document/1')
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-[#1E293B]">Review & Approve</CardTitle>
        <CardDescription className="text-[#64748B]">
          Confirm the AI analysis is accurate before proceeding
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isApproved ? (
          <div className="space-y-4">
            <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-[#F59E0B] mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#1E293B] mb-1">
                    Review Required
                  </h4>
                  <p className="text-sm text-[#64748B]">
                    Please review the AI analysis carefully. You can edit the
                    summary if needed before approving and moving to the
                    co-signer invitation step.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                onClick={handleApprove}
                className="bg-[#38B26C] hover:bg-[#2d8f57] text-white"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve Analysis
              </Button>
              <Button variant="outline">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Summary
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-[#38B26C]/10 border border-[#38B26C]/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#38B26C] mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#1E293B] mb-1">
                    Analysis Approved
                  </h4>
                  <p className="text-sm text-[#64748B]">
                    Great! The AI analysis has been approved. You can now invite
                    co-signers to review and sign the document.
                  </p>
                </div>
              </div>
            </div>

            <Button
              className="bg-[#2453CC] hover:bg-[#1e42a4] text-white"
              onClick={() => (window.location.href = `/dashboard/document/1`)}
            >
              <Users className="w-4 h-4 mr-2" />
              Invite Co-signers
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApproveSummary;
