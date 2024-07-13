---
layout: page
---
<p>
	If you’d like to listen to the playlist continuously as you browse the site, simply keep this page in a separate tab or window.<span class="mobile"> If your popup blocker is disabled*, you might like the alternative <a href="#" onclick="window.open('/music/player/', 'player', 'width=350, height=250, popup, noopener');">popup player</a>.</span> 
</p>
<div>
	<span class="mobile">*<small><a href="https://www.fontbonne.edu/wp-content/uploads/2020/12/Disable-Pop-Up-Blocker.pdf">How to Disable or Enable Your Pop-up Blocker (.pdf)</a></small></span>
</div>
<div class="mocontrol" style="text-align:center;position:relative;top:12px;">
	<p>
		<a href="#" title="play" onclick="play();"><img src="/images/play.svg" alt="" style="width:20px;"></a>
		<a href="#" title="pause" onclick="pause();"><img src="/images/pause.svg" alt="" style="width:20px;"></a>
		<a href="#" title="previous track" onclick="playPreviousTrack();"><img src="/images/prev.svg" alt="" style="width:20px;"></a>
		<a href="#" title="next track" onclick="playNextTrack();"><img src="/images/next.svg" alt="" style="width:20px;"></a>
		<a href="#" title="shuffle" onclick="shuffle();"><img src="/images/shuffle.svg" alt="" style="width:20px;"></a>
	</p>
</div>	
<div class="now-playing">currently not playing any track</div>
<div class="controls">
	<span id="min">
		<i icon-name="play"></i>
		<i icon-name="pause" class="hidden"></i>
		<i icon-name="skip-back"></i>
		<i icon-name="skip-forward"></i>
		<i icon-name="shuffle"></i>
	</span>
	<i icon-name="volume-1"></i>
	<i icon-name="volume-x" class="hidden"></i>
	<input type="range" min="0" max="100" class="volume-slider">
	<span class="timer">0:00 / 0:00</span>
</div>
<div class="track-list"></div>
<audio id="audio"></audio>
<div class="credits">
	powered by <a href="https://github.com/luiderek/vip-player/">vip-player</a>, based on <a href="http://aersia.net">VIP by Cats777</a>
</div>		
<link rel="stylesheet" href="/css/vip-styles.css">
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
<script>
lucide.createIcons();
</script>
<script src="/js/vip-tracks.js"></script>
<script src="/js/vip-main.js"></script>

