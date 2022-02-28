const search = () =>{
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    // console.log(searchText);
    searchInput.value = " ";
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchPhones(data.data));
}
const displaySearchPhones = (phones) =>{
    
    phoneCard.textContent = '';
    phones.forEach(phone => {
        const phoneCard = document.getElementById('phoneCard');
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
                 <img src="${phone.image}" class="card-img-top w-50"  alt="Phones">
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
const details = (phones) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phones}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data));
}
const displayDetails = (details) =>{
    console.log(details);
    const phoneDetailCard = document.getElementById('phoneDetailCard');
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card" style="width: 18rem;">
    <div class="card-body">
    <img src="${details.image}" class="card-img-top w-50 " alt="Phone">
    <h5 class="card-title">${details.name}</h5>
    <h5>${details.brand}</h5>
    <p>${details.releaseDate ? details.releaseDate : 'Release Date Not Found'}</p>
    <h6>Main Features</h6>
    <p>${details.mainFeatures.chipSet}</p>
    <p>${details.mainFeatures.storage}</p>
    <p>${details.mainFeatures.displaySize}</p>
    <p>${details.mainFeatures.memory}</p>
    <h6>Others</h6>
    <p>Blutooth :${details.others.Bluetooth}</p>
    <p>GPS :${details.others.GPS}</p>
    <p>NFC :${details.others.NFC}</p>
    <p>Radio :${details.others.Radio}</p>
    <p>USB :${details.others.USB}</p>
    <p>WLAN :${details.others.WLAN}</p>
  </div>
</div>
    `;
    phoneDetailCard.appendChild(div);
}