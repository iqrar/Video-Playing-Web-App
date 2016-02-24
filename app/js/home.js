'use strict';

angular.module('video-playing-web-app')
  .controller('Home', ['$scope', '$http', '$sce', '$timeout', 'Data', function($scope, $http, $sce, $timeout, Data) {
  // Data from factory    
  Data.getMovies().then(function(data) {
    $scope.movies = data;
  },
  function() {
    // we are sure to get data,here we can put any logic i just wrote console message
    console.log('error');
  });
  $scope.playCurrentMovie = function(movie) {
    $scope.movie = movie;
    var video = document.getElementById('video');
      // if source tag exist remove it
      if (video.children) {
        $('source').remove();
        video.load();
      }
    $scope.canPlay = false;
    // source tag for different videos format
    for (var i = 0; i < $scope.movie.streams.length; i++) {
      //check video formate which is supported by browser
      if (video.canPlayType && video.canPlayType('video/' + $scope.movie.streams[i].type).replace(/no/, '')) {
        $scope.canPlay = true;
        $('.not-support').css('display', 'block');
        var source = document.createElement('source');
        source.src = $sce.trustAsResourceUrl($scope.movie.streams[i].url);
        source.type = 'video/' + $scope.movie.streams[i].type;
        var app = video.appendChild(source);
      }
    }
  };
  //tiger click on first movies cover
  $timeout(function() {
    $('.movie-cover').slideDown("slow");
    var img = document.getElementsByTagName('img')[0];
    $(img).trigger('click');
  }, 30);

}]);