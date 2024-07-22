"use server";

import { revalidatePath } from "next/cache";
import { Product, User, Customer, Enquiry } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { toast } from "sonner";
import { signIn, auth, signOut } from "@/auth";

// Function to add a new user
export const addUser = async (formData) => {
  // Extract user data from form
  const { username, email, password, phone, address, img, isAdmin, isActive, companyID } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user object
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      img,
      address,
      isAdmin,
      isActive,
      companyID,
    });

    // Save user to database
    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }

  // Revalidate the users page and redirect
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

// Function to update an existing user
export const updateUser = async (formData) => {
  // Extract updated user data from form
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    // Prepare update fields
    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    // Remove empty fields
    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    // Update user in database
    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  // Revalidate the users page and redirect
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

// Function to delete a user
export const deleteUser = async (id) => {
  console.log("id for deleted user is", id);

  try {
    await connectToDB();
    // Delete user from database
    await User.findByIdAndDelete(id);

    // Revalidate the users page
    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }
};

// Function to add a new product
export const addProduct = async (formData) => {
  // Extract product data from form
  const { title, desc, price, stock, color, size, companyID } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    // Create new product object
    const newProduct = new Product({
      title,
      desc,
      price,
      stock,
      color,
      size,
      companyID,
    });

    // Save product to database
    await newProduct.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create product!");
  }

  // Revalidate the products page and redirect
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

// Function to update an existing product
export const updateProduct = async (formData) => {
  // Extract updated product data from form
  const { id, title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    // Prepare update fields
    const updateFields = {
      title,
      desc,
      price,
      stock,
      color,
      size,
    };

    // Remove empty fields
    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    // Update product in database
    await Product.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update product!");
  }

  // Revalidate the products page and redirect
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

// Function to delete a product
export const deleteProduct = async (id) => {
  console.log("id for deleted product is", id);

  try {
    await connectToDB();
    // Delete product from database
    await Product.findByIdAndDelete(id);

    // Revalidate the products page
    revalidatePath("/dashboard/products");
    return { success: true };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete product!");
  }
};

// Function to add a new customer
export const addCustomer = async (formData) => {
  // Extract customer data from form
  const { customername, email, phone, address, img, product, companyID } =
    Object.fromEntries(formData);
  try {
    connectToDB();
    // Create new customer object
    const newCustomer = new Customer({
      customername,
      email,
      phone,
      img,
      address,
      product,
      companyID,
    });

    // Save customer to database
    await newCustomer.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create customer!");
  }

  // Revalidate the customers page and redirect
  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
};

// Function to update an existing customer
export const updateCustomer = async (formData) => {
  // Extract updated customer data from form
  const { id, customername, email, phone, address, img, product } =
    Object.fromEntries(formData);

  console.log("id:", id);
  console.log("customername:", customername);
  console.log("email:", email);
  console.log("phone:", phone);
  console.log("address:", address);
  console.log("img:", img);
  console.log("product:", product);

  try {
    connectToDB();

    // Prepare update fields
    const updateFields = {
      customername,
      email,
      phone,
      img,
      address,
      product,
    };

    // Remove empty fields
    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    // Update customer in database
    await Customer.findByIdAndUpdate(id, updateFields);
    console.log("customer updated");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update customer!");
  }

  // Revalidate the customers page and redirect
  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
};

// Function to delete a customer
export const deleteCustomer = async (id) => {
  console.log("id for deleted customer is", id);

  try {
    await connectToDB();
    // Delete customer from database
    await Customer.findByIdAndDelete(id);

    // Revalidate the customers page
    revalidatePath("/dashboard/customers");
    return { success: true };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete customer!");
  }
};

// Function to add a new enquiry
export const addEnquiry = async (formData) => {
  // Extract enquiry data from form
  const { customer, type, product, status, companyID } =
    Object.fromEntries(formData);
  try {
    connectToDB();

    // Create new enquiry object
    const newEnquiry = new Enquiry({
      customer,
      type,
      product,
      status,
      companyID,
    });

    // Save enquiry to database
    await newEnquiry.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create enquiry!");
  }

  // Revalidate the contact logs page and redirect
  revalidatePath("/dashboard/contactlogs");
  redirect("/dashboard/contactlogs");
};

// Function to update an existing enquiry
export const updateEnquiry = async (formData) => {
  // Extract updated enquiry data from form
  const { id, customer, type, product, status } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    // Prepare update fields
    const updateFields = {
      customer,
      type,
      product,
      status,
    };

    // Remove empty fields
    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    // Update enquiry in database
    await Enquiry.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update enquiry!");
  }

  // Revalidate the contact logs page and redirect
  revalidatePath("/dashboard/contactlogs");
  redirect("/dashboard/contactlogs");
};

// Function to delete an enquiry
export const deleteEnquiry = async (id) => {
  console.log("id for deleted enquiry is", id);

  try {
    await connectToDB();
    // Delete enquiry from database
    await Enquiry.findByIdAndDelete(id);

    // Revalidate the contact logs page
    revalidatePath("/dashboard/contactlogs");
    return { success: true };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete enquiry!");
  }
};

// Function to authenticate a user
export const authenticate = async (prevState, formData) => {
  const { username, password, companyid } = Object.fromEntries(formData);
  try {
    // Attempt to sign in user
    await signIn("credentials", { username, password, companyid });
  } catch (err) {
    console.error(err);
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw err;
  }
};

// Function to sign up a new user
export const signup = async (prevState, formData) => {
  // Extract signup data from form
  const { username, email, password, companyid, company, isAdmin } =
    Object.fromEntries(formData);
  console.log("username", username);
  console.log("email", email);
  console.log("password", password)
  console.log("companyid", companyid);
  console.log("company", company);
  try {
    connectToDB();

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user object
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      companyID: companyid,
      companyName: company,
      isAdmin,
    });

    // Save user to database
    await newUser.save();

    // Redirect to login page
    redirect("/login");
  } catch (err) {
    if (err.message.includes("E11000")) {
      return "User already exists";
    }
    throw err;
  }
};

// Function to delete all records for a company
export const deleteCompanyRecords = async (formData) => {
  const session = await auth();

  const { companyID: inputCompanyID } = Object.fromEntries(formData);
  // console.log("inputCompanyID is", inputCompanyID);

  const currentCompanyID = session?.user?.companyID;
  try {
    await connectToDB();

    // Delete all records for the company
    await User.deleteMany({ companyID: currentCompanyID });
    await Product.deleteMany({ companyID: currentCompanyID });
    await Customer.deleteMany({ companyID: currentCompanyID });
    await Enquiry.deleteMany({ companyID: currentCompanyID });

    console.log(`All records for companyID: '${currentCompanyID}' have been deleted.`);    
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete company records!");
  }
  // Sign out the user and redirect to home page
  finally {
    await signOut({ redirectTo: "/deleted" });
    redirect("/deleted")

  }
};

// export const handleSelfDelete = async (formData) => {
//   const { id } = Object.fromEntries(formData);
//   console.log("Deleting own account with id:", id);

//   try {
//     await connectToDB();
//     // Delete user from database
//     await User.findByIdAndDelete(id);

//     // Sign out the current user
//     await signOut({ redirect: false });

//     // Use permanentRedirect to redirect to home page
//     permanentRedirect('/');
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to delete own account!");
//   }
// };