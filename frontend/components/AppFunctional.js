import axios from "axios";
import React, { useState } from "react";

// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.

  const [bIndex, setBIndex] = useState(initialIndex);
  const [counter, setCounter] = useState(initialSteps);
  const [email, setEmail] = useState(initialEmail);
  const [errorMessage, setErrorMessage] = useState(initialMessage);

  const postObject = {
    email: email,
    x: (bIndex + 1) % 3 == 0 ? 3 : (bIndex + 1) % 3,
    y: bIndex < 3 ? 1 : bIndex < 6 ? 2 : bIndex < 9 ? 3 : false,
    steps: counter,
  };

  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.

    const xyArray = [];
    for (let y = 1; y < 4; y++) {
      for (let x = 1; x < 4; x++) {
        xyArray.push(`(${x},${y})`);
      }
    }
    return xyArray[bIndex];
  }

  // function getXYMesaj() {
  //   // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
  //   // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
  //   // tamamen oluşturulmuş stringi döndürür.i
  //   // let messageKordinat = `Koordinatlar ${getXY()}`
  //   // let messageMove = `${counter} kez ilerlediniz.`
  //   // return (messageKordinat, messageMove)
  // }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.

    setCounter(0);
    setBIndex(initialIndex);
    setErrorMessage("");
    setEmail("");
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.

    if (yon === "left" && bIndex % 3 !== 0) {
      setBIndex(bIndex - 1);
      setCounter(counter + 1);
      setErrorMessage("");
    } else if (yon === "left") {
      setErrorMessage("Sola gidemezsiniz");
    }

    if (yon === "right" && bIndex % 3 !== 2) {
      setBIndex(bIndex + 1);
      setCounter(counter + 1);
      setErrorMessage("");
    } else if (yon === "right") {
      setErrorMessage("Sağa gidemezsiniz");
    }

    if (yon === "up" && bIndex > 2) {
      setBIndex(bIndex - 3);
      setCounter(counter + 1);
      setErrorMessage("");
    } else if (yon === "up") {
      setErrorMessage("Yukarıya gidemezsiniz");
    }

    if (yon === "down" && bIndex < 6) {
      setBIndex(bIndex + 3);
      setCounter(counter + 1);
      setErrorMessage("");
    } else if (yon === "down") {
      setErrorMessage("Aşağıya gidemezsiniz");
    }
  }

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.

    evt.preventDefault();
    axios
      .post("http://localhost:9000/api/result", postObject)
      .then(function (response) {
        console.log(response);
        setErrorMessage(response.data.message);
        setEmail("");
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setErrorMessage(error.response.data.message);
      });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar {getXY()}</h3>
        <h3 id="steps">{counter} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === bIndex ? " active" : ""}`}>
            {idx === bIndex ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 data-testid="message" id="message">
          {errorMessage}
        </h3>
      </div>
      <div id="keypad">
        <button
          onClick={() => sonrakiIndex("left")}
          id="left"
          data-testid="sol"
        >
          SOL
        </button>
        <button onClick={() => sonrakiIndex("up")} id="up" data-testid="yukarı">
          YUKARI
        </button>
        <button
          onClick={() => sonrakiIndex("right")}
          id="right"
          data-testid="sağ"
        >
          SAĞ
        </button>
        <button
          onClick={() => sonrakiIndex("down")}
          id="down"
          data-testid="aşağı"
        >
          AŞAĞI
        </button>
        <button onClick={reset} id="reset">
          reset
        </button>
      </div>
      <form>
        <input
          onChange={onChange}
          value={email}
          id="email"
          type="email"
          placeholder="email girin"
          data-testid="emailInput"
        ></input>
        <input onClick={onSubmit} id="submit" type="submit"></input>
      </form>
    </div>
  );
}
