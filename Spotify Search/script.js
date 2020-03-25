(function() {
    var nextUrl;
    $("#submit-button").on("click", function() {
        var userInput = $("input").val();
        var artistOrAlbum = $(".album-or-artist").val();
        var baseUrl = "https://elegant-croissant.glitch.me/spotify";
        var infiniteScroll = location.search.indexOf("?scroll=infinite") > -1;

        $.ajax({
            url: baseUrl,
            data: {
                //for finding out this you must read the documentation to your api.
                query: userInput,
                type: artistOrAlbum
            },
            success: function(data) {
                // console.log("data before split: ", data);
                data = data.albums || data.artists;
                console.log("data AFTER split: ", data);
                nextUrl =
                    data.next &&
                    data.next.replace(
                        "https://api.spotify.com/v1/search",
                        "https://elegant-croissant.glitch.me/spotify"
                        // baseUrl
                    );

                console.log("nextUrl: ", nextUrl);
                var html = "";
                var noResults =
                    '<div class="noResults">We have found no results for your search ' +
                    userInput +
                    "</div>";
                var resultsFor =
                    '<div class="resultsFor">You looked for ' +
                    userInput +
                    "</div>";
                console.log("resultsFor:", resultsFor);
                var more = '<button id="more-button">more</button>';
                for (var i = 0; data.items.length > i; i++) {
                    // console.log("data.items[i].name: ", data.items[i].name);
                    var picture =
                        (data.items[i].images[0] &&
                            data.items[i].images[0].url) ||
                        "https://cdn.freebiesupply.com/logos/large/2x/spotify-2-logo-png-transparent.png";
                    html +=
                        '<div class="results"><img src="' +
                        picture +
                        '">' +
                        data.items[i].name +
                        "</div>";
                }

                if (data.items.length == 0) {
                    $("#results-container").append(noResults);
                } else if (data.items.length >= 1) {
                    $("#results-container").append(resultsFor);
                    $("#results-container").append(html);
                }
                if (data.items.length == 20) {
                    $("#more-container").append(more);
                }
            }
        });
    });
    $(document).on("click", "#more-button", function() {
        var baseUrl = "https://elegant-croissant.glitch.me/spotify";
        $.ajax({
            url: nextUrl,

            success: function(data) {
                console.log("data before split: ", data);
                data = data.albums || data.artists;
                nextUrl =
                    data.next &&
                    data.next.replace(
                        "https://api.spotify.com/v1/search",
                        baseUrl
                    );

                var html = "";

                for (var i = 0; data.items.length > i; i++) {
                    var img =
                        (data.items[i].images[0] &&
                            data.items[i].images[0].url) ||
                        "https://image.flaticon.com/icons/svg/7/7709.svg";

                    html +=
                        '<div class="results"><img src="' +
                        img +
                        '">' +
                        "<span>" +
                        data.items[i].name +
                        "</span></div>";
                }

                $("#results-container").append(html);
            }
        });
    });
    function checkScrolPos() {
        var hasReachedBottom =
            $(window).height() + $(document).scrollTop() >=
            $(document).height() - 100;
        if (hasReachedBottom) {
            console.log(
                "reached bottom:",
                hasReachedBottom,
                $(document).scrollTop() + $(window).height(),
                $(document).height() - 100
            ); //go get more
            callMoreData();
        } else {
            setTimeout(checkScrolPos, 500);
        }
    }

    //Calling ajax call with ENTER

    $("#input").on("keypress", function(e) {
        if (e.which == 13) {
            console.log("enter fired");
            submitInput();
        }
    });

    //Calling ajax call with SUBMIT BUTTON

    $("#submit-button").on("click", function() {
        submitInput();
    });
    //
    //data.total counts how many results we can get;
})();

function checkScrolPos() {
    var hasReachedBottom =
        $(window).height() + $(document).scrollTop() >=
        $(document).height() - 100;
    if (hasReachedBottom) {
        console.log(
            "reached bottom:",
            hasReachedBottom,
            $(document).scrollTop() + $(window).height(),
            $(document).height() - 100
        ); //go get more
        callMoreData();
    } else {
        setTimeout(checkScrolPos, 500);
    }
}

//Calling ajax call with ENTER

$("#input").on("keypress", function(e) {
    if (e.which == 13) {
        console.log("enter fired");
        submitInput();
    }
});

//Calling ajax call with SUBMIT BUTTON

$("#submit-button").on("click", function() {
    submitInput();
});
//
//data.total counts how many results we can get;

// scroll=infinite --> type it into the browser adressline
