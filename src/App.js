import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "https://deer-designer-backend.onrender.com";

function App() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
    skill: "",
  });

  useEffect(() => {
    axios.get(`${API}/tickets`).then((res) => setTickets(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${API}/tickets`, form);
    setTickets((prev) => [...prev, res.data]);
    setForm({ title: "", description: "", deadline: "", skill: "" });
  };

  return (
    <div>
      <h2>Create Ticket</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          type="date"
          value={form.deadline}
          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          required
        />
        <select
          value={form.skill}
          onChange={(e) => setForm({ ...form, skill: e.target.value })}
          required
        >
          <option value="">Select Skill</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>
        <button type="submit">Submit</button>
      </form>

      <h2>Tickets</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            <strong>{ticket.title}</strong> - Assigned to:{" "}
            {ticket.assignedTo || "Unassigned"} - Status: {ticket.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
