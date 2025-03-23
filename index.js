import express from "express"
// npm init -y
// npm i express
// npm i ejs


let onePost = {"title" : "daily read", "to-do": `The world seems to hold its breath as the sun paints the sky with soft hues of orange and pink. 
    A gentle breeze whispers through the branches of the trees, carrying with it the scent of damp earth and blooming flowers. 
    The rhythmic chirping of birds fills the air, a soothing melody that washes over me, washing away any lingering stress or worry. 
    I find myself pausing, taking a deep breath, and simply appreciating the quiet beauty of this moment. It's a reminder to slow down, 
    to be present, and to savor the simple joys of life, like the warmth of the sun on my skin and the gentle rustling of leaves. 
    This quiet solitude allows me to feel a sense of gratitude for the world around me and the peace within myself.`, 
                                                "time": "Mar 20, 2025, 11:11:11 PM" };
let posts = [
    {"title" : "send estimate", "to-do": "Send quote to Ben for 123 main street", "time": "Mar 20, 2025, 00:00:00 PM"},
    {"title" : "do laundry", "to-do": "do luandry tomorrow before going to work", "time": "Mar 20, 2025, 11:11:11 PM"},
    {"title" : "coming exam", "to-do": "CS311 exam is on Monday night 8pm", "time": "Mar 20, 2025, 09:47:34 PM"},
    onePost,
];
// for(let i = 0; i < 5; i++){
//     posts.push(onePost)
// } 
 
const app = express();
const port = 3000; 
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));


let name = "There";

app.get("/", (req,res)=>{
    res.render("index.ejs",{name, posts});
})

app.post("/submit", (req,res)=>{
    name = req.body["name"];
    res.redirect("/");
})  
 

app.post("/deleteTodo", (req,res)=>{
    let index = req.body["index"];
    //  console.log(index);
    posts.splice(index,1);
    res.redirect("/");
})  

app.post("/newTodo", (req,res)=>{
    let newPost = req.body["newTodo"];
    let title = req.body["title"];

    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true // Use 12-hour clock
    });

    const formattedTimestamp = formatter.format(now);

    posts.push({"title" : title, "to-do": newPost, "time": formattedTimestamp});
    res.render("index.ejs", {name, posts});
})  

app.get("/about", (req,res)=>{
    let postsSize = posts.length
    res.render("about.ejs", {postsSize});
})
app.get("/contact", (req, res)=>{
    res.render("contact.ejs");
})

app.listen(port,()=>{
    console.log(`Running on ${port}.`)
})
