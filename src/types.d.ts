export interface DocumentType {
  id: string;
  name: string;
  type: string;
  status: string;
  signers: number;
  createdAt: string;
  lastActivity: string;
  uploadedAt: string;
  fileSize: string;
  pages: number;
  hash: string;
};

// app/documents/[id]/types.ts
export interface CoSigner {
  id: string
  name: string
  email: string
  role: string
  status: "pending" | "invited" | "reviewing" | "signed" | "rejected"
  invitedAt: string
  signedAt?: string
  comments?: string
  avatar: string
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  status: string;
  fileSize: string;
  pages: number;
  hash: string;
}

export interface KeyPoints {
  title: string;
  description: string;
  type: string;
}

export interface AiAnalysis {
  confidence: number
  processedAt: string
  summary: string
  eli5Summary: string
  keyPoints: KeyPoints[]
}

export interface DocumentData {
  aiAnalysis: AiAnalysis;
  document: Document;
  coSigners: CoSigner[];
}