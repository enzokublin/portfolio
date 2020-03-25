(function() {
    var hl = document.getElementById("headline");
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
        cancleAnimationFrame(animId);
        if (e.target.tagName != "a") {
            return;
        }
        e.target.style.textDecoration = "underline";
        e.target.style.color = "blue";
    });

    hl.addEventListener("mouseout", function(e) {
        if (e.target.tagName != "a") {
            return;
        }
        e.target.style.textDecoration = "none";
        e.target.style.color = "darkgrey";
        moveHeadline();
    });
    /*for (var i = 0; i < links.length; i++) {
        link[i].addEventListener("mouseleave", function(e) {
            e.target.style.color = "blue";
        });
    }*/
    cancleAnimationFrame();
})();
