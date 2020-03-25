(function() {
    document.addEventListener("mousemove", function(dba) {
        var dragBoxAlong = document.getElementById("box1");
        dragBoxAlong.style.left = dba.pageX - 50 + "px";
        dragBoxAlong.style.top = dba.pageY + "px";
    });
})();
