// GREY DEAL – DATA FILE
// Contains sample data for brokers and properties.
// Expanded with more entries for variety and realism.

// ================= BROKERS =================
const brokers = [
  // Original Brokers (preserved and standardized)
  {
    id: 1,
    name: "Rahul Rajput",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    experience: "8+ Years",
    rating: 4.8,
    verified: true
  },
  {
    id: 2,
    name: "Samir Gupta",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    experience: "5+ Years",
    rating: 4.6,
    verified: true
  },
  {
    id: 3,
    name: "William Allison",
    photo: "https://randomuser.me/api/portraits/men/12.jpg",
    experience: "10+ Years",
    rating: 4.9,
    verified: true
  },
  // New Additions
  {
    id: 4,
    name: "Priya Kapoor",
    photo: "https://randomuser.me/api/portraits/women/50.jpg",
    experience: "6+ Years",
    rating: 4.7,
    verified: true
  },
  {
    id: 5,
    name: "Ankit Sharma",
    photo: "https://randomuser.me/api/portraits/men/67.jpg",
    experience: "7+ Years",
    rating: 4.5,
    verified: true
  },
  {
    id: 6,
    name: "Sneha Patel",
    photo: "https://randomuser.me/api/portraits/women/33.jpg",
    experience: "4+ Years",
    rating: 4.4,
    verified: false
  },
  {
    id: 7,
    name: "Rajesh Kumar",
    photo: "https://randomuser.me/api/portraits/men/89.jpg",
    experience: "9+ Years",
    rating: 4.8,
    verified: true
  },
  {
    id: 8,
    name: "Meera Singh",
    photo: "https://randomuser.me/api/portraits/women/22.jpg",
    experience: "3+ Years",
    rating: 4.3,
    verified: true
  }
];

// ================= PROPERTIES =================
const properties = [
  // Original Properties (preserved and standardized with added fields)
  {
    id: 1,
    title: "Bluebell Haven",
    price: "₹ 3.6 Cr",
    bhk: 3,
    type: "Villa",
    location: "Gurgaon",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8
  },
  {
    id: 2,
    title: "Pearl Nest Abode",
    price: "₹ 2.8 Cr",
    bhk: 2,
    type: "Apartment",
    location: "Noida",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    rating: 4.6
  },
  {
    id: 3,
    title: "Radiant Heights Residency",
    price: "₹ 4.5 Cr",
    bhk: 4,
    type: "Villa",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9
  },
  {
    id: 4,
    title: "Oakwood Luxury Villas",
    price: "₹ 6.2 Cr",
    bhk: 5,
    type: "Villa",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1600585154207-33fba50c26b3?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7
  },
  // New Additions (10+ more for variety)
  {
    id: 5,
    title: "Sunset Breeze Apartment",
    price: "₹ 1.5 Cr",
    bhk: 2,
    type: "Apartment",
    location: "Chennai",
    image: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?auto=format&fit=crop&w=1200&q=80",
    rating: 4.5
  },
  {
    id: 6,
    title: "Green Valley Plot",
    price: "₹ 50 L",
    bhk: 0, // Plot, no BHK
    type: "Plot",
    location: "Pune",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
    rating: 4.2
  },
  {
    id: 7,
    title: "Urban Elite Flat",
    price: "₹ 2.2 Cr",
    bhk: 3,
    type: "Apartment",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    rating: 4.6
  },
  {
    id: 8,
    title: "Mountain View Villa",
    price: "₹ 5.0 Cr",
    bhk: 4,
    type: "Villa",
    location: "Shimla",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8
  },
  {
    id: 9,
    title: "Coastal Retreat",
    price: "₹ 3.8 Cr",
    bhk: 3,
    type: "Villa",
    location: "Goa",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7
  },
  {
    id: 10,
    title: "Modern Loft Apartment",
    price: "₹ 1.8 Cr",
    bhk: 2,
    type: "Apartment",
    location: "Hyderabad",
    image: "https://images.unsplash.com/photo-1600585154207-33fba50c26b3?auto=format&fit=crop&w=1200&q=80",
    rating: 4.4
  },
  {
    id: 11,
    title: "Heritage Bungalow",
    price: "₹ 4.2 Cr",
    bhk: 4,
    type: "Villa",
    location: "Kolkata",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9
  },
  {
    id: 12,
    title: "Skyline Penthouse",
    price: "₹ 7.5 Cr",
    bhk: 5,
    type: "Apartment",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?auto=format&fit=crop&w=1200&q=80",
    rating: 5.0
  },
  {
    id: 13,
    title: "Riverside Plot",
    price: "₹ 75 L",
    bhk: 0,
    type: "Plot",
    location: "Jaipur",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    rating: 4.3
  },
  {
    id: 14,
    title: "Eco-Friendly Home",
    price: "₹ 2.5 Cr",
    bhk: 3,
    type: "Villa",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    rating: 4.6
  }
];

// Export for use in other files (e.g., Script.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { brokers, properties };
}
