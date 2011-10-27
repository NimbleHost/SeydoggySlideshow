/*/////////////////////////////////////////////////////////////////////////////////////////////////////*/
/* @group phpjs.include */var include = function(script_filename) { document.write('<' + 'script'); document.write(' src="' + script_filename + '">'); document.write('</' + 'script' + '>'); }/* @end */
/* @group RwGet */RwGet = { pathto: function(path, file) { var rtrim = function(str, list) { var charlist = !list ? 's\xA0': (list + '').replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1'); var re = new RegExp('[' + charlist + ']+$', 'g'); return (str + '').replace(re, ''); }; var jspathto = rtrim(RwSet.pathto, "javascript.js"); if ((path !== undefined) && (file !== undefined)) { jspathto = jspathto + path + file; } else if (path !== undefined) { jspathto = jspathto + path; } return jspathto; }, baseurl: function(path, file) { var jsbaseurl = RwSet.baseurl; if ((path !== undefined) && (file !== undefined)) { jsbaseurl = jsbaseurl + path + file; } else if (path !== undefined) { jsbaseurl = jsbaseurl + path; } return jsbaseurl; } };/* @end */
/* @group rwAddLinks v1.0.0 06-17-11 07:54*/ (function($) { $.fn.rwAddLinks = function(linkArr) { var i = 0; $(this).each(function(i) { $(this).click(function() { location.href = linkArr[i++]; }).hover(function() { $(this).css("cursor", "pointer"); }); }); }; })(jQuery); /* @end */
/* @group sdVertAlign 2.0.0 07-29-11 11:53*/ (function($) { $.fn.sdVertAlign = function(parent) { var vcenterParentHeight = $(parent).innerHeight(true); var vcenterHeight = $(this).innerHeight(true); $(this).css('padding-top', ((vcenterParentHeight - vcenterHeight) / 2)); }; })(jQuery);
/* @group sdSetHeight 1.1.0 07-28-11 12:07 */ (function($) { $.fn.sdSetHeight = function(elem, value) { sdTallest = 0; $(elem).each(function() { var thisTallest = $(this).outerHeight(true); if (thisTallest > sdTallest) sdTallest = thisTallest; }); $(this).height(sdTallest + value); }; })(jQuery); /* @end */
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

jQuery.noConflict();
jQuery(document).ready(function($){
	// VARIABLES
	var pageWidth = $('.siteHeader').outerWidth(true);
	// GLOBAL VARIABLES
	seydoggy = {},
		seydoggy.isVariable = typeof headerHeightVariable != 'undefined',
		seydoggy.slideHeader = $('.seydoggySlideshow,.pageHeader'),
		seydoggy.pageHeader = $('.pageHeader');
	
	/* @group ExtraContent */
	// function/styles for ExtraContent
	var sdExtracontent = (function(){
		var myEC = '#myExtraContent';
		/* ExtraContent (jQuery) VERSION: r1.4.2 */
		var extraContent =  (function() {
			// change ecValue to suit your theme
			var ecValue = 1;
			for (i=1;i<=ecValue;i++)
			{
				$(myEC + i + ' script').remove();
				$(myEC + i).appendTo('#extraContainer'+i).show();
			}
		})();

		// !hide !empty ExtraContent areas
		if ($(myEC + '1').length > 0) $('.headerContainer .preContent').show();
	})();
	/* @end */

	/* @group Header Height/Width */
	var sdHeader = (function(){
		if(typeof sdSlideNum == "undefined") {
			// if header height variable set .pageHeader/.seydoggySlideshow height to content height
			if (seydoggy.isVariable) {
				seydoggy.slideHeader.sdSetHeight('#extraContainer1 div',29);
			}
		}
		// set width of .headerContainer .preContent to .siteHeader
		$('.headerContainer .preContent').width(pageWidth - 29);
	})();
	/* @end */
});
// test to see if user has selected a slideshow option
if((typeof sdSlideNum != "undefined") || (typeof sdSlideWH != "undefined")) {
	include(RwGet.pathto('scripts/slideshow/jquery.cycle.all.min.js'));
	include(RwGet.pathto('scripts/slideshow/seydoggy.slideshow.js'));
}