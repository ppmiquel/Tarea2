//var InstagramController = {};

var promise = require('bluebird');
var ig = require('instagram-node').instagram();

module.exports = {

getTagInfo: function (tag){
	
	return new promise(function(resolve,reject){
		ig.use({ access_token: '2019746130.59a3f2b.86a0135240404ed5b908a14c0a2d9402'});
		ig.tag(tag.toString(),function(err,result,remaining,limit){var cantidad = result["media_count"]
		resolve(cantidad)
	});
	})

},

getTagMedia: function(tag){

	return new promise(function(resolve,reject){
		ig.use({ access_token: '2019746130.59a3f2b.86a0135240404ed5b908a14c0a2d9402'});
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
	var access_token = req.body.access_token;
	if(!tag)
  		return res.badRequest('Falta el tag');
  	//if(!access_token)
  	//	return res.badRequest('Falta el token de autorización');
  	var response = {};
  	self.getTagInfo(tag)
  	.then(function(cantidad){
  		response.metadata = {total: cantidad};
  		return self.getTagMedia(tag);	
  	})
  	.then(function(posts){
  		response.posts = posts;
  		
  	})
  	response.version = '1.0.1';
  	res.json(response);
}

};