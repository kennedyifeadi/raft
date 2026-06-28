"use client";

import { ActivityItem } from "@/libs/dashboardApi";
import { Activity } from "lucide-react";

interface Props {
  activities: ActivityItem[];
  isLoading: boolean;
}

export default function RecentActivity({ activities, isLoading }: Props) {
  return (
    <div className="w-full h-full min-h-[350px] bg-white rounded-2xl border border-gray-100 p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="text-green-500" size={20} />
        <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 -mr-2 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></span>
          </div>
        )}

        {activities.length === 0 && !isLoading ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            No recent activity.
          </div>
        ) : (
          <div className="space-y-6">
            {activities.map((item, index) => (
              <div key={item.id} className="flex gap-4 relative">
                {/* Timeline Line */}
                {index !== activities.length - 1 && (
                  <div className="absolute left-1.5 top-6 bottom-[-24px] w-0.5 bg-gray-100"></div>
                )}
                
                {/* Timeline Dot */}
                <div className="w-3 h-3 rounded-full bg-green-500 mt-1.5 relative z-10 ring-4 ring-white"></div>
                
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
