// rem大小适配
!(function (doc, win) {
    var docEle = doc.documentElement,
        evt = 'onorientationchange' in window ? 'orientationchange' : 'resize',
        fn = function () {
            var width = docEle.clientWidth;
            if (width > 750) {
                width && (docEle.style.fontSize = 75 + 'px');
            } else {
                width && (docEle.style.fontSize = 75 * (width / 750) + 'px');
            }
        };
    fn();
    win.addEventListener(evt, fn, false);
    doc.addEventListener('DOMContentLoaded', fn, false);
}(document, window));