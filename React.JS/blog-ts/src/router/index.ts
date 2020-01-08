import React from "react";

export let Routes: any = {
	home: {
		path: '/',
		regexp: /^\/$/
	},
	about: {
		component:React.lazy(() => import("../pages/about/about")),
		path: '/about',
		regexp: /^\/about/
	},
	newArticle: {
		component: React.lazy(() => import("../pages/write-article/new-article/new-article")),
		path: '/new-article/:id',
		regexp: /^\/new-article($|\/[^/]+$)/
	},
	updateArticle: {
		component: React.lazy(() => import("../pages/write-article/new-article/new-article")),
		path: '/update-article/:id',
		regexp: /^\/update-article($|\/[^/]+$)/
	},
	article: {
		component:React.lazy(() => import("../pages/article/article")),
		path: '/article/:id',
		regexp: /^\/article\/[^/]+$/
	},
	other: {path: '*'},
};
