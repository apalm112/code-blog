// constructor function for projects
function Portfolio (opts) {
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
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

Portfolio.serverGrab = function(a) {
  if (localStorage.rawData) {
    Portfolio.loadAll(JSON.parse(localStorage.rawData));
    a();
  } else {
    $.getJSON('/data/portfolio.json', function() {
      Portfolio.loadAll(rawData);
      localStorage.rawData = JSON.stringify(rawData);
      a();
    });
  }
};
    serverGrab = function() {
      $.ajax({
        url: '/data/portfolio.json',
        Type: 'GET',
        dataType: 'json',
        success: function(rawData, message, xhr){
          console.log('success');
          Portfolio.loadAll(rawData);
          localStorage.rawData = JSON.stringify(rawData);
          blogView.initIndexPage();
          localStorage.savedETag = JSON.stringify(xhr.getResponseHeader('ETag'));
          console.log(localStorage.savedETag);
        },
          error: function(){
            console.log('nope');
          }
        });
    }


article.fetchAll = function() {
  if (localStorage.rawData) {

    $.ajax({
      url: '/data/portfolio.json',
      Type: 'HEAD',
      success: function(data, message, xhr) {
        var getETag = xhr.getResponseHeader('ETag');
        console.log(getETag);
        console.log(JSON.parse(localStorage.savedETag));
        if(getETag === JSON.parse(localStorage.savedETag)){
          console.log('same tho');
          Portfolio.loadAll(JSON.parse(localStorage.rawData));
          blogView.initIndexPage();
          console.log('same tho');
        } else {
          Portfolio.serverGrab();
        }
      }
    });

  } else {
    console.log('you are in line 69');
    Portfolio.serverGrab();
  }
};





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
