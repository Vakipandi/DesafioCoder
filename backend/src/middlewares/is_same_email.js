import dao from '../dao/factory.js';

const { User } = dao;

export default async function (req, res, next) {
  try {
    const model = new User();
    const { email } = req.body;
    let userExist = await model.readOne(email);
    if (userExist) {
      return res.status(409).json({
        error: {
          status: 409,
          method: req.method,
          path: req.url,
          message: 'El correo electrónico ya está en uso.',
        },
      });
    } else {
      next();
    }
  } catch (error) {
    console.error(
      'Error en el middleware de verificación de correo electrónico:',
      error
    );

    next(error);
  }
}
