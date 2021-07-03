module.exports = {
  makeInitial: function () {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let text = possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  },
  makeString: function (num) {
    if (typeof num != "number") return undefined;
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < num; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  },
  makeSymbolString: function (num) {
    if (typeof num != "number") return undefined;
    let text = "";
    const possible = "~!@#$%^&*()_+-={}|:<>?";
    for (var i = 0; i < num; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  },
};
