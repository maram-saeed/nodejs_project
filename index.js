const express = require("express");
const mongoose = require("mongoose");
const app = express();

const Article = require("./models/Article");

mongoose.connect("mongodb+srv://maram:j8iEJoCAj6wfrS2Z@mytable.lnifnuq.mongodb.net/?retryWrites=true&w=majority&appName=myTable")
    .then(() => {
        console.log("connected sccessfully");
    }).catch((error) => {
        console.log("error when connecting with the DB", error);
    })

app.use(express.json());

/*

types of parametes:
1- path param
2- body param
3- query param

*/

// pass:j8iEJoCAj6wfrS2Z

app.get("/", (req, res) => {
    res.send("Welcome To Main Page");
});


app.get("/findSummation/:num1/:num2", (req, res) => {
    console.log(req.params.num1);
    const num1 = req.params.num1;
    const num2 = req.params.num2;
    const total = Number(num1) + Number(num2);
    res.send(`the sum is: ${total}`);
});

app.get("/sayHello/", (req, res) => {
    // const name = req.body.name;
    // console.log(name);
    // res.send(`hello ${name}`)
    // const age = req.query.age;
    // console.log(age);
    // res.send(`welcome ${req.body.name} your age is ${age}`);

    res.json({
        name: req.body.name,
        age: req.query.age
    })
});

app.get("/numbers", (req, res) => {
    let numbers = "";
    for (let i = 0; i <= 100; i++) {
        numbers += i + " - ";
    }
    // res.send(__dirname + "/views/numbers.html");
    // res.sendFile(__dirname + "/views/numbers.html");
    res.render("numbers.ejs", {
        name: "Yarooob",
        numbers: numbers
    });

});

app.put("/test", (req, res) => {
    res.send("you visited test");
});

app.delete("/testDeleting", (req, res) => {
    res.send("delete requist");
});


app.post("/addComment", (req, res) => {
    res.send("post request on add comment");
})

// Articles EndPoints
app.post("/articles", async (req, res) => {
    const newArticle = new Article();
    const articleTitle = req.body.title;
    const articleBody = req.body.body;
    const articleNumberOfLikes = req.body.numberOfLikes;

    newArticle.title = articleTitle;
    newArticle.body = articleBody;
    newArticle.numberOfLikes = articleNumberOfLikes;
    await newArticle.save();
    res.json(newArticle);
})

app.get("/articles", async (req, res) => {
    try {

        const articles = await Article.find();
        res.json(articles);
    } catch (error) {
        console.log("error not find any articles");
        res.send("error");
    }
})

app.get("/articles/:articleId", async (req, res) => {
    const id = req.params.articleId;
    try {
        const article = await Article.findById(id);
        res.json(article);

    } catch (error) {
        console.log("error while reading aricle of id: ", id);
        return res.send("error");
    }
})

app.delete("/articles/:articleId", async (req, res) => {
    const id = req.params.articleId;
    try {
        const article = await Article.findByIdAndDelete(idaa);
        res.json(article);

    } catch (error) {
        console.log("error while reading aricle of id: ", id);
        return res.json(error);
    }
})

app.get("/showArticles", async (req, res) => {
    const articles = await Article.find();
    res.render("articles.ejs", {
        allArticles: articles
    });
})

app.listen(3000, () => {
    console.log("I'm listening in port 3000");
});

