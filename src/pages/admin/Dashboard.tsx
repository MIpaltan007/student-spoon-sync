
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/components/layouts/AdminLayout";
import MenuManagement from "@/components/admin/MenuManagement";
import QRScanner from "@/components/admin/QRScanner";
import BookingAnalytics from "@/components/admin/BookingAnalytics";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Stats Cards */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Today's Bookings</CardTitle>
            <CardDescription>May 15, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">182</div>
            <div className="text-sm text-muted-foreground mt-2">
              <span className="text-green-600">↑ 12%</span> from yesterday
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="bg-blue-50 rounded-md p-2">
                <div className="font-medium">64</div>
                <div className="text-xs text-muted-foreground">Breakfast</div>
              </div>
              <div className="bg-green-50 rounded-md p-2">
                <div className="font-medium">72</div>
                <div className="text-xs text-muted-foreground">Lunch</div>
              </div>
              <div className="bg-purple-50 rounded-md p-2">
                <div className="font-medium">46</div>
                <div className="text-xs text-muted-foreground">Dinner</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Revenue</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹58,420</div>
            <div className="text-sm text-muted-foreground mt-2">
              <span className="text-green-600">↑ 8.2%</span> from last month
            </div>
            <div className="w-full h-8 bg-gray-100 rounded-full mt-4 overflow-hidden">
              <div 
                className="h-full bg-green-600 rounded-full" 
                style={{ width: "65%" }}
              >
              </div>
            </div>
            <div className="text-xs text-right mt-1">65% to target</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Students</CardTitle>
            <CardDescription>Students who booked this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">438</div>
            <div className="text-sm text-muted-foreground mt-2">
              <span className="text-red-600">↓ 3%</span> from last week
            </div>
            <div className="mt-4 text-sm">
              <div className="flex items-center justify-between mb-1">
                <span>Daily Average</span>
                <span className="font-medium">415 students</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Peak Day</span>
                <span className="font-medium">Tuesday (452)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="menu">
        <TabsList className="w-full">
          <TabsTrigger value="menu">Menu Management</TabsTrigger>
          <TabsTrigger value="scanner">QR Scanner</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="menu" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Menu Management</CardTitle>
              <CardDescription>
                Create and update meal menus for the upcoming week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MenuManagement />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="scanner" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Coupon Verification</CardTitle>
              <CardDescription>
                Scan meal coupons to validate student meals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QRScanner />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Booking Analytics</CardTitle>
              <CardDescription>
                View booking patterns and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BookingAnalytics />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminDashboard;
