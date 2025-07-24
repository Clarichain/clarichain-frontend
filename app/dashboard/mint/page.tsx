"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { FileText, Wallet, Coins, CheckCircle, ExternalLink, Copy } from "lucide-react"

export default function MintPage() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [mintingProgress, setMintingProgress] = useState(0)
  const [isMinted, setIsMinted] = useState(false)
  const [nftHash, setNftHash] = useState("")

  const document = {
    name: "Software License Agreement",
    type: "Contract",
    hash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z",
    timestamp: "2024-01-20T10:30:00Z",
    signers: [
      { name: "John Doe", email: "john@example.com", status: "signed", avatar: "JD" },
      { name: "Sarah Chen", email: "sarah@legalfirm.com", status: "signed", avatar: "SC" },
      { name: "Mike Torres", email: "mike@techcorp.com", status: "signed", avatar: "MT" },
    ],
  }

  const connectWallet = async () => {
    // Simulate wallet connection
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsWalletConnected(true)
  }

  const mintNFT = async () => {
    setIsMinting(true)
    setMintingProgress(0)

    // Simulate minting process
    const interval = setInterval(() => {
      setMintingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsMinting(false)
          setIsMinted(true)
          setNftHash("0x9f8e7d6c5b4a39281706f5e4d3c2b1a09f8e7d6c5b4a39281706f5e4d3c2b1a0")
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1E293B]">Mint NFT Certificate</h1>
        <p className="text-[#64748B] mt-1">Create a permanent, tamper-proof record on the Cardano blockchain</p>
      </div>

      {/* Document Summary */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="flex items-center text-[#1E293B]">
            <FileText className="w-5 h-5 mr-2" />
            Document Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-[#1E293B] mb-2">{document.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Type:</span>
                  <Badge variant="outline">{document.type}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Document Hash:</span>
                  <div className="flex items-center space-x-2">
                    <code className="text-xs bg-[#F9FAFB] px-2 py-1 rounded">{document.hash.substring(0, 16)}...</code>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(document.hash)}>
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Timestamp:</span>
                  <span className="text-[#1E293B]">{new Date(document.timestamp).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-[#1E293B] mb-3">Signers ({document.signers.length})</h4>
              <div className="space-y-2">
                {document.signers.map((signer, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-[#2453CC] text-white text-xs">{signer.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#1E293B]">{signer.name}</p>
                      <p className="text-xs text-[#64748B]">{signer.email}</p>
                    </div>
                    <CheckCircle className="w-4 h-4 text-[#38B26C]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Section */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="flex items-center text-[#1E293B]">
            <Wallet className="w-5 h-5 mr-2" />
            Your Cardano Wallet
          </CardTitle>
          <CardDescription className="text-[#64748B]">
            Your automatically generated wallet for minting NFT certificates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-[#38B26C]/10 border border-[#38B26C]/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-[#38B26C]" />
              <div>
                <h4 className="font-semibold text-[#1E293B]">ClariChain Wallet Active</h4>
                <p className="text-sm text-[#64748B]">addr1qxy2...7z8w9 • Balance: 150.25 ADA</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Minting Section */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="flex items-center text-[#1E293B]">
            <Coins className="w-5 h-5 mr-2" />
            NFT Minting
          </CardTitle>
          <CardDescription className="text-[#64748B]">
            Create a permanent, tamper-proof certificate on the blockchain
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isMinted ? (
            <div className="space-y-6">
              {isMinting && (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="font-semibold text-[#1E293B] mb-2">Minting NFT Certificate...</h3>
                    <p className="text-sm text-[#64748B] mb-4">
                      This process may take a few minutes. Please don't close this window.
                    </p>
                    <Progress value={mintingProgress} className="w-full max-w-md mx-auto" />
                    <p className="text-sm text-[#64748B] mt-2">{mintingProgress}% complete</p>
                  </div>
                </div>
              )}

              {!isMinting && (
                <div className="space-y-4">
                  <div className="bg-[#2453CC]/10 border border-[#2453CC]/20 rounded-lg p-4">
                    <h4 className="font-semibold text-[#1E293B] mb-2">Minting Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#64748B]">Network:</span>
                        <span className="text-[#1E293B]">Cardano Mainnet</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#64748B]">Estimated Fee:</span>
                        <span className="text-[#1E293B]">2.5 ADA</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#64748B]">Processing Time:</span>
                        <span className="text-[#1E293B]">2-5 minutes</span>
                      </div>
                    </div>
                  </div>

                  <Button onClick={mintNFT} className="w-full bg-[#38B26C] hover:bg-[#2d8f57] text-white">
                    <Coins className="w-4 h-4 mr-2" />
                    Mint NFT Certificate
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-[#38B26C]/10 border border-[#38B26C]/20 rounded-lg p-6 text-center">
                <CheckCircle className="w-12 h-12 text-[#38B26C] mx-auto mb-4" />
                <h3 className="font-semibold text-[#1E293B] mb-2">NFT Certificate Minted Successfully!</h3>
                <p className="text-sm text-[#64748B] mb-4">
                  Your document has been permanently recorded on the Cardano blockchain.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-sm text-[#64748B]">NFT Hash:</span>
                    <code className="text-xs bg-white px-2 py-1 rounded border">{nftHash.substring(0, 20)}...</code>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(nftHash)}>
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button className="flex-1 bg-[#2453CC] hover:bg-[#1e42a4] text-white">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Blockchain
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => (window.location.href = "/dashboard/nft-vault")}
                >
                  View in NFT Vault
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
