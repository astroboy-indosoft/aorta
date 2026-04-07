export default function Layout({ children }) {
  return (
    <div style={{ fontFamily: 'sans-serif', background: '#0f172a', color: '#e2e8f0', minHeight: '100vh' }}>
      <header style={{ padding: 20, background: '#020617', display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{ color: '#38bdf8', margin: 0 }}>Aorta</h1>
        <nav>
          <a href="#" style={{ marginLeft: 20, color: '#e2e8f0' }}>Home</a>
          <a href="#" style={{ marginLeft: 20, color: '#e2e8f0' }}>Docs</a>
        </nav>
      </header>
      {children}
      <footer style={{ textAlign: 'center', padding: 20, background: '#020617', marginTop: 80 }}>
        © 2026 Aorta
      </footer>
    </div>
  );
}
