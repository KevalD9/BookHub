const express = require("express");
const router = express.Router();
const Books = require("../models/bookModel");


//Route - 1 => Get all the books using : GET "http://localhost:3000/api/books/fetchallbooks". Login Required

router.get("/fetchallbooks", async (req, res) => {
    try{
        const books = await Books.find({});
        return res.status(200).json({
            count : books.length, 
            data : books});
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});

//Route - 2 => Get one book using id : GET "http://localhost:3000/api/books/fetchonebook/id". Login Required

router.get("/fetchonebook/:id", async (req, res) => {
    const { id } = req.params;
    try{
        const book = await Books.findById(id);
        return res.status(200).json(book);
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});

//Route - 3 => Add book for login User using : POST "http://localhost:3000/api/books/addbook". Login Required

router.post("/addbook", async (req, res) => {
    const { title, author, publishYear } = req.body;

    try {
        if(!title || !author || !publishYear){
            return res.status(400).json({ message : "Input All Required Fields." });
        }

        const book = new Books({ title, author, publishYear });
        const savedBook = await book.save();
        return res.status(201).json({ "Success": "Saved Sucessfully." , Data : savedBook});
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error : error.message });
    }
});

//Route - 4 => Update an existing book for login User using : PUT "http://localhost:3000/api/books/updatebook/:id". Login Required
router.put("/updatebook/:id", async (req, res ) => {
    const { id } = req.params;
    const { title, author, publishYear } = req.body;
    try {
        //Create a new note object
        const newBook = {};
        if(title){newBook.title = title }; 
        if(author){newBook.author = author };
        if(publishYear){newBook.publishYear = publishYear };

        //Find the book to be update and update it
        let book = await Books.findById(id);
        if(!book){ return  res.status(404).json({ message: "No Book Found"})};

        book = await Books.findByIdAndUpdate( id, {$set: newBook }, {new:true});
        return res.status(200).json({ "Success": "Updated Sucessfully." , Data : book});

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error : error.message });
        
    }
});

//Route - 5 => Delete an existing note for User using : DEETE "http://localhost:3000/api/books/deletebook/:id". Login Required
router.delete("/deletebook/:id", async (req, res) => {

    const { id } = req.params;

    try{
        let book = await Books.findById(id);
        if(!book){ return  res.status(404).json({ message: "No Book Found"})};

        book = await Books.findByIdAndDelete(id);
        return res.status(200).json({ "Success": "Deleted Sucessfully." , Data : book});
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;