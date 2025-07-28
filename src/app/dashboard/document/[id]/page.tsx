import ActionBar from "@/components/custom-ui/ActionBar";
import ActivityTab from "@/components/custom-ui/ActivityTab";
import CoSignersTab from "@/components/custom-ui/CoSignersTab";
import DocumentHeader from "@/components/custom-ui/DocumentHeader";
import SummaryTab from "@/components/custom-ui/DocumentSummary";
import DocumentTab from "@/components/custom-ui/DocumentTab";
import SignDialog from "@/components/custom-ui/SignDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Download,
  FileText,
  MessageSquare,
  Users
} from "lucide-react";

interface CoSigner {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "pending" | "invited" | "reviewing" | "signed" | "rejected";
  invitedAt: string;
  signedAt?: string;
  comments?: string;
  avatar: string;
}

export default  function DocumentPage({
  params,
}: {
  params: { id: string }
}) {

  const {id: documentId} = params;

  // Mock document data
  const document = {
    id: documentId,
    name: "Software License Agreement",
    type: "Contract",
    uploadedAt: "2024-01-20T10:30:00Z",
    status: "Under Review",
    fileSize: "2.4 MB",
    pages: 12,
    hash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z",
  };

  const aiAnalysis = {
    confidence: 94,
    processedAt: "2024-01-20T10:32:15Z",
    summary: `This Software License Agreement establishes the terms and conditions under which the licensor grants the licensee certain rights to use proprietary software. The agreement includes provisions for intellectual property protection, usage limitations, liability disclaimers, and termination clauses. Key obligations include maintaining confidentiality of proprietary information, compliance with usage restrictions, and adherence to payment terms as specified in Schedule A.`,
    eli5Summary: `Think of this like renting a special computer program. The company that made the program (like a landlord) is letting you use it, but you have to follow some rules. You can't share it with others, you have to pay what you agreed to pay, and if you break the rules, they can take it away. It's like borrowing a friend's video game - you can play it, but you can't give it to someone else or claim you made it.`,
    keyPoints: [
      {
        title: "Usage Rights",
        description: "Limited license for internal business use only",
        type: "info",
      },
      {
        title: "Payment Terms",
        description: "Annual license fee of $50,000 due within 30 days",
        type: "important",
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
    ],
  };

  const coSigners: CoSigner[] = [
    {
      id: "1",
      name: "Lydia Solomon",
      email: "lydsol224@legalfirm.com",
      role: "Legal Reviewer",
      status: "signed",
      invitedAt: "2024-01-20T11:00:00Z",
      signedAt: "2024-01-21T14:30:00Z",
      comments: "Legal terms look good. Approved for signing.",
      avatar: "SC",
    },
    {
      id: "2",
      name: "Adesipe Lukman",
      email: "sipeluk0g@techcorp.com",
      role: "Technical Lead",
      status: "reviewing",
      invitedAt: "2024-01-20T11:00:00Z",
      comments: "Reviewing technical specifications in Section 3.",
      avatar: "MT",
    },
    {
      id: "3",
      name: "Kayode Dada",
      email: "kayzi@company.com",
      role: "Project Manager",
      status: "invited",
      invitedAt: "2024-01-20T11:00:00Z",
      avatar: "AR",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
     <DocumentHeader document={document}/>

      <Tabs
        defaultValue="summary"
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4  border border-black/20">
          <TabsTrigger
            value="summary"
            className="flex items-center space-x-2"
          >
            <Brain className="w-4 h-4" />
            <span>AI Summary</span>
          </TabsTrigger>
          <TabsTrigger
            value="document"
            className="flex items-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>Document</span>
          </TabsTrigger>
          <TabsTrigger
            value="cosigners"
            className="flex items-center space-x-2"
          >
            <Users className="w-4 h-4" />
            <span>Co-signers</span>
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            className="flex items-center space-x-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Activity</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="summary"
          className="space-y-6"
        >
          <SummaryTab aiAnalysis={aiAnalysis} />
        </TabsContent>

        <TabsContent
          value="document"
          className="space-y-6"
        >
          <DocumentTab document={document} />
        </TabsContent>

        <TabsContent
          value="cosigners"
          className="space-y-6"
        >
          <CoSignersTab initialCoSigners={coSigners} />
        </TabsContent>

        <TabsContent
          value="activity"
          className="space-y-6"
        >
          <ActivityTab />
        </TabsContent>
      </Tabs>

      <ActionBar coSigners={coSigners} />
    </div>
  );
}
