import $ from 'jquery';

import api from './api';
import store from './store';
import bookmarkOpen from './images/bookmarkClosed.png';
import bookmarkClosed from './images/bookmarkOpen.png'; 
import book from './images/book.png';

/////////////////////////////
///Generate HTML Functions///
/////////////////////////////

const generateBookmarkList = function (bookmark) {
  if (bookmark.rating >= store.showRating) {
    if (bookmark.editing === true) {
      let isChecked = findChecked(bookmark.rating);
      return `
      <div class="bookmark">
        <section class='edit-form'>
          <form action='#' id='saveNewBookmark'>
            <div class="bookmark-in-list" data-bookmark-id="${bookmark.id}">
                <input class='edit-title' name='title' autofocus required value='${bookmark.title}' placeholder='${bookmark.title}...'></input>
              <div class='edi-cancel-button'>
                <button id='edit-cancel' class='cancel editButtons'>X</button>
              </div>
            </div>
            <div class="dropdown-content">
              <p><b>Vist:</b><input type='url' name='url' id='url' required value='${bookmark.url}' placeholder='${bookmark.url}'></input></p>
              <p><b>Description:</b><textarea minlength='1' name='desc' id='desc' placeholder='${bookmark.desc}'>${bookmark.desc}</textarea></p>
            <section class='ratings-container'>
              <div class="rating">
              <label>
                <input type="radio" name="rating" value="1" ${isChecked[0]}/>
                <span class="icon">★</span>
              </label>
              <label>
                <input type="radio" name="rating" value="2" ${isChecked[1]}/>
                <span class="icon">★</span>
                <span class="icon">★</span>
              </label>
              <label>
                <input type="radio" name="rating" value="3" ${isChecked[2]}/>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>   
              </label>
              <label>
                <input type="radio" name="rating" value="4" ${isChecked[3]}/>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
              </label>
              <label>
                <input type="radio" name="rating" value="5" ${isChecked[4]}/>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
              </label>
            </section>
            </div>
              <div class='buttons-container'>
                <button  id='save' class='save editButtons' type='submit'>Save</button> | <button class='editButtons' id='delete'>Delete</button><br/>
              </div>
            </div>
          </form>
        </section>
      </div>`;
    } else if (bookmark.expanded === false) {
      return `
      <li class="bookmark">
        <div class="bookmark-in-list" data-bookmark-id="${bookmark.id}">
          <img src='${bookmarkOpen}' class='banner-image' alt='A tiny book.'><span class='title-button' tabindex='0'><span class='title-size'>${bookmark.title}</span></span><span class='title-rating'>${store.stars[bookmark.rating - 1]}</span>
        </div>
      </li>`;
    } else {
      return `
      <li class="bookmark">
        <div class="bookmark-in-list" data-bookmark-id="${bookmark.id}">
          <img src='${bookmarkClosed}' class='banner-image' alt='A tiny book.'><span class='title-button' tabindex='0'><span class='title-size'>${bookmark.title}</span></span><span class='title-rating'>${store.stars[bookmark.rating - 1]}</span>
        </div>
        <div class="dropdown-content">
          <span class='dropdown-text'>Vist: </h3></span><a href='${bookmark.url}' target='_blank'>${bookmark.title}</a><br><br>
          <span class='dropdown-text'>Description: </span>${bookmark.desc}<br><br>
          <div><button class='editButtons' id='edit'>Edit</button><button class='editButtons' id='delete'>Delete</button>
          </div>
        </div>
      </li>`;
    }
  }
};

