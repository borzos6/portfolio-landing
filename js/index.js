window.onload = function() {
	sal();
	$(window).scroll(function (){
    var content_height = $(document).height();
    var content_scroll_pos = $(window).scrollTop();
    var percentage_value = content_scroll_pos * 100 / content_height;

    if(percentage_value === 70)
    {
      console.dir("the scroll is about 80% down.");
			$(".contact div").hide();
    }
		else if(percentage_value < 70){
			$(".contact div").show();
		}
	});
};
