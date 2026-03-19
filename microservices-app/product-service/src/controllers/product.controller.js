const Product = require('../models/product.model');
const ApiResponse = require('../utils/apiResponse');

const PRODUCT_FIELDS = ['name', 'sku', 'description', 'price', 'stock', 'isActive'];

const pickProductFields = (payload) =>
  PRODUCT_FIELDS.reduce((acc, field) => {
    if (payload[field] !== undefined) {
      acc[field] = payload[field];
    }

    return acc;
  }, {});

const getAllProducts = async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);
    const offset = (page - 1) * limit;
    const where = {};

    if (req.query.isActive !== undefined) {
      where.isActive = req.query.isActive === 'true';
    }

    const { count, rows: products } = await Product.findAndCountAll({
      where,
      offset,
      limit,
      order: [['createdAt', 'DESC']],
    });

    return ApiResponse.success(res, {
      products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalCount: count,
        limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return ApiResponse.notFound(res, 'Urun bulunamadi');
    }

    return ApiResponse.success(res, product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const productData = pickProductFields(req.body);
    const product = await Product.create(productData);

    return ApiResponse.created(res, product, 'Urun basariyla olusturuldu');
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return ApiResponse.notFound(res, 'Urun bulunamadi');
    }

    await product.update(pickProductFields(req.body));

    return ApiResponse.success(res, product, 'Urun basariyla guncellendi');
  } catch (error) {
    next(error);
  }
};

const updateProductStock = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return ApiResponse.notFound(res, 'Urun bulunamadi');
    }

    await product.update({ stock: req.body.stock });

    return ApiResponse.success(res, product, 'Urun stogu basariyla guncellendi');
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return ApiResponse.notFound(res, 'Urun bulunamadi');
    }

    await product.destroy();

    return ApiResponse.success(res, null, 'Urun basariyla silindi');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  updateProductStock,
  deleteProduct,
};
