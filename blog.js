// constructor function for projects
function Portfolio (opts) {
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

Portfolio.all = [];

Portfolio.prototype.toHtml = function() {
  var template = Handlebars.compile($('#article-template').text());
  return template(this);
};

Portfolio.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function(e) {
    $('.tab-links').show();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click();
};
Portfolio.handleMainNav();

Portfolio.loadAll = function(rawData) {
  rawData.forEach(function(ele) {
    Portfolio.all.push(new Portfolio(ele));
  });
};


Portfolio.fetchAll = function() {
  if (localStorage.rawData) {
    Portfolio.loadAll(JSON.parse(localStorage.rawData));
    blogView.initIndexPage();
  } else {
    $.getJSON('//file goes here', function(rawData) {
      Portfolio.loadAll(rawData);
      localStorage.rawData = JSON.stringify(rawData);
      portfolioView.initIndexPage();
    });
  }
};

//etag goal here
/*var etagCheck = $.ajax() {
  type: 'HEAD',
  url: '//file goes here',
  dataType: 'json',
  ifModified: true,
  complete: function (XMLHttpRequest, textStatus) {
    var eTag = XMLHttpRequest.getResponseHeader('ETag');
    console.log(eTag);
  }
};*/




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
