// 判断是否为移动端
if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) ||
    /Android|iPhone|Windows Phone|webOS|iPod|BlackBerry/i.test(navigator.userAgent)) {
    window.location.href = "dist/m/views/index.html";
}