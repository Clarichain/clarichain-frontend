// app/documents/[id]/KeyPoints.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getPointIcon } from "@/lib/helpers";
import type { KeyPoints } from "@/types";

export default function KeyPoints({ keyPoints }: { keyPoints: KeyPoints[] }) {
  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="text-[#1E293B]">Key Points</CardTitle>
        <CardDescription className="text-[#64748B]">
          Important terms and conditions highlighted by AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {keyPoints.map((point, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-4 bg-[#F8FAFC] rounded-lg"
            >
              {getPointIcon(point.type)}
              <div className="flex-1">
                <h4 className="font-medium text-[#1E293B] mb-1">
                  {point.title}
                </h4>
                <p className="text-sm text-[#64748B]">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
