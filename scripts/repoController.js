(function(module) {
  var portfoliosController = {};

  Portfolio.createTable();

  portfoliosController.index = function(ctx, next) {
   /* $('.clone').hide();   // hides /about page then shows / page
    $('.github').empty();  // empty the <ul> so the repo names don't stack up
    $('.projects').show();*/

    var $about = $('.projects');

    $about.find('ul').empty();
    $about.show().children().hide();
    portfolioView.index(ctx.portfolios);
  };

  portfoliosController.loadById = function (ctx, next) {
    var repoData = function (portfolio) {
      ctx.portfolios = portfolio;
      next();
    };

    Portfolio.findwhere('id', ctx.params.id, repoData);
  };

  // Middleware for loading by author
  portfoliosController.loadByAuthor = function (ctx, next) {
    var authorData = function(portfoliosByAuthor) {
      ctx.portfolios = portfoliosByAuthor;
      next();
    };

    Portfolio.findwhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // Middleware to grab articles w/ category matching
  portfoliosController.loadByCategory = function(ctx, next) {
    var categoryData = function(portfoliosInCategory) {
      ctx.portfolios = portfoliosInCategory;
      next();
    };

    Portfolio.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // Middleware for getting all of the repos
  portfoliosController.loadAll = function(ctx, next) {
    var portfolioData = function(allPortfolios) {
      ctx.portfolios = Portfolio.all;
      next();
    };

    if (Portfolio.all.length) {
      ctx.portfolios = Portfolio.all;
      next();
    } else {
      Portfolio.fetchAll(portfolioData);
    }
  };

  module.portfoliosController= portfoliosController;
})(window);
