import { useEffect, useState } from 'react'
import {defStyle,podpisStyle,fioStyle,linkStyle,imageStyle} from './style'
import base64 from './base64'
import "./style.css"

export default function App() {
  const [fio,setFio] = useState('') 
  const [dolzn,setDolzn] = useState('')
  const [address,setAddress] = useState('664040, г. Иркутск, ул. Розы Люксембург, 182/2')
  const [workPhone,setWorkPhone] = useState('')
  const [dopPhone,setDopPhone] = useState('')
  const [sotPhone,setSotPhone] = useState('')
  const [mail,setMail] = useState('')
  const [text,setText] = useState('')
  const [images,setImages] = useState([])

  useEffect(()=> {
    maskPhone("#phone_work","+7 (____) ___-___")
    maskPhone("#phone_sot","+7 ___ ___-__-__")
    document.getElementById("copy").addEventListener("click", e => {e.preventDefault();e.target.setAttribute("data-clipboard-text", document.getElementById("result").innerHTML)})
    new ClipboardJS('.copy')
  })

  function maskPhone(selector, masked = '+7 (___) ___-__-__') {
    const elem = document.querySelector(selector);
    function mask(event) {
      const keyCode = event.keyCode;
      const template = masked,
        def = template.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
        let i = 0,
          newValue = template.replace(/[_\d]/g, (a) => i < val.length ? val.charAt(i++) || def.charAt(i) : a);
        i = newValue.indexOf("_");
        if (i !== -1) newValue = newValue.slice(0, i);
        let reg = template.substr(0, this.value.length).replace(/_+/g,(a) => "\\d{1," + a.length + "}").replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = newValue;
        if (event.type === "blur" && this.value.length < 5) this.value = "";
      }
      ['input','focus','blur'].map(event => elem.addEventListener(event,mask))
    }
  return <>
      <h1>Создание подписей для почты</h1>
      <form>
          <input type="text" placeholder="ФИО" id="fio" value={fio} onChange={e => setFio(e.target.value)}/>
          <input type="text" placeholder="Должность" id="dolzn" value={dolzn} onChange={e => setDolzn(e.target.value)}/>
          <div className="phones">
              <input type="tel" placeholder="Рабочий телефон" id="phone_work" value={workPhone} 
                onInput={e => setWorkPhone(e.target.value)}
                onFocus={e => setWorkPhone(e.target.value)}
                onBlur={e => setWorkPhone(e.target.value)}
              />
              <input type="tel" placeholder="Добавочный (Необязательно)" id="phone_dop" maxLength="3" value={dopPhone} onChange={e => setDopPhone(e.target.value)}/>
          </div>
          <select name="address" id="address" value={address} onChange={e => setAddress(e.target.value)}>
              <option value="664040, г. Иркутск, ул. Розы Люксембург, 182/2">664040, г. Иркутск, ул. Розы Люксембург, 182/2</option>
              <option value="665806, г. Ангарск, Степана Разина, 3">665806, г. Ангарск, Степана Разина, 3</option>
              <option value="660079, г. Красноярск, ул. 60 лет Октября, 148ж">660079, г. Красноярск, ул. 60 лет Октября, 148ж</option>
              <option value="660020, г. Красноярск, ул. Дудинская, 3">660020, г. Красноярск, ул. Дудинская, 3</option>
              <option value="630088, г. Новосибирск, Северный проезд, 33">630088, г. Новосибирск, Северный проезд, 33</option>
              <option value="675028, г. Благовещенск, ул. Студенческая, 15">675028, г. Благовещенск, ул. Студенческая, 15</option>
              <option value="690039, г. Владивосток, ул. Енисейска, 32 ст1">690039, г. Владивосток, ул. Енисейска, 32 ст1</option>
              <option value="680006, г. Хабаровск, ул. Краснореченская, 72а лит З">680006, г. Хабаровск, ул. Краснореченская, 72а лит З</option>
          </select>
          <input type="tel" placeholder="Сотовый телефон (Необязательно)" id="phone_sot" value={sotPhone}
            onInput={e => setSotPhone(e.target.value)}
            onFocus={e => setSotPhone(e.target.value)}
            onBlur={e => setSotPhone(e.target.value)}
          />
          <input type="email" name="" placeholder="Эл.Почта" id="work_mail" value={mail} onChange={e => setMail(e.target.value)}/>
          <div className="form-not">
              <h2>Необязательные поля</h2>
              <textarea name="" id="text-input" cols="30" rows="10" placeholder="Произвольный текст" value={text} onChange={e => setText(e.target.value)}></textarea>
              <label htmlFor="card_generate">Доп.изображения<input type="file" name="card_generate" id="card_generate" multiple="multiple" onChange={e => {
                setImages([])
                let files = [...e.target.files]
                files.map((file,i) => {
                  let reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => {
                    setImages([...images,reader.result])
                  }
                })
              }}/></label>
          </div>
      </form>
      <div className="result-block">
          <div className="result" id="result">
              <div className="podpis" style={podpisStyle}>
                  <p className="prev-suv" style={defStyle}>С уважением,</p>
                  <p className="fio" style={{...defStyle,...fioStyle}}>{fio}</p>
                  <p className="suv" style={defStyle}>{dolzn}</p>
                  <p className="nb1" id="tel-p" style={defStyle}>раб.тел: <a href={`tel:${workPhone.replace(/[\s-]+/g, '')}`}>{workPhone}</a>
                    <span style={{marginLeft:"15px"}}>{workPhone && dopPhone ? `доп: ${dopPhone}` : ''}</span>
                  </p>
                  {sotPhone && <p style={defStyle} className='nb1'>моб.тел: <a href={`tel:${sotPhone.replace(/[\s-]+/g, '')}`}>{sotPhone}</a></p>}
                  <p className="ad1" style={defStyle}>адрес: {address}</p>
                  <p className="nb2" style={defStyle}>почта: <a href={`mailto:${mail}`}>{mail}</a></p>
                  <a href="https://kcu.ru" className="nb3" target="_blank">сайт: www.kcu.ru</a>
                  <a href="https://kcu.ru" target="_blank"><img src={base64} alt="" id="logo" style={linkStyle}/></a>
                  <p id="text" style={defStyle}>{text}</p>
                  {images.map((image,i) => <img src={image} alt="" className="card" style={imageStyle} key={`image${i}`}/>)}
              </div>    
          </div>
          <button className="copy" id="copy">Скопировать</button>
      </div>
    </>
}
