var _parallaxElems = [];

Scene.on("destroy.internal", function (e) {
    Scene.removeParallax(e.reset);
});

/**
 * Define a parallax while the scene is active.
 */
this.setParallax = function(element, params) {
    var elems = _util.get.elements(element);
    if (elems.length === 0) {
        log(1, "ERROR calling method 'setParallax()': Invalid element supplied.");
        return Scene;
    }
    if (_parallaxElems.length > 0) {
        // remove old ones
        Scene.removeParallax();
    }
    _parallaxElems = elems;
    params = params || {};
    var speed = params.speed || 0.5;
    Scene.on("update.internal_parallax", function(e) {
        if (e.scrollPos >= e.startPos) {
            var distance = (e.scrollPos - e.startPos) * speed;
            _parallaxElems.forEach(function (elem, key) {
                _util.css(elem, {
                    transform: "translateY("+distance+"px)"
                });
            });
        }
    });
    return Scene;
};

/**
 * Remove the parallax from the scene.
 */
this.removeParallax = function(reset) {
    if (reset) {
        _parallaxElems.forEach(function (elem, key) {
            _util.css(elem, {
                transform: ""
            });
        });
    }
    Scene.off("update.internal_parallax");
    return Scene;
};