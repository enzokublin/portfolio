if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', readyToRun);
} else{
    readyToRun();
}

function readyToRun(){
    var removeItemButton = document.getElementsByClassName('delete-button');
    for (var i = 0; i < removeItemButton.length; i++) {
        var button = removeItemButton[i];
        button.addEventListener('click', deleteItemFromShoppingList);
    }

    var itemQuantityInput = document.getElementsByClassName('item-quantity');
    for (var j = 0; j < itemQuantityInput.length; j++) {
        var productQuantity = itemQuantityInput[j];
        productQuantity.addEventListener('change', productQuantityChanged);
    }

    var addItemToTheShoppingList = document.getElementsByClassName('add-to-list');
    for (var k = 0; k < addItemToTheShoppingList.length; k++) {
        var updateButton = addItemToTheShoppingList[k];
        updateButton.addEventListener('click', updateButtonClicked);
    }

    document.getElementById('purchase-button').addEventListener('click', purchasedButtonClicked);
}

function purchasedButtonClicked(){
    alert('The purchased button was clicked.');
    var productsBought = document.getElementsByClassName('shopping-list')[0];
    while(productsBought.hasChildNodes()){
        productsBought.removeChild(productsBought.firstChild);
    }
    updateShoppingTrolleyTotal();
}

function updateButtonClicked(event){
    console.log(event);
    var updateButton = event.target;
    var shopProduct = updateButton.parentElement.parentElement;
    var itemTitel = shopProduct.getElementsByClassName('poduct-name')[0].innerText;
    var itemPrice = shopProduct.getElementsByClassName('price-display')[0].innerText;
    var itemImageSrc = shopProduct.getElementsByClassName('product-img')[0].src;
    addProductToShoppingList(itemTitel, itemPrice, itemImageSrc);
    updateShoppingTrolleyTotal();
}

function addProductToShoppingList(itemTitel, itemPrice, itemImageSrc){
    var productList = document.createElement('div');
    // productList.innerText = itemTitel;
    productList.classList.add('shopping-list');
    var basketItem = document.getElementsByClassName('shopping-list')[0];
    var productName = basketItem.getElementsByClassName('product-title');
    for (var i = 0; i < productName.length; i++) {
        if(productName[i].innerText == itemTitel){
            alert('This product exists already in your shopping trolley');
            return;
        }
    }
    var productListContent = `
    <div class="list-item">
        <div class="item">
            <div class="item-description">
                <img class="picture" src="${itemImageSrc}" alt="itemImageSrc">
                <p class="product-title">${itemTitel}</p>
            </div>
        </div>
        <div class="item-price">${itemPrice}</div>
        <div class="quantity-container">
            <div class="quantity-box">
                <input class="item-quantity" type="number" value="1">
                <button class="delete-button" type="button">Remove</button>
            </div>
        </div>
    </div>`;
    productList.innerHTML = productListContent;
    basketItem.append(productList);
    productList.getElementsByClassName('delete-button')[0].addEventListener('click', deleteItemFromShoppingList);
    productList.getElementsByClassName('item-quantity')[0].addEventListener('change', productQuantityChanged);
}

function productQuantityChanged(event){
    var productQuantity = event.target;
    if(isNaN(productQuantity.value) || productQuantity.value <= 0){
        productQuantity.value = 1;
    }
    updateShoppingTrolleyTotal();
}


function deleteItemFromShoppingList (event){
    var buttonPushed = event.target;
    buttonPushed.parentElement.parentElement.parentElement.remove();
    updateShoppingTrolleyTotal();
}


function updateShoppingTrolleyTotal(){
    var shoppingList = document.getElementsByClassName('shopping-list')[0];
    var listItem = shoppingList.getElementsByClassName("list-item");
    var totalSum = 0;
    for (var i = 0; i < listItem.length; i++) {
        var itemFromTheList = listItem[i];
        var itemPrice = itemFromTheList.getElementsByClassName('item-price')[0];
        var itemQuantity = itemFromTheList.getElementsByClassName('item-quantity')[0];
        var price = parseFloat(itemPrice.innerText.replace('€', ''));
        var quantity = itemQuantity.value;
        totalSum = totalSum + (price*quantity);
    }
    totalSum = Math.round(totalSum*100)/100;
    document.getElementsByClassName('sum')[0].innerText = '€' + totalSum;

}
