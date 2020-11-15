import React, { useState, useEffect } from "react";
import ReactFlow, { removeElements, addEdge } from "react-flow-renderer";
import TriggerNode from "./TriggerNode";
import { v4 as uuidv4 } from "uuid";
import { doc } from "prettier";

const nodeTypes = {
  triggerNode: TriggerNode,
};

const initialElements = [
  {
    id: "1",
    type: "input",
    data: { label: "Start" },
    position: { x: null, y: null },
    initDraggable: 'can-drag-through-flow-library', // Since its been already set
    fixCoordinates: false,
  },
];
let lastAddedEl;
const FlowChart = () => {
  const [elements, setElements] = useState(initialElements);
  useEffect(()=> {
    lastAddedEl = elements[elements.length - 1];
      window.addEventListener('mousemove', mousemove)
      window.addEventListener('mouseup', mouseup);
  },[elements])


  const mousemove = (e) => {
    let allElements = document.querySelectorAll('.react-flow__node')
    let draggableElement = allElements[allElements.length -1 ]
    draggableElement.style.position = 'absolute';
    console.log('DIR X ' , e.offsetX)
    console.log('DIR Y ' , e.offsetY)
    if(lastAddedEl.fixCoordinates === true) {
      // Something weird with dimensions 
      draggableElement.style.left = e.offsetX-500+ 'px';
      draggableElement.style.top = e.offsetY -500 +  'px';
    }
    else {
      draggableElement.style.left = e.offsetX+5+ 'px';
      draggableElement.style.top = e.offsetY + 'px';
    }
  }
  const mouseup = () => {
    console.log('remove mousemove')
    lastAddedEl.initDraggable = 'can-drag-through-flow-library';
    window.removeEventListener('mousemove', mousemove)
  }

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onNodeDragStart = (event, node) => {
    console.log("drag start", node);
  };
  // const onNodeDragStart = (event, node) => console.log("drag start", node);
  return (
    <div 
    className = "action-button-start"
    style={{ height: "100vh", backgroundColor: "red", margin: "0" }}>
      {/*<div>*/}
      {/*  <button*/}
      {/*    onMouseDown={() => {*/}
      {/*      // console.log(e.offsetX);*/}
      {/*      setElements([*/}
      {/*        ...elements,*/}
      {/*        {*/}
      {/*          id: uuidv4(),*/}
      {/*          type: "input",*/}
      {/*          data: { label: "Start" },*/}
      {/*          position: { x: 500, y: 250 },*/}
      {/*        },*/}
      {/*        // start[0].position.x = e.offsetX;*/}
      {/*        // start[0].position.y = e.offsetY;*/}
      {/*      ]);*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    Start*/}
      {/*  </button>*/}
      {/*</div>*/}

      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        deleteKeyCode={46}
        nodeTypes={nodeTypes}
        paneMoveable={false}
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        panOnScroll={false}
        onNodeDragStart={onNodeDragStart}
      >
        <div style={{ position: "absolute", left: 600, top: 500, zIndex: 4 }}>
          <div style = {{backgroundColor:"black"}}>
            <button
              onMouseDown={(e) => {
               console.log(e.clientX);
                console.log(e.clientY);
                console.log(elements);
                setElements([
                  ...elements,
                  {
                    id: uuidv4(),
                    type: "input",
                    data: { label: "Start" },
                    position: { x: e.clientX - 80, y: e.clientY - 35 },
                    initDraggable: 'can-drag-initially',
                    fixCoordinates: true // needs adjusting 
                  },
                ]);

                window.addEventListener('mousemove', mousemove);
              }}
            >
              Start
            </button>
          </div>

          {/*<div>*/}
          {/*  <button*/}
          {/*    onMouseDown={() => {*/}
          {/*      setElements([*/}
          {/*        ...elements,*/}
          {/*        {*/}
          {/*          id: uuidv4(),*/}
          {/*          data: { label: <div>Email</div> },*/}
          {/*          position: { x: 300, y: 125 },*/}
          {/*        },*/}
          {/*      ]);*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    Email*/}
          {/*  </button>*/}
          {/*</div>*/}

          {/*<div>*/}
          {/*  <button*/}
          {/*    onMouseDown={() => {*/}
          {/*      setElements([*/}
          {/*        ...elements,*/}
          {/*        {*/}
          {/*          id: uuidv4(),*/}
          {/*          data: { label: <div>Delay</div> },*/}
          {/*          position: { x: 100, y: 125 },*/}
          {/*        },*/}
          {/*      ]);*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    Delay*/}
          {/*  </button>*/}
          {/*</div>*/}

          {/*<div>*/}
          {/*  <button*/}
          {/*    onMouseDown={() => {*/}
          {/*      setElements([*/}
          {/*        ...elements,*/}
          {/*        {*/}
          {/*          id: uuidv4(),*/}
          {/*          type: "triggerNode",*/}
          {/*          position: { x: 150, y: 200 },*/}
          {/*          style: { border: "1px solid #777", padding: 20 },*/}
          {/*        },*/}
          {/*      ]);*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    Trigger*/}
          {/*  </button>*/}
          {/*</div>*/}

          {/*<div>*/}
          {/*  <button*/}
          {/*    onMouseDown={() => {*/}
          {/*      setElements([*/}
          {/*        ...elements,*/}
          {/*        {*/}
          {/*          id: uuidv4(),*/}
          {/*          type: "output",*/}
          {/*          data: { label: "Goal" },*/}
          {/*          position: { x: 250, y: 300 },*/}
          {/*        },*/}
          {/*      ]);*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    Goal*/}
          {/*  </button>*/}
          {/*</div>*/}
        </div>
      </ReactFlow>
    </div>
  );
};

export default FlowChart;
