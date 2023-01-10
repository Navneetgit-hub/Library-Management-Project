import React, { useState, useEffect } from "react";
import AdminNav from "./AdminNav";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function Charts() {
  const [bookname, Setbookname] = useState([]);
  const [quantity, setquantity] = useState([]);
  const [count, SetCount] = useState([]);
  const url = "http://localhost:5000/issue-count";
  const url1 = "http://localhost:5000/get-books";
  var books = [];
  var borrow = [];

  var seriesarray = [];

  if (quantity && quantity.length > 0) {
    for(let i=0; i<quantity.length; i++){
        let data = [];
        let object = {};
        // console.log(quantity[i].bname)
        object["name"] = quantity[i].bname
        data.push(quantity[i].intquantity)
        data.push(quantity[i].quantity)
        object["data"] = data
        // console.log(object)
        seriesarray.push(object)
    }
  }

  console.log("series", seriesarray)

  const fetchBooks = () => {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        Setbookname(data);
      });
  };

  const fetchBooks1 = () => {
    return fetch(url1)
      .then((response) => response.json())
      .then((data) => {
        setquantity(data);
      });
  };

  if (bookname && bookname.length > 0) {
    bookname.map((obj, index) => {
      books.push(obj.bname);
      borrow.push(parseInt(obj.count));
    });
  }


  useEffect(() => {
    fetchBooks();
    fetchBooks1()
  }, []);

  const options = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Top Book Issued",
    },
    subtitle: {},
    xAxis: {
      categories: books,
      title: {
        text: "Book Name",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "No. of Issue",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valueSuffix: " times",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Borrowed",
        data: borrow,
      },
    ],
  };
  var options2;
  options2 = {
    title: {
      text: "Book Quantity Change",
      align: "center",
    },

    subtitle: {

    },

    yAxis: {
      title: {
        text: "Number of Employees",
      },
    },

    xAxis: {
      accessibility: {
        rangeDescription: "Range: 2010 to 2020",
      },
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 2010,
      },
    },
    
    series: seriesarray,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };


  return (
    <div>
      <AdminNav />
      <HighchartsReact highcharts={Highcharts} options={options} />
      <HighchartsReact highcharts={Highcharts} options={options2} />
    </div>
  );
}

export default Charts;
