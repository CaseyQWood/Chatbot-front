import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import axios from "axios";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();

    if (loading) return;
    console.log("loading: ", loading)
    setLoading(true);

    await axios.post(
      "http://localhost:3000/",
      {"prompt": prompt},
      {"Content-Type": "application/json"})
      .then((res) => {
        setResult((prevResult) => [...prevResult, res.data.data]);
        setPrompt("");
        setLoading(false);
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
            {x}
          </div>
        ))}
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
      </main>
    </div>
  );
}