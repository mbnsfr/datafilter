import { withState, withHandlers, pipe, } from '../util';

const init = (props) => props.filterData;

const deleteOperand = ({ setData }) => (index) => {
  setData((d) => d.set('childs', d.childs.filter((value, i) => i !== index)));
}

const updatedata = ({ setData, data }) => (filterData) => {
  console.log('on update', data)
  setData(filterData)
}

const dataFilterController = pipe(
  withState(init),
  withHandlers({
    deleteOperand,
    updatedata,
  }),
);

export default dataFilterController;
