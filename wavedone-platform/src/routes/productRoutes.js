const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management and browsing
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CategoryInfo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         slug:
 *           type: string
 *     CreatorInfo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         email: # Optional, depending on what you want to expose
 *           type: string
 *           format: email
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         description:
 *           type: string
 *           nullable: true
 *         price:
 *           type: number
 *           format: decimal
 *         productType:
 *           type: string
 *           enum: [digital_download, subscription, service]
 *         status:
 *           type: string
 *           enum: [draft, published, archived]
 *         creatorId: # This might be redundant if creator object is included
 *           type: string
 *           format: uuid
 *         creator:
 *           $ref: '#/components/schemas/CreatorInfo'
 *         categories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CategoryInfo'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     ProductInput:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - productType
 *       properties:
 *         name:
 *           type: string
 *           example: Awesome eBook
 *         description:
 *           type: string
 *           nullable: true
 *           example: A truly awesome eBook about coding.
 *         price:
 *           type: number
 *           format: decimal
 *           example: 19.99
 *         productType:
 *           type: string
 *           enum: [digital_download, subscription, service]
 *           example: digital_download
 *         status:
 *           type: string
 *           enum: [draft, published, archived]
 *           example: draft
 *         categoryIds:
 *           type: array
 *           items:
 *             type: integer
 *           example: [1, 2]
 *           description: Array of Category IDs to associate with the product.
 *
 *     ProductResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           nullable: true
 *         product:
 *           $ref: '#/components/schemas/Product'
 *     ProductsListResponse:
 *        type: object
 *        properties:
 *          count:
 *            type: integer
 *          products:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Product'
 */

// Public routes
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of published products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of products per page
 *       # Add more parameters for filtering (category, price range, etc.) and sorting later
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductsListResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *     security: [] # Public route
 */
router.get('/', productController.getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retrieve a single product by its ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Detailed information about the product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse' # Reusing ProductResponse, product will be populated
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *     security: [] # Public route, but controller might have logic for draft/archived products
 */
router.get('/:id', productController.getProductById);

// Protected routes - accessible by Admin or Vendor
// For create, update, delete, we need to ensure the user is authenticated
// and has the appropriate role (Admin or Vendor).
// The controller logic further refines if a Vendor can only modify/delete their own products.

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: [] # Requires authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Product created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         description: Bad request (e.g., validation error).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized (e.g., not logged in).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden (e.g., not Admin or Vendor).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  '/',
  protect,
  authorizeRoles('Admin', 'Vendor'), // Only Admins or Vendors can create products
  productController.createProduct
);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The product ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput' # Can reuse ProductInput, or create a specific UpdateProductInput
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden (e.g., not product owner or Admin).
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal server error.
 *     # All error responses can use $ref: '#/components/schemas/ErrorResponse'
 */
router.put(
  '/:id',
  protect,
  authorizeRoles('Admin', 'Vendor'), // Only Admins or Vendors can attempt to update
  productController.updateProduct // Controller handles specific ownership check for Vendors
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The product ID to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden (e.g., not product owner or Admin).
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal server error.
 *     # All error responses can use $ref: '#/components/schemas/ErrorResponse'
 */
router.delete(
  '/:id',
  protect,
  authorizeRoles('Admin', 'Vendor'), // Only Admins or Vendors can attempt to delete
  productController.deleteProduct // Controller handles specific ownership check for Vendors
);

module.exports = router;
