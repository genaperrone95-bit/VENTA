document.addEventListener("DOMContentLoaded", async () => {

  const response = await fetch("http://localhost:3000/crear_preferencia", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          title: "Producto prueba",
          quantity: 1,
          unit_price: 1000,
        },
      ],
    }),
  });

  const data = await response.json();

  const mp = new MercadoPago("APP_USR-a823591d-cb95-4fb3-8e99-2967af8a2eb0");

  const bricksBuilder = mp.bricks();

  bricksBuilder.create("wallet", "wallet_container", {
    initialization: {
      preferenceId: data.preferenceId,
    },
  });

});