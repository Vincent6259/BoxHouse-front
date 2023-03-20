const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.resolve(__dirname+'/app')));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "app", "index.html"));
});
app.use(function(req,res,next){
  res.send('OUPS VOUS VOUS ÊTES ÉGARÉ')
})

app.listen( 1282, () => console.log("Server start on port 1282"));
