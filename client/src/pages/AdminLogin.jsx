import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Using the admin login endpoint
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL.replace('/api/users', '')}/api/admin/login`, {
                Email,
                Password
            });

            if (response.data.success) {
                const userData = { ...response.data.user, role: 'Admin' };
                localStorage.setItem('adminUser', JSON.stringify(userData));
                localStorage.setItem('adminToken', response.data.token);
                navigate('/admin-portal/admin');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Unauthorized access. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper admin-login-bg">
            <div className="modal-content admin-login-card">
                <div className="auth-logo" style={{ textAlign: 'center' }}>
                    <img src="/logo.png" alt="WarriorHR" />
                    <div className="admin-tag">ADMIN PORTAL</div>
                </div>

                <h2>Secure <span>Access</span></h2>
                <p className="subtitle">Enter your administrative credentials to continue.</p>

                {error && <div className="error-alert">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Administrative Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="admin@warrior.hr"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group password-group">
                        <label>Security Key</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                placeholder="••••••••"
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
                        {loading ? 'Verifying...' : 'Initialize Session'}
                    </button>
                </form>

                <div className="auth-footer" style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '2rem' }}>
                    <i className="fas fa-shield-alt"></i> Protected Environment
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
