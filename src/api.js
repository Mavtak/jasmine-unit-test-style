// these comments are to explain the process, and would not usually be present in code

// this file could use `fetch` directly, but it doesn't have have quite the interface that we want.  we could inline the code to add the headers, options, and serialize the body, but then we'd have to unit test that here too.  it's more tidy to extract that code into another file, consolidated and separately unit tested.
import jsonFetch from './jsonFetch.js';
// here is another function that could be at the bottom of this file, but then it would be inside this file's interface, which would require more nuanced (complicated) unit tests that would need duplication to be thorough.  if it's in a separate file, then here we can just unit test that each time the function was called with the right arguments and that its result was used.
import normalizePony from './normalizePony.js';

let api = {
  createUser: async ({
    displayName,
    favoritePony,
  }) => {
    favoritePony = normalizePony(favoritePony);

    return await jsonFetch({
      method: 'post',
      url: `/api/users/`,
      body: {
        displayName,
        favoritePony,
      },
    });
  },

  updateUser: async ({
    id,
    displayName,
    favoritePony,
  }) => {
    favoritePony = normalizePony(favoritePony);

    return await jsonFetch({
      method: 'patch',
      url: `/api/users/${encodeURIComponent(id)}`,
      body: {
        displayName,
        favoritePony,
      },
    });
  },
};

export default api;
