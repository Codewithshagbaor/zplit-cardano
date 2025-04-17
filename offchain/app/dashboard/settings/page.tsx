"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Check,
  Clock,
  Copy,
  CreditCard,
  Edit,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Save,
  Shield,
  User,
  Wallet,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function SettingsPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleConnectWallet = () => {
    setIsConnecting(true)
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false)
      setIsConnected(true)
      setWalletAddress("0x71C7656EC7ab88b098defB751B7401B5f6d8976F")
    }, 1500)
  }

  const handleDisconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress("")
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSaveChanges = () => {
    setIsSaving(true)
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
    }, 1000)
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleSaveChanges} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        ) : (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Details
          </Button>
        )}
      </div>

      <Tabs defaultValue="restaurant">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="wallet">Web3 Wallet</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="restaurant" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Restaurant Information</CardTitle>
              <CardDescription>Manage your restaurant details that will be visible to customers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                <div className="md:w-1/3">
                  <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border border-dashed p-6">
                    <div className="relative h-40 w-40 overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src="/placeholder.svg?height=160&width=160"
                        alt="Restaurant logo"
                        width={160}
                        height={160}
                        className="object-cover"
                      />
                      {isEditing && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <Button variant="secondary" size="sm">
                            Change Logo
                          </Button>
                        </div>
                      )}
                    </div>
                    {isEditing && <p className="text-xs text-gray-500">Recommended: 400x400px, PNG or JPG</p>}
                  </div>
                </div>
                <div className="space-y-4 md:w-2/3">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="restaurant-name">Restaurant Name</Label>
                      <Input id="restaurant-name" defaultValue="Acme Restaurant" disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="restaurant-type">Restaurant Type</Label>
                      <Select disabled={!isEditing} defaultValue="casual-dining">
                        <SelectTrigger id="restaurant-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fine-dining">Fine Dining</SelectItem>
                          <SelectItem value="casual-dining">Casual Dining</SelectItem>
                          <SelectItem value="fast-casual">Fast Casual</SelectItem>
                          <SelectItem value="cafe">Café</SelectItem>
                          <SelectItem value="bar">Bar & Grill</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your restaurant..."
                      className="min-h-[100px]"
                      defaultValue="Acme Restaurant offers a delightful dining experience with a mix of traditional and modern cuisine. Our chefs use only the freshest ingredients to create memorable dishes."
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="cuisine">Cuisine</Label>
                      <Select disabled={!isEditing} defaultValue="american">
                        <SelectTrigger id="cuisine">
                          <SelectValue placeholder="Select cuisine" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="american">American</SelectItem>
                          <SelectItem value="italian">Italian</SelectItem>
                          <SelectItem value="mexican">Mexican</SelectItem>
                          <SelectItem value="asian">Asian</SelectItem>
                          <SelectItem value="mediterranean">Mediterranean</SelectItem>
                          <SelectItem value="fusion">Fusion</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price-range">Price Range</Label>
                      <Select disabled={!isEditing} defaultValue="moderate">
                        <SelectTrigger id="price-range">
                          <SelectValue placeholder="Select price range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="budget">$ (Budget)</SelectItem>
                          <SelectItem value="moderate">$$ (Moderate)</SelectItem>
                          <SelectItem value="expensive">$$$ (Expensive)</SelectItem>
                          <SelectItem value="very-expensive">$$$$ (Very Expensive)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact & Location</CardTitle>
              <CardDescription>Manage your restaurant's contact information and location details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <Input id="email" type="email" defaultValue="contact@acmerestaurant.com" disabled={!isEditing} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" disabled={!isEditing} />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <Input id="website" type="url" defaultValue="https://acmerestaurant.com" disabled={!isEditing} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <Input id="address" defaultValue="123 Main Street, Anytown, CA 12345" disabled={!isEditing} />
                </div>
              </div>
              <div className="rounded-lg border">
                <div className="h-[200px] w-full bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Map will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>Set your restaurant's operating hours.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <div key={day} className="flex items-center justify-between border-b pb-2">
                    <div className="font-medium">{day}</div>
                    <div className="flex items-center space-x-2">
                      {day === "Sunday" ? (
                        <div className="text-sm text-gray-500">Closed</div>
                      ) : (
                        <>
                          <Select disabled={!isEditing} defaultValue="9-00">
                            <SelectTrigger className="w-[110px]">
                              <SelectValue placeholder="Open" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="8-00">8:00 AM</SelectItem>
                              <SelectItem value="9-00">9:00 AM</SelectItem>
                              <SelectItem value="10-00">10:00 AM</SelectItem>
                              <SelectItem value="11-00">11:00 AM</SelectItem>
                            </SelectContent>
                          </Select>
                          <span>to</span>
                          <Select disabled={!isEditing} defaultValue="22-00">
                            <SelectTrigger className="w-[110px]">
                              <SelectValue placeholder="Close" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="20-00">8:00 PM</SelectItem>
                              <SelectItem value="21-00">9:00 PM</SelectItem>
                              <SelectItem value="22-00">10:00 PM</SelectItem>
                              <SelectItem value="23-00">11:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </>
                      )}
                      {isEditing && <Switch checked={day !== "Sunday"} onCheckedChange={() => {}} />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Manage your account details and security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                <div className="md:w-1/3">
                  <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border border-dashed p-6">
                    <div className="relative h-32 w-32 overflow-hidden rounded-full bg-gray-100">
                      <Image
                        src="/placeholder-user.jpg"
                        alt="Profile picture"
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                      {isEditing && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                          <Button variant="secondary" size="sm">
                            Change
                          </Button>
                        </div>
                      )}
                    </div>
                    {isEditing && <p className="text-xs text-gray-500">Recommended: Square JPG or PNG</p>}
                  </div>
                </div>
                <div className="space-y-4 md:w-2/3">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" defaultValue="John" disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" defaultValue="Doe" disabled={!isEditing} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account-email">Email Address</Label>
                    <Input id="account-email" type="email" defaultValue="john.doe@example.com" disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account-phone">Phone Number</Label>
                    <Input id="account-phone" type="tel" defaultValue="+1 (555) 987-6543" disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue="Restaurant Owner" disabled />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  disabled={!isEditing}
                  placeholder={isEditing ? "Enter current password" : "••••••••"}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    disabled={!isEditing}
                    placeholder={isEditing ? "Enter new password" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    disabled={!isEditing}
                    placeholder={isEditing ? "Confirm new password" : ""}
                  />
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-orange-500" />
                    <div>
                      <div className="font-medium">Two-Factor Authentication</div>
                      <div className="text-sm text-gray-500">Add an extra layer of security to your account</div>
                    </div>
                  </div>
                  <Switch disabled={!isEditing} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>Manage your payment methods and billing information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      <CreditCard className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium">Visa ending in 4242</div>
                      <div className="text-sm text-gray-500">Expires 12/2025</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isEditing && (
                      <>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                          Remove
                        </Button>
                      </>
                    )}
                    <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      Default
                    </div>
                  </div>
                </div>
              </div>
              {isEditing && (
                <Button variant="outline" className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add Payment Method
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallet" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Web3 Wallet</CardTitle>
              <CardDescription>
                Connect your cryptocurrency wallet to receive payments and manage your Web3 transactions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                    <Wallet className="h-8 w-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Web3 Integration</h3>
                    <p className="text-sm text-gray-500 max-w-md mx-auto mt-1">
                      Connect your Ethereum wallet to receive crypto payments directly from customers and access Web3
                      features.
                    </p>
                  </div>
                  {!isConnected ? (
                    <Button
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={handleConnectWallet}
                      disabled={isConnecting}
                    >
                      {isConnecting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Wallet className="mr-2 h-4 w-4" />
                          Connect Wallet
                        </>
                      )}
                    </Button>
                  ) : (
                    <div className="space-y-4 w-full">
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center space-x-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                            <Check className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium">Wallet Connected</div>
                            <div className="flex items-center text-sm text-gray-500">
                              {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
                              <Button variant="ghost" size="icon" className="h-6 w-6 ml-1" onClick={handleCopyAddress}>
                                {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                              </Button>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleDisconnectWallet}>
                          Disconnect
                        </Button>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center space-x-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                              <CreditCard className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="font-medium">Crypto Balance</div>
                          </div>
                          <div className="mt-3 text-2xl font-bold">0.42 ETH</div>
                          <div className="text-sm text-gray-500">≈ $1,247.82 USD</div>
                        </div>
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center space-x-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                              <Clock className="h-4 w-4 text-purple-600" />
                            </div>
                            <div className="font-medium">Recent Transactions</div>
                          </div>
                          <div className="mt-3 text-2xl font-bold">12</div>
                          <div className="text-sm text-gray-500">Last 30 days</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Web3 Settings</h3>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Accept Crypto Payments</div>
                      <div className="text-sm text-gray-500">Allow customers to pay with cryptocurrency</div>
                    </div>
                    <Switch defaultChecked={isConnected} disabled={!isConnected} />
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Automatic Conversion</div>
                      <div className="text-sm text-gray-500">Automatically convert crypto to fiat currency</div>
                    </div>
                    <Switch defaultChecked={isConnected} disabled={!isConnected} />
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Transaction Notifications</div>
                      <div className="text-sm text-gray-500">Receive notifications for crypto transactions</div>
                    </div>
                    <Switch defaultChecked={isConnected} disabled={!isConnected} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Supported Cryptocurrencies</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center space-x-3 rounded-lg border p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                      <span className="font-bold text-orange-600">Ξ</span>
                    </div>
                    <div>
                      <div className="font-medium">Ethereum (ETH)</div>
                      <div className="text-sm text-gray-500">Main network</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 rounded-lg border p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <span className="font-bold text-blue-600">U</span>
                    </div>
                    <div>
                      <div className="font-medium">USDC</div>
                      <div className="text-sm text-gray-500">Stablecoin</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Shield className="h-4 w-4" />
                <span>Your wallet information is securely stored and never shared with third parties.</span>
              </div>
            </CardFooter>
          </Card>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <User className="mr-2 h-4 w-4" />
                Learn More About Web3 Integration
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Web3 Integration with Zplit</DialogTitle>
                <DialogDescription>Learn how Zplit's Web3 integration can benefit your restaurant.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="rounded-lg bg-orange-50 p-4">
                  <h4 className="font-medium text-orange-800">Benefits of Web3 Integration</h4>
                  <ul className="mt-2 space-y-2 text-sm text-orange-700">
                    <li className="flex items-start">
                      <Check className="mr-2 h-4 w-4 mt-0.5" />
                      <span>Accept cryptocurrency payments with lower transaction fees</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-4 w-4 mt-0.5" />
                      <span>Access to blockchain-based loyalty programs and rewards</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-4 w-4 mt-0.5" />
                      <span>Transparent and secure transaction history</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-4 w-4 mt-0.5" />
                      <span>Attract tech-savvy customers and early adopters</span>
                    </li>
                  </ul>
                </div>
                <p className="text-sm text-gray-500">
                  Zplit's Web3 integration allows your restaurant to accept cryptocurrency payments while still
                  maintaining traditional payment methods. You can connect your Ethereum wallet to receive payments
                  directly, with automatic conversion to fiat currency if desired.
                </p>
                <p className="text-sm text-gray-500">
                  Our platform handles all the complexity of blockchain transactions, making it simple for both you and
                  your customers.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline">Read Documentation</Button>
                <Button className="bg-orange-500 hover:bg-orange-600">Get Started</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how and when you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="new-orders" className="flex items-center space-x-2">
                        <span>New Orders</span>
                      </Label>
                    </div>
                    <Switch id="new-orders" defaultChecked disabled={!isEditing} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="order-updates" className="flex items-center space-x-2">
                        <span>Order Status Updates</span>
                      </Label>
                    </div>
                    <Switch id="order-updates" defaultChecked disabled={!isEditing} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="daily-summary" className="flex items-center space-x-2">
                        <span>Daily Summary</span>
                      </Label>
                    </div>
                    <Switch id="daily-summary" defaultChecked disabled={!isEditing} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="marketing" className="flex items-center space-x-2">
                        <span>Marketing & Promotions</span>
                      </Label>
                    </div>
                    <Switch id="marketing" disabled={!isEditing} />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Push Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="push-new-orders" className="flex items-center space-x-2">
                        <span>New Orders</span>
                      </Label>
                    </div>
                    <Switch id="push-new-orders" defaultChecked disabled={!isEditing} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="push-order-updates" className="flex items-center space-x-2">
                        <span>Order Status Updates</span>
                      </Label>
                    </div>
                    <Switch id="push-order-updates" defaultChecked disabled={!isEditing} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="push-daily-summary" className="flex items-center space-x-2">
                        <span>Daily Summary</span>
                      </Label>
                    </div>
                    <Switch id="push-daily-summary" disabled={!isEditing} />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Web3 Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="crypto-payments" className="flex items-center space-x-2">
                        <span>Cryptocurrency Payments</span>
                      </Label>
                    </div>
                    <Switch id="crypto-payments" defaultChecked={isConnected} disabled={!isConnected || !isEditing} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="wallet-activity" className="flex items-center space-x-2">
                        <span>Wallet Activity</span>
                      </Label>
                    </div>
                    <Switch id="wallet-activity" defaultChecked={isConnected} disabled={!isConnected || !isEditing} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
