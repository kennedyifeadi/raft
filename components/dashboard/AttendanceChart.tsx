"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { AttendanceData } from "@/libs/dashboardApi";

interface Props {
  data: AttendanceData[];
  isLoading: boolean;
}

export default function AttendanceChart({ data, isLoading }: Props) {
  return (
    <div className="w-full h-full min-h-[400px] bg-white rounded-2xl border border-gray-100 p-6 flex flex-col">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">Attendance Frequency</h2>
        <p className="text-sm text-gray-500">Number of classes attended per student</p>
      </div>

      <div className="flex-1 w-full min-h-0 relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></span>
          </div>
        ) : data.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            No attendance data available for this class.
          </div>
        ) : null}

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="studentName"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "#f3f4f6" }}
              contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
            />
            <Bar dataKey="attendanceFrequency" radius={[6, 6, 0, 0]} maxBarSize={40}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#3b82f6" className="hover:opacity-80 transition-opacity duration-300" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
