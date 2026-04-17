// simulating delayed async work

// Very common for:

// loading states
// teaching async flow
// retry timing
// artificial delays in UI workflows

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Waited ${ms}ms`);
    }, ms);
  });
}

wait(2000)
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error);
  });

// Why this is common

// Because many real apps need:

// debounce-like behavior
// delayed feedback
// pause before redirect
// retry after a timeout