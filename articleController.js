(function(module) {
  var articleController = {};
  Article.createTable();

  Article.fecthAll(articleView.initInxedPage);
  articlesController.index = function() {
    $('main > section').hide();
    $('#articles').show();
  };

  module.articlesController = articlesController;
})(window);
