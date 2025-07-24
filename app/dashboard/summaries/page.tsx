"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  BookOpen,
  Send,
  Bot,
  User,
  Search,
  Filter,
  MoreHorizontal,
  Copy,
  Download,
  Share,
  Trash2,
  Clock,
  FileText,
  Sparkles,
} from "lucide-react"

interface Summary {
  id: string
  documentName: string
  documentType: string
  createdAt: string
  summary: string
  eli5Summary: string
  keyPoints: string[]
  aiConfidence: number
}

interface ChatMessage {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: string
  relatedSummary?: string
}

const savedSummaries: Summary[] = [
  {
    id: "1",
    documentName: "Software License Agreement",
    documentType: "Contract",
    createdAt: "2024-01-20T10:30:00Z",
    summary:
      "This Software License Agreement establishes the terms and conditions under which the licensor grants the licensee certain rights to use proprietary software. The agreement includes provisions for intellectual property protection, usage limitations, liability disclaimers, and termination clauses.",
    eli5Summary:
      "Think of this like renting a special computer program. The company that made the program is letting you use it, but you have to follow some rules. You can't share it with others, you have to pay what you agreed to pay, and if you break the rules, they can take it away.",
    keyPoints: [
      "Limited license for internal business use only",
      "Annual license fee of $50,000 due within 30 days",
      "All proprietary information must remain confidential",
      "Either party may terminate with 90 days written notice",
    ],
    aiConfidence: 94,
  },
  {
    id: "2",
    documentName: "Research Collaboration NDA",
    documentType: "Policy",
    createdAt: "2024-01-18T14:15:00Z",
    summary:
      "This Non-Disclosure Agreement (NDA) governs the sharing of confidential information between research institutions. It establishes protocols for data protection, publication rights, and intellectual property ownership in collaborative research projects.",
    eli5Summary:
      "This is like a promise between schools or research groups to keep each other's secrets safe. When they work together on projects, they agree not to tell anyone else about the special information they share.",
    keyPoints: [
      "Confidential information includes research data and methodologies",
      "Publication requires mutual consent from all parties",
      "Agreement valid for 5 years from signing date",
      "Violations subject to legal action and damages",
    ],
    aiConfidence: 91,
  },
  {
    id: "3",
    documentName: "PhD Thesis Approval",
    documentType: "Thesis",
    createdAt: "2024-01-15T09:45:00Z",
    summary:
      "This document outlines the formal approval process for PhD thesis submission and defense. It includes requirements for committee formation, thesis formatting standards, defense scheduling, and final approval procedures.",
    eli5Summary:
      "This is like the rulebook for finishing your PhD. It tells you what your big final paper should look like, who needs to check it, and what you need to do to graduate.",
    keyPoints: [
      "Thesis committee must have minimum 4 members",
      "Defense must be scheduled 6 weeks in advance",
      "Thesis must follow university formatting guidelines",
      "Final approval requires unanimous committee consent",
    ],
    aiConfidence: 96,
  },
]

const initialChatMessages: ChatMessage[] = [
  {
    id: "welcome",
    type: "ai",
    content:
      "Hello! I'm your AI assistant for document analysis. I can help you understand your saved summaries, answer questions about your documents, or provide additional insights. What would you like to know?",
    timestamp: new Date().toISOString(),
  },
]

