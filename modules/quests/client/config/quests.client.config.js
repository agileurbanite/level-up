'use strict';

// Configuring the Quests module
angular.module('quests').run(['Menus',
  function (Menus) {
    // Add the quests dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Quests',
      state: 'quests',
      type: 'dropdown'
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'quests', {
      title: 'List Quests',
      state: 'quests.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'quests', {
      title: 'Create Quests',
      state: 'quests.create'
    });
  }
]);
