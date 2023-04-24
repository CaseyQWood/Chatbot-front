import Head from "next/head";
import { Suspense, useEffect, useState } from "react";
import styles from "./index.module.css";
import axios from "axios";
import { CookiesProvider} from "react-cookie";
import { useCookies} from "react-cookie";
import { winQuery, getWinners } from "../queries";
import ScoreBoard from "../components/ScoreBoard";
import ChatForms from "../components/ChatForms";
import ColorSubmissionField from "../components/colorSubmissionField";

export default function Home() {
  const [result, setResult] = useState([]);
  const [sessionId, setSessionId] = useState(false);
  const [cookies, setCookie] = useCookies(["sessionId"]);
  const [winCondition, setWinCondition] = useState();
  const [winners, setWinners] = useState([]);

  if (winCondition && winCondition.win) {
    console.log("win confirmed")  
    winQuery(cookies.sessionId, winCondition.name).then((res) => {
      console.log("win query res: ", res);

      getWinners().then((res) => {
        console.log("Get Winners Res: ", res)
        setWinners(res);
        setWinCondition(null);
      })
    });
  }

  async function newSession() {
    console.log("new session")
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

  useEffect(() => {
    getWinners().then((res) => {
      console.log("res: ", res)
      setWinners(res);
    })
  }, []);


  return (
    <div>
      <Head>
        <title>Nueman penTest</title>
        <link rel="icon" href="/dog.png" />
      </Head>

    <CookiesProvider>
      <main className={styles.main}>

        <Suspense fallback={<div>Loading...</div>}>
          <ScoreBoard className={styles.scoreboard} winners={winners}/>
        </Suspense>

        <div className={styles.hero}>
          <img src="/nueman.jpeg" className={styles.icon}/>
          <h3>Dennis</h3>
        </div>

        <ColorSubmissionField className={styles.guess}  onWin={setWinCondition}/>

        <div className={styles.results}>
          <Suspense fallback={<div>Loading...</div>}>
            {result.map((x, index) => (
              <div key={index} className={styles.result}>
                {x.content}
              </div>
            ))}
          </Suspense>
        </div>

        <ChatForms className={styles.form} sessionId={sessionId} newSession={newSession} setResult={setResult} setWinCondition={setWinCondition}/>
      
      </main>
      </CookiesProvider>
    </div>
  );
}