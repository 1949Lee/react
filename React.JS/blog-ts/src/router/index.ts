export let Routes:any ={
	home:{path:'/',regexp:/^\/$/},
	about:{path:'/about',regexp: /^\/about/},
	newArticle:{path:'/new-article/:id',regexp:/^\/new-article($|\/[^/]+$)/},
	article:{path:'/article/:id',regexp:/^\/article\/[^/]+$/},
	other:{path:'*'},
};
