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

/*DAY 2
As the creator, I want the Home and About nav links to act as tabs, so my story is revealed FAST.
Add tabs for navigation */
$('.tabs .tab-links a').on('click', function(e) {
    var currentAttrValue = $(this).attr('href');

    // Show/hide tabs
    $('.tabs ' + currentAttrValue).show().siblings().hide();

    //change/remove current tab to active
    $(this).parent('li').addClass('active').siblings().removeClass('active');

});


/* As a reader, I want the portfolio to use a nice color scheme, so that it stands out visually.*/
