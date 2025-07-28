import { DocumentRequestTabs } from "@/components/custom-ui/DocumentRequestTabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import {
  CheckCircle,
  Clock,
  FileText,
  Send,
  XCircle
} from "lucide-react";

const coSigningRequests = [
  {
    id: 1,
    documentName: "Partnership Agreement",
    requester: "Sarah Daniel",
    requesterEmail: "sarah@legalfirm.com",
    status: "Pending Review",
    dueDate: "2024-01-25",
    priority: "High",
    signers: [
      { name: "You", status: "pending", avatar: "JD" },
      { name: "Lydia Solomon", status: "signed", avatar: "MT" },
      { name: "Adesipe Lukeman", status: "pending", avatar: "AR" },
    ],
  },
  {
    id: 2,
    documentName: "Research Collaboration NDA",
    requester: "Dr. Bimbo Adeoye",
    requesterEmail: "torres@university.edu",
    status: "Signed",
    dueDate: "2024-01-20",
    priority: "Medium",
    signers: [
      { name: "You", status: "signed", avatar: "JD" },
      { name: "Kayode Dada", status: "signed", avatar: "SC" },
    ],
  },
  {
    id: 3,
    documentName: "Software License Terms",
    requester: "Alex James",
    requesterEmail: "alex@techcorp.com",
    status: "Rejected",
    dueDate: "2024-01-18",
    priority: "Low",
    signers: [
      { name: "You", status: "rejected", avatar: "JD" },
      { name: "Bola Awolowo", status: "pending", avatar: "SC" },
      { name: "Mike Donald", status: "pending", avatar: "MT" },
    ],
  },
];

export default function CoSigningPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex max-md:flex-col md:items-center gap-2 justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">
            Co-signing Requests
          </h1>
          <p className="text-[#64748B] mt-1">
            Review and sign documents shared with you
          </p>
        </div>
        <Button className="bg-[#2453CC] hover:bg-[#1e42a4] text-white">
          <Send className="w-4 h-4 mr-2" />
          Send Request
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#64748B]">
                  Pending Review
                </p>
                <p className="text-2xl font-bold text-[#1E293B]">3</p>
              </div>
              <Clock className="h-8 w-8 text-[#F59E0B]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#64748B]">Signed</p>
                <p className="text-2xl font-bold text-[#1E293B]">8</p>
              </div>
              <CheckCircle className="h-8 w-8 text-[#38B26C]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-transparent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#64748B]">Rejected</p>
                <p className="text-2xl font-bold text-[#1E293B]">2</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-transparent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#64748B]">This Week</p>
                <p className="text-2xl font-bold text-[#1E293B]">5</p>
              </div>
              <FileText className="h-8 w-8 text-[#2453CC]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <DocumentRequestTabs
        allRequests={coSigningRequests}
      />
    </div>
  );
}
