var express = require('express');
var router = express.Router();
//1.Імпортували модуль
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/storedb", { useNewUrlParser: true });

const Schema = mongoose.Schema;
const ingredientScheme = new Schema({
    title: String,
    price: Number    
});

const Ingredient = mongoose.model("Ingredient", ingredientScheme);

router.get('/', function(req, res, next) {
    Ingredient.find({}, function(err, docs){
      if(err) return res.status(500).json({err:{msg:"Fetch faild!"}})

      res.render('index', { title: 'Express',page:'ingredients-list', ingredients:docs }); 
      
  });

});

router.get('/add', function(req, res, next) {

    const ingredient = new Ingredient({
      title: req.query.title ,
      price: req.query.price  
    });
    ingredient.save(function(err, prod){
      if(err) return res.status(500).json({err:{msg:"Saving faild!"}})
      res.redirect('/ingredients')
    });
});

router.get('/addform', function(req, res, next) {
  res.render('index', { title: 'Express',page:'add-form' });
});



router.get('/delete/:id', function(req, res, next) {

  Ingredient.findOneAndDelete({_id:req.params.id}, function(err, doc){
    
    if(err) return res.status(500).json({err:{msg:"Deleting faild!"}})
    res.redirect('/ingredients')
  });

});

module.exports = router;