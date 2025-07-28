"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Brain, CheckCircle, Edit3, FileText } from "lucide-react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";

const DocumentInfoAndSummary = ({
  documentTitle,
  eli5Summary,
  advancedSummary,
}: {
  documentTitle: string;
  eli5Summary: string;
  advancedSummary: string;
}) => {
  const [isELI5Mode, setIsELI5Mode] = useState(false);
  return (
    <>
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#2453CC]/10 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-[#2453CC]" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#1E293B]">{documentTitle}</h3>
              <p className="text-sm text-[#64748B]">
                Contract • 12 pages • Analyzed 2 minutes ago
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Label
                htmlFor="eli5-mode"
                className="text-sm text-[#64748B]"
              >
                ELI5 Mode
              </Label>
              <Switch
                id="eli5-mode"
                checked={isELI5Mode}
                onCheckedChange={setIsELI5Mode}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Summary */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-[#1E293B]">
            <Brain className="w-5 h-5 mr-2 text-[#2453CC]" />
            {isELI5Mode ? "Explain Like I'm 5" : "AI Summary"}
          </CardTitle>
          <CardDescription className="text-[#64748B]">
            {isELI5Mode
              ? "Simple explanation that anyone can understand"
              : "Professional analysis of key terms and conditions"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="text-[#1E293B] leading-relaxed">
              {isELI5Mode ? eli5Summary : advancedSummary}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-[#64748B]">
              <CheckCircle className="w-4 h-4 text-[#38B26C]" />
              <span>AI Confidence: 94%</span>
            </div>
            <Button
              variant="outline"
              size="sm"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Summary
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DocumentInfoAndSummary;
