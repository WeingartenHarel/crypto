import { cryptoService } from "../../services/cryptoService"
// Action Dispatcher
export function loadItems(params) {
  return async (dispatch) => {
    const items = await cryptoService.query(params);
    console.log('loadItems items',items)
    const ItemsCrypto = items['Time Series (Digital Currency Daily)']
    console.log('Action Dispatche loadCrypto',ItemsCrypto)
    dispatch({ type: "SET_ItemsCrypto", ItemsCrypto });
  };
}


export function getById(ItemId) {
  return async (dispatch) => {
    const Item = await cryptoService.getById(ItemId);
    dispatch({ type: "SET_Item", Item });
    return Item
  };
}

export function removeItem(ItemId) {
  return async (dispatch) => {
    try {
      await cryptoService.remove(ItemId);
      dispatch({ type: "REMOVE_Item", ItemId: ItemId });
    } catch (err) {
      console.log("ERROR!");
    }
  };
}

export function addItem(Item) {
  return async (dispatch) => {
    try {
      console.log('addItem(Crypto)', Item)
      const savedItem = await cryptoService.save(Item);
      dispatch({ type: "ADD_Item", Item: Item });
      return savedItem
    } catch (err) {
      console.log("ERROR!", err);
    }
  };
}

export function editItem(Item) {
  console.log('editItem Item',Item)
  return async (dispatch) => {
    try {
      const updatedItem = await cryptoService.update(Item);
      dispatch({ type: "EDIT_ITEM", updatedItem });
    } catch (err) {
      console.log("ERROR!");
    }
  };
}

export function setItem(Item) {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_Item", Item });
    } catch (err) {
      console.log("ERROR!");
    }
  };
}

export function setItemByID(ItemId) {
  console.log('setItemByID', ItemId)
  return async (dispatch) => {
    console.log('setItemByID', ItemId)
    try {
      console.log('setItemByID', ItemId)
      const Item = await cryptoService.getById(ItemId);
      console.log('setItemByID', Item)
      // dispatch({ type: "SET_ITEM_BY_ID", ItemId });
      dispatch({ type: "SET_Item", Item });
    } catch (err) {
      console.log("ERROR!");
    }
  };
}



