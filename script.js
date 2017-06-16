/**
 * Created by Shon Camarlinghi 5/27/2017
 */
//
// window.onload = function(){
//     var amount = document.getElementById("amount").value;
//     var apr = document.getElementById("apr").value;
//     var years = document.getElementById("years").value;
//     var zip = document.getElementById("zip").value;
//
// };
//
// var amount = document.getElementById("amount").value;
// var apr = document.getElementById("apr").value;
// var years = document.getElementById("years").value;
// var zip = document.getElementById("zip").value;



// var amount = oForm.elements["Amount"].value;
// var apr = oForm.elements("Apr").value;
// var years = oForm.elements("Years").value;
// var zip = oForm.elements("Zip").value;


function myFunction(){
    var x = document.getElementById("first_form");

    var i;
    for (i = 0; i < x.length ;i++) {
        myArray [i] = x.elements[i].value ;
    }
    document.getElementById("demo").innerHTML = text;
}

var myArray = [amount, apr, years];
myFunction();
var amount = myArray[0];
var apr = myArray[1];
var years = myArray[2];
var zip = myArray[3];
console.log(amount, apr, years, zip);


function getRequest() {
    var request;
    if(window.XMLHttpRequest){
        request  = new XMLHttpRequest();
    }else{
        request = new ActiveXObject();
    }
    return request;
}



function calc(amount,apr,years){



    var a_monthly; //amount of monthly payments
    var a_total; // total amount  of payments with interest.
    var i_total; //total interest on the loan
    var P = amount; //principal
    var i = apr/100; //apr/100; monthly interest as a decimal
    var n = years*12; // years/12;number of monthly payments

    var OnePlus_i_InPower_n = Math.pow((1 + i), n);
    a_monthly = (P * i * OnePlus_i_InPower_n)/ (OnePlus_i_InPower_n - 1);
    a_monthly= Math.round(a_monthly);
    a_total = P * Math.pow((1+ i/n), n*years);
    i_total = amount/apr;

    console.log(P,i,n);

    var request;
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    } else {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }

    request.open('GET', 'data.json', false);
    request.onreadystatechange = function() {
        if ((request.readyState === 4 && request.status === 200)){
            var items = JSON.parse(request.responseText);
            let myHTMLTemplate1 = "<ol>";
            myHTMLTemplate1 += "<li>";
            myHTMLTemplate1 += "<p>" + "Monthly payments : $" + a_monthly + "</p>";
            myHTMLTemplate1 += "<p>" + "Total payment : $" + a_total + "</p>";
            myHTMLTemplate1 += "<p>" + "Total interest : $" + i_total + "</p>";

            myHTMLTemplate1 += "</ol>";
            document.getElementById('output1').innerHTML = myHTMLTemplate1;
        }
    };
    request.send();
}

(function (noOfTime){
    for(let x = 0; x < noOfTime; x++){
        let xhrObject = getRequest();
        xhrObject.open('GET', 'data.txt', false);
        xhrObject.onreadystatechange = function() {
            if (xhrObject.readyState === 4 && xhrObject.status === 200){
                console.log('done AJAX');
                document.getElementById('output4').innerHTML = xhrObject.responseText;
            }
        };
        xhrObject.send();
    }
})();

function getLenders(amount,apr,years,zip){


    calc(amount, apr, years);

    var request;
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    } else {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }

    request.open('GET', 'data.json', false);
    request.onreadystatechange = function() {
        if ((request.readyState === 4 && request.status === 200)){
            var items = JSON.parse(request.responseText);
            var myHTMLTemplate2 = "<ol>";
            for (var key in items){
                myHTMLTemplate2 += "<li>";
                myHTMLTemplate2 += "<h1>";
                myHTMLTemplate2 += items[key].name + "</h1>";
                myHTMLTemplate2 += "<img src = images/" + items[key].name + "_.gif />";
                myHTMLTemplate2 += "<p>" + items[key].apr +  "</p>";
                myHTMLTemplate2 += "<p>" + items[key].inform +  "</p>";
            }
            myHTMLTemplate2 += "</ol>";
            document.getElementById('output2').innerHTML = myHTMLTemplate2;
        }
    };
    request.send();
}






