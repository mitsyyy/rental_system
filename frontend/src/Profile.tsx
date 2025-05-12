import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './styles/Profile.css';

interface UserData {
  name: string;
  email: string;
  phone: string;
  dateJoined: string;
  avatar: string;
}

interface RentalInfo {
  roomNumber: string;
  floor: string;
  rentAmount: string;
  leaseStart: string;
  leaseEnd: string;
  securityDeposit: string;
  status: string;
  nextPaymentDue: string;
}

interface BillingRecord {
  id: number;
  month: string;
  amount: string;
  type: 'Rent' | 'Electricity' | 'Water';
  status: 'Paid' | 'Pending' | 'Overdue';
  datePaid: string;
  receiptNumber: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
}

interface Payment {
  type: string;
  amount: string;
  dueDate: string;
}

type TabType = 'overview' | 'billing' | 'notifications' | 'settings';

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    name: "Maria Klara",
    email: "klara@gmail.com",
    phone: "+63 917 123 4567",
    dateJoined: "January 15, 2023",
    avatar: "/image/resident1.jfif"
  });

  const [rentalInfo, setRentalInfo] = useState<RentalInfo>({
    roomNumber: "Room 105",
    floor: "1st Floor",
    rentAmount: "₱15,000/month",
    leaseStart: "February 1, 2023",
    leaseEnd: "February 1, 2024",
    securityDeposit: "₱15,000",
    status: "Active",
    nextPaymentDue: "May 1, 2023"
  });

  const [billingHistory, setBillingHistory] = useState<BillingRecord[]>([
    {
      id: 1,
      month: "April 2023",
      amount: "₱15,000",
      type: "Rent",
      status: "Paid",
      datePaid: "April 1, 2023",
      receiptNumber: "REC-1234"
    },
    {
      id: 2,
      month: "April 2023",
      amount: "₱1,500",
      type: "Electricity",
      status: "Paid",
      datePaid: "April 1, 2023",
      receiptNumber: "REC-1235"
    },
    {
      id: 3,
      month: "April 2023",
      amount: "₱800",
      type: "Water",
      status: "Paid",
      datePaid: "April 1, 2023",
      receiptNumber: "REC-1236"
    },
    {
      id: 4,
      month: "March 2023",
      amount: "₱15,000",
      type: "Rent",
      status: "Paid",
      datePaid: "March 1, 2023",
      receiptNumber: "REC-1134"
    },
    {
      id: 5,
      month: "March 2023",
      amount: "₱1,650",
      type: "Electricity",
      status: "Paid",
      datePaid: "March 1, 2023",
      receiptNumber: "REC-1135"
    }
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Rent Due",
      message: "Your rent payment for May 2023 is due on May 1, 2023",
      date: "April 25, 2023",
      isRead: false
    },
    {
      id: 2,
      title: "Maintenance Notice",
      message: "There will be scheduled maintenance for the water system on April 30, 2023 from 10 AM to 2 PM",
      date: "April 23, 2023",
      isRead: true
    },
    {
      id: 3,
      title: "Package Delivery",
      message: "You have a package waiting at the front desk. Please pick it up during office hours.",
      date: "April 20, 2023",
      isRead: true
    }
  ]);

  const upcomingPayments: Payment[] = [
    {
      type: "Rent",
      amount: "₱15,000",
      dueDate: "May 1, 2023"
    },
    {
      type: "Electricity (Est.)",
      amount: "₱1,500",
      dueDate: "May 1, 2023"
    },
    {
      type: "Water (Est.)",
      amount: "₱800",
      dueDate: "May 1, 2023"
    }
  ];
  
  const totalUpcoming = upcomingPayments.reduce((total, payment) => {
    return total + parseInt(payment.amount.replace(/[^\d]/g, ''));
  }, 0);

  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const handleReadNotification = (id: number): void => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  return (
    <div className="profile-page">
      <Navbar alwaysWhite={true} />
      
      <div className="profile-header">
        <div className="container">
          <h1>My Profile</h1>
        </div>
      </div>
      
      <div className="profile-content container">
        <div className="profile-sidebar">
          <div className="user-profile-card">
            <div className="user-avatar">
              <img src={userData.avatar} alt={userData.name} />
            </div>
            <h2 className="user-name">{userData.name}</h2>
            <p className="user-since">Resident since {userData.dateJoined}</p>
            <div className="user-contact">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>{userData.email}</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>{userData.phone}</span>
              </div>
            </div>
          </div>
          
          <div className="profile-nav">
            <button 
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <i className="fas fa-home"></i>
              <span>Overview</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'billing' ? 'active' : ''}`}
              onClick={() => setActiveTab('billing')}
            >
              <i className="fas fa-file-invoice-dollar"></i>
              <span>Billing History</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <i className="fas fa-bell"></i>
              <span>Notifications</span>
              {notifications.filter(n => !n.isRead).length > 0 && (
                <span className="notification-badge">{notifications.filter(n => !n.isRead).length}</span>
              )}
            </button>
            <button 
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </button>
          </div>
        </div>
        
        <div className="profile-main">
          {activeTab === 'overview' && (
            <div className="profile-overview">
              <div className="section-heading">
                <h2>Residence Overview</h2>
              </div>
              
              <div className="overview-grid">
                <div className="residence-info-card">
                  <div className="card-header">
                    <h3>Your Residence</h3>
                  </div>
                  <div className="residence-details">
                    <div className="residence-image">
                      <img src="/image/room1.jfif" alt="Room 105" />
                      <span className="residence-status">{rentalInfo.status}</span>
                    </div>
                    <div className="residence-info">
                      <h4>{rentalInfo.roomNumber}</h4>
                      <p><i className="fas fa-building"></i> {rentalInfo.floor}</p>
                      <p><i className="fas fa-money-bill-wave"></i> {rentalInfo.rentAmount}</p>
                      <p><i className="fas fa-calendar-alt"></i> Lease: {rentalInfo.leaseStart} - {rentalInfo.leaseEnd}</p>
                      <button className="view-details-btn">
                        View Room Details
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="upcoming-payments-card">
                  <div className="card-header">
                    <h3>Upcoming Payments</h3>
                    <span className="next-due">Next payment due: {rentalInfo.nextPaymentDue}</span>
                  </div>
                  <div className="payment-list">
                    {upcomingPayments.map((payment, index) => (
                      <div key={index} className="payment-item">
                        <div className="payment-type">
                          <span className="payment-icon">
                            <i className={payment.type === 'Rent' ? 'fas fa-home' : 
                              payment.type.includes('Electricity') ? 'fas fa-bolt' : 'fas fa-tint'}></i>
                          </span>
                          <span>{payment.type}</span>
                        </div>
                        <div className="payment-amount">{payment.amount}</div>
                      </div>
                    ))}
                    <div className="payment-total">
                      <span>Total</span>
                      <span>₱{totalUpcoming.toLocaleString()}</span>
                    </div>
                    <button className="pay-now-btn">Pay Now</button>
                  </div>
                </div>
              </div>
              
              <div className="recent-activity">
                <div className="section-heading">
                  <h3>Recent Activity</h3>
                </div>
                <div className="activity-list">
                  {billingHistory.slice(0, 3).map(bill => (
                    <div key={bill.id} className="activity-item">
                      <div className="activity-icon">
                        <i className={bill.type === 'Rent' ? 'fas fa-home' : 
                          bill.type === 'Electricity' ? 'fas fa-bolt' : 'fas fa-tint'}></i>
                      </div>
                      <div className="activity-details">
                        <div className="activity-title">
                          <h4>{bill.type} Payment - {bill.month}</h4>
                          <span className={`activity-status status-${bill.status.toLowerCase()}`}>{bill.status}</span>
                        </div>
                        <div className="activity-meta">
                          <span>{bill.datePaid} • Receipt #{bill.receiptNumber}</span>
                          <span className="activity-amount">{bill.amount}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button 
                    className="view-all-activity"
                    onClick={() => setActiveTab('billing')}
                  >
                    View All Activity
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'billing' && (
            <div className="profile-billing">
              <div className="section-heading">
                <h2>Billing History</h2>
                <div className="section-actions">
                  <div className="billing-filter">
                    <select defaultValue="all">
                      <option value="all">All Transactions</option>
                      <option value="rent">Rent Only</option>
                      <option value="utilities">Utilities Only</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="billing-table-container">
                <table className="billing-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Receipt #</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingHistory.map(bill => (
                      <tr key={bill.id}>
                        <td>{bill.datePaid}</td>
                        <td>{bill.type} - {bill.month}</td>
                        <td>{bill.receiptNumber}</td>
                        <td>{bill.amount}</td>
                        <td><span className={`status-badge status-${bill.status.toLowerCase()}`}>{bill.status}</span></td>
                        <td>
                          <button className="table-action-btn">
                            <i className="fas fa-download"></i> Receipt
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="profile-notifications">
              <div className="section-heading">
                <h2>Notifications</h2>
                <div className="section-actions">
                  <button className="mark-all-read">Mark All Read</button>
                </div>
              </div>
              
              <div className="notifications-list">
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}
                      onClick={() => handleReadNotification(notification.id)}
                    >
                      <div className="notification-icon">
                        <i className={
                          notification.title.includes('Rent') ? 'fas fa-money-bill-wave' : 
                          notification.title.includes('Maintenance') ? 'fas fa-tools' : 
                          'fas fa-bell'
                        }></i>
                      </div>
                      <div className="notification-content">
                        <div className="notification-header">
                          <h4>{notification.title}</h4>
                          <span className="notification-date">{notification.date}</span>
                        </div>
                        <p className="notification-message">{notification.message}</p>
                      </div>
                      {!notification.isRead && <div className="unread-indicator"></div>}
                    </div>
                  ))
                ) : (
                  <div className="empty-notifications">
                    <i className="fas fa-bell-slash"></i>
                    <p>No notifications to display</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="profile-settings">
              <div className="section-heading">
                <h2>Account Settings</h2>
              </div>
              
              <div className="settings-form">
                <div className="form-section">
                  <h3>Personal Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" value={userData.name} readOnly />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" value={userData.email} readOnly />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input type="tel" value={userData.phone} readOnly />
                    </div>
                    <div className="form-group">
                      <label>Date Joined</label>
                      <input type="text" value={userData.dateJoined} disabled />
                    </div>
                  </div>
                  <button className="edit-info-btn">
                    <i className="fas fa-edit"></i> Edit Information
                  </button>
                </div>
                
                <div className="form-section">
                  <h3>Password & Security</h3>
                  <button className="change-password-btn">
                    <i className="fas fa-lock"></i> Change Password
                  </button>
                </div>
                
                <div className="form-section">
                  <h3>Notification Preferences</h3>
                  <div className="notification-preferences">
                    <div className="preference-item">
                      <div className="preference-label">
                        <h4>Email Notifications</h4>
                        <p>Receive notifications about payments, maintenance, and announcements</p>
                      </div>
                      <label className="toggle-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                    <div className="preference-item">
                      <div className="preference-label">
                        <h4>SMS Notifications</h4>
                        <p>Receive text messages about important updates</p>
                      </div>
                      <label className="toggle-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile; 
