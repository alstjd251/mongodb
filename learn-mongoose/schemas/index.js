const mongoose = require('mongoose');

const connect = () => {
    if(process.env.NODE_ENV !== 'production'){
        mongoose.set('debug', true);
    }

    mongoose.connect('mongodb://mskang:inwoo1506@localhost:27017/admin', {
        dbName: 'nodejs',
        // 사용하지 않는 속성
        // useNewUrlParser: true,
    }).then(() => {
        console.log("mongodb 연결 성공");
    }).catch((err) => {
        console.error("mongodb 연결 에러", err);
    });
};

mongoose.connection.on('error', (error) => {
    console.error('mongodb 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
    console.error('mongodb 연결이 끊어졌습니다. 연결을 재시도합니다.');
    connect();
});

module.exports = connect;