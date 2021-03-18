
import PaletteMaker from "./coloursGenerator.js";

const simpleScatterData=(data,
  
  xaxis,
  yaxis) =>{
  
  let graphData=[]

  data.map ( (row)=>{
  
  graphData.push({x:row[xaxis], y:row[yaxis]})

  })

  return graphData

  }


export default function ScatterChart(
  data,
  
  xaxis,
  yaxis,
  colourColumn
) {
  
  let labels=""
  let datasets=[]
  if(!colourColumn){
  
  datasets =[ {label: labels, data: simpleScatterData(data,xaxis,yaxis) , backgroundColor: '#567de8' }]
  }



  return { datasets: datasets };
}
