const {connectDb , closeConnection} = require("../dbConnection/connection")
connectDb()

const productModel = require("../Models/Product_Model")

const calculateExpireDate = async () => {
    let products = await productModel.find()
    const filterProducts = products.filter((product) => {
        let seconds = 0, minutes = 0, hours = 0, days = 0, months = 0, years = 0

        let diff = new Date(product.expireDate) - new Date()
        seconds = Math.floor(diff / 1000)
        minutes = Math.floor(seconds / 60)
        hours = Math.floor(minutes / 60)
        days = Math.floor(hours / 24)
        months = Math.floor(days / 30)
        years = Math.floor(days / 365)

        seconds %= 60;
        minutes %= 60;
        hours %= 24;
        days %= 30;
        months %= 12;

        if (years == 0 && months <= 3 && product.active == true) {
            return product
        }
    })

    let text = ''
    filterProducts.forEach((product)=>{
        text += `\n${product.name} ${product.category} from ${product.vendor} is going to expire on ${product.expireDate}. Please renew it in time.\n
        Related Information:\n
        Model: ${product.model} \n`
    })
    return text
}

module.exports = calculateExpireDate