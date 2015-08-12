'use strict';

//Quests service used for communicating with the quests REST endpoints
angular.module('quests').factory('Quests', ['$resource',
  function ($resource) {
    return $resource('api/quests/:questId', {
      questId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
