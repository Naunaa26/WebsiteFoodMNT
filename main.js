let itemsToShow = 9;
let itemsToShowTotal = 25;
let isAgreed = false;
const menuItemsContainer = document.getElementById("menuItems");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const mobileMenu = document.getElementById("mobile-menu");
const menuBtn = document.getElementById("menu-btn");
const searchSection = document.getElementById("search");
const menuSection = document.getElementById("menu");
const aboutSection = document.getElementById("about");
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');

document.addEventListener("DOMContentLoaded", function () {
  var typed = new Typed("#typed-text", {
      strings: ["Welcome to my restaurant", "a very great pleasure", "A delicious meal awaits"],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true
  });
});

function loadMore() {
  itemsToShow += 3;
  displayMenuItems();
  if (itemsToShow >= itemsToShowTotal) {
    loadMoreBtn.style.display = "none";
  }
}

function isCheckboxChecked() {
  return document.getElementById('agreeCheckbox').checked;
}


function updateAgreeButtonStatus() {
  if (isCheckboxChecked()) {
    document.getElementById('agreeButton').classList.remove('disabled');
    document.getElementById('agreeButton').disabled = false;
  } else {
    document.getElementById('agreeButton').classList.add('disabled');
    document.getElementById('agreeButton').disabled = true;
  }
}


window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};


window.onload = function () {
  window.scrollTo(0, 0);

  document.body.classList.add('disable-scroll');
  document.getElementById('welcomePopup').style.opacity = '1';
  document.getElementById('welcomePopup').style.pointerEvents = 'auto';
};


document.getElementById('declineButton').addEventListener('click', function () {

  if (!isCheckboxChecked()) {
    alert("Please agree to Visit Detail My Website");
    return;
  }

  document.getElementById('welcomePopup').style.opacity = '0';
  document.getElementById('welcomePopup').style.pointerEvents = 'none';
  document.body.classList.remove('disable-scroll');
});



document.getElementById('agreeButton').addEventListener('click', function () {
  if (isCheckboxChecked()) {
    isAgreed = true;
    document.getElementById('welcomePopup').style.opacity = '0';
    document.getElementById('welcomePopup').style.pointerEvents = 'none';
    document.body.classList.remove('disable-scroll');
  } else {
    alert("Please agree to Visit Detail My Website");
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const typedTextSpan = document.getElementById('typed-text');
  const textArray = ["Relaxing Experience", "Delicious Cuisine", "Amazing Beverages"];
  const typingDelay = 200;
  const erasingDelay = 100;
  const newTextDelay = 2000; 
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
      if (charIndex < textArray[textArrayIndex].length) {
          typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
          charIndex++;
          setTimeout(type, typingDelay);
      } else {
          setTimeout(erase, newTextDelay);
      }
  }

  function erase() {
      if (charIndex > 0) {
          typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
          charIndex--;
          setTimeout(erase, erasingDelay);
      } else {
          textArrayIndex++;
          if (textArrayIndex >= textArray.length) textArrayIndex = 0;
          setTimeout(type, typingDelay + 1100);
      }
  }

  setTimeout(type, newTextDelay + 250);
});

document.getElementById('agreeCheckbox').addEventListener('change', function () {
  updateAgreeButtonStatus();
});


updateAgreeButtonStatus();


document.getElementById('searchForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const searchTerm = document.getElementById('searchInput').value.trim();

  if (searchTerm !== '') {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      const data = await response.json();
      displaySearchResults(data.meals);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  } else {
    window.location.href = '#menuItems';
  }
});


function showPopup() {
  popup.style.display = 'block';
}


function hidePopup() {
  popup.style.display = 'none';
}


closePopup.addEventListener('click', hidePopup);


document.getElementById('searchInput').addEventListener('input', function () {
  const searchTerm = this.value.trim();
  if (searchTerm === '') {
    displayMenuItems();
  }
});



function displaySearchResults(meals) {
  const menuItemsContainer = document.getElementById('menuItems');

  if (meals && meals.length > 0) {
    menuItemsContainer.innerHTML = '';
    meals.forEach(meal => {
      const menuItemElement = createMenuItemElement(meal);
      menuItemsContainer.appendChild(menuItemElement);
    });
    hidePopup();
  } else {
    showPopup();
    displayMenuItems();
  }
}


function createMenuItemElement(meal) {
  const menuItemElement = document.createElement('div');
  menuItemElement.classList.add('w-full', 'md:w-1/2', 'lg:w-1/3', 'p-4', 'hover-zoom', 'menu-item');

  menuItemElement.innerHTML = `
        <div class="bg-white rounded shadow-md p-6">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="mb-4 rounded">
            <h3 class="text-xl font-semibold mb-2">${meal.strMeal}</h3>
            <p class="text-gray-700">${meal.strInstructions.substring(0, 100)}</p>
            <p class="mt-2 text-gray-600">Category: ${meal.strCategory}</p>
            <p class="text-gray-600">Country: ${meal.strArea}</p>
            <button class="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 view-detail-btn">View Detail</button>
        </div>`;

  menuItemElement.querySelector('.view-detail-btn').addEventListener('click', () => {
    displayItemDetail(meal);
  });

  return menuItemElement;
}

