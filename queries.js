import axios from "axios";

async function winQuery(id) {
  console.log("Pre query")
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/saveWinner`,
    {"id": id},
    {"Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',})
    .then((res) => {
      console.log("win confirmed from DB")
  }).catch((err) => {
    console.log(err);
  });
}

module.exports = {
  winQuery
}