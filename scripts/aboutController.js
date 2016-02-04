(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    // hides main section elements, then reveals the about section
    $('.projects').hide();
    $('.github').empty();
    $('.clone').show();

    repos.requestRepos(reposView.index);
  };

  module.aboutController = aboutController;
})(window); //module is passed to the window object
