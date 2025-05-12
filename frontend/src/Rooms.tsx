import React, { useState, ChangeEvent, FormEvent } from 'react';
import './styles/rooms.css';
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
  location: string;
  description: string;
  amenities: string[];
  image: string;
  status: 'available' | 'occupied';
  dateAdded: string;
  leaseTerms: string[];
  deposit: string;
  utilities: string;
  moveInDate: string;
  furnishingStatus: 'fully furnished' | 'semi-furnished' | 'unfurnished';
  roomCount: string;
}

interface Filters {
  floor: string;
  availability: string;
  minPrice: number;
  maxPrice: number;
  furnishingStatus: string;
  amenities: {
    wifi: boolean;
    ac: boolean;
    privateBathroom: boolean;
    kitchenette: boolean;
    balcony: boolean;
  };
  sortBy: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  moveInDate: string;
  leaseTerm: string;
  employment: string;
  notes: string;
}

function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 1,
      title: "Room 105",
      price: "₱15,000/mo",
      size: "28 sqm",
      bed: "Single bed",
      bath: "Private bathroom",
      floor: "1st Floor",
      location: "Fovere Residences",
      description: "Bright and airy room with large windows offering plenty of natural light. Features a comfortable single bed, private bathroom, and walk-in closet. Perfect for students or young professionals.",
      amenities: ["WiFi", "AC", "Kitchenette", "Private Bathroom"],
      image: "/image/room1.jfif",
      status: "available",
      dateAdded: "3 days ago",
      leaseTerms: ["12 months", "6 months", "month-to-month"],
      deposit: "₱15,000",
      utilities: "Included",
      moveInDate: "Immediate",
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
      location: "Fovere Residences",
      description: "Warm and inviting room with comfortable queen bed and shared bathroom. Features a study desk, bookshelf, and ample storage. Quiet neighborhood with easy access to public transportation.",
      amenities: ["WiFi", "AC", "Kitchenette"],
      image: "/image/room2.jfif",
      status: "occupied",
      dateAdded: "5 days ago",
      leaseTerms: ["12 months", "6 months"],
      deposit: "₱12,000",
      utilities: "Not included",
      moveInDate: "Next month",
      furnishingStatus: "semi-furnished",
      roomCount: "1 room"
    },
    {
      id: 3,
      title: "Room 201",
      price: "₱18,000/mo",
      size: "35 sqm",
      bed: "King bed",
      bath: "Shared bathroom",
      floor: "2nd Floor",
      location: "Fovere Residences",
      description: "Efficiently designed room with twin bed, built-in storage, and shared bathroom (max 2 others). Includes a spacious area and small balcony with city view.",
      amenities: ["WiFi", "AC", "Balcony"],
      image: "/image/room3.jfif",
      status: "available",
      dateAdded: "1 week ago",
      leaseTerms: ["12 months", "6 months", "month-to-month", "weekly"],
      deposit: "₱18,000",
      utilities: "Included",
      moveInDate: "Next week",
      furnishingStatus: "unfurnished",
      roomCount: "2 rooms"
    },
    {
      id: 4,
      title: "Room 203",
      price: "₱20,000/mo",
      size: "40 sqm",
      bed: "Queen bed",
      bath: "Private bathroom",
      floor: "2nd Floor",
      location: "Fovere Residences",
      description: "Stunning corner room with modern appliances, spacious living area, and private bathroom. Features a well-equipped kitchenette and reserved parking spot.",
      amenities: ["WiFi", "AC", "Kitchenette", "Balcony", "Private Bathroom"],
      image: "/image/room4.jfif",
      status: "available",
      dateAdded: "2 weeks ago",
      leaseTerms: ["12 months", "6 months", "weekly"],
      deposit: "₱20,000",
      utilities: "Not included",
      moveInDate: "Immediate",
      furnishingStatus: "fully furnished",
      roomCount: "3 rooms"
    },
    {
      id: 5,
      title: "Room 301",
      price: "₱22,000/mo",
      size: "45 sqm",
      bed: "King bed",
      bath: "Private bathroom",
      floor: "3rd Floor",
      location: "Fovere Residences",
      description: "Luxurious corner unit with panoramic views. Features a king-size bed, spacious private bathroom, and premium furnishings throughout.",
      amenities: ["WiFi", "AC", "Kitchenette", "Balcony", "Private Bathroom"],
      image: "/image/room1.jfif",
      status: "available",
      dateAdded: "1 day ago",
      leaseTerms: ["12 months", "6 months", "month-to-month"],
      deposit: "₱22,000",
      utilities: "Included",
      moveInDate: "Immediate",
      furnishingStatus: "fully furnished",
      roomCount: "2 rooms"
    }
  ]);

  const [filters, setFilters] = useState<Filters>({
    floor: "",
    availability: "",
    minPrice: 0,
    maxPrice: 25000,
    furnishingStatus: "",
    amenities: {
      wifi: false,
      ac: false,
      privateBathroom: false,
      kitchenette: false,
      balcony: false
    },
    sortBy: ""
  });

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    moveInDate: "",
    leaseTerm: "",
    employment: "",
    notes: ""
  });

  const handleRoomClick = (room: Room): void => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleAmenityChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = e.target;
    setFilters({
      ...filters,
      amenities: {
        ...filters.amenities,
        [name]: checked
      }
    });
  };

  const handlePriceChange = (e: { target: { name: string; value: string } }): void => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: parseInt(value)
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
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

  const clearFilters = (): void => {
    setFilters({
      floor: "",
      availability: "",
      minPrice: 0,
      maxPrice: 25000,
      furnishingStatus: "",
      amenities: {
        wifi: false,
        ac: false,
        privateBathroom: false,
        kitchenette: false,
        balcony: false
      },
      sortBy: ""
    });
  };

  const filteredRooms = rooms.filter(room => {
    if (filters.floor && room.floor !== filters.floor) return false;
    if (filters.availability && room.status !== filters.availability) return false;
    if (filters.furnishingStatus && room.furnishingStatus !== filters.furnishingStatus) return false;
    
    const price = parseInt(room.price.replace(/[^\d]/g, ''));
    if (price < filters.minPrice || price > filters.maxPrice) return false;
    
    if (filters.amenities.wifi && !room.amenities.includes('WiFi')) return false;
    if (filters.amenities.ac && !room.amenities.includes('AC')) return false;
    if (filters.amenities.privateBathroom && !room.amenities.includes('Private Bathroom')) return false;
    if (filters.amenities.kitchenette && !room.amenities.includes('Kitchenette')) return false;
    if (filters.amenities.balcony && !room.amenities.includes('Balcony')) return false;
    
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
              
              {/* Price Range Filter */}
              <div className="filter-group">
                <label className="filter-label">Price Range</label>
                <div className="price-range">
                  <div className="price-range-labels">
                    <span>₱0</span>
                    <span>₱25,000</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="25000" 
                    step="1000" 
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
                      max="25000" 
                    />
                    <span className="price-separator">to</span>
                    <input 
                      type="number" 
                      className="price-input"
                      value={filters.maxPrice}
                      onChange={(e) => handlePriceChange({ target: { name: 'maxPrice', value: e.target.value } })}
                      min="0" 
                      max="25000" 
                    />
                  </div>
                </div>
              </div>

              {/* Floor Filter */}
              <div className="filter-group">
                <label className="filter-label">Floor</label>
                <select 
                  className="filter-select"
                  name="floor"
                  value={filters.floor}
                  onChange={handleFilterChange}
                >
                  <option value="">All Floors</option>
                  <option value="1st Floor">1st Floor</option>
                  <option value="2nd Floor">2nd Floor</option>
                  <option value="3rd Floor">3rd Floor</option>
                </select>
              </div>

              {/* Furnishing Status Filter */}
              <div className="filter-group">
                <label className="filter-label">Furnishing Status</label>
                <select 
                  className="filter-select"
                  name="furnishingStatus"
                  value={filters.furnishingStatus}
                  onChange={handleFilterChange}
                >
                  <option value="">Any Status</option>
                  <option value="fully furnished">Fully Furnished</option>
                  <option value="semi-furnished">Semi-Furnished</option>
                  <option value="unfurnished">Unfurnished</option>
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
                      name="kitchenette"
                      checked={filters.amenities.kitchenette}
                      onChange={handleAmenityChange}
                    />
                    <span className="checkbox-text">Kitchenette</span>
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      className="checkbox-input"
                      name="balcony"
                      checked={filters.amenities.balcony}
                      onChange={handleAmenityChange}
                    />
                    <span className="checkbox-text">Balcony</span>
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
                  </div>
                  <div className="room-details">
                    <div className="room-header">
                      <h3 className="room-title">{room.title}</h3>
                      <span className="room-price">{room.price}</span>
                    </div>
                    <p className="room-info">{room.size} • {room.furnishingStatus} • {room.roomCount}</p>
                    <p className="room-location">
                      <i className="fas fa-building"></i> {room.floor}
                    </p>
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
                      <p className="spec-text">{selectedRoom.size}</p>
                    </div>
                    <div className="room-spec">
                      <i className="fas fa-couch spec-icon"></i>
                      <p className="spec-text">{selectedRoom.furnishingStatus}</p>
                    </div>
                    <div className="room-spec">
                      <i className="fas fa-door-open spec-icon"></i>
                      <p className="spec-text">{selectedRoom.roomCount}</p>
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
                    <div className="rental-info-item">
                      <span className="rental-info-label">Date Added:</span>
                      <span className="rental-info-value">{selectedRoom.dateAdded}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="modal-room-title">{selectedRoom.title}</h3>
                  <p className="modal-room-price">{selectedRoom.price}</p>
                  <p className="modal-room-floor">
                    <i className="fas fa-building"></i>
                    <span>{selectedRoom.floor}</span>
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
                          rows={3}
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