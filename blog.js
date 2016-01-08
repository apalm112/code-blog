// constructor function for projects
function Portfolio (opts) {
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

Portfolio.prototype.toHtml = function() {
  var $newPortfolio = $('portfolio.template').clone();
  $newPortfolio.removeClass('template');
  if (!this.publishedOn) {
    $newPortfolio.addClass('draft');
  }

  $newPortfolio.attr('data-category', this.category);
  $newPortfolio.attr('data-author', this.author);

  $newPortfolio.find('byline a').html(this.author);
  $newPortfolio.find('.byline a').attr('href', this.url);
  $newPortfolio.find('h1:first').html(this.title);
  $newPortfolio.find('.article-body').html(this.body);
  $newPortfolio.find('time[pubdate]').attr('datetime', this.publishedOn);
  $newPortfolio.find('time[pubdate]').attr('datetime', this.publishedOn);
  $newPortfolio.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newPortfolio.append('<hr>');
  return $newPortfolio;
};

blogArticles.sort(function(a, b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

blogArticles.forEach(function(ele) {
  articles.push(new Portfolio(ele));
});

articles.forEach(function(a) {
  $('#articles').append(a.toHtml());
});

/*Portfolio.prototype.append($newPortfolio);
Portfolio.prototype.hideView();

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
*/


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
