import React from "react";
import { Panel } from "reactflow";
import './InputPanel.css';

const InputPanel = (props) => {
  return (
    <div className="input-panel">
    <form onSubmit={props.addNodeAndEdge}>
      <Panel position="top-right">
        <input
          type="text" placeholder="Enter new member name"
          value={props.newNodeName}
          onChange={props.textChange}
        />
        <div>
        <input
          type="text" placeholder="Enter name of the parent"
          value={props.sourceNode}
          onChange={props.sourceChange}
        />
        </div>
        <input
          type="text" placeholder="Enter name of the child"
          value={props.targetNode}
          onChange={props.targetChange}
        />
        <button type="submit">Add Node</button>
      </Panel>
    </form>
    </div>
  );
};

export default InputPanel;
