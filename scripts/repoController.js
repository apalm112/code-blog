(function(module) {
  var portfoliosController = {};
  Portfolio.createTable();

  portfoliosController.index = function() {
    $('.clone').hide();   // hides /about page then shows / page
    $('.github').empty();  // empty the <ul> so the repo names don't stack up
    $('.projects').show();
  };

  module.portfoliosController= portfoliosController;
})(window);
