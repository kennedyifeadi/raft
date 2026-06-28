"use client";

import { useEffect, useState } from "react";
import {
  fetchDashboardStats,
  fetchUserClasses,
  fetchAttendanceData,
  fetchAttendanceTrends,
  fetchAtRiskStudents,
  fetchUpcomingClasses,
  fetchRecentActivity,
  fetchAverageAttendance,
  DashboardStats,
  ClassItem,
  AttendanceData,
  TrendData,
  AtRiskStudent,
  UpcomingClass,
  ActivityItem,
} from "@/libs/dashboardApi";
import AttendanceChart from "@/components/dashboard/AttendanceChart";
import ClassSelector from "@/components/dashboard/ClassSelector";
import AttendanceTrendChart from "@/components/dashboard/AttendanceTrendChart";
import AtRiskStudents from "@/components/dashboard/AtRiskStudents";
import UpcomingSchedule from "@/components/dashboard/UpcomingSchedule";
import RecentActivity from "@/components/dashboard/RecentActivity";
import AverageAttendanceDonut from "@/components/dashboard/AverageAttendanceDonut";

import { BookOpen, Users, CheckCircle, Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  // Existing State
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

  // New State
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [atRisk, setAtRisk] = useState<AtRiskStudent[]>([]);
  const [upcoming, setUpcoming] = useState<UpcomingClass[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [average, setAverage] = useState<number | null>(null);

  // Loaders
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingClasses, setIsLoadingClasses] = useState(true);
  const [isLoadingAttendance, setIsLoadingAttendance] = useState(false);
  const [isLoadingSecondary, setIsLoadingSecondary] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const loadInitialData = async () => {
      fetchDashboardStats().then((data) => {
        setStats(data);
        setIsLoadingStats(false);
      });

      fetchUserClasses().then((data) => {
        setClasses(data);
        setIsLoadingClasses(false);
        if (data.length > 0) setSelectedClassId(data[0].id);
      });

      Promise.all([
        fetchAttendanceTrends(),
        fetchAtRiskStudents(),
        fetchUpcomingClasses(),
        fetchRecentActivity(),
        fetchAverageAttendance(),
      ]).then(([tData, arData, uData, aData, avgData]) => {
        setTrends(tData);
        setAtRisk(arData);
        setUpcoming(uData);
        setActivity(aData);
        setAverage(avgData);
        setIsLoadingSecondary(false);
      });
    };

    loadInitialData();
  }, []);

  // Fetch specific class attendance
  useEffect(() => {
    if (!selectedClassId) return;
    const loadAttendance = async () => {
      setIsLoadingAttendance(true);
      const data = await fetchAttendanceData(selectedClassId);
      setAttendanceData(data);
      setIsLoadingAttendance(false);
    };
    loadAttendance();
  }, [selectedClassId]);

  return (
    <div className="flex flex-col w-full h-full space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Monitor your classes and attendance metrics.
          </p>
        </div>
        <Link
          href="/manage/addclass"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors w-fit"
        >
          <Plus size={20} />
          Add Class
        </Link>
      </div>

      {/* Top Stats Row */}
      <div className="flex gap-4">
        <div className="w-full lg:w-[70%] flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <BookOpen size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Classes
                </p>
                {isLoadingStats ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
                ) : (
                  <h3 className="text-3xl font-bold text-gray-900">
                    {stats?.totalClasses || 0}
                  </h3>
                )}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Students
                </p>
                {isLoadingStats ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
                ) : (
                  <h3 className="text-3xl font-bold text-gray-900">
                    {stats?.totalStudents || 0}
                  </h3>
                )}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <CheckCircle size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Last Class Attendance
                </p>
                {isLoadingStats ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
                ) : (
                  <h3 className="text-3xl font-bold text-gray-900">
                    {stats?.lastClassAttendance || 0}
                  </h3>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
            <div className="flex-1">
              <AverageAttendanceDonut
                average={average}
                isLoading={isLoadingSecondary}
              />
            </div>
            <div className="flex-1">
              <RecentActivity
                activities={activity}
                isLoading={isLoadingSecondary}
              />
            </div>
            </div>
            <div className="w-full">
              <UpcomingSchedule
                classes={upcoming}
                isLoading={isLoadingSecondary}
              />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[30%] h-[800px] overflow-y-auto">
          <AtRiskStudents students={atRisk} isLoading={isLoadingSecondary} />
        </div>
      </div>

      {/* Main Complex Layout */}
      <div className="flex flex-col lg:flex-row gap-4 pb-6">
        {/* Left Column (Main Data) */}
        <div className="flex-1 flex flex-col gap-4 w-full">
          {/* Row A: Bar Chart + Class Selector */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-[65%]">
              <AttendanceChart
                data={attendanceData}
                isLoading={isLoadingAttendance}
              />
            </div>
            <div className="w-full md:w-[35%]">
              <ClassSelector
                classes={classes}
                selectedClassId={selectedClassId}
                onSelectClass={setSelectedClassId}
                isLoading={isLoadingClasses}
              />
            </div>
          </div>

          {/* Row B: Overall Attendance Trend (Full width of left column) */}
          <div className="w-full">
            <AttendanceTrendChart
              data={trends}
              isLoading={isLoadingSecondary}
            />
          </div>

          {/* Row C: Activity, Donut, Upcoming */}
        </div>
      </div>
    </div>
  );
}
