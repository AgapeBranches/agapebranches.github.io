export default function Videos() {
  // Placeholder data for video recipes
  const videos = [
    {
      id: 1,
      title: 'Rescued Bread to Panzanella Salad',
      description: 'Turn slightly stale bread and surplus tomatoes into a beautiful Tuscan salad.',
      duration: '1:30'
    },
    {
      id: 2,
      title: 'Vegetable Scraps Broth',
      description: 'Don\'t throw away those peelings! Make a rich, nutritious broth base.',
      duration: '2:15'
    }
  ];

  return (
    <main style={{ padding: '120px 0', minHeight: '80vh' }}>
      <div className="wrap">
        <span className="eyebrow">Recipes & Inspiration</span>
        <h1 className="h2" style={{ marginBottom: '40px' }}>
          Cook with <em>what you have.</em>
        </h1>
        
        <div className="feature-grid">
          {videos.map(video => (
            <article key={video.id} className="feature reveal in">
              <span className="feature-num">— Episode 0{video.id}</span>
              <div 
                style={{ 
                  background: 'var(--moss)', 
                  aspectRatio: '16/9', 
                  borderRadius: '12px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--paper)'
                }}
              >
                <span>[Video Player: {video.duration}]</span>
              </div>
              <h3 className="feature-title">{video.title}</h3>
              <p>{video.description}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
