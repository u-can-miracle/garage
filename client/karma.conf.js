// Karma configuration
// Generated on Tue Jan 19 2016 16:17:11 GMT+0200 (FLE Standard Time)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'sinon'/*, 'bard'*/],

        // list of files / patterns to load in the browser
        files: [
            // libs:js
                                              ".//src/dependencies/js/jquery.js",
                                              ".//src/dependencies/js/angular.js",
                                              ".//src/dependencies/js/bootstrap.js",
                                            // endinject

            // testHelpers:js
                                              "./bower_components/angular-mocks/angular-mocks.js",
                                              "./bower_components/angular-material/angular-material-mocks.js",
                                            // endinject       
                                
            // dependencies:js
                                              "./src/dependencies/js/q.js",
                                              "./src/dependencies/js/ngToast.js",
                                              "./src/dependencies/js/angular-ui-router.js",
                                              "./src/dependencies/js/angular-sanitize.js",
                                              "./src/dependencies/js/angular-messages.js",
                                              "./src/dependencies/js/angular-material.js",
                                              "./src/dependencies/js/angular-aria.js",
                                              "./src/dependencies/js/angular-animate.js",
                                            // endinject



            // components:js
                                              "./src/components/text-edit-directive/text-edit.module.js",
                                              "./src/components/text-edit-directive/text-edit.directive.js",
                                              "./src/components/task/task.module.js",
                                              "./src/components/task/task.controller.js",
                                              "./src/components/task/task.component.js",
                                              "./src/components/project/project.modules.js",
                                              "./src/components/project/project.service.js",
                                              "./src/components/project/project.controller.js",
                                              "./src/components/project/project.component.js",
                                              "./src/components/project/project-container.controller.js",
                                              "./src/components/login/login.module.js",
                                              "./src/components/login/login.factory.js",
                                              "./src/components/login/login.controller.js",
                                              "./src/components/app.module.js",
                                              "./src/components/app.run.js",
                                              "./src/components/app.factory.helper.js",
                                              "./src/components/app.config.js",
                                              "./src/components/app.api.constants.js",
                                            // endinject

            // test:js
                                              "./src/components/text-edit-directive/text-edit.directive.spec.js",
                                              "./src/components/task/task.controller.spec.js",
                                              "./src/components/project/project.service.spec.js",
                                              "./src/components/project/project.controller.spec.js",
                                              "./src/components/project/project-container.controller.spec.js",
                                              "./src/components/login/login.factory.spec.js",
                                              "./src/components/login/login.controller.spec.js",
                                              "./src/components/app.factory.helper.spec.js"
                                            // endinject            
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        // browsers: ['Chrome'],
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}