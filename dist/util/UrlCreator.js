var UrlCreator = /** @class */ (function () {
    function UrlCreator(base, parts) {
        if (base) {
            this.base = base;
        }
        if (parts && Array.isArray(parts)) {
            this.parts = parts;
        }
    }
    Object.defineProperty(UrlCreator.prototype, "baseUrl", {
        set: function (value) {
            this.base = this.withSlash(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UrlCreator.prototype, "url", {
        get: function () {
            if (this.parts.length >= 1 && this.parts[0].substr(0, 1) === '/' && this.base.substr(-1) === '/') {
                return this.base.substr(0, this.base.length - 1) + this.parts.join('');
            }
            return this.base + this.parts.join('');
        },
        enumerable: true,
        configurable: true
    });
    UrlCreator.prototype.addAfterBase = function (value) {
        this.parts.unshift(this.withSlash(value));
    };
    UrlCreator.prototype.addAtTheEnd = function (value) {
        this.parts.push(this.withSlash(value));
    };
    UrlCreator.prototype.removeFromTheEnd = function () {
        this.parts = this.parts.slice(0, this.parts.length - 1);
    };
    UrlCreator.prototype.withSlash = function (value) {
        var tmp = value;
        if (value.substr(-1) === '/') {
            tmp = value.substr(0, value.length - 1);
        }
        if (value.substr(0, 1) !== '/') {
            tmp = '/' + tmp;
        }
        return tmp;
    };
    return UrlCreator;
}());
export { UrlCreator };
//# sourceMappingURL=UrlCreator.js.map