(function() {
    var playerOne = "player-1";
    var currentPlayer = playerOne;
    var playerTwo = "player-2";
    var marbles = $(".marbles");
    var opponentPlayer = playerTwo;
    var countSelectedMarblesForNextMove = [];
    // var getOpponentMarblesForStrike = [];
    var player1Score = 0;
    var player2Score = 0;
    var selectedMarble;
    var countPlayerOneMarblesOnTheField;
    var marblesSequence;
    var onlyOneMarbleSelected;
    var horizontalLineIsSelected;

    var turnCounter = 0;

    // var countMarblesPlayerOne = $("playerOne").length;
    // var countMarblesPlayerTwo = $("playerTwo").length;

    $(".marbles").click(function(e) {
        var findMarblesAndPlayers = $(e.currentTarget).find(marbles);

        if ($(e.currentTarget).hasClass(currentPlayer)) {
            countSelectedMarblesForNextMove.push($(e.currentTarget));
            console.log("happy count:", countSelectedMarblesForNextMove);
        }

        var checkSequence = function() {
            for (var x = 0; x < countSelectedMarblesForNextMove.length; x++) {
                var pushMarblesDiagonal = parseInt(
                    countSelectedMarblesForNextMove[x].text()
                );

                if (onlyOneMarbleSelected !== true) {
                    if (x == 2 || x == 1) {
                        return;
                    }

                    var moveMarblesDiagonal = parseInt(
                        countSelectedMarblesForNextMove[x + 1].text()
                    );

                    if (pushMarblesDiagonal + 1 === moveMarblesDiagonal) {
                        marblesSequence = true;
                        console.log("happy sequence:", marblesSequence);
                    }
                }
            }
        };

        if (countSelectedMarblesForNextMove.length > 1) {
            if (marblesSequence == true) {
                horizontalLineIsSelected = true;
            }
        }

        if (countSelectedMarblesForNextMove.length > 1) {
            // checkSequence();
            console.log("happy Check:", checkSequence());
        }

        if (
            !$(e.currentTarget).hasClass(playerOne) &&
            !$(e.currentTarget).hasClass(playerTwo) &&
            countSelectedMarblesForNextMove.length == 1
        ) {
            onlyOneMarbleSelected = true;
        }

        turnCounter++;

        if (turnCounter !== 2 && $(e.currentTarget).hasClass(currentPlayer)) {
            console.log("happy turn:", turnCounter);
            return;
        } else if (
            turnCounter !== 3 &&
            $(e.currentTarget).hasClass(currentPlayer)
        ) {
            return;
        } else if (
            turnCounter !== 4 &&
            $(e.currentTarget).hasClass(currentPlayer)
        ) {
            return;
        }

        if (turnCounter == 1) {
            return;
        }

        if (userSelection == currentPlayer) {
            selectedMarble = $(e.currentTarget);
        }

        var rowsLogic = [
            {
                row: [1, 2, 3, 4, 5],
                incrRight: 6,
                incrLeft: 5,
                incrDownRight: 0,
                incrDownLeft: 0
            },

            {
                row: [6, 7, 8, 9, 10, 11],
                incrRight: 7,
                incrLeft: 6,
                incrDownRight: -6,
                incrDownLeft: -5
            },

            {
                row: [12, 13, 14, 15, 16, 17, 18],
                incrRight: 8,
                incrLeft: 7,
                incrDownRight: -7,
                incrDownLeft: -6
            },

            {
                row: [19, 20, 21, 22, 23, 24, 25, 26],
                incrRight: 9,
                incrLeft: 8,
                incrDownRight: -8,
                incrDownLeft: -7
            },

            {
                row: [27, 28, 29, 30, 31, 32, 33, 34, 35],
                incrRight: 9,
                incrLeft: 8,
                incrDownRight: -9,
                incrDownLeft: -8
            },

            {
                row: [36, 37, 38, 39, 40, 41, 42, 43],
                incrRight: 8,
                incrLeft: 7,
                incrDownRight: -9,
                incrDownLeft: -8
            },

            {
                row: [44, 45, 46, 47, 48, 49, 50],
                incrRight: 7,
                incrLeft: 6,
                incrDownRight: -8,
                incrDownLeft: -7
            },

            {
                row: [51, 52, 53, 54, 55, 56],
                incrRight: 6,
                incrLeft: 5,
                incrDownRight: -7,
                incrDownLeft: -6
            },

            {
                row: [57, 58, 59, 60, 61],
                incrRight: 0,
                incrLeft: 0,
                incrDownRight: -6,
                incrDownLeft: -5
            }
        ];

        var edgeCase = [
            1,
            2,
            3,
            4,
            5,
            6,
            11,
            12,
            18,
            19,
            26,
            27,
            35,
            36,
            43,
            44,
            50,
            51,
            56,
            57,
            58,
            59,
            60,
            61
        ];

        var userSelection = parseInt($(e.currentTarget).text());
        var incrementerRight;
        // var incrementerLeft;
        var incrementerDownRight;
        // var incrementerDownLeft;

        for (var i = 0; i < rowsLogic.length; i++) {
            if (rowsLogic[i].row.indexOf(parseInt(userSelection)) !== -1) {
                incrementerRight = rowsLogic[i].incrRight;
                // the incrementer variable tells me on which line the div is at whick I clicked.
                //the userSelection variable tells me the number of the div I clicked on.
                // incrementerLeft = rowsLogic[i].incrLeft;
                incrementerDownRight = rowsLogic[i].incrDownRight;
                // incrementerDownLeft = rowsLogic[i].incrDownLeft;
            }

            console.log("great user:", userSelection);
            if ($("#" + (userSelection + 1)).hasClass(currentPlayer) == true) {
                console.log("happy move left");
                // countSelectedMarblesForNextMove[0].removeClass(currentPlayer);
                $("#" + userSelection).addClass(currentPlayer);
                console.log("great #:", $("#" + userSelection));
            }

            function adjacentMoveCheck() {
                if ($("#" + (userSelection - 1)).hasClass(currentPlayer)) {
                    return true;
                }

                if ($("#" + (userSelection + 1)).hasClass(currentPlayer)) {
                    return true;
                } else {
                    return false;
                }
            }

            let turnNextDoor = adjacentMoveCheck();

            function belowMoveCheck() {
                if (
                    $("#" + (userSelection - incrementerRight + 1)).hasClass(
                        currentPlayer
                    )
                ) {
                    return true;
                }
                if (
                    $("#" + (userSelection - incrementerRight + 2)).hasClass(
                        currentPlayer
                    )
                ) {
                    return true;
                } else {
                    return false;
                }
            }

            let turnDownwards = belowMoveCheck();

            function aboveMoveCheck() {
                if (
                    $("#" + (userSelection - incrementerRight - 1)).hasClass(
                        currentPlayer
                    )
                ) {
                    return true;
                }
                if (
                    $("#" + (userSelection - incrementerRight - 2)).hasClass(
                        currentPlayer
                    )
                ) {
                    return true;
                } else {
                    return false;
                }
            }

            let turnUpwards = aboveMoveCheck();

            // #################################################################
            // #################################################################
            // #################################################################
            function downMoveAboveCheck() {
                if (
                    $(
                        "#" + (userSelection - incrementerDownRight - 1)
                    ).hasClass(currentPlayer)
                ) {
                    return true;
                } else if (
                    $(
                        "#" + (userSelection - incrementerDownRight - 2)
                    ).hasClass(currentPlayer)
                ) {
                    return true;
                } else {
                    return false;
                }
            }

            let turnTop = downMoveAboveCheck();

            function downMoveBelowCheck() {
                if ($("#" + (userSelection - incrementerDownRight) - 1)) {
                    return true;
                } else {
                    return false;
                }
            }

            let turnBottom = downMoveBelowCheck();

            // #################################################################
            // ####### Push opponentPlayer Marbles To The Right ################
            // #################################################################
            var countCurrentPlayerMarblesForPushingRight = function() {
                if (countSelectedMarblesForNextMove.length === 3) {
                    for (
                        var l = 0;
                        l < countSelectedMarblesForNextMove.length;
                        l++
                    ) {
                        countSelectedMarblesForNextMove[l].removeClass(
                            currentPlayer
                        );
                    }

                    for (
                        var m = 0;
                        m < countSelectedMarblesForNextMove.length;
                        m++
                    ) {
                        var threeMarblesPush = parseInt(
                            countSelectedMarblesForNextMove[m].text()
                        );
                        $("#" + (threeMarblesPush + 1)).addClass(currentPlayer);
                        // $("#" + (threeMarblesPush - 1)).addClass(currentPlayer);
                    }

                    var opponentPlayerMarblesText = parseInt(
                        $(e.currentTarget).text()
                    );
                    for (var f = 0; f < edgeCase.length; f++) {
                        if (
                            opponentPlayerMarblesText + 1 ==
                            edgeCase[f]
                            // opponentPlayerMarblesText - 1 == edgeCase[f]
                        ) {
                            $(
                                "#" + (opponentPlayerMarblesText + 1)
                            ).removeClass(opponentPlayer);
                            // $(
                            //     "#" + (opponentPlayerMarblesText - 1)
                            // ).removeClass(opponentPlayer);

                            if (currentPlayer == "player-1") {
                                player1Score++;
                            } else {
                                player2Score++;
                            }
                        }
                    }
                    if (
                        $("#" + (opponentPlayerMarblesText + 1)).hasClass(
                            opponentPlayer
                        )
                    ) {
                        $("#" + (opponentPlayerMarblesText + 2)).addClass(
                            opponentPlayer
                        );
                    }
                    $("#" + (opponentPlayerMarblesText + 1)).addClass(
                        opponentPlayer
                    );
                    $(e.currentTarget).removeClass(opponentPlayer);
                }

                // #############################################################
                // ############### Move One with Two To the Right ##############
                // #############################################################

                if (countSelectedMarblesForNextMove.length === 2) {
                    for (
                        var idx = 0;
                        idx < countSelectedMarblesForNextMove.length;
                        idx++
                    ) {
                        countSelectedMarblesForNextMove[idx].removeClass(
                            currentPlayer
                        );
                    }

                    for (
                        var k = 0;
                        k < countSelectedMarblesForNextMove.length;
                        k++
                    ) {
                        var marbleText = parseInt(
                            countSelectedMarblesForNextMove[k].text()
                        );
                        $("#" + (marbleText + 1)).addClass(currentPlayer);
                    }

                    var opponentPlayerMarblesNum = parseInt(
                        $(e.currentTarget).text()
                    );
                    $("#" + (opponentPlayerMarblesNum + 1)).addClass(
                        opponentPlayer
                    );
                    $(e.currentTarget).removeClass(opponentPlayer);
                }
            };

            if ($(e.currentTarget).hasClass(opponentPlayer)) {
                countCurrentPlayerMarblesForPushingRight();
            }

            // #################################################################
            // #################################################################
            // #################################################################

            if (
                turnNextDoor ||
                turnDownwards ||
                turnUpwards ||
                turnBottom ||
                turnTop
            ) {
                if (horizontalLineIsSelected === true) {
                    for (
                        var j = 0;
                        j < countSelectedMarblesForNextMove.length;
                        j++
                    ) {
                        countSelectedMarblesForNextMove[j].removeClass(
                            currentPlayer
                        );
                    }
                }

                if (marblesSequence == true) {
                    if (countSelectedMarblesForNextMove.length == 1) {
                        $(e.currentTarget).addClass(currentPlayer);
                    } else if (countSelectedMarblesForNextMove.length == 2) {
                        $("#" + (userSelection - 1)).addClass(currentPlayer);
                        $(e.currentTarget).addClass(currentPlayer);
                    } else if (countSelectedMarblesForNextMove.length == 3) {
                        $("#" + (userSelection - 1)).addClass(currentPlayer);
                        $("#" + (userSelection - 2)).addClass(currentPlayer);
                        $(e.currentTarget).addClass(currentPlayer);
                    }
                } else {
                    countSelectedMarblesForNextMove[0].removeClass(
                        currentPlayer
                    );
                    $("#" + userSelection).addClass(currentPlayer);
                }

                countSelectedMarblesForNextMove = [];

                turnCounter = 0;

                switchPlayers();
                seeWhoseTurnItIs();
                switchOpponentPlayers();
                return;
            }
        }

        // #####################################################################
        // #####################################################################
        // #####################################################################

        function switchPlayers() {
            if (currentPlayer == playerOne) {
                currentPlayer = playerTwo;
            } else {
                currentPlayer = playerOne;
            }
        }
    });

    function switchOpponentPlayers() {
        if (opponentPlayer == playerTwo) {
            opponentPlayer = playerOne;
        } else {
            opponentPlayer = playerTwo;
        }
    }

    var seeWhoseTurnItIs = function () {
        var animationName = "animated flip";
        var animationEnd = "animationend";

        if (currentPlayer === playerOne) {
            // $("#player-2-box").removeClass(animationName);
            $("#player-1-box").click(function () {
                $("#player-1-box")
                    .addClass(animationName)
                    .on(animationEnd, function () {
                        console.log("end animation");
                        $("#player-1-box").removeClass(animationName)
                            .off('click');
                    });
            });
        } else if (currentPlayer === playerTwo) {
            $("#player-1-box").removeClass(animationName);
            $("#player-2-box").click(function () {
                console.log("happy current player2:", currentPlayer);
                $("#player-2-box")
                    .addClass(animationName)
                    .on(animationEnd, function () {
                        $("#player-2-box").removeClass(animationName)
                            .off("click");
                    });
            });
        }
    };
    seeWhoseTurnItIs();

    // #########################################################################
    // #############################Rules Container ############################
    // #########################################################################

    $("#abalone-rules").click(function(e) {
        var rulesContainer = `
        <div id="rules-container">
            <h3 id="h3-rules">Rules</h3>
            <p id="top-rule-p">The basic version of the classical board game “Abalone“ is played by two players. Each player has 14 marbles of which maximum 3 can be moved at the same time. Therefore, one move can include 1, 2 or 3 of the own marbles. Within one move
                the marbles can be pushed in all possible directions. </p>
            <p id="middle-rule-p">The ultimate objective of the game is to push 6 of the opponents marbles out of the game. In order to push the opponents marbles the current player must have at least one marble more than his counterpart in the line in which direction he
                wants to move them. </p>
            <p id="bottom-rule-p">
                Meaning 3 marbles can push 2 or 1 while 2 can only move 1 opponent one. Remember, because maximum 3 of the player’s own marbles can be moved at the same time, it’s not possible to push 3 opponent one’s by 4 own
                marbles.
            </p>
        </div>`;

        $("#primary-container").append(rulesContainer);
        e.stopPropagation(e);
        $("#h3-rules").on("click", function() {
            $("#rules-container").remove();
        });
    });

    // #############################################################################
    // ################################# Counting ##################################
    // #############################################################################

    $("#counter-player-I").each(function() {
        var $this = $(this),
            countTo = $this.attr("data-count");

        $({ countNum: $this.text() }).animate(
            {
                countNum: countTo
            },

            {
                duration: 8000,
                easing: "linear",
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            }
        );
    });

    $("#counter-player-II").each(function() {
        var $this = $(this),
            countTo = $this.attr("data-count");

        $({ countNum: $this.text() }).animate(
            {
                countNum: countTo
            },

            {
                duration: 8000,
                easing: "linear",
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            }
        );
    });
})();
