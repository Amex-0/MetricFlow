"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpDown,
  CalendarDays,
  DollarSign,
  FilterX,
  MapPin,
  PackageCheck,
  Search,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from "recharts";
import AnalyticsCard from "@/components/dashboard/analyticsCard";
import DashboardCard from "@/components/dashboard/dashboardCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { monthlyRevenue, orders, regionBreakdown, statusBreakdown } from "../../data/analytics";
import type { OrderRecord, OrderStatus, SalesRegion } from "../../types/analytics";

const regionOptions: Array<"All" | SalesRegion> = ["All", "North America", "Europe", "APAC", "LATAM"];
const statusOptions: Array<"All" | OrderStatus> = ["All", "Completed", "Shipped", "Pending", "Cancelled"];
const dateOptions = [
  { value: "all", label: "All time" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
] as const;

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

const statusColors: Record<OrderStatus, string> = {
  Completed: "var(--chart-1)",
  Shipped: "var(--chart-2)",
  Pending: "var(--chart-3)",
  Cancelled: "var(--chart-5)",
};

function Home() {
  const [regionFilter, setRegionFilter] = useState<(typeof regionOptions)[number]>("All");
  const [statusFilter, setStatusFilter] = useState<(typeof statusOptions)[number]>("All");
  const [dateFilter, setDateFilter] = useState<(typeof dateOptions)[number]["value"]>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<keyof Pick<OrderRecord, "date" | "amount" | "customer">>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id ?? "");

  const pageSize = 6;

  useEffect(() => {
    setPage(1);
  }, [dateFilter, regionFilter, statusFilter, searchTerm]);

  const filteredOrders = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const maxDays = dateFilter === "all" ? Number.POSITIVE_INFINITY : Number(dateFilter);

    return orders.filter((order) => {
      const matchesRegion = regionFilter === "All" || order.region === regionFilter;
      const matchesStatus = statusFilter === "All" || order.status === statusFilter;
      const matchesDate =
        dateFilter === "all" ||
        Math.abs(new Date().getTime() - new Date(order.date).getTime()) <= maxDays * 24 * 60 * 60 * 1000;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        order.id.toLowerCase().includes(normalizedSearch) ||
        order.customer.toLowerCase().includes(normalizedSearch);

      return matchesRegion && matchesStatus && matchesDate && matchesSearch;
    });
  }, [dateFilter, regionFilter, searchTerm, statusFilter]);

  const sortedOrders = useMemo(() => {
    return [...filteredOrders].sort((left, right) => {
      const direction = sortDirection === "asc" ? 1 : -1;

      if (sortKey === "date") {
        return (new Date(left.date).getTime() - new Date(right.date).getTime()) * direction;
      }

      if (sortKey === "amount") {
        return (left.amount - right.amount) * direction;
      }

      return left.customer.localeCompare(right.customer) * direction;
    });
  }, [filteredOrders, sortDirection, sortKey]);

  const totalPages = Math.max(1, Math.ceil(sortedOrders.length / pageSize));
  const paginatedOrders = sortedOrders.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    if (paginatedOrders.length === 0) {
      setSelectedOrderId("");
      return;
    }

    if (!paginatedOrders.some((order) => order.id === selectedOrderId)) {
      setSelectedOrderId(paginatedOrders[0].id);
    }
  }, [paginatedOrders, selectedOrderId]);

  const selectedOrder = sortedOrders.find((order) => order.id === selectedOrderId) ?? paginatedOrders[0] ?? null;

  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.amount, 0);
  const totalOrders = filteredOrders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const completedOrderRate = totalOrders > 0
    ? (filteredOrders.filter((order) => order.status === "Completed").length / totalOrders) * 100
    : 0;

  const previousMonthRevenue = monthlyRevenue.at(-2)?.revenue ?? monthlyRevenue.at(-1)?.revenue ?? 0;
  const currentMonthRevenue = monthlyRevenue.at(-1)?.revenue ?? 0;
  const previousMonthOrders = monthlyRevenue.at(-2)?.orders ?? monthlyRevenue.at(-1)?.orders ?? 0;
  const currentMonthOrders = monthlyRevenue.at(-1)?.orders ?? 0;
  const previousAvgOrderValue = previousMonthRevenue > 0 && previousMonthOrders > 0 ? previousMonthRevenue / previousMonthOrders : 0;
  const currentCompletedOrders = orders.filter((order) => order.status === "Completed").length;
  const previousCompletedOrders = Math.max(1, Math.round(orders.length * 0.62));

  const revenueDelta = previousMonthRevenue > 0 ? ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100 : 0;
  const orderDelta = previousMonthOrders > 0 ? ((currentMonthOrders - previousMonthOrders) / previousMonthOrders) * 100 : 0;
  const avgOrderDelta = previousAvgOrderValue > 0 ? ((currentMonthRevenue / currentMonthOrders - previousAvgOrderValue) / previousAvgOrderValue) * 100 : 0;
  const completedRateDelta = previousCompletedOrders > 0 ? ((currentCompletedOrders / orders.length) * 100 - (previousCompletedOrders / orders.length) * 100) : 0;

  const clearAllFilters = () => {
    setRegionFilter("All");
    setStatusFilter("All");
    setDateFilter("all");
    setSearchTerm("");
  };

  const activeFilters = [
    regionFilter !== "All" ? `Region: ${regionFilter}` : null,
    statusFilter !== "All" ? `Status: ${statusFilter}` : null,
    dateFilter !== "all" ? `Date: ${dateOptions.find((option) => option.value === dateFilter)?.label}` : null,
    searchTerm ? `Search: ${searchTerm}` : null,
  ].filter(Boolean) as string[];

  const handleSort = (column: keyof Pick<OrderRecord, "date" | "amount" | "customer">) => {
    if (sortKey === column) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(column);
    setSortDirection(column === "amount" ? "desc" : "asc");
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col gap-4 rounded-2xl border bg-card p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Sales overview</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">MetricFlow dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search orders or customers"
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              Filters
            </div>
            <Select value={dateFilter} onValueChange={(value) => setDateFilter((value as (typeof dateOptions)[number]["value"]) ?? "all")}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {dateOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={regionFilter} onValueChange={(value) => setRegionFilter((value as (typeof regionOptions)[number]) ?? "All")}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {regionOptions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={(value) => setStatusFilter((value as (typeof statusOptions)[number]) ?? "All")}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {activeFilters.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-muted-foreground">
              <FilterX className="mr-2 h-4 w-4" />
              Clear all
            </Button>
          )}
        </div>

        {activeFilters.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <span key={filter} className="rounded-full border bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                {filter}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Total revenue"
          value={currencyFormatter.format(totalRevenue)}
          delta={revenueDelta}
          trend={revenueDelta >= 0 ? "up" : "down"}
          caption="vs last month"
          icon={DollarSign}
        />
        <DashboardCard
          title="Total orders"
          value={totalOrders.toString()}
          delta={orderDelta}
          trend={orderDelta >= 0 ? "up" : "down"}
          caption="vs last month"
          icon={ShoppingBag}
        />
        <DashboardCard
          title="Average order value"
          value={currencyFormatter.format(averageOrderValue)}
          delta={avgOrderDelta}
          trend={avgOrderDelta >= 0 ? "up" : "down"}
          caption="vs prior period"
          icon={TrendingUp}
        />
        <DashboardCard
          title="Completed-order rate"
          value={`${completedOrderRate.toFixed(1)}%`}
          delta={completedRateDelta}
          trend={completedRateDelta >= 0 ? "up" : "down"}
          caption="of all orders"
          icon={PackageCheck}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <AnalyticsCard />

        <Card>
          <CardHeader>
            <CardTitle>Regional revenue</CardTitle>
            <CardDescription>Order contribution by market</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[260px] w-full">
              <BarChart data={regionBreakdown} margin={{ left: 10, right: 10, top: 10, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="region" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent formatter={(value) => currencyFormatter.format(Number(value))} />} />
                <Bar dataKey="revenue" radius={[8, 8, 0, 0]} fill="var(--chart-1)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <div>
              <CardTitle>Orders</CardTitle>
              <CardDescription>
                {sortedOrders.length} matching orders • {page} / {totalPages}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1}>
                Prev
              </Button>
              <Button variant="outline" size="sm" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages}>
                Next
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {paginatedOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort("customer")}>
                          Customer
                          <ArrowUpDown className="h-3.5 w-3.5" />
                        </button>
                      </TableHead>
                      <TableHead>
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort("date")}>
                          Date
                          <ArrowUpDown className="h-3.5 w-3.5" />
                        </button>
                      </TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort("amount")}>
                          Amount
                          <ArrowUpDown className="h-3.5 w-3.5" />
                        </button>
                      </TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedOrders.map((order) => (
                      <TableRow key={order.id} className={selectedOrder?.id === order.id ? "bg-muted/50" : undefined}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{new Date(order.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                            {order.region}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className="rounded-full px-2 py-1 text-xs font-medium"
                            style={{
                              backgroundColor: `${statusColors[order.status]}1A`,
                              color: statusColors[order.status],
                            }}
                          >
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell>{currencyFormatter.format(order.amount)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedOrderId(order.id)}>
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex min-h-48 items-center justify-center px-6 py-10 text-center text-sm text-muted-foreground">
                No orders match the selected filters.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order status</CardTitle>
            <CardDescription>Current pipeline mix</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ChartContainer config={{}} className="h-[200px] w-full">
              <PieChart>
                <Pie data={statusBreakdown} dataKey="value" nameKey="status" innerRadius={50} outerRadius={75} paddingAngle={2}>
                  {statusBreakdown.map((entry) => (
                    <Cell key={entry.status} fill={statusColors[entry.status as OrderStatus]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>

            <div className="space-y-2">
              {statusBreakdown.map((entry) => (
                <div key={entry.status} className="flex items-center justify-between gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: statusColors[entry.status as OrderStatus] }} />
                    {entry.status}
                  </div>
                  <span className="font-medium">{entry.value}</span>
                </div>
              ))}
            </div>

            {selectedOrder && (
              <div className="rounded-xl border bg-muted/30 p-3">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Selected order</p>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{selectedOrder.id}</p>
                    <p className="text-sm text-muted-foreground">{selectedOrder.customer}</p>
                  </div>
                  <span className="text-sm font-medium">{currencyFormatter.format(selectedOrder.amount)}</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                  <span>{selectedOrder.region}</span>
                  <span>{selectedOrder.status}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Home;
