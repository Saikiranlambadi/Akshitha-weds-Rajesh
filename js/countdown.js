const weddingDate =
new Date("August 15, 2026 16:00:00");

function updateCountdown(){

const now = new Date();

const diff = weddingDate - now;

const days =
Math.floor(diff/(1000*60*60*24));

const hours =
Math.floor(
(diff%(1000*60*60*24))
/
(1000*60*60)
);

const minutes =
Math.floor(
(diff%(1000*60*60))
/
(1000*60)
);

const seconds =
Math.floor(
(diff%(1000*60))
/
1000
);

document.getElementById("days").innerHTML=days;
document.getElementById("hours").innerHTML=hours;
document.getElementById("minutes").innerHTML=minutes;
document.getElementById("seconds").innerHTML=seconds;

}

updateCountdown();

setInterval(updateCountdown,1000);