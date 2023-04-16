import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import axios from "axios";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState([]);

  async function onSubmit(event) {
    event.preventDefault();

    await axios.get("http://localhost:3000/").then((res) => {
      console.log("This is Res", res.data);

      setResult((prevResult) => [...prevResult, res.data.data]);
      setPrompt("");
    }).catch((err) => {
      console.log(err);
    });

    //   setResult((prevResult) => [...prevResult, data.result]);
    //   setPrompt("");
    // } catch(error) {
    //   // Consider implementing your own error handling logic here
    //   console.error(error);
    //   alert(error.message);
    // }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Name my pet</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="topic"
            placeholder="Enter topic"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <input type="submit" value="Generate conversation" />
        </form>
        {result.map((x, index) => (
          <div key={index} className={styles.result}>
            {x}
          </div>
        ))}
      </main>
    </div>
  );
}