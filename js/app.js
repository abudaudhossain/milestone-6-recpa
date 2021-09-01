
const drinksItemContainer = document.getElementById('all-items');
const errorMessageFeild = document.getElementById('error-message');
let url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
const searchFeild = document.getElementById('search-feild');
const loader = document.getElementById('loader');
const DetalsLoader = document.getElementById('details-loder');
const drinkDetails = document.getElementById('drink-details');

const getAllDrinkInfo = () => {
    loader.classList.remove("visually-hidden");
    fetch(url)
        .then(res => res.json())
        .then(data => {
            loader.classList.add("visually-hidden");
            if (data.drinks === null) {
                errorMessage();
            } else {
                // console.log(data.drinks);
                displayAllItems(data.drinks);
            }
        }).catch(err => {
            console.log(err);
        })
};
getAllDrinkInfo();

const getSearchValue = () => {
    const searchName = searchFeild.value;
    searchFeild.value = "";
    if (searchName.length > 0) {
        url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchName}`;
        getAllDrinkInfo();
    } else {
        errorMessageFeild.innerText = 'You enter epyet';
    }

}

const errorMessage = () => {
    errorMessageFeild.innerText = "Connot Found!";
}

const displayAllItems = (items) => {
    // console.log(items);
    drinksItemContainer.textContent = '';
    items.forEach(item => {
        // console.log(drinksItemContainer);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick='itemDetails("${item.idDrink}")' class="card h-100">

            <img src="${item.strDrinkThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${item.strDrink}</h5>
            </div>
        </div>
        `;

        drinksItemContainer.appendChild(div);
    })
}


const itemDetails = (drinkId) => {
    DetalsLoader.classList.remove("visually-hidden");
    const idUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
    fetch(idUrl).then(response => response.json()).then(data => {
        DetalsLoader.classList.add("visually-hidden");
        // console.log();
        displatyDitails(data.drinks[0]);
    }).catch(error => {

        console.log(error.message);
    })

}


const displatyDitails = (details) => {
    console.log(details);
    drinkDetails.textContent = "";
    drinkDetails.classList.remove('d-none');
    drinkDetails.innerHTML = `
    <img src="${details.strDrinkThumb}" class="card-img-top img-thumbnail" alt="...">
    <div class="card-body">
        <h5 class="card-title">${details.strDrink}</h5>
        <p class="card-text">${details.strInstructions}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
    `;
}