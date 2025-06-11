let ques = document.getElementById("ques");
let opt0 = document.getElementById("opt0");
let opt1 = document.getElementById("opt1");
let opt2 = document.getElementById("opt2");
let opt3 = document.getElementById("opt3");
let text = document.getElementById("cw");
let next = document.getElementById("next");
let startcont = document.getElementById("startcont");
let ques1 = document.getElementById("ques1");
let opt01 = document.getElementById("opt01");
let opt11 = document.getElementById("opt11");
let opt21 = document.getElementById("opt21");
let opt31 = document.getElementById("opt31");
let text1 = document.getElementById("cw1");
let next1 = document.getElementById("next1");
let startcont1 = document.getElementById("startcont1");
let ques2 = document.getElementById("ques2");
let opt02 = document.getElementById("opt02");
let opt12 = document.getElementById("opt12");
let opt22 = document.getElementById("opt22");
let opt32 = document.getElementById("opt32");
let text2 = document.getElementById("cw2");
let next2 = document.getElementById("next2");
let startcont2 = document.getElementById("startcont2");
let ques3 = document.getElementById("ques3");
let opt03 = document.getElementById("opt03");
let opt13 = document.getElementById("opt13");
let opt23 = document.getElementById("opt23");
let opt33 = document.getElementById("opt33");
let text3 = document.getElementById("cw3");
let next3 = document.getElementById("next3");
let startcont3 = document.getElementById("startcont3");
let opt04 = document.getElementById("opt04");
let opt14 = document.getElementById("opt14");
let opt24 = document.getElementById("opt24");
let opt34 = document.getElementById("opt34");
let text4 = document.getElementById("cw4");
let next4 = document.getElementById("next4");
let startcont4 = document.getElementById("startcont4");
let opt05 = document.getElementById("opt05");
let opt15 = document.getElementById("opt15");
let opt25 = document.getElementById("opt25");
let opt35 = document.getElementById("opt35");
let text5 = document.getElementById("cw5");
let next5 = document.getElementById("next5");
let startcont5 = document.getElementById("startcont5");
let opt06 = document.getElementById("opt06");
let opt16 = document.getElementById("opt16");
let opt26 = document.getElementById("opt26");
let opt36 = document.getElementById("opt36");
let text6 = document.getElementById("cw6");
let next6 = document.getElementById("next6");
let startcont6 = document.getElementById("startcont6");
let opt07 = document.getElementById("opt07");
let opt17 = document.getElementById("opt17");
let opt27 = document.getElementById("opt27");
let opt37 = document.getElementById("opt37");
let text7 = document.getElementById("cw7");
let next7 = document.getElementById("next7");
let startcont7 = document.getElementById("startcont7");
let opt08 = document.getElementById("opt08");
let opt18 = document.getElementById("opt18");
let opt28 = document.getElementById("opt28");
let opt38 = document.getElementById("opt38");
let text8 = document.getElementById("cw8");
let next8 = document.getElementById("next8");
let startcont8 = document.getElementById("startcont8");
let opt09 = document.getElementById("opt09");
let opt19 = document.getElementById("opt19");
let opt29 = document.getElementById("opt29");
let opt39 = document.getElementById("opt39");
let text9 = document.getElementById("cw9");
let next9 = document.getElementById("next9");
let startcont9 = document.getElementById("startcont9");
let rty = document.getElementById("rty");
let ew = document.getElementById("ew");
let endcont = document.getElementById("endcont");

let i = 0;
let score = 0;
let points = document.getElementById("points")

ques.innerHTML = "1. Which club has won the most official international trophies in football history?";
opt0.innerHTML = "Real Madrid";
opt1.innerHTML = "Boca Juniors";
opt2.innerHTML = "Al Ahly";
opt3.innerHTML = "AC Milan";

opt0.addEventListener("click",()=>{
  opt0.style.display = "none";
  opt1.style.display = "none";
  opt2.style.display = "none";
  opt3.style.display = "none";
  text.innerHTML = "Wrong!!<br> Al Ahly SC (Egypt) has the most recognized international titles.";
  text.style.display = "block";
  points.innerHTML="Points: "+score;
  next.style.display = "block";
  i++;
  text.style.left = "20%";
  console.log(i);
})

