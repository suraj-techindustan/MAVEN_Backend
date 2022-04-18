const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    
    title: { type: String },
    pageCount: { type: Number },
    publishedDate: { type: Date },
    thumbnailUrl: { type: String },
    shortDescription: { type: String },
    longDescription: { type: String },
    status: { type: String },
    authors: { type: Array },
    categories: { type: Array },

})



const Book = mongoose.model('Books',bookSchema)


exports.Book = Book