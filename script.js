// Peddy Button Api fetch 
const peddyButton =()=> {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then(res => res.json())
    .then(data => DisplayPeddyButtons(data.categories))
}

// Clicking specific peddy Button Api fetch
const peddyButtonClicking =(category)=>{
    const url=`https://openapi.programming-hero.com/api/peddy/category/${category}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const clickingBtn = document.getElementById(`btn-${category}`);
        peddyCartDisplay(data.data)
    })
}

// Peddy Details Api Fetch
const peddyDitails=(details)=>{
    const url=`https://openapi.programming-hero.com/api/peddy/pet/${details}`;
    fetch(url)
    .then(res => res.json())
    .then(data => detailsDisplay(data.petData))
}
// All Cart Display 
const peddyCartDisplay=(carts)=>{
    const peddyCart = document.getElementById("peddyCart");
    const noInformation = document.getElementById("noInformation");
    peddyCart.innerHTML="";
    noInformation.innerHTML=""
    if(carts.length == 0)
    {
        noInformation.innerHTML=`
        <div class="flex flex-col justify-center items-center space-y-3 text-center">
            <img src="images/error.webp" alt="error-img">
            <h3 class="text-3xl font-semibold text-[#131313]">No Information Available</h3>
            <p class="text-[#13131370]">
                It is a long established fact that a reader will be distracted by the readable content of a page   when looking at <br> 
                its layout. The point of using Lorem Ipsum is that it has a.
            </p>
        </div>
        `;
    }
    carts.forEach(cart =>{
        const div = document.createElement("div");
        let DateOfBirth=cart.date_of_birth;
        if(DateOfBirth === null || DateOfBirth === undefined)
        {
            DateOfBirth="Not Available";
        }
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
                <p class="text-base text-[#13131370]"><i class="fa-solid fa-calendar-days"></i> Birth: ${DateOfBirth}</p>
                <p class="text-base text-[#13131370]"><i class="fa-solid fa-venus"></i> Gender: ${cart.gender}</p>
                <p class="text-base text-[#13131370]"><i class="fa-solid fa-dollar-sign"></i> Price: ${cart.price}$</p>
                <div class="card-actions flex">
                <button class="btn text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white"><i class="fa-solid fa-heart"></i></button>
                <button class="btn text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white">Adopt</button>
                <button onclick="peddyDitails(${cart.petId})" class="btn text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white">Details</button>
                </div>
            </div>
            </div>
    `;
    peddyCart.appendChild(div);
    })
}

//Peddy Details Diplay
const detailsDisplay=(peddy)=>{
    const detailsPeddy = document.getElementById("detailsPeddy");
    let vaccinatedStatus = peddy.vaccinated_status;
    let DateOfBirth = peddy.date_of_birth;
    if(DateOfBirth === null || DateOfBirth === undefined)
    {
        DateOfBirth="Information Not Available";
    }
    if(vaccinatedStatus === null)
    {
        vaccinatedStatus="Information Not Available";
    }
    detailsPeddy.innerHTML=`
    <dialog id="my_modal_1" class="modal">
        <div class="modal-box max-w-2xl">
            <div class="card bg-base-100 shadow-sm p-5">
                <figure>
                    <img class="w-full h-[350px] object-cover"
                    src=${peddy.image}
                    alt="peddy-img" />
                </figure>
                <div class="space-y-3 pl-2">

                    <h2 class="card-title mt-1 text-xl font-semibold">${peddy.pet_name}</h2>

                    <div class="flex gap-2">
                        <div class="space-y-3">
                            <p class="text-base text-[#13131370]"><i class="fa-solid fa-table-cells"></i> Breed: ${peddy.breed}</p>
                            <p class="text-base text-[#13131370]"><i class="fa-solid fa-venus"></i> Gender: ${peddy.gender}</p>
                            <p class="text-base text-[#13131370]"><i class="fa-solid fa-venus"></i> Vaccinated status: ${vaccinatedStatus}</p>
                            
                        </div>
                        <div class="space-y-3">
                            <p class="text-base text-[#13131370]"><i class="fa-solid fa-calendar-days"></i> Birth: ${DateOfBirth}</p>
                            <p class="text-base text-[#13131370]"><i class="fa-solid fa-dollar-sign"></i> Price: ${peddy.price}$</p>
                        </div>
                    </div>
                    <hr class="text-gray-300">
                    <div>
                        <h2 class="text-base font-bold">Details Information</h2>
                        <p class="text-base text-[#13131370]">
                            ${peddy.pet_details}
                        </p>
                    </div>
            <div class="modal-action w-full">
            <form method="dialog" class="w-full">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn rounded-md text-base border-[#0E7A8110] hover:border-[#0E7A81] text-[#0E7A81]  w-full">Cancel</button>
            </form>
            </div>
        </div>
    </dialog>
    `;
    const modal = document.getElementById("my_modal_1");
    if(modal)
    {
        modal.showModal()
    }
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