Basic anatomy:

```js id="xmkjz8"
fetch(url, options);
```

### 1. `url`

The endpoint you want to request.

```js id="z4k95m"
fetch("/api/products");
fetch("https://example.com/users");
```

### 2. `options`

An optional object that configures the request.

Common parts:

```js id="i8y2x6"
fetch(url, {
  method: "GET", // GET, POST, PUT, PATCH, DELETE
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data), // usually for POST/PUT/PATCH
});
```

### Full example

```js id="sdnh6n"
fetch("https://api.example.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Neeti",
    role: "Instructor",
  }),
});
```

### What it returns

`fetch()` returns a **Promise**:

```js id="ft96lu"
const promise = fetch("/api/products");
```

### Common usage pattern

```js id="mvg3b3"
fetch("/api/products")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
```

> `fetch(url, options)` sends an HTTP request and returns a Promise for the response.