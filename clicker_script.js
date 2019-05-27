$(function() {
    var cookieImage = $('#cookieImage');
    var cookieCount = $('#cookieCount');
    var shop = $('#shop');
    var inventory = $('#inventory');

    var cookies;
    function updateCookieCount(newCount) {
        cookies = newCount;
        cookieCount.text(`Cookies: ${newCount}`);
    }
    updateCookieCount(0);

    var shopItems = {oven: 2, worker: 10, factory: 50};
    var inventoryItems = Object.assign({}, shopItems);
    Object.keys(inventoryItems).forEach(key => inventoryItems[key] = 0);
    Object.entries(shopItems).forEach(function([item, cost]) {
        var shopItem = $(`<div class="item" id="shop_${item}">${item.toUpperCase()}: ${cost} cookies</div>`);
        shop.append(shopItem);
        var invItem = $(`<div class="item" id="inv_${item}">${item.toUpperCase()}: 0</div>`);
        inventory.append(invItem);
        shopItem.click(function() {
            if (cookies >= cost) {
                updateCookieCount(cookies - cost);
                inventoryItems[item]++;
                invItem.text(`${item.toUpperCase()}: ${inventoryItems[item]}`);
            }
        });
    });

    cookieImage.click(function(event) {
        updateCookieCount(cookies + 1);

        //cookie click animation
        var initWidth = cookieImage.width();
        var newWidth = initWidth + 50;
        var speed = 50;
        cookieImage.animate({'width': `${newWidth}px`,}, speed)
                   .animate({'width': `${initWidth}px`,}, speed,
                            () => cookieImage.width(initWidth));
    });
});
