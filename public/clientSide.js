const socket = io();

const renderLista = Handlebars.compile(
  `<h3>Lista de Productos</h3>
  {{#if productosExisten}}
    <table class='table table-striped'>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio</th>
          <th></th>
        </tr>
      </thead>
      {{#each productos}}
        <tr>
          <td>{{title}}</td>
          <td>{{price}}</td>
          <td><img width='50px' src='{{thumbnail}}' alt='' /></td>
        </tr>
      {{/each}}
    </table>
  {{else}}
    <h4>{{error}}</h4>
  {{/if}}`
);

const createProducto = () => {
  const producto = {
    title: document.getElementById('title').value,
    price: document.getElementById('price').value,
    thumbnail: document.getElementById('thumbnail').value,
  };
  socket.emit('agregado-producto', producto);
};

socket.on('atodos', (datos) => {
  const updateLista = renderLista(datos);
  document.getElementById('lista-productos').innerHTML = updateLista;
  // console.log(datos);
});