opt1.addEventListener("click",()=>{
  opt0.style.display = "none";
  opt1.style.display = "none";
  opt2.style.display = "none";
  opt3.style.display = "none";
  text.innerHTML = "Wrong!!<br> Al Ahly SC (Egypt) has the most recognized international titles.";
  text.style.display = "block";
  points.innerHTML="Points: "+score;
  next.style.display = "block";
  i++;
  text.style.left = "20%";
  console.log(i);
})

opt2.addEventListener("click",()=>{
  opt0.style.display = "none";
  opt1.style.display = "none";
  opt2.style.display = "none";
  opt3.style.display = "none";
  text.innerHTML = "Correct!!<br> Al Ahly SC (Egypt) has the most recognized international titles.";
  text.style.display = "block";
  score++;
  points.innerHTML="Points: "+score;
  next.style.display = "block";
  i++;
  text.style.left = "20%";
  console.log(i);
})


opt3.addEventListener("click",()=>{
  opt0.style.display = "none";
  opt1.style.display = "none";
  opt2.style.display = "none";
  opt3.style.display = "none";
  text.innerHTML = "Wrong!!<br>Al Ahly SC (Egypt) has the most recognized international titles.";
  text.style.display = "block";
  points.innerHTML="Points: "+score;
  next.style.display = "block";
  i++;
  text.style.left = "20%";
  console.log(i);
})

next.addEventListener("click",()=>{
startcont.style.display = "none";
next.style.display = "none";
startcont2.style.display = "none";
startcont1.style.display = "block";

})


opt01.addEventListener("click",()=>{
  opt01.style.display = "none";
  opt11.style.display = "none";
  opt21.style.display = "none";
  opt31.style.display = "none"; 
  text1.style.left = "5%";
  text1.innerHTML = "Wrong!!<br> Just Fontaine scored 13 goals in the 1958 World Cup — still a record in a single edition.";
  text1.style.display = "block";
  points.innerHTML="Points: "+score;
  next1.style.display = "block";
  text1.style.left = "9%";
  i++;
  console.log(i);
 
})


opt11.addEventListener("click",()=>{
  opt01.style.display = "none";
  opt11.style.display = "none";
  opt21.style.display = "none";
  opt31.style.display = "none";
  text1.style.left = "5%";
  text1.innerHTML = "Correct!!<br> Just Fontaine scored 13 goals in the 1958 World Cup — still a record in a single edition.";
  text1.style.display = "block";
  score++;
  points.innerHTML="Points: "+score;
  next1.style.display = "block";
  text1.style.left = "9%";
  i++;
  console.log(i);
  
})

opt21.addEventListener("click",()=>{
  opt01.style.display = "none";
  opt11.style.display = "none";
  opt21.style.display = "none";
  opt31.style.display = "none";
   text1.style.left = "5%";
  text1.innerHTML ="Wrong!!<br> Just Fontaine scored 13 goals in the 1958 World Cup — still a record in a single edition.";
  text1.style.display = "block";
  points.innerHTML="Points: "+score;
  next1.style.display = "block";
  text1.style.left = "9%";
  i++;
  console.log(i);
 
})


opt31.addEventListener("click",()=>{
  opt01.style.display = "none";
  opt11.style.display = "none";
  opt21.style.display = "none";
  opt31.style.display = "none";
   text1.style.left = "5%";
  text1.innerHTML = "Wrong!!<br> Just Fontaine scored 13 goals in the 1958 World Cup — still a record in a single edition.";
  text1.style.display = "block";
  points.innerHTML="Points: "+score;
  next1.style.display = "block";
  text1.style.left = "9%";
  i++;
  console.log(i);
 
})



