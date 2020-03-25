(function() {
    var randomColour = document.getElementById("bigbox");
    //var randomColour2 = document.getElementsByClassName("smallbox");

    function changeRandomColour() {
        return Math.floor(Math.random() * 256);
    }
    /*function changeRandomColour2() {
        return Math.floor(Math.random() * 256);
    }*/
    randomColour.addEventListener("click", function() {
        console.log(changeRandomColour());
        console.log("click");
        var newColour =
            "rgb(" +
            changeRandomColour() +
            "," +
            changeRandomColour() +
            "," +
            changeRandomColour() +
            ")";
        console.log(newColour);
        event.target.style.backgroundColor = newColour;
    });

    /*randomColour2.addEventListener("click", function() {
        console.log("click");
        var newColour2 = "rgb(" + changeRandomColour2() + "," + changeRandomColour2() + "," + changeRandomColour2()) + ")";
        event.target.style.backgroundColor = anotherColour2;
    });*/
})();
