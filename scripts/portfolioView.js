(function(module) {

  // create a view object, to hold functions
  var portfolioView = {};

  // This method is not tied to anything.
  portfolioView.populateFilters = function() {
    $('article').each(function() {
      if (!$(this).hasClass('template')) {
        var value = $(this).find('address a').text();
        var optionTag = '<option value="' + value + '">' + value + '</option>';
        $('#author-filter').append(optionTag);

        value = $(this).attr('data-category');
        optionTag = '<option value="' + value + '">' + value + '</option>';
        if ($('#category-filter option[value="' + value + '"]').length === 0) {
          $('#category-filter').append(optionTag);
        }
      }
    });
  };

  portfolioView.handleAuthorFilter = function() {
    $('#author-filter').on('change', function() {
      if ($(this).val()) {
        $('article').hide();
        $('article[data-author="' + $(this).val() + '"]').fadeIn();
      } else {
        $('article').fadeIn();
        $('article.template').hide();
      }
      $('#category-filter').val();
    });
  };

  portfolioView.handleCategoryFilter = function() {
    $('#category-filter').on('change', function() {
      if ($(this).val()) {
        $('article').hide();
        $('article[data-category="' + $(this).val() + '"]').fadeIn();
      } else {
        $('article').fadeIn();
        $('article.template').hide();
      }
      $('#author-filter').val();
    });
  };

/*  portfolioView.handleMainNav = function() {
    $('.main-nav').on('click', '.tab', function(e) {
      $('.tab-content').hide();
      $('#' + $(this).data('content')).fadeIn();
    });

    $('.main-nav .tab:first').click();
  };*/

  portfolioView.setTeasers = function() {
    $('.portfolio-body *:nth-of-type(n+2)').hide();

    $('#portfolio-template').on('click', 'a.read-on', function(e) {
      e.preventDefault();
      $(this).parent().find('*').fadeIn();
      $(this).hide();
    });
  };

  portfolioView.initIndexPage = function() {
    Portfolio.all.forEach(function(a) {
      $('#portfolio-template').append(a.toHtml());
    });

    portfolioView.populateFilters();
    portfolioView.handleCategoryFilter();
    portfolioView.handleAuthorFilter();
    /*portfolioView.handleMainNav();*/
    portfolioView.setTeasers();
  };

  portfolioView.initAdminPage = function() {
    var template = Handlebars.compile($('#portfolio-template').text());
  };

  module.portfolioView = portfolioView;
})(window);
