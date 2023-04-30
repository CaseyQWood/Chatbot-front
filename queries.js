import axios from "axios";

async function winQuery(id, username, character) {
  // this is both await and .then, I need to pick one
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/saveWinner`,
    {"id": id, "username": username, "character": character},
    {"Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',})
    .then((res) => {
  }).catch((err) => {
    console.log(err);
  });
}

async function getWinners(character) {
  // convert this just .then maybe instead of await and .then
  let test = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/winners`,
    {"character": character},
    {"Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',})
    .then((res) => {
      return res.data.data;
  }).catch((err) => {
    console.log(err);
  });

  return test; // rename this variable
}

async function createSessionQuery(character) {

  console.log("create Session Front: ", character)
  const results = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/newSession`,
    {character},
    {"Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',}
  )

  return results.data.data;
}

async function chatQuery(id, character, prompt) {
  const results = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/generate`,
    {"id": id,"character": character, "prompt": prompt},
    {"Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',}
  )

  return results.data.data;
}

async function getCharacterList() {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/characters`,
    {"Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',})
 
  return response.data.data;
}

module.exports = {
  winQuery,
  getWinners,
  createSessionQuery,
  chatQuery,
  getCharacterList
}