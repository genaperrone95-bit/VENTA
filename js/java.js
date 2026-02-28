console.log("JS conectado correctamente");

document.addEventListener("DOMContentLoaded", () => {

    const botones = document.querySelectorAll(".add-to-cart");
    const contador = document.getElementById("cart-count");

    function obtenerCarrito() {
        return JSON.parse(localStorage.getItem("carrito")) || [];
    }

    function guardarCarrito(carrito) {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    function actualizarContador() {
        const carrito = obtenerCarrito();
        const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        if (contador) contador.textContent = totalItems;
    }

    botones.forEach(boton => {

        boton.addEventListener("click", () => {

            const producto = boton.closest(".product-card");

            const nombre = producto.dataset.name;
            const precio = parseInt(producto.dataset.price);

            let carrito = obtenerCarrito();

            const existe = carrito.find(item => item.nombre === nombre);

            if (existe) {
                existe.cantidad += 1;
            } else {
                carrito.push({
                    nombre,
                    precio,
                    cantidad: 1
                });
            }

            guardarCarrito(carrito);
            actualizarContador();
        });
    });

    actualizarContador();
});