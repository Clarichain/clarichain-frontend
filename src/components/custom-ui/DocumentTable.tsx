'use client'
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Download,
  Eye,
  FileText,
  Filter,
  MoreHorizontal,
  Share,
  Trash2,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DocumentType } from "@/types";

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

const DocumentTable = ({documents}: {documents: Partial<DocumentType>[]}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-[#1E293B]">My Documents</CardTitle>
            <CardDescription className="text-[#64748B]">
              Manage your uploaded documents and track their status
            </CardDescription>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64"
            />
            <Button
              variant="outline"
              size="sm"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <div className="min-w-[800px]">
          
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
                  <Badge
                    variant="outline"
                    className="text-[#64748B]"
                  >
                    {doc.type}
                  </Badge>
                </TableCell>
                <TableCell>{getStatusBadge(doc.status ?? "")}</TableCell>
                <TableCell className="text-[#64748B]">
                  {doc.signers && doc.signers > 0 ? `${doc.signers} signers` : "No signers"}
                </TableCell>
                <TableCell className="text-[#64748B]">
                  {doc.createdAt}
                </TableCell>
                <TableCell className="text-[#64748B]">
                  {doc.lastActivity}
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
                          (window.location.href = `/dashboard/document/${doc.id}`)
                        }
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View AI Summary
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          alert(
                            "Download functionality would be implemented here"
                          )
                        }
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          (window.location.href = "/dashboard/invite")
                        }
                      >
                        <Share className="mr-2 h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() =>
                          alert(
                            "Delete functionality would be implemented here"
                          )
                        }
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
         </div>
      </CardContent>
    </Card>
  );
};

export default DocumentTable;
