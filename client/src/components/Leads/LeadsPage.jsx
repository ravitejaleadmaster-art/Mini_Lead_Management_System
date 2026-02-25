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

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetchLeads();
      setLeads(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load leads');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

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
        {!loading && !error && <LeadTable leads={leads} onReload={load} />}
      </div>
    </div>
  );
}
