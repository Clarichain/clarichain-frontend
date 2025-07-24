"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Brain, FileText, Users, ArrowRight, Edit3, CheckCircle, AlertTriangle, Info } from "lucide-react"

export default function AnalyzePage({ params }: { params: { filename: string } }) {
  const [isELI5Mode, setIsELI5Mode] = useState(false)
  const [isApproved, setIsApproved] = useState(false)

  const documentTitle = decodeURIComponent(params.filename)

  const advancedSummary = `This Software License Agreement establishes the terms and conditions under which the licensor grants the licensee certain rights to use proprietary software. The agreement includes provisions for intellectual property protection, usage limitations, liability disclaimers, and termination clauses. Key obligations include maintaining confidentiality of proprietary information, compliance with usage restrictions, and adherence to payment terms as specified in Schedule A.`

  const eli5Summary = `Think of this like renting a special computer program. The company that made the program (like a landlord) is letting you use it, but you have to follow some rules. You can't share it with others, you have to pay what you agreed to pay, and if you break the rules, they can take it away. It's like borrowing a friend's video game - you can play it, but you can't give it to someone else or claim you made it.`

  const keyPoints = [
    {
      title: "Usage Rights",
      description: "Limited license for internal business use only",
      type: "info",
    },
    {
      title: "Payment Terms",
      description: "Annual license fee of $50,000 due within 30 days",
      type: "warning",
    },
    {
      title: "Confidentiality",
      description: "All proprietary information must remain confidential",
      type: "important",
    },
    {
      title: "Termination",
      description: "Either party may terminate with 90 days written notice",
      type: "info",
    },
  ]

  const getPointIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
      case "important":
        return <CheckCircle className="w-4 h-4 text-[#38B26C]" />
      default:
        return <Info className="w-4 h-4 text-[#2453CC]" />
    }
  }

  const handleApprove = () => {
    setIsApproved(true)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">AI Document Analysis</h1>
          <p className="text-[#64748B] mt-1">Plain-language breakdown of your document</p>
        </div>
        <Badge className="bg-[#38B26C]/10 text-[#38B26C] border-[#38B26C]/20">Analysis Complete</Badge>
      </div>

      {/* Document Info */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#2453CC]/10 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-[#2453CC]" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#1E293B]">{documentTitle}</h3>
              <p className="text-sm text-[#64748B]">Contract • 12 pages • Analyzed 2 minutes ago</p>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="eli5-mode" className="text-sm text-[#64748B]">
                ELI5 Mode
              </Label>
              <Switch id="eli5-mode" checked={isELI5Mode} onCheckedChange={setIsELI5Mode} />
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
            <p className="text-[#1E293B] leading-relaxed">{isELI5Mode ? eli5Summary : advancedSummary}</p>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-[#64748B]">
              <CheckCircle className="w-4 h-4 text-[#38B26C]" />
              <span>AI Confidence: 94%</span>
            </div>
            <Button variant="outline" size="sm">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Summary
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Points */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#1E293B]">Key Points</CardTitle>
          <CardDescription className="text-[#64748B]">Important terms and conditions highlighted by AI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {keyPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-[#F8FAFC] rounded-lg">
                {getPointIcon(point.type)}
                <div className="flex-1">
                  <h4 className="font-medium text-[#1E293B] mb-1">{point.title}</h4>
                  <p className="text-sm text-[#64748B]">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Approval Section */}
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
                    <h4 className="font-semibold text-[#1E293B] mb-1">Review Required</h4>
                    <p className="text-sm text-[#64748B]">
                      Please review the AI analysis carefully. You can edit the summary if needed before approving and
                      moving to the co-signer invitation step.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button onClick={handleApprove} className="bg-[#38B26C] hover:bg-[#2d8f57] text-white">
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
                    <h4 className="font-semibold text-[#1E293B] mb-1">Analysis Approved</h4>
                    <p className="text-sm text-[#64748B]">
                      Great! The AI analysis has been approved. You can now invite co-signers to review and sign the
                      document.
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
    </div>
  )
}
