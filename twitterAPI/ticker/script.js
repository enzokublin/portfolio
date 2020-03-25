(function() {
    $.ajax({
        url: "/data.json",
        success: function(payload) {
            console.log(payload);
            var html = "";

            payload.forEach(function(item) {
                html += '<a href =">' + item.href + '">' + item.text + "</a>";
                console.log(html);
            });
            $("#headlines").append(html);
            runWhenHtmlIsReady();
        }
    });
})();

function runWhenHtmlIsReady() {
    var hl = document.getElementById("headlines");
    var a = hl.getElementsByTagName("a");
    var left = hl.offsetLeft;
    var animId;
    //console.log(left);
    //var ct = 0;
    function moveHeadline() {
        left--;

        if (left < -a[0].offsetWidth) {
            left += a[0].offsetWidth;
            hl.appendChild(a[0]);
        }
        hl.style.left = left + "px";
        animId = requestAnimationFrame(moveHeadline);
    }
    moveHeadline();

    hl.addEventListener("mouseover", function(e) {
        cancelAnimationFrame(animId);
        if (e.target.tagName != "a") {
            return;
        }
        e.target.style.textDecoration = "underline";
        e.target.style.color = "blue";
    });

    hl.addEventListener("mouseout", function(e) {
        moveHeadline();
        if (e.target.tagName != "a") {
            return;
        }
        e.target.style.textDecoration = "none";
        e.target.style.color = "darkgrey";
    });

    // cancelAnimationFrame();
}
