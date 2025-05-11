
from flask import Flask,render_template, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#app.config['MYSQL_HOST'] = 'localhost'    db connectivity
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = ''
# app.config['MYSQL_DB'] = 'mydb'
# mysql = MySQL(app)

# @app.route('/data/db', methods=['GET'])
# def get_data():
#     # cur = mysql.connection.cursor()
#     # cur.execute('''SELECT * FROM mydb.test''')
#     # rv = cur.fetchall()
#     # return str(rv)


@app.route('/api/Home', methods=['GET'])
def get_data():
  rooms = [
    {
      "id": 1,
      "title": "Room 105",
      "price": "₱15,000/mo",
      "size": "280",
      "bed": "Single bed",
      "bath": "Private bathroom",
      "location": "Makati",
      "description": "Bright and airy room with large windows offering plenty of natural light. Features a comfortable single bed, private bathroom, and walk-in closet. Perfect for young professionals who want a clean, modern space in the heart of the city.",
      "amenities": ["WiFi", "AC", "Laundry", "Desk", "TV", "Mini-fridge"],
      "image": "/image/room1.jfif",
      "status": "available",
      "leaseTerms": ["6 months", "12 months"],
      "deposit": "₱15,000",
      "utilities": "Included",
      "moveInDate": "Immediate"
    },
    {
      "id": 2,
      "title": "Room 107",
      "price": "₱12,000/mo",
      "size": "240",
      "bed": "Queen bed",
      "bath": "Private bathroom",
      "location": "Quezon City",
      "description": "Warm and inviting room with comfortable queen bed and private bathroom. Features a small balcony overlooking the garden. Quiet neighborhood with easy access to public transportation.",
      "amenities": ["WiFi", "Heating", "Shared Kitchen", "Parking", "Balcony", "Storage"],
      "image": "/image/room2.jfif",
      "status": "occupied",
      "leaseTerms": ["12 months"],
      "deposit": "₱12,000",
      "utilities": "Not included",
      "moveInDate": "Next month"
    },
    {
      "id": 3,
      "title": "Room 201",
      "price": "₱18,000/mo",
      "size": "220",
      "bed": "Twin bed",
      "bath": "Shared bathroom",
      "location": "BGC",
      "description": "Efficiently designed room with twin bed, built-in storage, and shared bathroom (max 2 others). Ideal for students who want a simple, functional space close to business centers. Includes study area with desk and chair.",
      "amenities": ["WiFi", "AC", "Study Area", "Shared Kitchen", "Laundry", "Bike Storage"],
      "image": "/image/room3.jfif",
      "status": "available",
      "leaseTerms": ["9 months", "12 months"],
      "deposit": "₱18,000",
      "utilities": "Included",
      "moveInDate": "Next week"
    # },
    # {
    #   id: 4,
    #   "title": "Room 203",
    #   "price": "₱20,000/mo",
    #   "size": "600",
    #   "bed": "Queen bed",
    #   "bath": "Private bathroom",
    #   "location": "Pasig",
    #   "description": "Stunning room with modern appliances, spacious living area, and private balcony. Experience luxury living in a prime location.",
    #   "amenities": ["WiFi", "AC", "Parking"],
    #   "image": "/image/room4.jfif",
    #   "status": "available",
    #   "type": "Apartment",
    #   "leaseTerms": ["12 months"],
    #   "deposit": "₱20,000",
    #   "utilities": "Not included",
    #   "moveInDate": "Immediate"
    }]
  reviews = [
    {
      "id": 1,
      "name": "Maria Santos",
      "rating": 5,
      "comment": "Amazing place! The room was exactly as described.",
      "date": "April 2025",
      "avatar": "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      "id": 2,
      "name": "Jose Rizal",
      "rating": 4,
      "comment": "Great location and very responsive management. Would definitely recommend!",
      "date": "March 2025",
      "avatar": "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      "id": 3,
      "name": "Aime Santos",
      "rating": 5,
      "comment": "The best student housing I've experienced. Clean, modern, and well-maintained.",
      "date": "May 2025",
      "avatar": "https://randomuser.me/api/portraits/women/3.jpg"
    }
  ]
  return jsonify({"rooms": rooms,"reviews":reviews})


if __name__ == '__main__':
    app.run(debug=True)