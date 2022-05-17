

let cats = [
    {
    name: 'Derrick',
    color: 'Orange',
    age: 85
  },
  {
    name: 'Gerald',
    color: 'Black',
    age: 16
  },
  {
    name: 'Oswald',
    color: 'khaki',
    age: 43
  }, 
  {
    name: 'Gerald',
    color: 'Pink',
    age: 70
  },
  {
    name: 'Mr. Snibbley',
    color: 'Calico',
    age: 300
  }
]
// NOTE array method examples
// #region
// console.log(`${cats[2].name} the ${cats[2].color} cat, is ${cats[2].age} years old`);


// NOTE FOR LOOP
// for(let i = 0; i < cats.length; i++){
//   let cat = cats[i]
//   console.log(`${cat.name} the ${cat.color} cat, is ${cat.age} years old`);
// }

// NOTE forEach is like a pre-built for loop for arrays, the 'cat' before the => is the same as the alias on line 34 of the for loop above.
// cats.forEach( cat => {
//   console.log(`${cat.name} the ${cat.color} cat, is ${cat.age} years old`);
// })

// NOTE forEach without an anonymous
// cats.forEach(callCat)
// function callCat(cat){
//   console.log(`${cat.name} the ${cat.color} cat, is ${cat.age} years old`);
// }

// NOTE long and not necessary
// let filtered = cats.filter(cat => {
//   if(cat.age < 80){
//     return true
//   } else {
//     return false
//   }
// })

// NOTE filter and find RETURN, which means they have a result, if we want to see that result or use it we have to save it, hence filtered and found.

// NOTE filter returns an array of all things true (keeps the good stuff)
// let filtered = cats.filter(cat => cat.age < 70)

// console.log(filtered);


// NOTE find returns the FIRST thing where condition is true
// let found = cats.find(cat => cat.name == 'Gerald')

// console.log(found);
// #endRegion

const allVillains = [
  { hat: false, name: "Lord Voldemort", facialHair: false, gender: "M", overFifty: true, hair: false, image: '../assets/images/Voldemort.jpg', guilty: false },
  { hat: false, name: "Cruella Deville", facialHair: false, gender: 'F', overFifty: true, hair: true, image: '../assets/images/cruella.png', guilty: false },
  { hat: true, name: "Darth Vader", facialHair: false, gender: "M", overFifty: false, hair: false, image: '../assets/images/vader.jpg', guilty: false },
  { hat: true, name: "wicked witch of the west", facialHair: false, gender: "F", overFifty: true, hair: true, image: '../assets/images/WickedWitchoftheWest.jpg', guilty: false },
  { hat: false, name: "Syndrome", facialHair: false, gender: "M", overFifty: false, hair: true, image: 'assets/images/syndrome.jpg', guilty: false },
  { hat: false, name: "Ursula", facialHair: false, gender: "F", overFifty: true, hair: true, image: '../assets/images/Ursula.jpg', guilty: false },
  { hat: false, name: "Joker", facialHair: false, gender: "M", overFifty: false, hair: true, image: '../assets/images/joker.jpg', guilty: false },
  { hat: false, name: "Thanos", facialHair: false, gender: "M", overFifty: true, hair: false, image: '../assets/images/thanos.png', guilty: false },
  { hat: true, name: "Jafar", facialHair: true, gender: "M", overFifty: false, hair: true, image: '../assets/images/jafar.jpg', guilty: false },
  { hat: true, name: "White Witch", facialHair: false, gender: "F", overFifty: true, hair: true, image: '../assets/images/whiteWitch.jpg', guilty: false },
  { hat: false, name: "Hades", facialHair: false, gender: "M", overFifty: true, hair: true, image: '../assets/images/hades.jpg', guilty: false },
  { hat: false, name: "Queen of Hearts", facialHair: false, gender: "F", overFifty: true, hair: true, image: '../assets/images/queenOfHearts.jpg', guilty: false }
]

// NOTE current villains is the copy of all villains that slowly shrinks with each applied filter
let currentVillains = allVillains
let guiltyVillain = null
let guesses = 0

function startGame(){
  let index = Math.floor(Math.random()*currentVillains.length)
  console.log(index);
  currentVillains[index].guilty = true
  console.log('who is guilty', currentVillains[index]);
  guiltyVillain = currentVillains[index]
}


function drawVillains(){
  let template = ''
  currentVillains.forEach(villain => {
   template += `
       <div class="col-md-3 rounded shadow my-1 p-1 bg-light" onclick="accuse('${villain.name}')">
        <img class="img-fluid" src="${villain.image}" alt="">
        <p class="text-center"><b>${villain.name}</b></p>
      </div>
   ` 
  })
  // console.log(template);
  document.getElementById('villains').innerHTML = template
}

function drawScore(){
  document.getElementById('guess-count').innerText = 'current guesses: ' + guesses
}

function guessHair(){
  let hairyVillains = currentVillains.filter(v => v.hair == true) 
  console.log(hairyVillains);
  currentVillains = hairyVillains

  drawVillains()
}

function guessOverFifty(){
  let oldVillains = currentVillains.filter( v => v.overFifty == true)
  console.log(oldVillains);
  currentVillains = oldVillains

  drawVillains()
}

function guessGender(gender){
  let filteredVillains = currentVillains.filter(v => v.gender == gender) 
  console.log(filteredVillains);
  currentVillains = filteredVillains

  drawVillains()
}

function guess(attribute){
  // debugger
  guesses++
  let filteredVillains = currentVillains.filter(v => v[attribute] == guiltyVillain[attribute])
  console.log(filteredVillains);
  currentVillains = filteredVillains

  drawVillains()
  drawScore()
}

function accuse(name){
  let found = currentVillains.find(v => v.name == name)
  console.log(found);
  if(found.name == guiltyVillain.name){
    // window.alert(`You found them in ${guesses} guesses`)
    toast(`You found them in ${guesses} guesses`, 'success')
  } else {
    // window.alert(`you didn't find them, now you die`)
    toast(`you didn't find them, now you die`, 'error')
  }
}




// NOTE sweet alert toast, feel free to copy this for now
function toast(title, icon){
  // @ts-ignore
  Swal.fire({
    title: title,
    icon: icon,
    toast: true,
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    position: 'top',
  })
}





startGame()
drawVillains()
