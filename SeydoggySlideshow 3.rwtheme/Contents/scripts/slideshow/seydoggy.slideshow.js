/*
	# SeydoggySlideshow #
	
	AUTHOR:	Adam Merrifield <http://adam.merrifield.ca>
	VERSION: v3.0.4

*/
// define user effect setting (see effectXXX.js)
var slideshowEffect,// 'fade' default
// define user slideshow timing (see timeoutXXX.js)
	slideshowTimeout,// 4000 default
// define user effect timing (see speedXXX.js)
	slideshowSpeed;// 1000 default

jQuery(document).ready(function($) {
	// SLIDE SHOW SETUP
	var SdSlideShowSet = (function(){
		
		// VARIABLES
	    var sdSlideshow = $('.seydoggySlideshow'),
			preContentWidth = $('.headerContainer .preContent').width(),
			headerWidth = sdSlideshow.width(),
			headerHeight = seydoggy.pageHeader.css('height'),
			ec1 = $('#extraContainer1');
		
		// GLOBAL VARIABLES
		seydoggy.dom = {};
		
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
				ec1.remove();
				sdSlideshow.css({
					'background-image':seydoggy.pageHeader.css('background-image'),
					'background-position':seydoggy.pageHeader.css('background-position'),
					'background-color':seydoggy.pageHeader.css('background-color')
				});
				// initial box slide
				seydoggy.pageHeader.replaceWith('<div class="pageHeader" id="sdSlideBox'+sdSlideNum[0]+'"></div>');
				$('#mySdSlideBox'+sdSlideNum[0]).appendTo('#sdSlideBox'+sdSlideNum[0]);

				// add box slides to slideshow
				for (var i=1, len=arrlen; i<len; ++i) {
					sdSlideshow.append('<div class="pageHeader" id="sdSlideBox'+sdSlideNum[i]+'"></div>');
					$('#mySdSlideBox'+sdSlideNum[i]).appendTo('#sdSlideBox'+sdSlideNum[i]);
				}
				// if header height variable set .seydoggySlideshow height to content height
				if (seydoggy.isVariable) sdSlideshow.sdSetHeight(sdContentSlide,0);
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
				seydoggy.pageHeader.replaceWith('<div class="pageHeader" style="background: '+thisURL+' center top repeat; width:'+headerWidth+'px;"></div><!-- .pageHeader -->');
				// copy ExtraContent to first slide
				$('.movedEC1').append($('.headerContainer .preContent').html());
				$('.movedEC1').width(preContentWidth);
				// add slides to slideshow
				if (typeof sdSlideWH != "undefined") {
					// WAREHOUSE
					for (var i=1, len=arrlen; i<len; ++i) {
						sdSlideshow.append('<div class="pageHeader" style="background: url('+sdSlideWH[i]+') center top repeat; width:'+headerWidth+'px;"></div><!-- .pageHeader -->');
					}
					
				} else {
					// LOCAL
					for (var i=1, len=arrlen; i<len; ++i) {
						sdSlideshow.append('<div class="pageHeader" style="background: url('+RwGet.pathto('images/editable_images/header'+sdSlideNum[i]+'.jpg')+') center top repeat; width:'+headerWidth+'px;"></div><!-- .pageHeader -->');
					}
				}
				// make ExtraContent visible
				$('.headerContainer .preContent').css('z-index','100');

				// if header height is variable set .seydoggySlideshow height to content height
				if (seydoggy.isVariable) seydoggy.slideHeader.sdSetHeight('#extraContainer1 div',30);;
			}
		})();

		// redefine pageHeader to account for DOM creations
		seydoggy.dom.pageHeader = $('.pageHeader');

		// clean up sdSlideBox backgrounds
		if (typeof sdSlideBox != "undefined") seydoggy.dom.pageHeader.css('background','transparent');
		
		// set width of header
		seydoggy.dom.pageHeader.width(headerWidth);

		// start the slideshow 
		var sdCycleFunction = (function(){
			sdSlideshow.cycle({
				fx: slideshowEffect,
				timeout:slideshowTimeout,
				speed:slideshowSpeed
			});
		})();
	})();

	// add links to slides
	if(typeof sdSlideLinks != "undefined") seydoggy.dom.pageHeader.rwAddLinks(sdSlideLinks);
});
