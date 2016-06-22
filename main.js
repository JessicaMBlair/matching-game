
$(document).ready(function() {

    busy = false;

    var counter = 0;
    $('.flipper .front').click(function() {
        if (busy) {
            return;
        }
        if ($(this).parent().is('.done')) return;
        counter++;
        $(".matches").text(" " + counter);
    });


    $('.flip-container .flipper').click(function() {

        // We're keeping track of the ones that've been removed with the `done` class
        if ($(this).is('.done')) return;

        // Also, if we're animating, don't handle user input
        if (busy) return;

        var oneFlipped = $('.turn').length === 1;

        $(this).toggleClass("turn");


        if (oneFlipped) {

            busy = true;

            // Remove
            // Get both, compare, are equal
            var cards = $('.turn')
                // flip back over
                // Not equal
            var firstCard  = cards.eq(0).find('.back-title').text();
            var secondCard = cards.eq(1).find('.back-title').text();

            if (!firstCard) {

                setTimeout(function() {
                    busy = false;
                }, 600);

            } else if (firstCard === secondCard) {
                
                setTimeout(function() {
                    
                    // Hide and remove the cards
                    cards.animate({
                        opacity: 0
                    }, {
                        duration: 1000
                    });

                    setTimeout(function() {

                        busy = false;
                        cards.removeClass('turn');
                        cards.addClass('done');

                    }, 1000);

                }, 500);


            } else {

                setTimeout(function() {
                    busy = false;
                    cards.removeClass('turn');
                }, 1500);
            }


        }

    });
});


      $.ajax('https://openclipart.org/search/json/?query=play&amount=20')
            .then(function(resp) {

                console.log(resp.payload);


                var list = [], item;


                for (var i = 0; i < 6; i++) {
                    item = {
                        title : resp.payload[i].title,
                        url   : resp.payload[i].svg.png_thumb
                    };

                    list.push(item);
                    list.push(item);
                }

                list.sort(function() { return .5 - Math.random() });

                
                $('.back').each(function(i, el) {
                    var $back = $(el);
                    
                    var $logo  = $back.children('.back-logo');
                    var $title = $back.children('.back-title');


                    $title.text(list[i].title);
                    $title.hide ();

                    var $img = $('<img/>').attr('src', list[i].url);
                    $logo.append($img);
                });

            });
