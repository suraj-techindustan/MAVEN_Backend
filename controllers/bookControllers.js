const { Book } = require('../Models/books')
const asyncMiddleWare = require('../middleware/async')



exports.addBooks =  asyncMiddleWare(async(req, res) => {

    try {
       
        const books = {title='', pageCount='', thumbnailUrl='', shortDescription='', longDescription='', status='', authors='', categories='' } = req.body || {}
        if(!title)res.status(400).send({message : "Please Enter Title"})
        if(!authors)res.status(400).send({message : "Please Enter Author Name"})

        const newBooks = new Book({
            title,
            pageCount,
            thumbnailUrl,
            shortDescription,
            longDescription,
            status,
            authors,
            categories
        })
        await newBooks.save()
        res.status(200).send({ message: "Book Added Sucessfully", value: newBooks })

    } catch (ex) {
        res.status(400).send({ message: ex.message || 'Something Went Wrong' })

    }

})

exports.allBooks=asyncMiddleWare(async(req,res)=>{



const showBooks = await Book.find().limit(21)
const bookTitle = showBooks.title

return res.status(200).send({message : "All Books" , value : showBooks})


})

//  getBook router is not done (search by word or some better find method is still needed)
 
exports.getBook=asyncMiddleWare(async(req,res)=>{
 
 
       const {title} = req.body
       if(!title) return res.status(400).send({message : "Please Enter Book Name"})
 
       const bookName = await Book.find({
           title : req.body.title ,categories : req.body.categories
       })
       if(!bookName) return res.status(400).send({message : "Book Not Exist"})
 
       return res.status(200).send({message : "Your Book" , value : bookName })
 
 
 
})



exports.singleBook = asyncMiddleWare(async(req,res)=>{

let bookName = req.body.title  

const showBook = await Book.findOne({bookName})
// if(!showBook) return res.status(400).send({message : "No book Found"})
return res.status(200).send({message : "Book Details" , value : {title : showBook.title ,pageCount: showBook.pageCount ,isbn: showBook.isbn ,publishedDate:showBook.publishedDate ,shortDescription:showBook.shortDescription }})

})
