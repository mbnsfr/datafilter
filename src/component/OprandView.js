import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, Input, Select, Tree, } from 'antd';
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
    data,
    addOprand,
    changeOprand,
  } = oprandController(props);

  const {
    deleteOperand,
    fields,
    constraints,
    operandIndex,
    updatedata,
  } = props;

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
      <Button icon="close" onClick={() => deleteOperand(operandIndex)}></Button>
      <Button onClick={() => updatedata(data)}>on update</Button>
    </InputGroup>

  );

  console.log('index', operandIndex)

  return (
    <Tree
      defaultExpandAll={true}>
      {data &&
        <TreeNode title={<OprandBox addClouse={addClouse} />}>
          {data &&
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
                        operandIndex={index}
                        deleteOperand={deleteOperand}
                        updatedata={updatedata}
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
      }
    </Tree>
  );
};

OprandView.propTypes = {

  fields: PropTypes.object.isRequired,
  constraints: PropTypes.object.isRequired,
  operandIndex: PropTypes.object.isRequired,
  deleteOperand: PropTypes.func.isRequired,
  updatedata: PropTypes.func.isRequired,

};

export default OprandView;
