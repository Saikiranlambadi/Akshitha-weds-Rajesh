for(let i=0;i<25;i++){

const petal =
document.createElement("div");

petal.classList.add("petal");

petal.style.left =
Math.random()*100+"vw";

petal.style.animationDuration =
(5+Math.random()*10)+"s";

petal.style.opacity =
Math.random();

document.body.appendChild(petal);

}