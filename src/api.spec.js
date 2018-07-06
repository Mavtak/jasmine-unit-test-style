// these comments are to explain the process, and would not usually be present in code

// to isolate just the code that we ant to test, we use `inject-loader` to inject our own fake versions of the file's dependencies
import apiInjector from 'inject-loader!./api.js';

describe('api', () => {
  let api;
  let jsonFetch;
  let normalizePony;

  beforeEach(() => {
    // jasmine spys make it easy to veriy that functions were called, as well as provide fakoe results
    jsonFetch = jasmine.createSpy('jsonFetch');
    jsonFetch.and.returnValue('some jsonFetch result');

    normalizePony = jasmine.createSpy('normalizePony');
    normalizePony.and.callFake(x => `normalized ${x}`);

    // here we can call the injector, passing in an object of import strings to resulting, faked, objects
    api = apiInjector({
      './jsonFetch.js': jsonFetch,
      './normalizePony.js': normalizePony,
    }).default;
  });

  describe('createUser', () => {
    let result;

    beforeEach(async () => {
      //since this function doesn't have any conditional logic, we can call it once from a `beforeEach` and have separate `it` blocks with any assertion that we need.
      result = await api.createUser({
        displayName: 'David McDerp',
        favoritePony: 'some pony',
      });
    });

    it('normalizes the "favoritePony" property', () => {
      // we can assert that Jasmine spys were called and how many timmes
      expect(normalizePony).toHaveBeenCalledWith('some pony');
      expect(normalizePony.calls.count()).toBe(1);
    });

    it('creates the API request with jsonFetch', () => {
      // we know that jsonFetch will do some complex stuff with this input, but that it's separately unit tested, so we can just focus on and trust its interface.
      expect(jsonFetch).toHaveBeenCalledWith({
        method: 'post',
        url: '/api/users/',
        body: {
          displayName: 'David McDerp',
          favoritePony: 'normalized some pony',
        },
      });
      expect(jsonFetch.calls.count()).toBe(1);
    });

    it('returns the jsonFetch result', () => {
      expect(result).toBe('some jsonFetch result');
    });

  });

  describe('updateUser', () => {
    let result;

    beforeEach(async () => {
      result = await api.updateUser({
        id: 'abc-123',
        displayName: 'David McDerp',
        favoritePony: 'some pony',
      });
    });

    it('normalizes the "favoritePony" property', () => {
      expect(normalizePony).toHaveBeenCalledWith('some pony');
      expect(normalizePony.calls.count()).toBe(1);
    });

    it('creates the API request with jsonFetch', () => {
      expect(jsonFetch).toHaveBeenCalledWith({
        method: 'patch',
        url: '/api/users/abc-123',
        body: {
          displayName: 'David McDerp',
          favoritePony: 'normalized some pony',
        },
      });
      expect(jsonFetch.calls.count()).toBe(1);
    });

    it('returns the jsonFetch result', () => {
      expect(result).toBe('some jsonFetch result');
    });

  });

});
