import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './styles/ListYourRoom.css';

function FavoriteRooms() {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: "Room 105",
      price: "₱15,000/mo",
      size: "28 sqm",
      bed: "Single bed",
      bath: "Private bathroom",
      floor: "1st Floor",
      amenities: ["WiFi", "AC", "Study Desk", "Closet"],
      image: "/image/room1.jfif",
      status: "available",
      dateAdded: "3 days ago",
      description: "Bright and airy room with large windows offering plenty of natural light. Features a comfortable single bed, private bathroom, and walk-in closet. Perfect for students or young professionals."
    },
    {
      id: 3,
      title: "Room 201",
      price: "₱18,000/mo",
      size: "35 sqm",
      bed: "Twin bed",
      bath: "Shared bathroom",
      floor: "2nd Floor",
      amenities: ["WiFi", "AC", "Study Area", "Balcony"],
      image: "/image/room3.jfif",
      status: "available",
      dateAdded: "1 week ago",
      description: "Efficiently designed room with twin bed, built-in storage, and shared bathroom (max 2 others). Includes a spacious study area and small balcony with city view."
    },
    {
      id: 4,
      title: "Room 203",
      price: "₱20,000/mo",
      size: "40 sqm",
      bed: "Queen bed",
      bath: "Private bathroom",
      floor: "2nd Floor",
      amenities: ["WiFi", "AC", "Kitchen", "Parking"],
      image: "/image/room4.jfif",
      status: "available",
      dateAdded: "2 weeks ago",
      description: "Stunning corner room with modern appliances, spacious living area, and private bathroom. Features a well-equipped kitchenette and reserved parking spot."
    }
  ]);

  const [viewMode, setViewMode] = useState('grid');
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const removeFromFavorite = (id, event) => {
    if (event) event.stopPropagation();
    setFavorites(favorites.filter(room => room.id !== id));
    if (selectedRoom && selectedRoom.id === id) {
      setShowModal(false);
    }
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  return (
    <div className="favorite-rooms-page">
      <Navbar alwaysWhite={true} />
      
      <div className="favorite-rooms-header">
        <div className="container">
          <h1>Favorite Rooms</h1>
          <p>Your saved rooms at Fovere Residences</p>
        </div>
      </div>
      
      <div className="favorite-rooms-content container">
        {favorites.length > 0 ? (
          <>
            <div className="favorite-rooms-toolbar">
              <div className="favorite-count">
                <span>{favorites.length} saved room{favorites.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="view-controls">
                <button 
                  className={`view-control-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <i className="fas fa-th-large"></i>
                </button>
                <button 
                  className={`view-control-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <i className="fas fa-list"></i>
                </button>
              </div>
            </div>

            <div className={`favorite-rooms-${viewMode}`}>
              {favorites.map((room) => (
                <div key={room.id} className="favorite-room-card" onClick={() => handleRoomClick(room)}>
                  <div className="favorite-room-image">
                    <img src={room.image} alt={room.title} />
                    <button 
                      className="remove-favorite-btn"
                      onClick={(e) => removeFromFavorite(room.id, e)}
                      aria-label="Remove from favorites"
                    >
                      <i className="fas fa-heart-broken"></i>
                    </button>
                    {room.status === 'available' ? (
                      <span className="status-badge status-available">Available</span>
                    ) : (
                      <span className="status-badge status-occupied">Occupied</span>
                    )}
                  </div>
                  
                  <div className="favorite-room-details">
                    <div className="room-header">
                      <h3 className="room-title">{room.title}</h3>
                      <span className="room-price">{room.price}</span>
                    </div>
                    
                    <p className="room-location">
                      <i className="fas fa-building"></i> {room.floor}
                    </p>
                    
                    <p className="room-specs">
                      {room.size} • {room.bed} • {room.bath}
                    </p>
                    
                    <div className="room-features">
                      {room.amenities.map((amenity, index) => (
                        <span key={index} className="feature-tag">{amenity}</span>
                      ))}
                    </div>
                    
                    <div className="favorite-room-actions">
                      <button 
                        className="view-details-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRoomClick(room);
                        }}
                      >
                        View Details
                      </button>
                      <span className="date-added">Added {room.dateAdded}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="no-favorites">
            <div className="no-favorites-icon">
              <i className="fas fa-heart"></i>
            </div>
            <h2>No favorite rooms yet</h2>
            <p>Save rooms you like to find them later here</p>
            <Link to="/rooms" className="browse-rooms-btn">Browse Rooms</Link>
          </div>
        )}
      </div>

      {/* Room Details Modal */}
      {showModal && selectedRoom && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedRoom.title}</h3>
              <button onClick={() => setShowModal(false)} className="btn" aria-label="Close modal">×</button>
            </div>
            <div className="room-image">
              <img src={selectedRoom.image} alt={selectedRoom.title} />
              {selectedRoom.status === 'available' ? (
                <span className="status-badge status-available modal-badge">Available</span>
              ) : (
                <span className="status-badge status-occupied modal-badge">Occupied</span>
              )}
            </div>
            <div className="room-details">
              <p className="room-price">{selectedRoom.price}</p>
              <p className="room-specs">
                {selectedRoom.size} • {selectedRoom.bed} • {selectedRoom.bath}
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
              <div className="modal-actions">
                <Link to={`/rooms/${selectedRoom.id}`} className="btn btn-primary">Schedule a Visit</Link>
                <button 
                  className="remove-from-favorites"
                  onClick={(e) => removeFromFavorite(selectedRoom.id, e)}
                >
                  <i className="fas fa-heart-broken"></i> Remove from Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}

export default FavoriteRooms; 