'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, PhoneCall, Mail, MessageSquare, CreditCard, Wallet, ArrowLeft } from 'lucide-react'
import CompanyLogo from '@/components/CompanyLogo'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Mock user data
const userData = {
  name: 'John Doe',
  parentName: 'Jane Doe',
  fatherName: 'Bob Doe',
  mobile: '+1234567890',
  email: 'john@example.com',
  address: '456 Elm St, Town, Country',
  accountNumber: 'ACC123456',
  accountStatus: 'Active',
  dateOfConnection: '2023-01-01',
  paymentDetails: 'Credit Card ending in 1234',
  subscriptionPlan: 'Premium Plan',
  balance: 50.00,
  billingCycle: 'Monthly',
  nextRenewal: '2023-07-01',
  lastBillPaid: {
    amount: 29.99,
    date: '2023-06-01',
  },
  childCustomers: [
    { name: 'Alice Doe', plan: 'Basic Plan', balance: 20.00 },
    { name: 'Charlie Doe', plan: 'Standard Plan', balance: 35.00 },
  ],
}

const invoiceMonths = ['January', 'February', 'March', 'April', 'May', 'June']
const invoiceYears = [2023, 2022, 2021, 2020]

export default function UserDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('subscription')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedYear, setSelectedYear] = useState('')

  const handleLogout = () => {
    router.push('/login')
  }

  const handleDownloadInvoice = () => {
    console.log(`Downloading invoice for ${selectedMonth} ${selectedYear}`)
    // Implement invoice download logic here
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Button variant="ghost" onClick={() => router.back()} className="absolute top-4 left-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <CompanyLogo className="w-10 h-10 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {userData.name}</h1>
          </div>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-blue-100">
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{userData.subscriptionPlan}</p>
                <p>Next Renewal: {userData.nextRenewal}</p>
                <Button className="mt-2" variant="outline">Explore Plans</Button>
              </CardContent>
            </Card>
            <Card className="bg-green-100">
              <CardHeader>
                <CardTitle>Current Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <p>${userData.balance.toFixed(2)}</p>
                <p>Billing Cycle: {userData.billingCycle}</p>
              </CardContent>
            </Card>
            <Card className="bg-yellow-100">
              <CardHeader>
                <CardTitle>Last Bill Paid</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Amount: ${userData.lastBillPaid.amount}</p>
                <p>Date: {userData.lastBillPaid.date}</p>
                <div className="mt-2 space-y-2">
                  <Select onValueChange={setSelectedMonth}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {invoiceMonths.map((month) => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {invoiceYears.map((year) => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button className="w-full" onClick={handleDownloadInvoice} disabled={!selectedMonth || !selectedYear}>
                    <Download className="mr-2 h-4 w-4" /> Download Invoice
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-white">
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
              <TabsTrigger value="myInfo">My Info</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="childAccounts">Child Accounts</TabsTrigger>
            </TabsList>
            <TabsContent value="subscription" className="bg-purple-50 p-4 rounded-lg mt-4">
              <h2 className="text-2xl font-bold mb-4">Subscription Details</h2>
              <p><strong>Plan:</strong> {userData.subscriptionPlan}</p>
              <p><strong>Status:</strong> Active</p>
              <p><strong>Next Billing Date:</strong> {userData.nextRenewal}</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="mt-4">Cancel Plan</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure you want to cancel your plan?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. You will lose access to your services at the end of your current billing cycle.
                    </DialogDescription>
                  </DialogHeader>
                  <Button variant="destructive">Confirm Cancellation</Button>
                </DialogContent>
              </Dialog>
            </TabsContent>
            <TabsContent value="myInfo" className="bg-blue-50 p-4 rounded-lg mt-4">
              <h2 className="text-2xl font-bold mb-4">My Info</h2>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Name</TableCell>
                    <TableCell>{userData.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Parent's Name</TableCell>
                    <TableCell>{userData.parentName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Father's Name</TableCell>
                    <TableCell>{userData.fatherName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mobile Number</TableCell>
                    <TableCell>{userData.mobile}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Email ID</TableCell>
                    <TableCell>{userData.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Address</TableCell>
                    <TableCell>{userData.address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Account Number</TableCell>
                    <TableCell>{userData.accountNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Account Status</TableCell>
                    <TableCell>{userData.accountStatus}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Date of Connection</TableCell>
                    <TableCell>{userData.dateOfConnection}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Payment Details</TableCell>
                    <TableCell>{userData.paymentDetails}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="billing" className="bg-green-50 p-4 rounded-lg mt-4">
              <h2 className="text-2xl font-bold mb-4">Billing Information</h2>
              <p><strong>Current Balance:</strong> ${userData.balance.toFixed(2)}</p>
              <p><strong>Billing Cycle:</strong> {userData.billingCycle}</p>
              <p><strong>Next Renewal:</strong> {userData.nextRenewal}</p>
              <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">Payment Methods</h3>
                <div className="flex space-x-2">
                  <Button variant="outline"><CreditCard className="mr-2 h-4 w-4" /> Credit/Debit Card</Button>
                  <Button variant="outline"><Wallet className="mr-2 h-4 w-4" /> UPI</Button>
                  <Button variant="outline">Net Banking</Button>
                  <Button variant="outline">Wallets</Button>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">Configure Billing Cycle</h3>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select billing cycle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15days">15 Days</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            <TabsContent value="childAccounts" className="bg-yellow-50 p-4 rounded-lg mt-4">
              <h2 className="text-2xl font-bold mb-4">Child Accounts</h2>
              {userData.childCustomers.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userData.childCustomers.map((child, index) => (
                      <TableRow key={index}>
                        <TableCell>{child.name}</TableCell>
                        <TableCell>{child.plan}</TableCell>
                        <TableCell>${child.balance.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p>No child accounts found.</p>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Customer Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline">
                <PhoneCall className="mr-2 h-4 w-4" /> Call Support
              </Button>
              <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" /> Email Support
              </Button>
              <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" /> Live Chat
              </Button>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Company Address</h2>
            <p>Shyam Billing Systems</p>
            <p>123 Business Park, Gold Street</p>
            <p>New York, NY 12345</p>
          </div>
        </div>
      </main>
    </div>
  )
}

