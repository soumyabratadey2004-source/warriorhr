import React, { useState } from 'react';
import axios from 'axios';

function Register({ onClose, onSwitch, onLoginSuccess }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/register`, {
                FullName: name,
                Email: email,
                Password: password
            });

            if (response.data.success) {
                const userData = response.data.user;
                localStorage.setItem('user', JSON.stringify(userData));
                onLoginSuccess(userData);
                onClose();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
                <h2>Join the <span>Elite</span></h2>
                <p className="subtitle">Create your account for strategic workforce solutions.</p>

                {error && <div style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.85rem', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="john@company.com"
                            value={email}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', opacity: loading ? 0.7 : 1 }}>
                        {loading ? 'Processing...' : 'Create Account'}
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account? <button onClick={onSwitch}>Login</button>
                </p>
            </div>
        </div>
    );
}

export default Register;
