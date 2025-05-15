
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BookingAnalytics = () => {
  return (
    <div>
      <div className="flex justify-end mb-6">
        <Select defaultValue="may-2025">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="may-2025">May 2025</SelectItem>
            <SelectItem value="apr-2025">April 2025</SelectItem>
            <SelectItem value="mar-2025">March 2025</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="daily">
        <TabsList>
          <TabsTrigger value="daily">Daily View</TabsTrigger>
          <TabsTrigger value="weekly">Weekly View</TabsTrigger>
          <TabsTrigger value="monthly">Monthly View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-1">
                <CardTitle>Today's Attendance</CardTitle>
                <CardDescription>May 15, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">78%</div>
                <p className="text-sm text-gray-500 mt-1">142 of 182 booked meals</p>
                <div className="mt-4 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full rounded-full" style={{ width: '78%' }} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-1">
                <CardTitle>Peak Hours</CardTitle>
                <CardDescription>Busiest serving times</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Breakfast</span>
                      <span className="font-medium">8:30 AM</span>
                    </div>
                    <div className="mt-1 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: '65%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Lunch</span>
                      <span className="font-medium">12:45 PM</span>
                    </div>
                    <div className="mt-1 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full rounded-full" style={{ width: '90%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Dinner</span>
                      <span className="font-medium">7:15 PM</span>
                    </div>
                    <div className="mt-1 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full rounded-full" style={{ width: '70%' }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-1">
                <CardTitle>Meal Popularity</CardTitle>
                <CardDescription>Most chosen items today</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span className="truncate">1. Chicken Biryani</span>
                    <span className="ml-2 text-sm font-medium">42 orders</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="truncate">2. Paneer Butter Masala</span>
                    <span className="ml-2 text-sm font-medium">38 orders</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="truncate">3. Veg Pulao</span>
                    <span className="ml-2 text-sm font-medium">27 orders</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="truncate">4. Masala Dosa</span>
                    <span className="ml-2 text-sm font-medium">24 orders</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="truncate">5. Aloo Paratha</span>
                    <span className="ml-2 text-sm font-medium">21 orders</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Hourly Distribution</CardTitle>
              <CardDescription>Meal consumption by hour</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-1">
                {[7, 8, 9, 12, 13, 14, 19, 20, 21].map((hour) => {
                  const height = Math.floor(Math.random() * 60) + 20;
                  const getColor = () => {
                    if (hour < 10) return "bg-blue-500";
                    if (hour < 15) return "bg-green-500";
                    return "bg-purple-500";
                  };
                  
                  return (
                    <div key={hour} className="flex flex-col items-center flex-1">
                      <div 
                        className={`w-full ${getColor()} rounded-t-md`} 
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-xs mt-2">
                        {hour > 12 ? `${hour-12}PM` : `${hour}AM`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="weekly">
          <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md mt-6">
            <p className="text-gray-500">Weekly analytics chart will appear here</p>
          </div>
        </TabsContent>
        
        <TabsContent value="monthly">
          <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md mt-6">
            <p className="text-gray-500">Monthly analytics chart will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingAnalytics;
