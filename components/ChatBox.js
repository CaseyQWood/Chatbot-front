import styles from "./ChatBox.module.css";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import DropdownSelect from "./DropDown";
import { chatQuery, getCharacterList } from "../queries";


// props = {sessionState, setsessionState, newSession}
export default function ChatBox({sessionState, setSessionState, newSession}) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [convo, setConvo] = useState([]);
  const [characterList, setCharacterList] = useState([""]);

  useEffect(() => {
  getCharacterList()
    .then((res) => {
      console.log("Character List: ", res)
      setCharacterList(res);
    }).catch((err) => {
    console.log(err);
  });
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setConvo((prevConvo) => [...prevConvo, {role: "user", content: prompt}]);

    chatQuery(sessionState.id, sessionState.character, prompt).then((res) => {
      setPrompt("");
      setConvo((prevConvo) => [...prevConvo, res]);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <section className={styles.chat}>
      {sessionState.id ?
      <>
        <div className={styles.title}>
          <h1>{sessionState.character}</h1>
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
        <div className={styles.session} >

          <div>

          </div>

          <DropdownSelect characterList={characterList} setSessionState={setSessionState} />

          <button type="start" onClick={() => newSession()}>New Session</button>
        </div>
        }
    </section>
  )

}