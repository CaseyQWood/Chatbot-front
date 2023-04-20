import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import axios from "axios";


export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();

    if (loading) return;
    console.log("loading: ", loading)
    setLoading(true);

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/`,
      {"id": sessionId, "prompt": prompt},
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
    await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/newSession`,
      {"Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',})
      .then((res) => {
        setSessionId(res.data.data.id);
    }).catch((err) => {
      console.log(err);
    });

  }

  return (
    <div>
      <Head>
        <title>Nueman penTest</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/nueman.jpeg" className={styles.icon} />
        <h3>Nueman</h3>
        
        {result.map((x, index) => (
          <div key={index} className={styles.result}>
            {x.content}
          </div>
        ))}
        {sessionId ?
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
        :
        <button className="button1" onClick={NewSession}>New Session</button>
        }
      </main>
    </div>
  );
}