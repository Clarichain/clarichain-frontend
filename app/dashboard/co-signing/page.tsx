"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileText, MoreHorizontal, Clock, CheckCircle, XCircle, Eye, MessageSquare, Send } from "lucide-react"

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
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Pending Review":
      return <Badge className="bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20">Pending Review</Badge>
    case "Signed":
      return <Badge className="bg-[#38B26C]/10 text-[#38B26C] border-[#38B26C]/20">Signed</Badge>
    case "Rejected":
      return <Badge className="bg-red-500/10 text-red-600 border-red-500/20">Rejected</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "High":
      return (
        <Badge variant="destructive" className="text-xs">
          High
        </Badge>
      )
    case "Medium":
      return <Badge className="bg-[#F59E0B]/10 text-[#F59E0B] text-xs">Medium</Badge>
    case "Low":
      return (
        <Badge variant="secondary" className="text-xs">
          Low
        </Badge>
      )
    default:
      return (
        <Badge variant="secondary" className="text-xs">
          {priority}
        </Badge>
      )
  }
}

const getSignerStatusIcon = (status: string) => {
  switch (status) {
    case "signed":
      return <CheckCircle className="w-4 h-4 text-[#38B26C]" />
    case "rejected":
      return <XCircle className="w-4 h-4 text-red-500" />
    default:
      return <Clock className="w-4 h-4 text-[#F59E0B]" />
  }
}

export default function CoSigningPage() {
  const [selectedTab, setSelectedTab] = useState("pending")

  const filteredRequests = coSigningRequests.filter((request) => {
    if (selectedTab === "pending") return request.status === "Pending Review"
    if (selectedTab === "signed") return request.status === "Signed"
    if (selectedTab === "rejected") return request.status === "Rejected"
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Co-signing Requests</h1>
          <p className="text-[#64748B] mt-1">Review and sign documents shared with you</p>
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
                <p className="text-sm font-medium text-[#64748B]">Pending Review</p>
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

        <Card className="border-0 shadow-sm bg-white">
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

        <Card className="border-0 shadow-sm bg-white">
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

      {/* Tabs */}
      <div className="flex space-x-1 bg-white p-1 rounded-lg border">
        {[
          { key: "pending", label: "Pending", count: 3 },
          { key: "signed", label: "Signed", count: 8 },
          { key: "rejected", label: "Rejected", count: 2 },
          { key: "all", label: "All", count: 13 },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedTab === tab.key
                ? "bg-[#2453CC] text-white"
                : "text-[#64748B] hover:text-[#1E293B] hover:bg-[#F9FAFB]"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Requests Table */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="text-[#1E293B]">Document Requests</CardTitle>
          <CardDescription className="text-[#64748B]">Documents waiting for your review and signature</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Requester</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Signers</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium text-[#1E293B]">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-[#64748B]" />
                      <span>{request.documentName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-[#1E293B]">{request.requester}</p>
                      <p className="text-sm text-[#64748B]">{request.requesterEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                  <TableCell className="text-[#64748B]">{request.dueDate}</TableCell>
                  <TableCell>
                    <div className="flex -space-x-2">
                      {request.signers.map((signer, index) => (
                        <div key={index} className="relative">
                          <Avatar className="w-8 h-8 border-2 border-white">
                            <AvatarFallback className="bg-[#2453CC] text-white text-xs">{signer.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1">{getSignerStatusIcon(signer.status)}</div>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            (window.location.href = `/dashboard/document/review/${encodeURIComponent(request.documentName)}`)
                          }
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Review Document
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert("Document signed successfully!")}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Sign Document
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert("Comment added successfully!")}>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Add Comment
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => alert("Document rejected")}>
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
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
