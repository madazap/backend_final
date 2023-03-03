import express from "express";
import productRouter from "./routes/products.router";
import cartRouter from "./routes/carts.router";

const app = express();
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use(express.json());


app.listen(8080, () => {
  console.log("Servidor escuchando por 8080");
});

