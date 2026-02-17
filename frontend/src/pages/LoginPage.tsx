import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../api/authService';

const LoginPage: React.FC = () => {
    // let userEmail;
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const data = await authService.login(email, password);
            localStorage.setItem('token', data.access_token);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to login');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px', marginTop: '10vh' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Login</h1>
            <div className="bw-card">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                        <input
                            type="email"
                            className="bw-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            // onChange={(e) => userEmail = e.target.value}
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
                    <button type="submit" className="bw-button bw-button-primary">Login</button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem' }}>
                    Don't have an account? <Link to="/register" style={{ textDecoration: 'underline' }}>Register</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
