let fruits = ['apple','banana','brocoli','cherry','pepper','straw'];
let images = document.querySelectorAll('.fruit');
let randomFruit;
let randomIndex;
let count = {};


console.log(images)
window.addEventListener('load', ()=>{
    images.forEach((image)=>{
        randomIndex = Math.floor(Math.random() * fruits.length);
        randomFruit = fruits[randomIndex];
        while (count[randomFruit] >= 2) {
            // Choisissez un autre fruit si celui-ci a déjà été choisi deux fois
            randomIndex = Math.floor(Math.random() * fruits.length);
            randomFruit = fruits[randomIndex];
          }
          count[randomFruit] = (count[randomFruit] || 0) + 1;
          image.setAttribute('src', `ressources/${randomFruit}.svg`);
    });
})

const flipCards = document.querySelectorAll('.flip-card');
console.log(flipCards);

flipCards.forEach (flipCard => {
    flipCard.addEventListener('click', flipCardHandler);
})

function flipCardHandler(e){
    let flip = false;
    if(lock) return;
    let innerCard = e.target.closest('.flip-card-inner');
    if(flip){
        innerCard.style.transform = 'rotateY(0deg)';
        flip = false;
    }else{
        flip = true;
        innerCard.style.transform = 'rotateY(180deg)';
    }
    eventCount(e)
}

let lock = false;
let eventCounter = 0;
let backCards = {};
function eventCount(e) {
    eventCounter++;
    console.log(eventCounter);
    // console.log(e.target.closest('.flip-card-inner').children[1].children[0].getAttribute('src'));
    // backCard = e.target.closest('.flip-card-inner').children[1].children[0].getAttribute('src');
    backCards[`image${eventCounter}`] = e.target.closest('.flip-card-inner');
    console.log(backCards);
    if (eventCounter === 2) {
        lock = true;
        eventCounter = 0;
        // if(backCards['image1'].children[1].children[0].getAttribute('src') === backCards['image2'].children[1].children[0].getAttribute('src')){
        //     console.log("image exactly")
        //     lock = false;
            
        // } else {
        //     console.log("image différent");
        //     // for(let key in backCards){
        //     //     backCards[key].style.transform = 'rotateY(0deg)';
        //     // }
        //     lock = false;

        // }
    }
}