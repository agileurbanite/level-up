'use strict';

// Setting up route
angular.module('quests').config(['$stateProvider',
  function ($stateProvider) {
    // quests state routing
    $stateProvider
      .state('quests', {
        abstract: true,
        url: '/quests',
        template: '<ui-view/>',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('quests.list', {
        url: '',
        templateUrl: 'modules/quests/views/list-quests.client.view.html'
      })
      .state('quests.create', {
        url: '/create',
        templateUrl: 'modules/quests/views/create-quest.client.view.html'
      })
      .state('quests.view', {
        url: '/:questId',
        templateUrl: 'modules/quests/views/view-quest.client.view.html'
      })
      .state('quests.edit', {
        url: '/:questId/edit',
        templateUrl: 'modules/quests/views/edit-quest.client.view.html'
      });
  }
]);
