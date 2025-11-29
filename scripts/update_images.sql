-- Update all product and variant images to the same default image
\set img 'https://i.ibb.co/MD44GmQ3/dien-thoai-sap-ra-mat-dau-nam-2025-6-2c2c5bfde4.webp'

-- Products
update public.products
set image = :'img',
    images = array[:'img', :'img', :'img']::text[]
where true;

-- Variants
update public.product_variants
set images = array[:'img']::text[]
where true;

