// create REFERENCE for handlebars and list (books-list)
const templateSource = document.getElementById('template-book').innerHTML;
const template = Handlebars.compile(templateSource);
const booksList = document.querySelector('.books-list');

// empty array
let favoriteBooks = [];
// console.log(template);
// console.log(booksList);

// create function render
function render() {
  // go through each element one by dataSource.books
  for (const book of dataSource.books) {
    console.log(book);
    console.log('name book: ', book.name);

    // ==== generate HTML
    const generateHTML = template(book);
    // generate DOM
    const generateDOM = utils.createDOMFromHTML(generateHTML);
    // add to HTML
    booksList.appendChild(generateDOM);
  }
}

function initActions() {
  const allBooks = booksList.querySelectorAll('.book__image');
  console.log(allBooks);
  for (const oneBook of allBooks) {
    oneBook.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const clickedElement = event.currentTarget;

      // clickedElement.classList.add('favorite');
      // console.log('Kliknięty element', clickedElement);
      const bookId = clickedElement.getAttribute('data-id');

      // console.log(bookId);
      // if (!favoriteBooks.includes(bookId)) {
      //   favoriteBooks.push(bookId);
      // }
      const isFavorite = favoriteBooks.includes(bookId);

      if (isFavorite) {
        favoriteBooks = favoriteBooks.filter(function (id) {
          return id !== bookId;
        });
        clickedElement.classList.remove('favorite');
      } else {
        favoriteBooks.push(bookId);
        clickedElement.classList.add('favorite');
      }

      console.log(bookId);
    });
  }
}

render();
initActions();
