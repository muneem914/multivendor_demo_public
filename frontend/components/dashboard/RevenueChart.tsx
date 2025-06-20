"use client"

import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent } from "@/components/ui/card"

// Sample 30-day data for e-commerce
const chartData = [
  { date: "May 20", sales: 120, users: 80, revenue: 300 },
  { date: "May 21", sales: 150, users: 95, revenue: 350 },
  { date: "May 22", sales: 90, users: 60, revenue: 240 },
  { date: "May 23", sales: 170, users: 100, revenue: 380 },
  { date: "May 24", sales: 130, users: 85, revenue: 320 },
  { date: "May 25", sales: 140, users: 70, revenue: 290 },
  { date: "May 26", sales: 160, users: 90, revenue: 370 },
  { date: "May 27", sales: 110, users: 60, revenue: 260 },
  { date: "May 28", sales: 180, users: 105, revenue: 400 },
  { date: "May 29", sales: 100, users: 75, revenue: 270 },
  { date: "May 30", sales: 145, users: 88, revenue: 330 },
  { date: "May 31", sales: 125, users: 80, revenue: 310 },
  { date: "Jun 01", sales: 90, users: 50, revenue: 200 },
  { date: "Jun 02", sales: 160, users: 95, revenue: 360 },
  { date: "Jun 03", sales: 175, users: 110, revenue: 390 },
  { date: "Jun 04", sales: 130, users: 78, revenue: 320 },
  { date: "Jun 05", sales: 155, users: 90, revenue: 350 },
  { date: "Jun 06", sales: 140, users: 72, revenue: 300 },
  { date: "Jun 07", sales: 95, users: 60, revenue: 220 },
  { date: "Jun 08", sales: 170, users: 98, revenue: 375 },
  { date: "Jun 09", sales: 120, users: 85, revenue: 310 },
  { date: "Jun 10", sales: 135, users: 75, revenue: 290 },
  { date: "Jun 11", sales: 150, users: 92, revenue: 340 },
  { date: "Jun 12", sales: 160, users: 88, revenue: 360 },
  { date: "Jun 13", sales: 125, users: 66, revenue: 280 },
  { date: "Jun 14", sales: 145, users: 100, revenue: 330 },
  { date: "Jun 15", sales: 110, users: 73, revenue: 260 },
  { date: "Jun 16", sales: 170, users: 95, revenue: 380 },
  { date: "Jun 17", sales: 130, users: 70, revenue: 310 },
  { date: "Jun 18", sales: 150, users: 82, revenue: 340 },
]

export function RevenueChart() {
  return (
    <Card>
      <CardContent className="">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              fill="url(#colorSales)"
              dot={{ r: 3 }}
              name="Sales"
            />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#10b981"
              fill="url(#colorUsers)"
              dot={{ r: 3 }}
              name="Users"
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#f59e0b"
              fill="url(#colorRevenue)"
              dot={{ r: 3 }}
              name="Revenue"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
