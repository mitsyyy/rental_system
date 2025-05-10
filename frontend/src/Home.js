import React, { useEffect } from 'react';
import './styles/style.css';
import Navbar from './components/Navbar';

function Home() {
    useEffect(() => {
        // MOBILE RESPOSIVE NAVBAR
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // ACTIVE BUTTONS
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        const handleScroll = () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.classList.add('bg-slate-900/90');
            } else {
                nav.classList.remove('bg-slate-900/90');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.removeEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden');
                });
            }
        };
    }, []);

    return (
        <div className="app-container">
            {/* NAVBAR */}
            <Navbar />

            {/* HERO SECTION */}
            <section className="hero-section">
                <div className="hero-container">
                    <div className="hero-content slide-up">
                        <h1 className="hero-title">
                            Refined apartment <br />
                            <span className="gradient-text">living spaces</span>
                        </h1>
                        <p className="hero-description">
                            Affordable and cozy apartment in a quiet, family-friendly neighborhood.
                        </p>
                        <div className="hero-buttons">
                            <a href="#rooms" className="btn btn-primary">Browse Rooms</a>
                        </div>
                    </div>
                    <div className="images-grid">
                        <div className="image-column">
                            <div className="room-image">
                                <img src="/image/room1.jfif" alt="Room 1" />
                            </div>
                            <div className="room-image">
                                <img src="/image/room2.jfif" alt="Room 2" />
                            </div>
                        </div>
                        <div className="image-column">
                            <div className="room-image">
                                <img src="/image/room3.jfif" alt="Room 3" />
                            </div>
                            <div className="room-image">
                                <img src="/image/room4.jfif" alt="Room 4" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home; 