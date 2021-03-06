'use strict';
angular.module('app')
    .config(["$locationProvider", '$stateProvider', '$urlRouterProvider', 'UIRouterMetatagsProvider', ($locationProvider, $stateProvider, $urlRouterProvider, UIRouterMetatagsProvider) => {

        //TODO:
        UIRouterMetatagsProvider
            .setTitlePrefix('')
            .setTitleSuffix(' | ivqBlog')
            .setDefaultTitle('ivqBlog：分享我的开发历程')
            .setDefaultDescription('ivqBlog 技术博客, 分享我的世界')
            .setDefaultKeywords('html, css, javascript, mongodb, nodejs, node, express, sql')
            .setOGURL(true);

        $locationProvider.html5Mode(true).hashPrefix('!');

        $stateProvider
            .state('/', {
                url: '/',
                views: {
                    '': {
                        templateUrl: 'layout/master.tpl.html'
                    },
                    'articleList@/': {
                        templateUrl: 'article/list/list.tpl.html',
                        controller: 'ListCtrl'
                    }
                },
                resolve: {
                    category: [() => {
                        return null;
                    }],
                    tag: [() => {
                        return null;
                    }]
                },
                metaTags: {}
            })
            .state('category', {
                url: '/category/:route',
                views: {
                    '': {
                        templateUrl: 'layout/master.tpl.html'
                    },
                    'articleList@category': {
                        templateUrl: 'article/list/list.tpl.html',
                        controller: 'ListCtrl'
                    }
                },
                resolve: {
                    category: ['$stateParams', 'CategoryService', ($stateParams, CategoryService) => {
                        return CategoryService.getByRoute($stateParams.route);
                    }],
                    tag: [() => {
                        return null;
                    }],
                    setting: ['SettingService', (SettingService) => {
                        return SettingService.getByKey({key: 'setting.meta'});
                    }]
                },
                metaTags: {
                    title: ['category', (category) => {
                        return category.name;
                    }],
                    description: ['category', (category) => {
                        return category.name;
                    }],
                    keywords: ['category', (category) => {
                        return category.name;
                    }]
                }
            })
            .state('tag', {
                url: '/tag/:route',
                views: {
                    '': {
                        templateUrl: 'layout/master.tpl.html'
                    },
                    'articleList@tag': {
                        templateUrl: 'article/list/list.tpl.html',
                        controller: 'ListCtrl'
                    }
                },
                resolve: {
                    category: [() => {
                        return null;
                    }],
                    tag: ['$stateParams', 'TagService', ($stateParams, TagService) => {
                        return TagService.getByRoute($stateParams.route);
                    }]
                },
                metaTags: {
                    title: ['tag', (tag) => {
                        return tag.name;
                    }],
                    description: ['tag', (tag) => {
                        return tag.name;
                    }],
                    keywords: ['tag', (tag) => {
                        return tag.name;
                    }]
                }
            })
            .state('post', {
                url: '/post/:route/:articleId',
                templateUrl: 'article/post/post.tpl.html',
                controller: 'PostCtrl',
                resolve: {
                    article: ['$stateParams', 'ArticleService', ($stateParams, ArticleService) => {
                        return ArticleService.getById($stateParams.articleId, {action: 'updateView'});
                    }]
                },
                metaTags: {
                    title: ['article', (article) => {
                        return (!_.isUndefined(article.meta) && !_.isUndefined(article.meta.title)) ? article.meta.title : article.title;
                    }],
                    description: ['article', (article) => {
                        return (!_.isUndefined(article.meta) && !_.isUndefined(article.meta.description)) ? article.meta.description : article.title;
                    }],
                    keywords: ['article', (article) => {
                        return (!_.isUndefined(article.meta) && !_.isUndefined(article.meta.keyword)) ? article.meta.keyword : article.title;
                    }]
                }
            })
            .state('about', {
                url: '/about',
                templateUrl: 'page/about/about.tpl.html',
                metaTags: {
                    title: '关于'
                }
            });
    }]);