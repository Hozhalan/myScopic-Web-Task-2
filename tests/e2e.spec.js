const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { HomePage } = require('../pages/homePage');
const { CartPage } = require('../pages/cartPage');
const { CheckoutPage } = require('../pages/checkoutPage');

test.describe('End-to-End Scenario', () => {
    let loginPage;
    let homePage;
    let cartPage;
    let checkoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        await loginPage.navigate();
    });

    test('Complete Checkout Flow', async ({ page }) => {
        // Step 1: Login as Standard User
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory\.html/);

        // Step 2: Sort products by price (High to Low)
        await homePage.sortProductsByPriceHighToLow();

        // Step 3: Add first two items to the cart
        await homePage.addFirstTwoItemsToCart();

        // Step 4: Open the cart
        await homePage.openCart();
        await expect(page).toHaveURL(/cart\.html/);

        // Step 5: Proceed to checkout
        await cartPage.proceedToCheckout();

        // Step 6: Fill checkout data
        await checkoutPage.fillCheckoutData('John', 'Doe', '12345');

        // Step 7: Finish checkout procedure
        await checkoutPage.finishCheckout();

        // Verify: Order complete message
        const orderCompleteMessage = await checkoutPage.getOrderCompleteMessage();
        expect(orderCompleteMessage).toBe('Thank you for your order!');
    });
});
