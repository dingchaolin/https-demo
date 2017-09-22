/**
 * Created by dcl on 2017/9/21.
 */
const mongoskin = require('mongoskin');
let DB = null;
DB = mongoskin.db("mongodb://@101.200.40.168:27017/bobo");

//查询
DB.collection('users').find({},["phone","nickname","age"]).skip(1).limit(2).toArray( function( err, result ){
    //console.log( result )
});

//插入
let insertDoc = {
    phone:"15311644266",
    nickname:"小樱桃_" + Math.floor( Math.random() * 1000),
    age: 20,
    avatar:`http://baidu.com/${Math.floor( Math.random() * 1000)}.jpg`,
    gender: Math.floor( Math.random() * 1000) % 2 ? "boy" : "girl"
};

//DB.collection('users').insertOne(insertDoc,function( err, result ){
//    console.log( result.result )
//    /*
//     { ok: 1, n: 1 }
//     */
//});


//更新
DB.collection('users').updateOne({phone:'15311644266'},{$set:{name:'小小',age:'2'}},function(error,result){
    DB.collection('users').findOne({phone:'15311644266'}, function (error, result) {
        console.log('=======>', error, result);
    })
})