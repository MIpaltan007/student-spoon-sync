
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const BookingHistory = () => {
  // Mock data for booking history
  const bookings = [
    {
      id: "BK12345",
      date: "2025-05-15",
      meal: "Lunch",
      status: "Consumed",
      price: "₹70",
    },
    {
      id: "BK12344",
      date: "2025-05-14",
      meal: "Dinner",
      status: "Consumed",
      price: "₹90",
    },
    {
      id: "BK12343",
      date: "2025-05-14",
      meal: "Breakfast",
      status: "Consumed",
      price: "₹50",
    },
    {
      id: "BK12342",
      date: "2025-05-13",
      meal: "Lunch",
      status: "Consumed",
      price: "₹70",
    },
    {
      id: "BK12341",
      date: "2025-05-13",
      meal: "Breakfast",
      status: "Consumed",
      price: "₹50",
    },
    {
      id: "BK12340",
      date: "2025-05-12",
      meal: "Dinner",
      status: "Missed",
      price: "₹90",
    },
  ];

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Meal</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">{booking.id}</TableCell>
              <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
              <TableCell>{booking.meal}</TableCell>
              <TableCell>
                <Badge 
                  variant={booking.status === "Consumed" ? "outline" : "destructive"}
                  className={booking.status === "Consumed" ? "text-green-600 border-green-600" : ""}
                >
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">{booking.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingHistory;
