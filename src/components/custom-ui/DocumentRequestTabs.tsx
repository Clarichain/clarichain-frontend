"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  FileText,
  MoreHorizontal,
  Eye,
  CheckCircle,
  MessageSquare,
  XCircle,
} from "lucide-react";
import { getPriorityBadge, getSignerStatusIcon, getStatusBadge } from "@/lib/helpers";

// Dummy request types for typing (replace with your types or props)
type Request = {
  id: number;
  documentName: string;
  requester: string;
  requesterEmail: string;
  status: string;
  priority: string;
  dueDate: string;
  signers: { avatar: string; status: string, name: string }[];
};

type Props = {
  allRequests: Request[];
};

export function DocumentRequestTabs({
  allRequests,
}: Props) {
  const [selectedTab, setSelectedTab] = useState("all");

  const filteredRequests = useMemo(() => {
    if (selectedTab === "all") return allRequests;
    return allRequests.filter(
      (req) => req.status.toLowerCase() === selectedTab
    );
  }, [selectedTab, allRequests]);

  const tabData = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "signed", label: "Signed" },
    { key: "rejected", label: "Rejected" },
  ];

  const countByStatus = (key: string) =>
    key === "all"
      ? allRequests.length
      : allRequests.filter((r) => r.status.toLowerCase() === key).length;

  return (
    <Tabs
      value={selectedTab}
      onValueChange={setSelectedTab}
      className="w-full"
    >
      <TabsList className="flex space-x-1 p-1 rounded-lg border border-black/20 bg-white">
        {tabData.map((tab) => (
          <TabsTrigger
            key={tab.key}
            value={tab.key}
            className="flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors data-[state=active]:bg-[#2453CC] data-[state=active]:text-white text-[#64748B] hover:text-[#1E293B] hover:bg-[#F9FAFB]"
          >
            {tab.label} ({countByStatus(tab.key)})
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={selectedTab}>
        <Card className="border-0 shadow-sm bg-white mt-4">
          <CardHeader>
            <CardTitle className="text-[#1E293B]">Document Requests</CardTitle>
            <CardDescription className="text-[#64748B]">
              Documents waiting for your review and signature
            </CardDescription>
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
                        <p className="font-medium text-[#1E293B]">
                          {request.requester}
                        </p>
                        <p className="text-sm text-[#64748B]">
                          {request.requesterEmail}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                    <TableCell className="text-[#64748B]">
                      {request.dueDate}
                    </TableCell>
                    <TableCell>
                      <div className="flex -space-x-2">
                        {request.signers.map((signer, index) => (
                          <div
                            key={index}
                            className="relative"
                          >
                            <Avatar className="w-8 h-8 border-2 border-white">
                              <AvatarFallback className="bg-[#2453CC] text-white text-xs">
                                {signer.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1">
                              {getSignerStatusIcon(signer.status)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              (window.location.href = `/dashboard/document/review/${encodeURIComponent(
                                request.documentName
                              )}`)
                            }
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Review Document
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              alert("Document signed successfully!")
                            }
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Sign Document
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => alert("Comment added successfully!")}
                          >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Add Comment
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => alert("Document rejected")}
                          >
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
      </TabsContent>
    </Tabs>
  );
}
