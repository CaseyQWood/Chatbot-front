import styles from "./colorSubmissionField.module.css"
import { useEffect, useState } from "react";

export default function ColorSubmissionField(props) {
  const [guess, setGuess] = useState("");
  const [name, setName] = useState("");
  const [correct, setCorrect] = useState(null);


  useEffect(() => {
    let winObj = {win: correct, name};
    console.log("win Object: ", winObj);

    props.onWin(winObj);
  }, [correct])

  async function onGuess(event) {
    event.preventDefault();
    const answerNormalized = process.env.NEXT_PUBLIC_CHOSEN_COLOR.toLocaleLowerCase()
    const guessNormalized = guess.toLocaleLowerCase()
    console.log(
      "answerNormalized: ", answerNormalized,
      " \nguessNormalized: ", guessNormalized
    )
    if (answerNormalized !== guessNormalized) {
      setCorrect(false);
      setTimeout(() => setCorrect(null), 1000);
      return
    }
    //console.log("correct pre: ", correct)
    setCorrect(true)
    return
  }

  return (
    <>
      {
      correct ? <h2>CORRECT!</h2>
        :
        <form type="checker" className={styles.form} onSubmit={onGuess}>
          <input
            type="text"
            name="name" 
            placeholder="Enter username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            ></input>
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