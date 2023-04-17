import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import axios from "axios";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState([]);

  async function onSubmit(event) {
    event.preventDefault();

    await axios.post("http://localhost:3000/", {"prompt": prompt}, {"Content-Type": "application/json"}).then((res) => {
      console.log("This is Res", res.data);

      setResult((prevResult) => [...prevResult, res.data.data]);
      setPrompt("");
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
          <input type="submit" value="Generate conversation" />
        </form>
      </main>
    </div>
  );
}