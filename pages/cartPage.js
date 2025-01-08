const { cartPageLocators } = require("../locators/cartPage-locators");

class CartPage {
    constructor(page) {
        this.page = page;
        this.checkoutButton = cartPageLocators.checkoutButton;
    }

    async proceedToCheckout() {
        await this.page.click(this.checkoutButton);
    }
}

module.exports = { CartPage };
