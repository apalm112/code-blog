/*(function(module) {
  var portfoliosController = {};
  Portfolio.createTable();

  Portfolio.fetchAll(portfolioView.initIndexPage);
  portfoliosController.index = function() {
    $('.clone').hide();
    $('.projects').show();
  };

  module.portfoliosController= portfoliosController;
})(window);*/

(function(module) {
  var reposView = {};
  /*Portfolio.createTable();

  Portfolio.fetchAll(portfolioView.initIndexPage);
  reposView.index = function() {
    $('main > section').hide();
    $('projects').show();
  };*/
  var ui = function() {
    var $about = $('#about');

    $about.find('ul').empty();
    $about.show().siblings().hide();

  //  $('.clone').hide();
  //  $('.projects').show();

  };

  var render = function(repo) {
    console.log('render');
    var template = Handlebars.compile($('.projects-template').text());
    return template(repo);
  };

  reposView.index = function() {
    ui();
    console.log('repoViewIndex');
    $('#about ul').append(
      repos.with('forks_count').map(render)
    );
  };


  module.reposView= reposView;
})(window);

