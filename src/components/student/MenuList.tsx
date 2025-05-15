
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

interface MenuItem {
  name: string;
  description?: string;
  vegetarian: boolean;
  calories?: number;
}

interface DayMenu {
  breakfast: MenuItem[];
  lunch: MenuItem[];
  dinner: MenuItem[];
}

interface MenuListProps {
  menuData: Record<string, DayMenu>;
}

const MenuList = ({ menuData }: MenuListProps) => {
  const days = Object.keys(menuData);

  return (
    <Accordion type="single" collapsible className="w-full">
      {days.map((day) => (
        <AccordionItem key={day} value={day}>
          <AccordionTrigger className="text-lg">
            {day}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              {["breakfast", "lunch", "dinner"].map((mealType) => (
                <div key={mealType} className="border-l-4 border-green-500 pl-4">
                  <h4 className="text-lg font-medium capitalize mb-2">{mealType}</h4>
                  <ul className="space-y-2">
                    {menuData[day][mealType as keyof DayMenu].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span>{item.name}</span>
                            {item.vegetarian && (
                              <Badge variant="outline" className="ml-2 text-green-600 border-green-600">
                                Veg
                              </Badge>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-sm text-gray-500">{item.description}</p>
                          )}
                        </div>
                        {item.calories && (
                          <span className="text-sm text-gray-500">{item.calories} cal</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default MenuList;
