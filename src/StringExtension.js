String.prototype.firstLetterToUpper = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.sanitize = function () {
    return this.replace("-", " ").replace("_", "");
}