const router = require('express').Router();
let Book = require('../models/booklist.model');
//route get /
//description get all books
router.route('/').get((req, res) => {
  Book.find()
    .then((books) => res.json(books))
    .catch((err) => res.status(400).json('Error: ' + err));
});
//route get /:id
//description get single books by id
router.route('/:id').get((req, res) => {
  console.log('just single id:' + req.params.id);
  Book.findById(req.params.id)
    .then((book) => res.json(book))
    .catch((err) => res.status(400).json('Error: ' + err));
});
//route post /
//description add/save book
router.route('/').post(async (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;
  const pages = req.body.pages;
  
  const newBook = await new Book({
    title,
    author,
    description,
    pages
    
  });

  console.log(newBook);

  newBook
    .save()
    .then(() => res.json('New book added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

//route post /:id
//description update book by id
router.route('/:id').post(async (req, res) => { 
  console.log(req.params.id);

  await  Book.findById(req.params.id)
    .then((bookToEdit) => {
        bookToEdit.title = req.body.title;
        bookToEdit.author = req.body.author;
        bookToEdit.description = req.body.description;
        bookToEdit.pages = req.body.pages;
       

        bookToEdit
            .save()
            .then(() => res.json('Book updated!'))
            .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

//route Delete /:id
//description delete book by id
router.route('/:id').delete(async (req, res) => {
  console.log(' Book deleted');
    
  await Book.findByIdAndDelete(req.params.id)
    .then(() => res.json('Book deleted!'))
    .catch((err) => res.status(400).json('Error: Page Not Found/Server Error' + err));
});

module.exports = router;