function displaySearchResults(meals) {
  const menuItemsContainer = document.getElementById('menuItems');

  if (meals && meals.length > 0) {
    menuItemsContainer.innerHTML = '';
    meals.forEach(meal => {
      const menuItemElement = createMenuItemElement(meal);
      menuItemsContainer.appendChild(menuItemElement);
    });
    hidePopup();
  } else {
    showPopup();
  }
}


document.addEventListener("DOMContentLoaded", () => {
  displayMenuItems();
  const preferredTheme = localStorage.getItem("theme");
  if (preferredTheme === "dark") {
    searchSection.classList.add("bg-gray-900", "text-white");
    menuSection.classList.add("bg-gray-900");
    aboutSection.classList.add("bg-gray-900", "text-white");
    aboutSection.classList.remove("bg-white");
  }
});


document
  .getElementById("bg-switch")
  .addEventListener("click", toggleBackground);
function toggleBackground() {
  const sections = [searchSection, aboutSection];
  sections.forEach((section) => {
    section.classList.toggle("bg-gray-100");
    section.classList.toggle("bg-gray-900");
    section.classList.toggle("text-gray-700");
    section.classList.toggle("text-white");
  });

  menuSection.classList.toggle("bg-gray-100");
  menuSection.classList.toggle("bg-gray-900");
  menuSection.classList.toggle("text-gray-700");
  menuSection.classList.toggle("text-white");


  const footer = document.getElementById("footer"); 
  const isDarkMode = searchSection.classList.contains("bg-gray-900");
  if (isDarkMode) {
    // Dark mode
    footer.classList.remove("bg-gray-900");
    footer.classList.add("bg-sky-950");
    footer.classList.remove("text-white");
    footer.classList.add("text-gray-100");
  } else {
    // Light mode
    footer.classList.remove("bg-sky-950");
    footer.classList.add("bg-gray-900");
    footer.classList.remove("text-gray-100");
    footer.classList.add("text-white");
  }

  const contactFormSubmitBtn = document.querySelector(".contact-form button[type='submit']");
  if (contactFormSubmitBtn) {
    if (isDarkMode) {
      contactFormSubmitBtn.classList.remove("bg-green-500");
      contactFormSubmitBtn.classList.add("bg-blue-500");
    } else {
      contactFormSubmitBtn.classList.remove("bg-blue-500");
      contactFormSubmitBtn.classList.add("bg-green-500");
    }
  }

  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}


async function fetchMenuItems() {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return [];
  }
}

async function displayMenuItems() {
  const menuItems = await fetchMenuItems();
  const menuItemsContainer = document.getElementById("menuItems");

  menuItemsContainer.innerHTML = "";

  menuItems.slice(0, itemsToShow).forEach((item) => {
    const menuItemElement = document.createElement("div");
    menuItemElement.classList.add(
      "w-full",
      "sm:w-1/2",
      "md:w-1/2",
      "lg:w-1/3",
      "p-2",
      "hover-zoom",
      "menu-item"
    );

    menuItemElement.innerHTML = `
      <div class="bg-white rounded shadow-md p-2 sm:p-4 md:p-6"> <!-- Adjusted padding for different screens -->
          <img src="${item.strMealThumb}" alt="${item.strMeal}" class="mb-2 rounded w-full h-48 sm:h-32 md:h-48 object-cover" style="max-width: 100%;"> 
          <h3 class="text-sm sm:text-base md:text-xl font-semibold mb-1 sm:mb-2">${item.strMeal}</h3> 
          <p class="text-xs sm:text-sm md:text-base text-gray-700">${item.strInstructions.substring(0, 100)}</p> 
          <p class="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">Category: ${item.strCategory}</p>
          <p class="text-xs sm:text-sm text-gray-600">Country: ${item.strArea}</p> 
          <button class="mt-1 sm:mt-2 md:mt-4 bg-gray-800 text-white text-xs sm:text-sm px-4 py-2 sm:px-6 sm:py-3 rounded hover:bg-gray-700 view-detail-btn">View Detail</button> <!-- Adjusted button size for larger screens -->
      </div>`;

    menuItemElement.querySelector(".view-detail-btn").addEventListener("click", () => {
      displayItemDetail(item);
    });

    menuItemsContainer.appendChild(menuItemElement);
  });
}



