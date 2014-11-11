$(function () {
  var model = new SettingsModel();
  var view = new SettingsView({
    model: model,
    el: "#form-settings"
  });
  view.render();
});