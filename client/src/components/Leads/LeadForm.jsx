import React, { useState } from 'react';
import { createLead } from './api';
import './Leads.css';

export default function LeadForm({ onCreated }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [source, setSource] = useState('manual');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const payload = { name, phone, source };
      await createLead(payload);
      setName(''); setPhone(''); setSource('manual');
      onCreated && onCreated();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    
  };
  return (
    <form className="leads-form" onSubmit={submit}>
      <h3>Add Lead</h3>
      <div className="field"><label>Name</label><input value={name} onChange={e=>setName(e.target.value)} required /></div>
      <div className="field"><label>Phone</label><input value={phone} onChange={e=>setPhone(e.target.value)} required /></div>
      <div className="field"><label>Source</label>
        <select value={source} onChange={e=>setSource(e.target.value)}>
          <option value="manual">manual</option>
          <option value="ad">ad</option>
          <option value="referral">referral</option>
        </select>
      </div>
      <div className="actions">
        <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Add Lead'}</button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
