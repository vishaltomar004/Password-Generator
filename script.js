const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber");

const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");

const numbersCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generateButton");
const allCheckBox=document.querySelectorAll("input[type=checkbox");
// console.log(allCheckBox);
const symbols='~!@#$%^&*()_-+={[}]:;<,">.?/';

let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();
//set strength cicle color to grey
setIndicator("#ccc");


//set password Length
function handleSlider(){
    inputSlider.value=passwordLength;
    // console.log("handler code ");
    lengthDisplay.innerText=passwordLength;
    // console.log("HANDLER CODE CHAL RAHA HAI");
    //or kuch bhi karna chahiye
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+ "100%";
}

function setIndicator(color){
    indicator.style.backgroundColor=color;
  //shadow
  indicator.style.boxShadow="0px 0px 12px 1px ${color}";
}

function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
} 
 console.log("Yeh chala");  
 console.log(getRndInteger(0,9));
function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
   return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
 }

function generateSymbol(){
    const randNum=getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    console.log("Yeh chala");
   
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    // if(uppercaseCheck.checked) hasUpper=true;
    // if(lowercaseCheck.checked) hasLower=true;
    // if(numbersCheck,checked) hasNum=true;
    // if(symbolsCheck.checked) hasSym=true;
    console.log("uppercasechecked part 1     " +  uppercaseCheck.checked);

    if(uppercaseCheck.checked){
        console.log("Inside uppercasecheceked");
        hasUpper=true;
    }
    if(lowercaseCheck.checked){
        hasLower=true;
    }
    if(numbersCheck.checked){
        hasNum=true;
    }
    if(symbolsCheck.checked){
        hasSym=true;
    } 
    console.log("uppercasechecked " +  uppercaseCheck.checked);
    console.log(hasLower);
    console.log(hasUpper);
    console.log(hasNum);
    console.log(hasSym);

    if(hasUpper && hasLower &&(hasNum || hasSym) && passwordLength>=8){
        setIndicator("#0f0");
    }else if(
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength>=6
    ){
        setIndicator("#ff0");
    }else {
        setIndicator("#f00");
    }
}

    async function copyContent(){
        try{
            await navigator.clipboard.writeText(passwordDisplay.value);
            copyMsg.innerText="Copied";
        }
        catch(e){
              copyMsg.innerText="failed";
        }
    //to make copy wala span visible
    copyMsg.classList.add("active");
    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);

} 


function shufflePassword(array){
    //Fisher Yates Method  

    for(let i =array.length-1; i>0; i--){
        const j=Math.floor(Math.random() * (i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }

    let str="";
    array.forEach((el)=> (str+=el));
return str;

}

function handleCheckBoxChange(){
    console.log("Check box")
    checkCount=0;
    console.log(checkCount);
    allCheckBox.forEach((checkbox) =>{
        if(checkbox.checked){
            checkCount++;
            console.log("check count"+ checkCount)
        }
        
    })  

    //special condition
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

}

 allCheckBox.forEach((checkbox) =>{
    checkbox.addEventListener('change',handleCheckBoxChange);
})   
// for(let i =0; i<allCheckBox.length; i++){
//     allCheckBox[i].addEventListener('change',handleCheckBoxChange);
// }


inputSlider.addEventListener('input',(e)=>{
     passwordLength=e.target.value;
    // console.log("event input slider");
    handleSlider();
})


copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        copyContent();
})


generateBtn.addEventListener('click',()=> {
  //none of the checkbox are selected
//   console.log("clicked");   
  if(checkCount <=0) {
    // console.log(checkCount)
    return ;
  }
  if(passwordLength<checkCount){
    passwordLength=checkCount;
    handleSlider();
  }
//   console.log("IF");
  // lets start the journey to find password
console.log("Startinng jouorney");
  //remove old password
  password="";
  
  // let's put he stuff mention by checkboxes

//   if(uppercaseCheck.checked){
//     password+=generateUpperCase();
//   }

//   if(lowercaseCheck.checked){
//     password+=generateLowerCase();
//   }

//   if(numbersCheck.checked){
//     password+=generateRandomNumber();
//   }

//   if(symbolsCheck.checked){
//     password+=generateSymbol();
//   } 


let funArr=[];
if(uppercaseCheck.checked)
funArr.push(generateUpperCase);
// console.log("upperCase done")

if(lowercaseCheck.checked)
funArr.push(generateLowerCase);
// console.log("lowerCase Done")

if(numbersCheck.checked)
funArr.push(generateRandomNumber);
// console.log("number Done");


if(symbolsCheck.checked)
funArr.push(generateSymbol); 

//compulsory addition
// console.log("compulsory Addition");
for(let i =0; i<funArr.length; i++){
    password+=funArr[i]();
}

//remaining addition

for(let i=0; i<passwordLength-funArr.length; i++){
    let randIndex=getRndInteger(0,funArr.length);
    // console.log("his is funarr len"+ funArr.length);
    // console.log("randINdex "+ randIndex)
    password+=funArr[randIndex]();
} 

// shuffel the password

password=shufflePassword(Array.from(password));

//show in UI
passwordDisplay.value=password;

//calculate strength
calcStrength();

});