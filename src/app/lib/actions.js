"use server";

import { revalidatePath } from "next/cache";
import { Product, User, Customer, Enquiry } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "@/auth";

export const addUser = async (formData) => {
  const { username, email, password, phone, address, img, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      img,
      address,
      isAdmin,
      isActive,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (formData) => {
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);
  console.log("id for deleted user is", id);

  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard/users");
};

export const addProduct = async (formData) => {
  const { title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const newProduct = new Product({
      title,
      desc,
      price,
      stock,
      color,
      size,
    });

    await newProduct.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create product!");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const updateProduct = async (formData) => {
  const { id, title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      title,
      desc,
      price,
      stock,
      color,
      size,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Product.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update product!");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Product.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete product!");
  }

  revalidatePath("/dashboard/products");
};

export const addCustomer = async (formData) => {
  // Convert formData to an object
  const { customername, email, phone, address, img, product } =
    Object.fromEntries(formData);

  console.log("customername:", customername);
  console.log("email:", email);
  console.log("phone:", phone);
  console.log("address:", address);
  console.log("img:", img);
  console.log("product:", product);
  try {
    // Connect to the database
    connectToDB();

    // Validate if the referenced product exists
    // const productExists = await Product.findById(product);
    // if (!productExists) {
    //   throw new Error('Product not found');
    // }

    // Create a new customer instance with the provided data
    const newCustomer = new Customer({
      customername,
      email,
      phone,
      img,
      address,
      product,
    });

    // Save the customer to the database
    await newCustomer.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create customer!");
  }

  // Revalidate the path and redirect as needed
  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
};

export const updateCustomer = async (formData) => {
  // Convert formData to an object
  const { id, customername, email, phone, address, img, product } =
    Object.fromEntries(formData);

    console.log("customername:", customername);
    console.log("email:", email);
    console.log("phone:", phone);
    console.log("address:", address);
    console.log("img:", img);
    console.log("product:", product);
    
  try {
    // Connect to the database
    connectToDB();

    // Validate if the referenced product exists
    // const productExists = await Product.findById(product);
    // if (!productExists) {
    //   throw new Error('Product not found');
    // }

    // Create an object with the fields to update
    const updateFields = {
      customername,
      email,
      phone,
      img,
      address,
      product,
    };

    // Remove empty fields from the update object
    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    // Update the customer in the database
    await Customer.findByIdAndUpdate(id, updateFields);
    console.log("customer updated");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update customer!");
  }

  // Revalidate the path and redirect as needed
  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
};

export const deleteCustomer = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Customer.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete customer!");
  }

  revalidatePath("/dashboard/customers");
};

export const addEnquiry = async (formData) => {
  const { customer, type, product, status } =
    Object.fromEntries(formData);
    console.log("customer recieved is", customer);
    console.log("type recieved is", type);
    console.log("product recieved is", product);
    console.log("status recieved is", status);

  try {
    connectToDB();

    const newEnquiry = new Enquiry({
      customer,
      type,
      product,
      status,
    });

    await newEnquiry.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create enquiry!");
  }

  revalidatePath("/dashboard/contactlogs");
  redirect("/dashboard/contactlogs");
};

export const updateEnquiry = async (formData) => {
  const { id, customer, type, product, status } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      customer,
      type,
      product,
      status,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Enquiry.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update enquiry!");
  }

  revalidatePath("/dashboard/contactlogs");
  redirect("/dashboard/contactlogs");
};

export const deleteEnquiry = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Enquiry.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete enquiry!");
  }

  revalidatePath("/dashboard/contactlogs");
  redirect("/dashboard/contactlogs");
};


export const authenticate = async (prevState, formData) => {
  const { username, password, companyName } = Object.fromEntries(formData);
  console.log("username", username);
  console.log("password", password);
  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw err;
  }
};
