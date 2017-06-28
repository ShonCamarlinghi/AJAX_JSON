/**
 * Created by Shon Camarlinghi 5/27/2017
 */
/*global $*/

// let $ = jquery;
let amount, apr, years, zip;

// $(document).ready(function () {
//     amount = $("#amount").val();
//     apr = $("#apr").val();
//     years = $("#years").val;
//     zip = $("#zip").val;
// });


function getInputs(){
    window.onload;
    // alert(1);
    amount = document.getElementById("amount").value;
    apr = document.getElementById("apr").value;
    years = document.getElementById("years").value;
    zip = document.getElementById("zip").value;
    console.log(amount, apr, years, zip);
}


function getRequest() {
    let request;
    if(window.XMLHttpRequest){
        request  = new XMLHttpRequest();
    }else{
        request = new ActiveXObject();
    }
    return request;
}

function calc(){
    let P = amount; //principal
    let i = (apr/100/12); //apr/100; monthly interest as a decimal
    let n = years*12; // years/12;number of monthly payments

    let OnePlus_i_InPower_n = Math.pow(1 + i, n);
    let a_monthly = ((P * i * OnePlus_i_InPower_n)/ (OnePlus_i_InPower_n - 1)).toFixed(2); //amount of monthly payments
    let a_total = (a_monthly * n).toFixed(2); // total amount  of payments with interest.
    let i_total = ((a_monthly * n)-P).toFixed(2); //total interest on the loan

    let request;
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    } else {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }

    request.open('GET', 'data.json', false);
    request.onreadystatechange = function() {
        if ((request.readyState === 4 && request.status === 200)){
            let items = JSON.parse(request.responseText);
            let myHTMLTemplate1 = "<ul>";
            myHTMLTemplate1 += "<li>";
            myHTMLTemplate1 += "<p>" + "Monthly payments : $" + a_monthly + "</p>";
            myHTMLTemplate1 += "<p>" + "Total payment : $" + a_total + "</p>";
            myHTMLTemplate1 += "<p>" + "Total interest : $" + i_total + "</p>";
            myHTMLTemplate1 += "</ul>";
            document.getElementById('output1').innerHTML = myHTMLTemplate1;
        }
    };
    request.send();
}



function getLenders(){
    getInputs();

    calc();
    calc_a(20000, 3.5, 3);
    let request;
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    } else {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }

    request.open('GET', 'data.json', false);
    request.onreadystatechange = function() {
        if ((request.readyState === 4 && request.status === 200)){
            let items = JSON.parse(request.responseText);
            let myHTMLTemplate2 = "<ul>";
            for (let key in items){
                myHTMLTemplate2 += "<li>";
                myHTMLTemplate2 += "<h1>";
                myHTMLTemplate2 += items[key].name + "</h1>";
                myHTMLTemplate2 += "<img src = images/" + items[key].name + "_.gif />";
                // myHTMLTemplate2 += "<img src =" + items[key].logo + "/>";
                myHTMLTemplate2 += "<p>" + items[key].apr +  "</p>";
                myHTMLTemplate2 += "<p>" + items[key].inform +  "</p>";
            }
            myHTMLTemplate2 += "</ul>";
            document.getElementById('output2').innerHTML = myHTMLTemplate2;
        }
    };
    request.send();
}

function calc_a(amount,apr,years){
    let a; //amount of monthly payments
    let P = amount; //principal
    let i = apr/100; //apr/100; monthly interest as a decimal
    let n = years*12; // years/12;number of monthly payments
    let OnePlus_i_InPower_n = Math.pow((1 + i), n);
    a = (P * i * OnePlus_i_InPower_n)/ (OnePlus_i_InPower_n - 1);
    a = Math.round(a);
    console.log(a);
}


calc_a(20000, 3.5, 3);




