'use strict'
angular.module("storyCtrl", ["storyService"])

    .controller("StoryController", function (Story, socketio) {
        var vm = this;

        Story.stories()
            .success(function (data) {
                vm.stories = data || [];
            });

        vm.createStory = function () {
            vm.message = "";

            Story.create(vm.storyData)
                .success(function (data) {
                    vm.storyData = {};
                    vm.stories.push(data);
                    vm.message = data.message;
                });
        };
    })

    .controller("AllStoriesController", function (stories, socketio) {
        var vm = this;

        vm.stories = stories.data || [];

        socketio.on("allStoriesAdded", function (data) {
            vm.stories.push(data);
        });
    });