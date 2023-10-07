
const productModel = require("../Models/Product_Model")





const checkID = async (req , res , next) =>{
    productModel.findById(req.body.id).then((data) =>{
        next()
    }).catch((error) => {
        res.json({"error" : "Such product id dosenot exist."})
    })
}


module.exports = checkID