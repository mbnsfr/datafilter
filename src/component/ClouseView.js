import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Input, DatePicker, Select, Switch,
} from 'antd';
import clouseController from '../controller/clouseController';
import moment from 'moment'

const InputGroup = Input.Group;
const { Option } = Select;

const generateFieldOptions = (fields) => {
  const fieldNames = Array.from(fields.keys());
  return fieldNames.map((item, index) => (
    <Option
      key={index}
      value={item}
    >
      {item.toUpperCase()}
    </Option>
  ));
};

const generateConstraintOptions = (constraints, fields, fieldName) => {
  const fieldType = fields.get(fieldName);
  const constrains = Array.from(constraints.get(fieldType));
  return constrains.map((item, index) => (
    <Option
      key={index}
      value={item}
    >
      {item.toUpperCase()}
    </Option>
  ));
};

const ClouseView = (props) => {

  const {
    deleteClouse,
    queryIndex,
    fields,
    query,
    constraints,
  } = props;

  const {
    setFieldName,
    data,
    setConstraint,
    setFieldValue,
  } = clouseController(props);

  const generateInputByType = (fieldType) => {
    switch (fieldType) {
      case 'string':
        return (
          <Input
            value={String(query.toJSON().where[data.fieldName]) || null}
            style={{ width: '20vw' }}
            placeholder="String"
            onChange={(e) => setFieldValue(e.target.value)}
          />
        );
      case 'time':
        return (
          <DatePicker
            defaultValue={moment(String(query.toJSON().where[data.fieldName]), "YYYYMMDD") || null}
            style={{ width: '10vw' }}
            onChange={(date, dateString) => setFieldValue(dateString)}
          />
        );
      case 'number':
        return (
          <Input
            value={String(query.toJSON().where[data.fieldName]) || null}
            style={{ width: '10vw' }}
            placeholder="Number"
            type="number"
            onChange={(e) => setFieldValue(Number(e.target.value))}
          />
        );
      case 'boolean':
        return (
          <Switch
            checked={Boolean(query.toJSON().where[data.fieldName]) || false}
            style={{ marginLeft: '10px' }}
            onChange={(e) => setFieldValue(e)}
          />
        );

      default:
        return <Input style={{ width: '10vw' }} disabled />;
    }
  };

  return (
    <InputGroup compact>

      <span>

        <Select
          defaultValue="FieldName"
          onChange={(value) => setFieldName(value)}
          style={{ width: '10vw' }}
        >
          {generateFieldOptions(fields)}
        </Select>
        <Select
          defaultValue="EqualTo"
          onChange={(value) => setConstraint(value)}
          style={{ width: '10vw' }}
        >
          {generateConstraintOptions(constraints, fields, data.fieldName)}
        </Select>
        {generateInputByType(fields.get(data.fieldName))}
        <Button icon="close" onClick={() => deleteClouse(queryIndex)} />

      </span>
    </InputGroup>
  );
};

ClouseView.propTypes = {
  deleteClouse: PropTypes.func.isRequired,
  queryIndex: PropTypes.number.isRequired,
  fields: PropTypes.object.isRequired,
  constraints: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired
};

export default ClouseView;
