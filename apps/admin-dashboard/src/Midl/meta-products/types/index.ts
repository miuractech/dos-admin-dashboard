import { TFirestoreDefault } from 'rxf-rewrite';

export type metaProductStatus =
  | 'deleted'
  | 'archived'
  | 'published'
  | 'unpublished';

interface TSides {
  left: string;
  right: string;
  top: string;
  bottom: string;
  front: string;
  back: string;
}

export interface TMetaProductFamily extends TFirestoreDefault {
  name: string;
  index: number;
  createdBy: string;
  updatedBy: string;
  status: metaProductStatus;
}

export interface TMetaProductCategory extends TFirestoreDefault {
  name: string;
  index: number;
  familyId: string;
  createdBy: string;
  updatedBy: string;
  status: metaProductStatus;
}

export interface TMetaProductSubCategory extends TFirestoreDefault {
  name: string;
  index: number;
  familyId: string;
  categoryId: string;
  createdBy: string;
  updatedBy: string;
  status: metaProductStatus;
}

export interface TMetaProductType extends TFirestoreDefault {
  index: number;
  name: string; // min 5 max 25
  description: string; // min 20 max 100
  familyId: string; // family foreign key (uuid)
  categoryId: string; // category foreign key (uuid)
  sub_category_id: string; // sub-category foreign key (uuid)
  display_image: string; // firestore storage url
  size: Array<string>; // min 3
  color: Array<{
    colorName: string;
    colorCode: string /* hex color code */;
  }>; // min 1
  color_options: Array<{ colorName: string; colorCode: string; sides: TSides }>;
  base_price: number;
  status: metaProductStatus;
  createdBy: string;
  updatedBy: string;
  sku: string;
}

export interface TMetaProductTypeInventory extends TFirestoreDefault {
  product_type_id: string; // product_type foreign key id
  color: string;
  size: string;
  location: string;
  units: number;
  sku: string;
}
