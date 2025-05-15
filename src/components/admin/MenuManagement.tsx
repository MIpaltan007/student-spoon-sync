
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MockMenuData } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";

// Define types for our menu data
interface MenuItem {
  name: string;
  description?: string;
  vegetarian: boolean;
  calories?: number | string;
}

interface MealType {
  breakfast: MenuItem[];
  lunch: MenuItem[];
  dinner: MenuItem[];
}

interface MenuData {
  [key: string]: MealType;
}

const MenuManagement = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedMealType, setSelectedMealType] = useState("breakfast");
  const { toast } = useToast();
  const days = Object.keys(MockMenuData);

  const [menuItems, setMenuItems] = useState<MenuItem>({
    name: "",
    description: "",
    vegetarian: true,
    calories: "",
  });

  // Type assertion to help TypeScript understand the structure
  const typedMenuData = MockMenuData as MenuData;

  const handleAddItem = () => {
    if (!menuItems.name) {
      toast({
        title: "Error",
        description: "Item name is required",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: `${menuItems.name} added to ${selectedDay} ${selectedMealType}`,
    });
    
    // Reset form
    setMenuItems({
      name: "",
      description: "",
      vegetarian: true,
      calories: "",
    });
  };

  const handlePublishMenu = () => {
    toast({
      title: "Menu Published",
      description: "Weekly menu has been published successfully",
    });
  };

  return (
    <div>
      <Tabs defaultValue="edit">
        <TabsList>
          <TabsTrigger value="edit">Edit Menu</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="edit" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-4">1. Select Day and Meal Type</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="day">Day</Label>
                  <Select 
                    value={selectedDay} 
                    onValueChange={setSelectedDay}
                  >
                    <SelectTrigger id="day">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="mealType">Meal Type</Label>
                  <Select 
                    value={selectedMealType} 
                    onValueChange={setSelectedMealType}
                  >
                    <SelectTrigger id="mealType">
                      <SelectValue placeholder="Select meal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="lunch">Lunch</SelectItem>
                      <SelectItem value="dinner">Dinner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <h3 className="font-medium mt-6 mb-4">2. Current Menu Items</h3>
              <div className="border rounded-md p-4 max-h-64 overflow-y-auto">
                <ul className="space-y-3">
                  {typedMenuData[selectedDay][selectedMealType as keyof MealType].map((item, idx) => (
                    <li key={idx} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {item.description && (
                          <p className="text-sm text-gray-500">{item.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {item.vegetarian && (
                          <span className="text-green-600 text-xs uppercase border border-green-600 rounded-full px-2 py-0.5">Veg</span>
                        )}
                        <Button variant="ghost" size="sm" className="text-red-500">
                          Remove
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">3. Add New Menu Item</h3>
              <div className="space-y-4 border rounded-md p-4">
                <div>
                  <Label htmlFor="itemName">Item Name</Label>
                  <Input 
                    id="itemName"
                    value={menuItems.name}
                    onChange={(e) => setMenuItems({...menuItems, name: e.target.value})}
                    placeholder="e.g. Vegetable Biryani"
                  />
                </div>
                <div>
                  <Label htmlFor="itemDescription">Description (Optional)</Label>
                  <Textarea 
                    id="itemDescription"
                    value={menuItems.description}
                    onChange={(e) => setMenuItems({...menuItems, description: e.target.value})}
                    placeholder="Describe the dish ingredients or preparation"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="calories">Calories (Optional)</Label>
                    <Input 
                      id="calories"
                      type="number"
                      value={menuItems.calories}
                      onChange={(e) => setMenuItems({...menuItems, calories: e.target.value})}
                      placeholder="e.g. 450"
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-8">
                    <Checkbox 
                      id="vegetarian"
                      checked={menuItems.vegetarian}
                      onCheckedChange={(checked) => 
                        setMenuItems({...menuItems, vegetarian: checked as boolean})
                      }
                    />
                    <Label htmlFor="vegetarian">Vegetarian</Label>
                  </div>
                </div>
                <Button onClick={handleAddItem} className="w-full mt-2">
                  Add to Menu
                </Button>
              </div>
              
              <div className="mt-6">
                <Button onClick={handlePublishMenu} variant="default" className="w-full">
                  Publish Weekly Menu
                </Button>
                <p className="text-xs text-center text-gray-500 mt-2">
                  This will make the menu visible to all students
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="preview" className="pt-4">
          <div className="border rounded-md p-6">
            <h3 className="font-bold text-xl mb-6 text-center">Weekly Menu Preview</h3>
            
            <div className="space-y-8">
              {days.map((day) => (
                <div key={day} className="border-b pb-6 last:border-0">
                  <h4 className="text-lg font-semibold mb-4">{day}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["breakfast", "lunch", "dinner"].map((meal) => (
                      <div key={meal} className="border rounded-md p-3">
                        <h5 className="font-medium capitalize mb-2">{meal}</h5>
                        <ul className="space-y-2">
                          {typedMenuData[day][meal as keyof MealType].map((item, idx) => (
                            <li key={idx} className="text-sm">
                              <div className="flex items-center">
                                <span>{item.name}</span>
                                {item.vegetarian && (
                                  <span className="ml-2 text-xs text-green-600">●</span>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MenuManagement;
