const buttons = document.querySelectorAll('.btn1');
const cartNoteTitle = document.getElementById('cartNoteTitle');
const balanceElement = document.getElementById('balance');
const balance = parseInt(balanceElement.textContent.split(' ')[1]);

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const title = button.getAttribute('data-title');
        const price = parseInt(button.previousElementSibling.textContent.split(' ')[0].replace(/\s+/g, ''));
        if (balance >= price) {
            balanceElement.textContent = `balance: ${balance - price}грн`;
            cartNoteTitle.textContent = `Додано в кошик: ${title}`;
            cartNoteTitle.style.display = 'block';
            cartNoteTitle.style.fontSize = '20px'
        } else {
            cartNoteTitle.textContent = `Помилка: недостатньо коштів на рахунку!`;
            cartNoteTitle.style.display = 'block';
            cartNoteTitle.style.fontSize = '20px'
        }
    });
});