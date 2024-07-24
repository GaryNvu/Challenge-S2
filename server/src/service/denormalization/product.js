const { Types: { ObjectId } } = require('mongoose');
const MongoProduct = require("../../mongo/Product");

const denormalizeProduct = async (productId, Product) => {
  try {
    const product = await Product.findByPk(productId, {
      include: ['Category', 'Brand']
    });

    if (product) {
      const mongoProductId = new ObjectId(productId);

      await MongoProduct.findOneAndUpdate(
        { sqlID: productId },
        {
          sqlID: productId,
          name: product.name,
          price: product.price,
          brand: product.Brand.name,
          category: product.Category.name,
          description: product.description,
          weight: product.weight,
          condition: product.condition,
          language: product.language,
          stock: product.stock,
          image: product.image,
        },
        { upsert: true, new: true }
      );
    }
  } catch (err) {
    console.error(`Error denormalizing product: ${err.message}`);
  }
};
  
module.exports = denormalizeProduct;
