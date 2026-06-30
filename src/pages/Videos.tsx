import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Videos() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching videos:', error);
      } else {
        setVideos(data || []);
      }
      setLoading(false);
    }
    
    fetchVideos();
  }, []);

  return (
    <main style={{ padding: '120px 0', minHeight: '80vh' }}>
      <div className="wrap">
        <span className="eyebrow">Recipes & Inspiration</span>
        <h1 className="h2" style={{ marginBottom: '40px' }}>
          Cook with <em>what you have.</em>
        </h1>
        
        {loading ? (
          <p>Loading recipes...</p>
        ) : videos.length === 0 ? (
          <p>No video recipes uploaded yet. Check back soon!</p>
        ) : (
          <div className="feature-grid">
            {videos.map((video, index) => (
              <article key={video.id} className="feature reveal in">
                <span className="feature-num">— Episode 0{videos.length - index}</span>
                <div 
                  style={{ 
                    background: 'var(--moss)', 
                    aspectRatio: '16/9', 
                    borderRadius: '12px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--paper)',
                    backgroundImage: video.thumbnail_url ? `url(${video.thumbnail_url})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {!video.thumbnail_url && <span>[Video Player: {video.duration}]</span>}
                </div>
                <h3 className="feature-title">{video.title}</h3>
                <p>{video.description}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
