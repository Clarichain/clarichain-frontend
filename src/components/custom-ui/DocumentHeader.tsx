import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import SignDialog from "./SignDialog";

export default function DocumentHeader({ document }: { document: any }) {

  return (
    <div className="flex max-md:flex-col md:items-center gap-2 justify-between">
      <div>
        <h1 className="text-2xl font-bold text-[#1E293B]">{document.name}</h1>
        <p className="text-[#64748B] mt-1">
          {document.type} • Uploaded{" "}
          {new Date(document.uploadedAt).toLocaleDateString()} •{" "}
          {document.pages} pages
        </p>
      </div>

      <div className="flex items-center space-x-3">
        <Badge className="bg-[#2453CC]/10 text-[#2453CC] border-[#2453CC]/20">
          {document.status}
        </Badge>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>

        <SignDialog />
      </div>
    </div>
  );
}
