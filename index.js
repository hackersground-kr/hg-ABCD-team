const path =  require('path');
const pool = require('./lib/db.js');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const multer = require('multer');
const fs = require('fs');
const express = require('express')
const app = express();

app.use(session({
    secret: 'Tem-ABCD-hackerground',
    resave: false,
    saveUninitialized: false,
    store:new FileStore(),
    // cookie: { secure: true }
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 세션 파일을 저장할 디렉토리 경로 설정
const sessionDir = path.join(__dirname, 'sessions');

// 세션 디렉토리가 존재하지 않으면 생성
if (!fs.existsSync(sessionDir)) {
    fs.mkdirSync(sessionDir, { recursive: true });
}


const upload = multer();
app.use(express.json());
app.use(express.static( path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({extended : true}));

app.get('/', async (req, res) => {
    //메인 사이트
    const db = await pool.getConnection();
    try {
        const [posts] = await db.query('SELECT * FROM posts');
        // console.log(posts);
        res.render("index",{
            name : req.session.username,
            post : posts,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Database error');
    } finally {
        db.release();
    }
});

app.get('/all', async (req, res) => {
    const db = await pool.getConnection();
    try {
        const [posts] = await db.query('SELECT * FROM posts');
    res.render("all",{
        name : req.session.username,
        post : posts
    });
    } catch (err) {
        console.log(err)
    } finally {
        db.release();
    }
})

app.get('/user', async (req, res) => {
    if (!req.session.username) {
        res.status(400).send('<script>alert("로그인이 필요한 기능입니다."); window.location.href="/";</script>');
        return
    } 
    const db = await pool.getConnection();
    try {
        const [point] = await db.query('SELECT point, role FROM users where username = ?',[req.session.username]);
        res.render("user",{
            name : req.session.username,
            point : point[0].point,
            role : point[0].role
        });
    } catch (err) {
        console.log(err)
    } finally {
        db.release();
    }
});


app.get('/season', async (req, res) => {
    const db = await pool.getConnection();
    try {
        const [posts] = await db.query('SELECT * FROM posts');
        res.render("season",{
            name : req.session.username,
            post : posts
        });
    } catch (err) {
        console.log(err)
    } finally {
        db.release();
    }
})

app.get('/signup', (req, res) => {
    //유저 고르게 시킴
    res.sendFile(path.join(__dirname, 'public/html/select_user.html'));
});

app.get('/seller_check', (req,res)=>{
    //유저 고를때 판매자 선택하면 인증 사이트 나옴
    res.sendFile(path.join(__dirname, 'public/html/realseller.html'));
})

app.post('/seller_check', upload.none(), async (req, res) => {
    // 사용자가 보낸데이터 검증 (올바른 키 인지)
    const db = await pool.getConnection();
    const key = req.body.key;
    try {
        const [result] = await db.query('select * from check_key where check_key=?',[key]);
        if (result.length > 0) {
            // await db.query('delete from check_key where check_key = ?',[key]);
            req.session.key = 'Y';
            req.session.save(()=>{
                res.json('success');
            })
        } else {
            res.json('failed');
        }
    } catch(err) {
        console.log(err)
    } finally {
        db.release()
    }
})

//판매자용 회원가입
app.get('/signup_b', (req, res) => {
    if (req.session.key === 'Y') {
        res.sendFile(path.join(__dirname, 'public/html/signup_b.html'));
    } else {
        res.status(400).send('<script>alert("먼저 인증을 진행해주세요."); window.location.href="/seller_check";</script>');
        return
    }
})

//구매자용 회원가입
app.get('/signup_c', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/signup_c.html'));
})

app.post('/signup_b', upload.none(), async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const phonenum = req.body.phonenum;
    const db = await pool.getConnection();
    try {
        const [overlab] = await db.query('select * from users where username = ?',[username]);
        if (overlab.length > 0) {
            res.json('overlab');
        } else {
            await db.query('insert into users (username, password, phonenum, role) values(?, ?, ?, "seller")',[username, password, phonenum]);
            res.json('success');
        }
    } catch (err) {
        console.log(err)
    } finally {
        db.release();
    }
});


app.post('/signup_c', upload.none(), async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const phonenum = req.body.phonenum;
    const db = await pool.getConnection();
    try {
        const [overlab] = await db.query('select * from users where username = ?',[username]);
        if (overlab.length > 0) {
            res.json('overlab');
        } else {
            await db.query('insert into users (username, password, phonenum, role, point) values(?, ?, ?, "buyer", 0)',[username, password, phonenum]);
            res.json('success');
        }
    } catch (err) {
        console.log(err)
    } finally {
        db.release();
    }
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/login.html'));
});

app.get('/logout', (req, res) => {
    delete req.session.username;
    req.session.save(()=>{
        res.redirect('/');
    })
});

app.post('/login', async (req, res) => {
    const db = await pool.getConnection();
    try {
        username = req.body.username;
        password = req.body.password;
        const [result] = await db.query('select * from users where username = ? AND password = ?',[username, password]);
        if (result.length > 0) {
            req.session.username = username;
            req.session.save(()=>{
                res.json("yes");
            })
        } else {
            res.json("no");
        }
    } catch(err) {
        console.log(err)
    } finally {
        db.release();
    }
})


app.get('/post/:id', async (req, res) => {
    const db = await pool.getConnection();
    try {
        const [post_inform] = await db.query('SELECT * FROM posts WHERE id = ?', [req.params.id]);
        res.render("post", {
            name: req.session.username,
            title: post_inform[0].title,
            price: post_inform[0].price,  // z'peice' 오타 수정
            content: post_inform[0].content,
            we : post_inform[0].위치,
            post : req.params.id
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    } finally {
        db.release();
    }
});

app.get('/write_post', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/write.html'));
})

app.post('/write_post', async (req, res) => {
    const db = await pool.getConnection();
    try {
        await db.query('insert into posts (title, payment, price, content, 위치) values(?, ?, ?, ?, ?)',
        [req.body.title,
        req.body.payment,
         req.body.price,
          req.body.b_title,
           req.body.we])
           res.redirect('/');
    } catch (err) {
        console.log(err)
    } finally {
        db.release();
    }
})


app.use(function(req, res, next) {
    res.status(404).send('not found');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
}); 

app.listen(3000, ()=>{
    console.log("server is running !");
});
