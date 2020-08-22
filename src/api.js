const BASE_URL = 'https://thinkful-list-api.herokuapp.com/richardscott';

/**
 * 
 * @param {string} url
 * @param {object} options
 * @returns {Promise} 
 */
const fetchApi = function (...args) {
  let error;
  return fetch(...args)
    .then((res) => {
      if (!res.ok) {

        error = { code: res.status };
        if (!res.headers.get('content-type').includes('json')) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }

      return res.json();
    })
    .then((data) => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }

      return data;
    });
};

const getList = function () {
  return fetchApi(`${BASE_URL}/bookmarks`); 
};

const addBookmarkToApi = function (newBookmarkBody) {
  return fetchApi(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: newBookmarkBody,
  });
};

const deleteBookmark = function (id) {
  return fetchApi(`${BASE_URL}/bookmarks/${id}`, { method: 'DELETE' });
};

const editBookmarkToApi = function (id, newBookmarkBody) {
  return fetchApi(`${BASE_URL}/bookmarks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: newBookmarkBody,
  });
};

export default {
  getList,
  addBookmarkToApi,
  deleteBookmark,
  editBookmarkToApi,
};
