
     console.log("lava scrip");
     var vote;
          Coursetro.getTotalCandidateVotes(function(error, result){
             vote =result;
             console.log(vote[0] +" Votes");
             console.log(vote[1] +" Votes");
     
          });

$("button").click(function(){
  

     
        console.log("In trying logged");
        try{

            Coursetro.getLogin($("#pubkey").val(),function(error, result){
           
           

                if(result==true){
    
                    //
                   
                  
                   sessionStorage.setItem("key", $("#pubkey").val());
                   
        
                   window.location.replace("voting.html");
                    console.log("Login Access granted");
                }
                else{
                    $("#lgmsg").html("Incorrect Publick Key entered");
                    console.log("Login Access Not granted");
                
                }
    
            });

        }
        catch{
            $("#lgmsg").html("Invalid Publick Key entered");
            console.log("Login Access Not granted from catch");
        }
      
       // console.log( login+ " value");
        
     
    
    });
