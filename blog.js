// constructor function for projects
function Portfolio (info) {
  this.author = info.author;
  this.authorUrl = info.authorUrl;
  this.title = info.title;
  this.category = info.category;
  this.body = info.body;
  this.publishedOn = opts.publishedOn;
}

Portfolio.prototype.toHtml = function() {
  var $newPortfolio = $('portfolio.template').clone();

  $newPortfolio.data('data-category', this.category);
  $newPortfolio.data('name', this.name);
  $newPortfolio.data('url', this.url);
  $newPortfolio.data('title', this.title);
  $newPortfolio.data('body', this.body);
  $newPortfolio.data('time', this.time);

  $newPortfolio.removeClass('template');

  Portfolio.prototype.append($newPortfolio);
  Portfolio.prototype.hideView();
};

Portfolio.prototype.append = function (obj){
  $('#blogArticles').append(obj);
};

Portfolio.prototype.hideView = function () {
  $('portfolio.template').hide();
};

articles.forEach(function(obj){
  blog = new Portfolio(obj);
  blog.toHtml();
});



/*DAY 2
As the creator, I want the Home and About nav links to act as tabs, so my story is revealed FAST.
Add tabs for navigation */
/*$(document).ready(function() {
  $('.tabs .tab-links a').on('click', function(e) {
    var currentAttrValue = $(this).attr('href');

    // Show/hide tabs
    $('.tabs ' + currentAttrValue).show().siblings().hide();

    //change/remove current tab to active
    $(this).parent('li').addClass('active').siblings().removeClass('active');
    e.preventDefault();
  });
});*/
