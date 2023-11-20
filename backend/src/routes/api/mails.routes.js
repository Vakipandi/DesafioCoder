import MyRouter from '../router.js';
import transporter from '../../config/transporter.js';
import env from '../../config/env.js';

const { G_MAIL } = env;

export default class MailsRouter extends MyRouter {
  init() {
    this.create('/', ['PUBLIC'], async (req, res, next) => {
      try {
        let to = req.body.to;
        let subject = 'CREMANIII';
        let html = (product) =>
          `<h1>Hola , ${product.name}</h1>
          
            <p>Tu pedido fue recibido y se encuentra en proceso.</p>
            <p>Gracias por elegirnos.</p>


            <p>El total es: ${product.price}</p>
            `;
        await transporter.sendMail({
          from: G_MAIL,
          to: to,
          subject: subject,
          html: html({
            name: 'Juan',
            price: '1000',
          }),
        });
        return res.sendSuccessCreate({ response: 'sent' });
      } catch (error) {
        next(error);
      }
    });
  }
}
