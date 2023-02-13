let fruits = ['apple','banana','brocoli','cherry','pepper','straw'];

const flipCard = document.querySelector('.flip-card');

flipCard.addEventListener('click', flipCardHandler)

let flip = false;
function flipCardHandler(e){
    if(flip){
        document.querySelector('.flip-card-inner').style.transform = 'rotateY(0deg)';
        flip = false;
    }else{
        flip = true;
        let randomIndex = Math.floor(Math.random() * fruits.length);
        let randomFruit = fruits[randomIndex];
        document.querySelector('.fruit').setAttribute('src', `ressources/${randomFruit}.svg`);
        document.querySelector('.flip-card-inner').style.transform = 'rotateY(180deg)';
    }
    
}