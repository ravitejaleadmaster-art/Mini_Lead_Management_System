import React, { useEffect, useState, useCallback } from 'react';
import LeadForm from './LeadForm';
import LeadTable from './LeadTable';
import { fetchLeads } from './api';
import './Leads.css';
import Lottie from 'lottie-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const load = useCallback(async (p = 1) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetchLeads(p, limit);
      setLeads(res.data || []);
      if (res.meta) {
        setTotalPages(res.meta.totalPages || 1);
        setPage(res.meta.page || p);
      }
    } catch (err) {
      setError(err.message || 'Failed to load leads');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => { load(); }, [load]);

  // Filter leads based on search query
  const filteredLeads = leads.filter(lead => {
    const query = searchQuery.toLowerCase();
    return (
      lead.name.toLowerCase().includes(query) ||
      (lead.phone && lead.phone.includes(query))
    );
  });

  // load a small public Lottie JSON for the loader (one-time)
  const [anim, setAnim] = useState(null);
  useEffect(() => {
    let mounted = true;
    fetch('https://assets9.lottiefiles.com/packages/lf20_usmfx6bp.json')
      .then(r => r.json())
      .then(data => { if (mounted) setAnim(data); })
      .catch(() => {});
    return () => { mounted = false };
  }, []);

  return (
    <div className="leads-page">
      <div className="left">
        <LeadForm onCreated={load} />
      </div>
      <div className="right">
        <h3>Leads</h3>
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />
        {loading && (
        <div className="loader-overlay">
            {anim ? (
            <Lottie animationData={anim} loop={true} style={{ width: 150, height: 150 }} />
            ) : (
            <div className="loader">Loading leads...</div>
            )}
        </div>
        )}
        {error && <div className="error">{error}</div>}
        {!loading && !error && (
          <>
            <LeadTable leads={filteredLeads} onReload={() => load(page)} page={page} totalPages={totalPages} onPageChange={(p) => load(p)} />
          </>
        )}
      </div>
    </div>
  );
}
