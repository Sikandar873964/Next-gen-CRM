import { Product, User } from "./models";
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
