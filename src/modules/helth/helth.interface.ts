export interface IHealthStatus {
  status: string;
  database: string;
  lastCronExecution: Date | null;
  uptime: number;
  memoryUsage: NodeJS.MemoryUsage;
}
