import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

export default function Portal() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/portal'
      }
    });
    
    if (error) {
      console.error('Error logging in with Google:', error.message);
      alert('Failed to log in with Google.');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <main style={{ padding: '120px 0', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>Loading...</div>
      </main>
    );
  }

  return (
    <main style={{ padding: '120px 0', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="wrap" style={{ maxWidth: '480px', margin: '0 auto', width: '100%' }}>
        <div style={{ background: 'var(--paper)', padding: '40px', borderRadius: '24px', border: '1px solid var(--rule)', boxShadow: 'var(--shadow)', textAlign: 'center' }}>
          
          {user ? (
            <div>
              <h1 className="h2" style={{ fontSize: '32px', marginBottom: '16px' }}>Welcome, <em>Volunteer</em></h1>
              <p style={{ color: 'var(--ink-soft)', marginBottom: '32px' }}>
                Logged in as {user.email}
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Log a Food Rescue
                </button>
                <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                  Submit a Video
                </button>
              </div>

              <button onClick={handleLogout} className="btn" style={{ width: '100%', justifyContent: 'center', background: 'var(--rule)', color: 'var(--ink)' }}>
                Sign Out
              </button>
            </div>
          ) : (
            <div>
              <h1 className="h2" style={{ fontSize: '32px', marginBottom: '24px' }}>Volunteer <em>Portal</em></h1>
              <p style={{ color: 'var(--ink-soft)', marginBottom: '32px' }}>
                Sign in to manage food rescue shifts, view inventory, and submit your stories.
              </p>
              
              <button 
                onClick={handleGoogleLogin} 
                className="btn btn-primary" 
                style={{ width: '100%', justifyContent: 'center', fontSize: '16px', padding: '14px 24px', gap: '12px' }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  <path d="M1 1h22v22H1z" fill="none"/>
                </svg>
                Sign in with Google
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
