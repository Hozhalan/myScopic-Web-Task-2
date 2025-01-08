const { homePageLocators } = require("../locators/homePage-locators");

class HomePage {
  constructor(page) {
    this.page = page;
    this.sortDropdown = homePageLocators.sortDropdown;
    this.addToCartButtons = homePageLocators.addToCartButtons;
    this.cartIcon = homePageLocators.cartIcon;
  }

  async sortProductsByPriceHighToLow() {
    await this.page.selectOption(this.sortDropdown, 'hilo');
  }

  async addFirstTwoItemsToCart() {
    const buttons = await this.page.$$(this.addToCartButtons);
    await buttons[0].click();
    await buttons[1].click();
  }

  async openCart() {
    await this.page.click(this.cartIcon);
  }
}

module.exports = { HomePage };
