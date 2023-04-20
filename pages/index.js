import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import axios from "axios";
import { CookiesProvider} from "react-cookie";
import { useCookies} from "react-cookie";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(false);
  const [cookies, setCookie] = useCookies(["sessionId"]);
  const [guess, setGuess] = useState("");

  async function onSubmit(event) {
    if (loading) return;
    event.preventDefault();
    setLoading(true);

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/generate`,
      {"id": cookies.sessionId, "prompt": prompt},
      {"Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',})
      .then((res) => {
        console.log("Res Data", res.data)
        setResult((prevResult) => [...prevResult, res.data.data]);
        setPrompt("");
        setLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  }

  async function onGuess(event) {
    event.preventDefault();
    console.log("Guess: ", guess)
    console.log("Chosen Color: ", process.env.NEXT_PUBLIC_CHOSEN_COLOR)
    if (process.env.NEXT_PUBLIC_CHOSEN_COLOR == guess) {
      console.log("Correct!")
    }
  }

  async function NewSession() {
    setCookie("sessionId", "", {path: "/"});

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/newSession`,
      {"chosenColor": process.env.NEXT_PUBLIC_CHOSEN_COLOR},
      {"Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',})
      .then((res) => {
        setSessionId(res.data.data.id);
        setCookie("sessionId", res.data.data.id, {path: "/"});
      }
    ).catch((err) => {
      console.log(err);
    });

  }

  return (
    <div>
      <Head>
        <title>Nueman penTest</title>
        <link rel="icon" href="/dog.png" />
      </Head>

    <CookiesProvider>
      <main className={styles.main}>
        <img src="/nueman.jpeg" className={styles.icon} />
        <h3>Nueman</h3>
        
        {result.map((x, index) => (
          <div key={index} className={styles.result}>
            {x.content}
          </div>
        ))}
        {sessionId ?
        <>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="topic"
            placeholder="Enter prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />          
          <input type={loading ? "loading" : "submit"} value={loading ? "Loading" : "Generate response"} />
        </form>
        <form onSubmit={onGuess}>
          <input
            type="text"
            name="guess"
            placeholder="Enter color"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            ></input>
          <button type="guess" className="button1">Guess</button>
        </form>
        </>
        :
        <button className="button1" onClick={NewSession}>New Session</button>
        }

      </main>
      </CookiesProvider>
    </div>
  );
}