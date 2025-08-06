import BudgetVsActual from "./SubComponents/BudgetVsActualReport";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="flex">
        <main className="flex-1 p-6 lg:pl-0">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8 tracking-tight">
              Admin Dashboard
            </h1>
            <div className="space-y-8">
              <BudgetVsActual />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;