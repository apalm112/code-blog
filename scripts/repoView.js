(function(module) {
  var reposView = {};

  var ui = function() {
    var $about = $('.github');

    $about.find('ul').empty();
    $about.show().siblings().hide();

  //  $('.clone').hide();
  //  $('.projects').show();

  };

  var render = function(repo) {
    var template = Handlebars.compile($('#projects-template').text());
    return template(repo);
    console.log('render the github repos');
  };

  reposView.index = function() {
    ui();
    $('.github').append(
      repos.with('forks_count').map(render)
    );
    console.log('repoViewIndex render is here');
  };

  module.reposView= reposView;
})(window);

