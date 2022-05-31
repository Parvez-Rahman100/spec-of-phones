const errorMessage = document.getElementById('display-error');
const search = () =>{
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    
    phoneCard.textContent = '';
    phoneDetailCard.textContent = '';
    
    if(searchText == ''){
        errorMessage.style.display = 'block';
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchPhones(data.data.slice(0,20)));
    }
    
}
// Display Search Result 

const displaySearchPhones = (phones) =>{
    errorMessage.style.display = 'none';
    if(phones.length == 0 ){
        errorMessage.style.display = 'block';
    }
    phones.forEach(phone => {
        const phoneCard = document.getElementById('phoneCard');
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card shadow-lg p-3 mb-5  rounded">
                 <img src="${phone.image}" class="card-img-top w-50 mx-auto"  alt="Phones">
                 <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">${phone.brand}</p>
                </div>
                <button onClick="details('${phone.slug}')" class="btn btn-primary w-50 mx-auto">Explore</button>
              </div>  
        `;
        phoneCard.appendChild(div);
    });
};

//Load Phone Details Here 
const details = (phones) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phones}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data));
}

// Display Phone Details Here

const displayDetails = (details) =>{
    const phoneDetailCard = document.getElementById('phoneDetailCard');
    phoneDetailCard.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card mx-auto my-3 shadow-lg p-3 mb-5 bg-body rounded" style="width: 18rem;">
    <div class="card-body">
    <img src="${details.image}" class="card-img-top w-50 mx-auto" alt="Phones">
    <h5 class="card-title">${details.name}</h5>
    <h5>${details.brand}</h5>
    <p>${details.releaseDate ? details.releaseDate : 'Release Date Not Found'}</p>
    <p>Sensors: ${details.mainFeatures.sensors}</p>
    <h6>Main Features</h6>
    <p>${details.mainFeatures.chipSet}</p>
    <p>${details.mainFeatures.storage}</p>
    <p>${details.mainFeatures.displaySize}</p>
    <p>${details.mainFeatures.memory}</p>
    <h6>Others</h6>
    <p>Blutooth :${details.others?.Bluetooth? details.others?.Bluetooth : 'Not Found'}</p>
    <p>GPS :${details.others?.GPS? details.others?.GPS : 'Not Found'}</p>
    <p>NFC :${details.others?.NFC? details.others.NFC : 'Not Found'}</p>
    <p>Radio :${details.others?.Radio? details.others?.Radio : 'Not Found'}</p>
    <p>USB :${details.others?.USB? details.others?.USB : 'Not Found'}</p>
    <p>WLAN :${details.others?.WLAN? details.others.WLAN : 'Not Found'}</p>
  </div>
</div>
    `;
    phoneDetailCard.appendChild(div);
}