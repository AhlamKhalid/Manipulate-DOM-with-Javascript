// functions

// loop through itemsData & insert into DOM
const fillItems = () => {
  itemsData.forEach((item, index) => {
    itemsHtml += `
        <div class="item-container">
        ${item.isSale ? "<span class='sale'> sale </span>" : ""}          
          <img
            class="item-img"
            src=${item.img}
            alt="item picture"
            data-index=${index}
          />
          <div class="item-info">
            <p class="item-category">${item.category}</p>
            <div class="flex justify-between">
              <p>${item.name}</p>
              <p class="item-price">${item.price} sar</p>
            </div>
          </div>
        </div>
  `;
  });

  itemsContainer.innerHTML = itemsHtml;
};

// set data inside modal based on the clicked item
const setModalData = (item) => {
  const itemImg = document.querySelector(".modal-content .item-img");
  itemImg.setAttribute("src", item.img);

  const itemCategory = document.querySelector(".modal-content .item-category");
  itemCategory.textContent = item.category;

  const itemName = document.querySelector(".modal-content .item-name");
  itemName.textContent = item.name;

  const itemPrice = document.querySelector(".modal-content .item-price");
  itemPrice.textContent = `${item.price} sar`;

  const itemDescription = document.querySelector(
    ".modal-content .item-description"
  );
  itemDescription.textContent = item.description;

  const addBtn = document.querySelector(".modal-content .add-btn");

  if (item.isAvailable) {
    addBtn.textContent = "add to cart";
    if (addBtn.classList.contains("notify")) addBtn.classList.remove("notify");
  } else {
    addBtn.textContent = "notify me when in stock";
    addBtn.classList.add("notify");
  }
};

// open modal
const openModal = () => {
  blurContainer.classList.add("blur");
  modalContainer.classList.add("show");
};

// close modal
const closeModal = () => {
  blurContainer.classList.remove("blur");
  modalContainer.classList.remove("show");
};

// variables

// all items
const itemsData = [
  {
    name: "Beige vase",
    description:
      "Medium sized vase in beige. It has round base. It is composed from pure glass.",
    category: "home decor",
    img: "./img/vase.jpg",
    price: 40,
    isAvailable: true,
    isSale: true
  },
  {
    name: "Table lamp",
    description:
      "Table lamp in gold. It has meduim to high light beam. Available in yellow or white beam.",
    category: "lighting",
    img: "./img/light.jpg",
    price: 60,
    isAvailable: false,
    isSale: false
  },
  {
    name: "Grey sofa",
    description:
      "Grey sofa suitable for a cozy living room. It comes with white outlined blanket.",
    category: "living room",
    img: "./img/sofa.jpg",
    price: 100,
    isAvailable: true,
    isSale: true
  }
];
// html of all items
let itemsHtml = "";
// container to insert items within
const itemsContainer = document.getElementById("items");

// TODO: fill items into DOM
fillItems();

// elements
const closeBtn = document.getElementById("close-btn");
const blurContainer = document.getElementById("blur-container");
const modalContainer = document.getElementById("modal-container");

// TODO: click item image
itemsContainer.addEventListener("click", (event) => {
  const eventTarget = event.target;
  // if item image was clicked
  if (eventTarget.classList.contains("item-img")) {
    // get item index
    const itemIndex = parseInt(eventTarget.dataset.index);
    // get full item from itemsData array
    const item = itemsData[itemIndex];

    setModalData(item);

    openModal();
  }
});

// TODO: click close
closeBtn.addEventListener("click", () => {
  closeModal();
});

// TODO: click outside modal
modalContainer.addEventListener("click", (event) => {
  if (event.target.id === "modal-container") {
    closeModal();
  }
});
