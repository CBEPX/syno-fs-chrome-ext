$(function () {
  var model = new ext.synofs.model.SettingsModel();
  var view = new ext.synofs.view.SettingsView({
    model: model,
    el: "#connection"
  });
});