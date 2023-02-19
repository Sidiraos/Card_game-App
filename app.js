let fruits = ['apple','banana','brocoli','cherry','pepper','straw'];
let images = document.querySelectorAll('.fruit');
let randomFruit;
let randomIndex;
let count = {};


console.log(images);
function getRandomFruit() {
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
}

window.addEventListener('load', getRandomFruit);

const flipCards = document.querySelectorAll('.flip-card');
console.log(flipCards);

flipCards.forEach (flipCard => {
    flipCard.addEventListener('click', flipCardHandler);
})

let lock = false;
function flipCardHandler(e){
    if(lock) return;
    if(e.target.closest('.flip-card-inner').classList.contains('flipped')) return;
    triggerFlipCard(e);
    eventCount(e);
    if(checkIsAllCardOpen()){
        setTimeout(()=>{
            console.log('we can reset all cards');
            showInfo();
            showScore();
        }, 1000);
    }
}
function showScore(){
    document.getElementById("score").textContent = "Votre score est : " + (coups + 1);
};
function showInfo(){
    document.getElementById("info").textContent = `appuyez sur le bouton "espace" pour recommencer`; 
};

function triggerFlipCard(e){
    let flip = false;
    let innerCard = e.target.closest('.flip-card-inner');
    if(flip){
        innerCard.style.transform = 'rotateY(0deg)';
        innerCard.classList.remove('flipped');
        flip = false;
    }else{
        flip = true;
        innerCard.style.transform = 'rotateY(180deg)';
        innerCard.classList.add('flipped');
    }
}


let eventCounter = 0;
let coups = 0;
let backCards = {};

function eventCount(e) {
    eventCounter++;
    
    backCards[`image${eventCounter}`] = e.target.closest('.flip-card-inner');

    if (eventCounter === 2) {
        lock = true;
        coups++;
        console.log("coups: " + coups , "count: " + eventCounter);
        eventCounter = 0;
        isCardEqual(e , backCards)
        checkIsAllCardOpen();

    }
    return coups;
}

function checkIsAllCardOpen() {
    let flipInnerCard = document.querySelectorAll('.flip-card-inner');
    let allFliped = true;
    flipInnerCard.forEach(flipInnerCard => {
      if (!flipInnerCard.classList.contains('flipped')) {
        allFliped = false;
        return; // Sort de la boucle dès qu'on trouve une carte non retournée
      }
      
    });
    if (allFliped) {
        console.log('all cards are flipped');
        return allFliped;
    } else {
      console.log('some cards are not flipped');
    }
    
  }
  
function isCardEqual(e, backCards) {
    console.log(backCards);
    document.getElementById('score').textContent = "Nombre de coups: " + coups;

    if(backCards['image1'].children[1].children[0].getAttribute('src') === backCards['image2'].children[1].children[0].getAttribute('src')){
        console.log("image exactly");
        setTimeout(()=>{
            lock = false;
        },500)
    } else {
        setTimeout(()=>{
            backCardsRotate(backCards , true , 0)
            lock = false;
        },500) ;
        console.log("image différent");
    }
}

function backCardsRotate(backCards,classFunction , rotation){
    for (let key in backCards) {
        backCards[key].style.transform = `rotateY(${rotation}deg)`;
        if(classFunction){
            backCards[key].classList.remove('flipped');
        }
    }
}

function removeAllCard(){
    let innerCards = document.querySelectorAll('.flip-card-inner');
    innerCards.forEach(innerCard => {
        innerCard.classList.remove('flipped');
        innerCard.style.transform = 'rotateY(0deg)';
        setTimeout(()=> {
            location.reload();
            lockKeyBoard = false;
        },600);
    });
}

let lockKeyBoard = false;
document.addEventListener('keydown', function(event) {
    if (lockKeyBoard) return;
    if(event.key === ' '){
        console.log('reloading');
        lockKeyBoard = true;
        lock=true;
        removeAllCard();
    }
})