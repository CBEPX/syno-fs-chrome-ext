var ext = ext || {};
ext.synofs = ext.synofs || {};
ext.synofs.view = ext.synofs.view || {};

ext.synofs.view.SettingsView = Backbone.View.extend({
  isSaved: true,
  initialize: function () {
    var self = this;
    self.listenTo(this.model, "fetched", self.render);
    self.listenTo(this.model, "synced", self.synced);
    self.listenTo(self.model, "test-start", self.testStart);
    self.listenTo(self.model, "test-done", self.testDone);
  },
  events: {
    "click #button-test": "test",
    "click #button-save": "save",
    "input :input": "changed",
    "click input:radio": "changed"
  },
  render: function () {
    this.$el.find("#connection-protocol-" + this.model.get("protocol")).prop("checked", true);
    this.$el.find("#connection-host").val(this.model.get("host"));
    this.$el.find("#connection-port").val(this.model.get("port"));
    this.$el.find("#connection-username").val(this.model.get("username"));
    this.$el.find("#connection-password").val(this.model.get("password"));
    return this;
  },
  test: function (e) {
    this.model.testConnection();
  },
  save: function (e) {
    this.model.sync();
  },
  changed: function (e) {
    var target = $(e.target);
    if (this.isSaved && (!target.attr("type") == "radio" || target.val() != this.model.get(target.attr("name")))) {
      var btn = this.$el.find("#button-save");
      btn.removeClass("btn-success")
        .addClass("btn-primary")
        .html('<span class="glyphicon glyphicon-floppy-disk"></span>')
        .append(" Save")
        .prop("disabled", false);
      this.isSaved = false;
    }
    this.model.set(target.attr("name"), target.val());
  },
  synced: function () {
    var self = this;
    self.isSaved = true;
    var btn = self.$el.find("#button-save");
      btn.removeClass("btn-primary")
      .addClass("btn-success")
      .html($('<span class="glyphicon glyphicon-floppy-saved"></span>'))
      .append(' Saved')
      .prop("disabled", true);
  },
  testStart: function () {
    var self = this;
    var btn = self.$el.find("#button-test");
    var span = btn.find("span");
    span.append(new Spinner({lines: 17, length: 0, width: 2, radius: 9, corners: 0, trail: 50, speed: 2, className: "spinner"}).spin().el);
    btn.prop("disabled", true);
  },
  testDone: function (data) {
    var self = this;
    var btn = self.$el.find("#button-test");
    var messages = self.$el.find("#messages");
    var alert = $('<div class="alert alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button></div>');
    if (data.success) {
      alert.addClass("alert-success");
      alert.append("Connection successful!");
      messages.html(alert);
    }
    else {
      alert.addClass("alert-danger");
      alert.append("Connection unsuccessful!");
      messages.html(alert);
    }
    btn.find(".spinner").remove();
    btn.prop("disabled", false);
  }
});