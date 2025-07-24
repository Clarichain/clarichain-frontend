"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileText,
  Brain,
  Users,
  Eye,
  Edit3,
  CheckCircle,
  Clock,
  AlertTriangle,
  Info,
  Plus,
  Send,
  MessageSquare,
  Download,
  Share,
  Coins,
  ArrowRight,
  PenTool,
} from "lucide-react"

interface CoSigner {
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

export default function DocumentViewPage({ params }: { params: { id: string } }) {
  const [isELI5Mode, setIsELI5Mode] = useState(false)
  const [newSignerEmail, setNewSignerEmail] = useState("")
  const [newSignerName, setNewSignerName] = useState("")
  const [newSignerRole, setNewSignerRole] = useState("")
  const [inviteMessage, setInviteMessage] = useState("")
  const [isInviting, setIsInviting] = useState(false)
    const [isSigned, setIsSigned] = useState(false);
    const [privateKey, setPrivateKey] = useState("");

  const documentId = params.id

  // Mock document data
  const document = {
    id: documentId,
    name: "Software License Agreement",
    type: "Contract",
    uploadedAt: "2024-01-20T10:30:00Z",
    status: "Under Review",
    fileSize: "2.4 MB",
    pages: 12,
    hash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z",
  }

  const aiAnalysis = {
    confidence: 94,
    processedAt: "2024-01-20T10:32:15Z",
    summary: `This Software License Agreement establishes the terms and conditions under which the licensor grants the licensee certain rights to use proprietary software. The agreement includes provisions for intellectual property protection, usage limitations, liability disclaimers, and termination clauses. Key obligations include maintaining confidentiality of proprietary information, compliance with usage restrictions, and adherence to payment terms as specified in Schedule A.`,
    eli5Summary: `Think of this like renting a special computer program. The company that made the program (like a landlord) is letting you use it, but you have to follow some rules. You can't share it with others, you have to pay what you agreed to pay, and if you break the rules, they can take it away. It's like borrowing a friend's video game - you can play it, but you can't give it to someone else or claim you made it.`,
    keyPoints: [
      {
        title: "Usage Rights",
        description: "Limited license for internal business use only",
        type: "info",
      },
      {
        title: "Payment Terms",
        description: "Annual license fee of $50,000 due within 30 days",
        type: "important",
      },
      {
        title: "Confidentiality",
        description: "All proprietary information must remain confidential",
        type: "important",
      },
      {
        title: "Termination",
        description: "Either party may terminate with 90 days written notice",
        type: "info",
      },
    ],
  }

  const [coSigners, setCoSigners] = useState<CoSigner[]>([
    {
      id: "1",
      name: "Lydia Solomon",
      email: "lydsol224@legalfirm.com",
      role: "Legal Reviewer",
      status: "signed",
      invitedAt: "2024-01-20T11:00:00Z",
      signedAt: "2024-01-21T14:30:00Z",
      comments: "Legal terms look good. Approved for signing.",
      avatar: "SC",
    },
    {
      id: "2",
      name: "Adesipe Lukman",
      email: "sipeluk0g@techcorp.com",
      role: "Technical Lead",
      status: "reviewing",
      invitedAt: "2024-01-20T11:00:00Z",
      comments: "Reviewing technical specifications in Section 3.",
      avatar: "MT",
    },
    {
      id: "3",
      name: "Kayode Dada",
      email: "kayzi@company.com",
      role: "Project Manager",
      status: "invited",
      invitedAt: "2024-01-20T11:00:00Z",
      avatar: "AR",
    },
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "signed":
        return <Badge className="bg-[#38B26C]/10 text-[#38B26C] border-[#38B26C]/20">Signed</Badge>
      case "reviewing":
        return <Badge className="bg-[#2453CC]/10 text-[#2453CC] border-[#2453CC]/20">Reviewing</Badge>
      case "invited":
        return <Badge className="bg-[#F9FAFB] text-[#64748B] border-[#E2E8F0]">Invited</Badge>
      case "rejected":
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20">Rejected</Badge>
      default:
        return <Badge className="bg-[#F9FAFB] text-[#64748B] border-[#E2E8F0]">Pending</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "signed":
        return <CheckCircle className="w-4 h-4 text-[#38B26C]" />
      case "reviewing":
        return <Eye className="w-4 h-4 text-[#2453CC]" />
      case "rejected":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-[#64748B]" />
    }
  }

  const getPointIcon = (type: string) => {
    switch (type) {
      case "important":
        return <CheckCircle className="w-4 h-4 text-[#38B26C]" />
      default:
        return <Info className="w-4 h-4 text-[#2453CC]" />
    }
  }

  const addCoSigner = async () => {
    if (!newSignerEmail || !newSignerName) return

    setIsInviting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newSigner: CoSigner = {
      id: Date.now().toString(),
      name: newSignerName,
      email: newSignerEmail,
      role: newSignerRole || "Reviewer",
      status: "invited",
      invitedAt: new Date().toISOString(),
      avatar: newSignerName
        .split(" ")
        .map((n) => n[0])
        .join(""),
    }

    setCoSigners([...coSigners, newSigner])
    setNewSignerEmail("")
    setNewSignerName("")
    setNewSignerRole("")
    setInviteMessage("")
    setIsInviting(false)
  }

  const getSigningProgress = () => {
    const signed = coSigners.filter((signer) => signer.status === "signed").length
    const total = coSigners.length
    return total > 0 ? (signed / total) * 100 : 0
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">{document.name}</h1>
          <p className="text-[#64748B] mt-1">
            {document.type} • Uploaded {new Date(document.uploadedAt).toLocaleDateString()} • {document.pages} pages
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className="bg-[#2453CC]/10 text-[#2453CC] border-[#2453CC]/20">{document.status}</Badge>
          <Button variant="outline" className="bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
         {isSigned ? (
                     <div className="bg-blue-200/40 text-blue-700 px-5 py-1 rounded-md">
                       Signed
                     </div>
                   ) : (
                     <Dialog>
                       <DialogTrigger asChild>
                         <Button
                           variant="outline"
                           className="bg-blue-700 text-white hover:bg-blue-700/80"
                         >
                           <PenTool className="w-4 h-4 mr-2" />
                           Sign Contract
                         </Button>
                       </DialogTrigger>
         
                       <DialogContent className="sm:max-w-md">
                         <DialogHeader>
                           <DialogTitle>Confirm Signature</DialogTitle>
                           <DialogDescription>
                             For your security, please enter your private key to sign
                             this contract.
                             <br />
                             <span className="text-sm text-muted-foreground">
                               (This is the same password you used when creating your
                               account)
                             </span>
                           </DialogDescription>
                         </DialogHeader>
         
                         <div className="space-y-4">
                           <Input
                             type="password"
                             placeholder="Enter your private key"
                             value={privateKey}
                             onChange={(e) => setPrivateKey(e.target.value)}
                           />
         
                           <Button
                             className="w-full bg-blue-700 text-white hover:bg-blue-700/90"
                             onClick={() => {
                               if (privateKey.trim()) {
                                 setIsSigned(true);
                               }
                             }}
                           >
                             Sign Now
                           </Button>
                         </div>
                       </DialogContent>
                     </Dialog>
                   )}
        </div>
      </div>

      <Tabs defaultValue="summary" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white">
          <TabsTrigger value="summary" className="flex items-center space-x-2">
            <Brain className="w-4 h-4" />
            <span>AI Summary</span>
          </TabsTrigger>
          <TabsTrigger value="document" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Document</span>
          </TabsTrigger>
          <TabsTrigger value="cosigners" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Co-signers</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4" />
            <span>Activity</span>
          </TabsTrigger>
        </TabsList>

        {/* AI Summary Tab */}
        <TabsContent value="summary" className="space-y-6">
          {/* AI Analysis Card */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center text-[#1E293B]">
                    <Brain className="w-5 h-5 mr-2 text-[#2453CC]" />
                    {isELI5Mode ? "Explain Like I'm 5" : "AI Summary"}
                  </CardTitle>
                  <CardDescription className="text-[#64748B]">
                    {isELI5Mode
                      ? "Simple explanation that anyone can understand"
                      : "Professional analysis of key terms and conditions"}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="eli5-mode" className="text-sm text-[#64748B]">
                      ELI5 Mode
                    </Label>
                    <Switch id="eli5-mode" checked={isELI5Mode} onCheckedChange={setIsELI5Mode} />
                  </div>
                  <Badge className="bg-[#38B26C]/10 text-[#38B26C] border-[#38B26C]/20">
                    {aiAnalysis.confidence}% Confidence
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-[#1E293B] leading-relaxed">
                  {isELI5Mode ? aiAnalysis.eli5Summary : aiAnalysis.summary}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-[#64748B]">
                  <CheckCircle className="w-4 h-4 text-[#38B26C]" />
                  <span>Processed {new Date(aiAnalysis.processedAt).toLocaleString()}</span>
                </div>
                <Button variant="outline" size="sm">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Summary
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Key Points */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-[#1E293B]">Key Points</CardTitle>
              <CardDescription className="text-[#64748B]">
                Important terms and conditions highlighted by AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiAnalysis.keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-[#F8FAFC] rounded-lg">
                    {getPointIcon(point.type)}
                    <div className="flex-1">
                      <h4 className="font-medium text-[#1E293B] mb-1">{point.title}</h4>
                      <p className="text-sm text-[#64748B]">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Document Tab */}
        <TabsContent value="document" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-[#1E293B]">Document Preview</CardTitle>
              <CardDescription className="text-[#64748B]">View and interact with the original document</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-[#F9FAFB] border-2 border-dashed border-[#E2E8F0] rounded-lg p-12 text-center">
                <FileText className="w-16 h-16 text-[#64748B] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#1E293B] mb-2">Document Preview</h3>
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

        {/* Co-signers Tab */}
        <TabsContent value="cosigners" className="space-y-6">
          {/* Signing Progress */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-[#1E293B]">Signing Progress</CardTitle>
              <CardDescription className="text-[#64748B]">
                Track the status of all co-signers and their interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#1E293B]">
                    {coSigners.filter((s) => s.status === "signed").length} of {coSigners.length} signed
                  </span>
                  <span className="text-sm text-[#64748B]">{Math.round(getSigningProgress())}% complete</span>
                </div>
                <Progress value={getSigningProgress()} className="w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Co-signers List */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[#1E293B]">Co-signers ({coSigners.length})</CardTitle>
                  <CardDescription className="text-[#64748B]">Manage and track co-signer interactions</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-[#2453CC] hover:bg-[#1e42a4] text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Co-signer
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white">
                    <DialogHeader>
                      <DialogTitle className="text-[#1E293B]">Invite Co-signer</DialogTitle>
                      <DialogDescription className="text-[#64748B]">
                        Add a new person to review and sign this document
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-[#1E293B]">
                            Full Name
                          </Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            value={newSignerName}
                            onChange={(e) => setNewSignerName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role" className="text-[#1E293B]">
                            Role
                          </Label>
                          <Input
                            id="role"
                            placeholder="Reviewer"
                            value={newSignerRole}
                            onChange={(e) => setNewSignerRole(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#1E293B]">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={newSignerEmail}
                          onChange={(e) => setNewSignerEmail(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-[#1E293B]">
                          Custom Message (Optional)
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Please review and sign this document..."
                          value={inviteMessage}
                          onChange={(e) => setInviteMessage(e.target.value)}
                          rows={3}
                        />
                      </div>
                      <Button
                        onClick={addCoSigner}
                        disabled={!newSignerEmail || !newSignerName || isInviting}
                        className="w-full bg-[#38B26C] hover:bg-[#2d8f57] text-white"
                      >
                        {isInviting ? (
                          <>
                            <Clock className="w-4 h-4 mr-2 animate-spin" />
                            Sending Invitation...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Invitation
                          </>
                        )}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {coSigners.map((signer) => (
                  <div key={signer.id} className="flex items-start space-x-4 p-4 bg-[#F9FAFB] rounded-lg border">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-[#2453CC] text-white">{signer.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-[#1E293B]">{signer.name}</h4>
                          <p className="text-sm text-[#64748B]">{signer.email}</p>
                          <p className="text-xs text-[#64748B]">{signer.role}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(signer.status)}
                          {getStatusBadge(signer.status)}
                        </div>
                      </div>
                      <div className="text-xs text-[#64748B]">
                        <p>Invited: {new Date(signer.invitedAt).toLocaleString()}</p>
                        {signer.signedAt && <p>Signed: {new Date(signer.signedAt).toLocaleString()}</p>}
                      </div>
                      {signer.comments && (
                        <div className="bg-white p-3 rounded border">
                          <p className="text-sm text-[#1E293B]">{signer.comments}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-[#1E293B]">Document Activity</CardTitle>
              <CardDescription className="text-[#64748B]">Timeline of all interactions and changes</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 pb-4 border-b">
                    <div className="w-2 h-2 bg-[#38B26C] rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#1E293B]">Sarah Chen signed the document</p>
                      <p className="text-xs text-[#64748B]">January 21, 2024 at 2:30 PM</p>
                      <p className="text-xs text-[#64748B] mt-1">
                        Comment: "Legal terms look good. Approved for signing."
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 pb-4 border-b">
                    <div className="w-2 h-2 bg-[#2453CC] rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#1E293B]">Mike Torres started reviewing</p>
                      <p className="text-xs text-[#64748B]">January 21, 2024 at 10:15 AM</p>
                      <p className="text-xs text-[#64748B] mt-1">
                        Comment: "Reviewing technical specifications in Section 3."
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 pb-4 border-b">
                    <div className="w-2 h-2 bg-[#64748B] rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#1E293B]">Co-signers invited</p>
                      <p className="text-xs text-[#64748B]">January 20, 2024 at 11:00 AM</p>
                      <p className="text-xs text-[#64748B] mt-1">
                        Sarah Chen, Mike Torres, and Alex Rodriguez were invited
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 pb-4 border-b">
                    <div className="w-2 h-2 bg-[#2453CC] rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#1E293B]">AI analysis completed</p>
                      <p className="text-xs text-[#64748B]">January 20, 2024 at 10:32 AM</p>
                      <p className="text-xs text-[#64748B] mt-1">Analysis confidence: 94%</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#38B26C] rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#1E293B]">Document uploaded</p>
                      <p className="text-xs text-[#64748B]">January 20, 2024 at 10:30 AM</p>
                      <p className="text-xs text-[#64748B] mt-1">Software License Agreement (2.4 MB, 12 pages)</p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Bar */}
      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-[#1E293B]">Ready for Next Steps?</h3>
              <p className="text-sm text-[#64748B]">
                {coSigners.filter((s) => s.status === "signed").length === coSigners.length
                  ? "All co-signers have approved. Ready to mint NFT certificate."
                  : `Waiting for ${coSigners.filter((s) => s.status !== "signed").length} more signature${coSigners.filter((s) => s.status !== "signed").length !== 1 ? "s" : ""}.`}
              </p>
            </div>
            <div className="flex space-x-3">
              {coSigners.filter((s) => s.status === "signed").length === coSigners.length ? (
                <Button
                  className="bg-[#38B26C] hover:bg-[#2d8f57] text-white"
                  onClick={() => (window.location.href = "/dashboard/mint")}
                >
                  <Coins className="w-4 h-4 mr-2" />
                  Mint NFT Certificate
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  className="bg-[#2453CC] hover:bg-[#1e42a4] text-white"
                  onClick={() => (window.location.href = "/dashboard/invite")}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Manage Co-signers
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
