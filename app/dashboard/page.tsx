"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileText, MoreHorizontal, Upload, Users, Coins, Eye, Download, Share, Trash2, Filter } from "lucide-react"

const documents = [
  {
    id: 1,
    name: "Software License Agreement",
    type: "Contract",
    status: "Minted",
    signers: 3,
    createdAt: "2024-01-15",
    lastActivity: "2024-01-20",
  },
  {
    id: 2,
    name: "Research Collaboration NDA",
    type: "Policy",
    status: "Signed",
    signers: 2,
    createdAt: "2024-01-12",
    lastActivity: "2024-01-18",
  },
  {
    id: 3,
    name: "PhD Thesis Approval",
    type: "Thesis",
    status: "Pending Approval",
    signers: 4,
    createdAt: "2024-01-10",
    lastActivity: "2024-01-16",
  },
  {
    id: 4,
    name: "Service Agreement Draft",
    type: "Contract",
    status: "Draft",
    signers: 0,
    createdAt: "2024-01-08",
    lastActivity: "2024-01-08",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Minted":
      return <Badge className="bg-[#38B26C]/10 text-[#38B26C] border-[#38B26C]/20">Minted</Badge>
    case "Signed":
      return <Badge className="bg-[#2453CC]/10 text-[#2453CC] border-[#2453CC]/20">Signed</Badge>
    case "Pending Approval":
      return <Badge className="bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20">Pending Approval</Badge>
    case "Draft":
      return (
        <Badge variant="secondary" className="bg-[#64748B]/10 text-[#64748B]">
          Draft
        </Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#64748B]">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-[#64748B]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1E293B]">24</div>
            <p className="text-xs text-[#38B26C]">+2 from last month</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#64748B]">Pending Signatures</CardTitle>
            <Users className="h-4 w-4 text-[#64748B]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1E293B]">7</div>
            <p className="text-xs text-[#F59E0B]">3 urgent</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#64748B]">Minted NFTs</CardTitle>
            <Coins className="h-4 w-4 text-[#64748B]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1E293B]">12</div>
            <p className="text-xs text-[#38B26C]">+4 this week</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#64748B]">Active Co-signers</CardTitle>
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
        <Card
          className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-[#2453CC]/5 to-[#2453CC]/10 border-[#2453CC]/20"
          onClick={() => (window.location.href = "/dashboard/upload")}
        >
          <CardContent className="p-6 text-center">
            <Upload className="w-8 h-8 text-[#2453CC] mx-auto mb-3" />
            <h3 className="font-semibold text-[#1E293B] mb-2">Upload Document</h3>
            <p className="text-sm text-[#64748B]">Start with AI analysis</p>
          </CardContent>
        </Card>

        <Card
          className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-[#38B26C]/5 to-[#38B26C]/10 border-[#38B26C]/20"
          onClick={() => (window.location.href = "/dashboard/invite")}
        >
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-[#38B26C] mx-auto mb-3" />
            <h3 className="font-semibold text-[#1E293B] mb-2">Invite Co-signers</h3>
            <p className="text-sm text-[#64748B]">Add collaborators</p>
          </CardContent>
        </Card>

        <Card
          className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-[#F59E0B]/5 to-[#F59E0B]/10 border-[#F59E0B]/20"
          onClick={() => (window.location.href = "/dashboard/nft-vault")}
        >
          <CardContent className="p-6 text-center">
            <Coins className="w-8 h-8 text-[#F59E0B] mx-auto mb-3" />
            <h3 className="font-semibold text-[#1E293B] mb-2">View NFT Vault</h3>
            <p className="text-sm text-[#64748B]">Verified documents</p>
          </CardContent>
        </Card>
      </div>

      {/* Documents Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#1E293B]">My Documents</CardTitle>
              <CardDescription className="text-[#64748B]">
                Manage your uploaded documents and track their status
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Signers</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium text-[#1E293B]">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-[#64748B]" />
                      <span>{doc.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[#64748B]">
                      {doc.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(doc.status)}</TableCell>
                  <TableCell className="text-[#64748B]">
                    {doc.signers > 0 ? `${doc.signers} signers` : "No signers"}
                  </TableCell>
                  <TableCell className="text-[#64748B]">{doc.createdAt}</TableCell>
                  <TableCell className="text-[#64748B]">{doc.lastActivity}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => (window.location.href = `/dashboard/document/${doc.id}`)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View AI Summary
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert("Download functionality would be implemented here")}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => (window.location.href = "/dashboard/invite")}>
                          <Share className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => alert("Delete functionality would be implemented here")}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
