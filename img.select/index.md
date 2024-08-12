---
layout: page
---
<link href="/css/featherlight.min.css" type="text/css" rel="stylesheet" />
<link href="/css/featherlight.gallery.min.css" type="text/css" rel="stylesheet" />
<script src="/js/jquery-3.6.0.min.js"></script>
<script src="/js/jquery.detect_swipe.js"></script>
<script>document.title="𝗯𝘂𝗹𝗹𝘁𝗼𝘄𝗻.𝟮𝟬𝟮𝟮 | img.select lightbox"</script>





<noscript>
		<p>
			Please enable JavaScript for full functionality.
		</p>	
	</noscript>


{% include image-gallery.html folder="/images.select/" %}

<script src="/js/featherlight.min.js" type="text/javascript" charset="utf-8"></script>
<script src="/js/featherlight.gallery.min.js" type="text/javascript" charset="utf-8"></script>
<script>
	$(document).ready(function(){
		$('.gallery').featherlightGallery({
			gallery: {
				fadeIn: 300,
				fadeOut: 300
			},
			openSpeed:    300,
			closeSpeed:   300
		});
	});
</script>