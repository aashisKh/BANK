

let del = document.querySelectorAll(".delete")
$('#updateContainer').hide()
const deleteProduct = async(e)=>{
    e.preventDefault()
    let pId = (e.target.parentElement.parentElement.getAttribute('data-id'))
    let productID = {
        id : pId
    }
    let deletedResponse = await fetch("http://localhost:5001/api/deleteProduct" , {
        method : "DELETE",
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(productID)
    })

    let respJson = await deletedResponse.json()
    if(respJson.message){
        e.target.parentElement.parentElement.remove()
    }
    if(respJson.error){
        alert("cannot delete product")
    } 
}

del.forEach((row) =>{
    row.addEventListener('click' , deleteProduct)
})

$('.update').click(function(e){
    e.preventDefault()
    $('#updateContainer').show()
    updateModal(e)
})

$('.close').click(function(){
    $('#updateContainer').hide()
})

// update product section


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

    $('#updateContainer').hide()
}



// this function is for search data in tables.
let productSearchBar = document.getElementById("productSearchBar")
productSearchBar.onkeyup = (e) => {
    let searchValue = e.target.value
    const regex = new RegExp(searchValue, 'gi')
    let selectedRows = document.querySelectorAll("table tr:not(#tableHeading)")

    $.each(selectedRows, (index, value) => {
        let test = regex.test((value.children[0].innerText))
        if (test == false) {
            $(value).hide("fast")
        } else {
            let spa = document.createElement("span")
            spa.innerText = ""
            spa.innerText = searchValue
            let d = value.children[0].innerText.replace(regex, `<b class="bold">${spa.innerText}</b>`)
            value.children[0].innerHTML = d
            $(value).show("fast")
        }



    })

}


