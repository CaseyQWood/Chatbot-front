import { useState } from "react";
import axios from "axios";

export default function PromptSubmission(props) {
  console.log("propsSubmission-props: ", props)
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    if (loading) return;
  console.log("Prompt: ", prompt)
    setLoading(true);

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/generate`,
      {"id": props.sessionId, "prompt": prompt},
      {"Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',})
      .then((res) => {
        console.log("Res Data", res.data)
        props.setResult((prevResult) => [...prevResult, res.data.data]);
        setPrompt("");
        setLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="topic"
        placeholder="Enter prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />          
      <input type={loading ? "loading" : "submit"} value={loading ? "Loading" : "Generate response"} />
    </form>
  )
}