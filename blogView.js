// create a view object, to hold functions

var blogView = {};

blogView.populateFilters = function() {
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

blogView.handleAuthorFilter = function() {
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

blogView.handleCategoryFilter = function() {
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

blogView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function(e) {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click();
};

blogView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();

  $('#articles').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    $(this).parent().find('*').fadeIn();
    $(this).hide();
  });
};

$(document).ready(function() {
  blogView.populateFilters();
  blogView.handleCategoryFilter();
  blogView.handleAuthorFilter();
  blogView.handleMainNav();
  blogView.setTeasers();
});
