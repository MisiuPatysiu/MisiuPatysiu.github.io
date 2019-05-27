const out = {};

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

    $("#start-button").click(function () {
        let interval;
        let gameIsFinished = false;

        function distance(from, to, checkPoint) {
            if (checkPoint) {
                return prompt("Podaj odległość do punktu: " + checkPoint);
            }

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
            let distance = RADIUS * c * 1000; // Distance in m
            return distance.toFixed(1);
        }

        function domCheckList(checkPoint) {
            function createList(objects) {
                return objects
                    .filter(object => object.visible)
                    .map(object => {
                        const element = document.createElement('li');
                        element.innerText = object.text;
                        return element;
                    });
            }

            function objectsFromCheckPoint(checkPoint) {
                const objects = {
                    church: {text: 'Start gry jest przy Kościele Mariackim'},
                    sukiennice: {text: 'Odwiedź Sukiennice'},
                    head: {text: 'Odwiedź pustą głowę'},
                    costa: {text: 'Kawa w Costa przy Floriańskiej'},
                    market: {text: 'Odwiedź centrum malego rynku'},
                    goodLood: {text: 'Lody w Good Lood przy Placu Wolnica'},
                    dragon: {text: 'Koniec Gry - Smok Wawelski'},
                };
                const result = [];
                for (let index in checkPoints) {
                    if (checkPoints.hasOwnProperty(index)) {
                        const checkPointName = checkPoints[index];
                        const value = objects[checkPointName];
                        result.push({
                            text: value.text,
                            visible: true
                        });
                        if (checkPoint === checkPointName) {
                            break;
                        }
                    }
                }
                return result;
            }

            const ul = document.createElement('ul');
            createList(objectsFromCheckPoint(checkPoint)).forEach(li => ul.appendChild(li));
            return ul;
        }

        function refreshPosition() {
            if (!gameIsFinished) {
                interval = setTimeout(() => {
                    navigator.geolocation.getCurrentPosition(receivePosition, errorPosition);
                }, 1000);
            }
        }

        function receivePosition({coords}) {
            showPosition({lat: coords.latitude, long: coords.longitude});
            refreshPosition();
        }

        function distanceToCheckPoint(pos, places, checkPoint) {
            const objects = {
                church: 'Kościoła Mariackiego',
                sukiennice: 'Sukiennic',
                head: "Pustej głowy",
                costa: "Costy Coffee",
                market: "Małego Rynku",
                goodLood: "GoodLood",
                dragon: "Smoka Wawelskiego",
            };
            return objects[checkPoint] + ": " + distance(pos, places[checkPoint]) + "m";
        }

        function showPosition(pos) {
            $("#start-button").hide();
            $("#error").hide();
            $("#game").show();
            $("#distance").text(distanceToCheckPoint(pos, places, checkPoint));
            checkPoint = nextCheckPointIfReached(pos, checkPoint);
            printCheckPoint(checkPoint);
        }

        function errorPosition(error) {
            if (error.code === 1) {
                $("#error").show().text("Twoje urządzenie nie pozwoliło na skorzystanie z lokalizacji");
            } else {
                $("#error").show().text(error.message);
            }
            $("#start-button").show();
            $("#game").hide();
        }

        function printCheckPoint(checkPoint) {
            $("#checkpoints").html('').append(domCheckList(checkPoint));
        }

        function nextCheckPointIfReached(pos, checkPoint) {
            let nextPlace = places[checkPoint];
            const _distance = distance(pos, nextPlace, checkPoint);
            if (_distance <= 15) {
                const index = checkPoints.indexOf(checkPoint);
                if (index === checkPoints.length - 1) {
                    clearInterval(interval);
                    finnishGame();
                } else {
                    let string = checkPoints[index + 1];
                    const objects = {
                        church: 'Kościół Mariacki',
                        sukiennice: 'Sukiennice',
                        head: "Pusta Głowa na Rynku",
                        costa: "Costa Coffee na Floriańskiej",
                        market: "Centrum Małego Rynku",
                        goodLood: "GoodLood na Placu Wolnice",
                        dragon: "Smok Wawelski",
                    };
                    alert("Gratluacje! Osiągnęłaś kolejny Check Point: " + objects[checkPoint]);
                    return string;
                }
            }
            return checkPoint;
        }

        function finnishGame() {
            $("#error").hide();
            $("#game").hide();
            $("#start-button").hide();
            $("#congrats").show();
            gameIsFinished = true;
        }

        const checkPoints = ['church', 'costa', 'sukiennice', 'head', 'market', 'goodLood', 'dragon'];
        let checkPoint = checkPoints[0];

        const places = {
            church: {lat: 50.0616426, long: 19.9389436},
            sukiennice: {lat: 50.062386, long: 19.9377868},
            head: {lat: 50.0615639, long: 19.9362337},
            costa: {lat: 50.064751, long: 19.9392663},
            market: {lat: 50.0615028, long: 19.9405985},
            goodLood: {lat: 50.0488605, long: 19.9427747},
            dragon: {lat: 50.0530183, long: 19.9313905},
        };

        printCheckPoint(checkPoint);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(receivePosition, errorPosition);
        } else {
            $("#error").show().text("Twoje urządznie nie ma GPS :/ Nie da się na nim grać w grę :/");
        }
    });
});
