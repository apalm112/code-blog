// Array for future portfolio objects
var portfolioArticles = [];


// constructor function for projects
function Portfolio (info) {
  $(this).author = info(author);
}

Portfolio.prototype.toHtml = function() {
  var $newPortfolio = $('portfolio.template').clone();

  $newPortfolio.data('category', this.category);
  $newPortfolio.data('name', this.name);
  $newPortfolio.data('url', this.url);
  $newPortfolio.data('title', this.title);
  $newPortfolio.data('body', this.body);
  $newPortfolio.data('time', this.time);
  
};
