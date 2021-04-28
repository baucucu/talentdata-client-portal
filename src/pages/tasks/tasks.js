import React from 'react';
import 'devextreme/data/odata/store';
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Editing,
  Lookup,
} from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import mongodb from '../../api/RealmClient';
import { BSON } from 'realm-web';

export default () => (
  <React.Fragment>
    <h2 className={'content-block'}>Tasks</h2>

    <DataGrid
      id="gridContainer"
      className={'dx-card wide-card'}
      dataSource={store}
      allowColumnReordering={true}
      hoverStateEnabled={true}
      selection={{ mode: 'single' }}
      keyExpr="_id"
      showBorders={false}
      focusedRowEnabled={true}
      onSelectionChanged={(values)=>{return console.log("focus row changed values: ", values)}}
      // defaultFocusedRowIndex={0}
      columnAutoWidth={true}
      columnHidingEnabled={true}
    >
      <Paging defaultPageSize={10} />
      <Pager showPageSizeSelector={true} showInfo={true} />
      <FilterRow visible={true} />
      <Editing
        mode="row"
        allowUpdating={true}
        allowDeleting={true}
        allowAdding={true} />

      {/* <Column dataField={'_id'} caption={'ID'}/> */}
      <Column dataField={'Name'} caption={'Name'} hidingPriority={2} />
      <Column dataField={'Gender'} caption={'Gender'} hidingPriority={2} />

    </DataGrid>
  </React.Fragment>
);

const db = mongodb.db("candidates")
const coll = db.collection("garrett_it")

const store = new CustomStore({
  key: '_id',
 
  load: async () => {
    console.log('store: ', store)
    let records = await coll.aggregate([{"$addFields":{"_id": {"$toString": "$_id"}}}])
    console.log('records: ', records[0]._id)
    return records
  },

  insert: async values => {
    return await coll.insertOne(values)
  },

  update: async (id,values) => {
    let updateValues = values
    delete updateValues._id
    console.log("update values: ", values)
    return await coll.updateOne({_id: BSON.ObjectId(id)},{$set: updateValues})
  },

  byKey: async id => {
      return await coll.findOne({_id: BSON.ObjectId(id)})
  },

  remove: async values => {
    console.log("delete: ", values)
    return await coll.deleteOne({_id: BSON.ObjectId(values)})
  }
});