import React, { useMemo } from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { Wallet, TrendingUp, Receipt } from "lucide-react";
import { CATEGORIES } from "../constants";

function formatCurrency(n) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

function categoryColor(name) {
  return (CATEGORIES.find((c) => c.name === name) || CATEGORIES[CATEGORIES.length - 1]).color;
}

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="stat-card card">
      <div className="stat-card-label">
        <Icon size={16} color={accent} />
        <span>{label}</span>
      </div>
      <span className="stat-card-value">{value}</span>
    </div>
  );
}

export default function Summary({ expenses }) {
  const total = useMemo(() => expenses.reduce((sum, e) => sum + e.amount, 0), [expenses]);

  const thisMonthTotal = useMemo(() => {
    const now = new Date();
    return expenses
      .filter((e) => {
        const d = new Date(e.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  const pieData = useMemo(() => {
    const byCat = {};
    expenses.forEach((e) => {
      byCat[e.category] = (byCat[e.category] || 0) + e.amount;
    });
    return Object.entries(byCat).map(([name, value]) => ({ name, value }));
  }, [expenses]);

  const topCategory = useMemo(() => {
    if (pieData.length === 0) return "—";
    return pieData.reduce((a, b) => (b.value > a.value ? b : a)).name;
  }, [pieData]);

  const barData = useMemo(() => {
    const byDate = {};
    expenses.forEach((e) => {
      byDate[e.date] = (byDate[e.date] || 0) + e.amount;
    });
    return Object.entries(byDate)
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .map(([date, amount]) => ({ date, amount: Math.round(amount * 100) / 100 }));
  }, [expenses]);

  return (
    <>
      <div className="summary">
        <StatCard icon={Wallet} label="Total spent" value={formatCurrency(total)} accent="#D97757" />
        <StatCard icon={TrendingUp} label="This month" value={formatCurrency(thisMonthTotal)} accent="#4A7C7C" />
        <StatCard icon={Receipt} label="Top category" value={topCategory} accent="#8B6BAE" />
      </div>

      <div className="charts">
        <div className="chart-card card">
          <h3>By category</h3>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={categoryColor(entry.name)} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => formatCurrency(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-legend">
            {pieData.map((d) => (
              <span key={d.name} className="chart-legend-item">
                <span className="legend-dot" style={{ background: categoryColor(d.name) }} />
                {d.name} · {formatCurrency(d.value)}
              </span>
            ))}
          </div>
        </div>

        <div className="chart-card card">
          <h3>Spending by day</h3>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E1D8" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#7A7A72" }} />
                <YAxis tick={{ fontSize: 11, fill: "#7A7A72" }} />
                <Tooltip formatter={(v) => formatCurrency(v)} />
                <Bar dataKey="amount" fill="#4A7C7C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
