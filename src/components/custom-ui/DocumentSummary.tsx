"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { getPointIcon } from "@/lib/helpers";
import { Brain, CheckCircle, Edit3 } from "lucide-react";
import { Key, useState } from "react";

export default function SummaryTab({ aiAnalysis }: { aiAnalysis: any }) {
  const [isELI5Mode, setIsELI5Mode] = useState(false);

  return (
    <>
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <div className="flex max-md:flex-col gap-3 md:items-center justify-between">
            <div>
              <CardTitle className="flex items-center text-[#1E293B]">
                <Brain className="w-5 h-5 mr-2 text-[#2453CC]" />
                {isELI5Mode ? "Explain Like I'm 5" : "AI Summary"}
              </CardTitle>
              <CardDescription className="text-[#64748B]">
                {isELI5Mode
                  ? "Simple explanation that anyone can understand"
                  : "Professional analysis of key terms and conditions"}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-4">
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
              <Badge className="bg-[#38B26C]/10 text-[#38B26C] border-[#38B26C]/20">
                {aiAnalysis.confidence}% Confidence
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="text-[#1E293B] leading-relaxed">
              {isELI5Mode ? aiAnalysis.eli5Summary : aiAnalysis.summary}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-[#64748B]">
              <CheckCircle className="w-4 h-4 text-[#38B26C]" />
              <span>
                Processed {new Date(aiAnalysis.processedAt).toLocaleString()}
              </span>
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

      {/* Key Points */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="text-[#1E293B]">Key Points</CardTitle>
          <CardDescription className="text-[#64748B]">
            Important terms and conditions highlighted by AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiAnalysis.keyPoints.map((point: { type: string; title: string ; description: string }, index: Key | null | undefined) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-4 bg-[#F8FAFC] rounded-lg"
              >
                {getPointIcon(point.type)}
                <div className="flex-1">
                  <h4 className="font-medium text-[#1E293B] mb-1">
                    {point.title}
                  </h4>
                  <p className="text-sm text-[#64748B]">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
