import React, { useState } from 'react';
import { updateLeadStatus } from './api';

const statusColors = {
  new: 'badge-new',
  contacted: 'badge-contacted',
  closed: 'badge-closed'
};

export default function LeadRow({ lead, onUpdated }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const changeStatus = async (e) => {
    const status = e.target.value;
    setError(null);
    setLoading(true);
    try {
      await updateLeadStatus(lead._id, status);
      onUpdated && onUpdated();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr>
      <td>{lead.name}</td>
      <td>{lead.phone}</td>
      <td>{lead.source}</td>
      <td>
        <span className={`status-badge ${statusColors[lead.status] || ''}`}>{lead.status}</span>
      </td>
      <td>
        <select value={lead.status} onChange={changeStatus} disabled={loading}>
          <option value="new">new</option>
          <option value="contacted">contacted</option>
          <option value="closed">closed</option>
        </select>
        {loading && <span className="tiny">Updating...</span>}
        {error && <div className="error tiny">{error}</div>}
      </td>
    </tr>
  );
}
