let fruits = ['apple','banana','brocoli','cherry','pepper','straw'];

const flipCards = document.querySelectorAll('.flip-card');
console.log(flipCards);
// flipCards.addEventListener('click', flipCardHandler)

flipCards.forEach (flipCard => {
    flipCard.addEventListener('click', flipCardHandler)
})


function flipCardHandler(e){
    let flip = false;
    let innerCard = e.target.closest('.flip-card-inner');
    if(flip){
        innerCard.style.transform = 'rotateY(0deg)';
        flip = false;
    }else{
        flip = true;
        let randomIndex = Math.floor(Math.random() * fruits.length);
        let randomFruit = fruits[randomIndex];
        e.target.setAttribute('src', `ressources/${randomFruit}.svg`);
        innerCard.style.transform = 'rotateY(180deg)';
    }
}