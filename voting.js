
console.log("lava scrip");



function dataReterive(_callback){
    var voteed;
    Coursetro.getTotalCandidateVotes(function (error, result) {
        voteed = result;
        console.log(voteed[0] + " Votes");
        console.log(voteed[1] + " Votes");
    
    });
    
Coursetro.getCandidates(function (error, result) {
    if (!error) {
       
        $("#c1").html("1 - "+web3.toUtf8(result[0]));
        $("#c2").html("2 - "+web3.toUtf8(result[1]));
        console.log(web3.toUtf8(result[0]));



        var table = document.getElementById("myTable");
        //  var row = table.insertRow(1);
        var i;
        for (i = 0; i < result.length; i++) {
            var row = table.insertRow(i + 1);

            var cell1 = row.insertCell(0);
            cell1.innerHTML = i + 1;
            var cell2 = row.insertCell(1);
            cell2.innerHTML = web3.toUtf8(result[i]);

            var cell3 = row.insertCell(2);
            cell3.innerHTML = voteed[i];

        }
        _callback(); 
    }
    else
        console.error(error);
});
console.log("Here");
}

// Retrieve


console.log(sessionStorage.getItem("key") + " Session ---------");

// console.log(publickey + " Key -------");
console.log("Fere");

var myLink = document.getElementById('btnVoting');

var eligible=false;
function firstFunction(_callback){
    // do some asynchronous work
    console.log("-------------- 4  ");
    Coursetro.CheckVoting(sessionStorage.getItem("key"), function (error, result) {
        if(!error){
           if (result == true) {

               console.log(result + " You have already voted");
               console.log("-------------- 5  ");
               
               $("#lgmsg").html("You have already voted");
               _callback();   
           }
           else {
               console.log(result + " You have NOT voted");

               eligible=true;
               console.log("-------------- 6  ");
               _callback();   
           }

        }
           
       });
    // and when the asynchronous stuff is complete
    console.log("-------------- 7  ");
}

function CallingFunction(){
    dataReterive(function(){
        comboFill();
     });
}
CallingFunction();

function comboFill( ){
    var x, i, j, selElmnt, a, b, c;
    /*look for any elements with the class "custom-select":*/
    x = document.getElementsByClassName("custom-select");
    for (i = 0; i < x.length; i++) {
      selElmnt = x[i].getElementsByTagName("select")[0];
      /*for each element, create a new DIV that will act as the selected item:*/
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);
      /*for each element, create a new DIV that will contain the option list:*/
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      for (j = 1; j < selElmnt.length; j++) {
        /*for each option in the original select element,
        create a new DIV that will act as an option item:*/
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            /*when an item is clicked, update the original select box,
            and the selected item:*/
            var y, i, k, s, h;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            h = this.parentNode.previousSibling;
            for (i = 0; i < s.length; i++) {
              if (s.options[i].innerHTML == this.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = this.innerHTML;
                y = this.parentNode.getElementsByClassName("same-as-selected");
                for (k = 0; k < y.length; k++) {
                  y[k].removeAttribute("class");
                }
                this.setAttribute("class", "same-as-selected");
                break;
              }
            }
            h.click();
        });
        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", function(e) {
          /*when the select box is clicked, close any other select boxes,
          and open/close the current select box:*/
          e.stopPropagation();
          closeAllSelect(this);
          this.nextSibling.classList.toggle("select-hide");
          this.classList.toggle("select-arrow-active");
        });
    }
    function closeAllSelect(elmnt) {
      /*a function that will close all select boxes in the document,
      except the current select box:*/
      var x, y, i, arrNo = [];
      x = document.getElementsByClassName("select-items");
      y = document.getElementsByClassName("select-selected");
      for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i)
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }
      for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add("select-hide");
        }
      }
    }
    /*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);

}


function secondFunction(){

    console.log("-------------- 1 ");

    console.log("-------------- 1 " +sessionStorage.getItem("key"));
    //Coursetro.vote(1, sessionStorage.getItem("key"));
    
    if(eligible==true){
        Coursetro.vote(1,sessionStorage.getItem("key"), function (error,result) {
            $("#lgmsg").html("Successfully voted");
        });
    }
  
    console.log("-------------- 3  ");
}


myLink.onclick = function () {

    var e = document.getElementById("canID");
    var id = e.options[e.selectedIndex].value;
    if (id > 0) {
        console.log("-------------- 0  ");
        firstFunction(function(){
           secondFunction();
        });

    }

}

var myLinkLogout = document.getElementById('btnLogout');
myLinkLogout.onclick = function () {
  console.log( " GLogout called");


  sessionStorage.setItem("key", "");
               
    
  window.location.replace("index.html");


  }