import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchQuotes = async () => {
    const res = await fetch("http://localhost:4000/api/quotes");
    const data = await res.json();
    setQuotes(data);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await fetch(`http://localhost:4000/api/quotes/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      setEditId(null);
    } else {
      await fetch("http://localhost:4000/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
    }

    setText("");
    fetchQuotes();
  };

  // Edit Quote
  const handleEdit = (quote) => {
    setText(quote.text);
    setEditId(quote.id);
  };

  // Delete Quote
  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/api/quotes/${id}`, {
      method: "DELETE",
    });
    fetchQuotes();
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Quotes App</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a quote"
          className="border p-2 flex-1 rounded"
          required
        />
        <button
          type="submit"
          className="bg-[#040c1b] text-white px-4 py-2 rounded"
        >
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {/* Quotes List */}
      <ul className="space-y-3">
        {quotes.map((quote) => (
          <li
            key={quote.id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <span>{quote.text}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(quote)}
                className="bg-[#F2CC0F] text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(quote.id)}
                className="bg-[#ac2b3b] text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quotes;
