import React, { useState } from 'react';
import axios from 'axios';

function Login({ onClose, onSwitch, onLoginSuccess }) {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/login`, {
                Email,
                Password
            });

            if (response.data.success) {
                const userData = response.data.user;
                localStorage.setItem('user', JSON.stringify(userData));
                onLoginSuccess(userData);
                onClose();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                <div className="auth-logo" style={{ textAlign: 'center' }}>
                    <img src="/logo.png" alt="WarriorHR" />
                </div>
                <h2>Welcome <span>Back</span></h2>
                <p className="subtitle">Login to access your strategic dashboard.</p>

                {error && <div style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.85rem', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="john@company.com"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="••••••••"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', opacity: loading ? 0.7 : 1 }}>
                        {loading ? 'Authenticating...' : 'Login Now'}
                    </button>
                </form>

                <p className="auth-footer">
                    Don't have an account? <button onClick={onSwitch}>Create one</button>
                </p>
            </div>
        </div>
    );
}

export default Login;
