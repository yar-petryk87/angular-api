var myApp = angular.module("myApp" , []);
myApp.controller("myController" , function($scope, $http) {

	$http.get('http://localhost:3000/api').then(function(response) {
        $scope.eneida = response.data;
    });
    
	$scope.getRow = function(id) {
 		$http.get('http://localhost:3000/api/get?id=' + id)
 		.then(function(response) {
 			$scope.thatRow = response.data[0].data;	
 		});		
	};

	

    $scope.addRow = function() {
 		var req = {
 			method: 'POST' ,
 			url: 'http://localhost:3000/api/add' ,
 			data: {newrow: $scope.newRow}
 		};
 		$http(req).then(function(response) {
 			$scope.eneida = response.data ;
 		});
 	};


	$scope.deleteRow = function(id) {
		var req = {
 			method: 'POST' ,
 			url: 'http://localhost:3000/api/delete' ,
 			data: {row_id: id}
 		};
 		$http(req).then(function(response) {
 			$scope.eneida = response.data ;//.splice($scope.eneida.indexOf($scope.row), 1);
 		});	
	};

	$scope.editRow = function(id) {	
		var input_id = '#edit-row-' + id;
		document.getElementById('edit-row-' + id).disabled = false;
 		$http.get('http://localhost:3000/api/edit?id=' + id)
 		.then(function(response) {
 			var value = response.data[0].data;
 			$scope.editedRow = value;//.splice($scope.eneida.indexOf($scope.row), 1);
 			$(input_id).val(value);
 		});
	};
	$scope.updateRow = function(id) {
		var dat = $("#edit-row-" + id).val();
		var req = {
 			method: 'POST' ,
 			url: 'http://localhost:3000/api/update?id=' + id ,
 			data: {buffer: dat}
 		};

 		$http(req).then(function(response) {
 			$scope.eneida = response.data ;//.splice($scope.eneida.indexOf($scope.row), 1);

 		});
		
	};


});


