var bar = $("#bar");
var picContainer = $("#pic-container");
var topPic = $("#top");
var bottomPic = $("#bottom");

bar.on("mousedown", function(e) {
    console.log("working");
    picContainer.on("mousemove", function(e) {
        console.log(e.offsetX);
        if (e.target.id == "bar") {
            return;
        }
        bar.css({
            left: e.offsetX
        });
        topPic.css({
            width: e.offsetX + "px"
        });
        console.log("mosemove");
    });
});
