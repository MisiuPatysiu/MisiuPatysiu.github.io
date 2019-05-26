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

    function distance(from, to) {
        function deg2rad(deg) {
            return deg * (Math.PI / 180)
        }

        let dLat = deg2rad(to.lat - from.lat);  // deg2rad below
        let dLon = deg2rad(to.long - from.long);
        let a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(from.lat)) * Math.cos(deg2rad(to.lat)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        let RADIUS = 6371; // Radius of the earth in km
        let distance = RADIUS * c; // Distance in km
        return distance.toFixed(3);
    }

    $("#start-button").click(function (event) {
        const places = {
            astor: {lat: 50.1120237, long: 20.1354208},
            brama: {lat: 50.1128361, long: 20.1329169}
        };

        let interval;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    receivePosition(position);
                    interval = setInterval(() => {
                        navigator.geolocation.getCurrentPosition(receivePosition, errorPosition);
                    }, 1000);
                },
                errorPosition);

        } else {
            $("#error").show().text("Twoje urządznie nie ma GPS :/ Nie da się na nim grać w grę :/");
        }

        function receivePosition({coords}) {
            showPosition({lat: coords.latitude, long: coords.longitude})
        }

        function showPosition(pos) {
            $("#start-button").hide();
            $("#error").hide();
            $("#game").show();
            $("#current").text("\nLat: " + pos.lat + "\nLon: " + pos.long);
            $("#distance").text(`\n` +
                "Astor: " + distance(pos, places.astor) + "km\n" +
                "Brama: " + distance(pos, places.brama) + "km\n"
            );
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
