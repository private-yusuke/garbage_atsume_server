var express = require('express');
var Score = require("../../db.js")
// ルーティングするで
var router = express.Router();

router.post('/add', async function(req, res) {
	var score = req.body.score, name = req.body.name;
	if(!score | !name) {
		res.status(400).json({status: "bad", error: "too few parameters"});
		return;
	}
	if(name.length > 10) {
		res.status(400).json({status: "bad", error: "too long name"});
		return;
	}
	await Score.insert([{score: score, name: name}]).then(value => {
		res.json({status: "ok"});
		console.log(value);
	}).catch(error => {
		res.status(500).json({status: "bad", error: error});
	});
});

router.get('/latest', async function(req, res) {
	await Score.find({}).sort({score: -1}).limit(10).then(docs => {
		console.log(JSON.stringify(docs));
		res.json(docs);
	}).catch(error => {
		res.status(500).json({status: "bad", error: error});
	});
});

router.get('/highest', async (req, res) => {
	await Score.find().sort({score: -1}).limit(1).then(docs => {
		console.log(docs[0]);
		res.json(docs[0]);
	}).catch(error => {
		res.status(500).json({status: "bad", error: error});
	});
});

router.post('/reset', async (req, res) => {
	if(req.body.sure != "yes") {
		res.status(400).json({status: "bad", error: "sure: yes is needed to execute this command"});
		return;
	}
	await Score.remove({}, {multi: true}).then(numRemoved => {
		res.json({status: "ok", count: numRemoved});
	}).catch(error => {
		res.status(500).json({status: "bad", error: error});
	});
});

router.post('/remove', async (req, res) => {
	var _id = req.body._id;
	if(!_id) {
		res.status(400).json({status: "bad", error: "id not attached"});
		return;
	}
	await Score.remove({_id: _id}).then(doc => {
		res.json({status: "ok", doc: doc});
	}).catch(error => {
		res.status(500).json({status: "bad", error: error});
	});
});
//routerをモジュールとして扱う準備
module.exports = router;
