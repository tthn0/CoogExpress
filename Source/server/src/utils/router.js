import addressController from "../controllers/address.js";
import billingController from "../controllers/billing.js";
import branchController from "../controllers/branch.js";
import customerController from "../controllers/customer.js";
import employeeController from "../controllers/employee.js";
import employeeScheduleController from "../controllers/employee_schedule.js";
import inventoryController from "../controllers/inventory.js";
import packageController from "../controllers/package.js";
import productController from "../controllers/product.js";
import receiptController from "../controllers/receipt.js";
import routeController from "../controllers/route.js";
import shipmentController from "../controllers/shipment.js";
import trackingHistoryController from "../controllers/tracking_history.js";
import userController from "../controllers/user.js";

const router = {
  POST: {},
  GET: {},
  PATCH: {},
  DELETE: {},
  registerRoute(method, path, handler) {
    this[method][path] = handler;
  },
  get(path, handler) {
    this.registerRoute("GET", path, handler);
  },
  post(path, handler) {
    this.registerRoute("POST", path, handler);
  },
  patch(path, handler) {
    this.registerRoute("PATCH", path, handler);
  },
  delete(path, handler) {
    this.registerRoute("DELETE", path, handler);
  },
};

export default router;

const registerController = (controller, path) => {
  for (const [method, handler] of Object.entries(controller))
    router[method](path, handler);
};

registerController(addressController, "/address");
registerController(billingController, "/billing");
registerController(branchController, "/branch");
registerController(customerController, "/customer");
registerController(employeeController, "/employee");
registerController(employeeScheduleController, "/employee_schedule");
registerController(inventoryController, "/inventory");
registerController(packageController, "/package");
registerController(productController, "/product");
registerController(receiptController, "/receipt");
registerController(routeController, "/route");
registerController(shipmentController, "/shipment");
registerController(trackingHistoryController, "/tracking_history");
registerController(userController, "/user");
