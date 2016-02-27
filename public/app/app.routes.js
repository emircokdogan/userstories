angular.module("appRoutes", ["ngRoute"])

    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "app/views/pages/home.html",
                controller: "MainController",
                controllerAs: "main"
            })
            .when("/login", {
                templateUrl: "app/views/pages/login.html"
            })
            .when("/signup", {
                templateUrl: "app/views/pages/signup.html"
            })
            .when("/allstories", {
                templateUrl: "app/views/pages/allStories.html",
                controller: "AllStoriesController",
                controllerAs: "story",
                resolve: {
                    stories: function (Story) {
                        console.log("resolver");
                        return Story.allStories();
                    }
                }
            })
            .when("/users", {
                templateUrl: "app/views/pages/users.html",
                controller: "UserController",
                controllerAs: "user"
            });

        $locationProvider.html5Mode(true);
    });