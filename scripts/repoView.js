(function(module) {
  var articlesController = {};
  Portfolio.createTable();

  Portfolio.fetchAll(articleView.initIndexPage);
  articlesController.index = function() {
    $('main > section').hide();
    $('#articles').show();
  };

  module.articlesController= articlesController;
})(window);
