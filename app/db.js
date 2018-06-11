/*
	*** Score
	createdAt:	date
	score:		number
	name:		string
*/

const { Model } = require('nedb-models')

class Score extends Model {
	static datastore() {
		return {
			filename: process.env.GATSUME_DB_PATH,
			timestampData: true
		}
	}
}

module.exports = Score;