next1.addEventListener("click",()=>{
  startcont.style.display = "none";
  next.style.display = "none";
  startcont1.style.display = "none";
  startcont2.style.display = "block";
  })


  opt02.addEventListener("click",()=>{
    opt02.style.display = "none";
    opt12.style.display = "none";
    opt22.style.display = "none";
    opt32.style.display = "none";
    text2.innerHTML = "Wrong!!<br> Germany vs France (1982) This dramatic semifinal had 12 penalties taken";
    text2.style.display = "block";
    points.innerHTML="Points: "+score;
    next2.style.display = "block";
    i++;
    console.log(i);
  })
  
  
  opt12.addEventListener("click",()=>{
    opt02.style.display = "none";
    opt12.style.display = "none";
    opt22.style.display = "none";
    opt32.style.display = "none";
    text2.innerHTML = "Wrong!!<br> Germany vs France (1982) This dramatic semifinal had 12 penalties taken";
    text2.style.display = "block";
    points.innerHTML="Points: "+score;
    next2.style.display = "block";
    i++;
    console.log(i);
  })
  
  opt22.addEventListener("click",()=>{
    opt02.style.display = "none";
    opt12.style.display = "none";
    opt22.style.display = "none";
    opt32.style.display = "none";
    text2.innerHTML ="Correct!!<br> Germany vs France (1982) This dramatic semifinal had 12 penalties taken";
    text2.style.display = "block";
    score++;
    points.innerHTML="Points: "+score;
    next2.style.display = "block";
    i++;
    console.log(i);
  })
  
  
  opt32.addEventListener("click",()=>{
    opt02.style.display = "none";
    opt12.style.display = "none";
    opt22.style.display = "none";
    opt32.style.display = "none";
    text2.innerHTML = "Wrong!!<br> Germany vs France (1982) This dramatic semifinal had 12 penalties taken";
    text2.style.display = "block";
    points.innerHTML="Points: "+score;
    next2.style.display = "block";
    i++;
    console.log(i);
  })
  


  next2.addEventListener("click",()=>{
    startcont.style.display = "none";
    next.style.display = "none";
    startcont1.style.display = "none";
    startcont2.style.display = "none";
    startcont3.style.display = "block";
    })



    
  opt03.addEventListener("click",()=>{
    opt03.style.display = "none";
    opt13.style.display = "none";
    opt23.style.display = "none";
    opt33.style.display = "none";
    text3.innerHTML = "Wrong!!<br> Italy went unbeaten for 37 games from 2018 to 2021 — a world record.";
    text3.style.display = "block";
    points.innerHTML="Points: "+score;
    next3.style.display = "block";
    i++;
    console.log(i);
  })
  
  
  opt13.addEventListener("click",()=>{
    opt03.style.display = "none";
    opt13.style.display = "none";
    opt23.style.display = "none";
    opt33.style.display = "none";
    text3.innerHTML = "Wrong!!<br> Italy went unbeaten for 37 games from 2018 to 2021 — a world record.";
    text3.style.display = "block";
    points.innerHTML="Points: "+score;
    next3.style.display = "block";
    i++;
    console.log(i);
  })
  
  opt23.addEventListener("click",()=>{
    opt03.style.display = "none";
    opt13.style.display = "none";
    opt23.style.display = "none";
    opt33.style.display = "none";
    text3.innerHTML ="Correct!!<br> Italy went unbeaten for 37 games from 2018 to 2021 — a world record.";
    text3.style.display = "block";
    score++;
    points.innerHTML="Points: "+score;
    next3.style.display = "block";
    i++;
    console.log(i);
  })
  
  
  opt33.addEventListener("click",()=>{
    opt03.style.display = "none";
    opt13.style.display = "none";
    opt23.style.display = "none";
    opt33.style.display = "none";
    text3.innerHTML ="Wrong!!<br> Italy went unbeaten for 37 games from 2018 to 2021 — a world record.";
    text3.style.display = "block";
    points.innerHTML="Points: "+score;
    next3.style.display = "block";
    i++;
    console.log(i);
  })
  

  next3.addEventListener("click",()=>{
    startcont.style.display = "none";
    next.style.display = "none";
    startcont1.style.display = "none";
    startcont3.style.display = "none";
    startcont4.style.display = "block";
    })



    opt04.addEventListener("click",()=>{
      opt04.style.display = "none";
      opt14.style.display = "none";
      opt24.style.display = "none";
      opt34.style.display = "none";
      text4.innerHTML = "Wrong!!<br> Franz Beckenbauer Won all three in 1974 — World Cup with Germany, European Cup with Bayern, and Ballon d'Or.";
      text4.style.display = "block";
      points.innerHTML="Points: "+score;
      next4.style.display = "block";
      text4.style.left="3%";
      i++;
      console.log(i);
    })
    
    
    opt14.addEventListener("click",()=>{
      opt04.style.display = "none";
      opt14.style.display = "none";
      opt24.style.display = "none";
      opt34.style.display = "none";
      text4.innerHTML = "Wrong!!<br> Franz Beckenbauer Won all three in 1974 — World Cup with Germany, European Cup with Bayern, and Ballon d'Or.";
      text4.style.display = "block";
      points.innerHTML="Points: "+score;
      next4.style.display = "block";
      text4.style.left="3%";
      i++;
      console.log(i);
    })
    
    opt24.addEventListener("click",()=>{
      opt04.style.display = "none";
      opt14.style.display = "none";
      opt24.style.display = "none";
      opt34.style.display = "none";
      text4.innerHTML ="Wrong!!<br> Franz Beckenbauer Won all three in 1974 — World Cup with Germany, European Cup with Bayern, and Ballon d'Or.";
      text4.style.display = "block";
      text4.style.left="3%";
      points.innerHTML="Points: "+score;
      next4.style.display = "block";
      i++;
      console.log(i);
    })
    
    
    opt34.addEventListener("click",()=>{
      opt04.style.display = "none";
      opt14.style.display = "none";
      opt24.style.display = "none";
      opt34.style.display = "none";
      text4.innerHTML ="Correct!!<br> Franz Beckenbauer Won all three in 1974 — World Cup with Germany, European Cup with Bayern, and Ballon d'Or.";
      text4.style.display = "block";
      text4.style.left="3%";
       score++;
      points.innerHTML="Points: "+score;
      next4.style.display = "block"; 
      i++;
      console.log(i);
    })
    




    
  next4.addEventListener("click",()=>{
    startcont.style.display = "none";
    next.style.display = "none";
    startcont1.style.display = "none";
    startcont3.style.display = "none";
    startcont4.style.display = "none";
    startcont5.style.display = "block";
    
    })



    opt05.addEventListener("click",()=>{
      opt05.style.display = "none";
      opt15.style.display = "none";
      opt25.style.display = "none";
      opt35.style.display = "none";
      text5.innerHTML = "Wrong!!<br> Rogério Ceni Brazilian legend with over 400 clean sheets and also over 100 career goals.";
      text5.style.display = "block";
      points.innerHTML="Points: "+score;
      next5.style.display = "block";
      text5.style.left="7%";
      i++;
      console.log(i);
    })
    
    
    opt15.addEventListener("click",()=>{
      opt05.style.display = "none";
      opt15.style.display = "none";
      opt25.style.display = "none";
      opt35.style.display = "none";
      text5.innerHTML =  "Wrong!!<br> Rogério Ceni Brazilian legend with over 400 clean sheets and also over 100 career goals.";
      text5.style.display = "block";
      points.innerHTML="Points: "+score;
      next5.style.display = "block";
      text5.style.left="7%";
      i++;
      console.log(i);
    })
    
    opt25.addEventListener("click",()=>{
      opt05.style.display = "none";
      opt15.style.display = "none";
      opt25.style.display = "none";
      opt35.style.display = "none";
      text5.innerHTML ="Wrong!!<br> Rogério Ceni Brazilian legend with over 400 clean sheets and also over 100 career goals.";
      text5.style.display = "block";
      text5.style.left="7%";
      points.innerHTML="Points: "+score;
      next5.style.display = "block";
      i++;
      console.log(i);
    })
    
    
    opt35.addEventListener("click",()=>{
      opt05.style.display = "none";
      opt15.style.display = "none";
      opt25.style.display = "none";
      opt35.style.display = "none";
      text5.innerHTML ="Correct!!<br> Rogério Ceni Brazilian legend with over 400 clean sheets and also over 100 career goals.";
      text5.style.display = "block";
       score++;
       text5.style.left="7%";
      points.innerHTML="Points: "+score;
      next5.style.display = "block"; 
      i++;
      console.log(i);
    })





    next5.addEventListener("click",()=>{
      startcont.style.display = "none";
      next.style.display = "none";
      startcont1.style.display = "none";
      startcont3.style.display = "none";
      startcont4.style.display = "none";
      startcont5.style.display = "none";
      startcont6.style.display = "block";
      
      })
  
  
  
      opt06.addEventListener("click",()=>{
        opt06.style.display = "none";
        opt16.style.display = "none";
        opt26.style.display = "none";
        opt36.style.display = "none";
        text6.innerHTML = "Wrong!!<br>Zlatan Ibrahimović Won league titles in Serie A, La Liga, Ligue 1, and Premier League";
        text6.style.display = "block";
        text6.style.left="7%";
        points.innerHTML="Points: "+score;
        next6.style.display = "block";
        i++;
        console.log(i);
      })
      
      
      opt16.addEventListener("click",()=>{
        opt06.style.display = "none";
        opt16.style.display = "none";
        opt26.style.display = "none";
        opt36.style.display = "none";
        text6.innerHTML =  "Correct!!<br>Zlatan Ibrahimović Won league titles in Serie A, La Liga, Ligue 1, and Premier League";
        text6.style.display = "block";
        score++;
        text6.style.left="7%";

        points.innerHTML="Points: "+score;
        next6.style.display = "block";
        i++;
        console.log(i);
      })
      
      opt26.addEventListener("click",()=>{
        opt06.style.display = "none";
        opt16.style.display = "none";
        opt26.style.display = "none";
        opt36.style.display = "none";
        text6.innerHTML ="Wrong!!<br>Zlatan Ibrahimović Won league titles in Serie A, La Liga, Ligue 1, and Premier League";
        text6.style.display = "block";
        text6.style.left="7%";
        points.innerHTML="Points: "+score;
        next6.style.display = "block";
        i++;
        console.log(i);
      })
      
      
      opt36.addEventListener("click",()=>{
        opt06.style.display = "none";
        opt16.style.display = "none";
        opt26.style.display = "none";
        opt36.style.display = "none";
        text6.innerHTML ="Wrong!!<br>Zlatan Ibrahimović Won league titles in Serie A, La Liga, Ligue 1, and Premier League";
        text6.style.display = "block";
        text6.style.left="7%";
        points.innerHTML="Points: "+score;
        next6.style.display = "block"; 
        i++;
        console.log(i);
      })


      next6.addEventListener("click",()=>{
        startcont.style.display = "none";
        next.style.display = "none";
        startcont1.style.display = "none";
        startcont3.style.display = "none";
        startcont4.style.display = "none";
        startcont5.style.display = "none";
        startcont6.style.display = "none";
        startcont7.style.display = "block";
        
        })
    
    
    
        opt07.addEventListener("click",()=>{
          opt07.style.display = "none";
          opt17.style.display = "none";
          opt27.style.display = "none";
          opt37.style.display = "none";
          text7.innerHTML = "Wrong!!<br>Wembley Stadium Has hosted 8 European Cup/Champions League finals";
          text7.style.display = "block";
         
          points.innerHTML="Points: "+score;
          next7.style.display = "block";
          i++;
          console.log(i);
        })
        
        
        opt17.addEventListener("click",()=>{
          opt07.style.display = "none";
          opt17.style.display = "none";
          opt27.style.display = "none";
          opt37.style.display = "none";
         
          text7.innerHTML = "Correct !!<br>Wembley Stadium Has hosted 8 European Cup/Champions League finals";
          text7.style.display = "block";
          score++;
          points.innerHTML="Points: "+score;
          next7.style.display = "block";
          i++;
          console.log(i);
        })
        
        opt27.addEventListener("click",()=>{
          opt07.style.display = "none";
          opt17.style.display = "none";
        
          opt27.style.display = "none";
          opt37.style.display = "none";
          text7.innerHTML ="Wrong!!<br>Wembley Stadium Has hosted 8 European Cup/Champions League finals";
          text7.style.display = "block";
          points.innerHTML="Points: "+score;
          next7.style.display = "block";
          i++;
          console.log(i);
        })
        
        
        opt37.addEventListener("click",()=>{
          opt07.style.display = "none";
          opt17.style.display = "none";
        
          opt27.style.display = "none";
          opt37.style.display = "none";
          text7.innerHTML ="Wrong!!<br>Wembley Stadium Has hosted 8 European Cup/Champions League finals";
          text7.style.display = "block";
          points.innerHTML="Points: "+score;
          next7.style.display = "block"; 
          i++;
          console.log(i);
        })


        next7.addEventListener("click",()=>{
          startcont.style.display = "none";
          next.style.display = "none";
          startcont1.style.display = "none";
          startcont3.style.display = "none";
          startcont4.style.display = "none";
          startcont5.style.display = "none";
          startcont6.style.display = "none";
          startcont7.style.display = "none";
          startcont8.style.display = "block";
          
          })
      
      
      
          opt08.addEventListener("click",()=>{
            opt08.style.display = "none";
            opt18.style.display = "none";
            opt28.style.display = "none";
            text8.style.left="7%";
            opt38.style.display = "none";
            text8.innerHTML = "Wrong!!<br> Marcelo Scored the first-ever own goal by Brazil in World Cup history (2014 opener vs Croatia).";
            text8.style.display = "block";
            points.innerHTML="Points: "+score;
            next8.style.display = "block";
            i++;
            console.log(i);
          })
          
          
          opt18.addEventListener("click",()=>{
            opt08.style.display = "none";
            opt18.style.display = "none";
            opt28.style.display = "none";
            text8.style.left="7%";
            opt38.style.display = "none";
            text8.innerHTML = "Wrong!!<br> Marcelo Scored the first-ever own goal by Brazil in World Cup history (2014 opener vs Croatia).";
            text8.style.display = "block";
           
            points.innerHTML="Points: "+score;
            next8.style.display = "block";
            i++;
            console.log(i);
          })
          
          opt28.addEventListener("click",()=>{
            opt08.style.display = "none";
            opt18.style.display = "none";
            opt28.style.display = "none";
            opt38.style.display = "none";
            text8.style.left="7%";
            text8.innerHTML ="Correct!!<br> Marcelo Scored the first-ever own goal by Brazil in World Cup history (2014 opener vs Croatia).";
            text8.style.display = "block";
             score++;
            points.innerHTML="Points: "+score;
            next8.style.display = "block";
            i++;
            console.log(i);
          })
          
          
          opt38.addEventListener("click",()=>{
            opt08.style.display = "none";
            opt18.style.display = "none";
            opt28.style.display = "none";
            opt38.style.display = "none";
            text8.style.left="7%";
            text8.innerHTML ="Wrong!!<br> Marcelo Scored the first-ever own goal by Brazil in World Cup history (2014 opener vs Croatia).";
            text8.style.display = "block";
            points.innerHTML="Points: "+score;
            next8.style.display = "block"; 
            i++;
            console.log(i);
          })

          next8.addEventListener("click",()=>{
            startcont.style.display = "none";
            next.style.display = "none";
            startcont1.style.display = "none";
            startcont3.style.display = "none";
            startcont4.style.display = "none";
            startcont5.style.display = "none";
            startcont6.style.display = "none";
            startcont7.style.display = "none";
            startcont8.style.display = "none";
            startcont9.style.display = "block";
          })
            
        
        
        
            opt09.addEventListener("click",()=>{
              opt09.style.display = "none";
              opt19.style.display = "none";
              opt29.style.display = "none";
              text9.style.left="7%";
              opt39.style.display = "none";
              text9.innerHTML = "Correct!!<br> Inter Milan Only Italian club to have never been relegated from Serie A since its founding in 1908.";
              text9.style.display = "block";
               score++;
              points.innerHTML="Points: "+score;
              next9.style.display = "block";
              i++;
              console.log(i);
            })
            
            
            opt19.addEventListener("click",()=>{
              opt09.style.display = "none";
              opt19.style.display = "none";
              opt29.style.display = "none";
              opt39.style.display = "none";
              text9.innerHTML = "Wrong!!<br> Inter Milan Only Italian club to have never been relegated from Serie A since its founding in 1908.";
              text9.style.display = "block";
              text9.style.left="7%";
              points.innerHTML="Points: "+score;
              next9.style.display = "block";
              i++;
              console.log(i);
            })
            
            opt29.addEventListener("click",()=>{
              opt09.style.display = "none";
              opt19.style.display = "none";
              opt29.style.display = "none";
              opt39.style.display = "none";
              text9.style.left="7%";
              text9.innerHTML = "Wrong!!<br> Inter Milan Only Italian club to have never been relegated from Serie A since its founding in 1908.";
              text9.style.display = "block";
              points.innerHTML="Points: "+score;
              next9.style.display = "block";
              i++;
              console.log(i);
            })
            
            
            opt39.addEventListener("click",()=>{
              opt09.style.display = "none";
              opt19.style.display = "none";
              opt29.style.display = "none";
              opt39.style.display = "none";
              text9.style.left="7%";
              text9.innerHTML = "Wrong!!<br> Inter Milan Only Italian club to have never been relegated from Serie A since its founding in 1908.";
              text9.style.display = "block";
              points.innerHTML="Points: "+score;
              next9.style.display = "block"; 
              i++;
              console.log(i);
            })


            next9.addEventListener("click",()=>{
              endcont.style.display = "block";
              rty.style.display = "block";
              ew.innerHTML = "Your Final Score is: " + score;
              startcont.style.display = "none";
              next.style.display = "none";
              startcont1.style.display = "none";
              startcont2.style.display = "none";
              startcont3.style.display = "none";
              startcont4.style.display = "none";
              startcont5.style.display = "none";
              startcont6.style.display = "none";
              startcont7.style.display = "none";
              startcont8.style.display = "none";
              startcont9.style.display = "none";
              next9.style.display = "none";
              points.style.display = "none";
              
              
              
            })

              rty.addEventListener("click",()=>{
                window.location.reload();
              })
              



            