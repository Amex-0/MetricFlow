"use client"

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import monthlyRevenue from "../../../data/analytics";

const availableFilters = [
  { value: "revenue", label: "Revenue" },
  { value: "orders", label: "Orders" },
] as const;

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  orders: {
    label: "Orders",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

function AnalyticsCard() {
  const [selection, setSelection] = useState<(typeof availableFilters)[number]["value"]>("revenue");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <div>
          <CardTitle>Monthly revenue trend</CardTitle>
          <CardDescription>Revenue and order volume over the last 12 months</CardDescription>
        </div>
        <Select
          value={selection}
          onValueChange={(value) => setSelection((value as (typeof availableFilters)[number]["value"]) ?? "revenue")}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {availableFilters.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={monthlyRevenue} margin={{ left: 12, right: 12, top: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.7} />
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip
              cursor={{ stroke: "var(--chart-1)", strokeOpacity: 0.2 }}
              content={<ChartTooltipContent formatter={(value) => typeof value === "number" ? value.toLocaleString() : value} />}
            />
            <Area
              type="monotone"
              dataKey={selection}
              stroke="var(--chart-1)"
              fill="url(#fillRevenue)"
              strokeWidth={3}
              fillOpacity={1}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default AnalyticsCard;