var Site = /** @class */ (function () {
    function Site() {
    }
    Site.prototype.name = function () {
        console.log("frank");
    };
    return Site;
}());
var obj = new (Site);
obj.name();
