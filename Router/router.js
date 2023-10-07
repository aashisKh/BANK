
const router = require("express").Router()
const sendMail = require('../mail/mail')
const calculateExpireDate = require("../checkExpiryDate/calculateExpire")
const { getAllProducts, add_new_product, delelteProduct, updateProduct } = require("../operations/productOperations")

const checkID = require("../middleware/checkId")

router.get('/sendmail', async (req, res) => {
    let messageTemplate = await calculateExpireDate()
    let message = {}
    let finalResult = {
        response: await sendMail(messageTemplate),
        sentTime: new Date().toUTCString()
    }
    console.log(finalResult)
    if (finalResult.response.accepted) {
        message = {}
        message.status = "success"
        res.render('sendMessage', { message })
    }
    if (finalResult.response.status) {
        message = {}
        message.status = "failed"
        res.render('sendMessage', { message })
    }
})

router.get('/test', async (req, res) => {
    let messageTemplate = await calculateExpireDate()
    res.send(messageTemplate)
})

router.get('/addProduct', async (req, res) => {
    // let [{name , model , price , category , expireDate , vendor , address , contact}] = req.body
    // let response = await add_new_product(req.body)
    // res.json(response)
    res.render("addProduct")
})

router.post('/addProducts', async (req, res) => {
    console.log(" bodys ", req.body)
    let response = await add_new_product(req.body)
    res.json(response)
})

router.get('/getproducts', async (req, res) => {
    let allproducts = await getAllProducts()
    // res.json(allproducts)
    res.render('getProducts', { allproducts })
})



router.delete('/deleteProduct', checkID, async (req, res) => {
    delelteProduct(req.body.id).then((data) => {
        res.json({ "message": "product deleted successfully" })
    }).catch((error) => {
        res.json({ "error": "Couldnot delete product" })
    })

})

router.put('/updateProduct', async (req, res) => {
    let { id, payload } = req.body
    console.log(id, payload)
    let updatedData = await updateProduct(id, payload)

    //    console.log(updatedData)
    res.json(updatedData)
})

module.exports = router