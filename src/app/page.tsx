import {
  History,
  Home,
  MapPin,
  Settings,
  Bell,
  Search,
  ChevronRight,
  PlusCircle,
} from "lucide-react";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { RefillWiseLogo } from "@/components/logo";

// Mock Data
const upcomingRefills = [
  {
    id: 1,
    name: "Filtered Water",
    location: "Kitchen Station",
    dueDate: "In 2 days",
    status: "Scheduled",
    image: PlaceHolderImages.find((img) => img.id === "water-bottle"),
  },
  {
    id: 2,
    name: "Hand Soap",
    location: "Main Bathroom",
    dueDate: "In 5 days",
    status: "Scheduled",
    image: PlaceHolderImages.find((img) => img.id === "soap-dispenser"),
  },
  {
    id: 3,
    name: "Espresso Beans",
    location: "Coffee Bar",
    dueDate: "Next Week",
    status: "Low Stock",
    image: PlaceHolderImages.find((img) => img.id === "coffee-beans"),
  },
];

const refillHistory = [
  {
    id: "REF-01H8X",
    product: "Filtered Water",
    date: "June 28, 2024",
    status: "Completed",
    amount: "5 Gallons",
  },
  {
    id: "REF-01H8W",
    product: "Laundry Detergent",
    date: "June 25, 2024",
    status: "Completed",
    amount: "1 Box",
  },
  {
    id: "REF-01H8V",
    product: "Espresso Beans",
    date: "June 15, 2024",
    status: "Completed",
    amount: "2 lbs",
  },
  {
    id: "REF-01H8T",
    product: "Hand Soap",
    date: "June 12, 2024",
    status: "Completed",
    amount: "16 oz",
  },
];


export default function DashboardPage() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <RefillWiseLogo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" isActive>
                <Home />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-droplets"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.49-2.21-1.25-3.02C8.98 8.45 8 7.31 8 6.05 8 4.83 9 3 11 3s3 1.83 3 3.05c0 1.26-.98 2.4-1.75 3.18C11.49 10.08 11 11.13 11 12.25c0 2.23 1.8 4.05 4 4.05"/><path d="M12.56 16.3h-.01c-2.2 0-4-1.83-4-4.05 0-1.16.49-2.21 1.25-3.02C10.58 8.45 11.5 7.31 11.5 6.05c0-1.23-1-3.05-3-3.05s-3 1.83-3 3.05c0 1.26.98 2.4 1.75 3.18.76.81 1.25 1.86 1.25 3.02 0 2.23-1.8 4.05-4 4.05h-.01"/></svg>
                My Refills
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#">
                <MapPin />
                Locations
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#">
                <History />
                History
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#">
                <Settings />
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3 p-2 rounded-md hover:bg-sidebar-accent/50 transition-colors">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="https://picsum.photos/seed/user/100/100"
                alt="User Avatar"
                data-ai-hint="person face"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="truncate font-semibold text-sm">Jane Doe</p>
              <p className="truncate text-xs text-sidebar-foreground/70">
                jane.doe@example.com
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-sidebar-foreground/70 hover:text-sidebar-foreground"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <main className="flex-1 space-y-8 p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h1 className="text-3xl font-bold tracking-tight font-headline">
                Welcome back, Jane!
              </h1>
              <p className="text-muted-foreground">
                Here&apos;s your refill summary for today.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search refills..." className="pl-9" />
              </div>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Avatar>
                <AvatarImage
                  src="https://picsum.photos/seed/user/100/100"
                  alt="User Avatar"
                  data-ai-hint="person face"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Quick Actions & Upcoming Refills */}
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Quick Refill</CardTitle>
                <CardDescription>
                  Start a new refill process instantly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Request a Refill
                </Button>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Upcoming Refills</CardTitle>
                <CardDescription>
                  These items are scheduled for a refill soon.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {upcomingRefills.map((refill) => (
                  <Card
                    key={refill.id}
                    className="overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    {refill.image && (
                      <Image
                        src={refill.image.imageUrl}
                        alt={refill.image.description}
                        width={400}
                        height={300}
                        className="w-full h-32 object-cover"
                        data-ai-hint={refill.image.imageHint}
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold">{refill.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {refill.location}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <Badge
                          variant={
                            refill.status === "Low Stock"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {refill.status}
                        </Badge>
                        <p className="text-xs font-medium">{refill.dueDate}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Refill History */}
          <Card>
            <CardHeader>
              <CardTitle>Refill History</CardTitle>
              <CardDescription>A log of your past refills.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {refillHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.product}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.amount}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline">{item.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
