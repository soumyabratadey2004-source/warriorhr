import React, { useState, useEffect } from 'react'
import Login from './Login'
import Register from './Register'

function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      setShowLogin(true);
      return;
    }
    setSubmitted(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <div className={`site-wrapper ${showLogin || showRegister ? 'blur-content' : ''}`}>
      {/* Navbar */}
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="container">
          <div className="nav-container">
            <a href="/" className="logo-img">
              <img src="/logo.png" alt="WarriorHR Logo" />
            </a>

            <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
              <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
              <a href="#why-us" onClick={() => setMenuOpen(false)}>Why Us</a>
              <a href="#industries" onClick={() => setMenuOpen(false)}>Industries</a>
              <a href="#testimonials" onClick={() => setMenuOpen(false)}>Success Stories</a>
              {user ? (
                <div className="user-profile-container" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
                  <div className="profile-avatar">
                    {user.FullName ? user.FullName[0].toUpperCase() : user.Email[0].toUpperCase()}
                  </div>

                  {showProfileDropdown && (
                    <div className="profile-dropdown" onClick={(e) => e.stopPropagation()}>
                      <div className="dropdown-header">
                        <h4>{user.FullName}</h4>
                        <p>{user.Email}</p>
                      </div>
                      <div className="profile-details">
                        <div className="detail-item">
                          <span className="detail-label">Status:</span>
                          <span className="detail-value">Strategic Partner</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Member ID:</span>
                          <span className="detail-value">#{user.id?.slice(-6).toUpperCase()}</span>
                        </div>
                      </div>
                      <button onClick={handleLogout} className="logout-btn-dropdown">
                        <i className="fas fa-sign-out-alt" style={{ marginRight: '0.5rem' }}></i> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={() => { setShowRegister(true); setMenuOpen(false); }} className="btn btn-primary">Get Started</button>
              )}
            </nav>

            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
              <span style={{ opacity: menuOpen ? 0 : 1 }}></span>
              <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none' }}></span>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Full-Screen Hero Section */}
        <section className="hero">
          <div className="hero-overlay"></div>
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1920"
            alt="Strategic Recruitment"
            className="hero-bg"
          />
          <div className="container">
            <div className="hero-content">
              <h1>The <span>Pinnacle</span> of Strategic Workforce Solutions.</h1>
              <p>
                WarriorHR architects high-performance teams. We bridge the gap between human potential and organizational excellence through elite recruitment and managed services.
              </p>
              <div className="hero-actions">
                <a href="#contact" className="btn btn-primary">Partner With Us <i className="fas fa-arrow-right"></i></a>
                <a href="#services" className="btn btn-outline">Our Solutions</a>
              </div>
            </div>
          </div>

          <div className="stats-bar">
            <div className="container">
              <div className="stats-grid">
                <div className="stat-item">
                  <h3>12K+</h3>
                  <p>Placements</p>
                </div>
                <div className="stat-item">
                  <h3>500+</h3>
                  <p>Global Partners</p>
                </div>
                <div className="stat-item">
                  <h3>100%</h3>
                  <p>Compliance</p>
                </div>
                <div className="stat-item">
                  <h3>15+</h3>
                  <p>Years Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visually Rich Services (Requested Content & Format) */}
        <section className="section" id="services">
          <div className="container">
            <div className="section-head">
              <h2>Mastering the HR Lifecycle</h2>
              <p>Everything your business needs to manage, scale, and protect its most valuable asset—people.</p>
            </div>

            <div className="services-grid-2x2">
              {/* Recruitment */}
              <div className="service-card-rich">
                <div className="service-icon-box">
                  <i className="fas fa-user-check"></i>
                </div>
                <div className="service-info">
                  <h3>Recruitment</h3>
                  <p style={{ color: 'var(--primary)', fontWeight: 700, marginBottom: '0.5rem' }}>End-to-End Talent Acquisition</p>
                  <p>From C-suite executives to entry-level professionals, we identify, attract, and deliver the right candidates for your organization's unique needs — fast.</p>
                  <ul style={{ marginBottom: '1.5rem', display: 'grid', gap: '0.5rem', color: 'var(--text-muted)' }}>
                    <li><i className="fas fa-check" style={{ color: 'var(--accent)', fontSize: '0.8rem' }}></i> Executive Search & Headhunting</li>
                    <li><i className="fas fa-check" style={{ color: 'var(--accent)', fontSize: '0.8rem' }}></i> Bulk Hiring Campaigns</li>
                    <li><i className="fas fa-check" style={{ color: 'var(--accent)', fontSize: '0.8rem' }}></i> Campus Recruitment</li>
                    <li><i className="fas fa-check" style={{ color: 'var(--accent)', fontSize: '0.8rem' }}></i> Specialized Technical Roles</li>
                  </ul>
                  <a href="#contact" style={{ color: 'var(--primary)', fontWeight: 700 }}>Learn More <i className="fas fa-arrow-right" style={{ fontSize: '0.8rem' }}></i></a>
                </div>
              </div>

              {/* Payroll & Compliance */}
              <div className="service-card-rich">
                <div className="service-icon-box">
                  <i className="fas fa-file-invoice-dollar"></i>
                </div>
                <div className="service-info">
                  <h3>Payroll & Compliance</h3>
                  <p style={{ color: 'var(--primary)', fontWeight: 700, marginBottom: '0.5rem' }}>Accurate, Timely & Fully Compliant</p>
                  <p>Take the complexity out of payroll management. Our experts handle salary processing, statutory compliance, tax filings, and regulatory adherence with precision.</p>
                  <ul style={{ marginBottom: '1.5rem', display: 'grid', gap: '0.5rem', color: 'var(--text-muted)' }}>
                    <li><i className="fas fa-check" style={{ color: 'var(--accent)', fontSize: '0.8rem' }}></i> Salary Processing & Disbursement</li>
                    <li><i className="fas fa-check" style={{ color: 'var(--accent)', fontSize: '0.8rem' }}></i> PF, ESI & Statutory Compliance</li>
                    <li><i className="fas fa-check" style={{ color: 'var(--accent)', fontSize: '0.8rem' }}></i> TDS & Tax Filing Management</li>
                    <li><i className="fas fa-check" style={{ color: 'var(--accent)', fontSize: '0.8rem' }}></i> Compliance Audits & Reports</li>
                  </ul>
                  <a href="#contact" style={{ color: 'var(--primary)', fontWeight: 700 }}>Learn More <i className="fas fa-arrow-right" style={{ fontSize: '0.8rem' }}></i></a>
                </div>
              </div>

              {/* Facility Management */}
              <div className="service-card-rich">
                <div className="service-icon-box">
                  <i className="fas fa-building-shield"></i>
                </div>
                <div className="service-info">
                  <h3>Facility Management</h3>
                  <p style={{ color: 'var(--primary)', fontWeight: 700, marginBottom: '0.5rem' }}>Operational Excellence</p>
                  <p>Ensure your workplace is safe, functional, and productive. We provide comprehensive facility management services tailored to your business environment.</p>
                  <ul style={{ marginBottom: '1.5rem', display: 'grid', gap: '0.5rem', color: 'var(--text-muted)' }}>
                    <li><i className="fas fa-check" style={{ color: 'var(--accent)', fontSize: '0.8rem' }}></i> Housekeeping & Sanitation</li>
                    <li><i className="fas fa-check" style={{ color: 'var(--accent)', fontSize: '0.8rem' }}></i> Security & Access Management</li>
                    <li><i className="fas fa-check" style={{ color: 'var(--accent)', fontSize: '0.8rem' }}></i> Maintenance & Engineering</li>
                    <li><i className="fas fa-check" style={{ color: 'var(--accent)', fontSize: '0.8rem' }}></i> Cafeteria & Support Services</li>
                  </ul>
                  <a href="#contact" style={{ color: 'var(--primary)', fontWeight: 700 }}>Learn More <i className="fas fa-arrow-right" style={{ fontSize: '0.8rem' }}></i></a>
                </div>
              </div>

              {/* Staffing Solutions */}
              <div className="service-card-rich">
                <div className="service-icon-box">
                  <i className="fas fa-users-gear"></i>
                </div>
                <div className="service-info">
                  <h3>Staffing Solutions</h3>
                  <p style={{ color: 'var(--primary)', fontWeight: 700, marginBottom: '0.5rem' }}>Flexible Workforce Management</p>
                  <p>Scale your workforce up or down with confidence. Our contract, temporary, and permanent staffing solutions provide you with the right talent at the right time.</p>
                  <ul style={{ marginBottom: '1.5rem', display: 'grid', gap: '0.5rem', color: 'var(--text-muted)' }}>
                    <li><i className="fas fa-check" style={{ color: 'var(--accent)', fontSize: '0.8rem' }}></i> Contract & Temp Staffing</li>
                    <li><i className="fas fa-check" style={{ color: 'var(--accent)', fontSize: '0.8rem' }}></i> Project-Based Deployment</li>
                    <li><i className="fas fa-check" style={{ color: 'var(--accent)', fontSize: '0.8rem' }}></i> Payroll on Rolls Management</li>
                    <li><i className="fas fa-check" style={{ color: 'var(--accent)', fontSize: '0.8rem' }}></i> Labour Law Compliance</li>
                  </ul>
                  <a href="#contact" style={{ color: 'var(--primary)', fontWeight: 700 }}>Learn More <i className="fas fa-arrow-right" style={{ fontSize: '0.8rem' }}></i></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="section" style={{ background: 'var(--navy)' }} id="why-us">
          <div className="container">
            <div className="why-us-grid">
              <div className="performance-section">
                <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Engineered for <br /><span style={{ color: 'var(--primary)' }}>Results</span>.</h2>
                <div className="performance-bars">
                  <div className="bar-item">
                    <h4><span>Recruitment Accuracy</span> <span>98%</span></h4>
                    <div className="bar-track"><div className="bar-fill" style={{ width: '98%' }}></div></div>
                  </div>
                  <div className="bar-item">
                    <h4><span>Client Retention</span> <span>95%</span></h4>
                    <div className="bar-track"><div className="bar-fill" style={{ width: '95%' }}></div></div>
                  </div>
                  <div className="bar-item">
                    <h4><span>Compliance Score</span> <span>100%</span></h4>
                    <div className="bar-track"><div className="bar-fill" style={{ width: '100%' }}></div></div>
                  </div>
                </div>
              </div>

              <div className="features-6-grid">
                {[
                  { icon: 'fa-shield-halved', title: 'Zero Risk', desc: 'Total statutory & legal mitigation.' },
                  { icon: 'fa-bolt', title: 'Speed', desc: 'Positions filled in record time.' },
                  { icon: 'fa-microchip', title: 'Tech Powered', desc: 'AI-driven candidate matching.' },
                  { icon: 'fa-globe', title: 'Pan-India', desc: 'Delivery capability across the nation.' },
                  { icon: 'fa-user-astronaut', title: 'Elite Sourcing', desc: 'Access to passive leadership talent.' },
                  { icon: 'fa-headset', title: '24/7 Support', desc: 'Dedicated account management.' }
                ].map((f, i) => (
                  <div key={i} className="feature-mini">
                    <i className={`fas ${f.icon}`}></i>
                    <h5>{f.title}</h5>
                    <p>{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="section" id="industries">
          <div className="container">
            <div className="section-head">
              <h2>Specialization Across <span>Sectors</span></h2>
              <p>We provide deep domain expertise across diverse industrial landscapes.</p>
            </div>

            <div className="industries-grid">
              {[
                { icon: 'fa-laptop-code', name: 'IT & Software' },
                { icon: 'fa-microscope', name: 'Healthcare' },
                { icon: 'fa-gears', name: 'Manufacturing' },
                { icon: 'fa-building-columns', name: 'BFSI' },
                { icon: 'fa-cart-shopping', name: 'Retail' },
                { icon: 'fa-truck-fast', name: 'Logistics' },
                { icon: 'fa-plane-departure', name: 'Aviation' },
                { icon: 'fa-plug-circle-bolt', name: 'Energy' }
              ].map((ind, i) => (
                <div key={i} className="industry-card">
                  <i className={`fas ${ind.icon}`}></i>
                  <h4>{ind.name}</h4>
                </div>
              ))}
            </div>

            <div className="cta-banner">
              <h3>Don't See Your Industry?</h3>
              <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>Our strategic sourcing framework is adaptable to any complex sector.</p>
              <a href="#contact" className="btn btn-outline" style={{ borderColor: 'white' }}>Inquire for Custom Sector</a>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section" style={{ background: 'var(--navy-light)' }} id="testimonials">
          <div className="container">
            <div className="section-head">
              <h2>What Our <span>Partners</span> Say</h2>
            </div>
            <div className="testimonials-grid">
              {[
                { quote: "WarriorHR transformed our entire leadership team. Their precision in recruitment is unmatched in the Indian market.", author: "Rajesh V.", role: "CEO, TechVantage" },
                { quote: "The facility management services provided have reduced our operational overhead by 22% within the first year.", author: "Amit S.", role: "Operations Lead, Global Infra" },
                { quote: "Managing 5,000+ employees' payroll used to be a nightmare until we partnered with WarriorHR's compliance team.", author: "Sarah L.", role: "HR Director, Innovate Retail" }
              ].map((t, i) => (
                <div key={i} className="test-card">
                  <i className="fas fa-quote-left"></i>
                  <p className="test-text">"{t.quote}"</p>
                  <div className="test-author">
                    <div className="test-avatar"></div>
                    <div>
                      <strong>{t.author}</strong>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="section" id="contact">
          <div className="container">
            <div className="contact-container">
              <div className="contact-info-panel">
                <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Ready to <br /><span>Scale</span>?</h2>
                <p style={{ marginBottom: '3rem', opacity: 0.8 }}>Contact us today to receive a customized workforce architecture proposal.</p>

                <div style={{ display: 'grid', gap: '2rem' }}>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div className="service-icon-box" style={{ width: '50px', height: '50px', fontSize: '1rem' }}><i className="fas fa-phone"></i></div>
                    <div><p style={{ fontWeight: 700 }}>9147710090 / 03348158035</p><small>Available Mon - Sat</small></div>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div className="service-icon-box" style={{ width: '50px', height: '50px', fontSize: '1rem' }}><i className="fas fa-envelope"></i></div>
                    <div><p style={{ fontWeight: 700 }}>contact_us@warriorhr.in</p><small>Always open for inquiries</small></div>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div className="service-icon-box" style={{ width: '50px', height: '50px', fontSize: '1rem' }}><i className="fas fa-location-dot"></i></div>
                    <div><p style={{ fontWeight: 700 }}>Metropolitan Cooperative Housing Society,</p><small>P83 SecA, Kolkata - 700105</small></div>
                  </div>
                </div>
              </div>

              <div className="contact-form-panel">
                {!submitted ? (
                  <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" className="form-control" placeholder="Enter your name" required />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" className="form-control" placeholder="john@company.com" required />
                    </div>
                    <div className="form-group">
                      <label>Interested Service</label>
                      <select className="form-control" required>
                        <option value="">Select a service</option>
                        <option>Recruitment</option>
                        <option>Payroll & Compliance</option>
                        <option>Facility Management</option>
                        <option>Staffing Solutions</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Message</label>
                      <textarea className="form-control" rows="4" placeholder="How can we help?"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send Message</button>
                  </form>
                ) : (
                  <div className="success-message">
                    <i className="fas fa-circle-check"></i>
                    <h2>Proposal Request Sent!</h2>
                    <p>Our strategic consultant will contact you within 9-12 business hours.</p>
                    <button className="btn btn-outline" onClick={() => setSubmitted(false)} style={{ marginTop: '2rem' }}>Send Another Inquiry</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ background: 'var(--navy)' }}>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="/" className="footer-logo-img">
                <img src="/logo.png" alt="WarriorHR Logo" />
              </a>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                India's most trusted partner for high-performance workforce architecture and facility management solutions.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', fontSize: '1.25rem' }}>
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
              </div>
            </div>

            <div className="footer-group">
              <h4 className="f-title">Solutions</h4>
              <ul className="f-links">
                <li><a href="#">Recruitment</a></li>
                <li><a href="#">Compliance</a></li>
                <li><a href="#">Facility Management</a></li>
                <li><a href="#">Staffing</a></li>
              </ul>
            </div>

            <div className="footer-group">
              <h4 className="f-title">Company</h4>
              <ul className="f-links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Industries</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>

            <div className="footer-group">
              <h4 className="f-title">Legal</h4>
              <ul className="f-links">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Use</a></li>
                <li><a href="#">Compliance Policy</a></li>
                <li><a href="#">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 WarriorHR Services India Pvt Ltd. All rights reserved.</p>
            <p>Designed for Strategic Excellence</p>
          </div>
        </div>
      </footer>

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSwitch={() => { setShowLogin(false); setShowRegister(true); }}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          onSwitch={() => { setShowRegister(false); setShowLogin(true); }}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  )
}

export default Home