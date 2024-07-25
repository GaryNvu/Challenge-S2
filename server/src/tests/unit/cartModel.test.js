const SequelizeMock = require('sequelize-mock');
const dbMock = new SequelizeMock();

const setupMocks = () => {
    const Cart = dbMock.define('Cart', {
        cart_id: 1,
        user_id: 1,
        product_id: 2,
        quantity: 3,
        added_on: new Date()
    });

    const User = dbMock.define('User');
    const Product = dbMock.define('Product');

    // Setting up the associations
    Cart.belongsTo(User, { foreignKey: 'user_id' });
    Cart.belongsTo(Product, { foreignKey: 'product_id' });

    return { Cart, User, Product };
};

describe('Cart Model', () => {
    it('should correctly instantiate a cart item', async () => {
        const { Cart } = setupMocks();
        const cartItem = await Cart.create({
            user_id: 1,
            product_id: 2,
            quantity: 3
        });

        expect(cartItem.user_id).toEqual(1);
        expect(cartItem.product_id).toEqual(2);
        expect(cartItem.quantity).toEqual(3);
    });

    it('should handle defaults and auto-increment correctly', async () => {
        const { Cart } = setupMocks();
        const newCartItem = await Cart.create({
            user_id: 1,
            product_id: 2
        });

        expect(newCartItem.cart_id).toBeDefined(); // auto-incremented id
        expect(newCartItem.quantity).toBe(1); // default value
        expect(newCartItem.added_on).toBeDefined(); // default timestamp
    });

    it('should associate with User and Product correctly', async () => {
        const { Cart, User, Product } = setupMocks();

        User.findByPk = jest.fn().mockResolvedValue({
            id: 1,
            name: 'John Doe'
        });

        Product.findByPk = jest.fn().mockResolvedValue({
            id: 2,
            name: 'Product Name'
        });

        const cartItem = await Cart.create({
            user_id: 1,
            product_id: 2,
            quantity: 5
        });

        const user = await User.findByPk(cartItem.user_id);
        const product = await Product.findByPk(cartItem.product_id);

        expect(user.name).toEqual('John Doe');
        expect(product.name).toEqual('Product Name');
    });
});