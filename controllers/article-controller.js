const model= require('../models');
const express=require('express')
const articleController=express.Router()

articleController.post= (req, res) => {
    const {title, content} = req.body;
    console.log(req.body)

    const article = new model.Article({
        title,
        content
    });

    article.save(err=>{
        if(err)
            res.status(500).json({
                message: {
                    msgBody:"Error",
                    msgError: true
                }})
        else
            res.status(201).json({
                message: {
                    msgBody: "Articolul a fost creat cu succes",
                    msgError: false
                }
            })
        
    })
}
    

articleController.get=(req, res) => {
    model.Article.find({})
        .then((articles) => {
            return res.status(200).json({
                succes: true,
                data: articles
            });
        })
        .catch((err) => {
            return res.status(500).json({
                message: err
            });
        })
}

articleController.delete= (req, res)=>{
    const clickedItemId=req.body.deleteButton
    model.Article.findByIdAndDelete(clickedItemId, err=>{
        if(err)
            res.status(500).json({message:{
                msgBody: "Unable to delete the article",
                msgError: true
            }})
        else{
            res.status(200).json({message:{
                msgBody: "Successfully deleted the article",
                msgError: false
            }})
            
        //res.render('/admin/articles')
        }

    })
    
}


module.exports=articleController