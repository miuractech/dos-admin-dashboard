import { TFirestoreDefault } from 'rxf-rewrite/dist';

// SOMNATH FINAL PRODUCT TYPE PROPOSITION

// meta/product/product_type/{id}
interface TMetaProductType extends TFirestoreDefault {
  name: string; // min 5 max 25
  description: string; // min 20 max 100
  familyId: string; // family foreign key (uuid)
  categoryId: string; // category foreign key (uuid)
  sub_category_id: string; // sub-category foreign key (uuid)
  display_image: string; // firestore storage url
  size: Array<string>; // min 3
  color: Array<{
    name: string;
    /* unique */ code: string /* hex color code */;
  }>; // min 1
  material: Array<string>; // min 1
  style: Array<string>; // min 1
  base_price: number;
}

// meta/product/product_type/{id}/product_variant
interface TMetaProductTypeVariant {
  variant_name: string; // combination of size+color+material+style
  variant_id: string; // short 8-10 string long unique id. works better than array indexes
  // indexes as foreign key
  color: number;
  material: number;
  style: number;
  size: number;
}

// meta/product/product_type/{product_id}/prices/{price_id}
interface TMetaProductTypePrice {
  variant_id: string; // variant foreign key
  sku: string; // family-category-sub_category-product_type-variant_name
  price: number; // added to base price
}

// meta/product/product_type/{product_id}/inventory/{inventory_id}
interface TMetaProductTypeInventory {
  variant_id: string;
  location: string;
  sku: string; // same as prices
}
