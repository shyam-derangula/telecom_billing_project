'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import CompanyLogo from '@/components/CompanyLogo'
import { Users, DollarSign, TicketCheck, Package, UserPlus, FileText, Bell, Search, ArrowLeft } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { EditUserPlanDialog } from '@/components/EditUserPlanDialog'

// Mock data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', plan: 'Premium', mobile: '1234567890', username: 'johnd', customerId: 'CUST001' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', plan: 'Basic', mobile: '9876543210', username: 'janes', customerId: 'CUST002' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', plan: 'Standard', mobile: '5555555555', username: 'bobj', customerId: 'CUST003' },
]

const analytics = {
  activeUsers: 1000,
  totalRevenue: 50000,
  openTickets: 25,
  activePlans: 3,
}

const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
]

const userDistributionData = [
  { name: 'Premium', value: 400 },
  { name: 'Standard', value: 300 },
  { name: 'Basic', value: 300 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('users')
  const [darkMode, setDarkMode] = useState(false)
  const [searchType, setSearchType] = useState('name')
  const [searchQuery, setSearchQuery] = useState('')
  const [editingUser, setEditingUser] = useState<number | null>(null)

  const handleLogout = () => {
    router.push('/login')
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const userData = Object.fromEntries(formData.entries())
    console.log('New user data:', userData)
    // Implement user addition logic here
  }

  const handleSearch = () => {
    console.log(`Searching for ${searchQuery} by ${searchType}`)
    // Implement search logic here
  }

  const handleGenerateBills = (period: string) => {
    console.log(`Generating bills for ${period}`)
    // Implement bill generation logic here
  }

  const handleEditUserPlan = (userId: number) => {
    setEditingUser(userId)
  }

  const handleUpdateUserPlan = (plan: string, billingCycle: string) => {
    console.log(`Updating user ${editingUser} to plan ${plan} with billing cycle ${billingCycle}`)
    // Here you would typically update the user's plan in your backend
    setEditingUser(null)
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Button variant="ghost" onClick={() => router.back()} className="absolute top-4 left-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <CompanyLogo className="w-10 h-10 mr-3" />
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Admin Dashboard</h1>
          </div>
          <div className="flex items-center">
            <Button onClick={toggleDarkMode} className="mr-4">
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.activeUsers}</div>
              </CardContent>
            </Card>
            <Card className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${analytics.totalRevenue}</div>
              </CardContent>
            </Card>
            <Card className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
                <TicketCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.openTickets}</div>
              </CardContent>
            </Card>
            <Card className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.activePlans}</div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className={darkMode ? 'bg-gray-800' : 'bg-white'}>
              <TabsTrigger value="users">Manage Users</TabsTrigger>
              <TabsTrigger value="plans">Manage Plans</TabsTrigger>
              <TabsTrigger value="billing">Billing Management</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="support">Support Tickets</TabsTrigger>
            </TabsList>
            <TabsContent value="users" className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg mt-4`}>
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-4">
                    <div className="flex space-x-2">
                      <Select value={searchType} onValueChange={setSearchType}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Search by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="name">Name</SelectItem>
                          <SelectItem value="mobile">Mobile Number</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="username">Username</SelectItem>
                          <SelectItem value="customerId">Customer ID</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        className="w-64"
                        placeholder={`Search by ${searchType}`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button onClick={handleSearch}>
                        <Search className="mr-2 h-4 w-4" /> Search
                      </Button>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <UserPlus className="mr-2 h-4 w-4" /> Add User
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Add New User</DialogTitle>
                          <DialogDescription>
                            Enter the details of the new user below.
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddUser} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" placeholder="Full Name" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" name="username" placeholder="Username" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="Email" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="mobile">Mobile Number</Label>
                            <Input id="mobile" name="mobile" placeholder="Mobile Number" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" name="address" placeholder="Full Address" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" name="city" placeholder="City" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input id="state" name="state" placeholder="State" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="pincode">Pincode</Label>
                            <Input id="pincode" name="pincode" placeholder="Pincode" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="pan">PAN Number</Label>
                            <Input id="pan" name="pan" placeholder="PAN Number" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="aadhaar">Aadhaar Number</Label>
                            <Input id="aadhaar" name="aadhaar" placeholder="Aadhaar Number" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="plan">Subscription Plan</Label>
                            <Select name="plan" required>
                              <SelectTrigger>
                                <SelectValue placeholder="Select plan" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="basic">Basic</SelectItem>
                                <SelectItem value="standard">Standard</SelectItem>
                                <SelectItem value="premium">Premium</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="billingCycle">Billing Cycle</Label>
                            <Select name="billingCycle" required>
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
                          <Button type="submit" className="w-full">Create User</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Customer ID</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.mobile}</TableCell>
                          <TableCell>{user.username}</TableCell>
                          <TableCell>{user.customerId}</TableCell>
                          <TableCell>{user.plan}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditUserPlan(user.id)}>Edit Plan</Button>
                            <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                            <Button variant="destructive" size="sm">Delete</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="plans" className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg mt-4`}>
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Plans</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="mb-4">
                    <Package className="mr-2 h-4 w-4" /> Add New Plan
                  </Button>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Plan Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Features</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Basic</TableCell>
                        <TableCell>$9.99/month</TableCell>
                        <TableCell>10GB Data, 100 Minutes</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Standard</TableCell>
                        <TableCell>$19.99/month</TableCell>
                        <TableCell>50GB Data, 500 Minutes</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Premium</TableCell>
                        <TableCell>$29.99/month</TableCell>
                        <TableCell>Unlimited Data, Unlimited Minutes</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="billing" className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg mt-4`}>
              <Card>
                <CardHeader>
                  <CardTitle>Billing Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Generate Bills for All Customers</h3>
                    <div className="flex space-x-2">
                      <Button onClick={() => handleGenerateBills('monthly')}>Generate Monthly Bills</Button>
                      <Button onClick={() => handleGenerateBills('quarterly')}>Generate Quarterly Bills</Button>
                      <Button onClick={() => handleGenerateBills('yearly')}>Generate Yearly Bills</Button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Generate Bill for Individual Customer</h3>
                    <div className="flex space-x-2">
                      <Input placeholder="Enter Customer ID" />
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button>Generate Bill</Button>
                    </div>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Billing Cycle</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>John Doe</TableCell>
                        <TableCell>Premium</TableCell>
                        <TableCell>Monthly</TableCell>
                        <TableCell>$29.99</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Jane Smith</TableCell>
                        <TableCell>Basic</TableCell>
                        <TableCell>Quarterly</TableCell>
                        <TableCell>$29.97</TableCell>
                        <TableCell>Pending</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analytics" className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg mt-4`}>
              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Revenue Trends</h3>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="revenue" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">User Distribution by Plan</h3>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={userDistributionData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {userDistributionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="support" className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg mt-4`}>
              <Card>
                <CardHeader>
                  <CardTitle>Support Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ticket ID</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Issue</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>#1234</TableCell>
                        <TableCell>John Doe</TableCell>
                        <TableCell>Billing Issue</TableCell>
                        <TableCell>Open</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Respond</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>#1235</TableCell>
                        <TableCell>Jane Smith</TableCell>
                        <TableCell>Technical Support</TableCell>
                        <TableCell>In Progress</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Update</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          {editingUser && (
            <EditUserPlanDialog
              isOpen={true}
              onClose={() => setEditingUser(null)}
              onSubmit={handleUpdateUserPlan}
              currentPlan="basic"
              currentBillingCycle="monthly"
            />
          )}
        </div>
      </main>
      <div className="fixed bottom-4 right-4">
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

