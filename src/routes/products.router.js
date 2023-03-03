import {Router} from "express";
import { json } from "express";
import ProductManager from "../productManager";


const productRouter = Router();
const productos=new ProductManager();


productRouter.use(json());


productRouter.get("/", async (req, res) => {
    const prods =await productos.getProducts();
    const {limit} = req.query;
        if(limit){
            return res.send(prods.slice(0,limit));

        }else  res.send(prods);
});

productRouter.get("/:pid", async (req, res)=>{
    const idp=req.params;
    const prods = await productos.getProductsById(idp);
        if(prods){
             return res.send(prods);
        }
        else{
            resp.send(`El producto con codigo ${idp} no existe`); 
        }
        
});


productRouter.post("/", (req,res)=>{
    
    const {title, description,code,price,status,stock, category, thumbnails}=req.body;
    productos.addProduct(
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails
    );

    // mo retorno nada, no estaba en las instrucciones de la entrega
});

productRouter.put("/:pid", (req,res)=>{

    const idp=req.params;
    const updateData=req.query;
            if (!idp || !updateData) {
                return res.status(400).send({error:"Bad Request"})
            }else{
                productos.updateProduct(idp, updateData);
            }
    

});

productRouter.delete("/:pid", (req,res)=>{
    const idp =req.params;
    productos.deleteProduct(idp);

    //verificar los retornos

});

export default productRouter;