import { Router } from "express";
import { json } from "express";
import cartManager from "../cartsManager";

const cartRouter = Router();
let carts = [];
cartRouter.use(json());

cartRouter.get("/:cid", (req, res)=>{
    //listar productos del carrito
});

cartRouter.post("/", (req,res)=>{

});

cartRouter.post("/cid", (req,res)=>{

});

export default cartRouter;