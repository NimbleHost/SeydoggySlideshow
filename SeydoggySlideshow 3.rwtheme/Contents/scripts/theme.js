jQuery.noConflict();
jQuery(document).ready(function($){
	
/*
	DEVELOPER OPTIONS

	wrapper		:	'.headerContainer' //any class or id you like
	target		:	'.seydoggySlideshow' //any class or id you like
	ecValue		:	1 // the number of the EC area in the header. 0 if none
	imgType		:	'jpg'/'png'
	bgPosition	:	'center top'
	bgRepeat	:	'repeat'/'no-repeat'
	widthAdjust	:	30 //number in pixels to reduce ExtraContent width
	heightAdjust:	30 //number in pixels to reduce ExtraContent height
	plusClass	:	'someString' // string or space separated values for additional slide classes
	
	EXAMPLES
	
	// default
	$.SeydoggySlideshow();
	
	// background positioning / file format
	$.SeydoggySlideshow({
		bgPosition : 'center center',
		imgType : 'png'
	});
	
	// as seen in Will Woodgates Flood
	$.SeydoggySlideshow({
		wrapper : '#banner',
		target : '.ss3',
		ecValue : 4
	});

*/
	
	// invoke SeydoggySlideshow
	$.SeydoggySlideshow();
});