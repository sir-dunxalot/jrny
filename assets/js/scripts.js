/*! @Copyright MeanThemes 2014-2015 - JRNY for Ghost 1.0.7 */

jQuery.noConflict();
(function ($) {

	if ( $('body').is('.home-template' ) || $('body').is('.archive-template') ) {
	// Add pre-loader for homepage / archive pages
		var loadingText = "Loading<span>(It won't be long)</span>";
		jQuery('.wrap').prepend('<div class="loader"><div class="loader-inner">' + loadingText + '</div></div>');
	}

	$(window).load(function() {
	"use strict";

			// Detect iOS
			var isiPad = navigator.userAgent.match(/iPad/i);
			var isiPhone = navigator.userAgent.match(/iPhone/i);

				// FitText
				$("h1, .main-archive h2").fitText( 0.79, { minFontSize: '27px', maxFontSize: '75px' } );

				//
        // Full Width Insert
        //
        var makeInsert =function () {
            $("article img").each(function () {

            	var insertAlt = $(this).attr('alt');

            	if ( insertAlt === 'Insert' ) {

            		var parentClass = $(this).parent().attr('class');

            		if ( parentClass !== "mt-insert" ) {

            			$(this).wrap('<figure class="mt-insert" />');

            		}

            		var insertImage = $(this).height();

            		$(this).parent().css( "min-height" , insertImage );


            	}


            });
        };
        makeInsert();

				jQuery(window).resize(function () {
					makeInsert();
				});


		// Detect height of first article then remove position fixed from top article on archive
		if ( $('body').is('.home-template') || $('body').is('.archive-template') ) {

			var archiveHeight = function() {
				var currHeight = jQuery(window).height();
				var currWidth = jQuery(window).width();
				var articleHeight = jQuery('article.with-image').first().height();
				var article = jQuery('article.with-image').first();

				if ( currWidth >= 768 ) {
					jQuery(article).css('height' , currHeight);

					if ( articleHeight < currHeight ) {
						jQuery(article).addClass('adjust-height');
					}
				} else {
					jQuery(article).css('height' , 'auto').removeClass('adjust-height');
				}

			};
			archiveHeight();
			jQuery(window).resize(function () {
				archiveHeight();
			});

			jQuery('article').css( 'position' , 'relative' );


		}



			// Fixed Article
		if ( $('html').is('.fixed-height') ) {

				if ( $('body').is('.home-template') || $('body').is('.archive-template') || $('body').is('.tag-template') || $('body').is('.author-template') ) {

					var fixedHeight = function() {
						var currHeight = $(window).height();
						var currWidth = $(window).width();

						if ( currWidth >= 768 ) {
							$('article.with-image').css('height' , currHeight);

						} else {
							$('article.with-image').css('height' , 'auto');
						}

					};
					fixedHeight();
					jQuery(window).resize(function () {
						fixedHeight();
					});

		}




			if ( $('body').is('.home-template') || $('body').is('.archive-template') ) {
					// Fade in Main archive image
					var fadeArticleIn = function () {

							setTimeout(function() {
									$('.loader').animate({ 'opacity': '0' });
							}, 250);

							setTimeout(function() {
									$('.loader').animate({ 'opacity': '0' });
							}, 0);


							setTimeout(function() {
									$('.loader').remove();
							}, 350);

					};
					fadeArticleIn();

				}


		}


		// Header Expander
		if ( $('body').is('.post-template') ) {

			var expandHeight = 490,
				clicked = false;

			var expand = function() {
							// Tidy up states
							$('.f-expander').remove();
							$('.with-image .post-top').css('height' , expandHeight).removeClass('expanded').css('min-height', expandHeight);

							// Set up variables
							var postTopHeight = $('.post-top').outerHeight(),
								postTopImageHeight = $('.post-top img').outerHeight(),
								imageHeight = postTopImageHeight;

								// Detect whether expander is needed
								if ( ( $('.post-top').css('overflow-y') === "hidden" ) && ( postTopImageHeight > 490 )  ) {
									$('.featured-image').after('<a class="f-expander" style="display: none;"" href="#"><svg id="expand" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 263 263.9" enable-background="new 0 0 263 263.9"><path class="expand" d="M0 243.9h62.4v20h-62.4zM.02 249.304l89.802-89.802 14.142 14.142-89.802 89.802zM0 201.5h20v62.4h-20zM200.6 243.9h62.4v20h-62.4zM248.874 263.442l-89.802-89.802 14.142-14.142 89.802 89.802zM243 201.5h20v62.4h-20zM0 0h62.4v20h-62.4zM14.153.448l89.802 89.802-14.142 14.142-89.802-89.802zM0 0h20v62.4h-20zM200.6 0h62.4v20h-62.4zM263.007 14.576l-89.802 89.802-14.142-14.142 89.802-89.802zM243 0h20v62.4h-20z"/></svg><svg id="un-expand" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 263 263.9" enable-background="new 0 0 263 263.9"><path class="un-expand" d="M41.5 159.5h62.4v20h-62.4zM103.929 174.126l-89.802 89.802-14.142-14.142 89.802-89.802zM83.9 159.5h20v62.4h-20zM159.1 159.5h62.4v20h-62.4zM173.273 159.955l89.802 89.802-14.142 14.142-89.802-89.802zM159.1 159.5h20v62.4h-20zM159.1 84.4h62.4v20h-62.4zM159.14 89.796l89.802-89.802 14.142 14.142-89.802 89.802zM159.1 42h20v62.4h-20zM41.5 84.4h62.4v20h-62.4zM89.796 103.892l-89.802-89.802 14.142-14.142 89.802 89.802zM83.9 42h20v62.4h-20z"/></svg></a>');
								} else {
									$('.f-expander').remove();
									$('.with-image .post-top').css('height','auto').removeClass('expanded').css('min-height',0);
								}

							$('.f-expander').delay(500).fadeIn();

							$('.f-expander').on( 'click' , function(e) {
								e.preventDefault();
								if ( clicked === true ) {
									clicked = false;
									imageHeight = postTopHeight;
									$('.with-image .post-top').css('height',imageHeight).removeClass('expanded');
									// Reveal title etc. on contract
									$('.post-header').fadeIn(400);
								} else {
									imageHeight = postTopImageHeight;
									clicked = true;
									$('.with-image .post-top').css('height',imageHeight).addClass('expanded');
									// Hide title etc. on expand
									$('.post-header').fadeOut(400);
								}
								$(this).toggleClass('active');
							});
			};
			expand();

			// Resize events
			if ( !isiPad && !isiPhone ) {
				$(window).resize(function () {
					expand();
				});

			}
		}

	});


	//
	// Doc ready scripts
	//

    $(document).ready(function() {
			"use strict";
    	//
    	// Add a class so we know JavaScript is supported
    	//
    	$('html').addClass("js").removeClass("no-js");

			// Get Current Width
			var currWidth = $(window).width();

			// Detect iOS
			var isiPad = navigator.userAgent.match(/iPad/i);
			var isiPhone = navigator.userAgent.match(/iPhone/i);

			// Theme Set vars
			// Check for IE9 var and add a html class

			if ( ie9 ) {
				$('html').addClass('ie9');
			}




			if ( !$('body').is('draw-open') ) {

				var fadeHeaders = false;

				if ( fadeHeaders ) {

						if ( currWidth >= 640 ) {

							$(window).scroll(function() {
					      if ($(this).scrollTop() > 40) {
					        $('.home-inner').stop().animate({opacity: 0}, 100);
					      }
					      if ($(this).scrollTop() < 30) {
					       	$('.home-inner').stop().animate({opacity: 1}, 200);
					      }
					    });

						}

				}

			}



			if (isiPad || isiPhone) {
				$('body').addClass('ios');
			}



			if ( $('body').is('.home-template') || $('body').is('.archive-template') ) {

					// Remove loader in mobile scenario
					if ( currWidth < 800 ) {

						$('.loader').css('opacity','0').remove();

					}

					// Set up smooth scroll
					$(function() {
					$('.home-article a[href*=#]:not([href=#])').on( 'click' , function() {
					if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
						var target = $(this.hash);
						target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
						if (target.length) {
							$('html,body').animate({
								scrollTop: target.offset().top
							}, 750);
							return false;

						}
					}
					});
				});
			}





				// Overlay menu area
				var menuClicked = false;
				$('.menu-default #overlay').addClass('hide');
				$('.menu-default #menu-trigger').on( 'click' , function (e) {

					e.preventDefault();

					$('body').toggleClass('menu-open');
					$(this).toggleClass('active');

					if ( menuClicked === false ) {

						$('#overlay').fadeIn(300);
						$('header.header').toggleClass('active');

						menuClicked = true;

					} else {

						$('#overlay').fadeOut(300);
						$('header.header').toggleClass('active');

						menuClicked = false;

					}

				});



				// Drawer navigation
				if ( $('html').is('.menu-drawer') ) {
					currWidth = $(window).width();

						$('#overlay').prepend('<a href="#" id="menu-close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 595.2 594.8" enable-background="new 0 0 595.2 594.8"><path d="M202.3 297.7l297.5-297.5 95.4 95.4-297.5 297.6-95.4-95.5zm-202.3-202.3l95.4-95.4 297.5 297.5-95.4 95.4-297.5-297.5zM202.3 297.1l95.4-95.5 297.5 297.6-95.4 95.4-297.5-297.5zm-202.3 202.3l297.5-297.5 95.4 95.4-297.5 297.5-95.4-95.4z"/></svg></a>');



						$('.menu-drawer #menu-trigger, .menu-drawer #menu-close').on( 'click' , function (e) {
							e.preventDefault();
							$('body').toggleClass('drawer-open');

							if ( menuClicked === false ) {

								$('.menu-drawer #overlay')
								.css('right','-330px')
								.css('visibility','visible')
								.css('clip','auto').show();

								menuClicked = true;

							} else {



								setTimeout(function() {
									$('.menu-drawer #overlay').hide().css('right','0');
								}, 500);

								menuClicked = false;

							}


						});



				}


        //
        //  FitVids
        //
        $(".post-inner").fitVids();




				// Image processing for homepage

				if ( $('body').is('.home-template') || $('body').is('.archive-template') || $('body').is('.tag-template') || $('body').is('.author-template') || $('body').is('.tag-template')  ) {

					$('.main-archive article').each(function () {

						var imageUri = $('.featured-image img',this).attr('src');

						if ( imageUri ) {

							if ( !$(this).is('.result') ) {
								$(this).addClass('with-image').attr( 'style' , 'background-image: url(' + imageUri + ');' );
								$('.post-wrapper',this).attr( 'style' , 'background-image: url(' + imageUri + ');' );
							}

						} else {
							if ( !$(this).is('.result') && !$(this).is('.home-article') ) {
								$(this).addClass('no-image');
							}

						}

					});

				}


				// Image processing for single/page

				if ( $('body').is('.post-template')  ) {

					$('.main article').each(function () {

						var grabImage = $('.featured-image img',this);


						if ( grabImage.length > 0 ) {

							// Check image to see if it is pre Ghost 0.5.2
							if ( $( '.featured-image' ).is('.not-post-image') ) {

								$('.post-inner img').first().remove();

								$('.post-inner p').first().remove();

							}

							$(this).addClass('with-image');

						}

						else {

							$(this).addClass('no-image');

							$('body').addClass('sans-image');

						}

					});

				}


				// Check for presence of overlay and hide menu icon if there isn't one

				if ( $('#overlay').length === 0 ) {

					$('#menu-trigger').hide();

				}

				if ( $('#overlay ul li').length === 0 ) {

					$('#menu-trigger').hide();

				}



    }); // end document.ready


})(jQuery);