const generateAddForm = function () {
  return `
  <section class='create-form'>
  <div class='cancel-button'>
    <button id='cancel' class='cancel editButtons'>X</button>
  </div>
    <form class='newBookmark' id='newBookmark'>
      <label for='title'><b>Title: </b></label>
      <input type='text' maxlength='10' name='title' id='title' required></input><br><br>
      <label for='url'><b>Url: </b></label>
      <input type='url' name='url' id='url' required></input><br><br>
      <label for='desc'>Description: </label><br>
      <textarea name='desc' id='desc'></textarea><br><br>
    <section class='ratings-container'>
      <div class="rating">
        <label>
          <input type="radio" name="rating" value="1" checked='checked'/>
          <span class="icon">★</span>
        </label>
        <label>
          <input type="radio" name="rating" value="2" />
          <span class="icon">★</span>
          <span class="icon">★</span>
        </label>
        <label>
          <input type="radio" name="rating" value="3" />
          <span class="icon">★</span>
          <span class="icon">★</span>
          <span class="icon">★</span>   
        </label>
        <label>
          <input type="radio" name="rating" value="4" />
          <span class="icon">★</span>
          <span class="icon">★</span>
          <span class="icon">★</span>
          <span class="icon">★</span>
        </label>
        <label>
          <input type="radio" name="rating" value="5" />
          <span class="icon">★</span>
          <span class="icon">★</span>
          <span class="icon">★</span>
          <span class="icon">★</span>
          <span class="icon">★</span>
        </label>
      </section>
      </div>  
      <center><button type='submit' id='go' class='go editButtons'>Submit</button></center>
    </form>
  </section>`;
};

const generateBookmarkString = function (bookmarks) {
  const listOfBookmarks = bookmarks.map((bookmark) =>
    generateBookmarkList(bookmark)
  );
  return listOfBookmarks.join('');
};

const generateMain = function() {
  return `
  <div class='error-message hidden'></div>
    <div class='brilliant-bookmarks-container'>
      <span class='logo'>
        <img src='${book}' alt='A tiny book with a bookmark icon.' style='width: 30%;'>
        <span class='yellow'>Brilliant</span> Bookmarks
      </span>
      </div>
      <div class='top-bar'>
        <h2>My Bookmarks</h2>
        <select aria-label="Ratings Filter" name="ratings" id="ratings">
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1" selected>View All</option>
        </select>
      </div>
      <div class='main-bookmark-container'>
        <ul class='current-bookmarks'>
        </div>
      </ul>
      <div class='new-button-container'>
        <button class='newButton' id='new'>New</button>
    </div>`;
};

const generateError = function (message) {
  return `
        ${message}
    `;
};

///////////////
/// Render ////
///////////////

const render = function () {
  renderError();
  let bookmarks = [...store.bookmarks];
  if (store.adding === false) {
    const bookmarkString = generateBookmarkString(bookmarks);
    $('.current-bookmarks').html(bookmarkString);
  } else {
    $('.current-bookmarks').html(generateAddForm());
  }
};

/// Render Error ///

const renderError = function () {
  if (store.error) {
    const el = generateError(store.error);
    $('.error-message').removeClass('hidden');
    $('.error-message').html(`
    Sorry, ${el}  <span class='cancel-button smaller'>
    <button id='error-cancel' class='cancel editButtons'>X</button>
    </span>`);
  } else {
    $('.error-message').empty();
  }
};

function findChecked(rating) {
  let checked = ['','','','',''];
  for (let i = 0; i < checked.length; i++) {
    if (i === rating - 1) {
      checked[i] = 'checked';
    } else {
      checked[i] = '';
    }
  }
  return checked;
}

/////////////////////////////
////// Event Listeners //////
/////////////////////////////

const expandBookMark = function () {
  $('.current-bookmarks').on('click', '.bookmark-in-list', function (event) {
    event.preventDefault();
    let foundID = $(event.currentTarget).data();
    let foundBookmark = store.findById(foundID.bookmarkId);
    if (foundBookmark.editing === true) {
      return;
    } else if (foundBookmark.expanded === false) {
      foundBookmark.expanded = true;
      render();
      foundBookmark.expanded = false;
    } else {
      foundBookmark.expanded = false;
      render();
    }
  });
};

const expandBookMarkByKeypress = function () {
  $('.current-bookmarks').on('keypress', '.bookmark-in-list', function (event) {
    if (
      event.which === 13 ||
      event.keyCode === 13 ||
      event.which === 32 ||
      event.keyCode === 32
    ) {
      event.preventDefault();
      let foundID = $(event.currentTarget).data();
      let foundBookmark = store.findById(foundID.bookmarkId);
      if (foundBookmark.editing === true) {
        return;
      } else if (foundBookmark.expanded === false) {
        foundBookmark.expanded = true;
        render();
        foundBookmark.expanded = false;
      } else {
        foundBookmark.expanded = false;
        render();
      }
    }
  });
};

