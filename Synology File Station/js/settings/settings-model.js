SettingsModel = Backbone.Model.extend({
  initialize: function () {
    var self = this;
    this.on("change", function () {
      console.log("Model changed: " + JSON.stringify(self.attributes));
    });
  },
  defaults: {
    protocol: "http",
    host: "localhost",
    port: 5000,
    username: "admin",
    password: ""
  },
  saveToStorage: function () {
    var self = this;
    chrome.storage.sync.set(self.attributes,
    function () {
      console.log("Saved to storage: " + JSON.stringify(self.attributes));
    });
  }
});