function displayItemDetail(item) {
  if (!isAgreed) {
    document.body.classList.add('disable-scroll');
    document.getElementById('welcomePopup').style.opacity = '1';
    document.getElementById('welcomePopup').style.pointerEvents = 'auto';
    return;
  }

  const modal = document.createElement("div");
  modal.classList.add("modal");

  const content = document.createElement("div");
  content.classList.add("modal-content", "relative");

  content.innerHTML = content.innerHTML = `
  <div class="flex flex-col md:flex-row justify-between items-center">
    <h2 class="text-2xl md:text-4xl font-semibold mb-6 md:mb-0 mx-auto">${item.strMeal}</h2>
    <span id="closeModalBtn" class="cursor-pointer mb-4 md:mb-10 absolute top-0 right-0 mt-2 mr-2 md:static md:mt-0 md:mr-0">&#10006;</span>
  </div>
  <img src="${item.strMealThumb}" alt="${item.strMeal}" class="mx-auto mb-4 rounded w-full md:w-64 h-auto">
  <p class="text-gray-700 mb-2 text-sm md:text-base">${item.strInstructions}</p> 
  <p class="text-gray-600 mb-2 text-sm md:text-base">Category: ${item.strCategory}</p> 
  <p class="text-gray-600 mb-2 text-sm md:text-base">Country: ${item.strArea}</p> 
  <p class="font-bold text-sm md:text-base">$${Math.floor(Math.random() * 20) + 10}.00</p> 
  <h3 class="text-lg md:text-xl font-semibold mt-2 mb-2 text-sm md:text-base">Recipe:</h3> 
  <ul class="list-disc ml-4 md:ml-8">
    ${getIngredientsList(item)}
  </ul>
  <div class="mt-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
    <a href="${item.strYoutube}" target="_blank" class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 w-full md:w-auto text-center">Watch on YouTube</a>
    <div class="flex items-center space-x-2">
      <button id="decreaseBtn" class="bg-gray-300 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-400 focus:outline-none">
        <svg class="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M12 10H8a1 1 0 1 1 0-2h4a1 1 0 0 1 0 2z" />
        </svg>
      </button>
      <span id="itemQuantity" class="mx-4 font-semibold text-xl">1</span>
      <button id="increaseBtn" class="bg-gray-300 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-400 focus:outline-none">
        <svg class="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 12a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v4zM8 10a1 1 0 1 1 0-2h4a1 1 0 1 1 0 2H8z" />
        </svg>
      </button>
    </div>
    <button id="addToCartBtn" class="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none w-full md:w-auto text-center">
      <svg class="h-6 w-6 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M17.25 3h-1.887L12.45 0H7.55L4.637 3H2.75a.75.75 0 0 0 0 1.5h1.04l.347 11.12a2 2 0 0 0 2 1.88h7.526a2 2 0 0 0 1.987-1.798L17.213 4.5H18.25a.75.75 0 0 0 0-1.5zM10 16a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm4-7a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-4-1a1 1 0 1 0-2 0 1 1 0 0 0 2 0z"/>
      </svg>
      Add to Cart
    </button>
    ${item.strSource ? `<a href="${item.strSource}" target="_blank" class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 w-full md:w-auto text-center">View Recipe Source</a>` : ""}
  </div>
`;


  content.querySelector("#closeModalBtn").addEventListener("click", () => {
    modal.remove();
  });

  
  modal.appendChild(content);

  
  document.body.appendChild(modal);
}



function getIngredientsList(item) {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = item[`strIngredient${i}`];
    const measure = item[`strMeasure${i}`];
    if (ingredient && measure) {
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
}


displayMenuItems();

document.addEventListener("DOMContentLoaded", function () {
  const bgSwitch = document.getElementById("bg-switch");
  const toggleDot = document.getElementById("toggle-dot");
  const header = document.querySelector("header");
  const exploreButton = document.querySelector("#home a");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const searchButton = document.querySelector("#search button");

  bgSwitch.checked = false; 

  header.classList.add("bg-green-900"); 
  exploreButton.classList.add("bg-green-500");

  bgSwitch.addEventListener("change", function () {
    if (bgSwitch.checked) {
      toggleDot.style.transform = "translateX(100%)";
      header.classList.remove("bg-green-900");
      header.classList.add("bg-blue-900");
      exploreButton.classList.remove("bg-green-500");
      exploreButton.classList.add("bg-blue-500");
      loadMoreBtn.classList.remove("bg-green-500");
      loadMoreBtn.classList.add("bg-blue-500");
      searchButton.classList.remove("bg-green-500");
      searchButton.classList.add("bg-blue-500");
    } else {
      toggleDot.style.transform = "translateX(0)";
      header.classList.remove("bg-blue-900");
      header.classList.add("bg-green-900");
      exploreButton.classList.remove("bg-blue-500");
      exploreButton.classList.add("bg-green-500");
      loadMoreBtn.classList.remove("bg-blue-500");
      loadMoreBtn.classList.add("bg-green-500");
      searchButton.classList.remove("bg-blue-500");
      searchButton.classList.add("bg-green-500");
    }
  });
});


loadMoreBtn.addEventListener("click", loadMore);


menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
