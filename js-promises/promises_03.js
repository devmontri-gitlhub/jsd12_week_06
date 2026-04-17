// Creating your own async business logic

// This is common when your app needs custom async flow that is not directly provided by fetch().

// For example:

// validate something asynchronously
// wait for a file/process/task
// simulate a backend decision
// build a reusable async utility

function checkAge(age) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (age >= 18) {
        resolve("Access granted");
      } else {
        reject("Access denied");
      }
    }, 1000);
  });
}

checkAge(20)
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error);
  });