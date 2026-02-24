import React from 'react';
import LeadRow from './LeadRow';
import './Leads.css';

export default function LeadTable({ leads = [], onReload }) {
  return (
    <div className="leads-table-wrap">
      <h3>Leads</h3>
      <table className="leads-table">
        <thead>
          <tr><th>Name</th><th>Phone</th><th>Source</th><th>Status</th><th>Change</th></tr>
        </thead>
        <tbody>
          {(!leads || leads.length === 0) && <tr><td colSpan={5}>No leads found</td></tr>}
          {leads && leads.map(l => <LeadRow key={l._id} lead={l} onUpdated={onReload} />)}
        </tbody>
      </table>
    </div>
  );
}