export default function SummariesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSummary, setSelectedSummary] = useState<Summary | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages)
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const filteredSummaries = savedSummaries.filter(
    (summary) =>
      summary.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      summary.documentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      summary.summary.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date().toISOString(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, selectedSummary)
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse,
        timestamp: new Date().toISOString(),
        relatedSummary: selectedSummary?.documentName,
      }

      setChatMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (message: string, summary: Summary | null): string => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("explain") || lowerMessage.includes("what is")) {
      if (summary) {
        return `Based on your ${summary.documentType.toLowerCase()} "${summary.documentName}", ${summary.eli5Summary}`
      }
      return "I'd be happy to explain! Could you specify which document or concept you'd like me to clarify?"
    }

    if (lowerMessage.includes("key points") || lowerMessage.includes("important")) {
      if (summary) {
        return `Here are the key points from "${summary.documentName}":\n\n${summary.keyPoints.map((point, index) => `${index + 1}. ${point}`).join("\n")}`
      }
      return "I can highlight key points from any of your saved summaries. Which document would you like me to focus on?"
    }

    if (lowerMessage.includes("confidence") || lowerMessage.includes("accurate")) {
      if (summary) {
        return `My analysis of "${summary.documentName}" has a confidence level of ${summary.aiConfidence}%. This indicates high accuracy in the summary and key points extraction.`
      }
      return "I maintain confidence scores for all document analyses. The average confidence across your summaries is 94%, indicating high accuracy."
    }

    if (lowerMessage.includes("compare") || lowerMessage.includes("difference")) {
      return "I can help compare different documents in your collection. For example, your Contract and Policy documents have different legal implications and requirements. Would you like me to elaborate on specific comparisons?"
    }

    if (lowerMessage.includes("help") || lowerMessage.includes("what can you do")) {
      return "I can help you with:\n\n• Explaining document summaries in simple terms\n• Highlighting key points and important clauses\n• Comparing different documents\n• Answering questions about legal or technical terms\n• Providing additional context about document types\n\nJust ask me anything about your saved summaries!"
    }

    // Default responses
    const responses = [
      "That's an interesting question! Based on your document collection, I can provide more specific insights if you reference a particular summary.",
      "I'd be happy to help with that. Could you provide more context about which document or aspect you're interested in?",
      "Great question! I can analyze this further using the information from your saved summaries. Which document would you like me to focus on?",
      "I can provide detailed insights about that topic. Would you like me to reference any of your specific document summaries?",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Contract":
        return "bg-[#2453CC]/10 text-[#2453CC] border-[#2453CC]/20"
      case "Policy":
        return "bg-[#38B26C]/10 text-[#38B26C] border-[#38B26C]/20"
      case "Thesis":
        return "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Left Panel - Saved Summaries */}
      <div className="w-1/2 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1E293B]">Saved Summaries</h1>
            <p className="text-[#64748B] mt-1">Your AI-generated document summaries and analysis</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] w-4 h-4" />
            <Input
              placeholder="Search summaries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#64748B]">Total Summaries</p>
                  <p className="text-xl font-bold text-[#1E293B]">{savedSummaries.length}</p>
                </div>
                <BookOpen className="h-6 w-6 text-[#2453CC]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#64748B]">Avg Confidence</p>
                  <p className="text-xl font-bold text-[#1E293B]">94%</p>
                </div>
                <Sparkles className="h-6 w-6 text-[#38B26C]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#64748B]">This Month</p>
                  <p className="text-xl font-bold text-[#1E293B]">3</p>
                </div>
                <Clock className="h-6 w-6 text-[#F59E0B]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summaries List */}
        <ScrollArea className="flex-1">
          <div className="space-y-4">
            {filteredSummaries.map((summary) => (
              <Card
                key={summary.id}
                className={`border-0 shadow-sm bg-white hover:shadow-md transition-shadow cursor-pointer ${
                  selectedSummary?.id === summary.id ? "ring-2 ring-[#2453CC]" : ""
                }`}
                onClick={() => setSelectedSummary(summary)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-[#1E293B] mb-2">{summary.documentName}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge className={getTypeColor(summary.documentType)}>{summary.documentType}</Badge>
                        <Badge className="bg-[#38B26C]/10 text-[#38B26C] border-[#38B26C]/20">
                          {summary.aiConfidence}% confidence
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => copyToClipboard(summary.summary)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Summary
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert("Download functionality would be implemented here")}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert("Share functionality would be implemented here")}>
                          <Share className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => alert("Delete functionality would be implemented here")}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#64748B] mb-3 line-clamp-3">{summary.summary}</p>
                  <div className="flex items-center justify-between text-xs text-[#64748B]">
                    <span>Created {new Date(summary.createdAt).toLocaleDateString()}</span>
                    <span>{summary.keyPoints.length} key points</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right Panel - AI Chat */}
      <div className="w-1/2 flex flex-col">
        <Card className="border-0 shadow-sm bg-white flex-1 flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center text-[#1E293B]">
                  <Bot className="w-5 h-5 mr-2 text-[#2453CC]" />
                  AI Assistant
                </CardTitle>
                <CardDescription className="text-[#64748B]">
                  {selectedSummary
                    ? `Discussing: ${selectedSummary.documentName}`
                    : "Ask me anything about your document summaries"}
                </CardDescription>
              </div>
              {selectedSummary && (
                <Button variant="outline" size="sm" onClick={() => setSelectedSummary(null)}>
                  Clear Context
                </Button>
              )}
            </div>
          </CardHeader>

          {/* Chat Messages */}
          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`flex items-start space-x-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                    >
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarFallback
                          className={message.type === "user" ? "bg-[#2453CC] text-white" : "bg-[#38B26C] text-white"}
                        >
                          {message.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`rounded-lg p-3 ${
                          message.type === "user" ? "bg-[#2453CC] text-white" : "bg-[#F9FAFB] text-[#1E293B] border"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        {message.relatedSummary && (
                          <div className="mt-2 pt-2 border-t border-[#E2E8F0]">
                            <p className="text-xs text-[#64748B] flex items-center">
                              <FileText className="w-3 h-3 mr-1" />
                              Related to: {message.relatedSummary}
                            </p>
                          </div>
                        )}
                        <p className="text-xs opacity-70 mt-1">{new Date(message.timestamp).toLocaleTimeString()}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2 max-w-[80%]">
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarFallback className="bg-[#38B26C] text-white">
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg p-3 bg-[#F9FAFB] border">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-[#64748B] rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-[#64748B] rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-[#64748B] rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </ScrollArea>

            <Separator className="my-4" />

            {/* Chat Input */}
            <div className="space-y-3">
              {selectedSummary && (
                <div className="bg-[#2453CC]/10 border border-[#2453CC]/20 rounded-lg p-3">
                  <p className="text-sm text-[#2453CC] font-medium">Context: {selectedSummary.documentName}</p>
                  <p className="text-xs text-[#64748B] mt-1">AI responses will reference this document</p>
                </div>
              )}

              <div className="flex space-x-2">
                <Textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about your summaries..."
                  className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                  rows={1}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-[#2453CC] hover:bg-[#1e42a4] text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputMessage("Explain this document in simple terms")}
                  className="text-xs"
                >
                  Explain simply
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputMessage("What are the key points?")}
                  className="text-xs"
                >
                  Key points
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputMessage("Compare my documents")}
                  className="text-xs"
                >
                  Compare docs
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
