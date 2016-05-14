module.exports = {

getTag: function (req,res){
	var tag = req.body.tag;
	//var token = req.body.token;
	if(!tag)
  		return res.badRequest('Falta el tag');
  	//if(!token)
  	//	return res.badRequest('Falta el token de autorización');

  	var ig = require('instagram-node').instagram();
	ig.use({ access_token: '3231014232.1677ed0.7c68b172e604438cb5e385d8fad65b5d' });
	ig.tag(tag.toString(),function(err,result,remaining,limit){});

}

getTagMedia: function(req,res){
	var ig = require('instagram-node').instagram();
	ig.use({ access_token: '3231014232.1677ed0.7c68b172e604438cb5e385d8fad65b5d' });
	ig.tag_media_recent(tag.toString(), function(err, medias, pagination, remaining, limit) {});
}
};