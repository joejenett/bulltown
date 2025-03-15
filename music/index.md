---
layout: page
---
<script>document.title="𝗯𝘂𝗹𝗹𝘁𝗼𝘄𝗻.𝟮𝟬𝟮𝟮 | music"</script>
<p>
	If you’d like to listen to the playlist continuously as you browse the site, simply keep this page in a separate tab or window.<span class="mobile"> If your popup blocker is disabled*, you might like the alternative <a href="#top" onclick="window.open('/music/player/', 'player', 'width=350, height=250, popup, noopener');">popup player</a>.</span> 
</p>
<div>
	<span class="mobile">*<small><a href="https://www.fontbonne.edu/wp-content/uploads/2020/12/Disable-Pop-Up-Blocker.pdf">How to Disable or Enable Your Pop-up Blocker (.pdf)</a></small></span>
</div>
<div class="mocontrol" style="text-align:center;position:relative;top:12px;left:18px;">
	<p>
		<a href="#" title="play" onclick="play();"><img src="/images/play.svg" alt="play" style="width:20px;"></a>
		<a href="#" title="pause" onclick="pause();"><img src="/images/pause.svg" alt="pause" style="width:20px;"></a>
		<a href="#" title="previous track" onclick="playPreviousTrack();"><img src="/images/prev.svg" alt="previous" style="width:20px;"></a>
		<a href="#" title="next track" onclick="playNextTrack();"><img src="/images/next.svg" alt="next" style="width:20px;"></a>
		<a href="#" title="shuffle" onclick="shuffle();"><img src="/images/shuffle.svg" alt="shuffle" style="width:20px;"></a>
	</p>
</div>	
<div class="now-playing left18">currently not playing any track</div>
<div class="controls left18">
	<span id="min">
		<i icon-name="play"></i>
		<i icon-name="pause" class="hidden"></i>
		<i icon-name="skip-back"></i>
		<i icon-name="skip-forward"></i>
		<i icon-name="shuffle"></i>
	</span>
	<div class="timerwrap">
		<i icon-name="volume-1"></i>
		<i icon-name="volume-x" class="hidden"></i>
		<label for="range"><input id="range" type="range" min="0" max="100" class="volume-slider"></label>
		<span class="timer">0:00 / 0:00</span>
	</div>
</div>
<div class="track-list left18"></div>
<audio id="audio"></audio>
<div class="credits left18">
	powered by <a href="https://github.com/luiderek/vip-player/">vip-player</a>, based on <a href="http://aersia.net">VIP by Cats777</a>
</div>		
<link rel="stylesheet" href="/css/vip-styles.css">
<script src="/js/lucide.js"></script>
<script>
	<!-- https://unpkg.com/lucide@latest/dist/umd/ -->
lucide.createIcons();
</script>
<script src="/js/vip-tracks.js"></script>
<script src="/js/vip-main.js"></script>

