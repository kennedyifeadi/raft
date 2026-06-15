import Sidebar from "@/components/shared/Sidebar";
import TopNav from "@/components/shared/TopNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Outer contrasting white/light-blue backdrop
    <div className="h-screen w-full bg-white/90 flex items-center justify-center overflow-hidden">
      {/* Floating Dashboard Container */}
      <div className="w-full h-full flex overflow-hidden items-center justify-center p-4 gap-4">
        
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative gap-4">
          <TopNav />
          
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
