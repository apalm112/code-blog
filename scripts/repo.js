(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    var qs = '?per_page=100&sort=updated';

    $.ajax({
      url: 'https://api.github.com/users/apalm112/repos' + '?per_page=5&sort=updated',
      type: 'GET',
      headers: {'Authorization': 'token ' + GITHUB_TOKEN},
      success: function(data, message, xhr) {
        repos.all = data;
        callback();
        console.log('data');
      }
    });
    repos.with = function(attr) {
      return repos.all.filter(function(repo) {
        return repo[attr];
      });
    };
  };

  module.repos = repos;
})(window);
