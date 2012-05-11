/* RwGet */
if (typeof RwGet == 'undefined') RwGet = { pathto: function(path, file) { var rtrim = function(str, list) { var charlist = !list ? 's\xA0': (list + '').replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1'); var re = new RegExp('[' + charlist + ']+$', 'g'); return (str + '').replace(re, ''); }; var jspathto = rtrim(RwSet.pathto, "javascript.js"); if ((path !== undefined) && (file !== undefined)) { jspathto = jspathto + path + file; } else if (path !== undefined) { jspathto = jspathto + path; } return jspathto; }, baseurl: function(path, file) { var jsbaseurl = RwSet.baseurl; if ((path !== undefined) && (file !== undefined)) { jsbaseurl = jsbaseurl + path + file; } else if (path !== undefined) { jsbaseurl = jsbaseurl + path; } return jsbaseurl; } };/* @end */
/* rwAddLinks v1.0.0 */
if (typeof rwAddLinks == 'undefined') (function($) { $.fn.rwAddLinks = function(linkArr) { var i = 0; $(this).each(function(i) { $(this).click(function() { location.href = linkArr[i++]; }).hover(function() { $(this).css("cursor", "pointer"); }); }); }; })(jQuery); /* @end */
/* sdSetHeight 1.1.0 */
if (typeof sdSetHeight == 'undefined') (function($) { $.fn.sdSetHeight = function(elem, value) { sdTallest = 0; $(elem).each(function() { var thisTallest = $(this).outerHeight(true); if (thisTallest > sdTallest) sdTallest = thisTallest; }); $(this).height(sdTallest + value); }; })(jQuery); /* @end */

// initiate sdSS object
sdSS = {};

/* SeydoggySlideshow 3.1.2 */
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
        	slideHeader = sdSlideshow.add(pageHeader),
        	ec1 = hContainer.find('div#extraContainer' + sdSS.ecValue),
			myEC = hContainer.find('div#myExtraContent' + sdSS.ecValue),
        	sdContentSlide = jq.add('div.sdSlideBoxStack'),
        	sdContentIndex = 0,
        	headerWidth = sdSlideshow.width(),
        	headerHeight = pageHeader.css('height');

		// EXTRACONTENT AREA 1
		// if the first ExtraContent hasn't yet been propogated
		if (!myEC.length) {
			myEC = jq.add('div#myExtraContent' + sdSS.ecValue);
			if (myEC.length) {
				myEC.find('script').remove().end().appendTo(ec1).show();
				// !hide !empty ExtraContent area
				ec1.show();
			}
		}

        if (!sdContentSlide.length) sdContentSlide = jq.add('div.sdSlideBoxSnippet'), sdContentIndex = 1;

        if ((typeof sdSS.slideNum != "undefined") || (typeof sdSS.slideWH != "undefined") || (typeof sdSlideNum != "undefined") || (typeof sdSlideWH != "undefined")) {

			// SETUP SLIDES
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
					'height' : pageHeader.css('height')
                });
                // clean up what's there
                pageHeader.add(ec1).remove();
				
                // add box slides to slideshow
                for (i; i < arrlen; ++i) {
                    sdSlideshow.append('<div class="pageHeader" id="sdSlideBox' + sdSS.slideNum[i] + '" style="width:' + headerWidth + 'px;"></div>');
                    jq.add('div#mySdSlideBox' + sdSS.slideNum[i]).appendTo('div#sdSlideBox' + sdSS.slideNum[i]).show();
                }
                // if header height is variable set .seydoggySlideshow height to content height
                if (isVariable) sdSlideshow.sdSetHeight(sdContentSlide, 0);
            } else {
                // SET UP IMAGE SLIDES
				
                // clean up what's there
                pageHeader.remove();

                if (typeof sdSS.slideWH != "undefined") {
					// WAREHOUSE
	                arrlen = sdSS.slideWH.length;
                    for (i; i < arrlen; ++i) {
                        sdSlideshow.append('<div class="pageHeader" style="background: url(' + sdSS.slideWH[i] + ') ' + sdSS.bgPosition + ' ' + sdSS.bgRepeat + '; width:' + headerWidth + 'px;"></div><!-- .pageHeader -->');
                    }
                } else if (typeof sdSlideWH != "undefined") {
					// WAREHOUSE (legacy API support)
	                arrlen = sdSlideWH.length;
                    for (i; i < arrlen; ++i) {
                        sdSlideshow.append('<div class="pageHeader" style="background: url(' + sdSlideWH[i] + ') ' + sdSS.bgPosition + ' ' + sdSS.bgRepeat + '; width:' + headerWidth + 'px;"></div><!-- .pageHeader -->');
                    }
                } else if (typeof sdSS.slideNum != "undefined") {
                    // LOCAL
                    arrlen = sdSS.slideNum.length;
                    for (i; i < arrlen; ++i) {
                        sdSlideshow.append('<div class="pageHeader" style="background: url(' + RwGet.pathto('images/editable_images/header' + sdSS.slideNum[i] + '.' + sdSS.imgType) + ') ' + sdSS.bgPosition + ' ' + sdSS.bgRepeat + '; width:' + headerWidth + 'px;"></div><!-- .pageHeader -->');
                    }
				} else {
					// LOCAL (legacy API support)
                    arrlen = sdSlideNum.length;
                    for (i; i < arrlen; ++i) {
                        sdSlideshow.append('<div class="pageHeader" style="background: url(' + RwGet.pathto('images/editable_images/header' + sdSlideNum[i] + '.' + sdSS.imgType) + ') ' + sdSS.bgPosition + ' ' + sdSS.bgRepeat + '; width:' + headerWidth + 'px;"></div><!-- .pageHeader -->');
                    }
				}

                // make ExtraContent visible
                ec1.css('z-index', '100');

                // if header height is variable set .seydoggySlideshow height to content height
                if (isVariable) slideHeader.sdSetHeight(ec1.find('div'), sdSS.heightAdjust);
            }

            // START THE SLIDESHOW
            sdSlideshow.cycle({
                fx: sdSS.effect,
                timeout: sdSS.timeout,
                speed: sdSS.speed
            });
        }

        // redefine pageHeader to account for DOM creations
        sdSS.pageHeader = sdSlideshow.find('div.pageHeader');

        // add links to slides
        if (typeof sdSS.slideLinks != "undefined") sdSS.pageHeader.rwAddLinks(sdSS.slideLinks);
        // add links to slides (legacy API support)
        if (typeof sdSlideLinks != "undefined") sdSS.pageHeader.rwAddLinks(sdSlideLinks);

		// add new classes to DOM .pageHeaders
		if (sdSS.plusClass != '') sdSS.pageHeader.addClass(sdSS.plusClass);

        // clean up sdSlideBox backgrounds
        if (typeof sdSS.slideBox != "undefined") sdSS.pageHeader.css('background', 'transparent');

        // set width of header
        sdSS.pageHeader.width(headerWidth);
        ec1.width(headerWidth - sdSS.widthAdjust);

        // if header height is variable set .seydoggySlideshow height to content height
        if (typeof sdSS.slideBox == "undefined" && isVariable) slideHeader.sdSetHeight(ec1.find('div'), sdSS.heightAdjust);
    }
})(jQuery);