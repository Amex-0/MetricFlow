export type SalesRegion = "North America" | "Europe" | "APAC" | "LATAM";
export type OrderStatus = "Completed" | "Shipped" | "Pending" | "Cancelled";

export interface AnalyticsItems {
  month: string;
  revenue: number;
  orders: number;
}

export interface OrderRecord {
  id: string;
  customer: string;
  region: SalesRegion;
  status: OrderStatus;
  date: string;
  amount: number;
}
