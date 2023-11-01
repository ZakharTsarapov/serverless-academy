const api = [
  "https://jsonbase.com/sls-team/json-793",
  "https://jsonbase.com/sls-team/json-955",
  "https://jsonbase.com/sls-team/json-231",
  "https://jsonbase.com/sls-team/json-931",
  "https://jsonbase.com/sls-team/json-93",
  "https://jsonbase.com/sls-team/json-342",
  "https://jsonbase.com/sls-team/json-770",
  "https://jsonbase.com/sls-team/json-491",
  "https://jsonbase.com/sls-team/json-281",
  "https://jsonbase.com/sls-team/json-718",
  "https://jsonbase.com/sls-team/json-310",
  "https://jsonbase.com/sls-team/json-806",
  "https://jsonbase.com/sls-team/json-469",
  "https://jsonbase.com/sls-team/json-258",
  "https://jsonbase.com/sls-team/json-516",
  "https://jsonbase.com/sls-team/json-79",
  "https://jsonbase.com/sls-team/json-706",
  "https://jsonbase.com/sls-team/json-521",
  "https://jsonbase.com/sls-team/json-350",
  "https://jsonbase.com/sls-team/json-64",
];

const fetchApi = async (url) => {
    let attemps = 0;
    while(attemps < 3) {
        try {
            const response = await fetch(url);
            if(!response.ok) {
                throw new Error("something wrong");
            }
            const data = await response.json();
            if(data.isDone !== undefined) {
                console.log(`[Success] ${url}: isDone - ${data.isDone}`)
                return data.isDone
            } else {
                throw new Error(`${url}: not have a key`)
            }
        } catch(error) {
            attemps++;
            if(attemps ===3)
            console.log(`[Fail] ${url}: The endpoint is unavailable`)
        }
    }
}

const fetchData = async() => {
    const results = await Promise.all(api.map(fetchApi))
    const isTrue = results.filter(result => result === true)
    const isFalse = results.filter(result => result === false)

    console.log(`Found True values: ${isTrue.length}`);
    console.log(`Found False values: ${isFalse.length}`);
}

fetchData();