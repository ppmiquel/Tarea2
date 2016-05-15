//var InstagramController = {};

var promise = require('bluebird');
var ig = require('instagram-node').instagram();

module.exports = {

getTagInfo: function (tag,token){
	
	return new promise(function(resolve,reject){
		ig.use({ access_token: [token]});
		ig.tag(tag.toString(),function(err,result,remaining,limit){var cantidad = result["media_count"]
		resolve(cantidad)
	});
	})

},

getTagMedia: function(tag,token){

	return new promise(function(resolve,reject){
		ig.use({ access_token: [token]});
		ig.tag_media_recent(tag.toString(), function(err, medias, pagination, remaining, limit) {
			var posts = [];
			for (var i = 0; i < Object.key(medias).lenght;i++){
				var aux = {
					tags: posts[i].tags,
					username: posts[i].user.username,
					likes: posts[i].likes.count,
					if(posts[i].type == 'images'){
						url: posts[i].images.standard_resolution.url
					}
					else if(posts[i].type == 'video'){
						url: posts[i].video.standard_resolution.url
					}
					caption: posts[i].caption.text
				}
				posts.push(aux);
			}
			resolve(posts);
		});
	})

},

getTag: function (req,res){
	var self = this;
	var tag = req.body.tag;
	var token = req.body.token;
	if(!tag)
  		return res.badRequest('Falta el tag');
  	if(!token)
  		return res.badRequest('Falta el token de autorización');
  	var response = {};
  	self.getTagInfo(tag,token)
  	.then(function(cantidad){
  		response.metadata = {total: cantidad};
  		return self.getTagMedia(tag,token);	
  	})
  	.then(function(posts){
  		response.posts = posts;
  		
  	})
  	response.version = '1.0.1';
  	res.json(response);
}

};