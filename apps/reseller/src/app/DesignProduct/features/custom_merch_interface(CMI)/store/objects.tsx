import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
// import { productSideType, productType, productVariantType } from '../components/selectProduct';
import { v4 as uuidv4 } from 'uuid';
import { sideNameType } from './designerSlice';
export interface DesignerState {
  // currentSide: 'left' | 'right' | 'top' | 'bottom' | 'front' | 'back';
  currentObjects: Array<any>;
  history: Array<Array<any>>;
  forward:Array<Array<any>>;
  sides: {[sideName in 'Front' | 'Back' | "Right" | "Left" | "Top" | "Bottom"]:any[]}
  status: 'idle' | 'loading' | 'failed';
  isExporting:boolean;
}

const initialState: DesignerState = {
  // currentSide: 'front',
  currentObjects: [],
  history: [[]],
  forward : [[]],
  sides: {
    'Front':[],
    'Back':[],
    'Right':[],
    'Left':[],
    'Top':[],
    'Bottom':[],
  },
  status: 'idle',
  isExporting:false
};

export const ObjectSlice = createSlice({
  name: 'objects',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateObject: (state, action) => {
      state.history = lastN(10,[...current(state.history), current(state.currentObjects)]).getAll()
      state.currentObjects = action.payload;
      state.forward=[[]]
    },
    addObject: (state, action) => {
      // state.history = addElementToQueue(state.history,state.currentObjects)
      state.history = lastN(10,[...current(state.history), current(state.currentObjects)]).getAll()
      state.forward = [[]]
      state.currentObjects = [...state.currentObjects, action.payload];
    },
    undo: (state) => {
      const history = current(state.history)
      const currentObjects = current(state.currentObjects)
      if(history.length>0){ 
        const last = history[history.length-1]
        const copy =  [...history]
        copy.pop()
        state.history = copy
        state.currentObjects = last
        state.forward = [...current(state.forward),currentObjects]
      }
    }, 
    redo:(state)=>{
      const forward = current(state.forward)
      const currentObjects = current(state.currentObjects)
      if(forward.length>1){ 
        const last = forward[forward.length-1]
        const copy =  [...forward]
        copy.pop()
        state.forward = copy
        state.currentObjects = last
        state.history = [...current(state.history),currentObjects]
      }
    },
    changeSide:(state,action:PayloadAction<{current:sideNameType,to:sideNameType}>) =>{
      const currentObjs = current(state.currentObjects)
      const sides = {...state.sides}
      sides[action.payload.current] = currentObjs
      state.currentObjects = sides[action.payload.to]
      state.sides = sides
      state.history = [[]]
      state.forward = [[]]
    },
    removeObject:(state,action)=>{
      state.history = lastN(10,[...current(state.history), current(state.currentObjects)]).getAll()
      state.currentObjects = state.currentObjects.filter(({id})=>action.payload !== id)
    },
    resetObjects:() => initialState,
    copyObject:(state,action) => {
      state.history = lastN(10,[...current(state.history), current(state.currentObjects)]).getAll()
      state.forward = [[]]
      const copiedObj = {...current(state.currentObjects).find(obj=>obj.id === action.payload)}
      state.currentObjects = [...current(state.currentObjects), {...copiedObj, id:uuidv4(), x:copiedObj.x+5,y:copiedObj.y+5}];
    },
    startExport:(state)=>{  
      state.isExporting = true
    },
    endExport:(state)=>{
      state.isExporting = false
    },
  },
});

export const { updateObject, addObject, undo, redo, changeSide, removeObject, resetObjects, copyObject, startExport, endExport } = ObjectSlice.actions;

export const selectObject = (state: RootState) => state.objects;

export default ObjectSlice.reducer;


function lastN(limit: number, array:any[] = []) {
  if (array.length > limit) array.splice(0, array.length - limit);
  const
      fluent = {
          add: (value: any) => {
              if (array.length >= limit) array.splice(0, array.length - limit + 1);
              array.push(value);
              return fluent;
          },
          getAll: () => array
      };
  return fluent;
}
