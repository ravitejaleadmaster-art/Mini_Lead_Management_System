const BASE = 'http://localhost:3000/api/leads';

export async function fetchLeads(page = 1, limit = 50) {
  const res = await fetch(`${BASE}?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error((await res.json()).error || 'Failed to fetch leads');
  return res.json();
}

export async function createLead(payload) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error((await res.json()).errors?.join(', ') || (await res.json()).error || 'Create failed');
  return res.json();
}

export async function updateLeadStatus(id, status) {
  const res = await fetch(`${BASE}/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Update failed');
  return res.json();
}
