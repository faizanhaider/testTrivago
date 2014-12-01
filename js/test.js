function showGridView() {
	$('.control_button span').on('click' , function(){
		var $containerDiv = $(this).parents('.control_button');

		if( $containerDiv.hasClass('photoGrid') ){
			$('.itemlist').addClass('photoGrid');
		} else {
			$('.itemlist').removeClass('photoGrid');
		}
		$('.control_button').removeClass('active');
		$containerDiv.addClass('active');
	});
}

function getHtmlForDetailBox(options){

	var htmlForImgs = '<div class="separetor">\
		<span class="tab firstTab">Option1</span>\
		<span class="tab secondTab">Option1</span>\
	</div><div class="imgsWrapper">';

	var temp = [],
		ind = '';

	for(var i = 0 ; i < options.imgs.length ; i++){
		ind = ( i == 0 ) ? 0 : ( i >0 && i <5 ) ?  1 : 2 ;
		if (typeof temp[ind] === 'undefined' ) temp[ind] = '' ;
		temp[ind] += '<img class="imageDetailsPos'+i+'" src="'+ options.imagesPath + options.imgs[i] +'">';

	}

	for(var x = 0 ; x <= ind ; x++){
		htmlForImgs += '<div class="slot'+x+'">'+temp[x]+'</div>';
	}

	htmlForImgs += '</div>';

	var htmlBox = '<div class="itemZoom">\
		<div class="item_prices">\
			<h3>'+options.title+'</h3>\
			<div class="item_main">\
				<div class="cf">\
					<span class="img_sprite_moon stars cat'+options.stars+'">'+options.stars+'</span>\
					<span class="img_sprite_moon superior">'+options.superior+'</span>\
					<span class="city_name">'+options.location+'</span>\
				</div>\
				<ul class="item_nav cf">\
				'+options.userVote+'\
				</ul>\
			</div>\
			<div class="item_bestprice">\
			'+ options.bestPrice +'\
			</div>\
			<div class="closeBox">X</div>\
		</div>\
		'+ htmlForImgs +'\
	</div>';

	return htmlBox;
}
	
function showPopupHotelDetails() {
	$('.item_image img' ).on('click' , function(){

		if( $('.itemlist').hasClass('photoGrid') ) {

			var $domElemContainer = $(this).parents('li.item');

			var pluginParams = {
				title: $domElemContainer.find('.item_prices h3').text(),
				stars: $domElemContainer.find('.item_main div.cf .img_sprite_moon.stars').text(),
				superior: $domElemContainer.find('.item_main div.cf .img_sprite_moon.superior').text(),
				userVote: $domElemContainer.find('.item_main ul.item_nav.cf').html(),
				location: $domElemContainer.find('.item_main div.cf .city_name').text(),
				bestPrice: $domElemContainer.find('.item_bestprice').html(),
				imagesPath: "images/",
				imgs: [
					"hotel_ph.jpg",
					"hotel_ph.jpg",
					"hotel_ph.jpg",
					"hotel_ph.jpg",
					"hotel_ph.jpg",
					"hotel_ph.jpg",
					"hotel_ph.jpg",
					"hotel_ph.jpg"
				],
				onStart: false,
				onEnd: false
			};

			var htmlStringBox = getHtmlForDetailBox(pluginParams),
				htmlBox = $('<div/>').html(htmlStringBox).contents();

			detailsLightBox(htmlBox, pluginParams);
		}
	});
}

function setBox(box){

	var screenWidth = $(window).width() * 0.8,
		screenHeight = $(window).height() * 0.9,
		boxWidth = 613,
		boxHeight = 553;

	if (boxWidth > screenWidth || boxHeight > screenHeight) {
		var ratio = boxWidth / boxHeight > screenWidth / screenHeight ? boxWidth / screenWidth : boxHeight / screenHeight;
		boxWidth /= ratio;
		boxHeight /= ratio;
	}

	box.css({
		'width': boxWidth + 'px',
		'min-height': boxHeight + 'px',
		'top': (($(window).height() - boxHeight) / 2) +  $(window).scrollTop() + 'px',
		'left': ($(window).width() - boxWidth) / 2 + 'px'
	});
}

function removeBox(){
        $('.itemZoom').remove();
        $('#overlay').remove();
    }

    function detailsLightBox(box, options){
            var inProgress = false;
            if (options.onStart !== false) options.onStart();
            showBox(box, options,inProgress);

        $('.closeBox').on('click', function(){
            quitBox(box, inProgress);
        });

        $(window).on('resize', function(){
            setBox(box);
        });

    }
	
	function quitBox(box, inProgress){
        if (!box.length) return false;
        box.fadeOut(function(){
            $('#overlay').fadeOut('slow');
            removeBox();
            inProgress = false;
        });
    }
	
	function showBox(box, options, inProgress){
        if (inProgress) return false;

        inProgress = true;
        if (options.onStart !== false) options.onStart();

        setBox(box);
        box.css('display', 'none');

        box.appendTo('body');

//        $('<div>', {
//            id : 'overlay',
//            class : 'overlay'
//        }).appendTo('body');

        var over = document.createElement('div');
        over.setAttribute("id", "overlay");
        over.setAttribute("class", "overlay");
        $('body').append(over);

        $('#overlay').fadeIn('fast');
        box.fadeIn('slow',function(){
            inProgress = false;
            if (options.onEnd !== false) options.onEnd();
        });

        var scrollTop     = $(window).scrollTop(),
            elementOffset = box.offset().top,
            distance      = (elementOffset - scrollTop);

        $('body').animate({ scrollTop: distance - 50 }, 500);

    }

$(document).ready( function(){
    showGridView();
    showPopupHotelDetails();
});
