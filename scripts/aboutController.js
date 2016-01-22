(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    repos.requestRepos(repoView.index);
    // hides main section elements, then reveals the about section
    $('main > section').hide();
    $('#about').show();
  };

  module.aboutController = aboutController;
})(window); //module is passed to the window object
