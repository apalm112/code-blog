(function(module) {
  var portfoliosController = {};
  Portfolio.createTable();

  Portfolio.fetchAll(portfolioView.initIndexPage);
  portfoliosController.index = function() {
    $('main > section').hide();
    $('#articles').show();
  };

  module.portfoliosController= portfoliosController;
})(window);
