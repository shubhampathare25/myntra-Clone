
const menContainer = document.getElementById('men-items-container');

const menItems = items.filter(item => {
    const cat = item.category || item.categories || item.gender;
    return cat && cat.toLowerCase() === 'men';
});

let innerHTML = '';

menItems.forEach(item => {
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

if (menContainer) {
    menContainer.innerHTML = innerHTML;
}