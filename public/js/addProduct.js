let pprice = document.querySelectorAll('.checknum')

pprice.forEach((data) => {
    data.addEventListener('keypress', (e) => {

        if (!e.key.match(/[0-9]/g)) {
            e.preventDefault()
        }
        if (e.target.name == 'contact') {
            if (e.target.value.length > 9) {
                e.preventDefault()
            }

        }
    })
})

const manageFormData = (formArray) => {
    let storeProducts = []
    let obj = {}
    for (i = 0; i < formArray.length; i++) {
        let { name, value } = formArray[i]
        obj[formArray[i].name] = formArray[i].value

    }
    storeProducts.push(obj)
    return storeProducts
}

$("#submit").click(async function (e) {
    e.preventDefault()
    let formData = $("form").serializeArray()
    let res = dataValidation(formData)

    if (res == true) {
        alert("any form cannot be empty")
    }
    if (res == false) {
        sendData(formData)
    }



})


const dataValidation = (list) => {

    let isEmpty = true
    for (let i = 0; i < list.length; i++) {
        let { name, value } = list[i]
        if (list[i].value != '') {
            isEmpty = false
        } else {
            isEmpty = true
            break
        }
    }
    return isEmpty
}

const sendData = async (products) => {
    let productDetails = manageFormData(products)
   
        let response = await fetch("http://localhost:5001/api/addProducts", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productDetails)
        })
    
        let b = await response.json()
        console.log(b)
    
        window.location = "http://localhost:5001/api/getproducts"
    
    
}


// const makeFormEmpty = () => {
//     let input = document.get
// }

