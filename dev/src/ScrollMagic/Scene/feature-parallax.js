var _parallaxElems = [],
    _resetParallax = function() {
        _parallaxElems.forEach(function (elem, key) {
            _util.css(elem, {
                "-ms-transform": "",
                "-webkit-transform": "",
                transform: ""
            });
        });
    };

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
    Scene
        .on("update.internal_parallax", function (e) {
            if (e.scrollPos >= e.endPos) {
                setY(e.endPos - e.startPos);
            }
            else if (e.scrollPos >= e.startPos) {
                setY(e.scrollPos - e.startPos);
            }

            function setY(value) {
                var distance = value * speed;
                _parallaxElems.forEach(function (elem, key) {
                    _util.css(elem, {
                        "-ms-transform": "translateY(" + distance + "px)",
                        "-webkit-transform": "translateY(" + distance + "px)",
                        transform: "translateY(" + distance + "px)"
                    });
                });
            }
        })
        .on("leave.internal_parallax", function(e) {
            if (e.state == SCENE_STATE_BEFORE) {
                _resetParallax();
            }
        });
    return Scene;
};

/**
 * Remove the parallax from the scene.
 */
this.removeParallax = function(reset) {
    if (reset) {
        _resetParallax();
    }
    Scene.off("update.internal_parallax");
    return Scene;
};