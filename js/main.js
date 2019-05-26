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


    $('.play-btn').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });
});
