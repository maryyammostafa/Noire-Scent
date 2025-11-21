// Products in Cart
loadProducts();

// Validation
$("#Contact form").on("submit", function(e){
    e.preventDefault();
    let name    = $("#Name").val().trim();
        phone   = $("#Phone").val().trim(),
        email   = $("#Email").val().trim(),
        message = $("#Message").val().trim(),
        status = $("#FormStatus");
    if (!name || !email || !phone || !message) {
        $("#FormStatus").text("Please enter all fields.");
        return;
    }
    if (!nameRegex.test(name)) {
        $("#FormStatus").text("Please enter a valid name (letters only).");
        return;
    }
    if (!phoneRegex.test(phone)) {
        $("#FormStatus").text("Phone number must be an Egyptian number (11 digits).");
        return;
    }
    if (!emailRegex.test(email)) {
        $("#FormStatus").text("Please enter a valid email.");
        return;
    }
    if (message.length < 10) {
        $("#FormStatus").text("Your message must be at least 10 characters.");
        return;
    }
    $("#FormStatus").text("Thank you — your message has been sent.");
    setTimeout(function(){
        $("#FormStatus").text("");
    },5000)
    $("#Contact form")[0].reset();
});