import styles from "./colorSubmissionField.module.css"
import { useEffect, useState } from "react";


// mmake this appear only when the user has selected a character
// maybe add this to the chatbox component
// props = {favColor, onWin}
export default function ColorSubmissionField(props) {
  const [guess, setGuess] = useState("");
  const [name, setName] = useState("");
  const [correct, setCorrect] = useState(null);


  useEffect(() => {
    let winObj = {win: correct, name};
    props.onWin(winObj);
  }, [correct])

  async function onGuess(event) {
    event.preventDefault();
    if(!props.favColor) return
    const answerNormalized = props.favColor.toLocaleLowerCase()
    const guessNormalized = guess.toLocaleLowerCase()

    if (answerNormalized !== guessNormalized) {
      setCorrect(false);
      setTimeout(() => setCorrect(null), 1000);
      return
    }
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