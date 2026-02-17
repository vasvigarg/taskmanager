import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../api/authService';

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await authService.register(email, password);
            // After registration, redirect to login
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Registration failed');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px', marginTop: '10vh' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Register</h1>
            <div className="bw-card">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                        <input
                            type="email"
                            className="bw-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
                        <input
                            type="password"
                            className="bw-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p style={{ color: 'red', fontSize: '0.875rem' }}>{error}</p>}
                    <button type="submit" className="bw-button bw-button-primary">Register</button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem' }}>
                    Already have an account? <Link to="/login" style={{ textDecoration: 'underline' }}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
