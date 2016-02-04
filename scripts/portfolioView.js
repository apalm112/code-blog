(function(module) {

  // create a view object, to hold functions
  var portfolioView = {};

  var render = function(portfolio) {
    var template = Handlebars.compile($('#portfolio-template').text());
    return template(portfolio);
  };

  // stretch goal for class-14 middleware
  portfolioView.populateFilters = function() {
    var options,
      template = Handlebars.compile($('#options-template').text());

    //asynchronous approach
    Portfolio.allCategories(function(rows) {
      if ($('#category-filter option').length < 2) {
        $('#category-filter').append(
          rows.map(function(row) {
            return template({val: row.category});
          })
        );
      };
    });
  };

  //combine filter functions into one event handler
  portfolioView.handleFilters = function() {
    $('#filters').one('change', 'select', function() {
      resource = this.id.replace('-filter', '');
      page('/' + $(this).val().replace(/\W+/g, '+'));
    });
  };

  portfolioView.initNewPortfolioPage = function() {
    $('#portfolios').show().siblings().hide();

    $('#export-field').hide();
    $('#portfolio-json').on('focus', function() {
      this.select();
    });

    $('#new-form').on('change', 'input, textarea', portfolioView.create);
  };

  portfolioView.create = function() {
    var portfolio;
    $('#portfolios').empty();

    portfolio = new Portfolio({
      title: $('#portfolio-title').val(),
      author: $('#portfolio-author').val(),
      author: $('#portfolio-author-url').val(),
      author: $('#portfolio-category').val(),
      body: $('#portfolio-body').val()
    });

    $('#portfolios').append(render(portfolio));

    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });

    $('#export-field').show();
    $('#portfolio-json').val(JSON.stringify(portfolio) + ',');
  };

  portfolioView.index = function(portfolios) {
    $('#portfolios').show().siblings().hide();

    $('#portfolios porfolio').remove();
   // portfolios.forEach(function(a) {
    $('#portfolios').append(render());

    portfolioView.populateFilters();
    portfolioView.handleFilters();

    if ($('#portfolios portfolio').length > 1) {
      $('.portfolio-body *:nth-of-type(n+2)').hide();
    }
  };

  portfolioView.initIndexPage = function() {
    Portfolio.all.forEach(function(a) {
      $('#portfolio-template').append(a.toHtml());
    });
  };

  portfolioView.initAdminPage = function() {
    var template = Handlebars.compile($('#portfolio-template').text());
  };

  module.portfolioView = portfolioView;
})(window);
