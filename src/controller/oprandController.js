import Parse from 'parse';
import { Record } from 'immutable';
import { withState, withHandlers, pipe, withLifecycle } from '../util';

const ClouseQuery = Parse.Object.extend('ClouseQuery');

const init = Record({ op: 'and', childs: [] })()

const addClouse = ({ setData }) => () => {
  const query = new Parse.Query(ClouseQuery);
  setData((d) => d.set('childs', d.childs.concat(query)));
};

const addOprand = ({ setData }) => () => {
  setData((d) => d.set('childs', d.childs.concat(Record({ op: 'and', childs: [] })())));
};

const changeOprand = ({ setData }) => (oprand) => {
  setData((d) => d.set('op', oprand));
};

const deleteClouse = ({ setData }) => (index) => {
  setData((d) => d.set('childs', d.childs.filter((value, i) => i !== index)));
};

const onUpdate = props => {
  if (props) {
    props.updatedata(props.data)
  }
};

const oprandController = pipe(
  withState(init),
  withHandlers({
    addClouse,
    deleteClouse,
    addOprand,
    changeOprand,
  }),
  withLifecycle({
    onUpdate,
  }),
);

export default oprandController;
