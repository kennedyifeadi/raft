"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface Props {
  average: number | null;
  isLoading: boolean;
}

export default function AverageAttendanceDonut({ average, isLoading }: Props) {
  // We'll map the percentage to a simple 2-slice pie chart
  const data = [
    { name: "Attended", value: average || 0, color: "#8b5cf6" }, // Purple
    { name: "Missed", value: 100 - (average || 0), color: "#f3f4f6" }, // Light Gray
  ];

  return (
    <div className="w-full h-full min-h-[350px] bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center justify-center relative">
      <h2 className="text-lg font-bold text-gray-900 absolute top-6 left-6">Average Rate</h2>
      
      {isLoading ? (
        <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></span>
      ) : (
        <div className="w-full h-[200px] mt-8 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
                cornerRadius={4}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value}%`, ""]}
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Centered Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold text-gray-900">{average}%</span>
            <span className="text-xs text-gray-500 mt-1">Overall</span>
          </div>
        </div>
      )}
    </div>
  );
}
