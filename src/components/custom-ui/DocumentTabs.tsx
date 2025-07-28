import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, FileText, Users, MessageSquare } from "lucide-react";
import SummaryTab from "./DocumentSummary";
import DocumentTab from "./DocumentTab";
import CoSignersTab from "./CoSignersTab";
import ActivityTab from "./ActivityTab";

export default function DocumentTabs({ documentData }: { documentData: any }) {
  return (
    <Tabs
      defaultValue="summary"
      className="space-y-6"
    >
      <TabsList className="grid w-full grid-cols-4 bg-white">
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

      <SummaryTab aiAnalysis={documentData.aiAnalysis} />
      <DocumentTab document={documentData.document} />
      <CoSignersTab initialCoSigners={documentData.coSigners} />
      <ActivityTab />
    </Tabs>
  );
}
