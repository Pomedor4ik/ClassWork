// let formData = {}
// const form = { 
//     name: document.querySelector('input[form-name]'),
//     message: document.querySelector('textarea[form-message]'),
//     btnSend: document.querySelector('button[form-btn = "send"]'),
// }

// let tempForm = JSON.parse(localStorage.getItem('form'))

// if (tempForm.name){ 
//     formData = JSON.parse(localStorage.getItem('form'))
//     form.name.value = formData.name ? formData.name : ''
//     form.message.value = formData.message ? formData.message : ''
// } else { 
//     localStorage.setItem('form', JSON.stringify({}))
// }

// setFormData = (newData) => {
//     formData = {...newData}
//     localStorage.setItem('form', JSON.stringify(formData))
//  }

// form.name.addEventListener('input', () => {
//     formData = { 
//         ...formData,
//         name: form.name.value
//     }
//     setFormData(formData)
// })

// form.message.addEventListener('input', () => {
//     formData = { 
//         ...formData,
//         message: form.message.value
//     }
//     setFormData(formData)
// })

// form.btnSend.addEventListener('click', () => {
//     localStorage.removeItem('form')
//     window.location.reload()
// })



let formData = {}
const form = {
    name: document.querySelector('input[form-name]'),
    email: document.querySelector('input[form-email]'),
    password: document.querySelector('input[form-password]'),
    btnSend: document.querySelector('button[form-btn = "send"]'),
}

// let tempForm = JSON.parse(localStorage.getItem('form'))

// if (tempForm.name){ 
//     formData = JSON.parse(localStorage.getItem('form'))
//     form.name.value = formData.name ? formData.name : ''
//     form.email.value = formData.email ? formData.email : ''
//     form.password.value = formData.password ? formData.password : ''
// } else { 
//     localStorage.setItem('form', JSON.stringify({}))
// }



if (localStorage.getItem('form')){ 
    formData = JSON.parse(localStorage.getItem('form'))
    form.name.value = formData.name  ? formData.name : ''
    form.email.value = formData.email ? formData.email : ''
    form.password.value = formData.password ? formData.password : ''
} else { 
    localStorage.setItem('form', JSON.stringify({}))
}

setFormData = (newData) => {
    formData = {...newData}
    localStorage.setItem('form', JSON.stringify(formData))
}

form.name.addEventListener('input', () => {
    formData = { 
        ...formData,
        name: form.name.value
    }
    setFormData(formData)
})

form.email.addEventListener('input', () => {
    formData = { 
        ...formData,
        email: form.email.value
    }
    setFormData(formData)
})

form.password.addEventListener('input', () => {
    formData = { 
        ...formData,
        password: form.password.value
    }
    setFormData(formData)
})

form.btnSend.addEventListener('click', () => {
    localStorage.removeItem('form')
    window.location.reload()
})