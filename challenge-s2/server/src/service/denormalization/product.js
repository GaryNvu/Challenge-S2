const { Types: { ObjectId } } = require('mongoose');
const MongoProduct = require("../../mongo/Product");

const denormalizeProduct = async (productId, Product) => {
  try {
    console.log('Product model:', Product);
    console.log('findByPk method:', Product.findByPk);
    const product = await Product.findByPk(productId);

    if (product) {
      console.log(`Denormalizing product with ID: ${productId}`);

      const mongoProductId = new ObjectId(productId);

      await MongoProduct.findOneAndUpdate(
        { _id: mongoProductId },
        {
          name: product.name,
          price: product.price,
          brand: product.brand,
          category: product.category,
          description: product.description,
          weight: product.weight,
          stock: product.stock,
          image: product.image,
        },
        { upsert: true }
      );
      console.log(`Product with ID: ${productId} denormalized successfully`);
    }
  } catch (err) {
    console.error(`Error denormalizing product: ${err.message}`);
  }
};
  
module.exports = denormalizeProduct;
