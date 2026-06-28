"use client";

import { ClassItem } from "@/libs/dashboardApi";
import { Clock } from "lucide-react";

interface Props {
  classes: ClassItem[];
  selectedClassId: string | null;
  onSelectClass: (classId: string) => void;
  isLoading: boolean;
}

export default function ClassSelector({ classes, selectedClassId, onSelectClass, isLoading }: Props) {
  return (
    <div className="w-full h-full min-h-[400px] bg-white rounded-2xl border border-gray-100 p-6 flex flex-col">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900">Your Classes</h2>
        <p className="text-sm text-gray-500">Select a class to view metrics</p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-3 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></span>
          </div>
        )}

        {classes.length === 0 && !isLoading ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            No classes found.
          </div>
        ) : (
          classes.map((cls) => {
            const isSelected = selectedClassId === cls.id;
            return (
              <button
                key={cls.id}
                onClick={() => onSelectClass(cls.id)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 border ${
                  isSelected
                    ? "bg-blue-50 border-blue-200 "
                    : "bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`font-semibold text-sm ${isSelected ? "text-blue-900" : "text-gray-900"}`}>
                    {cls.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock size={14} className={isSelected ? "text-blue-500" : ""} />
                  <span>{cls.schedule}</span>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
