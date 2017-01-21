'use strict';

app.controller('DefaultCtrl', ['$scope', '$http', '$q', function ($scope, $http, $q) {

    var self = this;

    self.jokes = [];

    loadData();

    self.selectedItem = null;
    self.searchText = null;
    self.querySearch = querySearch;

    // **********************
    // Internal methods
    // **********************

    //Load the data from the JSON file
    function loadData() {
        $http.get('/content/jsons/jokes.json')
          .success(function (data) {
              self.jokes = data;
          }).error(function (data, status, headers, config) {
              console.log(data); // log error        
          });
    }


    /* Search for jokes...  */
    function querySearch(query) {
        query = query.toLowerCase();

        var results = [];

        //Search for the query within the jokes array  
        angular.forEach(self.jokes, function (item) {
            if (item.joke.toLowerCase().indexOf(query) >= 0) results.push(item);
        });

        var deferred = $q.defer();
        deferred.resolve(results);
        return deferred.promise;
    }
}]);