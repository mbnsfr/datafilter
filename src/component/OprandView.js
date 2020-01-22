import React from 'react';
import PropTypes from 'prop-types';
import {
  Icon, Button, Input, Select, Tree,
} from 'antd';
import oprandController from '../controller/oprandController';
import ClouseView from './ClouseView';
import filterIcon from '../svg/filter-icon';

const InputGroup = Input.Group;
const { Option } = Select;
const { TreeNode } = Tree;

const OprandView = (props) => {
  const {
    addClouse,
    deleteClouse,
    changeOprand,
    addOprand,
    data,
  } = oprandController(props);
  const { fields, constraints } = props;
  const OprandBox = () => (
    <InputGroup compact>
      <Select defaultValue={data.op} onChange={(value) => changeOprand(value)}>
        <Option value="and">And</Option>
        <Option value="or">Or</Option>
      </Select>
      <Button icon="plus" onClick={() => addClouse()} />
      <Button onClick={() => addOprand()}>
        <Icon component={filterIcon} />
      </Button>
    </InputGroup>
  );

  return (
    <Tree>
      <TreeNode title={<OprandBox addClouse={addClouse} />}>v
        {
          data.childs.map((item, index) => {
            if (item.op && (item.childs.length >= 0)) {
              return (
                <TreeNode
                  key={index}
                  title={(
                    <OprandView
                      filterData={item}
                      constraints={props.constraints}
                      fields={props.fields}
                    />
                  )}
                />
              );
            }

            if (item) {
              return (
                <TreeNode
                  key={index}
                  title={(
                    <ClouseView
                      deleteClouse={deleteClouse}
                      queryIndex={index}
                      query={item}
                      fields={fields}
                      constraints={constraints}
                    />
                  )}
                />
              );
            }
          })
        }
      </TreeNode>
    </Tree>
  );
};

OprandView.propTypes = {
  fields: PropTypes.object.isRequired,
  constraints: PropTypes.object.isRequired,
};

export default OprandView;
