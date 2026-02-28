const express = require("express");
const cors = require("cors");
const { MercadoPagoConfig, Preference } = require("mercadopago");

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 Reemplazá con tu Access Token REAL
const client = new MercadoPagoConfig({
  accessToken: "TEST-XXXXXXXXXXXXXXXX",
});

app.post("/crear_preferencia", async (req, res) => {
  try {
    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: req.body.items
      }
    });

    res.json({
      preferenceId: response.id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear preferencia" });
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});