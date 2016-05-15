//var InstagramController = {};

var promise = require('bluebird');
var ig = require('instagram-node').instagram();

module.exports = {

getTagInfo: function (tag){
	
	return new promise(function(resolve,reject){
		ig.use({ access_token: '3231014232.1677ed0.7c68b172e604438cb5e385d8fad65b5d' });
		ig.tag(tag.toString(),function(err,result,remaining,limit){var cantidad = result["media_count"]
		resolve(cantidad)
	});
	})

},

getTagMedia: function(tag){

	return new promise(function(resolve,reject){
		ig.use({ access_token: '3231014232.1677ed0.7c68b172e604438cb5e385d8fad65b5d' });
		ig.tag_media_recent(tag.toString(), function(err, medias, pagination, remaining, limit) {
			var posts = [];
			for (var i = 0; i<medias.lenght;i++){
				var aux = {
					tags: posts[i].tags,
					username: posts[i].user.username,
					likes: posts[i].likes.count

				}
				posts.push(aux);
			}
			resolve(posts);
		});
	})

},

getTag: function (req,res){
	var tag = req.body.tag;
	var self = this;
	//var token = req.body.token;
	if(!tag)
  		return res.badRequest('Falta el tag');
  	//if(!token)
  	//	return res.badRequest('Falta el token de autorización');
  	var response = {};
  	self.getTagInfo(tag)
  	.then(function(cantidad){
  		response.metadata = {total: cantidad};
  		return self.getTagMedia(tag);	
  	})
  	.then(function(posts){
  		response.posts = posts;
  		res.json(response);
  	})

}

};