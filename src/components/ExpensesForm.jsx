import React, { useState } from "react";
import { Plus } from "lucide-react";
import { CATEGORIES } from "../constants";

const todayStr = () => new Date().toISOString().slice(0, 10);

export default function ExpensesForm({ onAddExpense }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [date, setDate] = useState(todayStr());
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const amountNum = parseFloat(amount);

    if (!description.trim()) {
      setError("Enter a description.");
      return;
    }
    if (!amountNum || amountNum <= 0) {
      setError("Enter an amount greater than 0.");
      return;
    }

    onAddExpense({
      description: description.trim(),
      amount: amountNum,
      category,
      date,
    });

    setDescription("");
    setAmount("");
    setError("");
  };

  return (
    <form className="expenses-form card" onSubmit={handleSubmit}>
      <div className="form-field field-description">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Coffee with a friend"
        />
      </div>

      <div className="form-field field-amount">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
        />
      </div>

      <div className="form-field field-category">
        <label htmlFor="category">Category</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field field-date">
        <label htmlFor="date">Date</label>
        <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <button type="submit" className="form-submit">
        <Plus size={16} /> Add expense
      </button>

      {error && <div className="form-error">{error}</div>}
    </form>
  );
}
