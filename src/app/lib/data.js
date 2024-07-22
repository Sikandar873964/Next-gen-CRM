import { Product, User, Customer, Enquiry } from "./models";
import { connectToDB } from "./utils";

// Fetch users based on a search query and company ID
export const fetchUsers = async (q, companyID) => {
  // Create a case-insensitive regular expression for the search query
  const regex = new RegExp(q, "i");
  try {
    connectToDB();
    // Count the number of users matching the search criteria
    const count = await User.find({ username: { $regex: regex }, companyID }).count();
    // Fetch the users matching the search criteria
    const users = await User.find({ username: { $regex: regex }, companyID });
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

// Fetch a single user by ID
export const fetchUser = async (id) => {
  console.log(id);
  try {
    await connectToDB();
    // Find the user with the given ID
    const user = await User.findOne({ _id: id });
    console.log(user);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

// Fetch products based on a search query and company ID
export const fetchProducts = async (q, companyID) => {
  // Create a case-insensitive regular expression for the search query
  const regex = new RegExp(q, "i");
  try {
    connectToDB();
    // Count the number of products matching the search criteria
    const count = await Product.find({ title: { $regex: regex }, companyID }).count();
    // Fetch the products matching the search criteria
    const products = await Product.find({ title: { $regex: regex }, companyID });
    return { count, products };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch products!");
  }
};

// Fetch a single product by ID
export const fetchProduct = async (id) => {
  try {
    connectToDB();
    // Find the product with the given ID
    const product = await Product.findById(id);
    return product;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch product!");
  }
};

// Fetch customers based on a search query and company ID
export const fetchCustomers = async (q, companyID) => {
  // Create a case-insensitive regular expression for the search query
  const regex = new RegExp(q, "i");
  try {
    await connectToDB();
    // Count the number of customers matching the search criteria
    const count = await Customer.find({ 
      customername: { $regex: regex },
      companyID
    }).countDocuments();
    // Fetch the customers matching the search criteria and populate the 'product' field
    const customers = await Customer.find({ 
      customername: { $regex: regex },
      companyID
    }).populate("product");
    return { count, customers };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch customers!");
  }
};

// Fetch a single customer by ID
export const fetchCustomer = async (id) => {
  try {
    connectToDB();
    // Find the customer with the given ID
    const customer = await Customer.findById(id);
    return customer;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch customer!");
  }
};

// Fetch enquiries for a specific company
export const fetchEnquiries = async (q, companyID) => {
  // Note: The 'q' parameter is not used in this function
  const regex = new RegExp(q, "i");
  try {
    await connectToDB();
    // Count the number of enquiries for the company
    const count = await Enquiry.find({ companyID }).countDocuments();
    // Fetch the enquiries for the company and populate the 'product' and 'customer' fields
    const enquiries = await Enquiry.find({ companyID }).populate("product customer");
    return { count, enquiries };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch enquiries!");
  }
};

// Fetch a single enquiry by ID
export const fetchEnquiry = async (id) => {
  try {
    await connectToDB();
    // Find the enquiry with the given ID
    const enquiry = await Enquiry.findById(id);
    return enquiry;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch enquiry!");
  }
};