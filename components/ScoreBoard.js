import styles from "./ScoreBoard.module.css"

export default function ScoreBoard(props) {
  return (
    <>
      <section className={styles.section}>
        <h2>Scoreboard</h2>
        <ul>
          {
            props.winners.map((x, index) => (
              <li className={styles.lineItem} key={index}>
                {x.user_name} 
                <div>Attempts: {x.number_of_prompts}</div>
              </li>
            ))
          }
        </ul>
      </section>
    </>
  )
}