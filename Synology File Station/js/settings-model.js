var ext = ext || {};
ext.synofs = ext.synofs || {};
ext.synofs.model = ext.synofs.model || {};

ext.synofs.model.SettingsModel = Backbone.Model.extend({
  _testPath:
    "/webapi/query.cgi?api=SYNO.API.Info&version=1&method=query&query=SYNO.API.Auth,SYNO.FileStation",
  _sharedPath:
    "/webapi/FileStation/file_share.cgi?api=SYNO.FileStation.List&version=1&method=list_share",
  initialize: function () {

  },
  sync: function () {
    var self = this;
    chrome.storage.sync.set({
      protocol: self.get("protocol"),
      host: self.get("host"),
      port: self.get("port"),
      username: self.get("username"),
      password: self.get("password")
    },
    function () {
      self.trigger("synced");
    });
  },
  fetch: function () {
    var self = this;
    chrome.storage.sync.get({protocol: "http", host: "", port: 5000, username: "", password: ""}, function (result) {
      self.set("protocol", result.protocol);
      self.set("host", result.host);
      self.set("port", result.port);
      self.set("username", result.username);
      self.set("password", result.password);
      self.trigger("fetched");
    });
  },
  testConnection: function () {
    var self = this;
    self.trigger("test-start");
    var url = self._getBaseURL() + self._testPath;
    $.ajax(url, {
      dataType: "json",
      timeout: 20000
    })
    .done(function (data) {
      self.trigger("test-done", data);
    })
    .fail(function (jqxhr, textStatus, error) {
      self.trigger("test-done", { success: false, error: textStatus });
    });
  },
  _getBaseURL: function () {
    return this.get("protocol") + "://" + this.get("host") + ":" + this.get("port");
  }
});