let sql = require('../sql/sql');
let moment = require('moment');
let func = require('../sql/func');
let path = require('path');




function formatData(rows) {
	return rows.map(row => {
		let date = moment(row.create_time).format('YYYY-MM-DD');
		return Object.assign({}, row, {
			create_time: date
		});
	});
}


module.exports = {
		
	// 获取商品列表
	
	   fetchAll (req, res) {
		 let cur_page =req.body.cur_page;
		 let member_phone =req.body.member_phone;
		  let sql, arr ,endLimit ,startLimit;
		
		console.log(req.body.cur_page);
	
			
			 endLimit = cur_page *10;
			 startLimit =  endLimit -10;
			if(member_phone){
				
					 sql ='select * from members where member_phone =? ';
					 arr = [member_phone];
				    
			}else{
				
				sql ='select * from members  limit ?, ?';
				   arr = [startLimit , endLimit];
			}
		
	
	   
	   	func.connPool(sql, arr, (err, rows) => {
			rows = formatData(rows);
			res.json({
				code: 200,
				msg: 'ok',
				resultList: rows
			});

		});
	   
	   },
	
	
	
	
	
	
	// 获取会员详情

	fetchById(req, res) {
		let member_id = req.body.member_id;

		let sql = 'select * from members WHERE member_id = ?';
		let arr = [member_id];



		func.connPool(sql, arr, (err, rows) => {

			rows = formatData(rows);
			res.json({
				code: 200,
				msg: 'ok',
				resultList: rows[0]
			});
		});


	},

	
	
	
	

	// 添加|更新 会员
	addOne(req, res) {
		let member_id = req.body.member_id;
		console.log(member_id);

		let member_name = req.body.member_name;
		let member_phone = req.body.member_phone;

		let remarks = req.body.remarks;
		let recommendation_code = req.body.recommendation_code;

		let membership_level = req.body.membership_level;
		let member_address1 = req.body.member_address1;
		let member_address2 = req.body.member_address2;
		let member_address3 = req.body.member_address3;
		let sql, arr;

			if (member_id) {
				// 更新
			
				sql = 'UPDATE members SET member_name=?, member_phone=? ,remarks =? ,recommendation_code =? ,membership_level =? ,member_address1 =?,member_address2=?,member_address3 =?  WHERE member_id=?';
				
				
				arr = [member_name, member_phone, remarks, recommendation_code, membership_level, member_address1,member_address2,member_address3,member_id];
			} else {
				// 新增
				sql = 'INSERT INTO members(member_name, member_phone,remarks,recommendation_code,membership_level,member_address1,member_address2,member_address3) VALUES(?,?,?,?,?,?,?,?)';
				arr = [member_name, member_phone, remarks, recommendation_code, membership_level,member_address1,member_address2,member_address3];


			}


		

	func.connPool(sql, arr, (err, rows) => {
			res.json({
				code: 200,
				msg: 'done'
			});

		});


	},


	// 删除会员

	deleteOne(req, res) {

		let member_id = req.body.member_id;
		let sql = 'DELETE  from members WHERE member_id =?';
	
		let arr = [member_id];

		func.connPool(sql, arr, (err, rows) => {
			res.json({
				code: 200,
				msg: 'done'
			});
		});

	},



	// 批量删除
	deleteMulti(req, res) {
		let member_id = req.body.member_id;

		let sql = 'DELETE  from members WHERE member_id in ?';
		let arr = [[member_id]];

		func.connPool(sql, arr, (err, rows) => {
			res.json({
				code: 200,
				msg: 'done'
			});
		});



	},



	// 权限变更
	changeRole(req, res) {
		let change_role = req.body.change_role;

		let member_id = req.body.member_id;
		
	
		
		
			let sql = 'UPDATE members SET membership_level= ? WHERE member_id = ?' ;
		
		let arr = [change_role,member_id];
		
		func.connPool(sql, arr, (err, rows) => {
			res.json({
				code: 200,
				msg: 'done'
			});
		});


	},

};
