import { Product, User, Customer, Enquiry } from "./models";
import { connectToDB } from "./utils";

export const fetchUsers = async (q, companyID) => {
  const regex = new RegExp(q, "i");
  try {
    connectToDB();
    const count = await User.find({ username: { $regex: regex }, companyID }).count();
    const users = await User.find({ username: { $regex: regex }, companyID });
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

export const fetchProducts = async (q, companyID) => {
  const regex = new RegExp(q, "i");
  try {
    connectToDB();
    const count = await Product.find({ title: { $regex: regex }, companyID }).count();
    const products = await Product.find({ title: { $regex: regex }, companyID });
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

export const fetchCustomers = async (q, companyID) => {
  const regex = new RegExp(q, "i");
  try {
    await connectToDB();
    const count = await Customer.find({ 
      customername: { $regex: regex },
      companyID
    }).countDocuments();
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

export const fetchEnquiries = async (q, companyID) => {
  const regex = new RegExp(q, "i");
  try {
    await connectToDB();
    const count = await Enquiry.find({ companyID }).countDocuments();
    const enquiries = await Enquiry.find({ companyID }).populate("product customer");
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