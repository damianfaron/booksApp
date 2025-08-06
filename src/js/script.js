// create REFERENCE for handlebars and list (books-list)
const templateSource = document.getElementById('template-book').innerHTML;
const template = Handlebars.compile(templateSource);
const booksList = document.querySelector('.books-list');

// console.log(template);
// console.log(booksList);

// create function render
function render() {
  // go through each element one by dataSource.books
  for (const book of dataSource.books) {
    console.log(book);
    console.log('nazwa ksiąski: ', book.name);

    // ==== generate HTML
    const generateHTML = template(book);
    // generate DOM
    const generateDOM = utils.createDOMFromHTML(generateHTML);
    // add to HTML
    booksList.appendChild(generateDOM);
  }
}

render();
