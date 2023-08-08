import mongoose from "mongoose";

const URI =
  "mongodb+srv://mauriciomamani306:1234@cluster0.k7q73pm.mongodb.net/ecommerce?retryWrites=true&w=majority";
await mongoose.set("strictQuery", false);
await mongoose.connect(URI);
console.log("DB is connected");
