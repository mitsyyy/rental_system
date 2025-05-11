import React, { useState } from 'react';
import './styles/rooms.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function Rooms() {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      title: "Room 105",
      price: "₱15,000/mo",
      size: "250",
      bed: "Single bed",
      bath: "Private bathroom",
      location: "Makati",
      description: "Bright and airy room with large windows offering plenty of natural light. Features a comfortable single bed, private bathroom, and walk-in closet. Perfect for young professionals who want a clean, modern space in the heart of the city.",
      amenities: ["WiFi", "AC", "Laundry"],
      image: "/image/room1.jfif",
      status: "available",
      type: "Studio Room",
      leaseTerms: ["6 months", "12 months"],
      deposit: "₱15,000",
      utilities: "Included",
      moveInDate: "Immediate"
    },
    {
      id: 2,
      title: "Room 107",
      price: "₱12,000/mo",
      size: "220",
      bed: "Queen bed",
      bath: "Shared bathroom",
      location: "Quezon City",
      description: "Warm and inviting room with comfortable queen bed and shared bathroom. Features a study desk, bookshelf, and ample storage. Quiet neighborhood with easy access to public transportation.",
      amenities: ["WiFi", "Heating", "Kitchen"],
      image: "/image/room2.jfif",
      status: "occupied",
      type: "Standard Room",
      leaseTerms: ["12 months"],
      deposit: "₱12,000",
      utilities: "Not included",
      moveInDate: "Next month"
    },
    {
      id: 3,
      title: "Room 201",
      price: "₱18,000/mo",
      size: "400",
      bed: "King bed",
      bath: "Private bathroom",
      location: "BGC",
      description: "Spacious and luxurious room with high-end finishes. Features a king-size bed, private bathroom, and stunning city views. Perfect for those seeking premium accommodations.",
      amenities: ["WiFi", "AC", "Kitchen"],
      image: "/image/room3.jfif",
      status: "available",
      type: "Suite",
      leaseTerms: ["6 months", "12 months"],
      deposit: "₱18,000",
      utilities: "Included",
      moveInDate: "Next week"
    },
    {
      id: 4,
      title: "Room 203",
      price: "₱20,000/mo",
      size: "600",
      bed: "Queen bed",
      bath: "Private bathroom",
      location: "Pasig",
      description: "Stunning room with modern appliances, spacious living area, and private balcony. Experience luxury living in a prime location.",
      amenities: ["WiFi", "AC", "Parking"],
      image: "/image/room4.jfif",
      status: "available",
      type: "Apartment",
      leaseTerms: ["12 months"],
      deposit: "₱20,000",
      utilities: "Not included",
      moveInDate: "Immediate"
    }
  ]);

  const [filters, setFilters] = useState({
    type: "",
    location: "",
    availability: "",
    minPrice: 0,
    maxPrice: 2000,
    amenities: {
      wifi: false,
      ac: false,
      privateBathroom: false,
      kitchen: false,
      parking: false
    },
    sortBy: ""
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    moveInDate: "",
    leaseTerm: "",
    employment: "",
    notes: ""
  });

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleAmenityChange = (e) => {
    const { name, checked } = e.target;
    setFilters({
      ...filters,
      amenities: {
        ...filters.amenities,
        [name]: checked
      }
    });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: parseInt(value)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your rental application! Our team will contact you shortly.');
    setFormData({
      name: "",
      email: "",
      phone: "",
      moveInDate: "",
      leaseTerm: "",
      employment: "",
      notes: ""
    });
  };

  const clearFilters = () => {
    setFilters({
      type: "",
      location: "",
      availability: "",
      minPrice: 0,
      maxPrice: 2000,
      amenities: {
        wifi: false,
        ac: false,
        privateBathroom: false,
        kitchen: false,
        parking: false
      },
      sortBy: ""
    });
  };

  const filteredRooms = rooms.filter(room => {
    if (filters.type && room.type !== filters.type) return false;
    if (filters.location && room.location !== filters.location) return false;
    if (filters.availability && room.status !== filters.availability) return false;
    
    const price = parseInt(room.price.replace(/[^\d]/g, ''));
    if (price < filters.minPrice || price > filters.maxPrice) return false;
    
    if (filters.amenities.wifi && !room.amenities.includes('WiFi')) return false;
    if (filters.amenities.ac && !room.amenities.includes('AC')) return false;
    if (filters.amenities.privateBathroom && !room.bath.includes('Private')) return false;
    if (filters.amenities.kitchen && !room.amenities.includes('Kitchen')) return false;
    if (filters.amenities.parking && !room.amenities.includes('Parking')) return false;
    
    return true;
  });

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (filters.sortBy === 'price-asc') {
      return parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''));
    } else if (filters.sortBy === 'price-desc') {
      return parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, ''));
    } else if (filters.sortBy === 'size-asc') {
      return parseInt(a.size) - parseInt(b.size);
    } else if (filters.sortBy === 'size-desc') {
      return parseInt(b.size) - parseInt(a.size);
    }
    return 0;
  });

  return (
    <div className="rooms-page">
      {/* Navigation */}
      <Navbar alwaysWhite={true} />

      {/* Header */}
      <header className="rooms-header">
        <div className="rooms-header-container">
          <h1>Find Your Perfect Room</h1>
          <p>Browse our complete collection of rooms, apartments, and living spaces. Use filters to find exactly what you're looking for.</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="rooms-main">
        <div className="rooms-content">
          {/* Filters Sidebar */}
          <div className="rooms-sidebar">
            <div className="rooms-filters">
              <h3>Filters</h3>
              
              {/* Room Type Filter */}
              <div className="filter-group">
                <label className="filter-label">Room Type</label>
                <select 
                  className="filter-select"
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                >
                  <option value="">All Types</option>
                  <option value="Studio Room">Studio Room</option>
                  <option value="Standard Room">Standard Room</option>
                  <option value="Suite">Suite</option>
                  <option value="Apartment">Apartment</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="filter-group">
                <label className="filter-label">Price Range</label>
                <div className="price-range">
                  <div className="price-range-labels">
                    <span>$0</span>
                    <span>$2000</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="30000" 
                    step="100" 
                    value={filters.maxPrice}
                    onChange={(e) => handlePriceChange({ target: { name: 'maxPrice', value: e.target.value } })}
                  />
                  <div className="price-inputs">
                    <input 
                      type="number" 
                      className="price-input"
                      value={filters.minPrice}
                      onChange={(e) => handlePriceChange({ target: { name: 'minPrice', value: e.target.value } })}
                      min="0" 
                      max="30000" 
                    />
                    <span className="price-separator">to</span>
                    <input 
                      type="number" 
                      className="price-input"
                      value={filters.maxPrice}
                      onChange={(e) => handlePriceChange({ target: { name: 'maxPrice', value: e.target.value } })}
                      min="0" 
                      max="30000" 
                    />
                  </div>
                </div>
              </div>

              {/* Location Filter */}
              <div className="filter-group">
                <label className="filter-label">Location</label>
                <select 
                  className="filter-select"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                >
                  <option value="">All Locations</option>
                  <option value="Makati">Makati</option>
                  <option value="Quezon City">Quezon City</option>
                  <option value="BGC">BGC</option>
                  <option value="Pasig">Pasig</option>
                </select>
              </div>

              {/* Availability Filter */}
              <div className="filter-group">
                <label className="filter-label">Availability</label>
                <select 
                  className="filter-select"
                  name="availability"
                  value={filters.availability}
                  onChange={handleFilterChange}
                >
                  <option value="">Any Status</option>
                  <option value="available">Available Now</option>
                  <option value="occupied">Occupied</option>
                </select>
              </div>

              {/* Amenities Filter */}
              <div className="filter-group">
                <label className="filter-label">Amenities</label>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      className="checkbox-input"
                      name="wifi"
                      checked={filters.amenities.wifi}
                      onChange={handleAmenityChange}
                    />
                    <span className="checkbox-text">WiFi</span>
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      className="checkbox-input"
                      name="ac"
                      checked={filters.amenities.ac}
                      onChange={handleAmenityChange}
                    />
                    <span className="checkbox-text">Air Conditioning</span>
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      className="checkbox-input"
                      name="privateBathroom"
                      checked={filters.amenities.privateBathroom}
                      onChange={handleAmenityChange}
                    />
                    <span className="checkbox-text">Private Bathroom</span>
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      className="checkbox-input"
                      name="kitchen"
                      checked={filters.amenities.kitchen}
                      onChange={handleAmenityChange}
                    />
                    <span className="checkbox-text">Kitchen Access</span>
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      className="checkbox-input"
                      name="parking"
                      checked={filters.amenities.parking}
                      onChange={handleAmenityChange}
                    />
                    <span className="checkbox-text">Parking</span>
                  </label>
                </div>
              </div>

              {/* Sort By */}
              <div className="filter-group">
                <label className="filter-label">Sort By</label>
                <select 
                  className="filter-select"
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                >
                  <option value="">Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="size-asc">Size: Small to Large</option>
                  <option value="size-desc">Size: Large to Small</option>
                </select>
              </div>

              {/* Clear Filters Button */}
              <button 
                className="filter-btn"
                onClick={clearFilters}
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Rooms Grid */}
          <div className="rooms-grid-container">
            <div className="rooms-grid">
              {sortedRooms.map(room => (
                <div key={room.id} className="room-card">
                  <div className="room-image-container">
                    <img src={room.image} alt={room.title} className="room-image" />
                    <div className={`status-badge ${room.status === 'available' ? 'status-available' : 'status-occupied'}`}>
                      {room.status === 'available' ? 'Available' : 'Occupied'}
                    </div>
                    <div className="room-type-badge">
                      {room.type}
                    </div>
                  </div>
                  <div className="room-details">
                    <div className="room-header">
                      <h3 className="room-title">{room.title}</h3>
                      <span className="room-price">{room.price}</span>
                    </div>
                    <p className="room-info">{room.size} sqft • {room.bath} • {room.location}</p>
                    <div className="room-features">
                      {room.amenities.map((amenity, index) => (
                        <span key={index} className="feature-tag">{amenity}</span>
                      ))}
                    </div>
                    <button 
                      className="view-details-btn"
                      onClick={() => handleRoomClick(room)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="rooms-pagination">
              <nav className="pagination-nav">
                <button className="pagination-btn">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="pagination-btn active">1</button>
                <button className="pagination-btn">2</button>
                <button className="pagination-btn">3</button>
                <button className="pagination-btn">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <h2>Get Notified About New Rooms</h2>
          <p>Be the first to know when new rooms become available in your preferred location.</p>
          <form className="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-btn">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Room Modal */}
      {showModal && selectedRoom && (
        <div className="room-modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-inner">
              <div className="modal-header">
                <h2 className="modal-title">Room Details</h2>
                <button 
                  className="close-modal"
                  onClick={() => setShowModal(false)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="modal-grid">
                <div>
                  <div className="modal-image-container">
                    <img src={selectedRoom.image} alt={selectedRoom.title} className="modal-image" />
                  </div>
                  
                  <div className="room-specs-grid">
                    <div className="room-spec">
                      <i className="fas fa-ruler-combined spec-icon"></i>
                      <p className="spec-text">{selectedRoom.size} sqft</p>
                    </div>
                    <div className="room-spec">
                      <i className="fas fa-bed spec-icon"></i>
                      <p className="spec-text">{selectedRoom.bed}</p>
                    </div>
                    <div className="room-spec">
                      <i className="fas fa-bath spec-icon"></i>
                      <p className="spec-text">{selectedRoom.bath}</p>
                    </div>
                  </div>
                  
                  <div className="modal-section">
                    <h4 className="modal-section-title">Description</h4>
                    <p className="modal-description">{selectedRoom.description}</p>
                  </div>
                  
                  <div className="modal-section">
                    <h4 className="modal-section-title">Amenities</h4>
                    <div className="room-features">
                      {selectedRoom.amenities.map((amenity, index) => (
                        <span key={index} className="feature-tag">{amenity}</span>
                      ))}
                    </div>
                  </div>

                  <div className="rental-info">
                    <h4 className="rental-info-title">Rental Information</h4>
                    <div className="rental-info-item">
                      <span className="rental-info-label">Security Deposit:</span>
                      <span className="rental-info-value">{selectedRoom.deposit}</span>
                    </div>
                    <div className="rental-info-item">
                      <span className="rental-info-label">Utilities:</span>
                      <span className="rental-info-value">{selectedRoom.utilities}</span>
                    </div>
                    <div className="rental-info-item">
                      <span className="rental-info-label">Available From:</span>
                      <span className="rental-info-value">{selectedRoom.moveInDate}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="modal-room-title">{selectedRoom.title}</h3>
                  <p className="modal-room-price">{selectedRoom.price}</p>
                  <p className="modal-room-location">
                    <i className="fas fa-map-marker-alt location-icon"></i>
                    <span>{selectedRoom.location}</span>
                  </p>
                  
                  {/* Message for occupied rooms */}
                  {selectedRoom.status === 'occupied' ? (
                    <div className="occupied-message">
                      <i className="fas fa-exclamation-circle occupied-icon"></i>
                      This room is currently occupied. Please check back later or explore our other available rooms.
                    </div>
                  ) : (
                    <form className="rental-form" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input 
                          type="text" 
                          className="form-input"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input 
                          type="email" 
                          className="form-input"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input 
                          type="tel" 
                          className="form-input"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Desired Move-in Date</label>
                        <input 
                          type="date" 
                          className="form-input"
                          name="moveInDate"
                          value={formData.moveInDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Lease Term</label>
                        <select 
                          className="form-select"
                          name="leaseTerm"
                          value={formData.leaseTerm}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select lease term</option>
                          {selectedRoom.leaseTerms.map((term, index) => (
                            <option key={index} value={term}>{term}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Employment Status</label>
                        <select 
                          className="form-select"
                          name="employment"
                          value={formData.employment}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select status</option>
                          <option value="employed">Employed</option>
                          <option value="self-employed">Self-employed</option>
                          <option value="student">Student</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Additional Notes</label>
                        <textarea 
                          className="form-textarea"
                          rows="3"
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                      <button type="submit" className="submit-btn">
                        Submit Rental Application
                      </button>
                    </form>
                  )}
                  
                  <div className="manager-section">
                    <h4 className="manager-title">Contact Manager</h4>
                    <div className="manager-info">
                      <div className="manager-avatar">
                        <img src="/image/resident3.jfif" alt="Manager" className="manager-img" />
                      </div>
                      <div>
                        <p className="manager-name">Maria Santos</p>
                        <p className="manager-role">Property Manager</p>
                      </div>
                    </div>
                    <div className="manager-contact">
                      <a href="tel:+639123456789" className="contact-link">
                        <i className="fas fa-phone-alt contact-link-icon"></i> +63 912 345 6789
                      </a>
                      <a href="mailto:maria@fovere.com" className="contact-link">
                        <i className="fas fa-envelope contact-link-icon"></i> maria@fovere.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Rooms; 