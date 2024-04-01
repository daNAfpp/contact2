function initStorage() {
  if (!localStorage.getItem("db")) {
    localStorage.setItem("db", "[]");
  }
}
initStorage();

function getProductsFormLS() {
  const products = JSON.parse(localStorage.getItem("db"));
  return products;
}

function setProductsTols(products) {
  localStorage.setItem("db", JSON.stringify(products));
}

let products = getProductsFormLS();
console.log(products);

const container = document.querySelector(".container");
const desckInp = document.querySelector("#desck-inp");
const titleInp = document.querySelector("#title-inp");
const priceInp = document.querySelector("#price-inp");
const imageInp = document.querySelector("#image-inp");
const addBtn = document.querySelector("#add-product-btn");
const closeBtn = document.querySelector(".btn-close");
const saveBtn = document.querySelector("#idit-product-btn");
const searchInp = document.querySelector("#search-inp");
const addTrigger = document.querySelector("#add");

addTrigger.addEventListener("click", () => {
  addBtn.style.display = "block";
  saveBtn.style.display = "none";
  modalTitle.innerText = "Add product";

  titleInp.value = "";
  priceInp.value = "";
  imageInp.value = "";
  desckInp.value = "";
  closeBtn.click();
  render();
});
//!read

function render(data = getProductsFormLS()) {
  container.innerHTML = "";
  data.forEach((item, index) => {
    container.innerHTML += `
        <div class="card" style="width: 18rem;">
  <img src="${item.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${item.title}</h5>
    <h6 class="card-title">Price: ${item.price}$</h6>

    <p class="card-text"> ${item.description}.</p>
    <div class = "flex"><a id=${index} data-bs-toggle="modal"
                data-bs-target="#exampleModal" href="#" class="btn btn-primary editBtn">Edit</a>
     <a id=${index}  href="#" class="btn btn-primary btn-danger deleteBtn">Delete</a>
  </div>
  </div>
</div>
`;
  });
}

//! create

function createProduct() {
  if (
    !titleInp.value.trim() ||
    !priceInp.value.trim() ||
    !desckInp.value.trim() ||
    !imageInp.value.trim()
  ) {
    alert("Some inputs are empty");
    return;
  }
  let newProduct = {
    title: titleInp.value,
    description: desckInp.value,
    price: priceInp.value,
    image: imageInp.value,
  };

  let products = getProductsFormLS();
  products.push(newProduct);
  setProductsTols(products);

  titleInp.value = "";
  priceInp.value = "";
  imageInp.value = "";
  desckInp.value = "";
  closeBtn.click();
  render();
}
addBtn.addEventListener("click", createProduct);

render();

//!update
function getOneProductByIndex(index) {
  const productObj = getProductsFormLS()[index];
  return productObj;
}

let id = null;

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("editBtn")) {
    let foundObj = getOneProductByIndex(e.target.id);
    console.log(foundObj);
    titleInp.value = foundObj.title;
    desckInp.value = foundObj.description;
    priceInp.value = foundObj.price;
    imageInp.value = foundObj.image;

    id = e.target.id;
    modalTitle.innerText = "Edit product";
    saveBtn.style;
  }
});

saveBtn.addEventListener("click", () => {
  if (
    !titleInp.value.trim() ||
    !priceInp.value.trim() ||
    !desckInp.value.trim() ||
    !imageInp.value.trim()
  ) {
    alert("Some inputs are empty");
    return;
  }

  const editeObj = {
    title: titleInp.value,
    description: desckInp.value,
    price: priceInp.value,
    image: imageInp.value,
  };
  const product = getProductsFormLS();
  product.splice(id, 1, editeObj);
  setProductsTols(product);

  titleInp.value = "";
  priceInp.value = "";
  imageInp.value = "";
  desckInp.value = "";
  closeBtn.click();
  render();
});
//! delete
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    let ans = confirm("Are you sure?");
    if (!ans) return;
    const product = getProductsFormLS();
    console.log(product);
    product.splice(e.target.id, 1);
    console.log(product);
    setProductsTols(product);
    render();
  }
});

//!search
searchInp.addEventListener("input", (e) => {
  console.log(e.target.value);
  const products = getProductsFormLS();
  const filtered = products.filter(
    (item) =>
      item.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
  );
  console.log(filtered);
  render(filtered);
});
