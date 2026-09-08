// women.js
const womenContainer = document.getElementById('women-items-container') || document.querySelector('.items-container');

const womenItems = items.filter(item => {
    const cat = item.category || item.categories || item.gender;
    return cat && cat.toLowerCase() === 'women';
});

let innerHTML = '';

womenItems.forEach(item => {
    innerHTML += `
        <div class="item-container">
            <img class="item-image" src="../${item.image}" alt="item image">
            <div class="company">${item.company}</div>
            <div class="product-name">${item.item_name}</div>
            <div class="price">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount">(${item.discount_percentage}% OFF)</span>
            </div>
            <button class="btn-add-bag">Add to Bag</button>
        </div>
    `;
});

if (womenContainer) {
    womenContainer.innerHTML = innerHTML;
}