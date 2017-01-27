(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


const app = angular.module('MovieApp', []);

app.controller('NewMovies', function ($scope, MovieService){
    $scope.movie = '';
    

    $scope.newMovie = function () {
        MovieService.addMovie($scope.movieTitle, $scope.movieRelease, $scope.isFresh, $scope.isRotten);
        $scope.movieTitle = '';
        $scope.movieRelease = '';

    }
});

app.controller('ShowMovies', function ($scope, MovieService){
    
    $scope.movies = MovieService.getMovies();
    
    $scope.fresh = function (target) {
        MovieService.markAsFresh(target);
        // console.log(`Marking ${target.title} as fresh`);
        
    }

    $scope.rotten = function (target) {
        MovieService.markAsRotten(target);
        
    }
    
});



app.factory('MovieService', function ($http) {
    let movies = [];

    $http.get('https://api.themoviedb.org/3/discover/movie?page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=f0e1fc46f88169a61edd0bb13907627b').then(function (response){
        angular.copy(response.data.results, movies)
    });

    return {
        addMovie: function (title, overview, release_date, isFresh, isRotten) {
            movies.push({
                title: title,
                overview: overview,
                release_date: release_date,
                isFresh: null,
                isRotten: null,
            });
        },
        getMovies: function () {
            return movies;
        },
        markAsFresh(good) {
            good.isFresh = true;
        },
        markAsRotten(bad) {
            bad.isRotten = true;
        },
    };
});
},{}]},{},[1]);
