import Head from "next/head";
import { Suspense, useEffect, useState } from "react";
import styles from "./index.module.css";
import { CookiesProvider} from "react-cookie";
import { useCookies} from "react-cookie";
import { winQuery, getWinners, createSessionQuery } from "../queries";
import ScoreBoard from "../components/ScoreBoard";
import ColorSubmissionField from "../components/colorSubmissionField";
import ChatBox from "../components/ChatBox";


export default function Home() {
  const [cookies, setCookie] = useCookies(["sessionId"]);
  const [winCondition, setWinCondition] = useState(); // contains win: true/false and name: username
  const [winners, setWinners] = useState([]);

  const [sessionState, setSessionState] = useState({id: 0, character: "jeff", fav_color: "d79dj"}); // {id: 1, character: "jeff", fav_color: "red"

  const updateSessionState = (newState) => {
    // Create a shallow copy of the state, updating only the specified keys
    const updatedState = Object.entries(newState).reduce((x, [key, value]) => {
      if (sessionState.hasOwnProperty(key)) {
        x[key] = value;
      }
      return x;
    }, { ...sessionState });

    setSessionState(updatedState);
  };

  const resetCookie = () => {
    setCookie("sessionId", "", {path: "/"});
  }

  const resetWinCondition = () => {
    setWinCondition(null);
  }

  useEffect(() => {
  if (winCondition && winCondition.win) {
    winQuery(cookies.sessionId, winCondition.name, sessionState.character)
    .then(() => {
      getWinners().then((res) => {
        console.log('Get Winners response: ', res);
        setWinners(res);
        resetWinCondition();
      })
    });
  }
  }, [winCondition])

  useEffect(() => {
    getWinners(sessionState.character).then((res) => {
      setWinners(res);
    })
  }, [sessionState.character])


  async function newSession() {
    resetCookie();
    const sessionData = await createSessionQuery(sessionState.character);
    updateSessionState({id: sessionData.id, character: sessionState.character, fav_color: sessionData.fav_color});
    setCookie("sessionId", sessionData.id, {path: "/"});
  }

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
        </div>

        <ColorSubmissionField className={styles.guess} favColor={sessionState.fav_color}  onWin={setWinCondition}/>

        <ChatBox sessionState={sessionState} setSessionState={updateSessionState} newSession={newSession}/>
      
      </main>
      </CookiesProvider>
    </div>
  );
}