const express = require("express");
const mercadopago = require("mercadopago");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mercadopago.configure({
    access_token: "TU_ACCESS_TOKEN_PRIVADA"
});

app.post("/crear_preferencia", async (req, res) => {

    try {
        const preference = {
            items: req.body.items,
            back_urls: {
                success: "https://tusitio.com/success.html",
                failure: "https://tusitio.com/failure.html",
                pending: "https://tusitio.com/pending.html"
            },
            auto_return: "approved"
        };

        const response = await mercadopago.preferences.create(preference);

        res.json({ preferenceId: response.body.id });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});