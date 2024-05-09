document.addEventListener("DOMContentLoaded", function() {
  const productos = [];

  // Función para cargar los productos en la tabla
  function cargarProductos() {
    const tbody = document.querySelector("#product-table tbody");
    tbody.innerHTML = "";
    productos.forEach(producto => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>${producto.descripcion}</td>
        <td>${producto.cantidad}</td>
        <td>${producto.precio}</td>
        <td>${producto.iva}</td>
        <td>${producto.descuento}</td>
        <td>${producto.estado}</td>
        <td>
          <button class="edit-btn">Editar</button>
          <button class="delete-btn">Eliminar</button>
        </td>
      `;
      tr.querySelector(".edit-btn").addEventListener("click", () => editarProducto(producto.id));
      tr.querySelector(".delete-btn").addEventListener("click", () => mostrarConfirmacionEliminar(producto.id));
      tbody.appendChild(tr);
    });
  }

  // Agregar evento click al botón "Agregar Producto"
  document.querySelector("#add-product-btn").addEventListener("click", () => {
    document.querySelector("#add-product-modal").style.display = "block";
  });

  // Agregar evento click al botón de cerrar del modal de agregar producto
  document.querySelector("#add-product-modal .close").addEventListener("click", () => {
    document.querySelector("#add-product-modal").style.display = "none";
  });

  // Agregar evento submit al formulario de agregar producto
  document.querySelector("#add-product-form").addEventListener("submit", event => {
    event.preventDefault();
    const nombre = document.querySelector("#product-name").value.trim();
    const descripcion = document.querySelector("#product-description").value.trim();
    const cantidad = document.querySelector("#product-quantity").value.trim();
    const precio = document.querySelector("#product-price").value.trim();
    const iva = document.querySelector("#product-iva").value.trim();
    const descuento = document.querySelector("#product-discount").value.trim();
    const estado = document.querySelector("#product-state").value;
    const id = productos.length + 1;
    const nuevoProducto = { id, nombre, descripcion, cantidad, precio, iva, descuento, estado };
    productos.push(nuevoProducto);
    cargarProductos();
    document.querySelector("#add-product-modal").style.display = "none";
    alert("Producto registrado correctamente");
  });

  // Función para mostrar el modal de confirmación de eliminación
  function mostrarConfirmacionEliminar(productoId) {
    const modal = document.querySelector("#delete-product-modal");
    modal.style.display = "block";

    // Agregar evento click al botón "Eliminar" del modal de confirmación
    document.querySelector("#confirm-delete-btn").addEventListener("click", () => {
      eliminarProducto(productoId);
      modal.style.display = "none";
    });

    // Agregar evento click al botón "Cancelar" del modal de confirmación
    document.querySelector("#cancel-delete-btn").addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  // Función para eliminar un producto
  function eliminarProducto(productoId) {
    const index = productos.findIndex(producto => producto.id === productoId);
    productos.splice(index, 1);
    cargarProductos();
    alert("Producto eliminado correctamente");
  }

  // Función para editar un producto
  function editarProducto(productoId) {
    const producto = productos.find(producto => producto.id === productoId);
    // Aquí puedes implementar la lógica para editar un producto
    alert("Editar producto ID: " + productoId);
  }
});
