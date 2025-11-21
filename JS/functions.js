// Handles navbar visibility based on scroll direction
function navScrolling(){
    let currentScroll = window.scrollY
    if(window.scrollY > lastScroll){
        $("nav.navbar").addClass("hide");
    }
    else{
        $("nav.navbar").removeClass("hide");
    }
    lastScroll = currentScroll;
}

// Loads cart and favorite items from localStorage on page load
function loadLocalStorage() {
    let storedCart = localStorage.getItem("cartProducts"),
        storedFav = localStorage.getItem("favProducts");
    cartProducts = storedCart ? JSON.parse(storedCart) : [];
    favProducts = storedFav ? JSON.parse(storedFav) : [];
    updateLocalStorage();
}
// Saves current cart & favorite lists to localStorage
function updateLocalStorage(){
    localStorage.setItem("cartProducts",JSON.stringify(cartProducts));
    localStorage.setItem("favProducts",JSON.stringify(favProducts));
}

// Fetches product data from JSON file and stores it globally
function loadProducts() {
    return fetch("Data/products.json")
        .then(response => response.json())
        .then(data => {
            products = data;
            return products;
        })
        .catch(err => console.error("Error: ", err));
}
// Renders products into their proper category sliders in the Collections section
function renderProducts(){
    products.forEach((product, index) => {
        let swiperItem = `
            <div class="swiper-slide product" data-id="${product.id}">
                <i class="fa-solid fa-heart heart"></i>
                <div class="item stop">
                    <div class="head">
                        <img src="${product.image}" alt="" class="img-fluid">
                        <div class="icons">
                            <i class="fa-solid fa-eye" onclick="showProduct(${index})"></i>
                            <i class="fa-regular fa-heart mx-2 favbtn" onclick="addToFav(${product.id})" data-id="${product.id}"></i>
                            <i class="fa-solid fa-bag-shopping shop" onclick="addToCart(this,${product.id})" data-id="${product.id}"></i>
                        </div>
                    </div>
                    <div class="body">
                        <h3>${product.name}</h3>
                        <p>${product.tagline}</p>
                        <div class="info">
                            <div class="price">${product.price}$</div>
                            <div class="rate">${product.rate}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        if (product.category.toLowerCase() === "male") {
            $("#Collections .male .swiper-wrapper").append(swiperItem);
        }
        else if (product.category.toLowerCase() === "female") {
            $("#Collections .female .swiper-wrapper").append(swiperItem);
        }
        else if (product.category.toLowerCase() === "unisex") {
            $("#Collections .unisex .swiper-wrapper").append(swiperItem);
        }
    });
    checkButtons();
}

// Returns a product object by its ID
function getProduct(productId){
    return products.find((product) => {return product.id == productId;});
}

// Opens a popup by class name and loads cart/fav content if needed
function openPopUp(popUpName){
    $(`.popUp.${popUpName}`).fadeIn(500).delay().addClass("active").css("display","flex");
    if (popUpName == "cart"){
        showProductInCart();
    }
    if (popUpName == "fav"){
        showProductInFav();
    }
}
// Closes any opened popup
function closePopUp(){
    $(`.popUp`).removeClass("active").fadeOut(500);
}
// Adds scroll class if popup content is taller than the popup box
function adjustPopUp() {
    $(".popUp.cart").removeClass("scroll");
    if ($(".popUp.cart .box")[0].scrollHeight > $(".popUp.cart").height()) {
        $(".popUp.cart").addClass("scroll");
    }
}

// Renders cart items inside the Cart popup
function showProductInCart(){
    $(".popUp.cart .box .row").html("");
    cartProducts.forEach(cartProduct => {
        let product = getProduct(cartProduct.id);
        $(".popUp.cart .box .row").append(`
            <div class="col-6 col-lg-4 part">
                <div class="item">
                    <img src="${product.image}" class="img-fluid" alt="">
                    <h4>${product.name}</h4>
                    <div class="price">${product.price}$</div>
                    <i class="fa-regular fa-trash-can" onclick="removeBtnInCart(${product.id})"></i>
                </div>
            </div>
        `);
    });
    adjustPopUp();
}
// Shows detailed product popup with info and action buttons
function showProduct(index){
    let product = products[index];
    $(".popUp.product .box .row").html(`
        <div class="col-md-5 part1">
            <div class="item">
                <img src="${product.image}" class="img-fluid" alt="">
            </div>
        </div>
        <div class="col-md-7 part2">
            <div class="item">
                <h3>${product.name}</h3>
                <div class="info">
                    <div class="price">${product.price}$</div>
                    <div class="rate">${product.rate}</div>
                </div>
                <p>${product.description}</p>
                <div class="icons">
                    <i class="fa-regular fa-heart me-2 favbtn" onclick="addToFav(${product.id})" data-id="${product.id}"></i>
                    <i class="fa-solid fa-bag-shopping shop" onclick="addToCart(this,${product.id})" data-id="${product.id}"></i>
                </div>
            </div>
        </div>
    `);
    checkButtons();
    openPopUp("product");
}

// Adds a product to cart, updates UI, and triggers fly animation
function addToCart(that,productId){
    let product = getProduct(productId);
    cartProducts.push(product);
    checkButtons();
    updateLocalStorage();
    isCartEmpty();
    let icon;
    if($(".cartIcon").offset().top == 0 && $(".cartIcon").offset().left == 0){
        icon = $(".navbar-toggler");
    }
    else{
        icon = $(".cartIcon");
    }
    flyToCart($(that).closest(".stop").find("img"),icon);
}
// Removes product from cart (for product cards)
function removeFromCart(productId){
    cartProducts = cartProducts.filter((item) => {return item.id != productId ;});
    checkButtons();
    updateLocalStorage();
    isCartEmpty();
}
// Removes product from inside the Cart popup
function removeBtnInCart(productId){
    cartProducts = cartProducts.filter((item) => {return item.id != productId ;});
    checkButtons();
    updateLocalStorage();
    showProductInCart();
    isCartEmpty();
    adjustPopUp();
}
// Appears correct UI message when cart/fav are empty or not
function isCartEmpty(){
    if(cartProducts.length == 0){
        $(".popUp.cart .btns").addClass("d-none");
        $(".popUp.cart .empty").removeClass("d-none");
    }
    else{
        $(".popUp.cart .btns").removeClass("d-none");
        $(".popUp.cart .empty").addClass("d-none");
    }
    if(favProducts.length == 0){
        $(".popUp.fav .empty").removeClass("d-none");
    }
    else{
        $(".popUp.fav .empty").addClass("d-none");
    }
}
// Updates all cart/fav button states across the page
function checkButtons(){
    $(".shop").removeClass("remove").each(function () {
        let productId = $(this).data("id");
        $(this).attr("onclick", `addToCart(this,${productId})`);
    });
    $(".favbtn").removeClass("inFav fa-solid").each(function () {
        let productId = $(this).data("id");
        $(this).attr("onclick", `addToFav(${productId})`);
    });
    $(".swiper-slide").removeClass("added")

    cartProducts.forEach(cartProduct => {
        $(`.shop[data-id="${cartProduct.id}"]`).addClass("remove")
            .attr("onclick", `removeFromCart(${cartProduct.id})`);
    });
    favProducts.forEach(favProduct => {
        $(`.favbtn[data-id="${favProduct.id}"]`).addClass("inFav fa-solid")
            .attr("onclick", `removeFromFav(${favProduct.id})`);
        $(`.swiper-slide[data-id="${favProduct.id}"]`).addClass("added");
    });
}
// Removes all items from cart at once (Clear Cart)
function removeAll(){
    $(".popUp.cart .box .row").html("");
    cartProducts = [];
    checkButtons();
    updateLocalStorage();
    isCartEmpty()
    adjustPopUp();
}
// Opens checkout modal, validates user input, and clears cart on success
function checkout(){
    Swal.fire({
        title: "Complete Your Order",
        html: `
            <input type="text" id="name" class="swal2-input" placeholder="Your Name">
            <input type="text" id="email" class="swal2-input" placeholder="Your Email">
            <input type="text" id="phone" class="swal2-input" placeholder="Phone Number">
        `,
        confirmButtonText: "Confirm",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        focusConfirm: false,
        customClass: {
            popup: "cartAlert",
        },
        preConfirm: () => {
            let name = $("#name").val().trim(),
                email = $("#email").val().trim(),
                phone = $("#phone").val().trim();
            if (!name || !email || !phone) {
                Swal.showValidationMessage("Please enter all fields.");
                return false;
            }
            if (!nameRegex.test(name)) {
            Swal.showValidationMessage("Please enter a valid name (letters only).");
            return false;
            }
            if (!emailRegex.test(email)) {
            Swal.showValidationMessage("Please enter a valid email.");
            return false;
            }
            if (!phoneRegex.test(phone)) {
            Swal.showValidationMessage("Phone number must be an Egyptian number (11 digits)");
            return false;
            }
            removeAll();
            return { name, email, phone };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: "success",
                title: "Order Received!",
                text: "We will contact you shortly.",
                confirmButtonText: "OK"
            });
        }
    });
}

// Creates a flying animation of product image moving toward cart icon
function flyToCart(productImg, cartIcon) {
    let img = $(productImg),
        cart = $(cartIcon),
        imgOffset = img.offset(),
        cartOffset = cart.offset(),
        fly = img.clone()
            .addClass("fly-img")
            .css({
                top: imgOffset.top,
                left: imgOffset.left,
                opacity: 1,
            })
            .appendTo("body");
    fly.animate({
        top: cartOffset.top,
        left: cartOffset.left,
        width: 80,
        opacity: 0
    }, 1200, function () {
        fly.remove();
    });
}

// Renders favourite items inside the Favorites popup
function showProductInFav(){
    $(".popUp.fav .box .row").html("");
    favProducts.forEach(favProduct => {
        let product = getProduct(favProduct.id);
        $(".popUp.fav .box .row").append(`
            <div class="col-6 col-lg-3">
                <div class="item text-center">
                    <i class="fa-solid fa-heart heart"></i>
                    <img src="${product.image}" class="img-fluid" alt="">
                    <h6>${product.name}</h6>
                </div>
            </div>
        `);
    });
    adjustPopUp();
}
// Adds a product to favorites
function addToFav(productId){
    let product = getProduct(productId);
    favProducts.push(product);
    checkButtons();
    updateLocalStorage();
    isCartEmpty();
}
// Removes a product from favorites
function removeFromFav(productId){
    favProducts = favProducts.filter((item) => {return item.id != productId ;});
    checkButtons();
    updateLocalStorage();
    isCartEmpty();
}

// Fades between phrases in the Our Story page (looping text)
let i = 0;
function fadeText() {
    $("#fadeText").fadeOut(800, function() {
        $(this).text(texts[i]).fadeIn(800);
        i = (i + 1) % texts.length;
    });
}