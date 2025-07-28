
import ApproveSummary from "@/components/custom-ui/ApproveSummary"
import DocumentInfoAndSummary from "@/components/custom-ui/DocumentInfoAndSummary"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getPointIcon } from "@/lib/helpers"

export default async function AnalyzePage({ params }: { params: Promise<{ filename: string }> }) {

  const {filename} = await params

  const documentTitle = decodeURIComponent(filename)

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



  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex max-md:flex-col items-start md:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">AI Document Analysis</h1>
          <p className="text-[#64748B] mt-1">Plain-language breakdown of your document</p>
        </div>
        <Badge className="bg-[#38B26C]/10 text-[#38B26C] border-[#38B26C]/20">Analysis Complete</Badge>
      </div>

      {/* Document Info */}
      <DocumentInfoAndSummary documentTitle={documentTitle} advancedSummary={advancedSummary} eli5Summary={eli5Summary} />

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
      <ApproveSummary/>
    </div>
  )
}
