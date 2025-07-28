"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  FileText,
  File,
  CheckCircle,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

const UploadBtnSheet = ({ children }: { children: React.ReactNode }) => {
  const [uploadStep, setUploadStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState("");
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentDescription, setDocumentDescription] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setDocumentTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !documentType) return;
    setUploadStep(2);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStep(3);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleContinueToAI = () => {
    window.location.href = `/dashboard/analyze/${encodeURIComponent(
      selectedFile?.name || documentTitle
    )}`;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="!w-[95%] sm:!min-w-[600px] p-6 space-y-6 overflow-y-auto md:pr-10">
        {/* Steps Indicator */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    uploadStep >= step
                      ? "bg-[#2453CC] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {uploadStep >= 3 && step === 3 ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    step
                  )}
                </div>
                {step < 3 && (
                  <div className="w-10 h-1 bg-gray-200">
                    <div
                      className={`h-full transition-all duration-300 ${
                        uploadStep > step ? "bg-[#2453CC] w-full" : "w-0"
                      }`}
                    ></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            Step {uploadStep} of 3
          </div>
        </div>

        {uploadStep === 1 && (
          <div className="space-y-6">
            {/* File Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#2453CC] transition-colors">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.docx,.txt"
                onChange={handleFileSelect}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer block"
              >
                <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-semibold">
                  Drop your file here or click to browse
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports PDF, DOCX, and TXT files
                </p>
                {selectedFile && (
                  <div className="flex justify-center items-center gap-2 mt-4 p-2 bg-green-100 rounded-md">
                    <FileText className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-700 font-medium">
                      {selectedFile.name}
                    </span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                )}
              </label>
            </div>

            <div className="grid gap-4">
              <div>
                <Label htmlFor="title">Document Title</Label>
                <Input
                  id="title"
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  placeholder="Enter document title"
                />
              </div>

              <div>
                <Label>Document Type</Label>
                <RadioGroup
                  value={documentType}
                  onValueChange={setDocumentType}
                  className="mt-2 grid grid-cols-2 gap-2"
                >
                  {["contract", "thesis", "policy", "other"].map((type) => (
                    <div
                      key={type}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        value={type}
                        id={type}
                      />
                      <Label
                        htmlFor={type}
                        className="capitalize"
                      >
                        {type}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={documentDescription}
                  onChange={(e) => setDocumentDescription(e.target.value)}
                  placeholder="Brief description of the document"
                  rows={5}
                  className="resize-none"
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
          </div>
        )}

        {uploadStep === 2 && (
          <div className="text-center py-10 space-y-6">
            <div className="w-16 h-16 bg-[#2453CC]/10 rounded-full flex items-center justify-center mx-auto">
              <File className="w-8 h-8 text-[#2453CC] animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold">
              Analyzing &quot;{documentTitle}&quot;
            </h3>
            <p className="text-muted-foreground">
              This may take a few moments depending on document length
            </p>
            <Progress
              value={uploadProgress}
              className="mx-auto max-w-sm"
            />
            <p className="text-sm text-muted-foreground">
              {uploadProgress}% complete
            </p>
          </div>
        )}

        {uploadStep === 3 && (
          <div className="space-y-6">
            <div className="bg-green-100 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold">
                    Document Successfully Uploaded
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    &quot;{documentTitle}&quot; is now ready for AI analysis.
                  </p>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>• Document type: {documentType}</li>
                    <li>
                      • File size:{" "}
                      {selectedFile
                        ? (selectedFile.size / 1024 / 1024).toFixed(2)
                        : "0"}{" "}
                      MB
                    </li>
                    <li>• Processing time: ~2.3s</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Next Steps</h4>
                  <p className="text-sm text-muted-foreground">
                    Review the AI summary, invite co-signers, and mint an NFT
                    once approved.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleContinueToAI}
                className="flex-1 bg-[#2453CC] text-white"
              >
                View AI Summary
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setUploadStep(1);
                  setSelectedFile(null);
                  setDocumentTitle("");
                  setDocumentType("");
                  setDocumentDescription("");
                  setUploadProgress(0);
                }}
              >
                Upload Another
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default UploadBtnSheet;
