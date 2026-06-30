import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

export default function Portal() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string>('volunteer');
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'dashboard' | 'logRescue' | 'adminRescues' | 'submitVideo'>('dashboard');

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

  useEffect(() => {
    const checkUser = async (session: Session | null) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        // Fetch role from profiles
        const { data } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
        if (data) setRole(data.role);
      }
      setLoading(false);
    };

    supabase.auth.getSession().then(({ data: { session } }) => checkUser(session));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      checkUser(session);
    });

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
      {
        volunteer_id: user.id,
        partner_name: partnerName,
        quantity_kg: parseFloat(quantity),
        pickup_time: new Date(pickupTime).toISOString(),
        status: 'completed'
      }
    ]);

    setSubmitting(false);

    if (error) {
      console.error(error);
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
      {
        title: videoTitle,
        description: videoDesc,
        duration: videoDuration,
        video_url: videoUrl,
        thumbnail_url: thumbnailUrl
      }
    ]);

    setSubmitting(false);

    if (error) {
      console.error(error);
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
    const { data, error } = await supabase
      .from('food_rescues')
      .select('*, profiles(full_name, role)')
      .order('pickup_time', { ascending: false });
      
    if (!error && data) {
      setAllRescues(data);
    }
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
      <div className="wrap" style={{ maxWidth: view === 'adminRescues' ? '800px' : '480px', margin: '0 auto', width: '100%', transition: 'max-width 0.3s' }}>
        <div style={{ background: 'var(--paper)', padding: '40px', borderRadius: '24px', border: '1px solid var(--rule)', boxShadow: 'var(--shadow)' }}>
          
          {user ? (
            view === 'dashboard' ? (
              <div style={{ textAlign: 'center' }}>
                <h1 className="h2" style={{ fontSize: '32px', marginBottom: '16px' }}>Welcome, <em>{role === 'admin' ? 'Admin' : 'Volunteer'}</em></h1>
                <p style={{ color: 'var(--ink-soft)', marginBottom: '32px' }}>Logged in as {user.email}</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  <button onClick={() => setView('logRescue')} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Log a Food Rescue
                  </button>
                  <button onClick={() => setView('submitVideo')} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'var(--moss)' }}>
                    Submit a Video Recipe
                  </button>
                  {role === 'admin' && (
                    <button onClick={loadAdminRescues} className="btn btn-ochre" style={{ width: '100%', justifyContent: 'center' }}>
                      Admin: View All Rescues
                    </button>
                  )}
                </div>
                <button onClick={handleLogout} className="btn" style={{ width: '100%', justifyContent: 'center', background: 'var(--rule)', color: 'var(--ink)' }}>
                  Sign Out
                </button>
              </div>
            ) : view === 'logRescue' ? (
              <div>
                <button onClick={() => setView('dashboard')} style={{ background: 'none', border: 'none', color: 'var(--ink-soft)', cursor: 'pointer', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="arrow" style={{ transform: 'rotate(180deg)' }}>→</span> Back to Dashboard
                </button>
                <h2 className="h3" style={{ marginBottom: '24px' }}>Log a <em>Rescue</em></h2>
                
                <form onSubmit={submitRescue} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Food Partner</label>
                    <input type="text" value={partnerName} onChange={e => setPartnerName(e.target.value)} required placeholder="e.g. Bakers Delight" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--rule)', background: 'var(--cream)', fontSize: '16px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Quantity (KG)</label>
                    <input type="number" step="0.1" value={quantity} onChange={e => setQuantity(e.target.value)} required placeholder="0.0" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--rule)', background: 'var(--cream)', fontSize: '16px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Date & Time of Pickup</label>
                    <input type="datetime-local" value={pickupTime} onChange={e => setPickupTime(e.target.value)} required style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--rule)', background: 'var(--cream)', fontSize: '16px' }} />
                  </div>
                  
                  <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}>
                    {submitting ? 'Saving...' : 'Save Record'} <span className="arrow">→</span>
                  </button>
                </form>
              </div>
            ) : view === 'submitVideo' ? (
              <div>
                <button onClick={() => setView('dashboard')} style={{ background: 'none', border: 'none', color: 'var(--ink-soft)', cursor: 'pointer', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="arrow" style={{ transform: 'rotate(180deg)' }}>→</span> Back to Dashboard
                </button>
                <h2 className="h3" style={{ marginBottom: '24px' }}>Submit a <em>Video</em></h2>
                
                <form onSubmit={submitVideo} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Recipe Title</label>
                    <input type="text" value={videoTitle} onChange={e => setVideoTitle(e.target.value)} required placeholder="e.g. Rescued Bread Panzanella" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--rule)', background: 'var(--cream)', fontSize: '16px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Description</label>
                    <textarea value={videoDesc} onChange={e => setVideoDesc(e.target.value)} required placeholder="Short description of the recipe..." rows={3} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--rule)', background: 'var(--cream)', fontSize: '16px', fontFamily: 'inherit' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Duration (e.g., "1:30")</label>
                    <input type="text" value={videoDuration} onChange={e => setVideoDuration(e.target.value)} required placeholder="1:30" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--rule)', background: 'var(--cream)', fontSize: '16px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Thumbnail URL (Optional)</label>
                    <input type="url" value={thumbnailUrl} onChange={e => setThumbnailUrl(e.target.value)} placeholder="https://..." style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--rule)', background: 'var(--cream)', fontSize: '16px' }} />
                  </div>
                  
                  <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '16px', background: 'var(--moss)' }}>
                    {submitting ? 'Submitting...' : 'Publish Video'} <span className="arrow">→</span>
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <button onClick={() => setView('dashboard')} style={{ background: 'none', border: 'none', color: 'var(--ink-soft)', cursor: 'pointer', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="arrow" style={{ transform: 'rotate(180deg)' }}>→</span> Back to Dashboard
                </button>
                <h2 className="h3" style={{ marginBottom: '24px' }}>All Logged <em>Rescues</em></h2>
                
                {allRescues.length === 0 ? (
                  <p>No food rescues have been logged yet.</p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--rule)' }}>
                          <th style={{ padding: '12px 8px' }}>Date</th>
                          <th style={{ padding: '12px 8px' }}>Partner</th>
                          <th style={{ padding: '12px 8px' }}>Quantity</th>
                          <th style={{ padding: '12px 8px' }}>Volunteer</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allRescues.map(rescue => (
                          <tr key={rescue.id} style={{ borderBottom: '1px solid var(--rule)' }}>
                            <td style={{ padding: '12px 8px' }}>{new Date(rescue.pickup_time).toLocaleDateString()}</td>
                            <td style={{ padding: '12px 8px' }}>{rescue.partner_name}</td>
                            <td style={{ padding: '12px 8px' }}>{rescue.quantity_kg} kg</td>
                            <td style={{ padding: '12px 8px' }}>{rescue.profiles?.full_name || 'Unknown'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )
          ) : (
            <div style={{ textAlign: 'center' }}>
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
          )}
        </div>
      </div>
    </main>
  );
}
