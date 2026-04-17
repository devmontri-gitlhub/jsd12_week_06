const url = "https://api.api-ninjas.com/v1/iplookup?address=73.9.149.180";
const options = {
  method: "GET",
  headers: {
    "X-Api-Key": "4O8kEXCry14w0QfwCUaDdn2cZSRTMysppTgpsl2l",
    "Content-Type": "4O8kEXCry14w0QfwCUaDdn2cZSRTMysppTgpsl2l",
    },
};


fetch(url, options)
  .then((response) =>{
return response.json();
})
    .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
