import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Users, Zap, CheckCircle, FileText, Brain, Coins } from "lucide-react"
import Link from "next/link"
import { HeroSection } from "@/components/hero-section"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <HeroSection/>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-4">How ClariChain Works</h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              Three simple steps to secure, verified document agreements
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#2453CC]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-[#2453CC]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1E293B] mb-4">1. AI Analysis</h3>
                <p className="text-[#64748B]">
                  Upload your document and get instant AI-powered explanations in plain English, including an "Explain
                  Like I'm 5" mode.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#38B26C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-[#38B26C]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1E293B] mb-4">2. Co-Signing</h3>
                <p className="text-[#64748B]">
                  Invite multiple parties to review and approve the document. Track signatures and approvals in
                  real-time.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#F59E0B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Coins className="w-8 h-8 text-[#F59E0B]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1E293B] mb-4">3. NFT Minting</h3>
                <p className="text-[#64748B]">
                  Once all parties approve, mint a tamper-proof NFT on Cardano blockchain as permanent verification.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20 px-4 bg-[#F9FAFB]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-4">Why Choose ClariChain?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-[#38B26C] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-[#1E293B] mb-2">AI-Powered Clarity</h3>
                <p className="text-[#64748B]">Transform legal jargon into understandable language</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-[#38B26C] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-[#1E293B] mb-2">Blockchain Security</h3>
                <p className="text-[#64748B]">Immutable verification on Cardano blockchain</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-[#38B26C] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-[#1E293B] mb-2">Multi-Party Signing</h3>
                <p className="text-[#64748B]">Seamless collaboration with multiple signers</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-[#38B26C] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-[#1E293B] mb-2">Complete Privacy</h3>
                <p className="text-[#64748B]">All documents remain confidential and encrypted</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-[#38B26C] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-[#1E293B] mb-2">Real-time Tracking</h3>
                <p className="text-[#64748B]">Monitor document status and approvals live</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-[#38B26C] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-[#1E293B] mb-2">NFT Verification</h3>
                <p className="text-[#64748B]">Permanent, tamper-proof digital certificates</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="testimonials" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-4">Trusted Across Industries</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-[#2453CC]/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-[#2453CC]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1E293B] mb-4">Legal Contracts</h3>
                <p className="text-[#64748B] mb-4">
                  "ClariChain helped our clients understand complex legal agreements, reducing disputes by 60%."
                </p>
                <div className="text-sm text-[#64748B]">
                  <strong>Sarah Chen</strong> - Legal Partner
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-[#38B26C]/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-[#38B26C]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1E293B] mb-4">Academic Research</h3>
                <p className="text-[#64748B] mb-4">
                  "Perfect for thesis approvals and research collaborations. The blockchain verification gives us
                  confidence."
                </p>
                <div className="text-sm text-[#64748B]">
                  <strong>Dr. Michael Torres</strong> - University Professor
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-[#F59E0B]/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-[#F59E0B]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1E293B] mb-4">Policy Documents</h3>
                <p className="text-[#64748B] mb-4">
                  "Government policies are now accessible to citizens. ClariChain bridges the communication gap."
                </p>
                <div className="text-sm text-[#64748B]">
                  <strong>Alex Rodriguez</strong> - Policy Director
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#1E293B]">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Document Process?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of professionals who trust ClariChain for secure, AI-powered document verification.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-[#2453CC] hover:bg-[#1e42a4] text-white px-8 py-4 text-lg">
              Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/clarichain-logo.png" alt="ClariChain" className="w-8 h-8" />
                <span className="text-xl font-bold text-[#1E293B]">ClariChain</span>
              </div>
              <p className="text-[#64748B]">Secure, AI-powered document verification with blockchain technology.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#1E293B] mb-4">Product</h3>
              <ul className="space-y-2 text-[#64748B]">
                <li>
                  <a href="#" className="hover:text-[#2453CC]">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#2453CC]">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#2453CC]">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#1E293B] mb-4">Company</h3>
              <ul className="space-y-2 text-[#64748B]">
                <li>
                  <a href="#" className="hover:text-[#2453CC]">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#2453CC]">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#2453CC]">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#1E293B] mb-4">Legal</h3>
              <ul className="space-y-2 text-[#64748B]">
                <li>
                  <a href="#" className="hover:text-[#2453CC]">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#2453CC]">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#2453CC]">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-[#64748B]">
            <p>&copy; 2024 ClariChain. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
