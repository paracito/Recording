const AV = require('leancloud-storage');
const { Query, User } = AV;

AV.init({
  appId: "XDcXxMdiSuYWAdlNC8s5K9XE-gzGzoHsz",
  appKey: "SDqhmTgCSFNVzq0e9LETSGHF",
  serverURL: "https://xdcxxmdi.lc-cn-n1-shared.com"
});

// const RecordList = AV.Object.extend('record_list');

function register (data) {
	let account = data.account
	const query = new AV.Query('user_list')
	query.equalTo('account', account)
	let res = query.find()
	if(res == []) {
		return res
	}else {
		const UserList = AV.Object.extend('user_list');
		let new_user = new UserList();
		new_user.set('account', data.account)
		new_user.set('name', data.name)
		new_user.set('password', data.password)
		return new_user.save()
	}
	
}

function getUserInfo(account) {
	const query = new AV.Query('user_list')
	query.equalTo('account', account)
	let res = query.find()
	return res
}

function modifyUserInfo (data) {
	const query = new AV.Query('user_list')
	query.equalTo('account', data.account)
	query.find().then(res => {
		res[0].set('name', data.name)
		res[0].set('label_list', data.label_list)
		AV.Object.saveAll(res);
	}).catch(err => {
		console.log(err)
	})
	return true
}

function getRecordList (account) {
	const query = new AV.Query('record_list')
	query.equalTo('account', account)
	query.descending('id');
	let res = query.find()
	return res
}

function getTodayRecord (account, date) {
	const query = new AV.Query('record_list')
	query.equalTo('account', account)
	query.equalTo('date', date)
	let res = query.find()
	return res
}

function addRecord (data) {
	const RecordList = AV.Object.extend('record_list');
	let new_clock = new RecordList();
	new_clock.set('title', data.title)
	new_clock.set('date', data.date)
	new_clock.set('account', data.account)
	new_clock.set('label_list', data.label)
	new_clock.set('cost_time', data.time)

	new_clock.set('score', data.score)
	new_clock.set('content', data.content)
	return new_clock.save()
}

function updateRecord (data) {
	const query = new AV.Query('record_list')
	query.equalTo('account', data.account)
	query.equalTo('date', data.date)
	query.find().then(res => {
		res[0].set('title', data.title)
		res[0].set('date', data.date)
		res[0].set('account', data.account)
		res[0].set('label_list', data.label)
		res[0].set('cost_time', data.time)
		res[0].set('score', data.score)
		res[0].set('content', data.content)

		AV.Object.saveAll(res);
	}).catch(err => {
		console.log(err)
	})
	return true
}

export {register, getUserInfo, modifyUserInfo, getRecordList, getTodayRecord, addRecord, updateRecord }