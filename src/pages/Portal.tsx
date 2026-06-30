import { useState } from 'react';

export default function Portal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Supabase login will be connected here.');
  };

  return (
    <main style={{ padding: '120px 0', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="wrap" style={{ maxWidth: '480px', margin: '0 auto' }}>
        <div style={{ background: 'var(--paper)', padding: '40px', borderRadius: '24px', border: '1px solid var(--rule)', boxShadow: 'var(--shadow)' }}>
          <h1 className="h2" style={{ fontSize: '32px', marginBottom: '24px' }}>Volunteer <em>Portal</em></h1>
          <p style={{ color: 'var(--ink-soft)', marginBottom: '32px' }}>
            Sign in to manage food rescue shifts, view inventory, and submit your stories.
          </p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--rule)', background: 'var(--cream)', fontSize: '16px' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--rule)', background: 'var(--cream)', fontSize: '16px' }} 
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}>
              Sign In <span className="arrow">→</span>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
