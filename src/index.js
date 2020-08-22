import $ from 'jquery';
import api from './api';
import bookmarkList from './bookmarkList';
import store from './store.js';
import './index.css';
import 'normalize.css';

const main = function () {
  api.getList().then((bookmarks) => {
    bookmarks.forEach((bookmark) => store.addBookmarkToStore(bookmark));
    bookmarks.forEach((bookmark) => (bookmark.expanded = false));
    bookmarks.forEach((bookmark) => (bookmark.editing = false));
    bookmarkList.render();
  });
  bookmarkList.bindEventListeners();
  bookmarkList.render();
};

$(main);
