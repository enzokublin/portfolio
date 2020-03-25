(function() {
    var randomColour = document.getElementById("box3");

    function createRandomColour() {
        return Math.floor(Math.random() * 255);
    }

    randomColour.addEventListener("mousedown", function() {
        console.log(createRandomColour());
        console.log("mousedown");
        var anotherColour =
            "rgb(" +
            createRandomColour() +
            "," +
            createRandomColour() +
            "," +
            createRandomColour() +
            ")";
        console.log(anotherColour);
        randomColour.style.backgroundColor = anotherColour;
    });

    randomColour.addEventListener("mouseup", function() {
        console.log("mouseup");
        var anotherColour2 =
            "rgb(" +
            createRandomColour() +
            "," +
            createRandomColour() +
            "," +
            createRandomColour() +
            ")";
        randomColour.style.backgroundColor = anotherColour2;
    });
})();
