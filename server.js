require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const db = require("./sqlite/config");
const domainRouter = require("./routes/domainRouter");
const crypto = require("crypto");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// middleware
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false, limit: "250mb" }));
app.use(bodyParser.json({ limit: "250mb" }));
app.use(express.urlencoded({ extended: true, limit: "250mb" }));
app.use(express.json({ limit: "250mb" }));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["POST", "GET", "HEAD", "PUT", "DELETE"],
        credentials: true
    })
);

// routes
app.use("/domains", domainRouter);

// /domains/amritansh
// main
app.get("/", (req, res) => {
    if (req.cookies.user) {
        return res.render("homepage", { loggedIn: true });
    }
    res.render("homepage", { loggedIn: false });
});

app.get("/logout", (req, res) => {
    res.clearCookie("user");
    res.redirect("/");
});

app.get("/home", (req, res) => {
    res.render("home");
});

app.get("/community-hub", (req, res) => {
    if (!req.cookies.user) {
        return res.render("error", { data: "Page Not Found" });
    }
    res.render("community", { login: true });
});

app.get("/profile", (req, res) => {
    if (!req.cookies.user) {
        return res.render("error", { data: "Page Not Found" });
    }
    console.log(req.cookies.user);
    //here i should get the data from the db of the user who is logged in
    res.render("dash");
});

app.get("/domain", (req, res) => {
    if (!req.cookies.user) {
        return res.render("error", { data: "Page Not Found" });
    }
    res.render("domain", { login: true });
});

app.get("/domains", (req, res) => {
    if (!req.cookies.user) {
        return res.render("error", { data: "Page Not Found" });
    }
    res.render("domains", { login: true });
});

app.get("/product", (req, res) => {
    if (!req.cookies.user) {
        return res.render("error", { data: "Page Not Found" });
    }
    res.render("product", { login: true });
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    if (!req.cookies.user) {
        return res.render("error", { data: "Page Not Found" });
    }
    res.render("register_seller", { login: true });
});

app.get("/create-gig", (req, res) => {
    if (!req.cookies.user) {
        return res.render("error", { data: "Page Not Found" });
    }
    res.render("createGig", { login: true });
});

app.get("/blogs", (req, res) => {
    if (!req.cookies.user) {
        return res.render("error", { data: "Page Not Found" });
    }
    res.render("blog", { login: true });
});

app.post("/register_seller", async (req, res) => {
    if (!req.cookies.user) {
        return res.render("error", { data: "Page Not Found" });
    }
    try {
        const result = await db.insertSeller(req.body);
        console.log(result.data);

        return res.status(201).json(result.data);
    } catch (err) {
        return res.status(400).json({ message: "some error occured" });
    }
});

app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const re = await db.getSomeUser(email);
        const user = re.data[0];
        console.log(user);

        if (user) {
            if (password !== user.password) {
                return res
                    .status(400)
                    .json({ message: "password not matching" });
            } else {
                res.cookie("user", user.user_id, {
                    maxAge: 60 * 60 * 1000
                });
                return res.status(200).json(user);
            }
        } else {
            return res.status(404).json({ message: "user not found" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
});

app.get("/preview-gig", (req, res) => {
    if (!req.cookies.user) {
        return res.render("error", { data: "Page Not Found" });
    }
    res.render("preview_gig", { login: true });
});

app.post("/register", async (req, res) => {
    const name = req.body?.name;
    const email = req.body?.email;
    const password = req.body?.password;
    const uuid = crypto.randomUUID();
    const obj = { name, email, password, uuid };
    console.log(obj);

    try {
        const re = await db.getSomeUser(email);
        console.log(re);
        const user = re.data[0];

        if (!user) {
            const r = await db.insertUser(obj);
            return res
                .status(201)
                .json({ message: "sign up successful", data: r.data });
        } else {
            return res.status(401).json({ error: "user already exists" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
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

app.get("/*", (req, res) => {
    res.render("error", { data: "Page Not Found" });
});

db.initializedb().then(() => {
    app.listen(5500, () => {
        console.log("connected to sqlite db and server started in port 5500");
    });
});
