const express = require("express");
const Cart = require("../model/cart");
const Product = require("../model/product");
const { protect } = require("../middleware/protect");
const router = express.Router();

//helper function
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

//add prduct to cart with guest and user

router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    const product = await Product.findById({ _id: productId });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    // check user is login or guest
    const cart = await getCart(userId, guestId);
    
    //    if cart exist than update

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() == productId &&
          p.size == size &&
          p.color == color,
      );
      if (productIndex > -1) {
        //  if product already exist, update quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0]?.url,
          price: product.price,
          size,
          color,
          quantity,
        });
      }
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item?.price * item?.quantity,
        0,
      );
      await cart.save();
      res.status(200).json({status:true,cart});
    } else {
      //  create a new cart for guest or user
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0]?.url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });
      res.status(200).json({status:true, newCart });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//update quantity

router.put("/", async (req, res) => {
  const { productId, userId, guestId, size, color, quantity } = req.body;
  try {
    const cart = await getCart(userId, guestId);
    if (!cart) {
      res.status(404).json({ message: "cart. not found" });
    }
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() == productId &&
        p.size == size &&
        p.color == color,
    );
    if (productIndex > -1) {
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1);
      }
      cart.totalPrice = cart?.products?.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
      await cart.save();
      res.status(200).json({ status:true,cart, message: "Cart updated successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// delete product
router.delete("/", async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;
  
  try {
    const cart = await getCart(userId, guestId);
    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
    }
    const productIndex = cart.products.findIndex(
      (p) => (
        p.productId.toString() === productId && p.size == size,
        p.color == color
      ),
    );
   
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      cart.totalPrice = cart?.products?.reduce(
        (acc, item) => acc + item?.price * item?.quantity,
        0,
      );
      await cart.save();
      res.status(200).json({status:true, cart, message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
});

// get cart

router.get("/", async (req, res) => {
  const { userId, guestId } = req.query;
  try {
    const cart = await getCart(userId, guestId);
    if (cart) {
      res.status(200).json({ cart, message: "Cart fetch successfully" });
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// merge cartafter login
router.post("/merge", async (req, res) => {
  const { userId, guestId } = req.body;

  try {
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: userId });

    if (!guestCart) {
      if (userCart) {
        return res.status(200).json(userCart);
      }
      return res.status(404).json({ message: "Guest cart not found" });
    }

    if (guestCart.products.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    if (userCart) {
      guestCart.products.forEach((guestItem) => {
        const productIndex = userCart.products.findIndex(
          (p) =>
            p.productId.toString() === guestItem.productId.toString() &&
            p.size === guestItem.size &&
            p.color === guestItem.color
        );

        if (productIndex > -1) {
          userCart.products[productIndex].quantity += guestItem.quantity;
        } else {
          userCart.products.push(guestItem);
        }
      });

      userCart.totalPrice = userCart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await userCart.save();
      await Cart.findOneAndDelete({ guestId });

      return res.status(200).json(userCart);
    } else {
      guestCart.user = userId;
      guestCart.guestId = undefined;
      await guestCart.save();
      return res.status(200).json(guestCart);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
});

module.exports = router;
