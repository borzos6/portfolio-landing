window.onload = function() {
	sal();
	$(window).scroll(function (){
    var content_height = $(document).height();
    var content_scroll_pos = $(window).scrollTop();
    var percentage_value = content_scroll_pos * 100 / content_height;

    var percentage = 70;
    if(percentage_value === percentage) {
			$(".contact div").hide();
    }
		else if(percentage_value < percentage) {
			$(".contact div").show();
		}
	});

	$(".see-more").on('click', function(){
		$([document.documentElement, document.body]).animate({
        scrollTop: $("#masonary").offset().top - 90
    }, 1000);
	});
};
