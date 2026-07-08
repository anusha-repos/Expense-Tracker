import React, { useState, useMemo } from "react";
import ExpensesForm from "./components/ExpensesForm";
import ExpensesList from "./components/ExpensesList";
import Summary from "./components/Summary";
import Filter from "./components/Filter";
import { CATEGORIES } from "./constants";
import "./App.css";

const uid = () => Math.random().toString(36).slice(2, 10);
const todayStr = () => new Date().toISOString().slice(0, 10);

const seedExpenses = [
  { id: uid(), description: "Grocery run", amount: 62.4, category: "Food", date: todayStr() },
  { id: uid(), description: "Metro pass", amount: 45, category: "Transport", date: todayStr() },
  { id: uid(), description: "Rent share", amount: 550, category: "Housing", date: todayStr() },
  { id: uid(), description: "Streaming service", amount: 15.99, category: "Entertainment", date: todayStr() },
];



export default function App() {
  const [expenses, setExpenses] = useState(seedExpenses);
  const [activeCategory, setActiveCategory] = useState("All");

  const addExpense = (expense) => {
    setExpenses((prev) => [{ id: uid(), ...expense }, ...prev]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const filteredExpenses = useMemo(() => {
    if (activeCategory === "All") return expenses;
    return expenses.filter((e) => e.category === activeCategory);
  }, [expenses, activeCategory]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Expense tracker</h1>
        <p>Log spending, see where it goes.</p>
      </header>

      <Summary expenses={filteredExpenses} />

      <ExpensesForm onAddExpense={addExpense} />

      <Filter
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onChange={setActiveCategory}
      />

      <ExpensesList expenses={filteredExpenses} onDeleteExpense={deleteExpense} />
    </div>
  );
}
