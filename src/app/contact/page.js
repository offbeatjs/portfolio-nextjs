'use client';

import React, { useState, useRef } from 'react';
import DarkAquamorphicBackground from '../components/DarkAquamorphicBackground';
import styles from './contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const honeypotRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    if (!formData.name.trim()) return 'Please enter your name.';
    if (!formData.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) return 'Please enter a valid email.';
    if (!formData.message.trim()) return 'Please enter a message.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // basic honeypot spam protection
    if (honeypotRef.current && honeypotRef.current.value) {
      // silent fail for bots
      return;
    }

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setIsSubmitting(true);
    try {
      // simulate network request
      await new Promise((res) => setTimeout(res, 1200));
      setSubmitted(true);
      // keep success message for a short time
      setTimeout(() => setSubmitted(false), 3500);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DarkAquamorphicBackground>

      <div className={styles.contact_page}>
        <div className={styles.container}>
          <header className={styles.contact_header}>
            <h1 className={styles.page_title}>Let’s build something great</h1>
            <p className={styles.page_subtitle}>Quick, simple, and human — drop a line and I’ll get back within a business day.</p>
          </header>

          <main className={styles.contact_content}>
            {/* Profile Card (simplified) */}
            <aside className={styles.profile_card} aria-labelledby="profile-name">
              <div className={styles.profile_avatar} aria-hidden>
                {/* <div className={styles.avatar_placeholder}>O</div> */}
                <img src="/cat.jpg" width="100" height="100" alt="Offbeat (Yash)" className={styles.avatar_image} />
                <span className={styles.online_indicator} aria-hidden></span>
              </div>

              <div className={styles.profile_info}>
                <h2 id="profile-name" className={styles.profile_name}>Offbeat (Yash)</h2>
                <div className={styles.profile_title}>Full‑stack · Freelancer</div>
                <div className={styles.profile_location}>Remote • Based in IN</div>

                <div className={styles.profile_stats}>
                  <div className={styles.stat_item}><div className={styles.stat_number}>50+</div><div className={styles.stat_label}>projects</div></div>
                  <div className={styles.stat_item}><div className={styles.stat_number}>4y</div><div className={styles.stat_label}>experience</div></div>
                  <div className={styles.stat_item}><div className={styles.stat_number}>24h</div><div className={styles.stat_label}>reply</div></div>
                </div>

                <nav className={styles.social_links} aria-label="Social links">
                  <a href="https://github.com/programmer-offbeat" target="_blank" rel="noreferrer" className={`${styles.social_icon} cursor-target`}>GitHub</a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={`${styles.social_icon} cursor-target`}>LinkedIn</a>
                </nav>
              </div>
            </aside>
            {/* Contact Form */}
            <section className={styles.form_card} aria-labelledby="form-title">
              <h3 id="form-title" className={styles.form_title}>Send a message</h3>
              <p className={styles.form_subtitle}>Tell me about your project — timelines, budget, and what you'd like to achieve.</p>

              <form className={styles.contact_form} onSubmit={handleSubmit} noValidate>
                {/* honeypot field */}
                <input type="text" name="website" ref={honeypotRef} tabIndex={-1} autoComplete="off" className={styles.honeypot} />

                <div className={styles.form_row}>
                  <div className={`${styles.form_group} ${formData.name ? styles.filled : ''}`}>
                    <label className={styles.form_label} htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" className={styles.form_input} value={formData.name} onChange={handleChange} autoComplete="name" aria-required="true" />
                  </div>

                  <div className={`${styles.form_group} ${formData.email ? styles.filled : ''}`}>
                    <label className={styles.form_label} htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" className={styles.form_input} value={formData.email} onChange={handleChange} autoComplete="email" aria-required="true" />
                  </div>
                </div>

                <div className={`${styles.form_group} ${formData.subject ? styles.filled : ''}`}>
                  <label className={styles.form_label} htmlFor="subject">Subject</label>
                  <input id="subject" name="subject" type="text" className={styles.form_input} value={formData.subject} onChange={handleChange} autoComplete="off" />
                </div>

                <div className={`${styles.form_group} ${formData.message ? styles.filled : ''}`}>
                  <label className={styles.form_label} htmlFor="message">Message</label>
                  <textarea id="message" name="message" className={styles.form_textarea} rows={6} value={formData.message} onChange={handleChange} aria-required="true"></textarea>
                </div>

                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <button type="submit" className={`${styles.submit_btn} cursor-target ${isSubmitting ? styles.submitting : ''}`} disabled={isSubmitting}>
                    <span className={styles.btn_label}>{isSubmitting ? 'Sending…' : submitted ? 'Sent ✓' : 'Send message'}</span>
                  </button>

                  {error && <div role="alert" className={styles.form_error}>{error}</div>}
                  {submitted && !error && <div role="status" className={styles.form_success}>Thanks — I’ll reply soon.</div>}
                </div>
              </form>
            </section>
          </main>
        </div>
      </div>
    </DarkAquamorphicBackground>
  );
}
