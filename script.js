const logo = document.getElementById("logo")
logo.src = baseLogoSrc

const input_dolzn = document.getElementById("dolzn")
const input_fio = document.getElementById("fio")
const input_phone_work = document.getElementById("phone_work")
const input_phone_sot = document.getElementById("phone_sot")
const input_work_mail = document.getElementById("work_mail")
const input_logo_generate = document.getElementById("logo_generate")
const card_logo_generate = document.getElementById("card_generate")
const button_generate = document.getElementById("generate_button")
const text_input = document.getElementById("text-input")
const input_address = document.getElementById("address")

let stateObject = {
    dolzn:"",
    fio:"",
    phone_work:"",
    address:input_address.value,
    phone_sot:"",
    work_mail:"",
    logo_generate:"",
    card_generate:[],
    text:"",
}

input_address.addEventListener("change",() => {
    stateObject.address = input_address.value
    generatePrevResult()
})

input_dolzn.addEventListener("input",()=> {
    stateObject.dolzn = input_dolzn.value
    generatePrevResult()
})

input_fio.addEventListener("input",()=> {
    stateObject.fio = input_fio.value
    generatePrevResult()
})

input_phone_work.addEventListener("input",()=> {
    stateObject.phone_work = input_phone_work.value
    generatePrevResult()
})

input_phone_sot.addEventListener("input",()=> {
    stateObject.phone_sot = input_phone_sot.value
    generatePrevResult()
})

input_work_mail.addEventListener("input",()=> {
    stateObject.work_mail = input_work_mail.value
    generatePrevResult()
})

text_input.addEventListener("input",() => {
    stateObject.text = text_input.value
    generatePrevResult()
})

document.getElementById("copy").addEventListener("click", e => {
    e.preventDefault()
    e.target.setAttribute("data-clipboard-text", document.getElementById("result").innerHTML)
})

card_logo_generate.addEventListener("change",() => {
    if(card_logo_generate['files'].length > 0) {
        if(document.querySelectorAll(".card").length > 0) {
            stateObject.card_generate = []
            for(let card of document.querySelectorAll(".card")) {
                card.remove()
            }
        }
        for(let i =0;i <card_logo_generate['files'].length;i++) {
            let file = card_logo_generate['files'][i]
            let reader = new FileReader();
            reader.onload = function () {
                stateObject.card_generate[i] = reader.result.replace("data:", "").replace(/^.+,/,"");
                document.getElementById("text").insertAdjacentHTML("afterend",'<img src="data:image/jpeg;base64,'+ stateObject.card_generate[i] +'" alt="" class="card">')
            }
            reader.readAsDataURL(file);  
        }
        
    } else {
        stateObject.card_generate = ""
        if(document.querySelectorAll(".card").length > 0) {
            for(let card of document.querySelectorAll(".card")) {
                card.remove()
            }
        }
    }
})

function generatePrevResult() {
    document.querySelector(".podpis .suv").innerHTML = stateObject.dolzn
    document.querySelector(".podpis .fio").innerHTML = stateObject.fio
    if(stateObject.phone_work.length > 17) {
        stateObject.phone_work = stateObject.phone_work.substring(0,17)
    }
    if(stateObject.phone_work == "+7" || stateObject.phone_work == "+7 ") stateObject.phone_work = ""
    document.querySelectorAll(".podpis .nb1")[0].innerHTML = "раб.тел: " + `<a href="${stateObject.phone_sot.replace(/[\s-]+/g, '')}">${stateObject.phone_work}</a>`
    document.querySelectorAll(".podpis .nb1 a")[0].setAttribute("href","tel:"+ stateObject.phone_work.replace(/[\s-()]+/g, ''))
    genSot()
    document.querySelector(".podpis .ad1").innerHTML = "адрес: " + stateObject.address
    document.querySelector(".podpis .nb2").innerHTML = "почта: " + `<a href="mailto:${stateObject.work_mail}" target="_blank">${stateObject.work_mail}</a>`
    !!stateObject.logo_generate ?
        logo.src = "data:image/jpeg;base64," + stateObject.logo_generate 
        : logo.src = baseLogoSrc  
    document.getElementById("text").innerHTML = stateObject.text
}

function genSot() {
    if(stateObject.phone_sot !="+7" && stateObject.phone_sot !="+7 " && !!stateObject.phone_sot) {
        if(stateObject.phone_sot.length > 16) {
            stateObject.phone_sot = stateObject.phone_sot.substring(0,16)
        }
        if(document.querySelectorAll(".podpis .nb1").length < 2){
            document.getElementById("tel-p").insertAdjacentHTML("afterend",'<p class="nb1">моб.тел: '+ `<a href="tel:${stateObject.phone_sot.replace(/[\s-]+/g, '')}">${stateObject.phone_sot}<a/>` +'</p>')
        } else {
            document.querySelectorAll(".podpis .nb1")[1].innerHTML = "моб.тел: " + `<a href="tel:${stateObject.phone_sot.replace(/[\s-]+/g, '')}">${stateObject.phone_sot}<a/>`
        }
    } else {
        if(document.querySelectorAll(".podpis .nb1").length >= 2) {
            document.querySelectorAll(".podpis .nb1")[1].remove()
        }
    }
}

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

maskPhone("#phone_work","+7 (____) ___-___")
maskPhone("#phone_sot","+7 ___ ___-__-__")
new ClipboardJS('.copy')




