import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Admin() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeServices: 4,
        conversionRate: '24%',
        revenue: '$12.4k'
    });
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        // Security Check: Redirect to login if not authenticated as Admin
        const adminUser = JSON.parse(localStorage.getItem('adminUser'));
        const adminToken = localStorage.getItem('adminToken');

        if (!adminUser || !adminToken || adminUser.role !== 'Admin') {
            navigate('/admin-portal/login');
            return;
        }
        setAdmin(adminUser);

        // Fetch users from API
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data.success) {
                    setUsers(response.data.users);
                }
            } catch (err) {
                console.error("Error fetching registered users:", err);
                if (err.response?.status === 401) {
                    // Token expired or invalid
                    localStorage.removeItem('adminUser');
                    localStorage.removeItem('adminToken');
                    navigate('/admin-portal/login');
                }
            }
        };

        fetchUsers();
    }, [navigate]);

    return (
        <div className="admin-layout">
            {/* Admin Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-logo">
                    <img src="/logo.png" alt="WarriorHR" />
                    <span>Control Panel</span>
                </div>
                <nav className="admin-nav">
                    <button
                        className={activeTab === 'dashboard' ? 'active' : ''}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        <i className="fas fa-th-large"></i> Dashboard
                    </button>
                    <button
                        className={activeTab === 'users' ? 'active' : ''}
                        onClick={() => setActiveTab('users')}
                    >
                        <i className="fas fa-users"></i> Users
                    </button>
                    <button
                        className={activeTab === 'services' ? 'active' : ''}
                        onClick={() => setActiveTab('services')}
                    >
                        <i className="fas fa-briefcase"></i> Services
                    </button>
                    <button
                        className={activeTab === 'analytics' ? 'active' : ''}
                        onClick={() => setActiveTab('analytics')}
                    >
                        <i className="fas fa-chart-line"></i> Analytics
                    </button>
                    <div className="nav-divider"></div>
                    <button onClick={() => {
                        localStorage.removeItem('adminUser');
                        localStorage.removeItem('adminToken');
                        navigate('/admin-portal/login');
                    }}>
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                    <button onClick={() => navigate('/')}>
                        <i className="fas fa-external-link-alt"></i> View Site
                    </button>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="admin-main">
                <header className="admin-header">
                    <div className="header-search">
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Search data points..." />
                    </div>
                    <div className="admin-user-info">
                        <span>{admin ? admin.FullName : 'Administrator'}</span>
                        <div className="admin-avatar">
                            {admin ? admin.FullName[0].toUpperCase() : 'A'}
                        </div>
                    </div>
                </header>

                <div className="admin-content">
                    {activeTab === 'dashboard' && (
                        <div className="dashboard-view">
                            <h2 className="view-title">Strategic <span>Overview</span></h2>
                            <div className="stats-grid-admin">
                                <div className="stat-card-admin">
                                    <div className="stat-icon"><i className="fas fa-user-friends"></i></div>
                                    <div className="stat-info">
                                        <p>Total Personnel</p>
                                        <h3>{users.length}</h3>
                                    </div>
                                </div>
                                <div className="stat-card-admin">
                                    <div className="stat-icon"><i className="fas fa-tasks"></i></div>
                                    <div className="stat-info">
                                        <p>Active Mandates</p>
                                        <h3>{stats.activeServices}</h3>
                                    </div>
                                </div>
                                <div className="stat-card-admin">
                                    <div className="stat-icon"><i className="fas fa-percentage"></i></div>
                                    <div className="stat-info">
                                        <p>Efficiency Rate</p>
                                        <h3>{stats.conversionRate}</h3>
                                    </div>
                                </div>
                                <div className="stat-card-admin">
                                    <div className="stat-icon"><i className="fas fa-shield-alt"></i></div>
                                    <div className="stat-info">
                                        <p>System Status</p>
                                        <h3 style={{ color: '#22c55e' }}>Secure</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="admin-section">
                                <h3>Recent Activity</h3>
                                <div className="activity-list">
                                    <div className="activity-item">
                                        <div className="activity-marker"></div>
                                        <div className="activity-text">New strategic partner registered: <b>Jane Smith</b></div>
                                        <div className="activity-time">2 mins ago</div>
                                    </div>
                                    <div className="activity-item">
                                        <div className="activity-marker"></div>
                                        <div className="activity-text">Mandate updated: <b>Executive Talent Acquisition</b></div>
                                        <div className="activity-time">1 hour ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div className="users-view">
                            <h2 className="view-title">Personnel <span>Management</span></h2>
                            <div className="table-container">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Full Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.length > 0 ? users.map(u => (
                                            <tr key={u._id}>
                                                <td>#{u._id.slice(-6).toUpperCase()}</td>
                                                <td className="bold">{u.FullName}</td>
                                                <td>{u.Email}</td>
                                                <td><span className={`badge badge-${u.role?.toLowerCase() || 'user'}`}>{u.role || 'User'}</span></td>
                                                <td><span className="dot active"></span> Active</td>
                                                <td>
                                                    <button className="btn-icon"><i className="fas fa-edit"></i></button>
                                                    <button className="btn-icon delete"><i className="fas fa-trash"></i></button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                                                    No registered personnel found in the directory.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Placeholder for other tabs */}
                    {(activeTab === 'services' || activeTab === 'analytics') && (
                        <div className="placeholder-view">
                            <h2 className="view-title">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} <span>Module</span></h2>
                            <p>This strategic module is under maintenance or development.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Admin;
