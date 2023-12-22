import bcrypt from 'bcrypt';
import dao from '../dao/factory.js';

const { User } = dao;

export default async (req, res, next) => {
  try {
    const model = new User();

    if (req.body.email && req.body.password) {
      // Busca el usuario por correo electrónico en la base de datos
      const user = await model.readOne(req.body.email);
      // console.log(user);
      if (user.response) {
        // Si el usuario se encuentra, compara las contraseñas
        const isPasswordMatch = await bcrypt.compare(
          req.body.password,
          user.response.password
        );

        if (isPasswordMatch) {
          // Si las contraseñas coinciden, puedes continuar con la siguiente middleware o ruta
          next();
        } else {
          res.status(401).send('Unauthorized: Invalid password');
        }
      } else {
        res.status(404).send('Not Found: User not found');
      }
    } else {
      res.status(400).send('Bad Request: Email and password are required');
    }
  } catch (error) {
    console.error('Error comparing passwords:', error);
    res.status(500).send('Internal Server Error');
  }
};
