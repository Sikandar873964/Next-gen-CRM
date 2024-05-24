import { Product, User, Customer, Enquiry } from "./models";
import { connectToDB } from "./utils";

export const fetchUsers = async (q) => {
  const regex = new RegExp(q, "i");

  try {
    connectToDB();
    const count = await User.find({ username: { $regex: regex } }).count();
    const users = await User.find({ username: { $regex: regex } });
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchUser = async (id) => {
  console.log(id);
  try {
    await connectToDB();
    // console.log(id, "is the id")
    const user = await User.findOne({ _id: id });
    console.log(user);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const fetchProducts = async (q) => {
  console.log(q);
  const regex = new RegExp(q, "i");

  try {
    connectToDB();
    const count = await Product.find({ title: { $regex: regex } }).count();
    const products = await Product.find({ title: { $regex: regex } });
    return { count, products };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch products!");
  }
};

export const fetchProduct = async (id) => {
  try {
    connectToDB();
    const product = await Product.findById(id);
    return product;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch product!");
  }
};

export const fetchCustomers = async (q) => {
  const regex = new RegExp(q, "i"); // Case-insensitive regular expression for the query

  try {
    // Connect to the database
    await connectToDB();

    // Count the number of matching customers
    const count = await Customer.find({
      customername: { $regex: regex },
    }).countDocuments();

    // Find matching customers and populate the product field
    const customers = await Customer.find({
      customername: { $regex: regex },
    }).populate("product");
    return { count, customers };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch customers!");
  }
};

export const fetchCustomer = async (id) => {
  try {
    connectToDB();
    const customer = await Customer.findById(id);
    return customer;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch customer!");
  }
};

export const fetchEnquiries = async (q) => {
  const regex = new RegExp(q, "i"); // Case-insensitive regular expression for the query

  try {
    await connectToDB();

    const count = await Enquiry.find({}).countDocuments();
    const enquiries = await Enquiry.find({}).populate("product customer");
    return { count, enquiries };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch enquiries!");
  }
};

export const fetchEnquiry = async (id) => {
  try {
    await connectToDB();
    const enquiry = await Enquiry.findById(id);
    // console.log(enquiry, "is the enquiry data");
    return enquiry;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch enquiry!");
  }
};