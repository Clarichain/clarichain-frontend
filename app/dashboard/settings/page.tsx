"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Bell, Shield, Wallet, Key, Trash2, Upload, Save, Info } from "lucide-react"

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    bio: "Software engineer passionate about blockchain technology and document verification.",
    avatar: "",
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    documentSigned: true,
    coSignerInvited: true,
    nftMinted: true,
    weeklyDigest: false,
  })

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    sessionTimeout: "30",
  })

  const handleProfileUpdate = () => {
    // Handle profile update
    console.log("Profile updated:", profile)
  }

  const handleNotificationUpdate = () => {
    // Handle notification settings update
    console.log("Notifications updated:", notifications)
  }

  const handleSecurityUpdate = () => {
    // Handle security settings update
    console.log("Security updated:", security)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1E293B]">Settings</h1>
        <p className="text-[#64748B] mt-1">Manage your account preferences and security settings</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="wallet" className="flex items-center space-x-2">
            <Wallet className="w-4 h-4" />
            <span>Wallet</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-[#1E293B]">Profile Information</CardTitle>
              <CardDescription className="text-[#64748B]">
                Update your personal information and profile settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-[#2453CC] text-white text-xl">
                    {profile.firstName[0]}
                    {profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                    <Upload className="w-4 h-4" />
                    <span>Upload Photo</span>
                  </Button>
                  <p className="text-sm text-[#64748B]">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              <Separator />

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-[#1E293B]">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-[#1E293B]">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
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
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-[#1E293B]">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <Button onClick={handleProfileUpdate} className="bg-[#2453CC] hover:bg-[#1e42a4] text-white">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-[#1E293B]">Notification Preferences</CardTitle>
              <CardDescription className="text-[#64748B]">
                Choose how you want to be notified about activity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-[#1E293B]">Email Notifications</h4>
                    <p className="text-sm text-[#64748B]">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-[#1E293B]">Document Signed</h4>
                    <p className="text-sm text-[#64748B]">When someone signs your document</p>
                  </div>
                  <Switch
                    checked={notifications.documentSigned}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, documentSigned: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-[#1E293B]">Co-signer Invited</h4>
                    <p className="text-sm text-[#64748B]">When you're invited to sign a document</p>
                  </div>
                  <Switch
                    checked={notifications.coSignerInvited}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, coSignerInvited: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-[#1E293B]">NFT Minted</h4>
                    <p className="text-sm text-[#64748B]">When an NFT certificate is created</p>
                  </div>
                  <Switch
                    checked={notifications.nftMinted}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, nftMinted: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-[#1E293B]">Weekly Digest</h4>
                    <p className="text-sm text-[#64748B]">Summary of your weekly activity</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyDigest}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyDigest: checked })}
                  />
                </div>
              </div>

              <Button onClick={handleNotificationUpdate} className="bg-[#2453CC] hover:bg-[#1e42a4] text-white">
                <Save className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-[#1E293B]">Security Settings</CardTitle>
              <CardDescription className="text-[#64748B]">
                Manage your account security and authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-[#1E293B]">Two-Factor Authentication</h4>
                    <p className="text-sm text-[#64748B]">Add an extra layer of security to your account</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {security.twoFactorEnabled && (
                      <Badge className="bg-[#38B26C]/10 text-[#38B26C] border-[#38B26C]/20">Enabled</Badge>
                    )}
                    <Switch
                      checked={security.twoFactorEnabled}
                      onCheckedChange={(checked) => setSecurity({ ...security, twoFactorEnabled: checked })}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout" className="text-[#1E293B]">
                    Session Timeout (minutes)
                  </Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={security.sessionTimeout}
                    onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                    className="w-32"
                  />
                  <p className="text-sm text-[#64748B]">Automatically log out after this period of inactivity</p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-[#1E293B]">Password</h4>
                  <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                    <Key className="w-4 h-4" />
                    <span>Change Password</span>
                  </Button>
                </div>
              </div>

              <Button onClick={handleSecurityUpdate} className="bg-[#2453CC] hover:bg-[#1e42a4] text-white">
                <Save className="w-4 h-4 mr-2" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Wallet Settings */}
        <TabsContent value="wallet" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-[#1E293B]">Your Cardano Wallet</CardTitle>
              <CardDescription className="text-[#64748B]">
                Your automatically generated Cardano wallet for NFT minting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-[#38B26C]/10 border border-[#38B26C]/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Wallet className="w-8 h-8 text-[#38B26C]" />
                      <div>
                        <h4 className="font-medium text-[#1E293B]">ClariChain Wallet</h4>
                        <p className="text-sm text-[#64748B]">addr1qxy2...7z8w9</p>
                        <p className="text-sm text-[#64748B]">Balance: 150.25 ADA</p>
                      </div>
                    </div>
                    <Badge className="bg-[#38B26C]/10 text-[#38B26C] border-[#38B26C]/20">Active</Badge>
                  </div>
                </div>

                <div className="bg-[#F9FAFB] border border-[#E2E8F0] rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-[#2453CC] mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-[#1E293B] mb-1">Auto-Generated Wallet</h4>
                      <p className="text-sm text-[#64748B]">
                        Your Cardano wallet was automatically created when you signed up. This wallet is used for
                        minting NFT certificates and is secured with your account credentials.
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-[#1E293B]">Transaction History</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg">
                      <div>
                        <p className="font-medium text-[#1E293B]">NFT Minting</p>
                        <p className="text-sm text-[#64748B]">Software License Agreement</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-[#1E293B]">-2.5 ADA</p>
                        <p className="text-sm text-[#64748B]">Jan 20, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg">
                      <div>
                        <p className="font-medium text-[#1E293B]">NFT Minting</p>
                        <p className="text-sm text-[#64748B]">Research Collaboration NDA</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-[#1E293B]">-2.5 ADA</p>
                        <p className="text-sm text-[#64748B]">Jan 18, 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Danger Zone */}
      <Card className="border-red-200 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="text-red-600 flex items-center">
            <Trash2 className="w-5 h-5 mr-2" />
            Danger Zone
          </CardTitle>
          <CardDescription className="text-[#64748B]">Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
              <div>
                <h4 className="font-medium text-[#1E293B]">Delete Account</h4>
                <p className="text-sm text-[#64748B]">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
              </div>
              <Button
                variant="destructive"
                onClick={() => {
                  if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                    alert("Account deletion would be implemented here")
                  }
                }}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
