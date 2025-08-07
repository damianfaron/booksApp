class BooksList {
  constructor() {
    this.data = [];
    this.filters = [];
    this.favoriteBooks = [];
  }

  initData() {
    this.data = dataSource.books;
  }

  getElements() {
    this.booksList = document.querySelector('.books-list');
    const templateSource = document.getElementById('template-book').innerHTML;
    this.template = Handlebars.compile(templateSource);
  }

  render() {
    for (const book of this.data) {
      // VAR RATINGWIDTH AND BGC
      book.ratingWidth = book.rating * 10;
      book.ratingBgc = this.determineRatingBgc(book.rating);

      // ==== generate HTML
      const generateHTML = this.template(book);
      // generate DOM
      const generateDOM = utils.createDOMFromHTML(generateHTML);
      // add to HTML
      this.booksList.appendChild(generateDOM);
    }
  }

  initActions() {
    const filtersForm = document.querySelector('.filters');

    this.booksList.addEventListener('dblclick', (event) => {
      event.preventDefault();

      const clickedElement = event.target.offsetParent;

      if (clickedElement.classList.contains('book__image')) {
        const bookId = clickedElement.getAttribute('data-id');
        const isFavorite = this.favoriteBooks.includes(bookId);

        if (isFavorite) {
          this.favoriteBooks = this.favoriteBooks.filter(function (id) {
            return id !== bookId;
          });
          clickedElement.classList.remove('favorite');
        } else {
          this.favoriteBooks.push(bookId);
          clickedElement.classList.add('favorite');
        }
      }
      console.log(clickedElement);
    });

    filtersForm.addEventListener('click', (event) => {
      const clickedInput = event.target;

      if (
        clickedInput.tagName === 'INPUT' &&
        clickedInput.type === 'checkbox' &&
        clickedInput.name === 'filter'
      ) {
        const value = clickedInput.value;
        const isChecked = clickedInput.checked;

        if (isChecked) {
          this.filters.push(value);
        } else {
          const index = this.filters.indexOf(value);

          if (index !== -1) {
            this.filters.splice(index, 1);
          }
        }
        console.log(isChecked);
      }
      this.filterBooks();
    });
  }

  filterBooks() {
    for (const oneElement of this.data) {
      let sholdBeHidden = false;
      for (const filter of this.filters) {
        if (!oneElement.details[filter]) {
          sholdBeHidden = true;
          break;
        }
      }
      const bookImage = document.querySelector(
        '.book__image[data-id="' + oneElement.id + '"]'
      );

      if (sholdBeHidden) {
        bookImage.classList.add('hidden');
      } else {
        bookImage.classList.remove('hidden');
      }
    }
  }

  determineRatingBgc(rating) {
    if (rating < 6) {
      return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      return 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      return 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
    }
  }

  init() {
    this.initData();
    this.getElements();
    this.render();
    this.initActions();
  }
}

const app = new BooksList();
app.init();

// // create REFERENCE for handlebars and list (books-list)
// const templateSource = document.getElementById('template-book').innerHTML;
// const template = Handlebars.compile(templateSource);
// const booksList = document.querySelector('.books-list');

// // empty array
// let favoriteBooks = [];
// // console.log(template);
// // console.log(booksList);

// // create function render
// function render() {
//   // go through each element one by dataSource.books
//   for (const book of dataSource.books) {
//     // console.log(book);
//     // console.log('name book: ', book.name);
//     // VAR RATINGWIDTH AND BGC
//     // -========================================================
//     book.ratingWidth = book.rating * 10;
//     book.ratingBgc = determineRatingBgc(book.rating);

//     // ==== generate HTML
//     const generateHTML = template(book);
//     // generate DOM
//     const generateDOM = utils.createDOMFromHTML(generateHTML);
//     // add to HTML
//     booksList.appendChild(generateDOM);
//   }
// }
// const filters = [];
// function initActions() {
//   const filtersForm = document.querySelector('.filters');
//   // 5 addEvent lister
//   // const allBooks = booksList.querySelectorAll('.book__image');
//   // console.log(allBooks);
//   // for (const oneBook of allBooks) {
//   //   oneBook.addEventListener('dblclick', function (event) {
//   //     event.preventDefault();
//   //     const clickedElement = event.parentElement;
//   //     console.log(clickedElement);
//   //     const bookId = clickedElement.getAttribute('data-id');
//   //     // console.log(bookId);
//   //     // if (!favoriteBooks.includes(bookId)) {
//   //     //   favoriteBooks.push(bookId);
//   //     // }
//   //     const isFavorite = favoriteBooks.includes(bookId);
//   //     if (isFavorite) {
//   //       favoriteBooks = favoriteBooks.filter(function (id) {
//   //         return id !== bookId;
//   //       });
//   //       clickedElement.classList.remove('favorite');
//   //     } else {
//   //       favoriteBooks.push(bookId);
//   //       clickedElement.classList.add('favorite');
//   //     }
//   //     // console.log(bookId);
//   //   });
//   // }
//   // for only one items listener

//   booksList.addEventListener('dblclick', function (event) {
//     event.preventDefault();

//     const clickedElement = event.target.offsetParent;

//     if (clickedElement.classList.contains('book__image')) {
//       const bookId = clickedElement.getAttribute('data-id');
//       const isFavorite = favoriteBooks.includes(bookId);

//       if (isFavorite) {
//         favoriteBooks = favoriteBooks.filter(function (id) {
//           return id !== bookId;
//         });
//         clickedElement.classList.remove('favorite');
//       } else {
//         favoriteBooks.push(bookId);
//         clickedElement.classList.add('favorite');
//       }
//     }
//     console.log(clickedElement);
//   });
//   filtersForm.addEventListener('click', function (event) {
//     const clickedInput = event.target;

//     if (
//       clickedInput.tagName === 'INPUT' &&
//       clickedInput.type === 'checkbox' &&
//       clickedInput.name === 'filter'
//     ) {
//       const value = clickedInput.value;
//       const isChecked = clickedInput.checked;

//       if (isChecked) {
//         filters.push(value);
//       } else {
//         const index = filters.indexOf(value);

//         if (index !== -1) {
//           filters.splice(index, 1);
//         }
//       }
//       console.log(isChecked);
//     }
//     filterBooks();
//   });
// }

// function filterBooks() {
//   for (const oneElement of dataSource.books) {
//     let sholdBeHidden = false;
//     // console.log(oneElement);
//     for (const filter of filters) {
//       if (!oneElement.details[filter]) {
//         sholdBeHidden = true;
//         break;
//       }
//     }
//     const bookImage = document.querySelector(
//       '.book__image[data-id="' + oneElement.id + '"]'
//     );

//     if (sholdBeHidden) {
//       bookImage.classList.add('hidden');
//     } else {
//       bookImage.classList.remove('hidden');
//     }
//   }
// }

// function determineRatingBgc(rating) {
//   if (rating < 6) {
//     return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
//   } else if (rating > 6 && rating <= 8) {
//     return 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
//   } else if (rating > 8 && rating <= 9) {
//     return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
//   } else if (rating > 9) {
//     return 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
//   }
// }

// render();
// initActions();
