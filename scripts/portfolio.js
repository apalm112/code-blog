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
    this.body = marked(this.body);
    return template(this);
  };

  Portfolio.createTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS portfolios (' + 'id INTEGER PRIMARY KEY, ' + 'author VARCHAR(255) NOT NULL, ' + 'body TEXT NOT NULL);',
      function(result) {
        console.log('Table is set up', result);
        if(callback) callback();
      }
    );
  };

  Portfolio.truncateTable = function(callback){
    webDB.execute(
      'DELETE FROM portfolios;',
      callback
    );
  };

  Portfolio.loadAll = function(rows) {
    Portfolio.all = rows.map(function(ele) {
      return new Portfolio(ele);
    });
  };

  Portfolio.fetchAll = function(next) {
    webDB.execute('SELECT * FROM portfolios ORDER BY author', function(rows) {
        if (rows.length) {
          Portfolio.loadAll(rows);
          next();
        } else {
          $.getJSON('/data/portfolio.json', function(rawData) {
              rawData.forEach(function(item) {
                var portfolio = new Portfolio(item);
                portfolio.insesrtRecord();
              });
              webDB.execute('SELECT * FROM portfolios', function(rows) {
                Portfolio.loadAll(rows);
                next();
              });
          });
        }
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
