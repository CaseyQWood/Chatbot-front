import styles from "./ChatBox.module.css";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";

export default function ChatBox(props) {
  const [prompt, setPrompt] = useState("");
  const [results, setResult] = useState(["test", "test2", "test3"]);
  const [loading, setLoading] = useState(false);
  const [convo, setConvo] = useState([]);

console.log("ChatBox: ", convo)
  async function onSubmit(event) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setConvo((prevConvo) => [...prevConvo, {role: "user", content: prompt}]);

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/generate`,
      {"id": props.sessionId, "prompt": prompt},
      {"Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',})
      .then((res) => {
        setPrompt("");
        setConvo((prevConvo) => [...prevConvo, res.data.data]);
        setResult((prevResult) => [...prevResult, res.data.data]);
        setLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <section className={styles.chat}>
      {props.sessionId ?
      <>
        <div className={styles.title}>
          <h1>Bot name</h1>
        </div>

        {/* /* This is the chat box */}
        <div type='container'> 
          <Suspense fallback={<div>Loading...</div>}>
            {convo.map((x, index) => (
              <div className={x.role == "user" ? styles.userMessage : styles.assMessage} key={index} >
                <div className={styles.bubble}>
                  <div className={styles.heading}>{x.role}</div>
                    <p className={styles[x.role]}>
                      {x.content}
                  </p>
                </div>
              </div>
            ))}
          </Suspense>
        </div>

        <form className={styles.input} onSubmit={onSubmit}>
          <input
            type="prompt"
            name="topic"
            placeholder="Enter prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />          
          <input type={loading ? "loading" : "submit"} value={loading ? "....." : "enter"} />
        </form> 
      </>
        :
      <button type="start" onClick={() => props.newSession()}>New Session</button>
        }
    </section>
  )

}