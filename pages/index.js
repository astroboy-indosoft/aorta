import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <main style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2 style={{ fontSize: 40, marginBottom: 20 }}>
          High Performance System Starts Here
        </h2>
        <p style={{ fontSize: 18, color: '#94a3b8' }}>
          Build scalable, low-level, and production-ready systems with Aorta.
        </p>

        <a
          href="#"
          style={{
            display: 'inline-block',
            marginTop: 30,
            padding: '12px 24px',
            background: '#38bdf8',
            color: '#020617',
            borderRadius: 8,
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          Get Started
        </a>
      </main>
    </Layout>
  );
}
