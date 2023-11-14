import { model, Schema, Types } from 'mongoose';

let userCollection = 'users';

const userSchema = new Schema({
  name: { type: String, required: true },
  photo: {
    type: String,
    default:
      'https://us.123rf.com/450wm/nuwaba/nuwaba1707/nuwaba170700076/81763793-persona-usuario-icono-de-ilustraci%C3%B3n-de-amigo-vectror-aislado-sobre-fondo-gris.jpg',
  },
  email: { type: String, required: true, unique: true, index: true },
  age: { type: Number },
  role: { type: String, enum: ['USER', 'PREMIUN', 'ADMIN'], default: 'USER' },
  cart: { type: Types.ObjectId, ref: 'carts' },
  password: { type: String, required: true },
});

let User = model(userCollection, userSchema);
export default User;
