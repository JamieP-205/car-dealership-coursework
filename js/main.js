$(document).ready(function(){
    var slideNumber = 0;
    var slides = $(".slide-image");
    var slideTexts = [
        "Have a look around the dealership and see what cars are currently for sale.",
        "There is a range of used cars in stock for different budgets.",
        "The featured cars are picked because of value, condition and popularity.",
        "Customers can come visit the showroom or speak to a member of staff in person.",
        "Our aim is to give customers a friendly and straightforward experience."
    ];

    // This is shared code that will run on all the webpages
    $(".year").text(new Date().getFullYear());
    $("#accessPanel, #featuredText, #formResult, #contactResult, #financeResult, #car1info, #car2info, #car3info").hide();

    function updateAccessButtonState() {
        if ($("#accessButton").length) {
            $("#accessButton").attr("aria-expanded", $("#accessPanel").is(":visible") ? "true" : "false");
        }
    }

    function ensureErrorElement(inputSelector, messageId) {
        if (!$(messageId).length && $(inputSelector).length) {
            $(inputSelector).after('<div class="field-error" id="' + messageId.replace("#", "") + '"></div>');
        }
    }

    function showFieldError(inputSelector, messageId, messageText) {
        ensureErrorElement(inputSelector, messageId);
        $(inputSelector).addClass("input-error").attr("aria-invalid", "true");
        $(messageId).text(messageText).show();
    }

    function clearFieldError(inputSelector, messageId) {
        $(inputSelector).removeClass("input-error").attr("aria-invalid", "false");
        $(messageId).hide().text("");
    }

    function isBlank(value) {
        return $.trim(value) === "";
    }

    function hasValidPositiveNumber(value) {
        return !isNaN(value) && value > 0;
    }


// Accessibility code for changing font, colour and contrast modes
let changed = false;

function changeFont() {
  if (!changed) {
     document.body.style.fontFamily = "Courier New, monospace";
     changed = true;
  } else { 
    document.body.style.fontFamily = "Arial, sans-serif";
    changed = false;
    }
  }
document.getElementById("changeFont").addEventListener("click", changeFont);

    try {
        if (localStorage.getItem("contrastMode") == "on") {
            $("body").addClass("high-contrast");
        }
    }
    catch(error) {
    }

    $("#accessButton").click(function(){
        $("#accessPanel").toggle();
        updateAccessButtonState();
    });

    $("#contrastButton").click(function(){
        $("body").toggleClass("high-contrast");

        try {
            if ($("body").hasClass("high-contrast")) {
                localStorage.setItem("contrastMode", "on");
            }
            else {
                localStorage.setItem("contrastMode", "off");
            }
        }
        catch(error) {
        }
    });

    updateAccessButtonState();

    /* Home page */
    if ($("#homePage").length) {
        function showSlide() {
            slides.hide();
            $(slides[slideNumber]).show();
            $("#slideText").text(slideTexts[slideNumber]);
        }

        try {
            if (sessionStorage.getItem("welcomePopupShown") != "yes") {
                $("#welcomePopup").show();
                sessionStorage.setItem("welcomePopupShown", "yes");
            }
        }
        catch(error) {
            $("#welcomePopup").show();
        }

        $("#closePopup").click(function(){
            $("#welcomePopup").hide();
        });

        $("#featuredButton").click(function(){
            $("#featuredText").slideToggle();
        });

        if (slides.length) {
            showSlide();

            setInterval(function(){
                slideNumber = slideNumber + 1;

                if (slideNumber >= slides.length) {
                    slideNumber = 0;
                }

                showSlide();
            }, 5500);
        }
    }

    /* Car page */
    if ($("#allCarsButton").length) {
        $("#allCarsButton").click(function(){
            $("#camryBox, #focusBox, #golfBox").show();
            $("#filterText").text("Showing all cars.");
        });

        $("#cheapCarsButton").click(function(){
            $("#camryBox, #golfBox").hide();
            $("#focusBox").show();
            $("#filterText").text("Showing cars under £15,000.");
        });

        $("#car1button").click(function(){
            $("#car1info").toggle();
        });

        $("#car2button").click(function(){
            $("#car2info").toggle();
        });

        $("#car3button").click(function(){
            $("#car3info").toggle();
        });
    }

    // Customer form code for picking a car and contacting customer
    if ($("#customerForm").length) {
        ensureErrorElement("#lastName", "#lastNameError");
        ensureErrorElement("#email", "#emailError");
        ensureErrorElement("#phone", "#phoneError");
        ensureErrorElement("#firstName", "#firstNameError");
        ensureErrorElement("#carChoice", "#carChoiceError");
        ensureErrorElement("#reason", "#reasonError");
        ensureErrorElement("#bestDay", "#bestDayError");
        ensureErrorElement("#contactMethod", "#contactMethodError");

        $("#customerForm").submit(function(event){
            var lastName = $("#lastName").val();
            var email = $("#email").val();
            var phone = $("#phone").val();
            var firstName = $("#firstName").val();
            var carChoice = $("#carChoice").val();
            var reason = $("#reason").val();
            var bestDay = $("#bestDay").val();
            var contactMethod = $("#contactMethod").val();
            var isValid = true;

            event.preventDefault();
            clearFieldError("#lastName", "#lastNameError");
            clearFieldError("#email", "#emailError");
            clearFieldError("#phone", "#phoneError");
            clearFieldError("#firstName", "#firstNameError");
            clearFieldError("#carChoice", "#carChoiceError");
            clearFieldError("#reason", "#reasonError");
            clearFieldError("#bestDay", "#bestDayError");
            clearFieldError("#contactMethod", "#contactMethodError");

             if (isBlank(lastName)) {
                showFieldError("#lastName", "#lastNameError", "Please enter your last name.");
                isValid = false;
            }

             if (isBlank(email)) {
                showFieldError("#email", "#emailError", "Please enter your email address.");
                isValid = false;
            }

             if (isBlank(phone)) {
                showFieldError("#phone", "#phoneError", "Please enter your phone number.");
                isValid = false;
            }

             else if (!/^[0-9+\s]{7,15}$/.test(phone)) {
                     showFieldError("#phone", "#phoneError", "Please enter a valid phone number.");
                     isValid = false;
            }

            if (isBlank(firstName)) {
                showFieldError("#firstName", "#firstNameError", "Please enter your first name.");
                isValid = false;
            }

            if (isBlank(carChoice)) {
                showFieldError("#carChoice", "#carChoiceError", "Please choose a car.");
                isValid = false;
            }

            if (isBlank(reason)) {
                showFieldError("#reason", "#reasonError", "Please tell us why you are interested.");
                isValid = false;
            }

            if (isBlank(bestDay)) {
                showFieldError("#bestDay", "#bestDayError", "Please choose a preferred day.");
                isValid = false;
            }

            if (isBlank(contactMethod)) {
                showFieldError("#contactMethod", "#contactMethodError", "Please choose a contact method.");
                isValid = false;
            }

            if (!isValid) {
                $("#formResult").hide();
                return;
            }

            $("#formResult").text("Thank you " + firstName + ". Your request for the " + carChoice + " has been sent. Your reason was - " + reason + ". We will contact you via " + contactMethod + " and we will try to contact you on " + bestDay + ".").show();
            this.reset();
        });
    }

    // Finance page code for finding out how much a customer would pay monthly on a car
    if ($("#financeForm").length) {
        ensureErrorElement("#financePrice", "#financePriceError");
        ensureErrorElement("#financeDeposit", "#financeDepositError");
        ensureErrorElement("#financeMonths", "#financeMonthsError");

        $("#financeForm").submit(function(event){
            var financePrice = parseFloat($("#financePrice").val());
            var financeDeposit = parseFloat($("#financeDeposit").val());
            var financeMonths = parseInt($("#financeMonths").val(), 10);
            var amountLeft = 0;
            var monthlyPayment = 0;
            var isValid = true;

            event.preventDefault();

            clearFieldError("#financePrice", "#financePriceError");
            clearFieldError("#financeDeposit", "#financeDepositError");
            clearFieldError("#financeMonths", "#financeMonthsError");

            if (!hasValidPositiveNumber(financePrice)) {
                showFieldError("#financePrice", "#financePriceError", "Please enter a valid vehicle price.");
                isValid = false;
            }

            if (isNaN(financeDeposit) || financeDeposit < 0) {
                showFieldError("#financeDeposit", "#financeDepositError", "Please enter a valid deposit.");
                isValid = false;
            }

            if (!hasValidPositiveNumber(financeMonths)) {
                showFieldError("#financeMonths", "#financeMonthsError", "Please enter valid finance months.");
                isValid = false;
            }

            if (isValid && financeDeposit > financePrice) {
                showFieldError("#financeDeposit", "#financeDepositError", "Deposit cannot be greater than the price.");
                isValid = false;
            }

            if (!isValid) {
                $("#financeResult").hide();
                return;
            }

            amountLeft = financePrice - financeDeposit;
            monthlyPayment = amountLeft / financeMonths;

            $("#financeResult").text("Estimated monthly payment: £" + monthlyPayment.toFixed(2) + ". Amount left after deposit: £" + amountLeft.toFixed(2) + ".").show();
        });
    }

    // Contact form code for handling the form on the contact page
    if ($("#contactForm").length) {
        ensureErrorElement("#name", "#nameError");
        ensureErrorElement("#subject", "#subjectError");
        ensureErrorElement("#message", "#messageError");
        ensureErrorElement("#email", "#emailError");

        $("#contactForm").submit(function(event){
            var email = $("#email").val();
            var message = $("#message").val();
            var name = $("#name").val();
            var subject = $("#subject").val();
            var isValid = true;

            event.preventDefault();

            clearFieldError("#email", "#emailError");
            clearFieldError("#message", "#messageError");
            clearFieldError("#name", "#nameError");
            clearFieldError("#subject", "#subjectError");

            if (isBlank(email)) {
                showFieldError("#email", "#emailError", "Please enter your email address.");
                isValid = false;
            }

            if (isBlank(message)) {
                showFieldError("#message", "#messageError", "Please enter your message.");
                isValid = false;
            }

            if (isBlank(subject)) {
                showFieldError("#subject", "#subjectError", "Please enter a subject.");
                isValid = false;
            }

            if (!isValid) {
                $("#contactResult").hide();
                return;
            }

            $("#contactResult").text("Thanks " + name + ". Your message about " + subject + " has been sent. A member of staff will get back to you soon.").show();
            this.reset();
        });
    }

    // Trade-in valuation logic contributed by Oskar.
    if ($("#calculateTradeIn").length) {
        ensureErrorElement("#tradeMake", "#tradeMakeError");
        ensureErrorElement("#tradeModel", "#tradeModelError");
        ensureErrorElement("#tradeYear", "#tradeYearError");
        ensureErrorElement("#tradeMileage", "#tradeMileageError");
        ensureErrorElement("#tradeCondition", "#tradeConditionError");

        $("#calculateTradeIn").click(function(){
            var make = $("#tradeMake").val();
            var model = $("#tradeModel").val();
            var year = parseInt($("#tradeYear").val(), 10);
            var mileage = parseInt($("#tradeMileage").val(), 10);
            var condition = $("#tradeCondition").val();
            var isValid = true;
            var baseValue = 0;
            var conditionMultiplier = 0;
            var tradeInValue = 0;
            var currentYear = new Date().getFullYear();

            clearFieldError("#tradeMake", "#tradeMakeError");
            clearFieldError("#tradeModel", "#tradeModelError");
            clearFieldError("#tradeYear", "#tradeYearError");
            clearFieldError("#tradeMileage", "#tradeMileageError");
            clearFieldError("#tradeCondition", "#tradeConditionError");

            if (isBlank(make)) {
                showFieldError("#tradeMake", "#tradeMakeError", "Please enter the car make.");
                isValid = false;
            }

            if (isBlank(model)) {
                showFieldError("#tradeModel", "#tradeModelError", "Please enter the car model.");
                isValid = false;
            }

            if (!hasValidPositiveNumber(year) || year > currentYear) {
                showFieldError("#tradeYear", "#tradeYearError", "Please enter a valid year.");
                isValid = false;
            }

            if (!hasValidPositiveNumber(mileage)) {
                showFieldError("#tradeMileage", "#tradeMileageError", "Please enter valid mileage.");
                isValid = false;
            }

            if (isBlank(condition)) {
                showFieldError("#tradeCondition", "#tradeConditionError", "Please select the condition.");
                isValid = false;
            }

            if (!isValid) {
                $("#tradeInResult").hide();
                return;
            }

            baseValue = 20000 - (currentYear - year) * 1000 - mileage * 0.1;

            // Equation for finding out condition of car
            switch (condition) {
                case "excellent":
                    conditionMultiplier = 1.0;
                    break;
                case "good":
                    conditionMultiplier = 0.8;
                    break;
                case "fair":
                    conditionMultiplier = 0.6;
                    break;
                case "poor":
                    conditionMultiplier = 0.4;
                    break;
            }

            tradeInValue = Math.max(0, baseValue * conditionMultiplier);

            $("#tradeInResult").text("The estimated trade-in value for your " + year + " " + make + " " + model + " (" + condition + " condition, " + mileage + " miles): £" + tradeInValue.toFixed(2) + ". This is only an estimate, the actual value in-store may vary.").show();
        });
    }
});
