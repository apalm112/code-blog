(function(module) {
  // constructor function for portfolio projects
  function Portfolio (opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  }

  Portfolio.all = [];

  Portfolio.prototype.toHtml = function() {
    var template = Handlebars.compile($('#portfolio-template').text());
    return template(this);
  };

  Portfolio.handleMainNav = function() {
    $('.main-nav').on('click', '.tab', function(e) {
      $('.tab-links').show();
      $('#' + $(this).data('content')).fadeIn();
    });

    $('.main-nav .tab:first').click();
  };

  Portfolio.loadAll = function(rawData) {
    Portfolio.all = rows.map(function(ele) {
      return new Portfolio(ele);
/*    rawData.forEach(function(ele) {
      Portfolio.all.push(new Portfolio(ele));*/
    });
  };

  Portfolio.serverGrab = function(a) {
    if (localStorage.rawData) {
      Portfolio.loadAll(JSON.parse(localStorage.rawData));
      a();
    } else {
      /*$.getJSON('/data/portfolio.json', function() {
        Portfolio.loadAll(rawData);
        localStorage.rawData = JSON.stringify(rawData);
        a();
      });*/
    }
  };
  /*   attempt for code to check eTags
        serverGrab = function() {
        $.ajax({
          url: '/data/portfolio.json',
          Type: 'GET',
          dataType: 'json',
          success: function(rawData, message, xhr){
            console.log('success');
            Portfolio.loadAll(rawData);
            localStorage.rawData = JSON.stringify(rawData);
            portfolioView.initIndexPage();
            localStorage.savedETag = JSON.stringify(xhr.getResponseHeader('ETag'));
            console.log(localStorage.savedETag);
          },
            error: function(){
              console.log('nope');
            }
          });
      }*/

  Portfolio.fetchAll = function() {
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
            portfolioView.initIndexPage();
            console.log('same tho');
          } else {
            Portfolio.serverGrab();
          }
        }
      });
    } else {
      console.log('fetchAll called');
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
  });  // end hamburger-menu

  module.Portfolio = Portfolio;
})(window);

Portfolio.handleMainNav();
