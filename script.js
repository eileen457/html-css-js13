const fullName=document.getElementById("full-name");
const email=document.getElementById("email");
const orderNo=document.getElementById("order-no");
const productCode=document.getElementById("product-code");
const quantity=document.getElementById("quantity");
const complaintsGroup=document.querySelectorAll("#complaints-group input[type='checkbox']");
const complaintDes=document.getElementById("complaint-description");
const solutionsGroup=document.querySelectorAll("#solutions-group input[type='radio']");
const solutionDes=document.getElementById("solution-description");


const otherCheck=document.getElementById("other-complaint");
const otherRadio=document.getElementById("other-solution");

const form=document.getElementById("form");
const message=document.getElementById("message-box");

const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const orderRegex=/^2024\d{6}$/;
const productRegex=/^[a-zA-Z]{2}\d{2}-[a-zA-Z]\d{3}-[a-zA-Z]{2}\d$/;

function validateForm(){
  const obj={
    "full-name": fullName.value.trim()!=="",
    "email": emailRegex.test(email.value),
    "order-no":orderRegex.test(orderNo.value),
    "product-code":productRegex.test(productCode.value),
    "quantity":Number.isInteger(Number(quantity.value)) && Number(quantity.value)>0,
    "complaints-group":Array.from(complaintsGroup).some(c=>c.checked),
    "complaint-description": !otherCheck.checked || complaintDes.value.trim().length >= 20,
    "solutions-group": Array.from(solutionsGroup).some(r=>r.checked),
    "solution-description": !otherRadio.checked || solutionDes.value.trim().length >= 20

  };

  return obj;
}

function isValid(objValidate){
  return Object.values(objValidate).every(v=>v===true);
}


function redGreen(fieldId, isFvalid){
  let element;
  
  if(fieldId==="complaints-group" || fieldId==="solutions-group"){
    element=document.getElementById(fieldId);
  }else{
    element=document.getElementById(fieldId);
  }

  if(element){
    element.style.borderColor=isFvalid ? "green" : "red";
    element.style.borderStyle="solid";
  }
}

const input=["full-name","email","order-no","product-code","quantity","complaint-description","solution-description"];

input.forEach(id=>{
  document.getElementById(id).addEventListener("change",()=>{
    const currentSt=validateForm();
    redGreen(id,currentSt[id]);
  });
});


document.querySelectorAll("#complaints-group input").forEach(input=>{
  input.addEventListener("change",()=>{
    const currentSt=validateForm();
    redGreen("complaints-group",currentSt["complaints-group"]);
    redGreen("complaint-description",currentSt["complaint-description"]);

    // Si 'Other' está marcado, muestra el textarea. Si no, lo oculta.
    complaintDes.style.display = otherCheck.checked ? "block" : "none";
  });
});

document.querySelectorAll("#solutions-group input").forEach(input=>{
  input.addEventListener("change",()=>{
    const currentSt=validateForm();
    redGreen("solutions-group", currentSt["solutions-group"]);
    redGreen("solution-description",currentSt["solution-description"]);

   // Si el radio 'Other' está seleccionado, muestra el textarea. Si no, lo oculta.
    solutionDes.style.display = otherRadio.checked ? "block" : "none";
  });
});


form.addEventListener("submit", function(e){
  e.preventDefault();

  const formSt=validateForm();

  if(isValid(formSt)){
    message.textContent="Formulario valido! Enviando los datos a la central...";
    message.style.color="green";
  }else{
        message.textContent="Formulario invalido! Por favor corrija los errores marcados en rojo...";
    message.style.color="red";
    Object.keys(formSt).forEach(k=>{
      redGreen(k,formSt[k]);
    });
  }
});


document.getElementById("clear-btn").addEventListener("click",function(){
 form.reset();

 if(message){
  message.textContent="";
 }

const obj=[
    "full-name",
    "email",
    "order-no",
    "product-code",
    "quantity",
    "complaints-group",
    "complaint-description",
    "solutions-group",
    "solution-description"
  ];

  obj.forEach(id=>{
    const element=document.getElementById(id);
    if(element){
      element.style.borderColor="";
      element.style.borderStyle="";
      complaintDes.style.display = "none";
      solutionDes.style.display = "none";
    }
  });
});
