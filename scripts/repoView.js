(function(module) {
  var articlesController = {};
  Article.createTable();

  Article.fetchAll(articleView.initIndexPage);
  articlesController.index = function() {
    $('main > section').hide();
    $('#articles').show();
  };

  module.articlesController= articlesController;
})(window);
