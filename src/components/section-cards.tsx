import {
  IconClock,
  IconPaw,
  IconShoppingCart,
  IconTrendingDown,
  IconTrendingUp,
  IconUsersGroup,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDown, ArrowUp, Minus, Plus } from "lucide-react";
import { Span } from "next/dist/trace";

export function SectionCards() {
  const data = [
    {
      title: "Total Animals",
      amount: 2874,
      percentage: 12,
      text: "from last month",
      icon: <IconPaw size={30} className="text-purple-600" />,
    },
    {
      title: "Total Orders",
      amount: 1234,
      percentage: 8,
      text: "from last month",
      icon: <IconShoppingCart size={30} className="text-purple-600" />,
    },
    {
      title: "Pending Orders",
      amount: 89,
      percentage: -5,
      text: "from yesterday",
      icon: <IconClock size={30} className="text-purple-600" />,
    },
    {
      title: "Users Count",
      amount: 15672,
      percentage: 25,
      text: "from last month",
      icon: <IconUsersGroup size={30} className="text-purple-600" />,
    },
  ];
  return (
    <div className="*:data-[slot=card]:from-white *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {data.map((item, index) => (
        <Card key={index} className="@container/card border-2">
          <CardHeader>
            <CardDescription>{item.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {item.amount}
            </CardTitle>
            <CardAction>
              <div className="w-10 h-10 bg-purple-200 flex items-center justify-center rounded-md p-2">
                {item.icon}
              </div>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div
              className={` line-clamp-1 flex gap-2 font-medium flex items-center ${item.percentage < 0 ? "text-my-red" : "text-my-green"}`}
            >
              {item.percentage > 0 ? (
                <span className="text-my-green">
                  <ArrowUp size={16} />
                </span>
              ) : (
                <span className="text-my-red">
                  <ArrowDown size={16} />
                </span>
              )}
              {item.percentage > 0 ? (
                <span className="flex items-center text-my-green">
                  {<Plus size={10} />}
                  {String(item.percentage).concat("%")}
                </span>
              ) : (
                <span>{String(item.percentage).concat("%")}</span>
              )}
              {item.text}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
