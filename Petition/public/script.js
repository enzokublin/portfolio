var canvas = document.querySelector("#paint");
var ctx = canvas.getContext("2d");

var sketch = document.querySelector("#sketch");
var sketch_style = getComputedStyle(sketch);

var mouse = { x: 0, y: 0 };
var last_mouse = { x: 0, y: 0 };

canvas.addEventListener(
    "mousemove",
    function(e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
    },
    false
);

ctx.lineWidth = 3;
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.strokeStyle = "black";

canvas.addEventListener(
    "mousedown",
    function(e) {
        canvas.addEventListener("mousemove", onPaint, false);
    },
    false
);

canvas.addEventListener(
    "mouseup",
    function() {
        canvas.removeEventListener("mousemove", onPaint, false);
        $("#hid").val(canvas.toDataURL());
    },
    false
);

var onPaint = function() {
    ctx.beginPath();
    ctx.moveTo(last_mouse.x, last_mouse.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.closePath();
    ctx.stroke();
};

const signInput = document.getElementById("sign");
var dataURL;

canvas.addEventListener("mouseup", function(e) {
    painting = false;
    //console.log(painting);

    dataURL = canvas.toDataURL();
    console.log("data", dataURL);
    signInput.value = dataURL;
    console.log("sign", signInput.value);
    // return signatureImg;
});
