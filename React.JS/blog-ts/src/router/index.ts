export let Routes:any ={
	home:{path:'/',regexp:/^\/$/},
	about:{path:'/about',regexp: /^\/about/},
	newArticle:{path:'/new-article/:id',regexp:/^\/new-article($|\/[^/]+$)/},
	other:{path:'*'},
};
