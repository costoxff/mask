var url = location.href;
var x, y, z = 5, t = 0, s;
var showimg = "", hideimg = "";

if (url.indexOf("?:") != -1) {
    var ary = url.split("?:")[1].split("!:");
    showimg = ary[0];
    hideimg = ary[1];
    url = url.split("?:")[0];
}

var meta = document.createElement("meta");
meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0";
meta.name = "viewport";

onload = function () {
    document.head.appendChild(meta);
    document.body.style.backgroundColor = "black";
    document.body.style.overflow = "hidden";
    document.getElementById("mask").style.clipPath = "circle(0)";
    document.getElementById("show").style.backgroundImage = "url('" + showimg + "')";
    document.getElementById("hide").style.backgroundImage = "url('" + hideimg + "')";
}

onmousemove = function (e) {
    x = e.clientX;
    y = e.clientY;
    maskpst();
}

ontouchmove = function (e) {
    if (e.targetTouches.length == 1) {
        x = e.targetTouches[0].pageX;
        y = e.targetTouches[0].pageY;
        z = 5; maskpst();
    }
    if (e.targetTouches.length == 2) {
        x = e.targetTouches[0].pageX;
        y = e.targetTouches[0].pageY;
        z = 10; maskpst();
    }
}

onmousedown = function (e) {
    if (e.button == 0) z = 10; maskpst();
}

onmouseup = function (e) {
    if (e.button == 0) z = 5; maskpst();
    if (e.button == 2) {
        if (t == 0) setInterval(function () { if (t < 4) t++ }, 100);
        else {
            if (t > 0 && t <= 3) link();
            t = 0;
        }
    }
}

oncontextmenu = function () {
    return false;
}

function maskpst() {
    document.getElementById("mask").style.clipPath = "circle(" + z + "% at " + x + "px " + y + "px)";
}

function link() {
    if (confirm("編輯圖片網址？") == true) {
        var showurl = prompt("顯示上層的圖片網址", showimg)
        showurl != "" && showurl != null ? showimg = showurl : showurl;
        var hideurl = prompt("隱藏下層的圖片網址", hideimg)
        hideurl != "" && hideurl != null ? hideimg = hideurl : hideurl;

        location.href = url + "?:" + showimg + "!:" + hideimg;
    }
}

function getUrl() {
    const upperImageUrl = document.getElementById("upper").value
    const lowerImageUrl = document.getElementById("lower").value

    location.href = url + "?:" + upperImageUrl + "!:" + lowerImageUrl;
}