-- Delete all orders and order items
-- Order items will be deleted automatically due to CASCADE constraint

DELETE FROM orders;

-- Reset sequences if needed (optional)
-- This ensures new orders start from a clean state
