(function(module) {
  var repoView = {};

  var something = function() {
    var $about = $('#about');  //This caches the DOM query

    $about.find('ul').empty();
    $about.show().siblings().hide();
  };

  var render = function(repo) {
    return $('<li>').html('<a href="' + repo.html_url + '">' + repo.full_name + '</a>');
  };

  repoView.index = function() {
    something();

    $('#about ul').append(
      repos.with('forks_count').map(render)
    );
  };

  module.repoView = repoView;
})(window);
