/**
 * Created by iris7 on 6/15/17.
 */

// var amount;
// var apr;
// var years;
function calc(amount,apr,years){
    var a; //amount of monthly payments
    var P = amount; //principal
    var i = apr/100; //apr/100; monthly interest as a decimal
    var n = years*12; // years/12;number of monthly payments
    var OnePlus_i_InPower_n = Math.pow((1 + i), n);
    a = (P * i * OnePlus_i_InPower_n)/ (OnePlus_i_InPower_n - 1);
    a = Math.round(a);
    console.log(a);
}


calc(20000, 3.5, 3);