$(document).ready(function () {
    "use strict";

    var window_width = $(window).width(),
        window_height = window.innerHeight,
        header_height = $(".default-header").height(),
        header_height_static = $(".site-header.static").outerHeight(),
        fitscreen = window_height - header_height;


    $(".fullscreen").css("height", window_height);
    $(".fitscreen").css("height", fitscreen);

    // -------   Active Mobile Menu-----//

    $(".menu-bar").on('click', function (e) {
        e.preventDefault();
        $("nav").toggleClass('hide');
        $("span", this).toggleClass("lnr-menu lnr-cross");
        $(".main-menu").addClass('mobile-menu');
    });

    $('select').niceSelect();

    $('.active-feature-carousel').owlCarousel({
        center: true,
        items: 1,
        loop: true
    });
    $('.next-trigger').click(function () {
        $(".active-feature-carousel").trigger('next.owl.carousel');
    });
    // Go to the previous item
    $('.prev-trigger').click(function () {
        $(".active-feature-carousel").trigger('prev.owl.carousel');
    });

    $('.active-service-carousel').owlCarousel({
        items: 2,
        loop: true,
        margin: 30,
        dots: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 2,
            }
        }
    });

    $('.next-trigger').click(function () {
        $(".active-service-carousel").trigger('next.owl.carousel');
    });
    $('.prev-trigger').click(function () {
        $(".active-service-carousel").trigger('prev.owl.carousel');
    });

    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {

        function deg2rad(deg) {
            return deg * (Math.PI / 180)
        }

        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }


    $("#start-button").click(function (event) {
        var interval;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    showPosition(position);
                    interval = setInterval(() => {
                        navigator.geolocation.getCurrentPosition(showPosition, errorPosition);
                    }, 1000);
                },
                errorPosition);

        } else {
            $("#error").show().text("Twoje urządznie nie ma GPS :/ Nie da się na nim grać w grę :/");
        }

        function showPosition(position) {
            console.log(position);
            $("#start-button").hide();
            $("#error").hide();
            $("#game").show();
            $("#current").text("\nLat: " + position.coords.latitude + "\nLon: " + position.coords.longitude);
        }

        function errorPosition(error) {
            clearInterval(interval);
            if (error.code === 1) {
                $("#error").show().text("Twoje urządzenie nie pozwoliło na skorzystanie z lokalizacji");
            } else {
                $("#error").show().text(error.message);
            }
            $("#start-button").show();
            $("#game").hide();
        }
    });
});
