import ReactECharts from 'echarts-for-react';
import React from 'react';
import './Echarts.css'

import data from './wine-data-set.json';

let scatterData = [];
let barData = [];

let malicAcid1 = 0;
let malicAcid2 = 0;
let malicAcid3 = 0;

let cnt1=0;
let cnt2=0;
let cnt3=0;

data.map(d =>{
    let c = d["Color intensity"];
    let h = d["Hue"];

    scatterData.push([c,h]);

    if(d['Alcohol'] === 1){
        malicAcid1 += d['Malic Acid'];
        cnt1 += 1;
    }
    else if(d['Alcohol'] === 2){
        malicAcid2 += d['Malic Acid'];
        cnt2 += 1;
    }
    else{
        malicAcid3 += d['Malic Acid'];
        cnt3 += 1;
    }

    return 0;
})

malicAcid1 = malicAcid1 / cnt1 ;
malicAcid2 = malicAcid2 / cnt2 ;
malicAcid3 = malicAcid3 / cnt3 ;



const Page: React.FC = () => { 

  const options1 = {
    xAxis: [
        {
            name: 'Colour Intesity',
            nameLocation: 'middle',
            nameGap: 50
          }
        ],
    yAxis: [
        {
            name: 'Hue',
            nameLocation: 'middle',
            nameGap: 50
          }
        ],
    series: [
      {
        symbolSize: 8,
        data: scatterData,
        type :'scatter'
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  const options2 = {
    
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        name: 'Alchol',
        nameLocation: 'middle',
        nameGap: 25,
        type: 'category',
        data: ['1','2','3'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Average of Malic Acid',
        nameLocation: 'middle',
        nameGap: 50
        
      }
    ],
    series: [
      {
        name: 'Direct',
        type: 'bar',
        barWidth: '20%',
        data: [malicAcid1,malicAcid2,malicAcid3]
      }
    ]
  };

  return <div className="scatter-div">
            <ReactECharts   option={options1} style={{
                  height: '600px',
                  width: '100%',
                }}/>

            <div style={{height : '100px'}}>  
            </div>

            <ReactECharts   option={options2} style={{
                  height: '600px',
                  width: '%',
                }}/>

            <div style={{height : '100px'}}>  
            </div>

        </div>;
};

export default Page;