import fs from "fs";
import ProductManager from "./productManager";


class cartManager{
    #pathc= "./carts.json";

    constructor(){}

    async addCart(product){

        idc=this.getIdCart();
        let carts = await this.getCart();
        const newCart={id:idc , products: []};

        const cartsUpd=[...carts, newCart];
        await fs.promises.writeFile(this.#pathc, JSON.stringify(cartsUpd));
        
    }

    async getCart(cId){
        try {
                if(cId){
                    
                    const carts = await fs.promises.readFile(this.#pathc,"utf-8");
                    const cartFind= carts.filter((p)=> p.id === cId);
                    return cartFind;
                }
                else{
                    const carts = await fs.promises.readFile(this.#pathc,"utf-8");
                    return JSON.parse(products);
                }
             
        } catch (error) {
            console.error("Problemas para obtener informacion del carrito de compras");
            return [];
        }

    }

    async getIdCart(){
        const idc = Math.random().toString(30).substring(2);    
        return idc;
    }
}

export default cartManager;

