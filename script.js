// Peddy Button Api fetch 
const peddyButton =()=> {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then(res => res.json())
    .then(data => DisplayPeddyButtons(data.categories))
}

// Clicking specific peddy Button fetch
const peddyButtonClicking =(category)=>{
    const url=`https://openapi.programming-hero.com/api/peddy/category/${category}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const clickingBtn = document.getElementById(`btn-${category}`);
        peddyCartDisplay(data.data)
    })
}

// All Cart Display 
const peddyCartDisplay=(carts)=>{
    const peddyCart = document.getElementById("peddyCart");
    peddyCart.innerHTML="";
    carts.forEach(cart =>{
        const div = document.createElement("div");
    div.innerHTML=`
        <div class="card bg-base-100 shadow-sm p-5">
            <figure>
                <img class="w-full h-[150px] object-cover"
                src=${cart.image}
                alt="peddy-img" />
            </figure>
            <div class="space-y-3 pl-2">
                <h2 class="card-title mt-1 text-xl font-semibold">${cart.pet_name}</h2>
                <p class="text-base text-[#13131370]"><i class="fa-solid fa-table-cells"></i> Breed: ${cart.breed}</p>
                <p class="text-base text-[#13131370]"><i class="fa-solid fa-calendar-days"></i> Birth: ${cart.date_of_birth?.slice(0,4)}</p>
                <p class="text-base text-[#13131370]"><i class="fa-solid fa-venus"></i> Gender: ${cart.gender}</p>
                <p class="text-base text-[#13131370]"><i class="fa-solid fa-dollar-sign"></i> Price: ${cart.price}$</p>
                <div class="card-actions flex">
                <button class="btn text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white"><i class="fa-solid fa-heart"></i></button>
                <button class="btn text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white">Adopt</button>
                <button class="btn text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white">Details</button>
                </div>
            </div>
            </div>
    `
    peddyCart.appendChild(div);
    })
}


// All Dinamically Peddy Button Display
const DisplayPeddyButtons =(categories)=>{
    const peddyBtn = document.getElementById("peddyButton");
    categories.forEach(peddy =>{
        const div = document.createElement("div");
        div.innerHTML=`
        <button id="btn-${peddy.category}" onclick="peddyButtonClicking('${peddy.category}')" class="btn target:bg-blue-600 px-17 py-10 rounded-lg hover:rounded-full border-[#0E7A8110] hover:border-[#0E7A81]"><img  src=${peddy.category_icon} alt="peddy-img"> ${peddy.category}s </button>
        `
        peddyBtn.appendChild(div);
    })
}
peddyButton();
peddyButtonClicking("cat");