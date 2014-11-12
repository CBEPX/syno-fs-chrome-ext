var ext = ext || {};
ext.synofs = ext.synofs || {};
ext.synofs.view = ext.synofs.view || {};

ext.synofs.view.SettingsView = Backbone.View.extend({
  isSaved: false,
  initialize: function () {
    var self = this;
    self.listenTo(this.model, "loaded", function () {
      self.render();
    });
    self.listenTo(this.model, "saved", function () {
      self.isSaved = true;
      var btn = self.$el.find("#button-save");
        btn.data("old", btn.clone());
        btn.removeClass("btn-primary")
        .addClass("btn-success")
        .html($('<span class="glyphicon glyphicon-ok"></span>'))
        .append(' Saved')
        .prop("disabled", true);
    });
    self.listenTo(self.model, "test-start", function () {
      var btn = self.$el.find("#button-test");
      var span = btn.find("span");
      span.append(new Spinner({lines: 17, length: 0, width: 2, radius: 8, corners: 0, trail: 50, speed: 2, className: "spinner"}).spin().el);
      btn.prop("disabled", true);
    });
    self.listenTo(self.model, "test-done", function (data) {
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
    });
  },
  events: {
    "click #button-test": "test",
    "click #button-save": "save",
    "input :input": "changed",
    "click :radio": "changed"
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
    this.model.saveToStorage();
  },
  changed: function (e) {
    if (this.isSaved) {
      var btn = this.$el.find("#button-save");
      var old = btn.data("old");
      btn.replaceWith(old);
    }
    this.isSaved = false;
    var target = $(e.target);
    this.model.set(target.attr("name"), target.val());
  }
});