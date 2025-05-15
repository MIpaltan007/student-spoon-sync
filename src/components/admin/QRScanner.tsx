
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const QRScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [manualCode, setManualCode] = useState("");
  const [lastScanned, setLastScanned] = useState<string | null>(null);
  const [scannedCoupons, setScannedCoupons] = useState<Array<{
    id: string;
    timestamp: string;
    status: "valid" | "invalid" | "used";
    studentName?: string;
    studentId?: string;
    meal?: string;
  }>>([]);
  
  const { toast } = useToast();

  const handleStartScan = () => {
    setIsScanning(true);
    
    // Simulating a successful scan after 2 seconds
    setTimeout(() => {
      const couponId = "CP" + Math.floor(10000 + Math.random() * 90000);
      handleSuccessfulScan(couponId);
      setIsScanning(false);
    }, 2000);
  };

  const handleManualEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode) {
      handleSuccessfulScan(manualCode);
      setManualCode("");
    }
  };

  const handleSuccessfulScan = (couponId: string) => {
    // Check if coupon was already scanned
    const alreadyScanned = scannedCoupons.some(coupon => coupon.id === couponId);
    
    let status: "valid" | "invalid" | "used" = "valid";
    let message = "Coupon verified successfully!";
    
    if (alreadyScanned) {
      status = "used";
      message = "This coupon has already been used!";
    } 
    // Random chance of invalid coupon for demo
    else if (Math.random() < 0.2) {
      status = "invalid";
      message = "Invalid or expired coupon!";
    }
    
    const newCoupon = {
      id: couponId,
      timestamp: new Date().toISOString(),
      status,
      studentName: status === "valid" ? "John Doe" : undefined,
      studentId: status === "valid" ? "S" + Math.floor(10000 + Math.random() * 90000) : undefined,
      meal: status === "valid" ? ["Breakfast", "Lunch", "Dinner"][Math.floor(Math.random() * 3)] : undefined,
    };
    
    setScannedCoupons([newCoupon, ...scannedCoupons]);
    setLastScanned(couponId);
    
    toast({
      title: status === "valid" ? "Success" : "Error",
      description: message,
      variant: status === "valid" ? "default" : "destructive",
    });
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="font-medium mb-4">Scan QR Code</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-md h-64 flex items-center justify-center">
            {isScanning ? (
              <div className="text-center">
                <div className="animate-pulse">
                  <div className="w-16 h-16 mx-auto mb-4 border-4 border-t-blue-600 rounded-full animate-spin"></div>
                  <p>Scanning...</p>
                </div>
              </div>
            ) : (
              <div className="text-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto mb-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a2 2 0 100-4H5v4zm14-4h2a2 2 0 110 4h-2V4zM5 16h2a2 2 0 110 4H5v-4zm14 0h2a2 2 0 100 4h-2v-4z"
                  />
                </svg>
                <p className="text-gray-500">
                  Camera access required for QR scanning
                </p>
              </div>
            )}
          </div>
          <div className="flex gap-4 mt-4">
            <Button 
              onClick={handleStartScan} 
              disabled={isScanning}
              className="flex-1"
            >
              {isScanning ? "Scanning..." : "Start Scanning"}
            </Button>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-4">Manual Code Entry</h3>
            <form onSubmit={handleManualEntry} className="flex gap-2">
              <div className="flex-1">
                <Input
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="Enter coupon code"
                />
              </div>
              <Button type="submit">Verify</Button>
            </form>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-4">Recently Scanned</h3>
          <div className="border rounded-md overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              {scannedCoupons.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No coupons scanned yet
                </div>
              ) : (
                <div className="divide-y">
                  {scannedCoupons.map((coupon) => (
                    <div
                      key={coupon.id + coupon.timestamp}
                      className={`p-4 ${
                        coupon.status === "valid"
                          ? "bg-green-50"
                          : coupon.status === "invalid"
                          ? "bg-red-50"
                          : "bg-yellow-50"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{coupon.id}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(coupon.timestamp).toLocaleTimeString()}
                          </p>
                          {coupon.studentName && (
                            <p className="mt-1">
                              {coupon.studentName} ({coupon.studentId})
                            </p>
                          )}
                          {coupon.meal && (
                            <p className="text-sm">{coupon.meal}</p>
                          )}
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            coupon.status === "valid"
                              ? "bg-green-100 text-green-800"
                              : coupon.status === "invalid"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {coupon.status === "valid"
                            ? "Valid"
                            : coupon.status === "invalid"
                            ? "Invalid"
                            : "Already Used"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
