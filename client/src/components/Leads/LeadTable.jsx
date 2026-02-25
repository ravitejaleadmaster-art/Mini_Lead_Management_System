import React from 'react';
import LeadRow from './LeadRow';
import './Leads.css';

function getPageList(current, total) {
  if (total <= 10) return Array.from({ length: total }, (_, i) => i + 1);
  const delta = 2;
  const range = [];
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);
  range.push(1);
  if (left > 2) range.push('left-ellipsis');
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push('right-ellipsis');
  range.push(total);
  return range;
}

export default function LeadTable({ leads = [], onReload, page = 1, totalPages = 1, onPageChange }) {
  const pages = getPageList(page, totalPages);

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

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => onPageChange && onPageChange(page - 1)}>Prev</button>
        {pages.map((p, idx) => (
          typeof p === 'number' ? (
            <button key={p} className={p === page ? 'active' : ''} onClick={() => onPageChange && onPageChange(p)}>{p}</button>
          ) : (
            <span key={p + idx} className="ellipsis">…</span>
          )
        ))}
        <button disabled={page >= totalPages} onClick={() => onPageChange && onPageChange(page + 1)}>Next</button>
      </div>
    </div>
  );
}
