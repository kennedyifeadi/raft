import axiosInstance from "./axios";

// Interfaces
export interface DashboardStats {
  totalClasses: number;
  totalStudents: number;
  lastClassAttendance: number;
}

export interface ClassItem {
  id: string;
  name: string;
  schedule: string;
}

export interface AttendanceData {
  studentName: string;
  attendanceFrequency: number;
}

// Mock Data
const MOCK_STATS: DashboardStats = {
  totalClasses: 4,
  totalStudents: 128,
  lastClassAttendance: 115,
};

const MOCK_CLASSES: ClassItem[] = [
  { id: "c1", name: "CS101: Intro to Programming", schedule: "Mon/Wed 10:00 AM" },
  { id: "c2", name: "CS202: Data Structures", schedule: "Tue/Thu 2:00 PM" },
  { id: "c3", name: "CS305: Web Development", schedule: "Mon/Wed 1:00 PM" },
  { id: "c4", name: "CS410: Machine Learning", schedule: "Fri 9:00 AM" },
];

const MOCK_ATTENDANCE: Record<string, AttendanceData[]> = {
  "c1": [
    { studentName: "Alice J.", attendanceFrequency: 14 },
    { studentName: "Bob M.", attendanceFrequency: 12 },
    { studentName: "Charlie D.", attendanceFrequency: 15 },
    { studentName: "David K.", attendanceFrequency: 8 },
    { studentName: "Eva L.", attendanceFrequency: 14 },
    { studentName: "Frank P.", attendanceFrequency: 10 },
  ],
  "c2": [
    { studentName: "Grace W.", attendanceFrequency: 20 },
    { studentName: "Henry T.", attendanceFrequency: 18 },
    { studentName: "Ivy N.", attendanceFrequency: 22 },
    { studentName: "Jack R.", attendanceFrequency: 15 },
    { studentName: "Karen S.", attendanceFrequency: 21 },
  ],
  "c3": [
    { studentName: "Leo B.", attendanceFrequency: 8 },
    { studentName: "Mia F.", attendanceFrequency: 7 },
    { studentName: "Noah H.", attendanceFrequency: 9 },
    { studentName: "Olivia C.", attendanceFrequency: 5 },
    { studentName: "Paul G.", attendanceFrequency: 8 },
    { studentName: "Quinn Y.", attendanceFrequency: 9 },
  ],
  "c4": [
    { studentName: "Rachel A.", attendanceFrequency: 30 },
    { studentName: "Sam V.", attendanceFrequency: 28 },
    { studentName: "Tom E.", attendanceFrequency: 32 },
    { studentName: "Uma Z.", attendanceFrequency: 25 },
  ],
};

// API Services with Fallbacks
export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const res = await axiosInstance.get("/analytics/stats");
    return res.data;
  } catch (error) {
    console.warn("Backend /analytics/stats failed. Using mock data.");
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    return MOCK_STATS;
  }
};

export const fetchUserClasses = async (): Promise<ClassItem[]> => {
  try {
    const res = await axiosInstance.get("/analytics/classes");
    return res.data;
  } catch (error) {
    console.warn("Backend /analytics/classes failed. Using mock data.");
    await new Promise((resolve) => setTimeout(resolve, 600));
    return MOCK_CLASSES;
  }
};

export const fetchAttendanceData = async (classId: string): Promise<AttendanceData[]> => {
  try {
    const res = await axiosInstance.get(`/analytics/attendance?classId=${classId}`);
    return res.data;
  } catch (error) {
    console.warn(`Backend /analytics/attendance?classId=${classId} failed. Using mock data.`);
    await new Promise((resolve) => setTimeout(resolve, 800));
    return MOCK_ATTENDANCE[classId] || [];
  }
};

// --- NEW EXPANSION INTERFACES & MOCKS ---

export interface TrendData {
  week: string;
  attendanceRate: number;
}

export interface AtRiskStudent {
  id: string;
  name: string;
  className: string;
  missedClasses: number;
  attendanceRate: number;
}

export interface UpcomingClass {
  id: string;
  name: string;
  time: string;
}

export interface ActivityItem {
  id: string;
  action: string;
  timestamp: string;
}

const MOCK_TRENDS: TrendData[] = [
  { week: "Week 1", attendanceRate: 95 },
  { week: "Week 2", attendanceRate: 92 },
  { week: "Week 3", attendanceRate: 88 },
  { week: "Week 4", attendanceRate: 85 },
];

const MOCK_AT_RISK: AtRiskStudent[] = [
  { id: "s1", name: "David K.", className: "Intro to Programming", missedClasses: 3, attendanceRate: 60 },
  { id: "s2", name: "Olivia C.", className: "Web Development", missedClasses: 4, attendanceRate: 50 },
  { id: "s3", name: "Mia F.", className: "Web Development", missedClasses: 2, attendanceRate: 65 },
  { id: "s4", name: "Frank P.", className: "Intro to Programming", missedClasses: 3, attendanceRate: 58 },
  { id: "s5", name: "Noah H.", className: "Web Development", missedClasses: 2, attendanceRate: 70 },
  { id: "s6", name: "Paul G.", className: "Web Development", missedClasses: 3, attendanceRate: 55 },
  { id: "s7", name: "Sam V.", className: "Machine Learning", missedClasses: 4, attendanceRate: 48 },
];

const MOCK_UPCOMING: UpcomingClass[] = [
  { id: "u1", name: "CS202: Data Structures", time: "Today, 2:00 PM" },
  { id: "u2", name: "CS305: Web Development", time: "Tomorrow, 1:00 PM" },
  { id: "u3", name: "CS410: Machine Learning", time: "Friday, 9:00 AM" },
];

const MOCK_ACTIVITY: ActivityItem[] = [
  { id: "a1", action: "Attendance logged for CS101 (45/50 present)", timestamp: "2 hours ago" },
  { id: "a2", action: "3 new students joined Web Development", timestamp: "Yesterday" },
  { id: "a3", action: "CS202 Class completed", timestamp: "2 days ago" },
];

export const fetchAttendanceTrends = async (): Promise<TrendData[]> => {
  try {
    const res = await axiosInstance.get("/analytics/trends");
    return res.data;
  } catch (error) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_TRENDS;
  }
};

export const fetchAtRiskStudents = async (): Promise<AtRiskStudent[]> => {
  try {
    const res = await axiosInstance.get("/analytics/at-risk");
    return res.data;
  } catch (error) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return MOCK_AT_RISK;
  }
};

export const fetchUpcomingClasses = async (): Promise<UpcomingClass[]> => {
  try {
    const res = await axiosInstance.get("/analytics/upcoming");
    return res.data;
  } catch (error) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return MOCK_UPCOMING;
  }
};

export const fetchRecentActivity = async (): Promise<ActivityItem[]> => {
  try {
    const res = await axiosInstance.get("/analytics/activity");
    return res.data;
  } catch (error) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_ACTIVITY;
  }
};

export const fetchAverageAttendance = async (): Promise<number> => {
  try {
    const res = await axiosInstance.get("/analytics/average");
    return res.data.percentage;
  } catch (error) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return 88; // Default mock average 88%
  }
};
