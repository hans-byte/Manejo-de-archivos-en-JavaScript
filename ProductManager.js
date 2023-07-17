const fs = require('fs')

class ProductManager {
    constructor(path){
        this.path = path
    }
    
    async getProducts(){
        try{
            if (fs.existsSync(this.path)){
                const productsArray = await fs.promises.readFile(this.path,"utf-8")
                return JSON.parse(productsArray)
            }else{
                return []
            }
        }catch(error){
            return error
        }

    }
    
    async getProductById(idPassed){
        try{
            const existingProducts = await this.getProducts()
            const productFinded = existingProducts.find((x) => x.id === idPassed)
            if(productFinded){
              
                return console.log(`The id passed correspond to the following product ${productFinded.title}`)
            }else{
                return console.log("The id passed does not correspond to any product")
            }
        } catch(error){
            return error
        }

    }
    
    async addProduct(title,description,price,thumbnail,code,stock){
        try{
            const existingProducts = await this.getProducts()
            const id = existingProducts.length === 0 ? 1 : existingProducts[existingProducts.length - 1].id + 1
            const newProduct = {
                id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            if(!existingProducts.length){
                existingProducts.push(newProduct)
                await fs.promises.writeFile(this.path,JSON.stringify(existingProducts))
                return console.log("Product added")
            }else{
                const codeRepited = existingProducts.find((x) => x.code === newProduct.code)
                if(codeRepited){
                    return console.log("Code repited. It won´t be added")
                }else{
                    existingProducts.push(newProduct)
                    return await fs.promises.writeFile(this.path,JSON.stringify(existingProducts))
                }
            }
        }catch(error){
            return error
        }

    }
    
    async deleteProductById(idToBeDeleted){
        try{
            const existingProducts = await this.getProducts()
            const idCorrect = existingProducts.find(x => x.id === idToBeDeleted)
            if (idCorrect){
              const newArray = existingProducts.filter(x => x.id !== idToBeDeleted)
              await fs.promises.writeFile(this.path,JSON.stringify(newArray))
            }else{
              console.log("The id doesn´t match to any of our products")
            }
        } catch(error){
            return error
        }
    }
    
    async updateProduct(idToBeUpdated, obj){
        try{
            const existingProducts = await this.getProducts()
            const indexToBeUpdated = existingProducts.findIndex(x => x.id === idToBeUpdated) 
          if(indexToBeUpdated !== -1){
                const productToBeUpdated = existingProducts[indexToBeUpdated]
                existingProducts[indexToBeUpdated] = {...productToBeUpdated,...obj} 
                await fs.promises.writeFile(this.path,JSON.stringify(existingProducts))
                
            }else{
                return console.log("There´s no match between the id passed and the DB array")
            }
        }catch(error){
            return error
        }

    }
}
