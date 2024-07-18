const mongoose = require('mongoose');
const MongoProduct = require('../../mongo/Product');

const denormalizeProduct = async (productId, Product) => {
  try {
    const product = await Product.findByPk(productId, { include: ["Category", "Brand"] });
    if (!product) {
      console.log(`Product with ID: ${productId} not found`);
      return;
    }

    const { name, price, brand, category, description, weight, stock, image } = product;

    await MongoProduct.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(productId) },
      {
        name,
        price,
        brand,
        category,
        description,
        weight,
        stock,
        image,
      },
      { upsert: true }
    );
    console.log(`Successfully denormalized product with ID: ${productId}`);
  } catch (err) {
    console.error(`Error denormalizing product: ${err.message}`);
  }
};

module.exports = denormalizeProduct;
