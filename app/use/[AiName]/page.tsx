"use client";
import { useEffect, useState } from "react";

const UseAi = (props: any) => {
  const [username, onSetUsername] = useState("");
  const [isLoading, onSetIsLoading] = useState(false);
  const [iframeUrl, onSetIframeUrl] = useState(null);

  /**
   * We need to use the backend to generate a secure URL that can be used to
   * load the embedded AI.
   *
   * In this sample app, we ask the user for their username in order to generate
   * their secure, unique URL. In your production app, you will already know the
   * user's username/user ID on the backend and can skip this step to make the
   * process more seamless and secure.
   */
  const generateUrl = async () => {
    if (!username) {
      return;
    }

    onSetIsLoading(true);
    const res = await fetch(
      `/api/getSecureUrl?aiName=${encodeURIComponent(
        props.params.AiName
      )}&username=${encodeURIComponent(username)}`
    );
    const data: { [index: string]: any } = await res.json();
    onSetIframeUrl(data.url);
    onSetIsLoading(false);
  };

  if (isLoading) {
    return (
      <main className="centered-frame">
        <h1>Loading...</h1>
      </main>
    );
  }

  if (!iframeUrl) {
    return (
      <main className="centered-frame">
        <div className="form-area">
        <input
          autoFocus
          type="text"
          placeholder="Username..."
          value={username}
          onChange={(e) => onSetUsername(e.target.value)}
        />
        <button onClick={() => generateUrl()}>Launch AI</button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <iframe className="player-frame" src={iframeUrl} />
    </main>
  );
};

export default UseAi;
