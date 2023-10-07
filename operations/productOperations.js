const {connectDb} = require("../dbConnection/connection")
const productModel = require("../Models/Product_Model")
connectDb()

const add_new_product = async (product)=>{
  console.log("product",product)
    const response = await productModel.create(product)

    return response
  }
  

  
  const delelteProduct = async (pID)=>{
     let del = await  productModel.findByIdAndDelete(pID)
     return del
      
  }
 
  const updateProduct = async (pID , data )=>{
    
    let updatedData = await productModel.findByIdAndUpdate(pID , data[0] , {new : true})
    
    return updatedData

    }

    

const getAllProducts = async ()=>{
  let allProducts = await productModel.find({} , {__v : 0 , createdAt : 0, updatedAt : 0})
  allProducts.forEach((product) => {
    product.expireDate = product.expireDate.slice(0,15)
  })
  return allProducts
}

module.exports = {getAllProducts , updateProduct , delelteProduct , add_new_product}