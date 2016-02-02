/*(function(module) {
  var reposView = {};
  Portfolio.createTable();

  Portfolio.fetchAll(portfolioView.initIndexPage);
  reposView.index = function() {
    $('main > section').hide();
    $('projects').show();
  };

  module.reposView= reposView;
})(window);
*/

//formerly the repoView below 10:19PM
(function(module) {
  var portfoliosController = {};
  Portfolio.createTable();

  portfoliosController.index = function() {
    $('.clone').hide();
    $('.projects').show();
  };

  module.portfoliosController= portfoliosController;
})(window);
