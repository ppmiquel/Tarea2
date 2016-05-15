//var InstagramController = {};

var promise = require('bluebird');
var ig = require('instagram-node').instagram();

module.exports = {

getTagInfo: function (tag,token){
	
	return new promise(function(resolve,reject){
		ig.use({ access_token: token});
		ig.tag(tag.toString(),function(err,result,remaining,limit){var cantidad = result["media_count"]
		resolve(cantidad)
	});
	})

},

getTagMedia: function(tag,token){

	return new promise(function(resolve,reject){
		ig.use({ access_token: token});
		ig.tag_media_recent(tag.toString(), function(err, medias, pagination, remaining, limit) {
			var posts = [];
			for (var i = 0; i < medias.length;i++){
				var aux = {};
				aux.tags = medias[i].tags;
				aux.username = medias[i].user.username;
				aux.likes = medias[i].likes.count;
				if(medias[i].type == 'image'){
					aux.url = medias[i].images["standard_resolution"].url;
				}
				else if(medias[i].type == 'video'){
					aux.url = medias[i].videos["standard_resolution"].url;
				}
				aux.caption = medias[i].caption.text;
				posts.push(aux);
			}
			resolve(posts);
		});
	})

},

getTag: function (req,res){
	var self = this;
	var tag = req.body.tag;
	var token = req.body["access_token"];
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
  		response.version = '1.0.1';
  		res.json(response);	
  	})

}

};