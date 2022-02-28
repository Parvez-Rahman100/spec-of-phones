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
    
    // phoneCard.textContent = '';
    phones.forEach(phone => {
        const phoneCard = document.getElementById('phoneCard');
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
                 <img width=50% src="${phone.image}" class="card-img-top" alt="...">
                 <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">${phone.brand}</p>
                </div>
                <button onClick="details('${phone.slug}')" class="btn btn-primary w-50 mx-auto">Explore</button>
              </div>
              
        `;
        phoneCard.appendChild(div);
    })
}
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
    <img src="${details.image}" class="card-img-top" alt="...">
    <h5 class="card-title">${details.name}</h5>
    <h5>${details.brand}</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
    `;
    phoneDetailCard.appendChild(div);
}