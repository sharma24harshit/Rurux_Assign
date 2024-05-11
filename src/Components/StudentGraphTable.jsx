import React, { useEffect, useState } from 'react'
import { Chart } from 'primereact/chart';

const StudentGraphTable = ({MarksData}) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    console.log(MarksData);

    useEffect(() => {
        let marks=[]; let subjects=[];
        for(let i=0; i<MarksData.length; i++){
            subjects.push(MarksData[i].subject);
            marks.push(MarksData[i].marks);
        }
        const data = {
            labels:subjects,
            datasets: [
                {
                    data: marks,
                    backgroundColor: ["yellow","blue","green","orange","teal","voilet","red"],
                    hoverBackgroundColor:["yellow","blue","green","orange","teal","voilet","red"],
                    borderColor:["white","white","white","white"],
                    borderRadius: 5,
                    rotation: 160,
                    radius: 200,
                    hoverOffset: 18
                }
            ]
        };
        const options = {
            plugins: {                 // to dispaly the label name ,and to position them
                legend: {
                  display: true,
                  labels: {
                    color: '#495057',
                    font:25
                  },
                  
                  position: "top"
                },  },
            cutout: '60%',
            responsive:true
        };

        setChartData(data);
        setChartOptions(options);
    }, [MarksData]);

  return (
    <div className="card flex justify-content-center">
    <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
</div>
  )
}

export default StudentGraphTable