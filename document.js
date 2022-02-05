const state = {
    xmlDoc:null
}

function lock1(ev){
    const keys = /[0-9]/
    if(ev.key.match(keys)){
        ev.preventDefault()
    }
}

function lock2(ev){
    const keys = /[a-zA-Z]/
    const regex = /^[0-9]{10}$/;
    if(ev.key.match(keys) || ev.target.value.match(regex)){
        ev.preventDefault()
    }
}

const emailValidator = (value) => {
    if(!value || value == null){return false}
    const cont = document.getElementById("email-cont")
    const regex = /[a-zA-Z0-9]@christuniversity.in/;
    if(regex.test(value)){
        cont.classList.remove("input_error")
        return true
    }else{    
        cont.classList.add("input_error")
      return false
    }
}

const phoneNumValidator = value => {
    if(!value || value == null){return false}
    const cont = document.getElementById("phone-cont")
    const regex = /[0-9]{10}/
    if(regex.test(value)){
        cont.classList.remove("input_error")
        return true
    }else{    
        cont.classList.add("input_error")
        return false
    }
  }

const passwordValidator = value => {
    if (!value || value == null){return false}
    const cont = document.getElementById("pass-cont")
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).+$/
    if(regex.test(value)){
      cont.classList.remove("input_error")
      return true
    }else{    
        cont.classList.add("input_error")
      return false
    }
}

function passwordValidationHandler(ev){
    
}

const ageValidator = value => {
    if (!value || value == null){return false}
    const cont = document.getElementById("age-cont")
    if(value > 0){
      cont.classList.remove("input_error")
      return true
    }else{    
        cont.classList.add("input_error")
      return false
    }
}

const submitFormHandler = () => {
    event.preventDefault()
    let email,phone,password,email_val,phone_val,user_val;
    email=phone=password=false;
    const form_elements = document.getElementById("reg-form").elements
    for(let i=0;i<form_elements.length;i++){
        if(form_elements[i].name == "email"){
            email = emailValidator(form_elements[i].value)
            email_val = form_elements[i].value
        }else if(form_elements[i].name == "phone_number"){
            phone = phoneNumValidator(form_elements[i].value)
            phone_val = form_elements[i].value
        }else if(form_elements[i].name == "password"){
            password = passwordValidator(form_elements[i].value)
        }else if(form_elements[i].name == "username"){
            user_val = form_elements[i].value
        }
    }
    if(email && phone && password){
        document.cookie = `username=${user_val};expires=Mon, 21 feb 2022 09:00:00 UTC; path=/`
        document.cookie = `email=${user_val};expires=Mon, 21 feb  2022 21:00:00 UTC; path=/`
        localStorage.setItem("phone number",phone_val)
        localStorage.setItem("email",email_val)
        alert("Form submitted successfully")
    }
}
const loadXml = () => {
    let xhttp;
    if(window.XMLHttpRequest){
        xhttp = new XMLHttpRequest();
    }else{
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4 && xhttp.status == 200){
            showTable(xhttp.responseXML)
        }
    }

    xhttp.open('GET','./NewFile.xml',true);
    xhttp.send();
}

const showTable = (xmlRes) => {
    if(!xmlRes){return;}
    state.xmlDocObj = xmlRes;
    let table;
    table = `<tr style='background:#36304a;color:	 #ffe6e6;'>
        <th>Student name</th>
        <th>Student university</th>
        </tr>`;
    const x = xmlRes.getElementsByTagName("COMPUTER-SCIENCE");
    console.log(xmlRes)
    for(let i=0;i<x.length;i++){
        table += `
        <tr>
            <td>${xmlRes.getElementsByTagName("STUD-NAME")[i].childNodes[0].nodeValue}</td>
            <td>${xmlRes.getElementsByTagName("STUD-UNIVERSITY")[i].childNodes[0].nodeValue}</td>
       </tr>
        `;
    }
    document.getElementById("xml-table").innerHTML = table;
}

loadXml()
