$.getJSON( "./js/data.json", function( data ) {
  var projects = data['projects'],
	 		medias = data['media'],
	 		videos = data['videos'];

	let projectsList = '',
			mediasList = '',
			videosList = '';

	var cardOptions = [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			optionIterator = 0;

	projectsList = appendListItems(projects, cardOptions, optionIterator, "projects");
	mediasList = appendListItems(medias, cardOptions, optionIterator, "medias");
	videosList = appendListItems(videos, cardOptions, optionIterator, "videos");

	var waitContent = setInterval(function(){
		if($(".cards").length){
			$(".projects").append(projectsList);
			$(".medias").append(mediasList);
			$(".videos").append(videosList);
			$(".lang").on('mouseenter', function(){
				$(this).addClass('hovered');
				$(this).closest(".card__top").find(".lang__list").slideToggle();
				$(this).closest(".card__top").find(".lang span").fadeIn();
			});
			$(".lang").on('mouseleave', function(){
				$(".lang__list").hide();
				$(this).closest(".card__top").find(".lang span").hide();
				$(this).removeClass('hovered');
			});
			clearInterval(waitContent);
		}
	},1);
});


function appendListItems(array, order, i, type){
	let list = '';
	if(type === "projects"){
		$.each(array, function( key, val ) {
			let languages = '';
			$.each(val.languages, function( key, val ) {
				languages += `<div class="item">${val}</div>`;
			});
			list += `
				<div class="grid-item span-${order[i]} card" style="background-image: url(${val.imgUrl})" data-sal="fade" data-sal-duration="1000">
					<div class="card__top">
						<div class="lang"><span>Available in:</span><i class="fa fa-globe"></i></div>
						<div class="lang__list">
							${languages}
						</div>
					</div>
					<div class="card__bottom">
						<a href="${val.projectUrl}" class="title">${val.name}</a>
						<div class="desc">${val.description}</div>
					</div>
				</div>`
			if(i!=20) i+=1;
				else i = 0;
		});
	}
	else if(type === "medias"){
		$.each(array, function( key, val ) {
			let languages = '';
			$.each(val.languages, function( key, val ) {
				languages += `<div class="item">${val}</div>`;
			});
			list += `
				<div class="grid-item span-${order[i]} card" style="background-image: url(${val.imgUrl})" data-sal="fade" data-sal-duration="2000" data-sal-easing="ease-out-back">
					<div class="card__top">
						<div class="lang"><span>Available in:</span><i class="fa fa-globe"></i></div>
						<div class="lang__list">
							${languages}
						</div>
					</div>
					<div class="card__bottom">
						<a href="${val.postUrl}" class="title">${val.name}</a>
						<div class="desc">${val.description}</div>
						<div class="tags">
							<a href="${val.projectUrl}" class="project-name">${val.projectName}</a>
							<a href="${val.mediaUrl}" class="media-name">${val.mediaName}</a>
						</div>
					</div>
				</div>`
			if(i!=20) i+=1;
				else i = 0;
		});
	}
	else if(type === "videos"){
		$.each(array, function( key, val ) {
			let languages = '';
			$.each(val.languages, function( key, val ) {
				languages += `<div class="item">${val}</div>`;
			});
			list += `
				<div class="media-card" data-sal="slide-up" data-sal-duration="600" data-sal-easing="ease-out-back">
					<div class="video-card__top card__top">
						<a href="${val.projectUrl}" class="project-name">${val.projectName}</a>
						<div class="fixed-lang"><i class="fa fa-globe"></i>${languages}</div>
					</div>
					<div class="media-card__bottom">
						<div class="title">${val.name}</div>
						<div class="desc">${val.description}</div>
						<a href="${val.mediaUrl}" class="media-name"><b>BY:</b> ${val.mediaName}</a>
					</div>
				</div>`
			if(i!=20) i+=1;
				else i = 0;
		});
	}
	return list;
}
