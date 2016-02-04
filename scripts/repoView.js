(function(module) {
  var reposView = {};

  var ul = function() {
    var $about = $('.github');

    $about.find('ul').empty();
    $about.show().siblings().hide();
  };

  var render = function(repo) {
    var template = Handlebars.compile($('#projects-template').text());
    console.log('render the github repos');
    return template(repo);
  };

  reposView.index = function() {
    ul();
    $('.github').append(
      repos.with('name').map(render)
    );
  };

  module.reposView= reposView;
})(window);

