$.getJSON("./js/data.json", function(data) {
	var projects = data['projects'],
		medias = data['media'];

	let projectsList = '',
		mediasList = '';

	projectsList = appendListItems(projects, "projects");
	mediasList = appendListItems(medias, "medias");

	var waitContent = setInterval(function() {
		if ($(".cards").length) {
			$(".projects").append(projectsList);
			$(".medias").append(mediasList);

			var $lang = $(".lang");
      $lang.on('mouseenter', function() {
				$(this).addClass('hovered');
				var visiblity = $(this).closest(".card__top").find(".lang__list").css('display');
				console.log(visiblity);
				if (visiblity === 'none') $(this).closest(".card__top").find(".lang__list").slideToggle();
				if (visiblity === 'none') $(this).closest(".card__top").find(".lang span").fadeIn();
			});
      $lang.on('mouseleave', function() {
				// var list = $(this).closest(".card__top").find(".lang__list");
				if ($(this).closest(".card__top").find(".lang__list:hover").length === 0) {
					$(".lang__list").hide();
					$(this).closest(".card__top").find(".lang span").hide();
					$(this).removeClass('hovered');
				}
			});
      $(".lang__list").on('mouseleave', function() {
				// var list = $(this).closest(".lang");
				if ($(".lang:hover").length === 0) {
					$(".lang__list").hide();
					$(".lang span").hide();
					$(".lang").removeClass('hovered');
				}
			});
			clearInterval(waitContent);
		}
	}, 1);
});


function appendListItems(array, type) {
	let list = '';
	if (type === "projects") {
		$.each(array, function(key, val) {
			let languages = '';
			$.each(val.languages, function(key, val) {
				languages += `<a target="_blank" href="${val.link}" class="item">${val.name}</a>`;
			});
			list += `
				<div class="grid-item span-${val.layoutOrder} card" style="background-image: url(${val.imgUrl})" data-sal="fade" data-sal-duration="1000">
					<div class="card__top">
						<div class="lang"><span>Available in:</span><i class="fa fa-globe"></i></div>
						<div class="lang__list">
							${languages}
						</div>
					</div>
					<div class="card__bottom">
						<a target="_blank" href="${val.projectUrl}" class="title">${val.name}</a>
						<div class="desc">${val.description}</div>
					</div>
				</div>`
		});
	} else if (type === "medias") {
		$.each(array, function(key, val) {
			if (val.embed === true) {
				list += `<div class="grid-item span-${val.layoutOrder} card-embed" data-sal="fade" data-sal-duration="2000" data-sal-easing="ease-out-back">
					${val.embedCode}
				</div>`
			} else {
				let languages = '';
				$.each(val.languages, function(key, val) {
					languages += `<a target="_blank" href="${val.link}" class="item">${val.name}</a>`;
				});
				list += `
					<div class="grid-item span-${val.layoutOrder} card" style="background-image: url(${val.imgUrl})" data-sal="fade" data-sal-duration="2000" data-sal-easing="ease-out-back">
						<div class="card__top">
							<div class="lang"><span>Available in:</span><i class="fa fa-globe"></i></div>
							<div class="lang__list">
								${languages}
							</div>
						</div>
						<div class="card__bottom">
							<a target="_blank" href="${val.postUrl}" class="title">${val.name}</a>
							<div class="desc">${val.description}</div>
							<div class="tags">
								<a target="_blank" href="${val.projectUrl}" class="project-name">${val.projectName}</a>
								<a target="_blank" href="${val.mediaUrl}" class="media-name">${val.mediaName}</a>
							</div>
						</div>
					</div>`
			}
		});
	}
	return list;
}
