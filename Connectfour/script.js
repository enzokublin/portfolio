(function() {
    var currentGamer = "gamer1";
    var column = $(".column");
    var row = $(".row");
    var button = $("button");
    var chips = $(".chips");

    column.on("click", function(e) {
        // console.log(e.currentTarget);
        var chipsInCol = $(e.currentTarget).find(".chips");
        for (var i = 5; i >= 0; i--) {
            if (
                !chipsInCol.eq(i).hasClass("gamer1") &&
                !chipsInCol.eq(i).hasClass("gamer2")
            ) {
                break; //slots = Vertiefungen oder Schlitze.
            } //row = Reihen und columns sind Spalten.
        }
        chipsInCol.eq(i).addClass(currentGamer);
        // checkForVictory(chipsInCol);
        // checkForVictory(chipsInRow);

        if (checkForVictory(chipsInCol)) {
            $("div.box").addClass(".hippoClass");
            $("div.redCoin").addClass("greatClass");
            $("div.yellowCoin").addClass("greatClass");
            $("div.dot1").addClass("greatClass");
            $("div.dot2").addClass("greatClass");
            $("h1").addClass("hippoClass");
            // alert("Your are the champion");
            return true;
        } else {
            var chipsInRow = $(".row" + i + " .chips");
            console.log(chipsInRow);
            if (checkForVictory(chipsInRow)) {
                $("div.box").addClass("hippoClass");
                $("div.redCoin").addClass("greatClass");
                $("div.yellowCoin").addClass("greatClass");
                $("div.dot1").addClass("greatClass");
                $("div.dot2").addClass("greatClass");
                $("h1").addClass("hippoClass");
                // alert("You can just start dancing");
            } else {
                // hier geht man durch alle 24 indexe und checkt ob cornerviseDiscs mit cornervise[index] identisch ist.
                for (var i = 0; i < cornervise.length; i++) {
                    if (checkCornerviseDiscs(cornervise[i])) {
                        // alert("You look awesome");
                        $("div.box").addClass("hippoClass");
                        $("div.redCoin").addClass("greatClass");
                        $("div.yellowCoin").addClass("greatClass");
                        $("div.dot1").addClass("greatClass");
                        $("div.dot2").addClass("greatClass");
                        $("h1").addClass("hippoClass");
                    }
                }
                console.log(i);
            }
        }
        switchGamers();
    });

    var cornervise = [
        [chips.eq(0), chips.eq(7), chips.eq(14), chips.eq(21)],
        [chips.eq(7), chips.eq(14), chips.eq(21), chips.eq(28)],
        [chips.eq(14), chips.eq(21), chips.eq(28), chips.eq(35)],
        //#######################################################
        [chips.eq(1), chips.eq(8), chips.eq(15), chips.eq(22)],
        [chips.eq(8), chips.eq(15), chips.eq(22), chips.eq(29)],
        // ######################################################
        [chips.eq(2), chips.eq(9), chips.eq(16), chips.eq(23)],
        // ######################################################
        [chips.eq(6), chips.eq(13), chips.eq(20), chips.eq(27)],
        [chips.eq(13), chips.eq(20), chips.eq(27), chips.eq(34)],
        [chips.eq(20), chips.eq(27), chips.eq(34), chips.eq(41)],
        // ######################################################
        [chips.eq(12), chips.eq(19), chips.eq(26), chips.eq(33)],
        [chips.eq(19), chips.eq(26), chips.eq(33), chips.eq(40)],
        // ######################################################
        [chips.eq(18), chips.eq(25), chips.eq(32), chips.eq(39)],

        // ####from the left corner at the bottom diagonal upwards#####
        [chips.eq(5), chips.eq(10), chips.eq(15), chips.eq(20)],
        [chips.eq(10), chips.eq(15), chips.eq(20), chips.eq(25)],
        [chips.eq(15), chips.eq(20), chips.eq(25), chips.eq(30)],
        // ######################################################
        [chips.eq(11), chips.eq(16), chips.eq(21), chips.eq(26)],
        [chips.eq(16), chips.eq(21), chips.eq(26), chips.eq(31)],
        [chips.eq(21), chips.eq(26), chips.eq(31), chips.eq(36)],
        // ######################################################
        [chips.eq(17), chips.eq(22), chips.eq(27), chips.eq(32)],
        [chips.eq(22), chips.eq(27), chips.eq(32), chips.eq(37)],
        // ######################################################
        [chips.eq(23), chips.eq(28), chips.eq(33), chips.eq(38)],
        // ######################################################
        [chips.eq(4), chips.eq(9), chips.eq(14), chips.eq(19)],
        [chips.eq(9), chips.eq(14), chips.eq(19), chips.eq(24)],
        // ######################################################
        [chips.eq(3), chips.eq(8), chips.eq(13), chips.eq(18)]
    ];

    //########################################################
    function checkCornerviseDiscs(cornerviseDiscs) {
        if (
            cornerviseDiscs[0].hasClass(currentGamer) &&
            cornerviseDiscs[1].hasClass(currentGamer) &&
            cornerviseDiscs[2].hasClass(currentGamer) &&
            cornerviseDiscs[3].hasClass(currentGamer)
        ) {
            return true;
        }
    }

    function checkForVictory(coin) {
        var counter = 0;
        for (var i = 0; i < coin.length; i++) {
            if (coin.eq(i).hasClass(currentGamer)) {
                counter++;
                if (counter === 4) {
                    $("div.box").addClass("hippoClass");
                    $("div.redCoin").addClass("greatClass");
                    $("div.yellowCoin").addClass("greatClass");
                    $("div.dot1").addClass("greatClass");
                    $("div.dot2").addClass("greatClass");
                    $("h1").addClass("hippoClass");
                    // alert("You look great");
                    return true;
                }
            } else {
                counter = 0;
            }
        }
    }

    function switchGamers() {
        if (currentGamer == "gamer1") {
            currentGamer = "gamer2";
        } else {
            currentGamer = "gamer1";
        }
    }

    // ###############################################################
    // ################ Button Function ##############################
    // ###############################################################

    $("button").click(function() {
        $("div.chips").removeClass("gamer1 gamer2");
        // $("div.redCoin").addClass("greatClass");
        // $("div.yellowCoin").addClass("greatClass");
        // $("div.dot1").addClass("greatClass");
        // $("div.dot2").addClass("greatClass");
        // $("h1").addClass("hippoClass");
    });
})();
