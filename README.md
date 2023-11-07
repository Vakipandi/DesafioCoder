# Segunda Entrega Ecommerce
Para escuchar el servidor ejercutar **npm run dev** . El servidor se estaescuchando en el puerto 3000
## Endpoints para vistas y api
### -***Vistas***
- **Todos los productos ->** *localhost:3000/products*
  
- **Formulario para agregar o eliminar productos con los productos actualizandose en tiempo real ->** *localhost:3000/new_product*

- **Detalle del proucto ->** *localhost:3000/products/:pid*
  
- **Chat (duplicar la pestaña) ->** *localhost:3000/chat*

- **Cart  ->** *localhost:3000/carts*

### -***Api***

 #### Product Router
 
- **All products api ->** *localhost:3000/api/products*

- **Create product ->** *localhost:3000/api/products*

- **Read product ->** *localhost:3000/api/products/:pid*

- **Update product ->** *localhost:3000/api/products/:pid*

- **Delete product ->** *localhost:3000/api/products/:pid*

#### Cart Router

- **Create cart ->** *localhost:3000/api/carts*

- **Read cart ->** *localhost:3000/api/carts/:cid*

- **Update cart ->** *localhost:3000/api/carts/:cid/product/:pid*

- **Delete product ->** *localhost:3000/api/carts/:cid/product/:pid*

- **Total Cart api ->** *localhost:3000/api/carts/bills/:cid*
