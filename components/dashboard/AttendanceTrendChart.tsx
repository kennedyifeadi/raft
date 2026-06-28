"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendData } from "@/libs/dashboardApi";

interface Props {
  data: TrendData[];
  isLoading: boolean;
}

export default function AttendanceTrendChart({ data, isLoading }: Props) {
  return (
    <div className="w-full h-[350px] bg-white rounded-2xl border border-gray-100 p-6 flex flex-col">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">Overall Attendance Trend</h2>
        <p className="text-sm text-gray-500">Average attendance rate across all classes (last 4 weeks)</p>
      </div>

      <div className="flex-1 w-full min-h-0 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></span>
          </div>
        )}

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              domain={[0, 100]}
              tickFormatter={(val) => `${val}%`}
            />
            <Tooltip
              cursor={{ stroke: "#f3f4f6", strokeWidth: 2 }}
              contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
              formatter={(value: any) => [`${value}%`, "Attendance"]}
            />
            <Line
              type="monotone"
              dataKey="attendanceRate"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: "#fff", stroke: "#3b82f6" }}
              activeDot={{ r: 6, strokeWidth: 0, fill: "#2563eb" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
