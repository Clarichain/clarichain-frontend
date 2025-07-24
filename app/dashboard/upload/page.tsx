"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, File, CheckCircle, ArrowRight, AlertCircle } from "lucide-react"

export default function UploadPage() {
  const [uploadStep, setUploadStep] = useState(1)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [documentType, setDocumentType] = useState("")
  const [documentTitle, setDocumentTitle] = useState("")
  const [documentDescription, setDocumentDescription] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setDocumentTitle(file.name.replace(/\.[^/.]+$/, ""))
    }
  }

  const handleUpload = () => {
    if (!selectedFile || !documentType) return

    setUploadStep(2)
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploadStep(3)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleContinueToAI = () => {
    // Navigate to AI analysis page
    window.location.href = `/dashboard/analyze/${encodeURIComponent(selectedFile?.name || documentTitle)}`
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${uploadStep >= 1 ? "bg-[#2453CC] text-white" : "bg-gray-200 text-gray-500"}`}
          >
            1
          </div>
          <div className="w-16 h-1 bg-gray-200">
            <div
              className={`h-full bg-[#2453CC] transition-all duration-300 ${uploadStep >= 2 ? "w-full" : "w-0"}`}
            ></div>
          </div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${uploadStep >= 2 ? "bg-[#2453CC] text-white" : "bg-gray-200 text-gray-500"}`}
          >
            2
          </div>
          <div className="w-16 h-1 bg-gray-200">
            <div
              className={`h-full bg-[#2453CC] transition-all duration-300 ${uploadStep >= 3 ? "w-full" : "w-0"}`}
            ></div>
          </div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${uploadStep >= 3 ? "bg-[#38B26C] text-white" : "bg-gray-200 text-gray-500"}`}
          >
            {uploadStep >= 3 ? <CheckCircle className="w-4 h-4" /> : "3"}
          </div>
        </div>
        <div className="text-sm text-[#64748B]">Step {uploadStep} of 3</div>
      </div>

      {uploadStep === 1 && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#1E293B]">Upload Document</CardTitle>
            <CardDescription className="text-[#64748B]">
              Upload your document to get started with AI-powered analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* File Upload Area */}
            <div className="border-2 border-dashed border-[#E2E8F0] rounded-lg p-8 text-center hover:border-[#2453CC] transition-colors">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.docx,.txt"
                onChange={handleFileSelect}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 text-[#64748B] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#1E293B] mb-2">Drop your file here or click to browse</h3>
                <p className="text-[#64748B] mb-4">Supports PDF, DOCX, and TXT files up to 10MB</p>
                {selectedFile && (
                  <div className="flex items-center justify-center space-x-2 mt-4 p-3 bg-[#38B26C]/10 rounded-lg">
                    <FileText className="w-5 h-5 text-[#38B26C]" />
                    <span className="text-[#38B26C] font-medium">{selectedFile.name}</span>
                    <CheckCircle className="w-5 h-5 text-[#38B26C]" />
                  </div>
                )}
              </label>
            </div>

            {/* Document Details */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-[#1E293B]">
                  Document Title
                </Label>
                <Input
                  id="title"
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  placeholder="Enter document title"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-[#1E293B]">Document Type</Label>
                <RadioGroup value={documentType} onValueChange={setDocumentType} className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="contract" id="contract" />
                    <Label htmlFor="contract">Contract</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="thesis" id="thesis" />
                    <Label htmlFor="thesis">Thesis</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="policy" id="policy" />
                    <Label htmlFor="policy">Policy</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="description" className="text-[#1E293B]">
                  Description (Optional)
                </Label>
                <Textarea
                  id="description"
                  value={documentDescription}
                  onChange={(e) => setDocumentDescription(e.target.value)}
                  placeholder="Brief description of the document"
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>

            <Button
              onClick={handleUpload}
              disabled={!selectedFile || !documentType}
              className="w-full bg-[#2453CC] hover:bg-[#1e42a4] text-white"
            >
              Continue to AI Analysis
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}

      {uploadStep === 2 && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#1E293B]">Processing Document</CardTitle>
            <CardDescription className="text-[#64748B]">
              Our AI is analyzing your document and preparing the summary
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#2453CC]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <File className="w-8 h-8 text-[#2453CC] animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold text-[#1E293B] mb-2">Analyzing "{documentTitle}"</h3>
              <p className="text-[#64748B] mb-6">This may take a few moments depending on document length</p>

              <div className="max-w-md mx-auto">
                <Progress value={uploadProgress} className="mb-2" />
                <p className="text-sm text-[#64748B]">{uploadProgress}% complete</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {uploadStep === 3 && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#1E293B] flex items-center">
              <CheckCircle className="w-6 h-6 text-[#38B26C] mr-2" />
              Upload Complete
            </CardTitle>
            <CardDescription className="text-[#64748B]">
              Your document has been successfully processed and is ready for AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-[#38B26C]/10 border border-[#38B26C]/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#38B26C] mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#1E293B] mb-1">Document Successfully Uploaded</h4>
                  <p className="text-sm text-[#64748B] mb-2">
                    "{documentTitle}" has been processed and is ready for AI analysis.
                  </p>
                  <ul className="text-sm text-[#64748B] space-y-1">
                    <li>• Document type: {documentType}</li>
                    <li>• File size: {selectedFile ? (selectedFile.size / 1024 / 1024).toFixed(2) : "0"} MB</li>
                    <li>• Processing time: 2.3 seconds</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-[#F59E0B] mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#1E293B] mb-1">Next Steps</h4>
                  <p className="text-sm text-[#64748B]">
                    Your document is now ready for AI-powered analysis. You can review the plain-language summary,
                    invite co-signers, and eventually mint an NFT once all parties approve.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button onClick={handleContinueToAI} className="flex-1 bg-[#2453CC] hover:bg-[#1e42a4] text-white">
                View AI Summary
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => {
                  setUploadStep(1)
                  setSelectedFile(null)
                  setDocumentTitle("")
                  setDocumentType("")
                  setDocumentDescription("")
                  setUploadProgress(0)
                }}
              >
                Upload Another Document
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
