import GroupBy from "./groupBy.js";

import PaletteMaker from "./coloursGenerator.js";

const simpleBubble=(data,
  
  xaxis,
  yaxis,
  sizeColumn,
  meanSize) =>{
  
  let graphData=[]
  
  data.map ( (row)=>{
  
  let bubbleSize=sizeColumn? row[sizeColumn]*10/meanSize : 10



  graphData.push({x:row[xaxis], y:row[yaxis], r:bubbleSize})

  })

  return graphData

  }

const meanColumnAdjustment =(data, column)=>{

let sum=0;

data.map((row, i)=>{


if(row[column]){

sum+= row[column]
}
}
)

return (sum/data.length)
}

export default function BubbleChart(
  data,
   xaxis,
  yaxis,
  yaxisModification,
  colourColumn,
  sizeColumn
) {
  

  const meanValue=sizeColumn? meanColumnAdjustment (data, sizeColumn):null

 let graphData= simpleBubble(data,xaxis,
  yaxis,
  sizeColumn,
 meanValue)

let datasets =[ {label: xaxis, data: graphData ,backgroundColor:"#ff6384",
        hoverBackgroundColor: "#ff6384"}]
  


  
  return {datasets: datasets };
}
