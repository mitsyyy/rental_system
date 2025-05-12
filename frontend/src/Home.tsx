import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './styles/style.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

interface Room {
  id: number;
  title: string;
  price: string;
  size: string;
  bed: string;
  bath: string;
  floor: string;
  amenities: string[];
  image: string;
  status: 'available' | 'occupied';
  dateAdded: string;
  description: string;
  location: string;
  leaseTerms?: string[];
  deposit?: string;
  utilities?: string;
  moveInDate?: string;
  type?: string;
  furnishingStatus: 'fully furnished' | 'semi-furnished' | 'unfurnished';
  roomCount: string;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

interface TourForm {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  message: string;
}

interface Filters {
  location: string | null;
  price: string | null;
  type: string | null;
}

const Home: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<Filters>({
    location: null,
    price: null,
    type: null
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showBookTourModal, setShowBookTourModal] = useState<boolean>(false);
  const [tourForm, setTourForm] = useState<TourForm>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });

  const rooms: Room[] = [
    {
      id: 1,
      title: "Room 105",
      price: "₱15,000/mo",
      size: "28 sqm",
      bed: "Single bed",
      bath: "Private bathroom",
      floor: "1st Floor",
      amenities: ["WiFi", "AC", "Kitchenette", "Private Bathroom"],
      image: "/image/room1.jfif",
      status: "available",
      dateAdded: "3 days ago",
      description: "Bright and airy room with large windows offering plenty of natural light. Features a comfortable single bed, private bathroom, and walk-in closet. Perfect for students or young professionals.",
      location: "Fovere Residences",
      leaseTerms: ["12 months", "6 months", "month-to-month"],
      deposit: "₱15,000",
      utilities: "Included",
      moveInDate: "Immediate",
      type: "Studio Room",
      furnishingStatus: "fully furnished",
      roomCount: "1 room"
    },
    {
      id: 2,
      title: "Room 107",
      price: "₱12,000/mo",
      size: "25 sqm",
      bed: "Queen bed",
      bath: "Shared bathroom",
      floor: "1st Floor",
      amenities: ["WiFi", "AC", "Kitchenette"],
      image: "/image/room2.jfif",
      status: "occupied",
      dateAdded: "5 days ago",
      description: "Warm and inviting room with comfortable queen bed and shared bathroom. Features a study desk, bookshelf, and ample storage. Quiet neighborhood with easy access to public transportation.",
      location: "Fovere Residences",
      leaseTerms: ["12 months", "6 months"],
      deposit: "₱12,000",
      utilities: "Not included",
      moveInDate: "Next month",
      type: "Standard Room",
      furnishingStatus: "semi-furnished",
      roomCount: "1 room"
    },
    {
      id: 3,
      title: "Room 201",
      price: "₱18,000/mo",
      size: "35 sqm",
      bed: "Twin bed",
      bath: "Shared bathroom",
      floor: "2nd Floor",
      amenities: ["WiFi", "AC", "Balcony"],
      image: "/image/room3.jfif",
      status: "available",
      dateAdded: "1 week ago",
      description: "Efficiently designed room with twin bed, built-in storage, and shared bathroom (max 2 others). Includes a spacious area and small balcony with city view.",
      location: "Fovere Residences",
      leaseTerms: ["12 months", "6 months", "month-to-month", "weekly"],
      deposit: "₱18,000",
      utilities: "Included",
      moveInDate: "Next week",
      type: "Suite",
      furnishingStatus: "unfurnished",
      roomCount: "2 rooms"
    }
  ];

  const reviews: Review[] = [
    {
      id: 1,
      name: "Maria Santos",
      rating: 5,
      comment: "Amazing place! The room was exactly as described.",
      date: "April 2025",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 2,
      name: "Jose Rizal",
      rating: 4,
      comment: "Great location and very responsive management. Would definitely recommend!",
      date: "March 2025",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: 3,
      name: "Aime Santos",
      rating: 5,
      comment: "The best student housing I've experienced. Clean, modern, and well-maintained.",
      date: "May 2025",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg"
    }
  ];

  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  });

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', contactForm);
    setContactForm({ name: '', email: '', message: '' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar') as HTMLElement;
      if (navbar) {
        if (window.scrollY > 100) {
          navbar.style.backgroundColor = 'white';
          navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
          updateNavColors('dark');
        } else {
          navbar.style.backgroundColor = 'transparent';
          navbar.style.boxShadow = 'none';
          updateNavColors('light');
        }
      }
    };

    const updateNavColors = (theme: 'dark' | 'light') => {
      const elements = document.querySelectorAll('.nav-link:not(.active), .navbar-brand span');
      elements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.color = theme === 'dark' ? '#1e293b' : 'white';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFilter = (filterType: keyof Filters, filterValue: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === filterValue ? null : filterValue
    }));
  };

  const filteredRooms = rooms.filter(room => {
    return (!activeFilters.location || room.location === activeFilters.location) &&
           (!activeFilters.type || room.type === activeFilters.type);
  });

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const handleTourSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Tour booking submitted:', tourForm);
    setTourForm({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      message: ''
    });
    setShowBookTourModal(false);
    alert('Your tour has been booked! We will contact you shortly to confirm.');
  };

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

      {/* ROOMS SECTION */}
      <section id="rooms" className="section">
        <div className="container">
          <div className="section-title fade-in">
            <h2>Available <span className="gradient-text">Rooms</span></h2>
            <p>Sophisticated single-room residences designed for discerning individuals</p>
          </div>

          <div className="rooms-grid">
            {filteredRooms.map((room, index) => (
              <div 
                key={room.id} 
                className="room-card fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleRoomClick(room)}
              >
                <div className="room-image">
                  <img src={room.image} alt={room.title} />
                  <div className={`status-badge ${room.status === 'available' ? 'status-available' : 'status-occupied'}`}>
                    {room.status === 'available' ? 'Available' : 'Occupied'}
                  </div>
                </div>
                <div className="room-details">
                  <div className="room-header">
                    <h3 className="room-title">{room.title}</h3>
                    <span className="room-price">{room.price}</span>
                  </div>
                  <p className="room-specs">
                    {room.size} • {room.furnishingStatus} • {room.roomCount}
                  </p>
                  <p className="room-location">
                    <i className="fas fa-building"></i> {room.floor}
                  </p>
                  <div className="room-features">
                    {room.amenities.slice(0, 4).map((amenity, i) => (
                      <span key={i} className="feature-tag">{amenity}</span>
                    ))}
                  </div>
                  <button className="btn btn-secondary">View Details</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="view-all-container">
            <a href="/rooms" className="btn btn-primary view-all-btn">
              View All Rooms
            </a>
          </div>
        </div>
      </section>

      {/* ROOM MODAL */}
      {showModal && selectedRoom && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedRoom.title}</h3>
              <button onClick={() => setShowModal(false)} className="btn" aria-label="Close modal">×</button>
            </div>
            <div className="room-image">
              <img src={selectedRoom.image} alt={selectedRoom.title} />
            </div>
            <div className="room-details">
              <p className="room-price">{selectedRoom.price}</p>
              <p className="room-specs">
                {selectedRoom.size} • {selectedRoom.furnishingStatus} • {selectedRoom.roomCount}
              </p>
              <div className="room-location-info">
                <i className="fas fa-building"></i> 
                <span>{selectedRoom.floor} • Fovere Residences</span>
              </div>
              <p className="room-description">{selectedRoom.description}</p>
              <div className="room-features">
                {selectedRoom.amenities.map((amenity, i) => (
                  <span key={i} className="feature-tag">{amenity}</span>
                ))}
              </div>
              <button className="btn btn-primary">Schedule a Visit</button>
            </div>
          </div>
        </div>
      )}

      {/* REVIEWS */}
      <section id="reviews" className="section bg-light">
        <div className="container">
          <div className="section-title fade-in">
            <h2>Resident <span className="gradient-text">Experiences</span></h2>
            <p>Hear from our community of satisfied residents</p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar">
                  <img src="/image/resident1.jfif" alt="Sarah" />
                </div>
                <div className="testimonial-author">
                  <h4>Madeline O.</h4>
                  <p>Room 102 Resident</p>
                </div>
              </div>
              <p className="testimonial-text">"The attention to detail in these spaces is remarkable. My room has everything I need without feeling cluttered, and the shared amenities are truly premium quality."</p>
              <div className="testimonial-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar">
                  <img src="/image/resident2.jfif" alt="Michael" />
                </div>
                <div className="testimonial-author">
                  <h4>Kaizer J.</h4>
                  <p>Room 105 Resident</p>
                </div>
              </div>
              <p className="testimonial-text">"As a professional who values both privacy and community, Fovere strikes the perfect balance. The minimalist design helps me focus, while the common areas facilitate great connections."</p>
              <div className="testimonial-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to find your perfect room?</h2>
            <p>Join our community of happy residents. Schedule a viewing today and experience the Fovere difference.</p>
            <div className="cta-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => setShowBookTourModal(true)}
              >
                <i className="fas fa-calendar-alt"></i> Book a Tour
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section bg-white">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Contact <span className="gradient-text">Our Team</span></h2>
              <p>Our leasing specialists are available to answer your questions and help you find your ideal space.</p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-text">
                    <h4>Our Location</h4>
                    <p>St. Briones Street<br />Brgy. Poblacion, San Pablo City</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="contact-text">
                    <h4>Contact Us</h4>
                    <p>+63 917 123 4567<br />info@fovere.com</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="contact-text">
                    <h4>Office Hours</h4>
                    <p>Monday - Friday: 9am - 6pm<br />Saturday: 10am - 4pm</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-form-container">
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="form-control"
                    value={contactForm.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setContactForm({...contactForm, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="form-control"
                    value={contactForm.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setContactForm({...contactForm, email: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="form-control"
                    value={contactForm.message}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContactForm({...contactForm, message: e.target.value})}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* BOOK TOUR MODAL */}
      {showBookTourModal && (
        <div className="modal" onClick={() => setShowBookTourModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Book a Tour</h3>
              <button onClick={() => setShowBookTourModal(false)} className="btn" aria-label="Close modal">×</button>
            </div>
            <div className="modal-body">
              <p>Schedule a tour with one of our leasing specialists to view our available rooms.</p>
              <form className="tour-form" onSubmit={handleTourSubmit}>
                <div className="form-group">
                  <label htmlFor="tour-name">Name</label>
                  <input 
                    type="text" 
                    id="tour-name" 
                    className="form-control"
                    value={tourForm.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTourForm({...tourForm, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tour-email">Email</label>
                  <input 
                    type="email" 
                    id="tour-email" 
                    className="form-control"
                    value={tourForm.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTourForm({...tourForm, email: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tour-phone">Phone</label>
                  <input 
                    type="tel" 
                    id="tour-phone" 
                    className="form-control"
                    value={tourForm.phone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTourForm({...tourForm, phone: e.target.value})}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group half">
                    <label htmlFor="tour-date">Preferred Date</label>
                    <input 
                      type="date" 
                      id="tour-date" 
                      className="form-control"
                      value={tourForm.date}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setTourForm({...tourForm, date: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group half">
                    <label htmlFor="tour-time">Preferred Time</label>
                    <select 
                      id="tour-time" 
                      className="form-control"
                      value={tourForm.time}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => setTourForm({...tourForm, time: e.target.value})}
                      required
                    >
                      <option value="">Select a time</option>
                      <option value="9:00 AM">9:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="tour-message">Additional Information</label>
                  <textarea 
                    id="tour-message" 
                    rows={3} 
                    className="form-control"
                    placeholder="Let us know what type of room you're interested in"
                    value={tourForm.message}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setTourForm({...tourForm, message: e.target.value})}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Book Tour</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home; 