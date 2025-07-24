import DocumentTable from "@/components/custom-ui/DocumentTable";
import UploadBtnSheet from "@/components/custom-ui/UploadBtnSheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, FileText, Upload, Users } from "lucide-react";
import Link from "next/link";

const documents = [
  {
    id: "1",
    name: "Software License Agreement",
    type: "Contract",
    status: "Minted",
    signers: 3,
    createdAt: "2024-01-15",
    lastActivity: "2024-01-20",
  },
  {
    id: "2",
    name: "Research Collaboration NDA",
    type: "Policy",
    status: "Signed",
    signers: 2,
    createdAt: "2024-01-12",
    lastActivity: "2024-01-18",
  },
  {
    id: "3",
    name: "PhD Thesis Approval",
    type: "Thesis",
    status: "Pending Approval",
    signers: 4,
    createdAt: "2024-01-10",
    lastActivity: "2024-01-16",
  },
  {
    id: "4",
    name: "Service Agreement Draft",
    type: "Contract",
    status: "Draft",
    signers: 0,
    createdAt: "2024-01-08",
    lastActivity: "2024-01-08",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 w-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#64748B]">
              Total Documents
            </CardTitle>
            <FileText className="h-4 w-4 text-[#64748B]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1E293B]">24</div>
            <p className="text-xs text-[#38B26C]">+2 from last month</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#64748B]">
              Pending Signatures
            </CardTitle>
            <Users className="h-4 w-4 text-[#64748B]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1E293B]">7</div>
            <p className="text-xs text-[#F59E0B]">3 urgent</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#64748B]">
              Minted NFTs
            </CardTitle>
            <Coins className="h-4 w-4 text-[#64748B]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1E293B]">12</div>
            <p className="text-xs text-[#38B26C]">+4 this week</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#64748B]">
              Active Co-signers
            </CardTitle>
            <Users className="h-4 w-4 text-[#64748B]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1E293B]">18</div>
            <p className="text-xs text-[#64748B]">across all documents</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UploadBtnSheet>
          <div className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-[#2453CC]/5 to-[#2453CC]/10 border-[#2453CC]/20 rounded-md">
            <CardContent className="p-6 text-center">
              <Upload className="w-8 h-8 text-[#2453CC] mx-auto mb-3" />
              <h3 className="font-semibold text-[#1E293B] mb-2">
                Upload Document
              </h3>
              <p className="text-sm text-[#64748B]">Start with AI analysis</p>
            </CardContent>
          </div>
        </UploadBtnSheet>

        <Link
          href={"/dashboard/invite"}
          className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-[#38B26C]/5 to-[#38B26C]/10 border-[#38B26C]/20 rounded-md"
        >
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-[#38B26C] mx-auto mb-3" />
            <h3 className="font-semibold text-[#1E293B] mb-2">
              Invite Co-signers
            </h3>
            <p className="text-sm text-[#64748B]">Add collaborators</p>
          </CardContent>
        </Link>

        <Link
          href={"/dashboard/nft-vault"}
          className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-[#F59E0B]/5 to-[#F59E0B]/10 border-[#F59E0B]/20 rounded-md"
        >
          <CardContent className="p-6 text-center">
            <Coins className="w-8 h-8 text-[#F59E0B] mx-auto mb-3" />
            <h3 className="font-semibold text-[#1E293B] mb-2">
              View NFT Vault
            </h3>
            <p className="text-sm text-[#64748B]">Verified documents</p>
          </CardContent>
        </Link>
      </div>

      {/* Documents Table */}
      <DocumentTable documents={documents} />
    </div>
  );
}
