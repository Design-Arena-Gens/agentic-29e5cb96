"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const densityData = [
  { name: 'Critical', value: 5, color: '#b91c1c' },
  { name: 'High', value: 12, color: '#ef4444' },
  { name: 'Medium', value: 20, color: '#f59e0b' },
  { name: 'Low', value: 30, color: '#16a34a' },
];

const trendData = [
  { month: 'Apr', vulns: 95 },
  { month: 'May', vulns: 88 },
  { month: 'Jun', vulns: 82 },
  { month: 'Jul', vulns: 76 },
  { month: 'Aug', vulns: 72 },
  { month: 'Sep', vulns: 69 },
];

function RiskGauge({ score }: { score: number }) {
  const clamped = Math.max(0, Math.min(100, score));
  const angle = (clamped / 100) * 180 - 90; // -90 to 90
  return (
    <div className="relative mx-auto h-40 w-72">
      <svg viewBox="0 0 200 120" className="w-full h-full" role="img" aria-label={`Risk score ${clamped} out of 100`}>
        <defs>
          <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#16a34a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
        </defs>
        <path d="M10,110 A90,90 0 0,1 190,110" fill="none" stroke="url(#g)" strokeWidth="20" />
        <line x1="100" y1="110" x2={100 + 80 * Math.cos((Math.PI / 180) * angle)} y2={110 + -80 * Math.sin((Math.PI / 180) * angle)} stroke="#0f172a" strokeWidth="4" />
        <text x="100" y="115" textAnchor="middle" fontSize="14" fill="#0f172a">{clamped}</text>
      </svg>
    </div>
  );
}

export function ReportingTab() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h3 className="text-lg font-semibold">Vulnerability Density</h3>
        <div className="h-64" role="img" aria-label="Pie chart of vulnerability density by severity">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={densityData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70} paddingAngle={2}>
                {densityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h3 className="text-lg font-semibold">Project Risk Score</h3>
        <RiskGauge score={64} />
        <p className="mt-2 text-sm text-slate-600">Gauge shows composite risk across portfolio.</p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 md:col-span-2">
        <h3 className="text-lg font-semibold">Trend Analysis</h3>
        <div className="h-72" role="img" aria-label="Line chart of vulnerability trend over time">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="vulns" stroke="#2f6dff" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ReportingTab;
