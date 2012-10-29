/*
	SeydoggySlideshow without the dependencies (RwGet, rwAddLinks, sdSetHeight)
*/

// initiate sdSS object
if (!window.sdSS) sdSS = {};

/* SeydoggySlideshow 3.2.3 */
(function($) {
    $.SeydoggySlideshow = function(settings) {

		// DEVELOPER SETTINGS
		sdSS.wrapper = '.headerContainer',
			sdSS.target = '.seydoggySlideshow',
			sdSS.ecValue = 1,
			sdSS.imgType = 'jpg',
			sdSS.bgPosition = 'center top',
			sdSS.bgRepeat = 'repeat',
			sdSS.widthAdjust = 29,
			sdSS.heightAdjust = 30,
			sdSS.plusClass = '';

		// check for options
		if (settings) $.extend(sdSS, settings);

        // VARIABLES
        var jq = $([]),
			arrlen = '',
			i = 0,
			isVariable = typeof sdSS.headerHeightVariable != 'undefined',
			hContainer = jq.add('div' + sdSS.wrapper),
			sdSlideshow = hContainer.find('div' + sdSS.target),
			pageHeader = sdSlideshow.find('div.pageHeader'),
			sdSlidePager = '',
			slideHeader = sdSlideshow.add(pageHeader),
			ec1 = hContainer.find('div#extraContainer' + sdSS.ecValue),
			preContent = ec1.parent('div.preContent'),
			myEC = hContainer.find('div#myExtraContent' + sdSS.ecValue),
			sdContentSlide = jq.add('div.sdSlideBoxStack'),
			sdContentIndex = 0,
			headerWidth = sdSlideshow.width(),
			headerHeight = pageHeader.css('height'),
			nextClass = '',
			prevClass = '',
			plusClass = 0;
			
		// set plusClass
		sdSS.plusClass !== '' ? plusClass = ' ' + sdSS.plusClass : plusClass = '';

		// if SlideBox Stacks is not found, use SlideBox Snippet
        if (!sdContentSlide.length) sdContentSlide = jq.add('div.sdSlideBoxSnippet'), sdContentIndex = 1;
			

		// EXTRACONTENT AREA 1

		// if the first ExtraContent hasn't yet been propogated
		if (!myEC.length) {
			myEC = jq.add('div#myExtraContent' + sdSS.ecValue);
			if (myEC.length) {
				myEC.find('script').remove().end().appendTo(ec1).show();

				// !hide !empty ExtraContent area
				ec1.show().width(headerWidth - sdSS.widthAdjust).css('z-index', '100');
				preContent.show();

                // if header height is variable set .seydoggySlideshow height to content height
                if (isVariable) slideHeader.sdSetHeight(ec1.find('div'), sdSS.heightAdjust);
			}
		}
		
		// if Slideshow is enabled in some form
        if ((typeof sdSS.slideNum != "undefined") || (typeof sdSS.slideWH != "undefined")) {

			// SETUP SLIDES
			
			// if SlideBox option is used
            if (typeof sdSS.slideBox != "undefined") {

				// SETUP BOX SLIDES
                
				// VARIABLES
                sdSS.slideNum = [];

                // determine stack or snippet
                if (sdContentSlide.length) {
                    sdContentSlide.each(function(i) {
                        sdSS.slideNum[i++] = (sdContentSlide.index(this)) + sdContentIndex;
                    });
                }

                // set array length
                arrlen = sdSS.slideNum.length;

				// transfer header styles to parent div
                sdSlideshow.css({
                    'background-image': pageHeader.css('background-image'),
                    'background-position-x': pageHeader.css('background-position-x'),
                    'background-position-y': pageHeader.css('background-position-y'),
                    'background-color': pageHeader.css('background-color'),
                    'background-size': pageHeader.css('background-size'),
					'height' : pageHeader.css('height')
                });

                // clean up what's there
                pageHeader.add(ec1).remove();
				
                // add box slides to slideshow
                for (i; i < arrlen; ++i) {
                    sdSlideshow.append('<div class="pageHeader' + plusClass + '" id="sdSlideBox' + sdSS.slideNum[i] + '" style="background: transparent; width:' + headerWidth + 'px;"/>');
                    jq.add('div#mySdSlideBox' + sdSS.slideNum[i]).appendTo('div#sdSlideBox' + sdSS.slideNum[i]).show();
                }

                // if header height is variable set .seydoggySlideshow height to content height
                if (isVariable) sdSlideshow.sdSetHeight(sdContentSlide, 0);
            } else {
				// else if standard slides/snippets are used

                // SET UP IMAGE SLIDES
				
                // clean up what's there
                pageHeader.remove();

                if (typeof sdSS.slideWH != "undefined") {
					// WAREHOUSE
					arrlen = sdSS.slideWH.length;
                    for (i; i < arrlen; ++i) {
                        sdSlideshow.append('<div class="pageHeader' + plusClass + '" style="background: url(' + sdSS.slideWH[i] + ') ' + sdSS.bgPosition + ' ' + sdSS.bgRepeat + '; width:' + headerWidth + 'px;"/>');
                    }
                } else {
                    // LOCAL
                    arrlen = sdSS.slideNum.length;
                    for (i; i < arrlen; ++i) {
                        sdSlideshow.append('<div class="pageHeader' + plusClass + '" style="background: url(' + RwGet.pathto('images/editable_images/header' + sdSS.slideNum[i] + '.' + sdSS.imgType) + ') ' + sdSS.bgPosition + ' ' + sdSS.bgRepeat + '; width:' + headerWidth + 'px;"/>');
                    }
				}
            }

            // SLIDESHOW SETTINGS

			// if navigation is selected
			if (sdSS.navigation === true) {
				
				// create navigation elements
				sdSlideshow.append('<div class="sdSlideNav"><a class="prev" href="#">&lsaquo;</a><a class="next" href="#">&rsaquo;</a></div>');
				nextClass = '.sdSlideNav .next', prevClass = '.sdSlideNav .prev';
				
				// if slidebox is not in use
				if (typeof sdSS.slideBox == 'undefined') {
					
					// make extracontent 1 smaller on each side
					var navWidth = jq.add('div.sdSlideNav a.prev, div.sdSlideNav a.next').outerWidth(true);
					ec1.width(ec1.width() - (navWidth * 2)).css('margin-left', navWidth);

					// (again) if header height is variable set .seydoggySlideshow height to content height
					if (isVariable) slideHeader.sdSetHeight(ec1.find('div'), sdSS.heightAdjust);
				}
			}
			
			// if pager is selected set pager classes
			if (sdSS.pager !== undefined) sdSlideshow.append('<div class="sdSlidePager"/>'), sdSlidePager = sdSlideshow.find('div.sdSlidePager');
			

            // START THE SLIDESHOW
            sdSlideshow.cycle({
				autostop: sdSS.autostop,
                fx: sdSS.effect,
				next: nextClass,
				pager: sdSS.pager,
				pagerEvent: 'mouseover',
				pause: sdSS.pause,
				pauseOnPagerHover: true,
				prev: prevClass,
				random: sdSS.random,
				randomizeEffects: true,
				slideExpr: '.pageHeader',
                speed: sdSS.speed,
                timeout: sdSS.timeout
            });
			
            // PAGINATION

			// if pagination is active, dynamically set pagination values
			if (sdSlidePager !== '' && sdSlidePager.html()) {
				sdSlidePager.find('a').html('&middot;');
				sdSlidePager.css('margin-left',(sdSlidePager.width()/2)*(-1));
			}
        }

        // SLIDE LINKS

        // add links to slides
        if (typeof sdSS.slideLinks != "undefined") sdSlideshow.find('div.pageHeader').rwAddLinks(sdSS.slideLinks);
	};
})(jQuery);