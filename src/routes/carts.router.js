import { Router } from "express";
import { json } from "express";
import cartManager from "../cartsManager";

const cartRouter = Router();
cartRouter.use(json());
const carts = new cartManager;


cartRouter.get("/:cid", async (req, res)=>{
    const idc= req.query;
    const cart = await carts.getIdCart(idc);
    res.send(cart);
});

cartRouter.post("/", async (req,res)=>{
    // agregar productos a un carro completamente nuevo
    const {prod}= req.body;
    const newCart = await carts.addCart(prod);
    const result = await carts.getCart();
    await res.send(result);

});

cartRouter.post("/cid", (req,res)=>{

});

export default cartRouter;