SettingsModel = Backbone.Model.extend({
  initialize: function () {
    console.log("Model initialized");
  },
  saveToStorage: function () {
    var self = this;
    chrome.storage.sync.set(self.attributes,
    function () {
      console.log("Saved to storage: " + JSON.stringify(self.attributes));
    });
  }
});