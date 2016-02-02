(function(module) {
  var portfoliosController = {};
  Portfolio.createTable();

  Portfolio.fetchAll(portfolioView.initIndexPage);
  portfoliosController.index = function() {
    $('.clone').hide();
    $('.projects').show();
  };

  module.portfoliosController= portfoliosController;
})(window);
