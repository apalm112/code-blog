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

  Portfolio.prototype.insertRecord = function(callback) {
    webDB.excute(
      [
        {
          'sql': 'INSERT INTO portfolios (title, author, authorUrl, category, body) VALUES (?, ?, ?, ?, ?);',
          'data': [this.title, this.author, this.authorUrl, this.category, this.body],
        }
      ],
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

  Portfolio.allAuthors = function() {
    return Article.all.map(function(porfolio) {
      return portfolio.author;
     })
     .reduce(function(names, name) {
       if (names.indexOf(name) === -1) {
         names.push(name);
       }
       return names;
     }, []);
   };

   // DONE: Example of async, SQL-based approach to getting unique data
   Portfolio.allCategories = function(callback) {
     webDB.execute('SELECT DISTINCT category FROM articles;', callback);
   };

   Portfolio.numWordsAll = function() {
     return Article.all.map(function(portfolio) {
       return portfolio.body.match(/\b\w+/g).length;
     })
     .reduce(function(a, b) {
      return a + b;
    });
   };

  Portfolio.serverGrab = function(a) {
    if (localStorage.rawData) {
      Portfolio.loadAll(JSON.parse(localStorage.rawData));
      a();
    } else {
      $.getJSON('data/portfolio.json', function() {
        Portfolio.loadAll(rawData);
        localStorage.rawData = JSON.stringify(rawData);
        a();
      });
    }
  };

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
  Portfolio.allCategories = function(callback) {
    webDB.execute('SELECT DISTINCT category FROM portfolios;', callback);
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