const addNewBookmark = function () {
  $('main').on('click', '#new', function (event) {
    event.preventDefault();
    store.adding = true;
    render();
  });
};

const submitNewBookmark = function () {
  let bookmarkJSONbody;
  $('main').on('submit', '#newBookmark', function (event) {
    event.preventDefault();
    bookmarkJSONbody = $('#newBookmark').serializeJson();
    api
      .addBookmarkToApi(bookmarkJSONbody)
      .then(function (bookmark) {
        store.addBookmarkToStore(bookmark);
        bookmark.expanded = false;
        store.adding = false;
        render();
      })
      .catch(function (error) {
        store.setError(error.message);
        renderError();
      });
  });
};

const submitEditBookmark = function () {
  $('main').on('submit', '#saveNewBookmark', function (event) {
    event.preventDefault();
    let foundID = $(event.currentTarget)
      .parent()
      .find('.bookmark-in-list')
      .data();
    let bookmarkJSONbody = $('#saveNewBookmark').serializeJson();
    let editedBookmark = JSON.parse(bookmarkJSONbody);
    api
      .editBookmarkToApi(foundID.bookmarkId, bookmarkJSONbody)
      .then(function () {
        let bookmark = store.updateBookmarkToStore(foundID.bookmarkId, editedBookmark);
        bookmark.expanded = false;
        bookmark.editing = false;
        render();
      })
      .catch(function (error) {
        store.setError(error.message);
        renderError();
      });
  });
};

const cancelNewBookmark = function () {
  $('main').on('click', '#cancel', function () {
    event.preventDefault();
    store.adding = false;
    render();
  });
};

const cancelEditBookmark = function () {
  $('main').on('click', '#edit-cancel', function () {
    let foundID = $(event.target)
      .parent()
      .parent()
      .data();
    let bookmark = store.findById(foundID.bookmarkId);
    bookmark.expanded = false;
    bookmark.editing = false;
    render();
  });
};

const cancelErrorMessage = function () {
  $('html').on('click', '#error-cancel', function () {
    event.preventDefault();
    store.error = null;
    $('.error-message').addClass('hidden');
    render();
  });
};


const editBookmark = function () {
  $('main').on('click', '#edit', function (event) {
    event.preventDefault();
    let foundID = $(event.currentTarget)
      .parent('div')
      .parent('div')
      .siblings('div')
      .data();
    let foundBookmark = store.findById(foundID.bookmarkId);
    foundBookmark.editing = true;
    render();
  });
};

const deleteBookmark = function () {
  $('main').on('click', '#delete', function (event) {
    let foundID = $(event.currentTarget)
      .parent('div')
      .parent('div')
      .siblings('div')
      .data();
    let foundBookmark = store.findById(foundID.bookmarkId);
    api
      .deleteBookmark(foundID.bookmarkId)
      .then(function () {
        store.deleteBookmarkFromStore(foundID.bookmarkId);
        foundBookmark.expanded = false;
        foundBookmark.editing = false;
        render();
      })
      .catch(function (error) {
        store.setError(error.message);
        renderError();
      });
  });
};

const ratingsSelect = function () {
  $('#ratings').change(function () {
    store.showRating = $('#ratings').val();
    render();
  });
};

const handleCloseError = function () {
  $('.error-container').on('click', '#cancel-error', () => {
    store.setError(null);
    renderError();
  });
};

$.fn.extend({
  serializeJson: function () {
    const formData = new FormData(this[0]);
    const o = {};
    formData.forEach((val, name) => (o[name] = val));
    return JSON.stringify(o);
  },
});

/// 'One Function to Bind Them All' //

const bindEventListeners = function () {
  expandBookMark();
  expandBookMarkByKeypress();
  addNewBookmark();
  editBookmark();
  submitNewBookmark();
  submitEditBookmark();
  cancelNewBookmark();
  deleteBookmark();
  ratingsSelect();
  handleCloseError();
  cancelEditBookmark();
  cancelErrorMessage();
};

export default {
  render,
  bindEventListeners,
  generateMain,
};
