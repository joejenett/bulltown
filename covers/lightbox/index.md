<link href="/css/featherlight.min.css" type="text/css" rel="stylesheet" />
<link href="/css/featherlight.gallery.min.css" type="text/css" rel="stylesheet" />
<script src="/js/jquery-1.8.3.min.js"></script>
<script src="/js/jquery.detect_swipe.js"></script>
<h3>covers: lightbox view  <span style="font-size:.8em;margin-left:36px;font-weight:400;"> (<a href="/covers/">switch to gallery view</a>) </span></h3>
<p style="margin-top:-12px;font-size:.85em;">Works best with JavaScript enabled.</p>
<div class="gallery-container">
	<a class="gallery2" href="/covers/033199.png"><img src="/covers/thumbs/thumb_033199.jpg"></a>
	<a class="gallery2" href="/covers/032499.png"><img src="/covers/thumbs/thumb_032499.jpg"></a>
	<a class="gallery2" href="/covers/040199.png"><img src="/covers/thumbs/thumb_040199.jpg"></a>
	<a class="gallery2" href="/covers/051599.png"><img src="/covers/thumbs/thumb_051599.jpg"></a>
	<a class="gallery2" href="/covers/070399.png"><img src="/covers/thumbs/thumb_070399.jpg"></a>
</div>
		
<script src="/js/featherlight.min.js" type="text/javascript" charset="utf-8"></script>
<script src="/js/featherlight.gallery.min.js" type="text/javascript" charset="utf-8"></script>

<script>
	$(document).ready(function(){
		$('.gallery2').featherlightGallery({
			gallery2: {
				fadeIn: 300,
				fadeOut: 300
			},
			openSpeed:    300,
			closeSpeed:   300
		});
	});
</script>
