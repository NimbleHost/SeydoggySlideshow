/*
	# SeydoggySlideshow #
	
	AUTHOR:	Adam Merrifield <http://adam.merrifield.ca>
	VERSION: v3.0.0
	DATE: 06-20-11 14:17

*/
// define user effect setting (see effectXXX.js)
var slideshowEffect;// 'fade' default
// define user slideshow timing (see timeoutXXX.js)
var slideshowTimeout;// 4000 default
// define user effect timing (see speedXXX.js)
var slideshowSpeed;// 1000 default

jQuery(document).ready(function($) {
	// SLIDE SHOW SETUP
	var SdSlideShowSet = (function(){
		// VARIABLES
	    var $slideshow = $('.seydoggySlideshow');
		var preContentWidth = $('.headerContainer .preContent').width();
		var headerWidth = $('.seydoggySlideshow').width();
		var headerHeight = $('.pageHeader').css('height');
		var isVariable = typeof headerHeightVariable != 'undefined';
		var sdSlideHeight = function(elem){
			ecTallest = 0;
			$(elem).each(function() {
				var thisTallest = $(this).outerHeight(true);
				if (thisTallest > ecTallest) ecTallest = thisTallest;
			});
		}

		// create all slides
		var sdSlideFunction = (function(){
			if (typeof sdSlideBox != "undefined") {
				// SETUP BOX SLIDES

				// determine stack or snippet
				sdSlideNum=new Array();
				var sdContentSlide;
				var i=0;
				if ($('.sdSlideBoxSnippet').length) {
					sdContentSlide = '.sdSlideBoxSnippet'
					$(sdContentSlide).each(function(i){
						sdSlideNum[i++] = ($(sdContentSlide).index(this))+1;
					});
				} else {
					sdContentSlide = '.sdSlideBoxStack'
					$(sdContentSlide).each(function(i){
						sdSlideNum[i++] = $(sdContentSlide).index(this);
					});
				}

				// VARIABLES
				var arrlen=sdSlideNum.length;

				// clean up what's there
				$('#extraContainer1').remove();
				$slideshow.css({
					'background-image':$('.pageHeader').css('background-image'),
					'background-position':$('.pageHeader').css('background-position'),
					'background-color':$('.pageHeader').css('background-color')
				});
				// initial box slide
				$('.pageHeader').replaceWith('<div class="pageHeader" id="sdSlideBox'+sdSlideNum[0]+'"></div>');
				$('#mySdSlideBox'+sdSlideNum[0]).appendTo('#sdSlideBox'+sdSlideNum[0]);

				// add box slides to slideshow
				for (var i=1, len=arrlen; i<len; ++i) {
					$slideshow.append('<div class="pageHeader" id="sdSlideBox'+sdSlideNum[i]+'"></div>');
					$('#mySdSlideBox'+sdSlideNum[i]).appendTo('#sdSlideBox'+sdSlideNum[i]);
				}
				// if header height variable set .seydoggySlideshow height to content height
				if (isVariable) sdSlideHeight(sdContentSlide), $('.seydoggySlideshow').height(ecTallest);
				// clean up after
				$('.pageHeader').css('background','transparent');
			} else {
				// INITIALIZE VARIABLES
				var arrlen='';
				var thisURL='';
				var nextURL='';
				var n=0;

				// SET UP IMAGE SLIDES
				if (typeof sdSlideWH != "undefined") {
					// WAREHOUSE VARIABLES
					arrlen=sdSlideWH.length;
					thisURL='url('+sdSlideWH[n]+')';
				} else {
					// LOCAL VARIABLES
					arrlen=sdSlideNum.length;
					thisURL='url('+RwGet.pathto('images/editable_images/header'+sdSlideNum[n]+'.jpg')+')';
				}
				
				// initial slide
				$('.pageHeader').replaceWith('<div class="pageHeader" style="background: '+thisURL+' center top repeat; width:'+headerWidth+'px;"><div class="preContent movedEC1" style="display:block;"></div></div>');
				// copy ExtraContent to first slide
				$('.movedEC1').append($('.headerContainer .preContent').html());
				$('.movedEC1').width(preContentWidth);
				// add slides to slideshow
				if (typeof sdSlideWH != "undefined") {
					// WAREHOUSE
					for (var i=1, len=arrlen; i<len; ++i) {
						$slideshow.append('<div class="pageHeader" style="background: url('+sdSlideWH[i]+') center top repeat; width:'+headerWidth+'px;"><div class="preContent movedEC'+(i+1)+'" style="display:block;"></div></div><!-- .pageHeader -->');
					}
					
				} else {
					// LOCAL
					for (var i=1, len=arrlen; i<len; ++i) {
						$slideshow.append('<div class="pageHeader" style="background: url('+RwGet.pathto('images/editable_images/header'+sdSlideNum[i]+'.jpg')+') center top repeat; width:'+headerWidth+'px;"><div class="preContent movedEC'+(i+1)+'" style="display:block;"></div></div><!-- .pageHeader -->');
					}
				}
				for (var i=1, len=arrlen; i<len; ++i) {
					// copy ExtraContent to other slides
					$('.movedEC'+(i+1)).append($('.headerContainer .preContent').html());
					$('.movedEC'+(i+1)).width(preContentWidth);
				}
				
				
				// if header height is variable or if custom header is transparent
				sdSlideHeight('#extraContainer1 div');
				// if header height is variable set .seydoggySlideshow height to content height
				if (isVariable) $('.seydoggySlideshow, .pageHeader').height(ecTallest + 30);
			}
		})();

		// set width of header
		$('.pageHeader').width(headerWidth);

		// start the slideshow 
		var sdCycleFunction = (function(){
			$slideshow.cycle({
				fx: slideshowEffect,
				timeout:slideshowTimeout,
				speed:slideshowSpeed
			});
		})();
	})();

	// add links to slides
	if(typeof sdSlideLinks != "undefined") $('.pageHeader').rwAddLinks(sdSlideLinks);

});
