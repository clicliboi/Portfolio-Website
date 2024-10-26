var popUp = /** @class */ (function () {
    function popUp(element, text, background_color, text_color) {
        this.element = element;
        this.style = element.style;
        this.activated = false;
        this.text = text;
        this.background_color = background_color || '#141414';
        this.text_color = text_color || '#ffffff';
        this.style.backgroundColor = background_color;
        this.style.color = text_color;
        this.element.textContent = this.text;
        this.Disable();
    }
    popUp.prototype.Disable = function () {
        this.activated = false;
        this.style.visibility = 'hidden';
    };
    popUp.prototype.Activate = function (time) {
        var _this = this;
        if (this.activated) {
            console.log('function is already activated');
            return;
        }
        this.activated = !this.activated;
        var time = time || 1500;
        this.style.visibility = 'visible';
        setTimeout(function () {
            _this.Disable();
        }, time);
    };
    return popUp;
}());
export { popUp };
