import React, { useEffect } from 'react';

export default function Toast({ open, message, onClose, duration = 3000, type = 'success' }) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => onClose && onClose(), duration);
    return () => clearTimeout(t);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div className={`toast ${type === 'success' ? 'success' : 'error'}`} role="status" aria-live="polite">
      <div className="title">{type === 'success' ? 'Success' : 'Notice'}</div>
      <div style={{ fontSize: 14 }}>{message}</div>
    </div>
  );
}
