/**
 * Created by wilso_000 on 11/20/2014.
 */
movieStubApp.factory('movieStubFactory', function ($resource) {
	return $resource('/movies');
});

movieStubApp.factory('movieStubBookingsFactory', function ($resource) {
	return $resource('/bookings');
});