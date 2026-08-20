let bagItems = JSON.parse(localStorage.getItem('bagItems')) || [];

let bagItemObjects = [];

onLoad();

function onLoad() {
  loadBagItemObjects();
  displayBagItems();
  displayBagIcon();
  displayBagSummary();
}

function displayBagSummary() {

  let bagSummaryElement = document.querySelector('.bag-summary');

  let totalItem = bagItemObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  bagItemObjects.forEach(item => {
    totalMRP += item.original_price;
    totalDiscount += (item.original_price - item.current_price);
  });

  let finalPayment = totalMRP - totalDiscount + 99;

  bagSummaryElement.innerHTML = `
    <div class="bag-details-container">
      <div class="price-header">
        PRICE DETAILS (${totalItem} Items)
      </div>

      <div class="price-item">
        <span class="price-item-tag">Total MRP</span>
        <span class="price-item-value">₹${totalMRP}</span>
      </div>

      <div class="price-item a">
        <span class="price-item-tag">Discount on MRP</span>
        <span class="price-item-value priceDetail-base-discount">
          -₹${totalDiscount}
        </span>
      </div>

      <div class="price-item">
        <span class="price-item-tag">Convenience Fee</span>
        <span class="price-item-value">₹99</span>
      </div>

      <hr>

      <div class="price-footer">
        <span class="price-item-tag">Total Amount</span>
        <span class="price-item-value">₹${finalPayment}</span>
      </div>
    </div>

    <button class="btn-place-order">
      <div class="css-xjhrni">PLACE ORDER</div>
    </button>
  `;
}

function loadBagItemObjects() {
  bagItemObjects = bagItems.map(itemId => {
    return items.find(item => item.id == itemId);
  });
}

function displayBagIcon() {
  let bagItemCountElement =
    document.querySelector('.bag-item-count');

  if (!bagItemCountElement) return;

  bagItemCountElement.innerText = bagItems.length;
}

function removeFromItemHTML(itemId) {

  bagItems = bagItems.filter(
    bagItemId => bagItemId != itemId
  );

  localStorage.setItem(
    'bagItems',
    JSON.stringify(bagItems)
  );

  loadBagItemObjects(); 
  displayBagItems();
  displayBagIcon(); 
  displayBagSummary();
}

function displayBagItems() {
  let containerElement = document.querySelector('.bag-items-container');
  
  containerElement.innerHTML = '';
  
  bagItemObjects.forEach(item => {
    containerElement.innerHTML += generateItemHTML(item);
  });
}

function generateItemHTML(item) {

  return `
    <div class="bag-item-container">

      <div class="item-left-part">
        <img class="bag-item-img" src="../${item.image}">
      </div>

      <div class="item-right-part">

        <div class="company">
          ${item.company}
        </div>

        <div class="item-name">
          ${item.item_name}
        </div>

        <div class="price-container">
          <span class="current-price">
            Rs ${item.current_price}
          </span>

          <span class="original-price">
            Rs ${item.original_price}
          </span>

          <span class="discount-percentage">
            (${item.discount_percentage}% OFF)
          </span>
        </div>

        <div class="return-period">
          <span class="return-period-days">
            ${item.return_period} days
          </span>
          return available
        </div>

        <div class="delivery-details">
          Delivery by
          <span class="delivery-details-days">
            ${item.delivery_date}
          </span>
        </div>

      </div>

      <div
        class="remove-from-cart"
        onclick="removeFromItemHTML('${item.id}')">
        X
      </div>

    </div>
  `;
}