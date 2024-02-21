import React, { useState } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [data, setData] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://jwt.sulla.hu/login", {
        username,
        password,
      });

      setToken(response.data.token);
    } catch (error) {
      console.error("Hiba:", error.response.data.error);
    }
  };

  const handleGetData = async () => {
    try {
      const response = await axios.get("https://jwt.sulla.hu/termekek", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data.data);
    } catch (error) {
      console.error("Adatlekérési hiba:", error.response.data.error);
    }
  };
  const renderData = () => {
    return (
      <ul>
        {data.map((item) => (
          <li>
            {item.id} {item.name} {item.price}
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div>
      <div>
        <label>Felhasználónév:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Jelszó:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Bejelentkezés</button>
      {token && <button onClick={handleGetData}>Védett adatok lekérése</button>}
      {data && renderData()}
    </div>
  );
}

export default App;
