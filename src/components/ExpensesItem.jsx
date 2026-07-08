import React from "react";
import { Trash2 } from "lucide-react";
import { CATEGORIES } from "../constants";

function formatCurrency(n) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

function categoryColor(name) {
  return (CATEGORIES.find((c) => c.name === name) || CATEGORIES[CATEGORIES.length - 1]).color;
}

export default function ExpensesItem({ expense, onDelete }) {
  return (
    <div className="expense-item">
      <div className="expense-item-left">
        <span className="expense-dot" style={{ background: categoryColor(expense.category) }} />
        <div>
          <div className="expense-description">{expense.description}</div>
          <div className="expense-meta">
            {expense.category} · {expense.date}
          </div>
        </div>
      </div>

      <div className="expense-item-right">
        <span className="expense-amount">{formatCurrency(expense.amount)}</span>
        <button
          className="expense-delete"
          onClick={() => onDelete(expense.id)}
          aria-label={`Delete ${expense.description}`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
