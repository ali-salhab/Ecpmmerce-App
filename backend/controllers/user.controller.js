import { User } from "../models/user.model.js";
import { Product } from "../models/product.models.js";
export async function addAddress(req, res) {
  try {
    const {
      label,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault,
    } = req.body;
    if (
      !fullName ||
      !streetAddress ||
      !city ||
      !state ||
      !zipCode ||
      !phoneNumber
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = req.user;
    if (isDefault) {
      user.addAddress.forEach((address) => {
        address.isDefault = false;
      });
    }

    // we pass new object to the address array and it will be saved automatically
    user.addAddress.push({
      label,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault: isDefault || false,
    });
    await user.save();
    res.status(201).json({
      message: "Address added successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
}
export async function deleteAddress(req, res) {
  try {
    const { addressId } = req.body;
    const user = req.user;
    user.addAddress.pull(addressId);
    await user.save();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export async function updateAddress(req, res) {
  try {
    const {
      label,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault,
    } = req.body;
    const addressId = req.params.addressId;
    const user = req.user;
    const address = user.addresses.find((address) => address._id == addressId);

    if (address) {
      if (isDefault) {
        user.addresses.forEach((address) => {
          address.isDefault = false;
        });
      }

      address.label = label || address.label;
      address.fullName = fullName || address.fullName;
      address.streetAddress = streetAddress || address.streetAddress;
      address.city = city || address.city;
      address.state = state || address.state;
      address.zipCode = zipCode || address.zipCode;
      address.phoneNumber = phoneNumber || address.phoneNumber;
      address.isDefault = isDefault || address.isDefault;
      await user.save();
      res.status(200).json({
        message: "Address updated successfully",
        address: address,
      });
    } else {
      res.status(404).json({ message: "Address not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export async function getAddress(req, res) {}
export async function getAddresses(req, res) {
  try {
    const user = req.user;
    res.status(200).json({
      addresses: user.addresses,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
}

export async function addToWishlist(req, res) {
  console.log("add to wishlist fuction called Post methos ");
  try {
    const user = req.user;
    console.log(user);
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // check if the product already in the check list
    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    user.wishlist.push(productId);
    await user.save();
    res.status(200).json({
      message: "Product added to wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export async function removeFromWishlist(req, res) {
  try {
    const user = req.user;
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // check if the product already in the check list
    if (!user.wishlist.includes(productId)) {
      return res.status(400).json({ message: "Product not in wishlist" });
    }

    user.wishlist.pull(productId);
    await user.save();
    res.status(200).json({
      message: "Product removed from wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export async function getWishlist(req, res) {
  console.log("get wish list from getwishlist contrller ----------->");
  try {
    // we are using populate because whishlist is just array of product ids
    const userWithWishlist = await User.findById(req.user._id).populate(
      "wishlist"
    );

    res.status(200).json({
      wishlist: userWithWishlist?.wishlist ?? [],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
