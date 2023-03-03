import fs from "fs";

class ProductManager {
  #path = "./products.json";

  constructor() {}

  async addProduct(title,description,code,price,status,stock,category,thumbnails) {
    
    contador = (await this.contadorUnico())+1;
    const products = await this.getProducts();
    let exist = products.find((a) => a.code === code);

        if(exist){
            // preguntar como devolver al server desde la clase un mensaje de error.
            console.error("El codigo de producto que quieres crear ya existe");
        }
        else{
            const newProduct = {
              contador,
              title,
              description,
              code,
              price,
              status,
              stock,
              category,
              thumbnails,
            };
        }

    const updProducts = [...products, newProduct];
    await fs.promises.writeFile(this.#path, JSON.stringify(updProducts));
  }

  async getProducts() {
    try {
      const products = await fs.promises.readFile(this.#path, "utf-8");
      return JSON.parse(products);
    } catch (e) {
      return [];
    }
  }

  async getProductsById(id) {
    console.log(id);
    try {
      const products = await this.getProducts();
      let prodB = products.filter((p) => p.contador === id);
      console.log(prodB);
    } catch (error) {
      console.error("El producto especificado no existe ");
    }
  }

  async updateProduct(id, nuevo_valor) {
    
    try {
        const productsU = await this.getProducts();
        let prodU = productsU.filter((u)=>u.contador===id);
        let prodIX = productsU.findIndex((obj) => obj.contador === id);

        if(prodU){
            // se pueden retornar error status desde la clase ?
             console.log(
               "Ha ocurrido un error no se puede actualizar el producto"
             );
        }

        const updateProd = productsU.map((u)=> {
            if(u.contador===id){
                return {contador: u.contador, ...nuevo_valor};
            }

        });

        productsU=updateProd;
        await fs.promises.unlink(this.#path);
        await fs.promises.writeFile(this.#path, JSON.stringify(productsU));
        

    } catch (error) {
      console.log("Ha ocurrido un error no se puede actualizar el producto");
    }
  }


  async deleteProduct(id) {
    //crear nuevo arreglo con los prodcutos excepto el del id enviado
    try {
      const products = await this.getProducts();
      let nuevosProd = products.filter((producto) => producto.contador != id);
      await fs.promises.unlink(this.#path);
      await fs.promises.writeFile(this.#path, JSON.stringify(nuevosProd));
    } catch (error) {
      console.log("Ha ocurrido un error no se puede borrar el producto");
    }
  }

  async contadorUnico() {
    let ids = [];
    const products = await this.getProducts();

    for (let x = 0; x < products.length; x++) {
      ids[x] = parseInt(products[x].contador);
    }
    //retorno el id mayor despues de ordenar y se agregar el consecutivo
    let id = ids.sort(function (a, b) {
      return b - a;
    });
    return ids[0];
  }
}

export default ProductManager;
