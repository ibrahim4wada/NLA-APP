const db = require('../models'); // Access to Product, Category, User models
const { Op } = require('sequelize'); // For search/filter operations later

// @desc    Create a new product
// @route   POST /api/v1/products
// @access  Private (Admin, Vendor)
exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, productType, status, categoryIds } = req.body;
    const creatorId = req.user.id; // Assuming req.user is populated by 'protect' middleware

    if (!name || !price || !productType || !creatorId) {
      return res.status(400).json({ message: 'Name, price, product type, and creator ID are required.' });
    }

    // Validate productType and status enums if necessary, though Sequelize does this at DB level
    // TODO: Add more robust validation

    const product = await db.Product.create({
      name,
      description,
      price,
      productType,
      status: status || 'draft', // Default to draft if not provided
      creatorId,
    });

    if (categoryIds && categoryIds.length > 0) {
      const categories = await db.Category.findAll({ where: { id: categoryIds } });
      if (categories && categories.length > 0) {
        await product.setCategories(categories); // Sequelize association method
      }
    }

    // Refetch product with associations to return
    const productToReturn = await db.Product.findByPk(product.id, {
        include: [
            { model: db.User, as: 'creator', attributes: ['id', 'name', 'email'] },
            { model: db.Category, as: 'categories', attributes: ['id', 'name', 'slug'], through: { attributes: [] } }
        ]
    });


    res.status(201).json({ message: 'Product created successfully.', product: productToReturn });
  } catch (error) {
    console.error('Error creating product:', error);
    // Proper error handling should be implemented (e.g., validation errors vs server errors)
    if (!res.headersSent) {
      return res.status(500).json({ message: 'Internal server error while creating product.' });
    }
    next(error);
  }
};

// @desc    Get all products (with pagination, filtering later)
// @route   GET /api/v1/products
// @access  Public (for browsing)
exports.getProducts = async (req, res, next) => {
  try {
    // TODO: Implement pagination, filtering, sorting
    const products = await db.Product.findAll({
      where: { status: 'published' }, // Only show published products to public by default
      include: [
        { model: db.User, as: 'creator', attributes: ['id', 'name'] }, // Basic creator info
        { model: db.Category, as: 'categories', attributes: ['id', 'name', 'slug'], through: { attributes: [] } } // Remove junction table attributes
      ],
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ count: products.length, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    if (!res.headersSent) {
      return res.status(500).json({ message: 'Internal server error while fetching products.' });
    }
    next(error);
  }
};

// @desc    Get a single product by ID
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await db.Product.findByPk(id, {
      include: [
        { model: db.User, as: 'creator', attributes: ['id', 'name', 'email'] },
        { model: db.Category, as: 'categories', attributes: ['id', 'name', 'slug'], through: { attributes: [] } }
      ]
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    // Optional: Check if product is 'published' if accessed by non-admin/non-creator
    // if (product.status !== 'published' && (!req.user || req.user.id !== product.creatorId /* && !isAdmin */)) {
    //    return res.status(404).json({ message: 'Product not found or not available.' });
    // }

    res.status(200).json({ product });
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    if (!res.headersSent) {
      return res.status(500).json({ message: 'Internal server error.' });
    }
    next(error);
  }
};

// @desc    Update a product
// @route   PUT /api/v1/products/:id
// @access  Private (Admin, or Vendor who owns the product)
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, productType, status, categoryIds } = req.body;
    const userId = req.user.id; // From protect middleware
    // const userRoles = req.user.roles; // From protect middleware, if roles are in JWT

    let product = await db.Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Authorization: Check if user is admin or product creator
    // const isAdmin = userRoles.includes('Admin'); // Assuming 'Admin' role exists
    // For now, let's assume only creator or Admin (will refine with authorizeRoles later)
    // This check needs to be more robust using proper role checks from authorizeRoles or a dedicated permission middleware
    if (product.creatorId !== userId /* && !isAdmin */ ) {
        // A more generic "Not Found" or "Forbidden" might be better depending on policy
        // For now, let's use 403 Forbidden if they are authenticated but not authorized for this product
        return res.status(403).json({ message: 'User not authorized to update this product.' });
    }

    // Update fields
    product.name = name || product.name;
    product.description = description !== undefined ? description : product.description;
    product.price = price || product.price;
    product.productType = productType || product.productType;
    product.status = status || product.status;

    await product.save();

    if (categoryIds) { // If categoryIds is provided, update categories. Empty array means remove all.
      const categories = await db.Category.findAll({ where: { id: categoryIds } });
      await product.setCategories(categories);
    }

    // Refetch product with associations to return
    const updatedProduct = await db.Product.findByPk(product.id, {
        include: [
            { model: db.User, as: 'creator', attributes: ['id', 'name', 'email'] },
            { model: db.Category, as: 'categories', attributes: ['id', 'name', 'slug'], through: { attributes: [] } }
        ]
    });

    res.status(200).json({ message: 'Product updated successfully.', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
     if (!res.headersSent) {
      return res.status(500).json({ message: 'Internal server error while updating product.' });
    }
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/v1/products/:id
// @access  Private (Admin, or Vendor who owns the product)
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    // const userRoles = req.user.roles;

    const product = await db.Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Authorization check (similar to update)
    // const isAdmin = userRoles.includes('Admin');
    if (product.creatorId !== userId /* && !isAdmin */) {
      return res.status(403).json({ message: 'User not authorized to delete this product.' });
    }

    await product.destroy();

    res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    console.error('Error deleting product:', error);
    if (!res.headersSent) {
      return res.status(500).json({ message: 'Internal server error while deleting product.' });
    }
    next(error);
  }
};
