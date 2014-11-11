$(function () {
  chrome.storage.sync.get(function (result) {
    var model = new SettingsModel(result);
    var view = new SettingsView({
      model: model,
      el: "#form-settings"
    });
    view.render();
  });
});