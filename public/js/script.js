        $(function () {
            var availableTags = [
                "Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Chhattisgarh",
				"Delhi",
                "Goa",
                "Gujarat",
                "Haryana",
                "Himachal Pradesh",
                "Jammu & Kashmir",
                "Jharkhand",
                "Karnataka",
                "Kerala",
                "Madhya Pradesh",
                "Maharashtra",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Odisha (Orissa)",
                "Punjab",
                "Rajasthan",
                "Sikkim",
                "Tamil Nadu",
                "Telangana ",
                "Tripura",
                "Uttar Pradesh",
                "Uttarakhand",
                "West Bengal",
                "Kolkata",
                "Dehradun",
                "Lucknow",
                "Agartala",
                "Hyderabad",
                "Chennai",
                "Gangtok",
                "Jaipur",
                "Bhubaneshwar",
                "Kohima",
                "Aizawl", "Shillong",
                "Imphal",
                "Mumbai",
                "Bhopal",
                "Thiruvananthapuram",
                "Bangalore",
                "Ranchi",
                "Srinagar ",
                "Simla, Dharamsala",
                "Gandhinagar",
                "Panaji",
                "Raipur ",
                "Patna",
                "Dispur",
                "Itanagar",
                "Rajasthan"
            ];
            /*$("#tags").autocomplete({
                source: availableTags
            });*/
        });


        $(document).ready(function () {

            $(".hideifopenprice").hide();
            $(".showifopenprice").show();
            $("#optionsRadios1").click(function () {
                $(".hideifopenprice").hide();
                $(".showifopenprice").show();
            });
            $("#optionsRadios2").click(function () {
                $(".hideifopenprice").show();
                $(".showifopenprice").hide();
            });




            $("#apply_coupon_code").hide();
            $("#coupon_code").click(function () {
                $("#apply_coupon_code").toggle();
            });
            $("label#condi_tion").click(function () {
                $("#ContinueBooking").css({
                    "pointer-events": "auto",
                    "opacity": "1.65",
                });
            });


            $("#exampleModalSignUp").hide();
            $("#modelfirstlog").click(function () {
                $("#exampleModalSignUp").show();
                $("#exampleModalLoghide").hide();
            });
            $("#modelseclog").click(function () {
                $("#exampleModalLoghide").show();
                $("#exampleModalSignUp").hide();
            });

            $("#GroupToursShow").hide();
            $("#HoneymoonTourShow").hide();
            $("#Categories").hover(function () {
                $("#CategoriesShow").show();
                $("#GroupToursShow").hide();
                $("#HoneymoonTourShow").hide();
            });
            $("#GroupTours").hover(function () {
                $("#GroupToursShow").show();
                $("#CategoriesShow").hide();
                $("#HoneymoonTourShow").hide();
            });
            $("#HoneymoonTour").hover(function () {
                $("#HoneymoonTourShow").show();
                $("#CategoriesShow").hide();
                $("#GroupToursShow").hide();
            });



            $("#GroupToursShow2").hide();
            $("#HoneymoonTourShow2").hide();
            $("#Categories2").hover(function () {
                $("#CategoriesShow2").show();
                $("#GroupToursShow2").hide();
                $("#HoneymoonTourShow2").hide();
            });
            $("#GroupTours2").hover(function () {
                $("#GroupToursShow2").show();
                $("#CategoriesShow2").hide();
                $("#HoneymoonTourShow2").hide();
            });
            $("#HoneymoonTour2").hover(function () {
                $("#HoneymoonTourShow2").show();
                $("#CategoriesShow2").hide();
                $("#GroupToursShow2").hide();
            });

            $("#GroupToursShow3").hide();
            $("#HoneymoonTourShow3").hide();
            $("#Categories3").hover(function () {
                $("#CategoriesShow3").show();
                $("#GroupToursShow3").hide();
                $("#HoneymoonTourShow3").hide();
            });
            $("#GroupTours3").hover(function () {
                $("#GroupToursShow3").show();
                $("#CategoriesShow3").hide();
                $("#HoneymoonTourShow3").hide();
            });
            $("#HoneymoonTour3").hover(function () {
                $("#HoneymoonTourShow3").show();
                $("#CategoriesShow3").hide();
                $("#GroupToursShow3").hide();
            });
            $(".SucessThankmail").click(function () {
                $("#exampleModalmail").css({
                    "display": "none",
                    "position": "inherit"
                });
            });
            $(".Highlights").click(function () {
                $("#Highlightsshow").toggle();
                $(".Highlights i").toggleClass("transformrotate");
            });
            $(".FinePrint").click(function () {
                $("#FinePrintshow").toggle();
                $(".FinePrint i").toggleClass("transformrotate");
            });

            $(".Facilities").click(function () {
                $("#Facilitiesshow").toggle();
                $(".Facilities i").toggleClass("transformrotate");
            });
            $(".LocationGettingThere").click(function () {
                $("#LocationGettingThereshow").toggle();
                $(".LocationGettingThere i").toggleClass("transformrotate");
            });
            $(".CustomerReviews").click(function () {
                $("#CustomerReviewsShow").toggle();
                $(".CustomerReviews i").toggleClass("transformrotate");
            });
            $(".itinerary").click(function () {
                $("#itineraryshow").toggle();
                $(".itinerary i").toggleClass("transformrotate");
            });
            $(".inclusion").click(function () {
                $("#inclusionshow").toggle();
                $(".inclusion i").toggleClass("transformrotate");
            });
            $(".departdate").click(function () {
                $("#departdateshow").toggle();
                $(".departdate i").toggleClass("transformrotate");
            });
            $(".about-place").click(function () {
                $("#about-placeshow").toggle();
                $(".about-place i").toggleClass("transformrotate");
            });

            $('ul li.htab a').click(function () {
                $('li.htab a').removeClass("hactive");
                $(this).addClass("hactive");
            });
        });

        $(window).scroll(function () {
            if ($(window).scrollTop() >= 550) {
                $('.secound-navbar').addClass('head-fixed-img');
            } else {
                $('.secound-navbar').removeClass('head-fixed-img');

            }
            if ($(window).scrollTop() >= 610) {
                $('.bookingbtnfixhead').addClass('bookingbtnfixheadset');
                $('.bookingfixprice').addClass('bookingfixpriceset');
            } else {
                $('.bookingbtnfixhead').removeClass('bookingbtnfixheadset');
                $('.bookingfixprice').removeClass('bookingfixpriceset');
            }
            if ($(window).scrollTop() >= 1035) {
                $('.location-tab-bar').addClass('location-tab-bar2');
            } else {
                $('.location-tab-bar').removeClass('location-tab-bar2');
            }
            if ($(window).scrollTop() >= 400) {
                $('.about-page-tab-bar').addClass('location-tab-bar2');
            } else {
                $('.about-page-tab-bar').removeClass('location-tab-bar2');
            }
            if ($(window).scrollTop() >= 914) {
                $('.profiletimelinecard').addClass('fixed-booking');
            } else {
                $('.profiletimelinecard').removeClass('fixed-booking');
            }
            if ($(window).scrollTop() >= 3050) {
                $('.profiletimelinecard').removeClass('fixed-booking');
            }

            if ($(window).scrollTop() >= 3514) {
                $('.day').addClass('fixed-day');
            } else {
                $('.day').removeClass('fixed-day');
            }
            if ($(window).scrollTop() >= 5200) {
                $('.day').removeClass('fixed-day');
            }
        });
