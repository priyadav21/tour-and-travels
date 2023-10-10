import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import Routes from '../client/Routes';

export default (req, store, context) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );
  const helmet = Helmet.renderStatic();
  return `<!DOCTYPE html>
            <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                ${helmet.link.toString()}
                <link href="https://www.googletagmanager.com" rel="dns-prefetch">
                <link href="https://www.google-analytics.com" rel="dns-prefetch">
                <link rel="dns-prefetch" href="//fonts.googleapis.com">
                <link rel="dns-prefetch" href="//s.w.org">
                            
                <link rel="stylesheet" href="/css/bootstrap.css">
                <link rel="stylesheet" href="/css/style.css">
                <link rel="stylesheet" href="/css/style2.css">
                <link rel="stylesheet" href="/css/header-style.css">
				<link rel="stylesheet" href="/css/header-3.css">
                <link rel="stylesheet" href="/css/ddmenu.css">
                <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">-->
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.10.0/css/all.css">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
                <meta name="google-site-verification" content="nVgpYC6aLPs3a9kmP578C9nTIyXNW9pNP_Oc3uEQ7kU" />
                <meta name="p:domain_verify" content="aaa87295e77f7b4eeac4bfb6b89e3a49"/>
                <link rel="stylesheet" href="/css/swiper.css">
                <link rel="stylesheet" href="/css/owl.carousel.min.css">
                <link rel="stylesheet" href="/css/owl.theme.default.min.css">
                <link rel="stylesheet" href="/css/website-slider-style.css">
                <link rel="stylesheet" href="/css/website-slider-style2.css">
                <link rel="stylesheet" href="/css/website-slider-style-isotope.css">
                <link rel="stylesheet" href="/css/jquery.mb.YTPlayer.min.css">
                <link rel="stylesheet" href="https://cdn.rawgit.com/sachinchoolur/lightgallery.js/master/dist/css/lightgallery.css">
                ${helmet.script.toString()}
            </head>
            <body>
                <div id="root">${content}</div>
                <script>
                    window.__PRELOADED_STATE__ = ${serialize(store.getState()).replace(
                      /</g,
                      '\\u003c'
                    )}
                </script>
                
                <script src="/bundle.js"></script>
                <script src="/styles.bundle.js"></script>
                
                
                <!--important for bootstrap 4 slider-->
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <script src="/js/popper.min.js"></script>
    <script src="/js/bootstrap.min.js"></script>
    <!--important for bootstrap 4 slider-->
    <script type="text/javascript" src="/js/ddmenu.js"></script>

    <!--important for bootstrap 4 carasoul slider-->
    <script src="/js/owl.carousel.js"></script>

    <script type="text/javascript" src="/js/swiper.min.js"></script>
    <script type="text/javascript" src="/js/isotope.pkgd.min.js"></script>
    <script type="text/javascript" src="/js/imagesloaded.pkgd.min.js"></script>
    <script type="text/javascript" src="/js/jquery.mb.YTPlayer.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/sachinchoolur/lightgallery.js@master/dist/js/lightgallery.js"></script>
    <script type="text/javascript" src="https://cdn.rawgit.com/sachinchoolur/lg-pager.js/master/dist/lg-pager.js"></script>
    <script type="text/javascript" src="https://cdn.rawgit.com/sachinchoolur/lg-autoplay.js/master/dist/lg-autoplay.js"></script>
    <script type="text/javascript" src="https://cdn.rawgit.com/sachinchoolur/lg-share.js/master/dist/lg-share.js"></script>
    <script type="text/javascript" src="https://cdn.rawgit.com/sachinchoolur/lg-fullscreen.js/master/dist/lg-fullscreen.js"></script>
    <script type="text/javascript" src="https://cdn.rawgit.com/sachinchoolur/lg-zoom.js/master/dist/lg-zoom.js"></script>
    <script type="text/javascript" src="https://cdn.rawgit.com/sachinchoolur/lg-hash.js/master/dist/lg-hash.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/picturefill/2.3.1/picturefill.min.js"></script>
            

    <script>
	$(document).ready(function() {
        $("#frmSubscribe,#frmRegister, #frmRegister1, #frmRegister2, #frmRegister3, #frmRegister4, #frmRegister5, #frmRegister6, #frmRegister7").submit(function(e) { // Change (your contact form ID)
		const data = new FormData(event.target);
		const value = Object.fromEntries(data.entries());
		$.ajax({
			type : "POST",
			url : "https://api.touroxy.com/travelapi/enquiry/insert",
			// url : "http://localhost:9090/travel_api/enquiry/insert",
			contentType: "application/json;charset-UTF-8",
        	dataType: 'json',
        	data: JSON.stringify(value)
		}).done(function() {
			alert("Thank you. Your message has been sent!");
            gtag_report_conversion();
			/* setTimeout(function() {
				event.target.trigger("reset");
				$("#send-enquiry").hide();
			}, 1000); */
		});
		return false;
	});
    
    $("#frmRegisterFile").submit(function(e) { // Change (your contact form ID)
		const data = new FormData(event.target);
		const value = Object.fromEntries(data.entries());
        console.log(data);
		$.ajax({
			type : "POST",
			url : "https://api.touroxy.com/travelapi/enquiry/insert-file",
			// url : "http://localhost:9090/travel_api/enquiry/insert-file",
            contentType: "application/json;charset-UTF-8",
            cache: false,
            contentType: false,
            processData: false,
        	data: data
		}).done(function() {
			alert("Thank you. Your message has been sent!");
            gtag_report_conversion();
			/* setTimeout(function() {
				event.target.trigger("reset");
				$("#send-enquiry").hide();
			}, 1000); */
		});
		return false;
	});
    
            var owl2 = $('.owl-carousel-old');
            owl2.owlCarousel({
                margin: 20,
                loop: true,
                navRewind: true,
                nav: true,
                autoplay: true,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 3
                    },
                    1000: {
                        items: 5
                    }
                }
            })
        
        $('.owl-carousel-des-3').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            navRewind: true,
            autoplay: true,
            autoplayHovNextause: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        })
		var owl1 = $('.owl-carousel-2');
            owl1.owlCarousel({
                margin: 10,
                loop: false,
                navRewind: false,
                nav: true,
                autoplay: true,
                autoplayHoverPause: true,
                
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 2
                    },
                    1000: {
                        items: 4
                    }
                }
            })
			
			 $('.owl-carousel-testimonals').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            autoplay: true,
            autoplayHovNextause: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        })

			});
    </script>

    <script>
        $(document).ready(function() {

            var swiper2 = new Swiper('.mySwiper-3', {
				spaceBetween : 10,
				slidesPerGroup : 1,
				loop : true,
                loopFillGroupWithBlank : true,
                breakpoints: {
                // when window width is >= 320px
                    320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                    },
                    // when window width is >= 480px
                    480: {
                    slidesPerView: 3,
                    spaceBetween: 20
                    },
                    // when window width is >= 640px
                    640: {
                    slidesPerView: 5,
                    spaceBetween: 10
                    }
                },
				pagination : {
					el : '.swiper-pagination',
					clickable : true,
				},
				
				  observer: true,
            observeParents: true,
            parallax:true,
			navigation : {
					nextEl : '.swiper-button-next',
					prevEl : '.swiper-button-prev',
				},
			});

$('.swiperin').each(function(){
    new Swiper($(this), {
        pagination: $(this).find('.swiper-pagination'),
        paginationClickable: $(this).find('.swiper-pagination'),
        nextButton: $(this).find('.swiper-button-next'),
        prevButton: $(this).find('.swiper-button-prev'),
        loop: true
    });
});

/* 			var thisSwiper = [];
 $('.swiper-container-op').each(function(i) {
   var this_ID = $(this).attr('id');

   thisSwiper[i] = new Swiper('#'+this_ID, {
     loop: true,
     direction: 'vertical'
   });

   thisSwiper[i].on('slideChange', function () {
     console.log('slide '+i+' changed');
   });
 }); */
			
			// Function that actually builds the swiper 
const buildSwiperSlider = sliderElm => {
    const sliderIdentifier = sliderElm.dataset.id;
	alert(sliderIdentifier);
    return new Swiper('#'+sliderIdentifier, {
				spaceBetween : 10,
				slidesPerGroup : 1,
				loop : true,
                loopFillGroupWithBlank : true,
                breakpoints: {
                // when window width is >= 320px
                    320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                    },
                    // when window width is >= 480px
                    480: {
                    slidesPerView: 3,
                    spaceBetween: 20
                    },
                    // when window width is >= 640px
                    640: {
                    slidesPerView: 5,
                    spaceBetween: 10
                    }
                },
				pagination : {
					el : '.swiper-pagination',
					clickable : true,
				},

				  observer: true,
            observeParents: true,
            parallax:true,
        navigation: {
            nextEl: '.swiper-button-next-'+sliderIdentifier,
            prevEl: '.swiper-button-prev-'+sliderIdentifier,
        },
    });
}

// Get all of the swipers on the page
const allSliders = document.querySelectorAll('.swiperin');

// Loop over all of the fetched sliders and apply Swiper on each one.
allSliders.forEach(slider => buildSwiperSlider(slider));

			

			var swiper4 = new Swiper('.swiper-container-new', {
				slidesPerView : 1,
				slidesPerGroup : 1,
				loop : true,
                //loopFillGroupWithBlank : true,
				pagination : {
					el : '.swiper-pagination',
					clickable : true,
				}
			});

			var swiper5 = new Swiper('.swiper-container-pills', {
				loop : true,
				loopFillGroupWithBlank : true,
				slidesPerView : 3
            });
        
			$('[data-carousel="swiper-data-attr"]').each( function() {

	var containe		= $(this).find('[data-swiper="container"]').attr('id');
	var pagination		= $(this).find('[data-swiper="pagination"]').attr('id');
	var prev		= $(this).find('[data-swiper="prev"]').attr('id');
	var next		= $(this).find('[data-swiper="next"]').attr('id');
	var items		= $(this).data('items');
	var autoplay		= $(this).data('autoplay');
	var iSlide		= $(this).data('initial');
	var loop		= $(this).data('loop');
	var center		= $(this).data('center');
	var effect		= $(this).data('effect');
	var direction		= $(this).data('direction');

	// Configuration
	var conf 	= {};

	if ( items ) {
		conf.slidesPerView = items
	};
	if ( autoplay ) {
		conf.autoplay = autoplay
	};
	if ( iSlide ) {
		conf.initialSlide = iSlide
	};
	if ( center ) {
		conf.centeredSlides = center
	};
	if ( loop ) {
		conf.loop = loop
	};
	if ( effect ) {
		conf.effect = effect
	};
	if ( direction ) {
		conf.direction = direction
	};
	if ( prev ) {
		conf.prevButton = '#' + prev
	};
	if ( next ) {
		conf.nextButton = '#' + next
	};
	if ( pagination ) {
		conf.pagination = '#' + pagination,
		conf.paginationClickable = true
	};

	// Animate Function
	function animated_swiper(selector, init) {
		var animated = function animated() {
			$(selector + ' [data-animate]').each(function(){
				var anim = $(this).data('animate');
				var delay = $(this).data('delay');
				var duration = $(this).data('duration');

				$(this).removeClass('anim' + anim)
				.addClass(anim + ' animated')
				.css({
					webkitAnimationDelay: delay,
					animationDelay: delay,
					webkitAnimationDuration: duration,
					animationDuration: duration
				})
				.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
					$(this).removeClass(anim + ' animated');
				});
			});
		};
		animated();
		// Make animated when slide change
		init.on('SlideChangeStart', function() {
			$(initID + ' [data-animate]').removeClass('animated');
		});
		init.on('SlideChangeEnd', animated);
	};

	// Initialization
	if (container) {
		var initID = '#' + container;
		var init = new Swiper( initID, conf);
		animated_swiper(initID, init);
	};
});
            
        });


    </script>
    <script>
        $('.owl-carousel-icon').owlCarousel({
            loop: false,
            margin: 10,
            nav: false,
            autoplay: true,
            autoplayHovNextause: true,
            responsive: {
                0: {
                    items: 2
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 6
                }
            }
        })
        $(document).ready(function(){
        $( ".owl-prev").html('<i class="fa fa-chevron-left"></i>');
        $( ".owl-next").html('<i class="fa fa-chevron-right"></i>');
        });     
    </script>

    <script type="text/javascript">
        $(".sidebar-bottom").click(function() {
            $(".sidebar-show-bottom").css("top", "0px");
        });
        $("#sidebar-close-btn-bottom").click(function() {
            $(".sidebar-show-bottom").css("top", "100%");
        });
        $(".sidebarupdown-bottom").click(function() {
            $(".sidebar-show-bottom").css("top", "100%");
        });

        $(".sidebar-bottom").click(function() {
            $(".sidebarupdown-bottom").addClass("sidebarclassadd-bottom");
        });
        $(".sidebarupdown-bottom").click(function() {
            $(".sidebarupdown-bottom").removeClass("sidebarclassadd-bottom");
        });
        $("#sidebar-close-btn-bottom").click(function() {
            $(".sidebarupdown-bottom").removeClass("sidebarclassadd-bottom");
        });
        $("#sidebar-close-btn-bottom").click(function() {
            $(".sidebarupdown-bottom").removeClass("sidebarclassadd-bottom");
        });

    </script>

    <!--sidebar script start-->
    <script>
        $(".sidebar").click(function() {
            $(".sidebar-show").css("left", "0px");
        });
        $("#sidebar-close-btn").click(function() {
            $(".sidebar-show").css("left", "-100%");
        });
        $(".sbac").click(function() {
            $(".sidebar-show").css("left", "-100%");
        });

        $(".sidebar").click(function() {
            $(".sbac").addClass("sidebarclassadd");
        });
        $(".sbac").click(function() {
            $(".sbac").removeClass("sidebarclassadd");
        });
        $("#sidebar-close-btn").click(function() {
            $(".sbac").removeClass("sidebarclassadd");
        });
        $("#sidebar-close-btn").click(function() {
            $(".sbac").removeClass("sidebarclassadd");
        });

        $(".viewbenefits").click(function() {
            $(".viewbenefitsshow").css("right", "0px");
        });

    </script>

    <script>
    /*     var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].onclick = function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel!=null && panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            }
        } */

    </script>
            <script>
                $(window).scroll(function() {
                    if ($(window).scrollTop() >= 50) {
                        $(".filter-fixed").addClass("filter-fixed-top shadow");
                    } else {
                        $(".filter-fixed").removeClass("filter-fixed-top shadow");
                    }
				});
            </script>
<script>
lightGallery(document.getElementById('lightgallery'));

// $(".lightgallery").lightGallery({
// 		selector : '.lg-trigger',
// 		mode : 'lg-fade', // Type of transition between images ('lg-fade' or 'lg-slide').
// 		height : '100%', // Height of the gallery (ex: '100%' or '300px').
// 		width : '100%', // Width of the gallery (ex: '100%' or '300px').
// 		iframeMaxWidth : '100%', // Set maximum width for iframe.
// 		loop : true, // If false, will disable the ability to loop back to the beginning of the gallery when on the last element.
// 		speed : 600, // Transition duration (in ms).
// 		closable : true, // Allows clicks on dimmer to close gallery.
// 		escKey : true, // Whether the LightGallery could be closed by pressing the "Esc" key.
// 		keyPress : true, // Enable keyboard navigation.
// 		hideBarsDelay : 5000, // Delay for hiding gallery controls (in ms).
// 		controls : true, // If false, prev/next buttons will not be displayed.
// 		mousewheel : true, // Chane slide on mousewheel.
// 		download : false, // Enable download button. By default download url will be taken from data-src/href attribute but it supports only for modern browsers. If you want you can provide another url for download via data-download-url.
// 		counter : true, // Whether to show total number of images and index number of currently displayed image.
// 		swipeThreshold : 50, // By setting the swipeThreshold (in px) you can set how far the user must swipe for the next/prev image.
// 		enableDrag : true, // Enables desktop mouse drag support.
// 		enableTouch : true, // Enables touch support.

// 		// thumbnial plugin
// 		thumbnail : true, // Enable thumbnails for the gallery.
// 		showThumbByDefault : false, // Show/hide thumbnails by default.
// 		thumbMargin : 5, // Spacing between each thumbnails.
// 		toogleThumb : true, // Whether to display thumbnail toggle button.
// 		enableThumbSwipe : true, // Enables thumbnail touch/swipe support for touch devices.
// 		exThumbImage : 'data-exthumbnail', // If you want to use external image for thumbnail, add the path of that image inside "data-" attribute and set value of this option to the name of your custom attribute.

// 		// autoplay plugin
// 		autoplay : false, // Enable gallery autoplay.
// 		autoplayControls : true, // Show/hide autoplay controls.
// 		pause : 6000, // The time (in ms) between each auto transition.
// 		progressBar : true, // Enable autoplay progress bar.
// 		fourceAutoplay : false, // If false autoplay will be stopped after first user action

// 		// fullScreen plugin
// 		fullScreen : true, // Enable/Disable fullscreen mode.

// 		// zoom plugin
// 		zoom : true, // Enable/Disable zoom option.
// 		scale : 0.5, // Value of zoom should be incremented/decremented.
// 		enableZoomAfter : 50, // Some css styles will be added to the images if zoom is enabled. So it might conflict if you add some custom styles to the images such as the initial transition while opening the gallery. So you can delay adding zoom related styles to the images by changing the value of enableZoomAfter.

// 		// video options
// 		videoMaxWidth : '1000px', // Set limit for video maximal width.

// 		// Youtube video options
// 		loadYoutubeThumbnail : true, // You can automatically load thumbnails for youtube videos from youtube by setting loadYoutubeThumbnail true.
// 		youtubeThumbSize : 'default', // You can specify the thumbnail size by setting respective number: 0, 1, 2, 3, 'hqdefault', 'mqdefault', 'default', 'sddefault', 'maxresdefault'.
// 		youtubePlayerParams : { // Change youtube player parameters: https://developers.google.com/youtube/player_parameters
// 			modestbranding : 0,
// 			showinfo : 1,
// 			controls : 1
// 		},

// 		// Vimeo video options
// 		loadVimeoThumbnail : true, // You can automatically load thumbnails for vimeo videos from vimeo by setting loadYoutubeThumbnail true.
// 		vimeoThumbSize : 'thumbnail_medium', // Thumbnail size for vimeo videos: 'thumbnail_large' or 'thumbnail_medium' or 'thumbnail_small'.
// 		vimeoPlayerParams : { // Change vimeo player parameters: https://developer.vimeo.com/player/embedding#universal-parameters 
// 			byline : 1,
// 			portrait : 1,
// 			title : 1,
// 			color : 'CCCCCC',
// 			autopause : 1
// 		},

// 		// hash plugin (unique url for each slides)
// 		hash : true, // Enable/Disable hash plugin.
// 		hgalleryId : 1, // Unique id for each gallery. It is mandatory when you use hash plugin for multiple galleries on the same page.

// 		// share plugin
// 		share : false, // Enable/Disable share plugin.
// 		facebook : true, // Enable Facebook share.
// 		facebookDropdownText : 'Facebook', // Facebok dropdown text.
// 		twitter : true, // Enable Twitter share.
// 		twitterDropdownText : 'Twitter', // Twitter dropdown text.
// 		googlePlus : true, // Enable Google Plus share.
// 		googlePlusDropdownText : 'Google+', // Google Plus dropdown text.
// 		pinterest : true, // Enable Pinterest share.
// 		pinterestDropdownText : 'Pinterest' // Pinterest dropdown text.

// 	});

	// Disabled on mobile devices, because video background doesn't work on mobile devices (instead the background image is displayed).
	if (!jQuery.browser.mobile) {
		$(".youtube-bg").mb_YTPlayer();
	}

	// E-mail Ajax Send
	$("#contact-form").submit(function() { // Change (your contact form ID)
		var th = $(this);
		$.ajax({
			type : "POST",
			url : "mail.php", // Change (mail.php path)
			data : th.serialize()
		}).done(function() {
			alert("Thank you. Your message has been sent!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	$(window).on('load', function() { // fixes Owl Carousel "autoWidth: true" issue (https://github.com/OwlCarousel2/OwlCarousel2/issues/1139).

		$('.owl-carousel').each(function() {
			var $carousel = $(this);
			$carousel.owlCarousel({

				items : $carousel.data("items"),
				loop : $carousel.data("loop"),
				margin : $carousel.data("margin"),
				center : $carousel.data("center"),
				startPosition : $carousel.data("start-position"),
				animateIn : $carousel.data("animate-in"),
				animateOut : $carousel.data("animate-out"),
				autoWidth : $carousel.data("autowidth"),
				autoHeight : $carousel.data("autoheight"),
				autoplay : $carousel.data("autoplay"),
				autoplayTimeout : $carousel.data("autoplay-timeout"),
				autoplayHoverPause : $carousel.data("autoplay-hover-pause"),
				autoplaySpeed : $carousel.data("autoplay-speed"),
				nav : $carousel.data("nav"),
				navText : [ '', '' ],
				navSpeed : $carousel.data("nav-speed"),
				dots : $carousel.data("dots"),
				dotsSpeed : $carousel.data("dots-speed"),
				mouseDrag : $carousel.data("mouse-drag"),
				touchDrag : $carousel.data("touch-drag"),
				dragEndSpeed : $carousel.data("drag-end-speed"),
				lazyLoad : $carousel.data("lazy-load"),
				video : true,
				responsive : {
					0 : {
						items : $carousel.data("mobile-portrait"),
						center : false,
					},
					480 : {
						items : $carousel.data("mobile-landscape"),
						center : false,
					},
					768 : {
						items : $carousel.data("tablet-portrait"),
						center : false,
					},
					992 : {
						items : $carousel.data("tablet-landscape"),
					},
					1200 : {
						items : $carousel.data("items"),
					}
				}

			});

		});
        $( ".owl-prev").html('<i class="fa fa-chevron-left"></i>');
        $( ".owl-next").html('<i class="fa fa-chevron-right"></i>');

	/* 	// Mousewheel plugin
		var owlMouse = $('.owl-mousewheel');
		owlMouse.on('mousewheel', '.owl-stage', function(e) {
			if (e.deltaY > 0) {
				owlMouse.trigger('prev.owl', [ 800 ]);
			} else {
				owlMouse.trigger('next.owl', [ 800 ]);
			}
			e.preventDefault();
		});
 */
		// Keyboard (prev/next arrow) events for navigating
		// https://github.com/OwlCarousel2/OwlCarousel2/issues/492#issuecomment-55629470
		var owlKeyboard = $('.owl-carousel');
		$(document).keyup(function(i) {
			if (i.keyCode == 37) {
				owlKeyboard.trigger('prev.owl', [ 800 ]);
			} else if (i.keyCode == 39) {
				owlKeyboard.trigger('next.owl', [ 800 ]);
			}
		});
        

	});
    $(document).ready(function(){
        
        });     

	// Bootstrap-3 modal fix
	$('.modal').appendTo("body")

	// Bootstrap tooltip
	$('[data-toggle="tooltip"]').tooltip()

	// Bootstrap popover
	$('[data-toggle="popover"]').popover({
		html : true
	});

    // ===================================================================================
	// Isotope
	// Source: http://isotope.metafizzy.co
	// Note: "imagesloaded" blugin is required: https://github.com/desandro/imagesloaded
	// ===================================================================================

	// init Isotope
	var $container = $('.isotope-items-wrap');

		// if RTL enabled
		var origLeft = true;
		if( $('body').hasClass('tt-rtl')) {
			origLeft = false;
		}

	$container.imagesLoaded(function() {
		$container.isotope({
			itemSelector: '.isotope-item',
			transitionDuration: '0.7s',
			originLeft: origLeft,
			masonry: {
				columnWidth: '.grid-sizer',
				horizontalOrder: false
			}
		});
	});

	// Filter
	$('.isotope-filter-links a').on("click",function(){
		var selector = $(this).attr('data-filter');
		$container.isotope({
			filter: selector
		});
		return false;
	});

	// Filter item active
	var filterItemActive = $('.isotope-filter-links a');
	filterItemActive.on('click', function(){
		var $this = $(this);
		if ( !$this.hasClass('active')) {
			filterItemActive.removeClass('active');
			$this.addClass('active');
		}
	});


	// If "isotope-top-content" exist add class ".iso-top-content-on" to <body>.
	if ($('.isotope-top-content').length) {
		$('body').addClass('iso-top-content-on');
	}

	// If ".isotope-filter" contains class "fi-to-button" add class "fi-to-button-on" to ".isotope-top-content".
	if ($('.isotope-filter').hasClass('fi-to-button')) {
		$('.isotope-top-content').addClass('fi-to-button-on');
	}

	// If ".isotope-filter" contains class "fi-to-button" add class "fi-to-button-on" to ".isotope-top-content".
	if ($('.gallery-share').length) {
		$('.isotope-top-content').addClass('gallery-share-on');
	}

	// Filter button clickable/hover (clickable on small screens)
	if ( $(window).width() < 992) {

		// Filter button clickable (effect on small screens)
		$('.isotope-filter-button').on("click",function(){
			$('.isotope-filter').toggleClass('iso-filter-open');
		});

		// Close filter button if click on filter links (effect only on small screens)
		$('ul.isotope-filter-links > li > a').on("click",function() {
			$(".isotope-filter-button").click();
		});

	} else {

		// Filter button on hover
		$('.isotope-filter').on("mouseenter",function(){
			$('.isotope-filter').addClass('iso-filter-open');
		}).on("mouseleave",function(){
			$('.isotope-filter').removeClass('iso-filter-open');
		});

	}


	// if class "isotope" exist.
	if ($('.isotope').length){
		
		// add overflow scroll to <html> (isotope items gaps fix).
		if ( document.querySelector('body').offsetHeight > window.innerHeight ) {
			document.documentElement.style.overflowY = 'scroll';
		}

		// Add class "isotope-on" to <body>.
		$('body').addClass('isotope-on');
	}


	// Add class "iso-gutter-*-on" to <body> if ".isotope" contains class "gutter-*".
	if ($('.isotope').hasClass('gutter-1')) {
		$('body').addClass('iso-gutter-1-on');
	}

	if ($('.isotope').hasClass('gutter-2')) {
		$('body').addClass('iso-gutter-2-on');
	}

	if ($('.isotope').hasClass('gutter-3')) {
		$('body').addClass('iso-gutter-3-on');
	}


	// Add class "iso-tt-wrap-on" to <body> if ".isotope-wrap" contains class "tt-wrap".
	if ($('.isotope-wrap').hasClass('tt-wrap')) {
		$('body').addClass('iso-tt-wrap-on');
	}

</script>

    <!-- Initialize Swiper -->
    <script>
    var swiper = new Swiper(".mySwiper-6", {
		  spaceBetween :10,
				slidesPerGroup : 6,
				loop : true,
                autoplay:true,
                loopFillGroupWithBlank : false,
                breakpoints: {
                // when window width is >= 320px
                    320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                    },
                    // when window width is >= 480px
                    480: {
                    slidesPerView: 3,
                    spaceBetween: 20
                    },
                    // when window width is >= 640px
                    640: {
                    slidesPerView: 6,
                    spaceBetween: 10
                    }
                },
				pagination : {
					el : '.swiper-pagination',
					clickable : true,
				},

				  observer: true,
            observeParents: true,
            parallax:true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });

      var swiper = new Swiper(".mySwiper-5", {
		  spaceBetween : 10,
				slidesPerGroup : 5,
				loop : true,
                autoplay:true,
                loopFillGroupWithBlank : false,
                breakpoints: {
                // when window width is >= 320px
                    320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                    },
                    // when window width is >= 480px
                    480: {
                    slidesPerView: 3,
                    spaceBetween: 20
                    },
                    // when window width is >= 640px
                    640: {
                    slidesPerView: 5,
                    spaceBetween: 10
                    }
                },
				pagination : {
					el : '.swiper-pagination',
					clickable : true,
				},

				  observer: true,
            observeParents: true,
            parallax:true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });

        var swiper = new Swiper(".mySwiper-4", {
		  spaceBetween : 10,
				slidesPerGroup : 4,
				loop : true,
                autoplay:true,
                loopFillGroupWithBlank : false,
                breakpoints: {
                // when window width is >= 320px
                    320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                    },
                    // when window width is >= 480px
                    480: {
                    slidesPerView: 3,
                    spaceBetween: 20
                    },
                    // when window width is >= 640px
                    640: {
                    slidesPerView: 4,
                    spaceBetween: 10
                    }
                },
				pagination : {
					el : '.swiper-pagination',
					clickable : true,
				},

				  observer: true,
            observeParents: true,
            parallax:true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });

	  var swiper3 = new Swiper(".mySwiper-2", {
		  spaceBetween : 10,
				slidesPerGroup : 1,
				loop : true,
                speed: 6000,
                autoplay: {
                    delay: 1000,
                  },
                loopFillGroupWithBlank : true,
                breakpoints: {
                // when window width is >= 320px
                    320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                    },
                    // when window width is >= 480px
                    480: {
                    slidesPerView: 2,
                    spaceBetween: 20
                    },
                    // when window width is >= 640px
                    640: {
                    slidesPerView: 2,
                    spaceBetween: 10
                    }
                },
				pagination : {
					el : '.swiper-pagination',
					clickable : true,
				},

				  observer: true,
            observeParents: true,
            parallax:true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
	  var swiper1 = new Swiper(".mySwiper-1", {
		  spaceBetween : 10,
				slidesPerGroup : 1,
				loop : true,
                autoplay: {
                    delay: 1000,
                  },
                loopFillGroupWithBlank : true,
                breakpoints: {
                // when window width is >= 320px
                    320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                    },
                    // when window width is >= 480px
                    480: {
                    slidesPerView: 1,
                    spaceBetween: 20
                    },
                    // when window width is >= 640px
                    640: {
                    slidesPerView: 1,
                    spaceBetween: 10
                    }
                },
				pagination : {
					el : '.swiper-pagination',
					clickable : true,
				},

				  observer: true,
            observeParents: true,
            parallax:true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });



        $(".sidebar").click(function() {
            $(".sidebar-show").css("left", "0px");
        });
        $("#sidebar-close-btn").click(function() {
            $(".sidebar-show").css("left", "-100%");
        });
        $(".sbac").click(function() {
            $(".sidebar-show").css("left", "-100%");
        });

        $(".sidebar").click(function() {
            $(".sbac").addClass("sidebarclassadd");
        });
        $(".sbac").click(function() {
            $(".sbac").removeClass("sidebarclassadd");
        });
        $("#sidebar-close-btn").click(function() {
            $(".sbac").removeClass("sidebarclassadd");
        });
        $("#sidebar-close-btn").click(function() {
            $(".sbac").removeClass("sidebarclassadd");
        });

        $(".viewbenefits").click(function() {
            $(".viewbenefitsshow").css("right", "0px");
        });




        $(".sidebar").click(function() {
            $(".stop").addClass("scroll-body");
        });
        $(".sbac").click(function() {
            $(".stop").removeClass("scroll-body");
        });
        $("#sidebar-close-btn").click(function() {
            $(".stop").removeClass("scroll-body");
        });
     
      /*=======================================
        Scroll Top
    =======================================*/
    $(".scrollup").on('click', function() {
        $('html,body').animate({
            'scrollTop': '0'
        }, 4000);
        return false;
    });   

    // yujik college header javscript
    var targetPanel=    document.getElementById('yujik_college_detailCon_header_9');
// close
if(document.getElementById('yujikSideBarclose')!=null && targetPanel)
{
 document.getElementById('yujikSideBarclose').addEventListener('click',function(){
    targetPanel.style.width = "0%";
} );
}
// open
if(document.getElementById('yujik_colleg_icon__header_9')!=null && targetPanel)
{
 document.getElementById('yujik_colleg_icon__header_9').addEventListener('click',function(){
    targetPanel.style.width="100%";
} );
}   
    window.onscroll = () => {
        // yujikHide()
        if(targetPanel)
         targetPanel.style.width = "0%";
    }
    function yujikHide() {
        var hold = document.getElementById('yujikScrollhideHeader_9');
        var fixed = document.getElementById('yujikMenu15422asId')
        var holdSec= document.getElementById('yujikMenu15422TopMarque')
        if (window.scrollY > 90) {
            hold.style.display = "none"
            holdSec.style.display="none"
            fixed.classList.add('yujikFixedClassOnScroll')
        }
        else {
            hold.style.display = "block"
            holdSec.style.display="block"
            fixed.classList.remove('yujikFixedClassOnScroll')
        }
    }

    </script>

    <script>
    (function($){
        $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
          if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
          }
          var $subMenu = $(this).next(".dropdown-menu");
          $subMenu.toggleClass('show');
    
          $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
            $('.dropdown-submenu .show').removeClass("show");
          });
    
          return false;
        });
    })(jQuery)
    </script>
  


<script>

/* -------------Divaksha Header ---------*/
   function handleScroll() {
  var navLinks = document.querySelectorAll('.nav-link-21');
  var toggler = document.querySelector('.togggler-21');
  var logo = document.querySelector('.logo-21');

  if(toggler && toggler.classList && logo && navLinks)
  {
  if (window.scrollY > 10 || window.innerWidth <= 767) {
    // $(".nav-link-21").css('display','none');

    navLinks.forEach(function(link)
 {
      link.classList.add('hidden');
    });
    toggler.classList.remove('hidden');
    toggler.classList.add('togglerOnScroll');
    // logo.classList.add('logoOnScroll');
  } else {
    navLinks.forEach(function(link)
 {
      link.classList.remove('hidden');
    });
    toggler.classList.add('hidden');
    // logo.classList.remove('logoOnScroll');
    toggler.classList.remove('togglerOnScroll');
  }
    }
}

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobileDevice()) {
  // Code to run if the device is a phone
  console.log('The logged-in device is a phone.');
  handleScroll();
} else {
  // Code to run if the device is not a phone
  console.log('The logged-in device is not a phone.');
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleScroll);


// JavaScript code
document.addEventListener('DOMContentLoaded', function() {
  var toggler = document.querySelector('.togggler-21');
  var sidenavbar = document.querySelector('.Sidenavbar-21');
if(toggler && toggler.classList && sidenavbar)
{
  toggler.addEventListener('click', function() {
    // sidenavbar.classList.toggle('hidden');
    sidenavbar.classList.toggle('visible');
  });

}
});


$(document).ready(function(){
    var sidenavbar = document.querySelector('.Sidenavbar-21');
    if(sidenavbar)
    {
      $(".closebtnH21").click(function() {
        sidenavbar.classList.remove('visible');
    });
    }
});   

// JavaScript code
document.addEventListener('DOMContentLoaded', function() {
  var sidenavbar = document.querySelector('.Sidenavbar-21');

  if(sidenavbar)
  {
  // Function to toggle the "hidden" class
  function toggleHiddenClass() {
    if (window.scrollY  >= 0) {
      sidenavbar.classList.remove('visible');
    } else {
      sidenavbar.classList.add('visible');
    }
  }
  // Toggle the "hidden" class on scroll
  window.addEventListener('scroll', toggleHiddenClass);
    }
});


      </script>
      <script>
      $(window).scroll(function() {
          if ($(window).scrollTop() >= 20) {
              $(".navbar-21").addClass("pos-fix-21");
          } else {
              $(".navbar-21").removeClass("pos-fix-21");
          }
      });
  </script>

            </body>
    </html>`;
};
