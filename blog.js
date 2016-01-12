// constructor function for projects
function Portfolio (opts) {
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

Portfolio.prototype.toHtml = function(a) {
  var source = $('#template').html();
  var template = Handlebars.compile(source);
  var html = template(a);
  return html;
};


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

Portfolio.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function(e) {
    $('.tab-links').show();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click();
};

Portfolio.handleMainNav();


// hamburger-menu code goes here
var isActive = false;

$('.js-menu').on('click', function() {
  if (isActive) {
    $(this).removeClass('active');
    $('body').removeClass('menu-open');
  } else {
    $(this).addClass('active');
    $('body').addClass('menu-open');
  }

  isActive =! isActive;
});
