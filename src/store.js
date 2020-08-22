import starburst from './images/starburst.png';

let bookmarks = [];
let error = null;
const adding = false;
const showRating = 1;
let stars = [
  `<img class="stars" src="${starburst}" alt="A star icon.">`,
  `<img class="stars" src="${starburst}" alt="A star icon."><img class="stars" src="${starburst}" alt="A star icon.">`,
  `<img class="stars" src="${starburst}" alt="A star icon."><img class="stars" src="${starburst}" alt="A star icon."><img class="stars" src="${starburst}" alt="A star icon.">`,
  `<img class="stars" src="${starburst}" alt="A star icon."><img class="stars" src="${starburst}" alt="A star icon."><img class="stars" src="${starburst}" alt="A star icon."><img class="stars" src="${starburst}" alt="A star icon.">`,
  `<img class="stars" src="${starburst}" alt="A star icon."><img class="stars" src="${starburst}" alt="A star icon."><img class="stars" src="${starburst}" alt="A star icon."><img class="stars" src="${starburst}" alt="A star icon."><img class="stars" src="${starburst}" alt="A star icon.">`,
];

const addBookmarkToStore = function (bookmark) {
  this.bookmarks.push(bookmark);
};

const findById = function (id) {
  return bookmarks.find((bookmark) => id === bookmark.id);
};

const updateBookmarkToStore = function (id, newBookmark) {
  let currentBookmark = findById(id);
  return Object.assign(currentBookmark, newBookmark);
};

const deleteBookmarkFromStore = function (id) {
  let bookmarkIndex = bookmarks.findIndex(
    (bookmark) => bookmark.id === id
  );
  bookmarks.splice(bookmarkIndex, 1);
};

const setError = function (error) {
  this.error = error;
};

export default {
  stars,
  bookmarks,
  adding,
  showRating,
  error,
  setError,
  addBookmarkToStore,
  findById,
  updateBookmarkToStore,
  deleteBookmarkFromStore,
};
