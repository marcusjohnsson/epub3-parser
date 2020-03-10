var epubParser = require('../lib/epub-parser');
const fetch = require("../node_modules/node-fetch");

var epubFullPath = "/Users/marcus/Projects/epub3-parser/example/6.epub";

epubParser.open(epubFullPath, function (err, epubData) {
	////////////////////////////////////////////////////////////////////
	let title = epubData.raw.json.opf.metadata[0]['dc:title'][0]._
	let author = epubData.raw.json.opf.metadata[0]['dc:creator'][0]._
	let ISBN = epubData.easy.primaryID.value;
	let epubVersion = epubData.easy.epubVersion;
	let isEpub3 = epubData.easy.isEpub3;
	//////////////////////////////////////////////////////////////////////
	let bookMeta = {}

	if(isEpub3){
		bookMeta.ISBN = ISBN;
		bookMeta.title = title;
		bookMeta.author = author;
		bookMeta.epubVersion = epubVersion

		let googleBooksUrl = "https://www.googleapis.com/books/v1/volumes?q=isbn:"+bookMeta.ISBN;

		var bookInfo = fetch(googleBooksUrl).then(Response => {
			return Response.json();
		}).then(book => {
			return book;
		});
		
		console.log(bookMeta.ISBN);
		bookInfo.then((theBook ) => {
			console.log("Title:",theBook.items[0].volumeInfo.title);
			console.log("Author:",theBook.items[0].volumeInfo.authors[0]);
		});

	}else{
		console.log('Not an EPUB.v3 file')
	}
	//if(err) return console.log(err);
});