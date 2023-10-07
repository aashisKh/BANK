
// update data section

// update modal section 

let productId
let selectedRow

let pprice = document.querySelectorAll('.checknum')

pprice.forEach((data) => {
    data.addEventListener('keypress', (e) => {
        if (!e.key.match(/[0-9]/g)) {
            e.preventDefault()
        }
        if (e.target.id == 'contact') {
            if (e.target.value.length > 9) {
                e.preventDefault()
            }

        }
    })
})


const updateModal = (e) => {
    selectedRow = e.target.parentElement.parentElement
    productId = selectedRow.getAttribute('data-id')
    let inputIds = ['name', 'model', 'price', 'category', 'expireDate', 'active', 'vendor', 'address', 'contact']

    for (i = 0; i < (selectedRow.childElementCount - 1); i++) {
        let input = document.getElementById(inputIds[i])
        if (inputIds[i] == 'active') {
            input.selectedIndex = selectedRow.children[i].innerText == 'Active' ? 0 : 1
        } else {
            input.value = selectedRow.children[i].innerText
        }


    }


}


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




let updateButton = document.getElementById('update')

updateButton.onclick = (e) => {
    e.preventDefault()

    let updatedValues = $('form').serializeArray()
    let isEmpty = dataValidation(updatedValues)

    if (isEmpty == true) {
        alert("any form cannot be empty")
    }
    if (isEmpty == false) {
        sendData(updatedValues)
    }


}


const sendData = async (products) => {
    let productDetails = manageFormData(products)

    let response = await fetch("http://localhost:5001/api/updateProduct", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: productId, payload: productDetails })
    })

    let updatedResponseData = await response.json()

    // let {name , model , price , category , expireDate , active , vendor , address , contact} = updatedResponseData

    // for(i = 0; i < (selectedRow.childElementCount - 1); i++){

    // }

    // console.log("before delete",updatedResponseData)
    delete updatedResponseData._id
    delete updatedResponseData.__v
    delete updatedResponseData.createdAt
    delete updatedResponseData.updatedAt

    console.log(selectedRow)
    let i = 0
    for (data in updatedResponseData) {
        console.log(updatedResponseData[data])
        if (data == 'active') {
            selectedRow.children[i].innerText = updatedResponseData[data] == true ? 'Active' : 'Inactive'
        } else {
            selectedRow.children[i].innerText = updatedResponseData[data]
        }

        i++
    }

}