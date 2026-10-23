import type { AnalyticsItems, OrderRecord, SalesRegion, OrderStatus } from "../types/analytics";

const monthlyRevenue: AnalyticsItems[] = [
  { month: "Jan", revenue: 42000, orders: 154 },
  { month: "Feb", revenue: 46500, orders: 168 },
  { month: "Mar", revenue: 49200, orders: 176 },
  { month: "Apr", revenue: 51400, orders: 183 },
  { month: "May", revenue: 54800, orders: 198 },
  { month: "Jun", revenue: 59150, orders: 212 },
  { month: "Jul", revenue: 63500, orders: 228 },
  { month: "Aug", revenue: 67800, orders: 241 },
  { month: "Sep", revenue: 70400, orders: 254 },
  { month: "Oct", revenue: 73250, orders: 268 },
  { month: "Nov", revenue: 77450, orders: 281 },
  { month: "Dec", revenue: 82120, orders: 297 },
];

const orderStatuses: OrderStatus[] = ["Completed", "Shipped", "Pending", "Cancelled"];
const regions: SalesRegion[] = ["North America", "Europe", "APAC", "LATAM"];

export const orders: OrderRecord[] = [
  { id: "MF-1001", customer: "Northwind Labs", region: "North America", status: "Completed", date: "2026-01-12", amount: 1840 },
  { id: "MF-1002", customer: "BluePeak Retail", region: "Europe", status: "Shipped", date: "2026-01-18", amount: 2450 },
  { id: "MF-1003", customer: "Harbor Foods", region: "APAC", status: "Completed", date: "2026-02-04", amount: 2685 },
  { id: "MF-1004", customer: "Cinder Group", region: "LATAM", status: "Pending", date: "2026-02-12", amount: 1540 },
  { id: "MF-1005", customer: "Oakline Co.", region: "North America", status: "Completed", date: "2026-03-02", amount: 3290 },
  { id: "MF-1006", customer: "Helio Works", region: "Europe", status: "Completed", date: "2026-03-16", amount: 4050 },
  { id: "MF-1007", customer: "Summit Labs", region: "APAC", status: "Cancelled", date: "2026-04-03", amount: 1190 },
  { id: "MF-1008", customer: "Meridian Studio", region: "North America", status: "Shipped", date: "2026-04-27", amount: 2220 },
  { id: "MF-1009", customer: "Prime Retail", region: "LATAM", status: "Completed", date: "2026-05-08", amount: 2860 },
  { id: "MF-1010", customer: "Signal Works", region: "Europe", status: "Pending", date: "2026-05-28", amount: 1940 },
  { id: "MF-1011", customer: "Luma Health", region: "North America", status: "Completed", date: "2026-06-11", amount: 4360 },
  { id: "MF-1012", customer: "Aster Supply", region: "APAC", status: "Completed", date: "2026-06-21", amount: 3785 },
  { id: "MF-1013", customer: "Novus Finance", region: "Europe", status: "Shipped", date: "2026-07-09", amount: 3120 },
  { id: "MF-1014", customer: "Velora Goods", region: "LATAM", status: "Completed", date: "2026-07-19", amount: 2815 },
  { id: "MF-1015", customer: "Beacon Holdings", region: "North America", status: "Completed", date: "2026-08-04", amount: 3985 },
  { id: "MF-1016", customer: "Northwind Labs", region: "APAC", status: "Shipped", date: "2026-08-15", amount: 4240 },
  { id: "MF-1017", customer: "Brightline Ops", region: "Europe", status: "Completed", date: "2026-09-02", amount: 3475 },
  { id: "MF-1018", customer: "Crescent Media", region: "LATAM", status: "Pending", date: "2026-09-20", amount: 2035 },
  { id: "MF-1019", customer: "Summit Labs", region: "North America", status: "Completed", date: "2026-10-07", amount: 4540 },
  { id: "MF-1020", customer: "Harbor Foods", region: "APAC", status: "Completed", date: "2026-10-22", amount: 3920 },
  { id: "MF-1021", customer: "BluePeak Retail", region: "Europe", status: "Completed", date: "2026-11-06", amount: 4350 },
  { id: "MF-1022", customer: "Oakline Co.", region: "North America", status: "Shipped", date: "2026-11-18", amount: 2890 },
  { id: "MF-1023", customer: "Prime Retail", region: "LATAM", status: "Completed", date: "2026-12-03", amount: 4840 },
  { id: "MF-1024", customer: "Helio Works", region: "Europe", status: "Completed", date: "2026-12-21", amount: 5210 },
];

const regionBreakdown = regions.map((region) => ({
  region,
  revenue: orders
    .filter((order) => order.region === region)
    .reduce((sum, order) => sum + order.amount, 0),
  orders: orders.filter((order) => order.region === region).length,
}));

const statusBreakdown = orderStatuses.map((status) => ({
  status,
  value: orders.filter((order) => order.status === status).length,
}));

export { monthlyRevenue, regionBreakdown, statusBreakdown };
export default monthlyRevenue;