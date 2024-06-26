// Authentication controllers
import loginController from "../controllers/authentication/login.js";

// Entity controllers
import addressController from "../controllers/entity/address.js";
import billingController from "../controllers/entity/billing.js";
import branchController from "../controllers/entity/branch.js";
import customerController from "../controllers/entity/customer.js";
import employeeController from "../controllers/entity/employee.js";
import employeeScheduleController from "../controllers/entity/employee_schedule.js";
import inventoryController from "../controllers/entity/inventory.js";
import packageController from "../controllers/entity/package.js";
import productController from "../controllers/entity/product.js";
import receiptController from "../controllers/entity/receipt.js";
import routeController from "../controllers/entity/route.js";
import shipmentController from "../controllers/entity/shipment.js";
import shoppingCartController from "../controllers/entity/shopping_cart.js";
import trackingHistoryController from "../controllers/entity/tracking_history.js";
import userController from "../controllers/entity/user.js";

// Helper controllers
import packageGoneThruController from "../controllers/helper/package_gone_thru.js";
import processCartController from "../controllers/helper/process_cart.js";

const router = {
  POST: {},
  GET: {},
  PUT: {},
  DELETE: {},
  use(endpoint, controller) {
    for (const [method, handler] of Object.entries(controller))
      router[method](endpoint, handler);
  },
  registerRoute(method, endpoint, handler) {
    this[method][endpoint] = handler;
  },
  get(endpoint, handler) {
    this.registerRoute("GET", endpoint, handler);
  },
  post(endpoint, handler) {
    this.registerRoute("POST", endpoint, handler);
  },
  put(endpoint, handler) {
    this.registerRoute("PUT", endpoint, handler);
  },
  delete(endpoint, handler) {
    this.registerRoute("DELETE", endpoint, handler);
  },
};

export { router };

// Authentication controllers
router.post("/login", loginController.post);

// Entity controllers
router.use("/address", addressController);
router.use("/billing", billingController);
router.use("/branch", branchController);
router.use("/customer", customerController);
router.use("/employee", employeeController);
router.use("/employee_schedule", employeeScheduleController);
router.use("/inventory", inventoryController);
router.use("/package", packageController);
router.use("/product", productController);
router.use("/receipt", receiptController);
router.use("/route", routeController);
router.use("/shipment", shipmentController);
router.use("/shopping_cart", shoppingCartController);
router.use("/tracking_history", trackingHistoryController);
router.use("/user", userController);

// Helper controllers
router.use("/package_gone_thru", packageGoneThruController);
router.use("/process_cart", processCartController);
