function Book(title, author,isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}

function UI() {
}
UI.prototype.addBookToList = function (book) {
	const list = document.getElementById('book-list');
	const row = document.createElement('tr');

	row.innerHTML = `<td>${book.title}</td>
					 <td>${book.author}</td>
					 <td>${book.isbn}</td>
					 <td><a href="#" class="delete">X</a></td>`
	list.appendChild(row);
}

UI.prototype.clearFields = function() {
	document.getElementById('title').value = '';
	document.getElementById('author').value= '';
	document.getElementById('isbn').value = '';
};

UI.prototype.deleteBook = function(target) {
	if(target.className === 'delete'){
		console.log();
		const title = target.parentElement.parentElement.children[0].innerHTML;
		const isbn = target.parentElement.parentElement.children[2].innerHTML;
		target.parentElement.parentElement.remove();
		const ui = new UI();
		const store = new Store();
		store.removeBook(isbn);
		ui.showAlert(`book ${title} is removed`,"success");
	}
};

UI.prototype.showAlert = function(msg,className) {
	const div = document.createElement('div');
	div.className = `alert ${className}`;
	div.appendChild(document.createTextNode(msg));
	const container = document.querySelector(".container")
	const form = document.getElementById('book-form');
	container.insertBefore(div,form);
	setTimeout(function () {
		div.remove();
	},1000);
};

function Store(){}
Store.prototype.getBooks = function() {
	let books;
	if(localStorage.getItem('books') === null){
		books = [];
	}else{
		books = JSON.parse(localStorage.getItem('books'));
	}
	return books;
};

Store.prototype.addBook= function(book) {
	const store = new Store();

	const books = store.getBooks();
	books.push(book);
	localStorage.setItem('books',JSON.stringify(books)); 
};

Store.prototype.displayBooks = function (){
	const store = new Store();
	const books = store.getBooks();
	books.forEach(function (book) {
		const ui = new UI();
		ui.addBookToList(book);
	})
}
Store.prototype.removeBook = function(isbn) {
	const store = new Store();
	const books = store.getBooks();
	const newBooks = [];
	books.forEach(function(book){
		if(book.isbn != isbn){
			newBooks.push(book);
		}
	})
	localStorage.setItem('books',JSON.stringify(newBooks));
};
document.getElementById('book-form').addEventListener('submit',
	function (e) {
		const title = document.getElementById('title').value,
			  author = document.getElementById('author').value,
			  isbn = document.getElementById('isbn').value;
		const book = new Book(title,author,isbn);
		const ui = new UI();

		if(title === '' || author === '' || isbn === ''){
			ui.showAlert('Please Fill all Fields','error');
		}else{
			const store = new Store();
			ui.addBookToList(book);
			store.addBook(book);
			ui.showAlert('Book is added','success');
			ui.clearFields();
		}
		e.preventDefault();
	});

document.getElementById('book-list').addEventListener('click',function (e) {
	const ui = new UI();
	ui.deleteBook(e.target);

	e.preventDefault();
})

document.addEventListener('DOMContentLoaded',function (e) {
	const store = new Store();
	store.displayBooks();
})

// class Book{
// 	constructor(title,author,isbn){
// 		this.title = title;
// 		this.author = author;
// 		this.isbn = isbn;
// 	}
// }

// class UI{
// 	addBookToList(book){

// 	}
// 	deleteBook(target){

// 	}
// 	clearFields(){

// 	}

// 	showAlert(msg,className){

// 	}
// }