import styles from "./ChatForms.module.css";
import PromptSubmission from "./PromptSubmission";

export default function ChatForms(props) {

  return (
    <div className={styles.form}>
    {props.sessionId 
      ?
        <PromptSubmission setResult={props.setResult} sessionId={props.sessionId}/>
      :
        <button type="start" onClick={() => props.newSession()}>New Session</button>
    }
  </div>
  )
}