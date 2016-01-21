(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    repos.requestRepos(repoView.index);
  };

  module.aboutController = aboutController;
})(window); //module is passed to the window object
