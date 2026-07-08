import React from "react";

export default function Filter({ categories, activeCategory, onChange }) {
  const allOptions = ["All", ...categories.map((c) => c.name)];

  return (
    <div className="filter">
      {allOptions.map((name) => (
        <button
          key={name}
          type="button"
          className={`filter-pill${activeCategory === name ? " active" : ""}`}
          onClick={() => onChange(name)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
