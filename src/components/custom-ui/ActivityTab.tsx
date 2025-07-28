import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "../ui/tabs";

interface ActivityItem {
  id: string;
  action: string;
  timestamp: string;
  comment?: string;
  color: string;
}

export default function ActivityTab() {
  const activities: ActivityItem[] = [
    {
      id: "1",
      action: "Sarah Chen signed the document",
      timestamp: "January 21, 2024 at 2:30 PM",
      comment: "Legal terms look good. Approved for signing.",
      color: "bg-[#38B26C]",
    },
    {
      id: "2",
      action: "Mike Torres started reviewing",
      timestamp: "January 21, 2024 at 10:15 AM",
      comment: "Reviewing technical specifications in Section 3.",
      color: "bg-[#2453CC]",
    },
    {
      id: "3",
      action: "Co-signers invited",
      timestamp: "January 20, 2024 at 11:00 AM",
      comment: "Sarah Chen, Mike Torres, and Alex Rodriguez were invited",
      color: "bg-[#64748B]",
    },
    {
      id: "4",
      action: "AI analysis completed",
      timestamp: "January 20, 2024 at 10:32 AM",
      comment: "Analysis confidence: 94%",
      color: "bg-[#2453CC]",
    },
    {
      id: "5",
      action: "Document uploaded",
      timestamp: "January 20, 2024 at 10:30 AM",
      comment: "Software License Agreement (2.4 MB, 12 pages)",
      color: "bg-[#38B26C]",
    },
  ];

  return (
    <TabsContent
      value="activity"
      className="space-y-6"
    >
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="text-[#1E293B]">Document Activity</CardTitle>
          <CardDescription className="text-[#64748B]">
            Timeline of all interactions and changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 pb-4 border-b"
                >
                  <div
                    className={`w-2 h-2 ${activity.color} rounded-full mt-2`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1E293B]">
                      {activity.action}
                    </p>
                    <p className="text-xs text-[#64748B]">
                      {activity.timestamp}
                    </p>
                    {activity.comment && (
                      <p className="text-xs text-[#64748B] mt-1">
                        Comment: "{activity.comment}"
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
