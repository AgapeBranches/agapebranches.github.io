import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

export default function Portal() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string>('volunteer');
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'dashboard' | 'logRescue' | 'adminRescues' | 'submitVideo' | 'adminUsers'>('dashboard');

  // Log Rescue Form State
  const [partnerName, setPartnerName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  // Submit Video Form State
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDesc, setVideoDesc] = useState('');
  const [videoDuration, setVideoDuration] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  // Admin State
  const [allRescues, setAllRescues] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);

  useEffect(() => {
    const checkUser = async (session: Session | null) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
        if (data) setRole(data.role);
      }
      setLoading(false);
    };

    supabase.auth.getSession().then(({ data: { session } }) => checkUser(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => checkUser(session));

    return () => subscription.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/portal' }
    });
    if (error) alert('Failed to log in with Google.');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setView('dashboard');
  };

  const submitRescue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    
    const { error } = await supabase.from('food_rescues').insert([
      { volunteer_id: user.id, partner_name: partnerName, quantity_kg: parseFloat(quantity), pickup_time: new Date(pickupTime).toISOString(), status: 'completed' }
    ]);

    setSubmitting(false);
    if (error) {
      alert('Error logging rescue: ' + error.message);
    } else {
      alert('Food rescue logged successfully!');
      setView('dashboard');
      setPartnerName('');
      setQuantity('');
      setPickupTime('');
    }
  };

  const submitVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    
    const { error } = await supabase.from('videos').insert([
      { title: videoTitle, description: videoDesc, duration: videoDuration, video_url: videoUrl, thumbnail_url: thumbnailUrl }
    ]);

    setSubmitting(false);
    if (error) {
      alert('Error submitting video: ' + error.message);
    } else {
      alert('Video submitted successfully! It is now live on the Recipes page.');
      setView('dashboard');
      setVideoTitle('');
      setVideoDesc('');
      setVideoDuration('');
      setVideoUrl('');
      setThumbnailUrl('');
    }
  };

  const loadAdminRescues = async () => {
    setView('adminRescues');
    const { data, error } = await supabase.from('food_rescues').select('*, profiles(full_name, role)').order('pickup_time', { ascending: false });
    if (!error && data) setAllRescues(data);
  };

  const loadAdminUsers = async () => {
    setView('adminUsers');
    const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    if (!error && data) setAllUsers(data);
  };

  const updateRole = async (userId: string, newRole: string) => {
    const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', userId);
    if (error) {
      alert('Error updating role: ' + error.message);
    } else {
      setAllUsers(allUsers.map(u => u.id === userId ? { ...u, role: newRole } : u));
    }
  };

  if (loading) {
    return (
      <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Loading...</div>
      </main>
    );
  }

  if (!user) {
    return (
      <main style={{ padding: '120px 0', minHeight: '80vh', display: 'flex', alignItems: 'center', background: 'var(--cream)' }}>
        <div className="wrap" style={{ maxWidth: '480px', margin: '0 auto', width: '100%' }}>
          <div style={{ background: 'var(--paper)', padding: '48px', borderRadius: '24px', border: '1px solid var(--rule)', boxShadow: 'var(--shadow)', textAlign: 'center' }}>
            <h1 className="h2" style={{ fontSize: '32px', marginBottom: '24px' }}>Volunteer <em>Portal</em></h1>
            <p style={{ color: 'var(--ink-soft)', marginBottom: '32px' }}>
              Sign in to manage food rescue shifts, view inventory, and submit your stories.
            </p>
            <button onClick={handleGoogleLogin} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '16px', padding: '14px 24px', gap: '12px' }}>
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
        </div>
      </main>
    );
  }

  const sidebarButtonStyles = (isActive: boolean) => ({
    width: '100%',
    padding: '12px 16px',
    textAlign: 'left' as const,
    background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
    border: 'none',
    color: 'var(--paper)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: isActive ? 600 : 400,
    transition: 'background 0.2s',
  });

  return (
    <main style={{ minHeight: 'calc(100vh - 100px)', display: 'flex', background: 'var(--cream)' }}>
      {/* Sidebar Panel */}
      <aside style={{ width: '320px', background: 'var(--moss)', color: 'var(--paper)', display: 'flex', flexDirection: 'column', padding: '40px 24px' }}>
        <h2 className="h4" style={{ color: 'var(--paper)', marginBottom: '40px' }}>Volunteer Panel</h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <button style={sidebarButtonStyles(view === 'dashboard')} onClick={() => setView('dashboard')}>Dashboard</button>
          <button style={sidebarButtonStyles(view === 'logRescue')} onClick={() => setView('logRescue')}>Log a Rescue</button>
          <button style={sidebarButtonStyles(view === 'submitVideo')} onClick={() => setView('submitVideo')}>Submit a Video</button>
          
          {role === 'admin' && (
            <>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.2)', margin: '16px 0' }}></div>
              <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.7, padding: '0 16px', marginBottom: '8px' }}>Admin</p>
              <button style={sidebarButtonStyles(view === 'adminRescues')} onClick={loadAdminRescues}>All Rescues</button>
              <button style={sidebarButtonStyles(view === 'adminUsers')} onClick={loadAdminUsers}>Manage Users</button>
            </>
          )}
        </nav>

        {/* User Profile Panel */}
        <div style={{ marginTop: 'auto', background: 'rgba(0, 0, 0, 0.15)', padding: '20px', borderRadius: '12px' }}>
          <p style={{ fontSize: '14px', opacity: 0.8, marginBottom: '4px' }}>Logged in as</p>
          <p style={{ fontWeight: 600, fontSize: '16px', marginBottom: '16px', wordBreak: 'break-all' }}>{user.email}</p>
          <span style={{ display: 'inline-block', background: 'var(--ochre)', color: 'var(--moss)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '16px' }}>{role}</span>
          <button 
            onClick={handleLogout} 
            style={{ width: '100%', padding: '10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'var(--paper)', borderRadius: '6px', cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseOut={e => e.currentTarget.style.background = 'transparent'}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <section style={{ flex: 1, padding: '60px 80px', overflowY: 'auto' }}>
        <div style={{ maxWidth: '800px' }}>
          {view === 'dashboard' && (
            <div className="reveal in">
              <h1 className="h2" style={{ marginBottom: '16px' }}>Welcome back, <em>{user.user_metadata?.full_name || 'Volunteer'}</em></h1>
              <p style={{ fontSize: '18px', color: 'var(--ink-soft)', marginBottom: '48px' }}>What would you like to do today?</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div onClick={() => setView('logRescue')} style={{ background: 'var(--paper)', padding: '32px', borderRadius: '16px', border: '1px solid var(--rule)', boxShadow: 'var(--shadow)', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <h3 className="h4" style={{ marginBottom: '12px' }}>Log a Rescue</h3>
                  <p style={{ color: 'var(--ink-soft)' }}>Record a recent food pickup from a community partner.</p>
                </div>
                <div onClick={() => setView('submitVideo')} style={{ background: 'var(--paper)', padding: '32px', borderRadius: '16px', border: '1px solid var(--rule)', boxShadow: 'var(--shadow)', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <h3 className="h4" style={{ marginBottom: '12px' }}>Submit a Video</h3>
                  <p style={{ color: 'var(--ink-soft)' }}>Upload a recipe video to inspire the community.</p>
                </div>
              </div>
            </div>
          )}

          {view === 'logRescue' && (
            <div className="reveal in" style={{ background: 'var(--paper)', padding: '48px', borderRadius: '24px', border: '1px solid var(--rule)', boxShadow: 'var(--shadow)' }}>
              <h2 className="h3" style={{ marginBottom: '32px' }}>Log a <em>Food Rescue</em></h2>
              <form onSubmit={submitRescue} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Food Partner</label>
                  <input type="text" value={partnerName} onChange={e => setPartnerName(e.target.value)} required placeholder="e.g. Bakers Delight" style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid var(--rule)', background: 'var(--cream)', fontSize: '16px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Quantity (KG)</label>
                  <input type="number" step="0.1" value={quantity} onChange={e => setQuantity(e.target.value)} required placeholder="0.0" style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid var(--rule)', background: 'var(--cream)', fontSize: '16px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Date & Time of Pickup</label>
                  <input type="datetime-local" value={pickupTime} onChange={e => setPickupTime(e.target.value)} required style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid var(--rule)', background: 'var(--cream)', fontSize: '16px' }} />
                </div>
                <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}>
                  {submitting ? 'Saving...' : 'Save Record'}
                </button>
              </form>
            </div>
          )}

          {view === 'submitVideo' && (
            <div className="reveal in" style={{ background: 'var(--paper)', padding: '48px', borderRadius: '24px', border: '1px solid var(--rule)', boxShadow: 'var(--shadow)' }}>
              <h2 className="h3" style={{ marginBottom: '32px' }}>Submit a <em>Video Recipe</em></h2>
              <form onSubmit={submitVideo} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Recipe Title</label>
                  <input type="text" value={videoTitle} onChange={e => setVideoTitle(e.target.value)} required placeholder="e.g. Rescued Bread Panzanella" style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid var(--rule)', background: 'var(--cream)', fontSize: '16px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Description</label>
                  <textarea value={videoDesc} onChange={e => setVideoDesc(e.target.value)} required placeholder="Short description of the recipe..." rows={4} style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid var(--rule)', background: 'var(--cream)', fontSize: '16px', fontFamily: 'inherit' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Duration (e.g., "1:30")</label>
                  <input type="text" value={videoDuration} onChange={e => setVideoDuration(e.target.value)} required placeholder="1:30" style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid var(--rule)', background: 'var(--cream)', fontSize: '16px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Thumbnail URL (Optional)</label>
                  <input type="url" value={thumbnailUrl} onChange={e => setThumbnailUrl(e.target.value)} placeholder="https://..." style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid var(--rule)', background: 'var(--cream)', fontSize: '16px' }} />
                </div>
                <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '16px', background: 'var(--moss)' }}>
                  {submitting ? 'Submitting...' : 'Publish Video'}
                </button>
              </form>
            </div>
          )}

          {view === 'adminRescues' && (
            <div className="reveal in">
              <h2 className="h3" style={{ marginBottom: '32px' }}>All Logged <em>Rescues</em></h2>
              {allRescues.length === 0 ? (
                <p>No food rescues have been logged yet.</p>
              ) : (
                <div style={{ background: 'var(--paper)', borderRadius: '16px', border: '1px solid var(--rule)', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: 'var(--cream)' }}>
                      <tr>
                        <th style={{ padding: '16px 24px', fontWeight: 600, borderBottom: '1px solid var(--rule)' }}>Date</th>
                        <th style={{ padding: '16px 24px', fontWeight: 600, borderBottom: '1px solid var(--rule)' }}>Partner</th>
                        <th style={{ padding: '16px 24px', fontWeight: 600, borderBottom: '1px solid var(--rule)' }}>Quantity</th>
                        <th style={{ padding: '16px 24px', fontWeight: 600, borderBottom: '1px solid var(--rule)' }}>Volunteer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allRescues.map(rescue => (
                        <tr key={rescue.id} style={{ borderBottom: '1px solid var(--rule)' }}>
                          <td style={{ padding: '16px 24px' }}>{new Date(rescue.pickup_time).toLocaleDateString()}</td>
                          <td style={{ padding: '16px 24px' }}>{rescue.partner_name}</td>
                          <td style={{ padding: '16px 24px', fontWeight: 600 }}>{rescue.quantity_kg} kg</td>
                          <td style={{ padding: '16px 24px', color: 'var(--ink-soft)' }}>{rescue.profiles?.full_name || 'Unknown'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {view === 'adminUsers' && (
            <div className="reveal in">
              <h2 className="h3" style={{ marginBottom: '32px' }}>Manage <em>Users</em></h2>
              {allUsers.length === 0 ? (
                <p>Loading users...</p>
              ) : (
                <div style={{ background: 'var(--paper)', borderRadius: '16px', border: '1px solid var(--rule)', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: 'var(--cream)' }}>
                      <tr>
                        <th style={{ padding: '16px 24px', fontWeight: 600, borderBottom: '1px solid var(--rule)' }}>Name</th>
                        <th style={{ padding: '16px 24px', fontWeight: 600, borderBottom: '1px solid var(--rule)' }}>Role</th>
                        <th style={{ padding: '16px 24px', fontWeight: 600, borderBottom: '1px solid var(--rule)' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers.map(u => (
                        <tr key={u.id} style={{ borderBottom: '1px solid var(--rule)' }}>
                          <td style={{ padding: '16px 24px' }}>{u.full_name || 'Unknown'}</td>
                          <td style={{ padding: '16px 24px' }}>
                            <span style={{ display: 'inline-block', background: u.role === 'admin' ? 'var(--ochre)' : 'var(--cream)', color: u.role === 'admin' ? 'var(--moss)' : 'var(--ink)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>
                              {u.role}
                            </span>
                          </td>
                          <td style={{ padding: '16px 24px' }}>
                            {u.id !== user.id && (
                              <select 
                                value={u.role} 
                                onChange={(e) => updateRole(u.id, e.target.value)}
                                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--rule)', background: 'var(--cream)' }}
                              >
                                <option value="volunteer">Volunteer</option>
                                <option value="admin">Admin</option>
                              </select>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
