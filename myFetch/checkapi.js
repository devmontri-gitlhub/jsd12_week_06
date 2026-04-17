

const url = `https://api.api-ninjas.com/v1/domain?domain=example.com`;
  return fetch(url, {
    headers: { "X-Api-Key": "4O8kEXCry14w0QfwCUaDdn2cZSRTMysppTgpsl2l" },
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Something went wrong!", error);
  });