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
  
    const clientes = [];
  
    // Función para cargar los clientes en la tabla
    function cargarClientes() {
      const tbody = document.querySelector("#client-table tbody");
      tbody.innerHTML = "";
      clientes.forEach(cliente => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${cliente.id}</td>
          <td>${cliente.identificationType}</td>
          <td>${cliente.identificationNumber}</td>
          <td>${cliente.nombre}</td>
          <td>${cliente.apellidos}</td>
          <td>${cliente.telefono}</td>
          <td>${cliente.direccion}</td>
          <td>${cliente.ciudad}</td>
          <td>${cliente.estado}</td>
          <td>
            <button class="edit-btn">Editar</button>
            <button class="delete-btn">Eliminar</button>
            <button class="toggle-btn">${cliente.estado === "Activo" ? "Desactivar" : "Activar"}</button>
          </td>
        `;
        tr.querySelector(".edit-btn").addEventListener("click", () => editarCliente(cliente.id));
        tr.querySelector(".delete-btn").addEventListener("click", () => mostrarConfirmacionEliminar(cliente.id));
        tr.querySelector(".toggle-btn").addEventListener("click", () => toggleEstadoCliente(cliente.id));
        tbody.appendChild(tr);
      });
    }
  
    // Agregar evento click al botón "Agregar Cliente"
    document.querySelector("#add-client-btn").addEventListener("click", () => {
      document.querySelector("#add-client-modal").style.display = "block";
    });
  
    // Agregar evento click al botón de cerrar del modal de agregar cliente
    document.querySelector("#add-client-modal .close").addEventListener("click", () => {
      document.querySelector("#add-client-modal").style.display = "none";
    });
  
    // Agregar evento submit al formulario de agregar cliente
    document.querySelector("#add-client-form").addEventListener("submit", event => {
      event.preventDefault();
      const identificationType = document.querySelector("#identification-type").value;
      const identificationNumber = document.querySelector("#identification-number").value.trim();
      const nombre = document.querySelector("#client-name").value.trim();
      const apellidos = document.querySelector("#client-lastname").value.trim();
      const telefono = document.querySelector("#client-phone").value.trim();
      const direccion = document.querySelector("#client-address").value.trim();
      const ciudad = document.querySelector("#client-city").value.trim();
      const estado = document.querySelector("#client-state").value;
      const id = clientes.length + 1;
      const nuevoCliente = { id, identificationType, identificationNumber, nombre, apellidos, telefono, direccion, ciudad, estado };
      clientes.push(nuevoCliente);
      cargarClientes();
      document.querySelector("#add-client-modal").style.display = "none";
      alert("Cliente registrado correctamente");
    });
  
    // Función para mostrar el modal de confirmación de eliminación
    function mostrarConfirmacionEliminar(clienteId) {
      const modal = document.querySelector("#delete-client-modal");
      modal.style.display = "block";
  
      // Agregar evento click al botón "Eliminar" del modal de confirmación
      document.querySelector("#confirm-delete-btn").addEventListener("click", () => {
        eliminarCliente(clienteId);
        modal.style.display = "none";
      });
  
      // Agregar evento click al botón "Cancelar" del modal de confirmación
      document.querySelector("#cancel-delete-btn").addEventListener("click", () => {
        modal.style.display = "none";
      });
    }
  
    // Función para eliminar un cliente
    function eliminarCliente(clienteId) {
      const index = clientes.findIndex(cliente => cliente.id === clienteId);
      clientes.splice(index, 1);
      cargarClientes();
      alert("Cliente eliminado correctamente");
    }
  
    // Función para editar un cliente
    function editarCliente(clienteId) {
      const cliente = clientes.find(cliente => cliente.id === clienteId);
      // Aquí puedes implementar la lógica para editar un cliente
      alert("Editar cliente ID: " + clienteId);
    }
  
    // Función para activar o desactivar un cliente
    function toggleEstadoCliente(clienteId) {
      const cliente = clientes.find(cliente => cliente.id === clienteId);
      cliente.estado = cliente.estado === "Activo" ? "Inactivo" : "Activo";
      cargarClientes();
      alert(`Cliente ${cliente.estado === "Activo" ? "activado" : "desactivado"} correctamente`);
    }
  });
  