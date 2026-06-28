"use client";

import { UpcomingClass } from "@/libs/dashboardApi";
import { Calendar, Play } from "lucide-react";

interface Props {
  classes: UpcomingClass[];
  isLoading: boolean;
}

export default function UpcomingSchedule({ classes, isLoading }: Props) {
  return (
    <div className="w-full h-full min-h-[350px] bg-white rounded-2xl border border-gray-100 p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="text-blue-500" size={20} />
        <h2 className="text-lg font-bold text-gray-900">Upcoming Schedule</h2>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-4 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></span>
          </div>
        )}

        {classes.length === 0 && !isLoading ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            No upcoming classes.
          </div>
        ) : (
          classes.map((cls) => (
            <div key={cls.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
              <div>
                <h3 className="font-semibold text-sm text-gray-900">{cls.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{cls.time}</p>
              </div>
              <button className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                <Play size={14} className="ml-0.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
