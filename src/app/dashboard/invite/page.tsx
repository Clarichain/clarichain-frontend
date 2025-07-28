"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X, Mail, Users, Send, CheckCircle, Clock } from "lucide-react"

interface Signer {
  id: string
  email: string
  name: string
  role: string
  status: "pending" | "invited" | "accepted"
}

export default function InvitePage() {
  const [selectedDocument, setSelectedDocument] = useState("")
  const [signers, setSigners] = useState<Signer[]>([])
  const [newSignerEmail, setNewSignerEmail] = useState("")
  const [newSignerName, setNewSignerName] = useState("")
  const [newSignerRole, setNewSignerRole] = useState("")
  const [message, setMessage] = useState("")
  const [isInviting, setIsInviting] = useState(false)

  const documents = [
    { id: "1", name: "Software License Agreement", type: "Contract" },
    { id: "2", name: "Research Collaboration NDA", type: "Policy" },
    { id: "3", name: "PhD Thesis Approval", type: "Thesis" },
  ]

  const addSigner = () => {
    if (newSignerEmail && newSignerName) {
      const newSigner: Signer = {
        id: Date.now().toString(),
        email: newSignerEmail,
        name: newSignerName,
        role: newSignerRole || "Reviewer",
        status: "pending",
      }
      setSigners([...signers, newSigner])
      setNewSignerEmail("")
      setNewSignerName("")
      setNewSignerRole("")
    }
  }

  const removeSigner = (id: string) => {
    setSigners(signers.filter((signer) => signer.id !== id))
  }

  const sendInvitations = async () => {
    setIsInviting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setSigners(signers.map((signer) => ({ ...signer, status: "invited" })))
    setIsInviting(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "invited":
        return <Mail className="w-4 h-4 text-[#2453CC]" />
      case "accepted":
        return <CheckCircle className="w-4 h-4 text-[#38B26C]" />
      default:
        return <Clock className="w-4 h-4 text-[#F59E0B]" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "invited":
        return <Badge className="bg-[#2453CC]/10 text-[#2453CC] border-[#2453CC]/20">Invited</Badge>
      case "accepted":
        return <Badge className="bg-[#38B26C]/10 text-[#38B26C] border-[#38B26C]/20">Accepted</Badge>
      default:
        return <Badge className="bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20">Pending</Badge>
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1E293B]">Invite Co-signers</h1>
        <p className="text-[#64748B] mt-1">Add collaborators to review and sign your documents</p>
      </div>

      {/* Document Selection */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="text-[#1E293B]">Select Document</CardTitle>
          <CardDescription className="text-[#64748B]">Choose which document to share with co-signers</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedDocument} onValueChange={setSelectedDocument}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a document to share" />
            </SelectTrigger>
            <SelectContent>
              {documents.map((doc) => (
                <SelectItem key={doc.id} value={doc.id}>
                  <div className="flex items-center space-x-2">
                    <span>{doc.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {doc.type}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Add Signers */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="text-[#1E293B]">Add Co-signers</CardTitle>
          <CardDescription className="text-[#64748B]">Invite people to review and sign the document</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <div className="flex items-end">
              <Button onClick={addSigner} className="w-full bg-[#2453CC] hover:bg-[#1e42a4] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </div>

          {/* Signers List */}
          {signers.length > 0 && (
            <div className="space-y-3 mt-6">
              <h3 className="font-semibold text-[#1E293B]">Co-signers ({signers.length})</h3>
              <div className="space-y-2">
                {signers.map((signer) => (
                  <div key={signer.id} className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-[#2453CC] text-white">
                          {signer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-[#1E293B]">{signer.name}</p>
                        <p className="text-sm text-[#64748B]">{signer.email}</p>
                        <p className="text-xs text-[#64748B]">{signer.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(signer.status)}
                      {getStatusBadge(signer.status)}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSigner(signer.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Custom Message */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="text-[#1E293B]">Custom Message</CardTitle>
          <CardDescription className="text-[#64748B]">
            Add a personal message to include with the invitation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Hi there! I'm sharing this document with you for review and signature. Please take a look and let me know if you have any questions."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Send Invitations */}
      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-[#1E293B]">Ready to Send?</h3>
              <p className="text-sm text-[#64748B]">
                {signers.length} co-signer{signers.length !== 1 ? "s" : ""} will receive an invitation to review and
                sign the document.
              </p>
            </div>
            <Button
              onClick={sendInvitations}
              disabled={!selectedDocument || signers.length === 0 || isInviting}
              className="bg-[#38B26C] hover:bg-[#2d8f57] text-white"
            >
              {isInviting ? (
                <>
                  <Users className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Invitations
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
