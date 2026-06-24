// Curtain Animation + prevent music autoplay

const music = document.getElementById("bgMusic");

// Ensure audio is paused and reset on page load
if(music){
	music.pause();
	music.currentTime = 0;
}

document.getElementById("openInvite").addEventListener("click", ()=>{
	document.getElementById("curtain").classList.add("open");

	setTimeout(()=>{
		document.getElementById("curtain").style.display = "none";
	}, 2000);

	// play background music as a result of this user click
	if(music){
		music.currentTime = 0;
		music.play().catch(()=>{});
	}

	const btn = document.getElementById("musicBtn");
	if(btn) btn.innerHTML = "❚❚";
});

// Music toggle
const musicBtn = document.getElementById("musicBtn");
if(musicBtn){
	musicBtn.addEventListener("click", ()=>{
		if(music.paused){
			music.play();
			musicBtn.innerHTML = "❚❚";
		} else {
			music.pause();
			musicBtn.innerHTML = "♫";
		}
	});
}

// Pause music when clicking location links
const locationLinks = document.querySelectorAll("a[href*='maps.app.goo.gl']");
locationLinks.forEach(link => {
	link.addEventListener("click", ()=>{
		if(music && !music.paused){
			music.pause();
		}
	});
});

function stopMusic(){
	if(music && !music.paused){
		music.pause();
		music.currentTime = 0;
	}
}

// Stop music when the user closes, reloads, or hides the page
window.addEventListener("beforeunload", stopMusic);
window.addEventListener("pagehide", stopMusic);
document.addEventListener("visibilitychange", ()=>{
	if(document.visibilityState === "hidden"){
		stopMusic();
	}
});