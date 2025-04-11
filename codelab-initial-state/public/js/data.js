// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore import
import { getAnalytics } from "firebase/analytics"; // Analytics import

// Firebase configuration (use your own Firebase config here)
const firebaseConfig = {
  apiKey: "AIzaSyD27PtgjK-QWfHpQ_GaWYjjO4iWhligZLk",
  authDomain: "kiranayubfirebaseproject.firebaseapp.com",
  projectId: "kiranayubfirebaseproject",
  storageBucket: "kiranayubfirebaseproject.firebasestorage.app",
  messagingSenderId: "975844365453",
  appId: "1:975844365453:web:f3de2546d6e3e4f3193ec4",
  measurementId: "G-9R9B5LMCGB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore

// Define constants for data generation
const NAMES = [
  "Computer", "Backpack", "Wallet", "Dog Toy", "Coffee Cup", "Fountain Pen", "Phone Case", "Shoes", "Mystery Box", "Gadget", "Multi-tool"
];

const ADJECTIVES = [
  "Sleek", "Durable", "Hip", "Futuristic", "Revolutionary", "All-New", "Handmade", "Hipster", "Practical", "Refined", "Rustic", "Ergonomic", "Intelligent"
];

const DESCRIPTIONS = [
  "This best-in-class product will improve your life in ways you can't imagine.",
  "I consume, therefore I am.",
  "What are you waiting for? Everybody else already bought this!",
  "Three MIT Grads invented this thing so you know it's good ... right?",
  "From the makers of 'The Smurfs Movie' comes this exciting new purchasing opportunity",
  "The perfect gift for Dads, Grads, or people named Chad!",
  "As seen on Shark Tank, this will change the way you think!",
  "Step down sliced bread, there is a new greatest thing! And it's available with just one click."
];

const PRICES = [
  "0.99", "4.99", "9.99", "12.99", "14.99", "19.99", "26.99", "29.99", "99.99"
];

const IMG_SIZES = ["640", "600", "480", "800", "640", "700", "720"];
const IMG_CATEGORIES = ["arch", "tech", "nature"];

// Function to create random items in Firestore
export async function createItems() {
  console.log("createItems()");

  const batch = db.batch(); // Create a batch for Firestore write operations

  for (let i = 0; i < 9; i++) {
    const data = {
      name: _getProductName(),
      price: _getProductPrice(),
      description: _getProductDescription(),
      imageUrl: _getProductImageUrl()
    };

    // Add data to Firestore collection "items"
    const ref = db.collection("items").doc();
    batch.set(ref, data);
  }

  // Commit the batch operation
  await batch.commit();
}

// Helper functions to generate random data
function _getProductName() {
  return _randomElement(ADJECTIVES) + " " + _randomElement(NAMES);
}

function _getProductDescription() {
  return _randomElement(DESCRIPTIONS);
}

function _getProductPrice() {
  return _randomElement(PRICES);
}

function _getProductImageUrl() {
  return (
    "https://placeimg.com/" +
    _randomElement(IMG_SIZES) +
    "/" +
    _randomElement(IMG_SIZES) +
    "/" +
    _randomElement(IMG_CATEGORIES)
  );
}

// Function to get a random element from an array
function _randomElement(arr) {
  const ind = Math.floor(Math.random() * arr.length);
  return arr[ind];
}
