var popupStorage = new Map();
var popUp = /** @class */ (function () {
    function popUp(element, styles) {
        popupStorage.set(element, this);
        this.element = element;
        this.style = element.style;
        ConvertCssStyle(this.element, styles);
        this.activated = false;
        this.Disable();
    }
    popUp.prototype.Disable = function () {
        this.activated = false;
        this.style.visibility = 'hidden';
    };
    popUp.prototype.Activate = function (time) {
        var _this = this;
        if (this.activated) {
            return;
        }
        this.activated = !this.activated;
        var time = time || 1;
        this.style.visibility = 'visible';
        setTimeout(function () {
            _this.Disable();
        }, time);
    };
    return popUp;
}());
export { popUp };
var tooltip = /** @class */ (function () {
    function tooltip(hoverElement, element, styles) {
        this.hoverElement = hoverElement;
        this.activated = false;
        this.element = element;
        this.style = element.style;
        this.style.pointerEvents = 'none';
        ConvertCssStyle(this.element, styles);
        this.update = this.update.bind(this);
        this.follow = this.follow.bind(this);
        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
        this.update(0, 0);
        this.hide();
        this.__listener__();
    }
    tooltip.prototype.update = function (X, Y) {
        this.vector = { x: X, y: Y };
    };
    tooltip.prototype.follow = function (event) {
        if (!this.activated) {
            document.removeEventListener('mousemove', this.follow);
            return;
        }
        this.update(event.clientX, event.clientY);
        var width = Number(this.style.width.replace(/\D+/, ''));
        var height = Number(this.style.height.replace(/\D+/, ''));
        this.style.left = "".concat(this.vector.x + (-width + 5), "px");
        this.style.top = "".concat(this.vector.y + (-height + 5), "px");
    };
    tooltip.prototype.show = function () {
        if (this.activated) {
            return;
        }
        this.activated = true;
        this.style.visibility = 'visible';
        document.addEventListener('mousemove', this.follow);
    };
    tooltip.prototype.hide = function () {
        this.activated = false;
        this.style.visibility = 'hidden';
        document.removeEventListener('mousemove', this.follow);
    };
    tooltip.prototype.__listener__ = function () {
        this.hoverElement.addEventListener('mouseenter', this.show);
        this.hoverElement.addEventListener('mouseleave', this.hide);
    };
    return tooltip;
}());
export { tooltip };
export function ConvertCssStyle(element, styles) {
    for (var property in styles) {
        var value = styles[property];
        if (property in element) {
            element[property] = value;
        }
        else {
            element.style[property] = value;
        }
    }
}
export function copyToClipboard(element, textToCopy) {
    var popup = popupStorage.get(element) || popupStorage.set(element, new popUp(element, { content: textToCopy })).get(element);
    popup.Activate(1000);
    navigator.clipboard.writeText(textToCopy);
}
window['copyToClipboard'] = copyToClipboard;
