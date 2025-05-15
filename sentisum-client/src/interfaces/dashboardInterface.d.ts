export interface LayoutItem {
  w: number; // Width of the grid item
  h: number; // Height of the grid item
  x: number; // X-coordinate of the grid item
  y: number; // Y-coordinate of the grid item
  i: string; // Unique identifier for the grid item
  moved: boolean; // Whether the item has been moved
  static: boolean; // Whether the item is static (non-draggable/non-resizable)
}

/*
    TableCard Interfaes, Graph Interfaces
*/
export interface GraphTrendData {
  date: string; // Date in ISO format
  value: number; // Value for the trend
}

export interface TableDataItem {
  name: string; // Name of the item
  currentValue: number; // Current value of the item
  change: number; // Change percentage
  currentTrend: GraphTrendData[]; // Array of current trend data
  previousTrend: GraphTrendData[]; // Array of previous trend data
}

export interface DateRange {
  start: string; // Start date in ISO format
  end: string; // End date in ISO format
}

export interface GraphData {
  currentTrend: GraphTrendData[]; // Array of current trend data
  previousTrend: GraphTrendData[]; // Array of previous trend data
}

export interface Metrics {
  [key: string]: number | string | null; // Metrics data structure (key-value pairs)
}

export interface TicketData {
  id: string; // Ticket ID
  title: string; // Ticket title
  description: string; // Ticket description
  [key: string]: any; // Additional ticket properties
}

// Define the interface for a single card
interface DashboardCard {
  id: string;
  type: 'H' | 'MT'; // Card type: 'H' for TableCard, 'MT' for MonthlyTarget
  layout: LayoutItem;
  title: string;
  subtitle?: string;
  columns?: string[];
  data?: TableDataItem[];
  style?: {
    backgroundColor: string;
    textColor: string;
    icon: string;
  };
}

// Define the interface for the dashboard data
interface DashboardData {
  dashboard: {
    cards: DashboardCard[];
    dateRange: DateRange;
  };
}
