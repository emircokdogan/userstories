angular.module("storyService", [])

    .factory("Story", function ($http) {
        var storyFactory = {};

        storyFactory.create = function (storyData) {
            return $http.post("/api", storyData);
        };

        storyFactory.allStories = function () {
            return $http.get("/api/allstories");
        };

        storyFactory.stories = function () {
            return $http.get("/api");
        };

        return storyFactory;
    })

    .factory("socketio", function ($rootScope) {
        var socket = io.connect();

        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback)
                            callback.apply(socket, args);
                    });
                })
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback)
                            callback.apply(socket, args);
                    });
                })
            }
        };
    });