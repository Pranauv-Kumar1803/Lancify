require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const crypto = require('crypto');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");

const Seller = require("./models/Seller");
const User = require("./models/User");
const Service = require("./models/Service");
const Comment = require("./models/Comment");
const Discussion = require("./models/Discussion");

const authRouter = require('./routes/authRouter');
const appRouter = require('./routes/appRouter');
const domainRouter = require('./routes/domainRouter');
const forumRouter = require('./routes/forumRouter');
const verifyCookie = require("./verifyCookie");

const app = express();



// middleware
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false, limit: '300mb' }));
app.use(bodyParser.json({ limit: '300mb' }));
app.use(express.urlencoded({ extended: true, limit: '300mb' }));
app.use(express.json({ limit: '3000mb' }));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(cors({
	origin: ["http://localhost:3000"],
	methods: ['POST', 'GET', 'HEAD', 'PUT', 'DELETE'],
	credentials: true
}))

app.use((req,res,next)=>{
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	next();
})
// routes
app.use('/domains', domainRouter);
app.use('/auth', authRouter);
app.use('/forum', forumRouter);

// protected routes
app.use('/app',verifyCookie,appRouter);


// main
app.get("/", (req, res) => {
	if (req.cookies.user) {
		return res.render("pages/home", { loggedIn: true });
	}
	res.render('pages/homepage', { loggedIn: false });
});

app.get('/blogs', (req, res) => {
	if (!req.cookies.user) {
		res.render('pages/blog', { login: false });
	}
	res.render('pages/blog', { login: true });
})

app.get("/product", (req, res) => {
	if (!req.cookies.user) {
		res.render('pages/product', { login: false });
	}
	res.render("pages/product", { login: true });
});

app.get('/community-hub', (req, res) => {
	if (!req.cookies.user) {
		res.render('pages/community', { login: false });
	}
	res.render('pages/community', { login: true });
})

app.get('/domain', (req, res) => {
	if (!req.cookies.user) {
		res.render('pages/domain', { login: false });
	}
	res.render('pages/domain', { login: true })
})

app.post('/discussions',async(req,res)=>{
	console.log(req.body);

	console.log(req.cookies.user);

	const user = await User.findOne({user_id: req.cookies.user});

	if(!user)
	{
		return res.status(404).json({msg:'user not found!'});
	}

	console.log(user._id,typeof user._id);

	const d = await new Discussion({
		discussion: req.body.msg,
		forum: req.body.forum,
		time: new Date(),
		user_name: user.username,
		user_img: user.user_img,
		user_id: user._id
	});
	const r = await d.save();

	const id = new mongoose.Types.ObjectId();
	const c = new Comment({
		_id: id,
		discussion_id: d._id,
		parents: [id],
	})

	await c.save();

	return res.status(201).json(r);
})


app.get('/discussions/:id', async (req, res) => {
	const id = req.params.id;
	// const docs = await Comment.find({$expr: {$gte: [{$size: "$parents"}, 2]}}).populate('parents').sort({'time':1});
	const docs = await Comment.find( {"$expr":{$gt:[{$size:"$parents"},0]}, discussion_id: new mongoose.Types.ObjectId(id)} ).populate('parents').populate('discussion_id').sort({'time':1});
	// console.log(docs);
	
	let dis = [];
	let final = [];
	let c = 0;
	let b = true;
	docs.forEach((e)=>{
		if(e.parents.length < 1) {
			b = false;
		}
	})
	
	if(b) {
		let len = 0;
		let arr = docs.map(doc => {
			// console.log(doc.user_name, doc.comment);
			dis = doc.discussion_id;
			let obj = {}
			let r = obj;
			let count = 0;
			doc.parents.forEach(ele => {
				obj['comment'] = ele.comment;
				obj['user'] = {name: doc.user_name, image: doc.user_img}
				obj['time'] = ele.time;
				count++;
				obj['forum'] = ele.forum;
				obj['next'] = {}
				obj = obj['next'];
			})
			r.level = count;
			r.id = doc.parents[0]._id;
			return r;
		})
	
		// console.log(arr);
		
		let check = {};
		
		arr.forEach(a=>{
			if( Object.keys(check) && !Object.keys(check).includes(a.id))
			{
				check[`${a.id}`] = a.level;
			}
			else 
			{
				check[`${a.id}`] = Math.max(check[`${a.id}`] , a.level);
			}
		})
	
		// console.log('before check');
		// console.log(check);
	
		// console.log(check);
		// console.log(arr);
	
		final = arr.map(each=>{
			if(each.level === check[`${each.id}`])
			{
				return each;
			}
		})
	
		// console.log(final);
	
		final.forEach((f)=>{
			if(f!==undefined) {
				len++;
			}
		})
	
		c = len;
	}
	else {
		dis = docs[0].discussion_id;
		final = [];
	}
	
	res.render('pages/discussions',{discussions: final, dis: dis, length: c , start_margin: 2});
})


app.get("/*", (req, res) => {
	res.render("pages/error", { data: 'Page Not Found' });
});


app.get("/users", async (req, res) => {
    const data = await db.getAllUser();
    // console.log(data);
    return res.json(data.data);
});

app.get("/users/:email", async (req, res) => {
    const data = await db.getSomeUser(req.params.email);
    // console.log(data);
    return res.json(data.data);
});


mongoose.connect('mongodb+srv://lancify:1CeOEWH8wfnKgWVU@cluster0.hripjgl.mongodb.net/Lancify?retryWrites=true&w=majority', () => {
	app.listen(5500, () => {
		console.log("connected to mongodb and server started in port 5500");
	});
})
