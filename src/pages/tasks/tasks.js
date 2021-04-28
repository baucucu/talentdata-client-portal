import React from 'react';
import 'devextreme/data/odata/store';
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Lookup,
} from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import mongodb from '../../api/mongodb';


export default () => (
  <React.Fragment>
    <h2 className={'content-block'}>Tasks</h2>

    <DataGrid
      className={'dx-card wide-card'}
      dataSource={store}
      showBorders={false}
      focusedRowEnabled={true}
      defaultFocusedRowIndex={0}
      columnAutoWidth={true}
      columnHidingEnabled={true}
    >
      <Paging defaultPageSize={10} />
      <Pager showPageSizeSelector={true} showInfo={true} />
      <FilterRow visible={true} />

      <Column dataField={'Name'} hidingPriority={2} />

      {/* <Column dataField={'Task_ID'} width={90} hidingPriority={2} />
      <Column
        dataField={'Task_Subject'}
        width={190}
        caption={'Subject'}
        hidingPriority={8}
      />
      <Column
        dataField={'Task_Status'}
        caption={'Status'}
        hidingPriority={6}
      />
      <Column
        dataField={'Task_Priority'}
        caption={'Priority'}
        hidingPriority={5}
      >
        <Lookup
          dataSource={priorities}
          valueExpr={'value'}
          displayExpr={'name'}
        />
      </Column>
      <Column
        dataField={'ResponsibleEmployee.Employee_Full_Name'}
        caption={'Assigned To'}
        allowSorting={false}
        hidingPriority={7}
      />
      <Column
        dataField={'Task_Start_Date'}
        caption={'Start Date'}
        dataType={'date'}
        hidingPriority={3}
      />
      <Column
        dataField={'Task_Due_Date'}
        caption={'Due Date'}
        dataType={'date'}
        hidingPriority={4}
      />
      <Column
        dataField={'Task_Priority'}
        caption={'Priority'}
        name={'Priority'}
        hidingPriority={1}
      />
      <Column
        dataField={'Task_Completion'}
        caption={'Completion'}
        hidingPriority={0}
      /> */}
    </DataGrid>
  </React.Fragment>
);

// const dataSource = {
//   store: {
//     type: 'odata',
//     key: 'Task_ID',
//     url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks'
//   },
//   expand: 'ResponsibleEmployee',
//   select: [
//     'Task_ID',
//     'Task_Subject',
//     'Task_Start_Date',
//     'Task_Due_Date',
//     'Task_Status',
//     'Task_Priority',
//     'Task_Completion',
//     'ResponsibleEmployee/Employee_Full_Name'
//   ]
// };

const db = mongodb.db("candidates")
const coll = db.collection("garrett_it")

const store = new CustomStore({
 
  load: async function() {
    let records = await coll.find()
    return records
  },

  // byKey: function(key) {
  //     return $.getJSON(SERVICE_URL + "/" + encodeURIComponent(key));
  // },

  // insert: function(values) {
  //     return $.post(SERVICE_URL, values);
  // },

  // update: function(key, values) {
  //     return $.ajax({
  //         url: SERVICE_URL + "/" + encodeURIComponent(key),
  //         method: "PUT",
  //         data: values
  //     });
  // },

  // remove: function(key) {
  //     return $.ajax({
  //         url: SERVICE_URL + "/" + encodeURIComponent(key),
  //         method: "DELETE",
  //     });
  // }

});

const priorities = [
  { name: 'High', value: 4 },
  { name: 'Urgent', value: 3 },
  { name: 'Normal', value: 2 },
  { name: 'Low', value: 1 }
];
