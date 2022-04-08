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
    colorCode: string /* hex color code */;
    sides: Array<{
      img: string;
      side: string;
    }>;
  }>; // min 1
  material: Array<string>; // min 1
  style: Array<string>; // min 1
  base_price: number;
  sku: string;
}
