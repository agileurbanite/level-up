'use strict';

// Quests controller
angular.module('quests').controller('QuestsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Quests',
  function($scope, $stateParams, $location, Authentication, Quests) {
    $scope.authentication = Authentication;

    // Create new quest
    $scope.create = function () {
      // Create new quest object
      var quest = new Quests({
        title: this.title,
        type: this.type,
        description: this.description,
        addr1: this.addr1,
        addr2: this.addr2,
        city: this.city,
        state: this.state,
        zip: this.zip,
        contact: this.contact,
        phone: this.phone,
        points: this.points
      });

      // Redirect after save
      quest.$save(function (response) {
        $location.path('quests/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.description = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing quest
    $scope.remove = function (quest) {
      if (quest) {
        quest.$remove();

        for (var i in $scope.quests) {
          if ($scope.quests[i] === quest) {
            $scope.quests.splice(i, 1);
          }
        }
      } else {
        $scope.quest.$remove(function () {
          $location.path('quests');
        });
      }
    };

    // Update existing quest
    $scope.update = function () {
      var quest = $scope.quest;

      quest.$update(function () {
        $location.path('quests/' + quest._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Quests
    $scope.find = function () {
      $scope.quests = Quests.query();
    };

    // Find existing quest
    $scope.findOne = function () {
      $scope.quest = Quests.get({
        questId: $stateParams.questId
      });
    };
  }
]);
