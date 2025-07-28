'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Eye } from "lucide-react";
import { TabsContent } from "../ui/tabs";

interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  status: string;
  fileSize: string;
  pages: number;
  hash: string;
}

export default function DocumentTab({ document }: { document: Document }) {
  return (
    <TabsContent
      value="document"
      className="space-y-6"
    >
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="text-[#1E293B]">Document Preview</CardTitle>
          <CardDescription className="text-[#64748B]">
            View and interact with the original document
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-[#F9FAFB] border-2 border-dashed border-[#E2E8F0] rounded-lg p-12 text-center">
            <FileText className="w-16 h-16 text-[#64748B] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#1E293B] mb-2">
              Document Preview
            </h3>
            <p className="text-[#64748B] mb-4">
              {document.name} • {document.fileSize} • {document.pages} pages
            </p>
            <div className="space-y-2 text-sm text-[#64748B]">
              <p>Document Hash: {document.hash.substring(0, 32)}...</p>
              <p>Uploaded: {new Date(document.uploadedAt).toLocaleString()}</p>
            </div>
            <Button className="mt-4 bg-[#2453CC] hover:bg-[#1e42a4] text-white">
              <Eye className="w-4 h-4 mr-2" />
              Open Full Document
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
