// Curtain Animation + prevent music autoplay

const music = document.getElementById("bgMusic");

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