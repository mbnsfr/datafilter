import React from 'react';
import { Map, Record } from 'immutable';
import DataFilterView from '../src/component/DataFilterView';
import 'antd/dist/antd.css'
import ClouseView from '../src/component/ClouseView'
import Parse from 'parse';
import OprandView from '../src/component/OprandView'
export default {
  title: 'datafilter',
};

const fields = Map({
  name: 'string',
  id: 'number',
  date: 'time',
  boolean: 'boolean',
});

const constraints = Map({
  string: [
    'Contains',
    'StartsWith',
    'EndsWith',
    'EqualTo',
    'NotEqualTo',
    'GreaterThan',
    'LessThan',
    'GreaterThanOrEqualTo',
    'LessThanOrEqualTo',
    'IsEmpty',
    'NotIsEmpty',
    'IsNull',
    'NotIsNull',
  ],
  number: [
    'EqualTo',
    'NotEqualTo',
    'GreaterThan',
    'LessThan',
    'GreaterThanOrEqualTo',
    'LessThanOrEqualTo',
    'IsNull',
    'NotIsNull',
  ],
  time: [
    'EqualTo',
    'NotEqualTo',
    'GreaterThan',
    'LessThan',
    'GreaterThanOrEqualTo',
    'LessThanOrEqualTo',
    'IsNull',
    'NotIsNull',
  ],
  boolean: [],
  default: [
    'EqualTo',
    'NotEqualTo',
    'GreaterThan',
    'LessThan',
    'GreaterThanOrEqualTo',
    'LessThanOrEqualTo',
    'IsNull',
    'NotIsNull',
  ],

});

const filterData = Record({ op: 'and', childs: [] })();


export const DataFilter = () => (
  <DataFilterView
    filterData={filterData}
    constraints={constraints}
    fields={fields}
  />);


const ClouseQuery = Parse.Object.extend('ClouseQuery');
const query = new Parse.Query(ClouseQuery);

export const Clouse = () => (
  <ClouseView
    queryIndex={1}
    query={query}
    fields={fields}
    constraints={constraints}
  />);

export const Operand = () => (
  <OprandView
    filterData={Record({ op: 'and', childs: [] })()}
    constraints={constraints}
    fields={fields}
  />)