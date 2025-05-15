
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import StudentLayout from "@/components/layouts/StudentLayout";
import MenuList from "@/components/student/MenuList";
import BookingHistory from "@/components/student/BookingHistory";
import ActiveCoupons from "@/components/student/ActiveCoupons";
import { MockMenuData } from "@/lib/mock-data";

const StudentDashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  return (
    <StudentLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Coupons</CardTitle>
            <CardDescription>Your unused meal coupons</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <p className="text-sm text-muted-foreground mt-2">
              2 breakfast, 1 lunch, 2 dinner
            </p>
            <Button className="mt-4 w-full" variant="outline">
              View All Coupons
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Next Meal</CardTitle>
            <CardDescription>Your upcoming booked meal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-medium">Lunch - Today</div>
            <p className="text-sm text-muted-foreground mt-2">
              Vegetable Biryani, Raita, Salad
            </p>
            <div className="mt-2 p-2 bg-green-50 text-green-700 text-sm rounded-md flex items-center justify-center">
              Valid until 2:30 PM
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Monthly Expenditure</CardTitle>
            <CardDescription>May 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹1,250</div>
            <p className="text-sm text-muted-foreground mt-2">
              42 meals consumed this month
            </p>
            <Button className="mt-4 w-full" variant="outline">
              View Statement
            </Button>
          </CardContent>
        </Card>
        
        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="menu">
            <TabsList className="w-full">
              <TabsTrigger value="menu">Weekly Menu</TabsTrigger>
              <TabsTrigger value="book">Book Meals</TabsTrigger>
              <TabsTrigger value="history">Booking History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="menu" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>This Week's Menu</CardTitle>
                  <CardDescription>
                    Check what's cooking this week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MenuList menuData={MockMenuData} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="book" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Book New Meals</CardTitle>
                  <CardDescription>
                    Select dates and meals to book
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-4">1. Select Dates</h3>
                      <div className="border rounded-md p-4">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-4">2. Select Meals</h3>
                      <div className="space-y-4">
                        {["breakfast", "lunch", "dinner"].map((meal) => (
                          <div 
                            key={meal} 
                            className="flex items-center justify-between border rounded-md p-4"
                          >
                            <div>
                              <h4 className="capitalize font-medium">{meal}</h4>
                              <p className="text-sm text-muted-foreground">
                                {meal === "breakfast" ? "7:00 AM - 9:00 AM" : 
                                 meal === "lunch" ? "12:00 PM - 2:00 PM" : 
                                 "7:00 PM - 9:00 PM"}
                              </p>
                            </div>
                            <Button variant="outline">Book</Button>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full mt-6">
                        Book Selected Meals
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Booking History</CardTitle>
                  <CardDescription>
                    Review your past meal bookings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BookingHistory />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Active Coupons */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Active Coupons</CardTitle>
              <CardDescription>
                Use these QR codes at the mess counter
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ActiveCoupons />
            </CardContent>
          </Card>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;
