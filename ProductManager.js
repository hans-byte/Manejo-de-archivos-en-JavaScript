class ProductManager {
    constructor(path){
        this.path = path
    }
    
    //VAlIDADO
    async getProducts(){
        try{
            if (fs.existsSync(this.path)){
                const productsArray = await JSON.parse(fs.promises.readFile(this.path,"utf-8"))
                return productsArray
            }else{
                return []
            }
        }catch(error){
            return console.log(error)
        }

    }
    
    async getProductById(idPassed){
        try{
            const existingProducts = await this.getProducts()
            const productFinded = existingProducts.find((x) => x.id === idPassed)
            if(productFinded){
                return console.log(`The id passed correspond to the following product ${productFinded}`)
            }else{
                return console.log("The id passed does not correspond to any product")
            }
        } catch(error){
            return console.log(error)
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
            
            if(!this.path.length){
                existingProducts.push(newProduct)
                await fs.promises.writeFile(this.path,JSON.stringify(existingProducts))
                return console.log("Product added")
            }else{
                const codeRepited = existingProducts.find(x => x.code === newProduct.code)
                if(codeRepited){
                    return console.log("Code repited. It won´t be added")
                }else{
                    existingProducts.push(newProduct)
                    return await fs.promises.writeFile(this.path,JSON.stringify(existingProducts))
                }
            }
        }catch(error){
            return console.log(error)
        }

    }
    
    
    async deleteProductById(idToBeDeleted){
        try{
            const existingProducts = await this.getProducts()
            const newArray = existingProducts.filter(x => x.id !== idToBeDeleted)
            await fs.promises.writeFile(this.path,JSON.stringify(newArray))
        } catch(error){
            return console.log(error)
        }
    }
    
    async updateProduct(idToBeUpdated, obj)
        try{
            const existingProducts = await this.getProducts()
            const indexToBeUpdated = existingProducts.findIndex(x => x.id === idToBeUpdated)
            if(indexToBeUpdated === 1){
                const productToBeUpdated = existingProducts[indexToBeUpdated]
                existingProducts[indexToBeUpdated] = {...productToBeUpdated,...obj} 
                await fs.promises.writeFile(this.path,JSON.stringify(existingProducts))
                
            }else{
                return console.log("There´s no match between the id passed and the DB array")
            }
        }catch(error){
            return console.log(error)
        }

}
