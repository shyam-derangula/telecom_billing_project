'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import CompanyLogo from '@/components/CompanyLogo'
import AIAvatar from '@/components/AIAvatar'
import { ArrowLeft } from 'lucide-react'

// Mock user data generation
const generateMockUsers = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    username: `user${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: Math.random() > 0.9 ? 'admin' : 'user'
  }))
}

const newUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address must be at least 5 characters"),
})

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('user')
  const [mockUsers, setMockUsers] = useState<Array<{ id: number; username: string; email: string; role: string }>>([])
  const [pincode, setPincode] = useState('')
  const [pincodeValid, setPincodeValid] = useState<boolean | null>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof newUserSchema>>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      address: "",
    },
  })

  useEffect(() => {
    setMockUsers(generateMockUsers(50))
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically authenticate the user
    console.log('Logging in:', { username, password, userType })
    if (userType === 'user') {
      router.push('/user-dashboard')
    } else {
      router.push('/admin-dashboard')
    }
  }

  const onNewUserSubmit = (data: z.infer<typeof newUserSchema>) => {
    console.log("New user data:", data)
    // Here you would typically send this data to your backend
    alert("Thank you for your interest! Our customer support team will contact you soon.")
  }

  const checkPincode = () => {
    // This is a mock check. In a real application, you'd validate against a database or API
    setPincodeValid(pincode.length === 6)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-800 text-white">
      <div className="container mx-auto p-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="absolute top-4 left-4 flex flex-col items-start">
          <CompanyLogo className="w-16 h-16" />
          <p className="text-white text-sm mt-2">Connecting You Seamlessly</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
          <Card className="bg-gray-900 text-white">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gold">Login</CardTitle>
              <CardDescription className="text-gray-400">Enter your credentials to access your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <Tabs value={userType} onValueChange={setUserType}>
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="user">User</TabsTrigger>
                    <TabsTrigger value="admin">Admin</TabsTrigger>
                  </TabsList>
                  <TabsContent value="user">
                    <div className="space-y-4">
                      <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="bg-gray-800 text-white"
                      />
                      <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-gray-800 text-white"
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="admin">
                    <div className="space-y-4">
                      <Input
                        type="text"
                        placeholder="Admin Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="bg-gray-800 text-white"
                      />
                      <Input
                        type="password"
                        placeholder="Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-gray-800 text-white"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
                <Button
                  className="w-full mt-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-700 transition duration-300 ease-in-out"
                  type="submit"
                >
                  Login
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-400">Forgot your password? Contact support.</p>
            </CardFooter>
          </Card>
          <div className="space-y-8">
            <Card className="bg-gray-900 text-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gold">New User? Sign Up</CardTitle>
                <CardDescription className="text-gray-400">Enter your details and we'll contact you soon.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onNewUserSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} className="bg-gray-800 text-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile</FormLabel>
                          <FormControl>
                            <Input placeholder="1234567890" {...field} className="bg-gray-800 text-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} className="bg-gray-800 text-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St, City, Country" {...field} className="bg-gray-800 text-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-gold text-black hover:bg-yellow-600">Sign Up</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 text-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gold">Check Service Availability</CardTitle>
                <CardDescription className="text-gray-400">Enter your zipcode to check if our services are available in your area.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Enter Zipcode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="bg-gray-800 text-white w-40"
                  />
                  <Button onClick={checkPincode} className="bg-gold text-black hover:bg-yellow-600">Check</Button>
                </div>
                {pincodeValid !== null && (
                  <p className={`mt-2 ${pincodeValid ? 'text-green-500' : 'text-red-500'}`}>
                    {pincodeValid ? 'Service is available in your area!' : 'Sorry, service is not available in your area yet.'}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <AIAvatar />
      <div className="fixed bottom-4 left-4 text-white text-sm">
        <p>Demo Users: {mockUsers.length}</p>
      </div>
    </div>
  )
}

