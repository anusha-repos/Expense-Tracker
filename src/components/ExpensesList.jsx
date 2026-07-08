import React, { useMemo } from "react";
import ExpensesItem from "./ExpensesItem";
import { CATEGORIES } from "../constants";

export default function ExpensesList({ expenses, onDeleteExpense }) {
  const sortedExpenses = useMemo(
    () => [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [expenses]
  );

  return (
    <div className="expenses-list card">
      <h3>All expenses</h3>

      {sortedExpenses.length === 0 ? (
        <p className="expenses-empty">No expenses yet. Add your first one above.</p>
      ) : (
        <div>
          {sortedExpenses.map((exp) => (
            <ExpensesItem key={exp.id} expense={exp} onDelete={onDeleteExpense} />
          ))}
        </div>
      )}
    </div>
  );
}
