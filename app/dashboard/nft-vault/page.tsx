"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Coins, Search, ExternalLink, Download, Eye, Copy, Calendar, Users, FileText } from "lucide-react"

const nftCertificates = [
  {
    id: "1",
    documentName: "Software License Agreement",
    documentType: "Contract",
    mintedDate: "2024-01-20",
    nftHash: "0x9f8e7d6c5b4a39281706f5e4d3c2b1a09f8e7d6c5b4a39281706f5e4d3c2b1a0",
    documentHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z",
    signers: [
      { name: "John Doe", avatar: "JD" },
      { name: "Sarah Chen", avatar: "SC" },
      { name: "Mike Torres", avatar: "MT" },
    ],
    blockchainUrl: "https://cardanoscan.io/token/9f8e7d6c5b4a39281706f5e4d3c2b1a0",
    metadata: {
      title: "ClariChain Document Certificate",
      description: "Verified document certificate minted on Cardano blockchain",
      properties: {
        documentType: "Contract",
        signerCount: 3,
        verificationLevel: "High",
      },
    },
  },
  {
    id: "2",
    documentName: "Research Collaboration NDA",
    documentType: "Policy",
    mintedDate: "2024-01-18",
    nftHash: "0x8e7d6c5b4a39281706f5e4d3c2b1a09f8e7d6c5b4a39281706f5e4d3c2b1a09f",
    documentHash: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z1a2b3c4d5e6f",
    signers: [
      { name: "John Doe", avatar: "JD" },
      { name: "Dr. Michael Torres", avatar: "MT" },
    ],
    blockchainUrl: "https://cardanoscan.io/token/8e7d6c5b4a39281706f5e4d3c2b1a0",
    metadata: {
      title: "ClariChain Document Certificate",
      description: "Verified document certificate minted on Cardano blockchain",
      properties: {
        documentType: "Policy",
        signerCount: 2,
        verificationLevel: "High",
      },
    },
  },
  {
    id: "3",
    documentName: "PhD Thesis Approval",
    documentType: "Thesis",
    mintedDate: "2024-01-15",
    nftHash: "0x7d6c5b4a39281706f5e4d3c2b1a09f8e7d6c5b4a39281706f5e4d3c2b1a09f8e",
    documentHash: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z1a2b3c4d5e6f7g",
    signers: [
      { name: "John Doe", avatar: "JD" },
      { name: "Dr. Sarah Chen", avatar: "SC" },
      { name: "Prof. Alex Rodriguez", avatar: "AR" },
      { name: "Dr. Michael Torres", avatar: "MT" },
    ],
    blockchainUrl: "https://cardanoscan.io/token/7d6c5b4a39281706f5e4d3c2b1a0",
    metadata: {
      title: "ClariChain Document Certificate",
      description: "Verified document certificate minted on Cardano blockchain",
      properties: {
        documentType: "Thesis",
        signerCount: 4,
        verificationLevel: "High",
      },
    },
  },
]

