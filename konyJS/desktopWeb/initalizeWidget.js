function getBarKey(inData) {
	var months = kony.retailBanking.globalData.barGraphMonthData.getMonthsData().monthData;
	var selecetedMonth;
	for(var i=0;i<months.length;i++)
	{
		if(inData.value ===months[i].monthName)
		{
			selecetedMonth = months[i];
			break;
		}
	}
   if(selecetedMonth !== undefined)
    {
      navigateToSpendingDetails(selecetedMonth)
    }
}

function getLineKey(inData)
{
  //alert(inData);
}
function getPieKey(inData)
{
  //alert(inData);
}
function getAreaKey(inData)
{
//alert(inData);
}
function callBarChart(data)
{
  var responseLength = data.length; 
  var rows = [],colvalues = [];
  var barChartData  = data;
  var barMonthData =[];
  for(var i=0; i<responseLength; i++){
    var monthData ={};
    monthData.monthId = barChartData[i]["monthId"];
    monthData.monthName = barChartData[i]["monthName"];
    rows.push(barChartData[i]["monthName"]);
    colvalues.push(parseFloat(barChartData[i]["totalCashFlow"]));
    barMonthData.push(monthData);
  }
  kony.retailBanking.globalData.barGraphMonthData.setmonthsData(barMonthData);
  frmFMMAccountListKA.barchart.chartData={
    "rowNames" : {"values" : rows},
    "columnNames": {  "values": ["A"]  },
    "data": {
      "A": colvalues
    }
  };

  frmFMMAccountListKA.barchart.chartEvents={
    //"onTap": "onClickOfBar",
  }; 
 frmFMMAccountListKA.barchart.chartProperties = {
        "chartHeight": 300,
        "layerArea": {
            "background": {
                "color": ["white"],
            },
            "border": {
                "color": ["white"],
                "width": [3],
            }
        },
        "legend": {
            "font": {
                "size": [12],
                "family": ["Verdana"],
                "style": ["normal"],
                "color": ["0xaaaaaaff"]
            },
            "position": "bottom",
            "alignment": "left", //to be set
        },
        "axis": {
            "xAxis": {
                "title": {
                    "text": "",
                    "font": {
                        "size": [14],
                        "family": ["Verdana"],
                        "style": ["Bold"],
                        "color": ["black"]
                    },
                },
                "scale": {
                    "minValue": 0,
                    "maxValue": 500,
                },
                "axisLine": {
                    "line": {
                        "color": ["green"],
                    }
                },
                "labels": {
                    "orientationAngle": 30,
                    "font": {
                        "size": [12],
                        "family": ["Verdana"],
                        "style": ["bold"],
                        "color": ["0x000000ff"],
                        "transparency": [0]
                    }
                }
            },
            "yAxis": {
                "title": {
                    "text": "",
                    "font": {
                        "size": [16],
                        "family": ["Verdana"],
                        "style": ["normal"],
                        "color": ["black"]
                    },
                },
                //                         "scale": {
                //                               "minValue": 0,
                //                               "maxValue": 1000,
                //                           },
                "axisLine": {
                    "line": {
                        "color": ["green"],
                    },
                },
                "labels": {
                    "font": {
                        "size": [20],
                        "family": ["Verdana"],
                        "style": ["bold"],
                        "color": ["0x000000ff"],
                        "transparency": [10]
                    }
                }
            }
        },
        "grid": { // "type": ["xAxisMinorGrid", "yAxisMinorGrid"],
            "xAxisMinorGrid": {
                "line": {
                    "color": ["pink"]
					
                }
            }/* ,
            "yAxisMinorGrid": {
                "line": {
                    "color": ["pink"]
                }
            } */
        },
        "title": {
            "visible": false,
            "text": "",
            "font": {
                "size": ["0"],
                "family": ["Verdana"],
                "style": ["bold"],
                "color": ["0x000000ff"],
            },
            "position": "top",
        },
        "barChart": {
            "graphType": "normal",
            "animations": {
                "onInitAnimation": true,
            },
            "bar": {
                "color": ["#64A1D6"],
                "width": [80],
                "transparency": [80], //100 is dark
            },
            "border": {
                "visible": false,
                "line": {
                    "width": [2],
                    "tranparency": [54],
                    "color": ["#64A1D6"]
                }
            },
            "dataLabels": {
                "placement": "left",
				"separator" : "$",
                "font": {
                    "size": [14],
                    "family": ["Verdana"],
                    "style": ["bold"],
                    "color": ["black"],
                    "transparency": [54]
                },
            },
        }
    };


}
function callPieChart(data)
{
  var responseLength = data.length; 
  var rows = [],colvalues = [];
  var pieChartData  = data;
  for(var i=0; i<responseLength; i++){
    rows.push(pieChartData[i]["categoryName"]);
    colvalues.push(parseFloat(pieChartData[i]["cashSpent"]));
  }

  frmFMMSpendingKA.piechart.chartData = {
    "rowNames" : {"values" : rows},
    "columnNames": {  "values": ["A"]  },
    "data": {
      "A": colvalues,

    }
  };

  frmFMMSpendingKA.piechart.chartEvents={
    // "onTap": onTap,
  };

  frmFMMSpendingKA.piechart.chartProperties=
    {
    "chartHeight": 400,
    "layerArea": {
      "background": {
        "color": ["white"],
      },
      "border":{
        "color": ["white"], 
        "width": [4],
      }
    },

    "legend": {

      "font": {
        "size": [12],
        "family": ["Verdana"],
        "style": ["normal"],
        "color": ["0xaaaaaaff"]
      },
      "position": "right", 
      "alignment": "left",    //to be set

    },

    "title": {
      "visible": false,
      "text": "",
      "font": {
        "size": ["20"],
        "family": ["Verdana"],
        "style": ["bold"],
        "color": ["0x000000ff"],    
      },
      "position": "top",    

    },
    "pieChart" :{
      //"graphType": "normal",
      "startAngle": 0,

      "pieSlice":{

        "color":[
          "#F67B40","#C5C4C4","64A0D6","#FDC444","#AA78CE","#99D083","#3B6BBD","#D5B9E9"],

        // "transparency":[45],
      },
      "border": {
        "visible": true,
        "line": {
          "color": ["white"]
        }
      },
      "dataLabels": {
        "visible": true,
        "orientationAngle":0,
        "indicators":["percentValue"],
        "font": {
          "size": [14],
          "family": ["Verdana"],
          "style": ["bold"],
          "color": ["black"],
          "transparency": [54]    
        },

      },
    }
  };

}
function callLineChart() {
     var lMonth = kony.retailBanking.LAST_MONTH, cMonth = kony.retailBanking.THIS_MONTH;
    frmDashboardKA.linechart.chartData = {
        "rowNames": {"values": kony.retailBanking.DatesOfMonth},
                 "columnNames": {  "values": [lMonth, cMonth]  },
    "data": {
      [lMonth]: kony.retailBanking.closingValuesOfDate1,
      [cMonth]: kony.retailBanking.closingValuesOfDate2,
  }
    };
    frmDashboardKA.linechart.chartEvents = {
        // "onTap": onTap,
    };
    frmDashboardKA.linechart.chartProperties = {
        "chartHeight": 250,
        "chartWidth" : 200,
        "layerArea": {
            "background": {
                "color": ["transparent"],
            },
            "border": {
                "color": ["black"],
                "width": [0],
            }
        },
        "legend": {
            "font": {
                "size": [12],
                "family": ["Verdana"],
                "style": ["normal"],
                "color": ["0xaaaaaaff"]
            },
            "position": "top",
            "alignment": "center", //to be set
        },
        "axis": {
            "xAxis": {
                "visible":true,
                "title": {
                    "visible":true,
                    "text": "",
                    "font": {
                        "size": [14],
                        "family": ["Verdana"],
                        "style": ["Bold"],
                        "color": ["black"]
                    },
                },
                "scale": {
                    "minValue": 1,
                    "maxValue": 31,
                },
                "axisLine": {
                    "line": {
                        "color": ["white"],
                    }
                },
                "labels": {
                    "visible":false,
                    "orientationAngle": 30,
                    "font": {
                        "size": [12],
                        "family": ["Verdana"],
                        "style": ["bold"],
                        "color": ["0x000000ff"],
                        "transparency": [0]
                    }
                }
            },
            "yAxis": {
                "visible":true,
                "title": {
                    "visible":true,
                    "text": "",
                    "font": {
                        "size": [16],
                        "family": ["Verdana"],
                        "style": ["normal"],
                        "color": ["black"]
                    },
                },
                "scale": {
                    "minValue": 0,
                    "maxValue": 10000,
                },
                "axisLine": {
                    "line": {
                        "color": ["white"],
                    },
                },
                "labels": {
                    "visible":true,
                    "font": {
                        "size": [0],
                        "family": ["Verdana"],
                        "style": ["bold"],
                        "color": ["0x000000ff"],
                        "transparency": [10]
                    }
                }
            }
        },
        "grid": { // "type": ["xAxisMinorGrid", "yAxisMinorGrid"],
            "xAxisMinorGrid": {
                "line": {
                    "color": ["white"]
                }
            },
            "yAxisMinorGrid": {
                "line": {
                    "color": ["white"]
                }
            }
        },
        "title": {
            "visible": true,
            "text": "Your Monthly Spending",
            "font": {
                "size": ["20"],
                "family": ["Verdana"],
                "style": ["bold"],
                "color": ["#E0EEFF"],
            },
            "position": "top",
        },
        "lineChart": {
            "animations": {
                "onInitAnimation": true,
            },
            // "graphType": "normal",
            "line": {
                "color": ["#162785", "#E9AD00"],
                "width": [2],
            },
            "plotPoints": {
                "visible": false,
                "marker": {
                    "type": ["circle"],
                },
                "color": ["0x2a99ceff"],
                "size": [8],
            },
            "dataLabels": {
                "font": {
                    "size": [14],
                    "family": ["Verdana"],
                    "style": ["bold"],
                    "color": ["black"],
                    "transparency": [54]
                },
            },
        }
    };
}
function callAreaChart()
{
  frmDashboardKA.areachart.chartData={
    "rowNames": {"values":kony.retailBanking.DatesOfMonth },
             "columnNames": {  "values": ["A"]  },
             "data": {
                    "A": kony.retailBanking.closingValuesOfDate2
                    
                }
  };
  frmDashboardKA.areachart.chartProperties={
    
    "chartHeight": 250,
    "layerArea": {
                "background": {
                                "color": ["transparent"],
                              },
                  "border":{
                               "color": ["black"], 
                                "width": [0],
                           }
                 },

    "legend": {
                      
                         "font": {
                                "size": [0],
                                "family": ["Verdana"],
                                "style": ["normal"],
                                "color": ["black"]
                         },
                          "position": "bottom", 
                          "alignment": "left",    //to be set
                   
            },
          "axis": {
                      "xAxis": {
                        "visible":true,
                            "title": {
                              "visible":true,
                                "text": "",
                                "font": {
                                    "size": [16],
                                    "family": ["Verdana"],
                                    "style": ["normal"],
                                    "color": ["white"]
                                      },
                                },
                             "scale": {
                                    "minValue": 1,
                                    "maxValue": 31,
                                },
                            "axisLine": {
                                    "line": {
                                   "color": ["white"],}
                          
                             },
                              "labels": {
                                  "orientationAngle": 30,
                                      "font": {
                                          "size": [10],
                                          "family": ["Verdana"],
                                          "style": ["bold"],
                                          "color": ["0x000000ff"],
                                          "transparency": [56]
                                      }
                              }
                          },
                      "yAxis": {
                        "visible":true,
                             "title": {
                              "text": "",
                              "font": {
                                  "size": [16],
                                  "family": ["Verdana"],
                                  "style": ["normal"],
                                  "color": ["black"]
                              },
                             },
                        "scale": {
                              "minValue": 0,
                              "maxValue": 10000,
                          },
                           "axisLine": {
                                    "line": {
                                   "color": ["white"],},
                          
                        },
                              "labels": {
                                "visible":true,
                                      "font": {
                                          "size": [0],
                                          "family": ["Verdana"],
                                          "style": ["bold"],
                                          "color": ["0x000000ff"],
                                          "transparency": [10]
                                      }
                              }
                          }
                },
        "grid": {  // "type": ["xAxisMinorGrid", "yAxisMinorGrid"],
                      "xAxisMinorGrid": {
                        "visible": true,
                          "line": {
                              "color": ["white"]
                          }
                      },
                      "yAxisMinorGrid": {
                        "visible": true,
                          "line": {
                              "color": ["white"]
                          }
                      }
            },
        "title": {
                          "visible": true,
                          "text": "All Account Balances",
                          "font": {
                              "size": ["20"],
                              "family": ["Verdana"],
                              "style": ["bold"],
                              "color": ["0x000000ff"],    
                          },
                          "position": "top",    
                        
                },
    "areaChart" :{
              
                  "animations": {
                          "onInitAnimation": true,
                  },
               // "graphType": "normal",
                  "area": {
                            "color": ["#0F5FA6"],
                            "transparency": [60],
                  },
                     "line": {
                    "visible": true,
                    //"color": ["0x000000FF"],
                    "width": [3],
                    //"transparency": [70],
                },
                  "plotPoints": {
                              "visible": false,
                             "marker": {
                                "type": ["circle"],
                              },
                              "color": ["0x2a99ceff"],
                              "size": [8],
                  },
                  "dataLabels": {
                                  "visible":false,
                                    "font": {
                                      "size": [14],
                                      "family": ["Verdana"],
                                      "style": ["bold"],
                                      "color": ["black"],
                                      "transparency": [54]    
                                    },
                  },
      }
        };
  frmDashboardKA.areachart.chartEvents={
      // "onTap": onTap,
                                                };
}