document.addEventListener("DOMContentLoaded", function() {
    const ventas = [];
  
    // Función para cargar las ventas en la tabla
    function cargarVentas() {
      const tbody = document.querySelector("#sales-table tbody");
      tbody.innerHTML = "";
      ventas.forEach(venta => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${venta.id}</td>
          <td>${venta.cliente}</td>
          <td>${venta.fecha}</td>
          <td>${venta.estado}</td>
          <td>${venta.total}</td>
          <td>
            <button class="view-btn" data-id="${venta.id}">Ver Detalles</button>
          </td>
        `;
        tr.querySelector(".view-btn").addEventListener("click", e => verDetallesVenta(e.target.dataset.id));
        tbody.appendChild(tr);
      });
    }
  
    // Agregar evento click al botón "Agregar Venta"
    document.querySelector("#add-sale-btn").addEventListener("click", () => {
      document.querySelector("#add-sale-modal").style.display = "block";
    });
  
    // Agregar evento click al botón de cerrar del modal de agregar venta
    document.querySelector("#add-sale-modal .close").addEventListener("click", () => {
      document.querySelector("#add-sale-modal").style.display = "none";
    });
  
    // Agregar evento submit al formulario de agregar venta
    document.querySelector("#add-sale-form").addEventListener("submit", event => {
      event.preventDefault();
      const cliente = document.querySelector("#client-name").value;
      const fecha = new Date().toLocaleDateString();
      const estado = "Borrador"; // Por defecto
      const total = 0; // Por defecto
      const venta = { id: ventas.length + 1, cliente, fecha, estado, total };
      ventas.push(venta);
      cargarVentas();
      alert("Venta agregada correctamente");
      document.querySelector("#add-sale-modal").style.display = "none";
    });
  
    // Función para ver los detalles de una venta
    function verDetallesVenta(ventaId) {
      const venta = ventas.find(venta => venta.id === parseInt(ventaId));
      const detalles = `
        ID: ${venta.id}
        Cliente: ${venta.cliente}
        Fecha: ${venta.fecha}
        Estado: ${venta.estado}
        Total: ${venta.total}
      `;
      alert(detalles);
    }
  
    // Función para calcular el cambio
    document.querySelector("#calculate-change-btn").addEventListener("click", () => {
      const total = parseFloat(document.querySelector("#total").textContent);
      const cash = parseFloat(document.querySelector("#cash").value);
      const change = cash - total;
      document.querySelector("#change").textContent = change.toFixed(2);
    });
  
    // Función para aprobar una venta
    document.querySelector("#approve-sale-btn").addEventListener("click", () => {
      // Aquí puedes implementar la lógica para aprobar una venta
      alert("Venta aprobada correctamente");
    });
  
    // Función para cancelar una venta
    document.querySelector("#cancel-sale-btn").addEventListener("click", () => {
      // Aquí puedes implementar la lógica para cancelar una venta
      alert("Venta cancelada correctamente");
    });
  
    // Función para marcar una venta como pagada
    document.querySelector("#pay-sale-btn").addEventListener("click", () => {
      // Aquí puedes implementar la lógica para marcar una venta como pagada
      alert("Venta marcada como pagada correctamente");
    });
  
    // Función para filtrar las ventas
    document.querySelector("#search-btn").addEventListener("click", () => {
      const fecha = document.querySelector("#date").value;
      const cliente = document.querySelector("#client").value;
      const estado = document.querySelector("#status").value;
      const ventasFiltradas = ventas.filter(venta => {
        return (fecha === "" || venta.fecha === fecha) &&
               (cliente === "" || venta.cliente === cliente) &&
               (estado === "" || venta.estado === estado);
      });
      mostrarVentasFiltradas(ventasFiltradas);
    });
  
    // Función para mostrar las ventas filtradas en la tabla
    function mostrarVentasFiltradas(ventasFiltradas) {
      const tbody = document.querySelector("#sales-table tbody");
      tbody.innerHTML = "";
      ventasFiltradas.forEach(venta => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${venta.id}</td>
          <td>${venta.cliente}</td>
          <td>${venta.fecha}</td>
          <td>${venta.estado}</td>
          <td>${venta.total}</td>
          <td>
            <button class="view-btn" data-id="${venta.id}">Ver Detalles</button>
          </td>
        `;
        tr.querySelector(".view-btn").addEventListener("click", e => verDetallesVenta(e.target.dataset.id));
        tbody.appendChild(tr);
      });
    }
  
    // Inicialización de la página
    cargarVentas();
  });
  