export default function NFTVaultPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNFT, setSelectedNFT] = useState<(typeof nftCertificates)[0] | null>(null)

  const filteredNFTs = nftCertificates.filter(
    (nft) =>
      nft.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nft.documentType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">NFT Vault</h1>
          <p className="text-[#64748B] mt-1">Your verified document certificates on the blockchain</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] w-4 h-4" />
            <Input
              placeholder="Search certificates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#64748B]">Total NFTs</p>
                <p className="text-2xl font-bold text-[#1E293B]">{nftCertificates.length}</p>
              </div>
              <Coins className="h-8 w-8 text-[#2453CC]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#64748B]">This Month</p>
                <p className="text-2xl font-bold text-[#1E293B]">2</p>
              </div>
              <Calendar className="h-8 w-8 text-[#38B26C]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#64748B]">Total Signers</p>
                <p className="text-2xl font-bold text-[#1E293B]">9</p>
              </div>
              <Users className="h-8 w-8 text-[#F59E0B]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#64748B]">Blockchain Value</p>
                <p className="text-2xl font-bold text-[#1E293B]">7.5 ADA</p>
              </div>
              <FileText className="h-8 w-8 text-[#64748B]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* NFT Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNFTs.map((nft) => (
          <Card key={nft.id} className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-[#1E293B] mb-2">{nft.documentName}</CardTitle>
                  <Badge className={getTypeColor(nft.documentType)}>{nft.documentType}</Badge>
                </div>
                <Coins className="w-6 h-6 text-[#2453CC]" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748B]">Minted:</span>
                  <span className="text-[#1E293B]">{nft.mintedDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748B]">Signers:</span>
                  <div className="flex -space-x-2">
                    {nft.signers.slice(0, 3).map((signer, index) => (
                      <Avatar key={index} className="w-6 h-6 border-2 border-white">
                        <AvatarFallback className="bg-[#2453CC] text-white text-xs">{signer.avatar}</AvatarFallback>
                      </Avatar>
                    ))}
                    {nft.signers.length > 3 && (
                      <div className="w-6 h-6 bg-[#64748B] text-white text-xs rounded-full flex items-center justify-center border-2 border-white">
                        +{nft.signers.length - 3}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748B]">NFT Hash:</span>
                  <div className="flex items-center space-x-1">
                    <code className="text-xs bg-[#F9FAFB] px-1 py-0.5 rounded">{nft.nftHash.substring(0, 8)}...</code>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(nft.nftHash)}>
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => setSelectedNFT(nft)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-white">
                    <DialogHeader>
                      <DialogTitle className="text-[#1E293B]">NFT Certificate Details</DialogTitle>
                      <DialogDescription className="text-[#64748B]">
                        Blockchain-verified document certificate
                      </DialogDescription>
                    </DialogHeader>
                    {selectedNFT && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-[#1E293B] mb-2">Document Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-[#64748B]">Name:</span>
                                <span className="text-[#1E293B]">{selectedNFT.documentName}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#64748B]">Type:</span>
                                <Badge className={getTypeColor(selectedNFT.documentType)}>
                                  {selectedNFT.documentType}
                                </Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#64748B]">Minted:</span>
                                <span className="text-[#1E293B]">{selectedNFT.mintedDate}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#1E293B] mb-2">Blockchain Data</h4>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="text-[#64748B]">NFT Hash:</span>
                                <div className="flex items-center space-x-2 mt-1">
                                  <code className="text-xs bg-[#F9FAFB] px-2 py-1 rounded flex-1">
                                    {selectedNFT.nftHash}
                                  </code>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyToClipboard(selectedNFT.nftHash)}
                                  >
                                    <Copy className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                              <div>
                                <span className="text-[#64748B]">Document Hash:</span>
                                <div className="flex items-center space-x-2 mt-1">
                                  <code className="text-xs bg-[#F9FAFB] px-2 py-1 rounded flex-1">
                                    {selectedNFT.documentHash}
                                  </code>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyToClipboard(selectedNFT.documentHash)}
                                  >
                                    <Copy className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-[#1E293B] mb-3">Signers ({selectedNFT.signers.length})</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {selectedNFT.signers.map((signer, index) => (
                              <div key={index} className="flex items-center space-x-2 p-2 bg-[#F9FAFB] rounded">
                                <Avatar className="w-8 h-8">
                                  <AvatarFallback className="bg-[#2453CC] text-white text-xs">
                                    {signer.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-[#1E293B]">{signer.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            className="flex-1 bg-[#2453CC] hover:bg-[#1e42a4] text-white"
                            onClick={() => window.open(selectedNFT.blockchainUrl, "_blank")}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View on Blockchain
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={() => alert("Certificate downloaded successfully!")}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Certificate
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                <Button variant="outline" size="sm" onClick={() => window.open(nft.blockchainUrl, "_blank")}>
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNFTs.length === 0 && (
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-12 text-center">
            <Coins className="w-12 h-12 text-[#64748B] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#1E293B] mb-2">No NFT certificates found</h3>
            <p className="text-[#64748B] mb-4">
              {searchTerm ? "Try adjusting your search terms" : "Start by uploading and minting your first document"}
            </p>
            {!searchTerm && (
              <Button
                className="bg-[#2453CC] hover:bg-[#1e42a4] text-white"
                onClick={() => (window.location.href = "/dashboard/upload")}
              >
                Upload Document
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
