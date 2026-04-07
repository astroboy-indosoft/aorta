import { useState } from 'react';

export default function Register() {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.firstname || !form.lastname || !form.email || !form.password || !form.confirmPassword) {
      return setError('All fields are required');
    }

    if (form.password !== form.confirmPassword) {
      return setError('Password confirmation does not match');
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstname: form.firstname,
          lastname: form.lastname,
          email: form.email.toLowerCase(),
          password: form.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      window.location.href = '/login';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0f172a', color: '#e2e8f0' }}>
      <form onSubmit={handleSubmit} style={{ background: '#020617', padding: 30, borderRadius: 8, width: 320 }}>
        <h2 style={{ marginBottom: 20 }}>Register</h2>

        <input name="firstname" placeholder="Firstname" onChange={handleChange} style={inputStyle} />
        <input name="lastname" placeholder="Lastname" onChange={handleChange} style={inputStyle} />
        <input name="email" placeholder="Email" onChange={handleChange} style={inputStyle} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} style={inputStyle} />
        <input name="confirmPassword" type="password" placeholder="Password Confirmation" onChange={handleChange} style={inputStyle} />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: 10,
  marginBottom: 10,
  borderRadius: 4,
  border: '1px solid #334155'
};

const buttonStyle = {
  width: '100%',
  padding: 10,
  borderRadius: 4,
  background: '#38bdf8',
  border: 'none',
  fontWeight: 'bold'
};
