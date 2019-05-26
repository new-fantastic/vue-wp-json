export default (function (link) {
    // External rules
    // Starts with http/https
    // Starts with //*.\.*.
    return link.indexOf('http') === 0; //|| /\/\/*.\.*./.test(link)
});
//# sourceMappingURL=IsLinkExternal.js.map