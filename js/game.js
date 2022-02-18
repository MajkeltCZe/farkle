const score = document.getElementById('score');
const button = document.getElementById('button');
const lost = document.getElementById('lost');
let kostka = document.querySelectorAll(".cube");
const round = document.getElementById('round');
const hide = document.querySelectorAll(".kostky");

let hody = [];
let minus, pocetkostek = 6, gameon = false;
let vyber = [];
let selected = 0;
let soucet = 0;
let skore = 0;
let clicked = [];

const special = {
    trojice: false, ctverice: false, postupka: false, petak: false, dosesti: false


}




function kostky() {
    for (let j = 0; j <= 5; j++) {
        hody[j] = Math.ceil(Math.random() * 6);
    }

    for (let i = 0; i < kostka.length; i++) {
        kostka[i].src = './img/0kostka' + hody[i] + '.png';
        kostka[i].style.border = "black solid 2px";
        kostka[i].style.boxShadow = " 4px 3px black";
        button.style.display = "none";
        round.style.display = "none";
        clicked[i] = false;

    }


}

function Vypis() {

    score.innerHTML = `<p>Score v tomto kole: ${soucet}</p>`;
    score.innerHTML += `<hr>`;
    score.innerHTML += `<p>Celkové score: ${skore}/3000</p>`;
    score.innerHTML += `<hr>`;
}


function selection() {

    if (selected > 0 && pocetkostek >= 1) {

        let minus = 5;
        minus -= selected;

        for (let i = 5; i > minus; i--) {
            hody.pop();
            clicked.pop();
            kostka[i].style.visibility = "hidden";
        }
    }


    if (pocetkostek < 1 || selected < 0 || pocetkostek ==6) {
        for (let i = 0; i < 6; i++) {
            kostka[i].style.visibility = "visible";

        }
    }


}



button.addEventListener('click', () => {
    kostky();
    
    selection();
    kontrolaKostek();
    newState();
   
hide[0].style.display = "contents";
hide[1].style.display = "contents";
console.log(hody);

    if (gameon == true || hody.includes(1, 0) || hody.includes(5, 0) ) {
        lost.innerHTML = `<h2 class="text-center" ></h2>`;
        button.innerText = "Hraj";
    }

    else {
        lost.innerHTML = `<h2 class="text-center" >Ztrácíš body !</h2>`;
        selected = 0;
        soucet = 0;
        pocetkostek = 6;
       vyber = [];
        newState();
        Vypis();
        button.innerText = "Další kolo";
        button.style.display = "initial";
    }
   
   
});


//hraj 

for (let i = 0; i <= 5; i++) {

    kostka[i].addEventListener('click', function () {



        if (clicked[i] == false) {


            kostka[i].style.border = " yellow solid 10px";
            kostka[i].style.boxShadow = " 0px 0px black";
            selected++;
            pocetkostek--;
            vyber.push(hody[i]);

            same();
            specials();

            if (special.trojice == false && special.ctverice == false && special.postupka == false && special.petak == false & special.dosesti == false) {
                if (hody[i] == 1) soucet += 100;
                if (hody[i] == 5) soucet += 50;
            }
// if (hody[i] == 5) soucet += 50;

            clicked[i] = true;

            button.style.display = "initial";
            round.style.display = "initial";




           

        }
        else {
            vyber.splice(hodnota(hody[i]), 1);

            kostka[i].style.border = "black solid 2px";
            kostka[i].style.boxShadow = " 4px 3px black";
            selected--;
            pocetkostek++;

          
            if (special.trojice == false && special.ctverice == false && special.postupka == false && special.petak == false & special.dosesti == false) {
            if (hody[i] == 1) soucet -= 100;
            if (hody[i] == 5) soucet -= 50;
        }

if (vyber.length != 3 && special.trojice == true) {
 (hody[i] == 1) ? soucet -= 1000 : soucet -= (100 * hody[i]);
 (hody[i] == 1) ? soucet += 200 : soucet += 0;

special.trojice = false;
}

if (vyber.length != 4 && special.ctverice == true) {
    (hody[i] == 1) ? soucet -= ((1000 * hody[i]) * 2) :   soucet -= ((100 * hody[i]) * 2);
  (hody[i] == 1) ? soucet += ((1000 * hody[i])) :   soucet += ((100 * hody[i]));
    special.ctverice = false;
   }

            if (vyber.length != 6 && special.postupka == true) {
                if (!vyber.includes(1, 0)) soucet += 500;

                soucet -= 1500;
                special.postupka = false;
            }

            if (vyber.length != 5 && special.petak == true) {
                soucet -= 500;
                special.petak = false;
            }

            if (vyber.length != 5 && special.dosesti == true) {
                if (special.postupka == true) soucet += 750;
                else soucet -= 750;
                special.dosesti = false;
            }
           
            clicked[i] = false;
            
        }


        Vypis();
        

    });

}


round.addEventListener('click', () => {
    pocetkostek = 6;
    selected = 0;
    skore += soucet;
    soucet = 0;
   
    Vypis();
    kostky();
    selection();
    newState();
    if (skore >= 3000) {
        lost.innerHTML = `<h2 class="text-center" >Vyhráváš ! </h2>`;
    }
});


function same() {
    count = {};
  
        vyber.forEach((x) => {
            count[x] = (count[x] || 0) + 1;
         
           
           
            if (count[x] == 3 && special.trojice == false) {
                if (x == 1) {

soucet += 800;

                }
               
                else if (x != 1) soucet += (100 * x);
                special[x + 'trojice'] = 1;
                special.trojice = true;

            }

            if (count[x] == 3 && special.trojice == true && special[x + 'trojice'] != 1) {
                if (x == 1) soucet += 1000;
                else if (x != 1) soucet += (100 * x);
            }
            //ctverice
            else if (count[x] == 4 && special.ctverice == false) {
                if (special.trojice == true && x == 1) {
                    soucet -= 1000;
                    soucet += ((1000 * x) * 2);
                }
                else if (special.trojice == true && x != 1) {
                    soucet += ((100 * x) * 2);
                    soucet -= (100 * x);
                }
                special.ctverice = true;

            }
        });
    
}

function specials() {
    if (vyber.includes(1, 0) && vyber.includes(2, 0) && vyber.includes(3, 0) && vyber.includes(4, 0) && vyber.includes(5, 0)
        && special.petak == false) {
        soucet += 500;
        special.petak = true;

    }
    if (vyber.includes(2, 0) && vyber.includes(3, 0) && vyber.includes(4, 0) && vyber.includes(5, 0) && vyber.includes(6, 0)
        && special.dosesti == false) {
        soucet += 750;
        special.dosesti = true;

    }
    if (vyber.includes(1, 0) && vyber.includes(2, 0) && vyber.includes(3, 0) && vyber.includes(4, 0) && vyber.includes(5, 0) &&
        vyber.includes(6, 0) && special.postupka == false) {
        if (special.petak == true) {
            soucet -= 500;
            special.petak = false;
        }
        if (special.dosesti == true) {
            soucet -= 750;
            special.dosesti = false;
        }

        soucet += 1500;
        special.postupka = true;


    }

}

function hodnota(hody) {
    let idx = 0;
    vyber.forEach(i => {
        if (hody == vyber[i]) idx = i;
    });
    return idx;
}


function newState() {
    vyber = [];
    Object.keys(special).forEach(value => {
        special[value] = false;
    });
    
}


function kontrolaKostek() {
    count = {};
    hody.forEach((x) => {
        count[x] = (count[x] || 0) + 1;
         if (count[x] == 3)  gameon = true;
    
    });

    

}


