let products;

function loadData() {
  $.ajax({
    url: "products.json",
    success: function (data) {
      products = data;
      for (let i = 0; i < data.length; i++) {
        $("#allData").append(`
        <div class="col-md-4 mt-3">

        <div class="card">

        <div class="card-header">
        ${data[i].name}
        
        </div>

        <div class="card-body">
        <img class="img-fluid" style="max-height:fit-content" src="${data[i].image}"/>
        </div>

        <div class="card-footer">
        <span class="badge badge-secondary"> ${data[i].price}$</span>

        <button onclick="addtocart( ${data[i].id})" class="btn btn-sm float-right btn-primary">Add To Cart+</button>
        </div>
        </div>
        </div>
        
        `);
      }
    },
  });
}
loadData();

let arr = [];
function addtocart(id) {
  arr.push(id);
  localStorage.setItem("selected", JSON.stringify(arr));

  let items = JSON.parse(localStorage.getItem("selected"));

  $("#cart").html(items.length);
}

function GetCartItems() {
  let choosen_products = [];
  let items = JSON.parse(localStorage.getItem("selected"));
  for (let i = 0; i < items.length; i++) {
    choosen_products.push(products.find((products) => products.id == items[i]));
  }
  addCartToDom(choosen_products);
  $("cart").html(choosen_products.length);
}

function addCartToDom(items) {
  for (let i = 0; i < items.length; i++) {
    $("#cart-data").append(`
        <div class="col-md-4 mt-3">

        <div class="card">

        <div class="card-header">
        ${items[i].name}
        
        </div>

        <div class="card-body">
        <img class="img-fluid" style="max-height:fit-content" src="${items[i].image}"/>
        </div>

        <div class="card-footer">
        <span class="badge badge-secondary"> ${items[i].price}$</span>

        </div>
        </div>
        </div>
        
        `);
  }
}
