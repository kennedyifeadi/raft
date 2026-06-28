"use client";

import { AtRiskStudent } from "@/libs/dashboardApi";
import { AlertTriangle, Mail } from "lucide-react";

interface Props {
  students: AtRiskStudent[];
  isLoading: boolean;
}

export default function AtRiskStudents({ students, isLoading }: Props) {
  return (
    <div className="w-full h-full min-h-[400px] bg-white rounded-2xl border border-gray-100 p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="text-orange-500" size={20} />
        <h2 className="text-lg font-bold text-gray-900">At-Risk Students</h2>
      </div>
      <p className="text-sm text-gray-500 mb-6">Students with low attendance rates requiring attention.</p>

      <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-4 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></span>
          </div>
        )}

        {students.length === 0 && !isLoading ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            No at-risk students right now.
          </div>
        ) : (
          students.map((student) => (
            <div key={student.id} className="bg-orange-50/50 border border-orange-100 rounded-xl p-4 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{student.name}</h3>
                  <p className="text-xs text-gray-500">{student.className}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 bg-white rounded-md border border-orange-200 text-xs font-bold text-orange-600">
                    {student.attendanceRate}%
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-600">Missed: <strong className="text-gray-900">{student.missedClasses} classes</strong></span>
                <button className="flex items-center gap-1.5 text-xs font-medium text-orange-600 hover:text-orange-700 bg-white border border-orange-200 hover:bg-orange-50 px-3 py-1.5 rounded-lg transition-colors">
                  <Mail size={14} />
                  Contact
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
