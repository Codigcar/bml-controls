import React from "react";
import { NextPage } from "next";
import { Layout } from "../../components/layouts";
import { GetServerSideProps } from "next";
import { fetchCustom } from "../../utils/fetchCustom";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,

  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Radar, Bar } from "react-chartjs-2";
import { IRecords } from '../../interfaces/IRecords';
// import BarChart from "../../components/ui/BarChart";
import dynamic from 'next/dynamic'
import CanvasJSReact from "../../components/js/canvasjs.react";
import { CCollapse } from "../../components/ui";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,

  CategoryScale,
  LinearScale,
  BarElement,
  Title,
);

interface Props {
    records: IRecords[];
}


const graphics: NextPage<Props> = ({ records }) => {

 const poligono = (subcategoriesList:any) => {

    let labelsList:any = [];
    let dataList:any = [];

    subcategoriesList.map((subcategory:any) => {
         labelsList.push(subcategory.name);
         dataList.push(subcategory.average)
    });
    
    let RadarData = {
        labels: labelsList,
        datasets: [
          {
            label: "Valores",
            backgroundColor: "rgba(242, 153, 74, .2)",
            borderColor: "rgba(242, 153, 74, 1)",
            
            pointBackgroundColor: "rgba(242, 153, 74, 1)",
            poingBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(242, 153, 74, 1)",

            data: dataList,
          },
        ],
      };

    const options = {
        plugins: {
            legend:{
                display:false
            }
        },
        // scale: {
        //     pointLabels: {
        //         fontSize: 20
        //     }
        // }
    }

     return (
        <div style={{  backgroundColor:'white',/*  padding:30, */ borderRadius:20 }}>
            <Radar data={RadarData} options={options}  />
        </div>
     )
 }

 const bar = (controlList:any, nameControl:string) => {

    let labels:any = [];
    let valueList:any = [];

    let dataPoints:any = [];

    controlList.map((control:any) => {
            labels.push(control.name);
            valueList.push(control.value);
            dataPoints.push({y:control.value, label:control.name})
    })

    // console.log({dataPoints});
    



    const options = {
        indexAxis: 'y' as const,
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'right' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Horizontal Bar Chart',
            },
        },
        layout: {
            padding: {
                // left: 150,
                // right: 50,
                // top: 50,
                // bottom: 50
            }
        },
        // scales: {
        //     yAxes: [{
        //       afterFit: function(scaleInstance:any) {
        //         scaleInstance.width = 400; // sets the width to 100px
        //       }
        //     }]
        //   }
    };

    // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


    const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: labels.map((data:any,i:number)=> valueList[i]),
            borderColor: 'rgb(153, 239, 208)',
            backgroundColor: 'rgba(153, 239, 208, 0.5)',
          },
        ],
      };

      // <div style={{backgroundColor:'white', marginTop:20, borderRadius:20, padding: 20}} >
      //     <Bar options={options} data={data} height={200} />
      // </div>
      return (
        <div style={{backgroundColor:'white', marginTop:20, borderRadius:20, padding: 40}} >
        <DynamicComponentWithNoSSR dataPoints={dataPoints} nameControl={nameControl} />
        </div>
      )
     
 }


  return (
    <Layout>
      <>
        <div>
         {
           records.length != 0 ?
            (records.map((record, index) => (
                    <div key={index}>
                        <CCollapse record={record} />
                    </div>
                )))
                : (
                    <h3>¡Realiza tu primer control BML! ...</h3>
                )
          }
        </div>
      </>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time



const DynamicComponentWithNoSSR = dynamic(
  () => import('../../components/ui/BarChart'),
  { ssr: false }
)

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // const { data } = await  // your fetch function here
  // console.log({ctx});
  // console.log(ctx.params);

  const { id } = params as { id: string };

  const records = await fetchCustom(`/records/by-user/${id}`);

  if (!graphics) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
        records,
    },
  };
};

export default graphics;



// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// var CanvasJS = CanvasJSReact.CanvasJS;
 
// class BarChart extends Component {
// 	addSymbols(e:any){
// 		var suffixes = ["", "K", "M", "B"];
// 		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
// 		if(order > suffixes.length - 1)
// 			order = suffixes.length - 1;
// 		var suffix = suffixes[order];
// 		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
// 	}
// 	render() {
// 		const options = {
// 			animationEnabled: true,
// 			theme: "light2",
// 			title:{
// 				text: "Most Popular Social Networking Sites"
// 			},
// 			axisX: {
// 				title: "Social Network",
// 				reversed: true,
// 			},
// 			axisY: {
// 				title: "Monthly Active Users",
// 				labelFormatter: this.addSymbols
// 			},
// 			data: [{
// 				type: "bar",
// 				dataPoints: [
// 					{ y:  2200000000, label: "Monitoreo de operaciones para detectar comportamientos y patrones de fraude en transacciones del usuario." },
// 					{ y:  1800000000, label: "Aplicación de criptografía robusta para la generación y almacenamiento de códigos de transacciones únicas." },
// 					{ y:  800000000, label: "Solicitud de documento oficial de identidad al usuario en transacciones físicas de alto riesgo de fraude." },
// 					{ y:  563000000, label: "Monitoreo de operaciones para detectar comportamientos y patrones de fraude en transacciones del usuario." },
// 					{ y:  376000000, label: "Monitoreo de operaciones para detectar comportamientos y patrones de fraude en transacciones del usuario." },
// 					{ y:  336000000, label: "Monitoreo de operaciones para detectar comportamientos y patrones de fraude en transacciones del usuario." },
// 					{ y:  330000000, label: "Monitoreo de operaciones para detectar comportamientos y patrones de fraude en transacciones del usuario." }
// 				]
// 			}]
// 		}
		
// 		return (
// 		<div>
// 			<h1>React Bar Chart</h1>
// 			<CanvasJSChart options = {options} 
// 				/* onRef={ref => this.chart = ref} */
// 			/>
// 			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
// 		</div>
// 		);
// 	}
// }

// export default BarChart;