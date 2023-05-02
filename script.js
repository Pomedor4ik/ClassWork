const productsList = document.querySelector('.productsList')
const bucketList = document.querySelector('.bucketList')
const balanceEl = document.querySelector('.balance')
const form = { 
    input: document.querySelector('#inputBalance'),
    btn: document.querySelector('.btnBalance')
}

const writeBalance = () => {
    balanceEl.innerHTML = `
    Balance: ${localStorage.getItem('balance')}$
    `
}

const setBalance = (value = 0) => {
    localStorage.setItem('balance', value)
    writeBalance()
}

setBalance()

form.btn.addEventListener('click', () => {
    let balanceCurrent = parseInt(localStorage.getItem('balance'))
    let valueAdd  = parseInt(form.input.value)
    setBalance(balanceCurrent+valueAdd)
    form.input.value = ''
})

let productsStore = [ 
    {
        id:1,
        name:"TV",
        price: 3000,
        count: 7
    },
    {
        id:2,
        name: "Phone",
        price: 5000,
        count:5
    },
    {
        id:3,
        name: "PC", 
        price: 10000,
        count:6
    }
]

let bucketStore = []



const removeProduct = (idToRemove) => { 
    productsStore = productsStore.filter(product => {
        if (product.id != idToRemove){
            return product
        }
        if (product.count > 0){
            product.count = product.count-1
            return product
        }
    })
    generateProducts()
}





// =

const removeBucket = (idToRemove) => {
    bucketStore = bucketStore.filter(bucketItem => {
        if(bucketItem.id != idToRemove){
            return bucketItem
        }
    })
    generateBucket()
}

const findItemInArray = (array, id) => { 
    let currentIndex
    array.forEach((item, index) => { 
        if (item.id == id){
            currentIndex = index
        }
    })
    return currentIndex
}

const generateProducts = () => {
    productsList.innerHTML = ''
    productsStore.forEach(product => {
        let price = product.price
        let count = product.count

        if (count < 3) {
            price *= 1.2
        }

        productsList.innerHTML += `
        <div id="product-${product.id}" class="product">
            <p class="name">${product.name}</p>
            <p class="price">${price}</p>
            <button class="btnAdd">Add to bucket</button>
            <p class="count">Count:${count}</p>
        </div>
        `
    })

    // Add button "Add all to bucket"
    productsList.innerHTML += `
        <div class="product">
            <button class="btnAddAll">Add all to bucket</button>
        </div>
    `;

    // Add event listener for "Add all to bucket" button
    const btnAddAll = document.querySelector('.btnAddAll');
    btnAddAll.addEventListener('click', () => {
        let balanceCurrent = parseInt(localStorage.getItem('balance'));
        let productsToAdd = productsStore.filter(product => product.count > 0);

        productsToAdd.forEach(product => {
            let price = product.price;

            if (product.count < 3) {
                price *= 1.2;
            }

            if (balanceCurrent - price >= 0) {
                bucketStore = [
                    ...bucketStore,
                    {...product}
                ];
                balanceCurrent -= price;
                product.count -= 1;
            } else { 
                alert("You can't add this product on bucket");
            }
        });

        setBalance(balanceCurrent);
        generateBucket();
        generateProducts();
    });

    let btnsAdd = document.querySelectorAll('.btnAdd')
    btnsAdd.forEach((btnItem) => { 
        btnItem.addEventListener('click', () => { 
            let currentId = parseInt(btnItem.parentNode.id.substring(8))
            let balanceCurrent = parseInt(localStorage.getItem('balance'))
            let price = productsStore[findItemInArray(productsStore, currentId)].price
            let count = productsStore[findItemInArray(productsStore, currentId)].count
            if (balanceCurrent - price >= 0 && count > 0) {
                bucketStore = [
                    ...bucketStore,
                    {...productsStore[findItemInArray(productsStore, currentId)]}
                ]
                removeProduct(currentId)
                generateBucket()
                setBalance(balanceCurrent-price)
            } else { 
                alert("You can't add this product on bucket")
            }
        })
    })
}

// =

const generateBucket = () => { 
    bucketList.innerHTML = ''
    bucketStore.forEach((bucketItem) => { 
        console.log(bucketItem)
        bucketList.innerHTML += `
        <div id="bucket-${bucketItem.id}" class="product">
            <p class="name">${bucketItem.name}</p>
            <p class="price">${bucketItem.price}</p>
            <button class="btnRemove">Remove</button>
        </div>
        `
    })
    let btnsRemove = document.querySelectorAll('.btnRemove')
    btnsRemove.forEach((btnItem)=> {
        btnItem.addEventListener('click', () => {
            let currentId = parseInt(btnItem.parentNode.id.substring(7))
        productsStore = [
            ...productsStore, 
            {...bucketStore[findItemInArray(bucketStore, currentId)]}
        ]
        let balanceCurrent = parseInt(localStorage.getItem('balance'))
        let price = bucketStore[findItemInArray(bucketStore, currentId)].price
        setBalance(balanceCurrent+price)
        removeBucket(currentId)
        generateProducts()
        
        })
    })
}

generateProducts()

// =========================================

let updateTable = () => {
    let timeNow = getTime();
    document.getElementById('hoursCell').innerText = timeNow.hours;
    document.getElementById('minutesCell').innerText = timeNow.minutes;
    document.getElementById('secondsCell').innerText = timeNow.seconds;
}

// Функція для форматування часу
let formatTime = (timeObj) => {
    if (timeObj.hours < 10) { 
        timeObj.hours = `0${timeObj.hours}`;
    }
    if (timeObj.minutes < 10) { 
        timeObj.minutes = `0${timeObj.minutes}`;
    }
    if (timeObj.seconds < 10) { 
        timeObj.seconds = `0${timeObj.seconds}`;
    }
    return timeObj;
}

// Функція для отримання поточного часу
let getTime = () => {
    let timeNow = new Date();
    timeNow = {
        hours: timeNow.getHours(),
        minutes: timeNow.getMinutes(),
        seconds: timeNow.getSeconds()
    };
    return formatTime(timeNow);
}

// Оновлення таблиці з інтервалом 1 секунда
setInterval(updateTable, 1000);