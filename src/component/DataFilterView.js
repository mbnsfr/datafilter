import React from 'react';
import PropTypes from 'prop-types';
import OprandView from './OprandView';
import dataFilterController from '../controller/dataFilterController'

const DataFilterView = (props) => {

  const {
    filterData,
    constraints,
    fields,
  } = props;

  const {
    deleteOperand,
    updatedata,
  } = dataFilterController(props);

  const filtergenerator = () => {
    if (filterData.op) {
      return (
        <OprandView
          updatedata={updatedata}
          deleteOperand={deleteOperand}
          filterData={filterData}
          constraints={constraints}
          fields={fields}
        />
      );
    }
  };

  return (filtergenerator());

};

DataFilterView.propTypes = {

  filterData: PropTypes.object.isRequired,
  constraints: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  deleteOperand: PropTypes.func.isRequired,
  updatedata: PropTypes.func.isRequired,

};

export default DataFilterView;
