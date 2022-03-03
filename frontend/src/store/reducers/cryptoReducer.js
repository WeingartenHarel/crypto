const INITIAL_STATE = {
  ItemsCrypto:null,
  currItem: null,
};
//crypto
export function cryptoReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_ItemsCrypto":
      return {
        ...state,
        ItemsCrypto: state.ItemsCrypto,
      };
    case "SET_ItemsCrypto":
      // console.log("SET_ItemsCrypto",action.ItemsCrypto)
      return {
        ...state,
        ItemsCrypto: action.ItemsCrypto,
      };
    case "SET_ITEM_BY_ID":
      return {
        ...state,
        currItem: state.ItemsCrypto.filter((Item) => Item.imdbID === action.ItemId),  
      };
    case "SET_Item":
      return {
        ...state,
        currItem: action.Item,
      };
    case "REMOVE_Item":
      return {
        ...state,
        ItemsCrypto: state.ItemsCrypto.filter((Item) => Item.imdbID !== action.ItemId),
      };
    case "ADD_Item":
      return {
        ...state,
        ItemsCrypto: [...state.ItemsCrypto, action.Item],
      };
    case "EDIT_ITEM":
      console.log('EDIT_ITEM',action.updatedItem)
      return {
        ...state,
        ItemsCrypto: state.ItemsCrypto.map((Item) =>
          Item.imdbID === action.updatedItem.imdbID ? action.updatedItem : Item
        ),
      };
    case "SET_ItemsCrypto_Count":
      return {
        ...state,
        ItemsCryptoCount: action.itemsCount,
      };
    default:
      return state;
  }
}
