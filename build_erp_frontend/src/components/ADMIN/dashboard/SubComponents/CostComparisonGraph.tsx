import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

type reportData = {
   project_name: string;
   budgeted_cost: number;
   actual_expense: number;
};
type prop ={
   data:reportData[]
   heading:string
}

function CostComparisonGraph({data,heading}:prop) {

   return (
      <div className="w-full max-w-7xl mx-auto p-6 bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl shadow-lg border border-slate-700/50">
         <h2 className="text-2xl font-bold text-white mb-6 pb-3 tracking-tight">
            {heading}
         </h2>
        <div className="w-full h-[300px] md:h-[400px] lg:h-[500px]">
            <ResponsiveContainer>
               <BarChart 
                  data={data} 
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
               >
                  <CartesianGrid 
                     stroke="#334155" 
                     strokeDasharray="3 3" 
                     strokeOpacity={0.3}
                  />
                  <XAxis 
                     dataKey="project_name" 
                     stroke="#94a3b8"
                     fontSize={12}
                     tickLine={false}
                     axisLine={{ stroke: "#475569" }}
                     tick={{ fill: "#94a3b8" }}
                     interval="preserveStartEnd"
                     tickFormatter={(value) => value.substring(0, 15) + (value.length > 15 ? "..." : "")}
                  />
                  <YAxis
                     stroke="#94a3b8"
                     fontSize={12}
                     tickLine={false}
                     axisLine={{ stroke: "#475569" }}
                     tick={{ fill: "#94a3b8" }}
                     tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                     contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #475569",
                        borderRadius: "8px",
                        color: "#f1f5f9",
                        padding: "10px",
                     }}
                     formatter={(value: number) => [`₹${value.toLocaleString()}`, undefined]}
                     labelStyle={{ color: "#f1f5f9", fontWeight: "bold" }}
                  />
                  <Legend
                     wrapperStyle={{
                        paddingTop: "20px",
                        color: "#f1f5f9",
                        fontSize: "14px",
                     }}
                  />
                  <Bar
                     dataKey="budgeted_cost"
                     fill="#f97316"
                     name="Budgeted Cost"
                     radius={[4, 4, 0, 0]}
                     barSize={35}
                  />
                  <Bar
                     dataKey="actual_expense"
                     fill="#22d3ee"
                     name="Actual Expense"
                     radius={[4, 4, 0, 0]}
                     barSize={35}
                  />
               </BarChart>
            </ResponsiveContainer>
         </div>
      </div>
   );
}

export default CostComparisonGraph;