import { useState } from "react";
import "./pass.css";
export default function PasswordGenerator() {
  const [pass, setPass] = useState();
  const [range, setRange] = useState(1);
  const [data, setData] = useState([
    { title: "Have UpperCase Letters", checked: false },
    { title: "Have LowerCase Letters", checked: false },
    { title: "Have Numbers", checked: false },
    { title: "Have Special Characters", checked: false },
  ]);

  function checked(index) {
    const updatedData = [...data];
    updatedData[index].checked = !updatedData[index].checked;
    setData(updatedData);
  }
  function generaterPass() {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!@#$%^&*()_+[]{}<>?,.";

    let allChars = "";
    if (data[0].checked) allChars += upper;
    if (data[1].checked) allChars += lower;
    if (data[2].checked) allChars += numbers;
    if (data[3].checked) allChars += special;

    if (allChars === "") {
      setPass("Select at least one option!");
      return;
    }
    let newPass = "";
    for (let i = 0; i < range; i++) {
      const random = Math.floor(Math.random() * allChars.length);
      newPass += allChars[random];
    }
    setPass(newPass);
  }
  function copy() {
    if (pass) {
      navigator.clipboard.writeText(pass);
      alert("copyied to clipboard");
    }
  }

  return (
    <>
      <div className="container">
        <h1>Password Generator</h1>

        <input
          type="range"
          min={4}
          max={20}
          value={range}
          onChange={(e) => setRange(e.target.value)}
        />
        <div className="checkbox">
          {data.map((value, index) => (
            <label key={index}>
              {value.title}
              <input
                type="checkbox"
                checked={value.checked}
                onChange={() => checked(index)}
              />
            </label>
          ))}
        </div>
        <div className="generaterPass">
          <h6>{pass}</h6>{" "}
          <button onClick={generaterPass}> Generate Password</button>
        </div>
        <button onClick={copy}> Copy</button>
      </div>
    </>
  );
}
