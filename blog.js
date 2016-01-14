var blog = [];

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
