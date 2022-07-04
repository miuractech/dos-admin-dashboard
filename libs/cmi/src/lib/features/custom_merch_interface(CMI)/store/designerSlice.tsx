import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import { fetchCount } from './api';
import { Color, RootObject, side, SideImage } from '../components/selectProduct';
// import { productSideType, productType, productVariantType } from '../components/selectProduct';

type colorProps = {
  colorName: string
  colorCode: string
}

export type sideType = {
  height?: number,
  imgUrl: string,
  rotation: number,
  type: 'rect' | 'circle'
  width?: number
  x: number
  y: number
  radius: number
}
export interface DesignerState {
  products: RootObject[] | null;
  product: RootObject | null;
  // sides:sideType[];
  sides: { [sideName: string]: sideType };
  image: string | null;
  selectedSide: sideType;
  selectedColor: colorProps | null;
  selectedSideName: string | null;
  colors: colorProps[] | null;
  sideNames: string[];
  designPreviewImages: { sideName: string, url: string }[]
}

const initialState: DesignerState = {
  // bgImage: null,
  // product: null,
  // status: 'idle',
  // productVariant: null,
  // productSide: null
  products: null,
  product: null,
  sides: {},
  image: null,
  selectedSideName: null,
  selectedSide: {
    // height:0,
    imgUrl: '',
    rotation: 0,
    type: 'circle',
    // width:0
    x: 0,
    y: 0,
    radius: 0
  },
  selectedColor: null,
  colors: null,
  sideNames: [],
  designPreviewImages: []
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount: number) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const orderedSides = ["Front", "Back", "Left", "Right", "Top", "Bottom"]

export const DesignerSlice = createSlice({
  name: 'designer',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setBgImage: (state, action) => {
      // state.bgImage = action.payload;
    },
    setProducts: (state, action) => {
      console.log(action.payload);
      const { payload } = action
      const { sideImages } = payload[0]
      const sideNames = orderedSides.filter((side: string) => sideImages[payload[0].color[0].colorName][side])
      const sides = payload[0].sideImages[payload[0].color[0].colorName]
      state.products = payload;
      state.product = { ...payload[0] }
      state.colors = payload[0].color
      state.selectedColor = payload[0].color[0]
      state.sides = sides
      state.sideNames = sideNames
      state.selectedSideName = sideNames[0]
      state.selectedSide = sideImages[payload[0].color[0].colorName][sideNames[0]]
      state.image = sideImages[payload[0].color[0].colorName][sideNames[0]].imgUrl
    },
    setProduct: (state, action) => {
      const { payload } = action
      const { sideImages } = payload
      const sideNames = orderedSides.filter((side: string) => sideImages[payload.color[0].colorName][side])
      const sides = payload.sideImages[payload.color[0].colorName]
      state.product = payload;
      state.colors = payload.color
      state.selectedColor = payload.color[0]
      state.sides = sides
      state.sideNames = sideNames
      state.selectedSideName = sideNames[0]
      state.selectedSide = sideImages[payload.color[0].colorName][sideNames[0]]
      state.image = sideImages[payload.color[0].colorName][sideNames[0]].imgUrl
      // state.productVariant = action.payload.variants[0]
      // state.productSide = action.payload.variants[0].sides[0]
      // state.bgImage = action.payload.variants[0].sides[0].img
    },
    setSelectedSide: (state, action) => {
      console.log(action.payload);
      state.selectedSideName = action.payload
      state.selectedSide = state.sides[action.payload]
      state.image = state.sides[action.payload].imgUrl
    },
    setSelectedColor: (state, action) => {
      const payload = action.payload as Color
      const product = { ...current(state).product } as RootObject
      if (product) {
        const sideImages = product.sideImages as SideImage

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const sideNames = orderedSize.filter((side) => product?.sideImages[payload.colorName][side])
        state.selectedColor = payload
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        state.sides = product.sideImages[payload.colorName] as side
        state.sideNames = sideNames
        state.selectedSideName = sideNames[0]
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        state.selectedSide = sideImages[payload.colorName][sideNames[0]]
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        state.image = sideImages[payload.colorName][sideNames[0]].imgUrl
      }

    },
    setPreviewImagesToRedux: (state, action) => {
      state.designPreviewImages = action.payload
    }
  },
});

export const { setBgImage, setProduct, setProducts, setSelectedColor, setSelectedSide, setPreviewImagesToRedux } = DesignerSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectDesigner = (state: RootState) => state.designer;

export default DesignerSlice.reducer;
