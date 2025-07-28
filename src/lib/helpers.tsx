import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Info,
  XCircle,
} from "lucide-react";

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "Pending Review":
      return (
        <Badge className="bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20">
          Pending Review
        </Badge>
      );
    case "Signed":
      return (
        <Badge className="bg-[#38B26C]/10 text-[#38B26C] border-[#38B26C]/20">
          Signed
        </Badge>
      );
    case "Rejected":
      return (
        <Badge className="bg-red-500/10 text-red-600 border-red-500/20">
          Rejected
        </Badge>
      );
    case "signed":
      return (
        <Badge className="bg-[#38B26C]/10 text-[#38B26C] border-[#38B26C]/20">
          Signed
        </Badge>
      );
    case "reviewing":
      return (
        <Badge className="bg-[#2453CC]/10 text-[#2453CC] border-[#2453CC]/20">
          Reviewing
        </Badge>
      );
    case "invited":
      return (
        <Badge className="bg-[#F9FAFB] text-[#64748B] border-[#E2E8F0]">
          Invited
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "High":
      return (
        <Badge
          variant="destructive"
          className="text-xs"
        >
          High
        </Badge>
      );
    case "Medium":
      return (
        <Badge className="bg-[#F59E0B]/10 text-[#F59E0B] text-xs">Medium</Badge>
      );
    case "Low":
      return (
        <Badge
          variant="secondary"
          className="text-xs"
        >
          Low
        </Badge>
      );
    default:
      return (
        <Badge
          variant="secondary"
          className="text-xs"
        >
          {priority}
        </Badge>
      );
  }
};

export const getSignerStatusIcon = (status: string) => {
  switch (status) {
    case "signed":
      return <CheckCircle className="w-4 h-4 text-[#38B26C]" />;
    case "reviewing":
      return <Eye className="w-4 h-4 text-[#2453CC]" />;
    case "rejected":
      return <XCircle className="w-4 h-4 text-red-500" />;
    default:
      return <Clock className="w-4 h-4 text-[#F59E0B]" />;
  }
};

export const getPointIcon = (type: string) => {
  switch (type) {
    case "warning":
      return <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />;
    case "important":
      return <CheckCircle className="w-4 h-4 text-[#38B26C]" />;
    default:
      return <Info className="w-4 h-4 text-[#2453CC]" />;
  }
};

export const getErrorMessage = (error: string | null) => {
  switch (error) {
    case "CredentialsSignin":
      return "Invalid email or password";
    case "No user found":
      return "No account found for this email";
    case "Incorrect password":
      return "Password is incorrect";
    default:
      return error;
  }
};
