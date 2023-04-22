import styles from "./colorSubmissionField.module.css"
import { useState } from "react";

export default function ColorSubmissionField(props) {
  const [guess, setGuess] = useState("");
  const [correct, setCorrect] = useState(null);

  async function onGuess(event) {
    event.preventDefault();
    const answerNormalized = process.env.NEXT_PUBLIC_CHOSEN_COLOR.toLocaleLowerCase()
    const guessNormalized = guess.toLocaleLowerCase()
    
    if (answerNormalized !== guessNormalized) {
      setCorrect(false);
      setTimeout(() => setCorrect(null), 1000);
      return
    }

    setCorrect(true);
    console.log("props: ", props);
    props.onWin(true);
    return
  }

  return (
    <>
      {
      correct ? <h2>CORRECT!</h2>
        :
        <form className={styles.form} onSubmit={onGuess}>
          <input
            type="text"
            name="guess"
            placeholder="Enter color"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            ></input>
          {correct !== null ? <button type="wrong">Nope!</button> : <button type="guess" >Guess</button>}
        </form>
      }
    </>
  )
}