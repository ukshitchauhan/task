let buttons=document.querySelectorAll(".btn");
let display=document.querySelector("#display");

let firstVal="";
let secondVal="";
let operation="";
let isSecond=false;
let res=0;

buttons.forEach(btn=>
{
    btn.addEventListener("click",function(e)
    {
        if(btn.classList.contains("clear"))
        {
            display.value="";
            firstVal="";
            secondVal="";
            isSecond=false;
            res=0;
        }
        else if(btn.classList.contains("del"))
        {
            display.value=display.value.slice(0,-1);
        }
        else if(/^[0-9.]$/.test(e.target.textContent))
        {
            if(!isSecond)
            {
            firstVal+=e.target.textContent;
            display.value=firstVal
            }else
            {
            display.value="";
            secondVal+=e.target.textContent;
            display.value=secondVal; 
            }
        }
        else if(/^[\+\-\*\/]$/.test(e.target.textContent))
        {
            operation=e.target.textContent;
            display.value=operation;
            isSecond=true;            
        }
        else if(btn.classList.contains("equal"))
        {
            if(firstVal!=="" && secondVal!=="" && operation!=="" )
            {
                let num1 = parseFloat(firstVal);
                let num2 = parseFloat(secondVal);
                switch (operation) {
                    case "+":
                        res=num1+num2;
                        break;
                    
                    case "-":
                        res=num1-num2;
                        break;
                    
                    case "*":
                        res=num1*num2;
                        break;

                    case "/":
                        res=num1/num2;
                        break;
                
                    default:
                        alert("Error");
                        break;
                }
            }
            // console.log(res);
            display.value=res;
        }

    });
});