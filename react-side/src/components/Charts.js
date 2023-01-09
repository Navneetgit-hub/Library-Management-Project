import React, {useState, useEffect}  from "react";
import AdminNav from "./AdminNav";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function Charts() {
    const [bookname, Setbookname] = useState([]);
    const [count, SetCount] = useState([]);
    const url = "http://localhost:5000/issue-count";
    var books = [];
    var borrow = [];

    const fetchBooks = () => {
        return fetch(url)
          .then((response) => response.json())
          .then((data) => {Setbookname(data);
            console.log(data)
        });
        
      };
    
    if(bookname && bookname.length>0){
        bookname.map((obj, index)=>{
            books.push(obj.bname)
            borrow.push(parseInt(obj.count))
        })
    }
    console.log("borrow",typeof(borrow[0]),borrow)

    useEffect(()=>{
        fetchBooks();
    }, [])

  const options = {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Top Book Issued'
    },
    subtitle: {
     
    },
    xAxis: {
        categories: books,
        title: {
            text: "Book Name"
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'No. of Issue'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' times'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Borrowed',
        data: borrow
    }]
  }

  return (
    <div>
        <AdminNav/>
      <HighchartsReact highcharts={Highcharts} options={options} />
      
    </div>
  );
}

export default Charts;
