CREATE VIEW shopping_cart_view
AS SELECT 
	SC.user_id,
    SC.branch_id,
    B.name AS branch_name,
    SC.product_id,
    P.name AS product_name,
    P.description AS product_desc,
    P.image AS product_image,
    SC.quantity AS product_quantity,
    P.price
FROM
	shopping_cart AS SC,
    branch AS B,
    product AS P
WHERE 
	SC.branch_id = B.id AND
    SC.product_id = P.id;