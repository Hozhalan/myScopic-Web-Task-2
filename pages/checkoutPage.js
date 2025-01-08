const { checkoutPageLocators } = require("../locators/checkoutPage-locators");

class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = checkoutPageLocators.firstNameInput;
        this.lastNameInput = checkoutPageLocators.lastNameInput;
        this.postalCodeInput = checkoutPageLocators.postalCodeInput;
        this.continueButton = checkoutPageLocators.continueButton;
        this.finishButton = checkoutPageLocators.finishButton;
        this.orderCompleteMessage = checkoutPageLocators.orderCompleteMessage;
    }

    async fillCheckoutData(firstName, lastName, postalCode) {
        await this.page.fill(this.firstNameInput, firstName);
        await this.page.fill(this.lastNameInput, lastName);
        await this.page.fill(this.postalCodeInput, postalCode);
        await this.page.click(this.continueButton);
    }

    async finishCheckout() {
        await this.page.click(this.finishButton);
    }

    async getOrderCompleteMessage() {
        return this.page.textContent(this.orderCompleteMessage);
    }
}

module.exports = { CheckoutPage };
