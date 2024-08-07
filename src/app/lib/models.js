import mongoose from 'mongoose';

// Product Schema
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    img: {
      type: String,
    },
    color: {
      type: String,
    },
    size: {
      type: String,
    },
    companyID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//Customer Schema
const customerSchema = new mongoose.Schema(
  {
    customername: {
      type: String,
      required: true,
      // unique: true,
      min: 3,
    },
    email: {
      type: String,
      required: true,
       // unique: true,
     // unique: true,
    },
    img: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    companyID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Enquiry Schema
const enquirySchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    type: {
      type: String,
    },
    status: {
      type: String,
    },
    companyID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// User Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    companyID: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

// Exporting the models
export const User = mongoose.models.User || mongoose.model("User", userSchema); 
export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export const Customer = mongoose.models.Customer || mongoose.model("Customer", customerSchema);
export const Enquiry = mongoose.models.Enquiry || mongoose.model("Enquiry", enquirySchema);