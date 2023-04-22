import Head from "next/head";
import { Suspense, useState } from "react";
import styles from "./index.module.css";
import axios from "axios";
import { CookiesProvider} from "react-cookie";
import { useCookies} from "react-cookie";
import ColorSubmissionField from "../components/colorSubmissionField";
import { winQuery } from "../queries";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(false);
  const [cookies, setCookie] = useCookies(["sessionId"]);
  const [winCondition, setWinCondition] = useState(false);

  if (winCondition) {
    console.log("win confirmed")  
    winQuery(cookies.sessionId);
  }

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

  async function NewSession() {
    setCookie("sessionId", "", {path: "/"});
    const chosenColor = process.env.NEXT_PUBLIC_CHOSEN_COLOR;

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/newSession`,
      {chosenColor},
      {"Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',})
      .then((res) => {
        let id = res.data.data.id;
        setSessionId(id);
        setCookie("sessionId", id, {path: "/"});
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
        
        <Suspense fallback={<div>Loading...</div>}>
          {result.map((x, index) => (
            <div key={index} className={styles.result}>
              {x.content}
            </div>
          ))}
        </Suspense>

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
        <ColorSubmissionField onWin={setWinCondition}/>
        </>
        :
        <button type="start" onClick={NewSession}>New Session</button>
        }

      </main>
      </CookiesProvider>
    </div>
  );
}