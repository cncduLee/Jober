
var path = require('path');

module.exports = {
	version:'0.0.1',
	session_secret:'lee-seesion',
	auth_cookie: 'lee-cookies',
	db:'mongodb://127.0.0.1/fanger',
	host:'localhost',
	page_size:10,
	rss:{
		    title: '成都大学多问专业中文社区（Nodejs版）',
		    link: 'http://cnodejs.org',
		    language: 'zh-cn',
		    description: '成都大学多问',
		    //最多获取的RSS Item数量
		    max_rss_items: 50
	},
	upload_dir: path.join(__dirname, 'public', 'user_data', 'docs')
};