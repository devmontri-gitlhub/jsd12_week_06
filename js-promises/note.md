`fetch()` is a function that **returns a Promise**.

So the relationship is:

- **Promise** = the JavaScript pattern/object for handling a value that arrives later
- **fetch()** = a built-in web API that uses that pattern to handle HTTP requests

A concise way to explain it:

> `fetch()` gives you a Promise that represents the future result of an HTTP request.

Example:

```js
const responsePromise = fetch("/api/products");
```

Here, `responsePromise` is a Promise.
Later, it will either:

- **resolve** with a `Response` object, or
- **reject** if the request fails badly, like a network error

That is why we use `.then()` or `await` with `fetch()`.