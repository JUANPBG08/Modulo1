document.addEventListener("DOMContentLoaded", function() {
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
    sidebarLinks.forEach(function(link) {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        const currentActive = document.querySelector('.sidebar ul li.active');
        currentActive.classList.remove('active');
        this.parentNode.classList.add('active');
      });
    });
  
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
          <td>${producto.categoria}</td>
          <td>${producto.precio}</td>
          <td>${producto.stock}</td>
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
      const categoria = document.querySelector("#product-category").value.trim();
      const precio = document.querySelector("#product-price").value.trim();
      const stock = document.querySelector("#product-stock").value.trim();
      const id = productos.length + 1;
      const nuevoProducto = { id, nombre, categoria, precio, stock };
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
  