import { model, Schema } from 'mongoose';

const userCollection = 'users';

const userSchema = new Schema({
  name: { type: String, required: true },
  photo: {
    type: String,
    default:
      'https://us.123rf.com/450wm/nuwaba/nuwaba1707/nuwaba170700076/81763793-persona-usuario-icono-de-ilustraci%C3%B3n-de-amigo-vectror-aislado-sobre-fondo-gris.jpg',
  },
  email: { type: String, required: true, unique: true, index: true },
  age: { type: Number},
  role: { type: Number, default: 0 },
  password: { type: String, required: true },
}
);

export const userModel = model(userCollection, userSchema);
