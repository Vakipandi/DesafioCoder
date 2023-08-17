import mongoose , { Types }from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: [
    {
      _id: { type: Types.ObjectId , ref: "products" },
      quantity: { type: Number , default: 1},
    },
  ],
});

cartSchema.pre("find", function (next) {
  this.populate("products._id");
  next();
}
)

export const cartModel = mongoose.model(cartCollection, cartSchema);
