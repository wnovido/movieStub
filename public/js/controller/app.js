/**
 * Created by wilso_000 on 11/19/2014.
 */
movieStubApp = angular.module('movieStubApp', ['ngRoute','ngResource']);

movieStubApp.controller("movieStubController", function ($scope, movieStubFactory, $location) {
	$scope.headerSrc = "tmpl/header.html";
	$scope.movies = movieStubFactory.query();

	$scope.currMovie = null;
	$scope.getMovieById = function (id) {
		var movies = $scope.movies;
		for (var i= 0; i < movies.length; i++) {
			var movie = $scope.movies[i];
			if (movie.id == id) {
				$scope.currMovie = movie;
			}
		}
	};

	// A simple back function, that will help us navigate between views
	$scope.back = function () {
		window.history.back();
	};
	$scope.getCount = function(n) {
		return new Array(n);
	};
	$scope.isActive = function(route) {
		return route === $location.path();
	};
	$scope.isActivePath = function(route) {
		return ($location.path()).indexOf(route) >= 0;
	};
});

movieStubApp.controller("movieDetailsController", function ($scope, $routeParams) {
	$scope.getMovieById($routeParams.id);
});

movieStubApp.controller("bookTicketsController", function($scope, $http, $location, $routeParams) {
	$scope.getMovieById($routeParams.id);
	$scope.onlyNumbers = /^\d+$/;
	$scope.formData = {};
	$scope.formData.movie_id = $scope.currMovie.id;
	$scope.formData.movie_name = $scope.currMovie.name;
	$scope.formData.date = "Today";

	$scope.processForm = function() {
		$http({
			method: 'POST',
			url: '/book',
			data: $.param($scope.formData),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			} //set the headers so angular passing info as form data (not request payload)
		})
			.success(function (data) {
				$location.path("/bookings");
			});
	};
});

movieStubApp.controller("bookingDetailsController", function($scope, movieStubBookingsFactory) {
	$scope.bookings = movieStubBookingsFactory.query();
});
