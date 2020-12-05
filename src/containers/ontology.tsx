import React from 'react';
import ReactFlow, { ArrowHeadType } from 'react-flow-renderer';
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as XLSX from "xlsx";

const elements = [
    { id: '1', data: { label: 'Node 1' }, position: { x: 225, y: 5 } },
    { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
    { id: 'e1-2', source: '1', target: '2', animated: true },
  ];
const graphStyles = { width: '100%', height: '1000px' };
const BasicGraph = () => <ReactFlow elements={elements} style={graphStyles} />;



export default class Ontology extends React.Component {
  state = {
    values: []
  }

  download() {
  // axios.get("http://localhost:2020/api/auth/edge/findAll")
   //   .then(res => {
       
    const edges =JSON.parse(localStorage.getItem("ontologies") as string );
    console.log(edges);
    if(edges!=null)
    {
      
     
       const filename="download.csv";
        const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
        const header = Object.keys(edges[0])
        let csv = edges.map(row => header.map(fieldName => 
        JSON.stringify(row[fieldName], replacer)).join(','))
        csv.unshift(header.join(','))
        csv = csv.join('\r\n')
      
        // Create link and download
        var link = document.createElement('a');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv));
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        }
        //});
  }
  componentDidMount() {
   // axios.get("http://localhost:2020/api/auth/edge/findAll")
     // .then(res => {
        
        const edges =JSON.parse(localStorage.getItem("ontologies") as string );
        console.log(edges);
        if(edges!=null)
        {
        
        const nodes = [] as  any;
        let direction = 20;
        for (let i = 0; i < edges.length; i++) {


            const fromNode = {
                id: edges[i].fromNode.id.toString(),
                data: { label: edges[i].fromNode.name},
                position: { x: 250, y: 250 } 
            }

            if (!nodes.some(item => fromNode.id === item.id)) {
                nodes.push(fromNode);
            }
            
            const toNode = {
                id: edges[i].toNode.id.toString(),
                data: { label: edges[i].toNode. name},
                position: { x: 250, y: 250 } 
            }
            

            if (!nodes.some(item => toNode.id === item.id)) {
                nodes.push(toNode);
            }
           
            nodes.push({
                id: edges[i].fromNode.id.toString() + '_' + edges[i].toNode.id.toString(),
                source: edges[i].fromNode.id,
                target: edges[i].toNode.id,
                animated: false,
                label: edges[i].edgeCategory,
                arrowHeadType: ArrowHeadType.ArrowClosed
            });
           
        }

        console.log(nodes)

        for (let j = 0; j < nodes.length; j++) {

            let model = nodes[j];
            if(!model.id.includes('_')) {
                direction += 100;
                model.position.x = direction;
                model.position.y = direction;
            }
            
        }

        this.setState({values : nodes});
        console.log(this.state.values)
        console.log(nodes);
    }
      //})
  }

  render() {
    return (
        <div>
        <button onClick={e=>this.download()}>DOWNLOAD</button>
        <ReactFlow elements={this.state.values} style={graphStyles} />
       
         
        </div>
    )
  }
}