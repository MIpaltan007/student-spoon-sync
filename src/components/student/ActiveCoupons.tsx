
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const ActiveCoupons = () => {
  const [selectedCoupon, setSelectedCoupon] = useState<any | null>(null);
  
  // Mock data for active coupons
  const coupons = [
    {
      id: "CP12345",
      date: "2025-05-15",
      meal: "Lunch",
      time: "12:00 PM - 2:00 PM",
      qrData: "CP12345-LUNCH-20250515",
    },
    {
      id: "CP12346",
      date: "2025-05-15",
      meal: "Dinner",
      time: "7:00 PM - 9:00 PM",
      qrData: "CP12346-DINNER-20250515",
    },
    {
      id: "CP12347",
      date: "2025-05-16",
      meal: "Breakfast",
      time: "7:00 AM - 9:00 AM",
      qrData: "CP12347-BREAKFAST-20250516",
    },
    {
      id: "CP12348",
      date: "2025-05-16",
      meal: "Lunch",
      time: "12:00 PM - 2:00 PM",
      qrData: "CP12348-LUNCH-20250516",
    },
    {
      id: "CP12349",
      date: "2025-05-16",
      meal: "Dinner",
      time: "7:00 PM - 9:00 PM",
      qrData: "CP12349-DINNER-20250516",
    },
  ];

  return (
    <div className="space-y-4">
      {coupons.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No active coupons</p>
          <Button variant="outline" className="mt-4">Book Meals</Button>
        </div>
      ) : (
        coupons.map((coupon) => (
          <Dialog key={coupon.id}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{coupon.meal}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(coupon.date).toLocaleDateString()} • {coupon.time}
                      </p>
                    </div>
                    <div className="border border-dashed border-gray-300 rounded-md p-2">
                      <div className="w-10 h-10 bg-gray-200" />
                      <p className="text-xs text-center mt-1">Show QR</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Meal Coupon</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center justify-center py-4">
                <div className="border-4 border-green-500 rounded-lg p-4 mb-4">
                  <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                    {/* This would be replaced with actual QR code */}
                    <p className="text-sm text-center">QR Code for {coupon.id}</p>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold">{coupon.meal}</h3>
                  <p className="text-muted-foreground">
                    {new Date(coupon.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">{coupon.time}</p>
                  <p className="mt-4 text-green-600 font-medium">
                    Show this QR code at the counter
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))
      )}
    </div>
  );
};

export default ActiveCoupons;
