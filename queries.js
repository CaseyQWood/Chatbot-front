import axios from "axios";

async function winQuery(id, username, character) {
  console.log("new winner query")
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/saveWinner`,
    {"id": id, "username": username, "character": character},
    {"Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',})
    .then((res) => {
      console.log("win confirmed from DB")
  }).catch((err) => {
    console.log(err);
  });
}

async function getWinners(character) {
  console.log("get winners:", character);
  let test = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/winners`,
    {"character": character},
    {"Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',})
    .then((res) => {
      console.log("winners: ", res.data.data)
      return res.data.data;
  }).catch((err) => {
    console.log(err);
  });

  return test;
}

module.exports = {
  winQuery,
  getWinners
}