import React, {useState} from 'react'
import axios from 'axios'

// önerilen başlangıç stateleri
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);

  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.

  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
    const x = (index % 3) + 1
    const y = Math.floor(index / 3) + 1
    return { x, y }
  }

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
    const { x, y } = getXY();
    return `Koordinatlar (${x}, ${y})`
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    setIndex(initialIndex);
    setSteps(initialSteps);
    setEmail(initialEmail);
    setMessage(initialMessage);
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.
    if (yon === 'left') {
      if (index % 3 === 0) return index
      else return index - 1
    }
    if (yon === 'right') {
      if (index % 3 === 2) return index
      else return index + 1
    }
    if (yon === 'up') {
      if (index < 3) return index
      else return index - 3
    }
    if (yon === 'down') {
      if (index > 5) return index
      else return index + 3
    }
    return index
  }

  function ilerle(evt) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
    const yon = evt.target.id;
    const yeniIndex = sonrakiIndex(yon);
    if (yeniIndex !== index) {
      setIndex(yeniIndex);
      setSteps(s => steps + 1);
    }
  }

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    evt.preventDefault();
    const payload = {
      x, y, steps, email,
    }
    axios.post('http://localhost:9000/api/result', payload)
    .then(response => {
      setMessage(response.data.message);
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      }
    });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMesaj()}</h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" type='button' onClick={ilerle}>SOL</button>
        <button id="up" type='button' onClick={ilerle}>YUKARI</button>
        <button id="right" type='button' onClick={ilerle}>SAĞ</button>
        <button id="down" type='button' onClick={ilerle}>AŞAĞI</button>
        <button id="reset" type='button' onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="email girin" onChange={onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
