function getAllAnimalsByLetter(letter) {
  let offset = 0;
  let allResults = [];

  const url = `https://api.api-ninjas.com/v1/animals?name=${letter}&offset=${offset}`;
  return fetch(url, {
    headers: { "X-Api-Key": "4O8kEXCry14w0QfwCUaDdn2cZSRTMysppTgpsl2l" },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
         const limitedData = data.slice(0, 20); 
         allResults.push(...limitedData);
      }

      console.log(
        `Found ${allResults.length} animals containing the letter ${letter}`,
      );
      console.log(allResults);
    });
}

getAllAnimalsByLetter("a");