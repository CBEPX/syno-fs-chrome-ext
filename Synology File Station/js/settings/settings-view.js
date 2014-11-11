SettingsView = Backbone.View.extend({
  initialize: function () {
    console.log("View created");
  },
  events: {
    "click #button-test": "settingsTest",
    "click #button-save": "settingsSave"
  },
  render: function () {
    console.log("Rendering view");
    this.$el.find("#connection-protocol-" + this.model.get("protocol")).prop("checked", true);
    this.$el.find("#connection-host").val(this.model.get("host"));
    this.$el.find("#connection-port").val(this.model.get("port"));
    this.$el.find("#connection-username").val(this.model.get("username"));
    this.$el.find("#connection-password").val(this.model.get("password"));
    return this;
  },
  settingsTest: function (e) {
    console.log("Testing settings");
  },
  settingsSave: function (e) {
    this.model.set("protocol", this.$el.find("input[name=protocol]:checked").val());
    this.model.set("host", this.$el.find("#connection-host").val());
    this.model.set("port", parseInt(this.$el.find("#connection-port").val()));
    this.model.set("username", this.$el.find("#connection-username").val());
    this.model.set("password", this.$el.find("#connection-password").val());

    this.model.saveToStorage();
  }
});