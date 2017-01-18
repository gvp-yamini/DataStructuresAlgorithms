pieChart = "";
ColumnChart = "";
var userAgent = kony.os.userAgent();
var size;
  if (userAgent == "iPhone")
  {
           size = [8];
  }
else
  {
       size = [22];
  }
kony = kony || {};
kony.retailBanking = kony.retailBanking || {};
kony.retailBanking={
  AreaChartGenereted : false,
  columnChartGenereted : false,
  pieChartGenerated : false,
  columnChartGeneretedios : false,
  DatesOfMonth : [],
  completeSpendingInfo: [],
  transactionCompleteDataSpending: [],
  incrementer : 0,
  closingValuesOfDate1 : [],
  closingValuesOfDate2 : [],
  barGraphRecordsList : [],
  barGraphMonthNamesList: [],
  barGraphFullMonthNamesList: [],
  barGraphtotalCashMonth: [],
  barGraphMonthIdList: [],
  MonthDetailsCashFlowPieChart : [],
  CategoryNameList : [],
  LAST_MONTH : "",
  THIS_MONTH : "",
  CategoryIdList : [],
  TransactionList : [],
  columnMajorIntervals : null,
  minimumValue : null,
  maxValue : null,
  selectedMonthId : null,
  selectedMonthName: null,
  fromAppMenu : false,
  onClickMonthOverview:function(args){
    var columnNumber = args["columnNumber"];
    var rowNumber = args["rowNumber"];
    var MonthId = kony.retailBanking.barGraphMonthIdList[rowNumber];
    kony.retailBanking.selectedMonthId = MonthId; 
    fetchPieChartData(MonthId,success,error);
    function success() {
          populateSegLegend();
          pieChart = Pie_createChartWidget();
          frmMyMoneyListKA.flxMonthlySpendingKAinner.add(pieChart);
          kony.retailBanking.settingSpecificMonth(kony.retailBanking.barGraphFullMonthNamesList[rowNumber]);
        }

        function error() {
            //Handle error case
            kony.sdk.mvvm.log.error("In fetching Pie Chart data");
        }
},
settingSpecificMonth:function(Month){
   frmMyMoneyListKA.resourcesLabel.skin = sknMonthlySpending3278E6KA;
   frmMyMoneyListKA.flxJanMnthKA.isVisible = true;
   frmMyMoneyListKA.lblMonthlySpendingKA.text = "> "+Month;
   frmMyMoneyListKA.flxMonthlySpendingKA.isVisible = true;
   frmMyMoneyListKA.flxSpendingOverviewKA.isVisible = false;
   frmMyMoneyListKA.flxExpenditureKA.isVisible = false;
   frmMyMoneyListKA.flxsegMonthlyDataKA.isVisible = false;
},
settingSpecificTransactionList: function(categoryName,categoryID){
  fetchMyModuleTransactionList(kony.retailBanking.selectedMonthId,categoryID,success,error);
    function success() {
      frmMyMoneyListKA.resourcesLabel.skin = sknMonthlySpending3278E6KA;
      frmMyMoneyListKA.lblMonthlySpendingKA.skin = sknMonthlySpending3278E6KA;
      frmMyMoneyListKA.lblExpenditureKA.text = "> "+categoryName;
  	  frmMyMoneyListKA.flxJanMnthKA.isVisible = true;
      frmMyMoneyListKA.flxExpenditureKA.isVisible = true;
      frmMyMoneyListKA.flxMonthlySpendingKA.isVisible = false;
      frmMyMoneyListKA.flxSpendingOverviewKA.isVisible = false;
      frmMyMoneyListKA.flxsegMonthlyDataKA.isVisible = true;
        }

        function error() {
            //Handle error case
            kony.sdk.mvvm.log.error("In fetching Pie Chart data");
        }
}
};

//creating chart widget...
	function createChartWidget() {
       kony.retailBanking.AreaChartGenereted = true;
		var chartObj = createChartJSObject();
		var chartWidget = new kony.ui.Chart2D3D({
			"id": "chartid",
			"isVisible": true,
            "height":"80%",     
            "width":"100%",
      		"chartheight":"80%",
             "chartwidth":"100%"
		}, {
			"widgetAlignment": constants.WIDGET_ALIGN_CENTER,
			"contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
			"containerWeight": 100
		}, chartObj);
		return chartWidget;
	}
//creating chart object with chart properties and chart data...
	function createChartJSObject() {
		var chartInfo = {
			"chartProperties": {
			"chartHeight": "80%",
			"enableScrolling": true,
			"position": [0, 0, 100, 100],
			"title": {
				"visible": false,
				"text": "April Cash Flow",
				"font": {
					"size": size,
					"family": ["Verdana"],
					"style": ["normal"],
					"color": ["0xaaaaaaff"],
					"transparency": [0]
				},
			"position": "top",
			"alignment": "center",
			"direction": "up",
			"containerWt": 10,
			"margin": [0, 0, 0, 0],
			"background": {
				"fillType": "gradient",
				"transparency": 100,
				"gradientType":"linearTopToBottom",
				"gradientRatios": [0, 100]
				//"color": ["0x0812A4FF","0x78a0c8ff"]
				}
			},
			"layerArea": {
				"background": {
					"fillType": "gradient",
					"transparency": 100,
					"gradientType":"linearTopToBottom",
					"gradientRatios": []
					//"color": ["0x0812A4FF","0x78a0c8ff"]
				}
			},
		"dataSetMapping": {
			"setId": "dataset1",
			"eventsSetId": "eventsMap1"
		},
		"axis": {
			"type": ["xAxis", "yAxis"],
			"xAxis": {
				"scale": {
				"type":"fixedGapMajorInterval",
                "gap": 50
					},
			"axisLine": {
				"line": {
					"color": ["0xffffffff"]
				}
			},
			"labels": {
				"margin": [0, 0, 0, 0],
				"orientationAngle": 0,
				"font": {
					"size": size,
					"family": ["Verdana"],
					"style": ["normal"],
					"color": ["0xffffffff"],
					"transparency": [0]
				}
			}
		},
		"yAxis": {
			"scale": {
			"offset": {
				"value": [0, 0],
				"type": "pixels"
				}
			},
			"axisLine": {
				"line": {
					"color": ["0xffffffff"]
				}
			},
			"labels": {
				"margin": [0, 0, 0, 0],
				"font": {
					"size": size,
					"family": ["Verdana"],
					"style": ["normal"],
					"color": ["0xffffffff"],
					"transparency": [0]
				}
			}
		}
	},
	"drawEntities": ["axis","areaChart"],
	"areaChart": {
		"columnId": [0],
		"animations": {
		"onInitAnimation": true
		},
		"graphType": "normal",
		"lineType": "normal",
		"dataAlignToAxis": ["primaryYAxis"],
		"plotMissingValues": "assumeZero",
		"area": {
			"fillType": ["gradient"],
			"transparency": [50, 50],
			"color": ["0xff0000ff","0x00ff00ff"],
			"colorAboveXAxis": [
				["0x70ACBEff", "0x1D69A9ff"]
			],
		"colorBelowXAxis": ["0xff0000ff"]
		},
		"line": {
			"visible": false,
			"color": ["0xffffffff"],
			"width": [0],
			"transparency": [0]
		},
		"plotPoints": {
			"visible": false,
			"colorIndicator": "columns",
			"marker": {
				"type": ["circle"],
				"fillType": "color"
			},
		"color": ["0x2a99ceff"],
		"transparency": [0],
		"size": size
		},
		"dataLabels": null
		}
	},
	"chartData": {
		"rowNames": {
			"values": kony.retailBanking.DatesOfMonth
		},
		"columnNames": {
			"values": ["Money"]
			},
		"data": {
			"Money": kony.retailBanking.closingValuesOfDate1
			}
		},
	"chartEvents": {
		"events": ["eventsMap1"],
		"eventsMap1": {
		"onPinchZoom": {
			"minimumZoomScale": 1,
			"maximumZoomScale": 2
		},
		"onTouch": {
			"crossHair": {
			"line": {
				"color": ["0xffffffff"],
				"width": [1],
				"transparency": [0]
				}
			},
		"dataLabels": {
			"visible": true,
			"indicators": ["numberValue"],
			"separator": "space",
			"font": {
				"size":size,
				"family": ["Verdana"],
				"style": ["normal"],
				"color": ["0xffffffff"],
				"transparency": [0]
				}
			},
		"border": {
			"visible": false,
			"line": {
				"color": ["0xffffffff"],
				"width": [0],
				"transparency": [0]
			}
		},
		"background": {
			"fillType": "gradient",
			"transparency": 100,
			"gradientType":"linearTopToBottom",
			"gradientRatios": []
			//"color": ["0x0812A4FF","0x78a0c8ff"]
			}
		}
		}
	}
};
return chartInfo;
}

//creating chart widget...
function line_createChartWidget()
	{
		var chartObj = line_createChartJSObject();
		var chartWidget = new kony.ui.Chart2D3D({
		"id": "linechartid",
		"isVisible": true,
            "height":"80%",     
            "width":"100%",
      		"chartheight":"80%",
             "chartwidth":"100%"
	}, 
	{
		"widgetAlignment": constants.WIDGET_ALIGN_CENTER,
		"contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
		"containerWeight": 100
	},chartObj);
	return chartWidget;
	}
//creating chart object with chart properties and chart data...
function line_createChartJSObject()
	{
		var chartInfo = {
			"chartProperties": {
			"chartHeight": "80%",
            "legend" : {
	"visible" : true,
	"indicators" : ["marker", "textLabel"],
	"separator" : "space",
	"marker" : {
		"type" : "colorBox",
		"color" : ["0xa9e200ff",
			"0x22b8dbff"]
	},
	"textLabel" : {
		"text" : [kony.retailBanking.LAST_MONTH, kony.retailBanking.THIS_MONTH],
		"color" : ["0xffffffff",
			"0xffffffff"],
		"margin" : [3, 5, 1, 1]
	},
	"font" : {
		"size" : size,
		"family": ["Verdana"],
		"style": ["normal"],
		"color" : ["0xffffffff"],
		"transparency" : [0]
	},
	"position" : "top",
	"alignment" : "left",
	"layout" : "horizantal",
	"containerWt" : 18,
	"margin" : [5, 5, 5, 5],
	"padding" : [2, 2, 2, 2],
	"background" : {
		"fillType" : "gradient",
		"transparency" : 100,
		"gradientType" :
		"linearTopToBottom",
		"gradientRatios" : [0, 20, 50,
			100],
		"color" : ["0xff1234ff",
			"0xffffffff", "0x12121212", "0x23456789"]
	}
},
			"axis": {
				"type": ["xAxis", "yAxis"],
				"xAxis": {
					"scale": {
						"type":"fixedGapMajorInterval",
                        "gap" : 50
					},
			"axisLine": {
				"crossOtherAxisAt": "value",
				"line": {
					"color": ["0xffffffff"]
				}
			},
			"labels": {
				"visible": true,
                "margin": [0, 0, 0, 0],
				"orientationAngle": 0,
              	"font": {
					"size": size,
					"family": ["Verdana"],
					"style": ["normal"],
					"color": ["0xffffffff"],
					"transparency": [0]
				}
			}
		},
		"yAxis": {
			"scale": {
				"offset": {
					"value": [0, 0],
					"type": "pixels"
				}
			},
		"axisLine": {
			"line": {
				"color": ["0xffffffff"]
			}
		},
		"labels": {
          "visible": true,
           "font": {
					"size": size,
					"family": ["Verdana"],
					"style": ["normal"],
					"color": ["0xffffffff"],
					"transparency": [0]
				},
			"margin": [0, 0, 0, 0]
		},
		"intervalMarks": {
			"major": {
				"line": {
					"color":["0xffffffff"]
				}
			},
			"minor": {
				"line": {
					"color":["0xffffffff"]
				}
			},
		"placement": "atLabels"
		}
	}
},
	"grid": {
		"type": ["xAxisMajorGrid","yAxisMajorGrid"],
		"xAxisMajorGrid": {
			"line": {
				"color": ["0xffffffff"]
			}
		},
		"yAxisMajorGrid": {
		"line": {
			"color": ["0xffffffff"]
		}
	}
},
	"drawEntities": ["axis","lineChart"],
	"lineChart": {
		"columnId": [0, 1],
		"graphType": "stacked",
		"dataAlignToAxis": ["primaryYAxis"],
		"line": {
			"color": ["0x9fd500ff","0x22b8dbff"],
			"width": [3],
		},
	"plotPoints": {
        "visible": false,
		"colorIndicator": "columns",
		"marker": {
			"type": ["circle", "circle"],
			"fillType": "color"
		},
		"color": ["0xa9e200ff","0x22b8dbff"],
		"size": size
		}
	}
},
"chartData": {
	"rowNames": {
		"values": kony.retailBanking.DatesOfMonth
},
"columnNames": {
"values": ["March", "April"]
},
"data": {
"March": kony.retailBanking.closingValuesOfDate1,
"April": kony.retailBanking.closingValuesOfDate2
  }
}
};
return chartInfo;
}

//creating chart widget...
function column_createChartWidget() {
	var chartObj = column_createChartJSObject();
	var chartWidget = new kony.ui.Chart2D3D({
		"id": "chartColumnid",
            "height":"100%",     
            "width":"100%",
      		"chartheight":"80%",
             "chartwidth":"100%",
		"isVisible": true
		},
		{
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
		"contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
		"containerWeight": 100
		}, chartObj);
		return chartWidget;
	}
//creating chart object with chart properties and	chart data...
//creating chart object with chart properties and	chart data...
function column_createChartJSObject() {
	var chartInfo = {
		"chartProperties": {
			"chartHeight": "80%",
			"title": {
				"text": "",
				"font": {
					"size": size,
					"family": ["Verdana"],
					"style": ["normal"],
					"color": ["0xffffffff"]
				},
			"containerWt": 12,
			"background": {
                "transparency": 100,
				"fillType": "gradient",
				"color": ["0x070707ff","0x323232FF"]
				}
			},
			"layerArea": {
				"background": {
                    "transparency": 100,
					"fillType": "gradient",
					"color": ["0x070707ff","0x323232FF"]
				}
			},
		"axis": {
			"xAxis": {
			"title": {
				"text": "",
			"font": {
				"size": size,
				"family": ["Verdana"],
				"style": ["Bold"],
				"color": ["0xaaaaaaff"]
			}
		},
		"axisLine": {
			"visible": false
		},
		"labels": {
			"font": {
				"size": size,
				"family": ["Verdana"],
				"style": ["normal"],
				"color": ["0x000000ff"]
				}
			}
		},
		"yAxis": {
          "scale": {
             "minValue": kony.retailBanking.minimumValue,
             "maxValue": kony.retailBanking.maxValue,
             "majorInterval": kony.retailBanking.columnMajorIntervals
             },
				"axisLine": {
			"visible": false
		}
	}
},
	"grid": {
		"type": ["yAxisMajorGrid"],"yAxisMajorGrid": {
		"visible": false
		},
	"background": {
		"fillType": "alternateColor",
		"alternateColorPattern":"yMajorMajor",
		"transparency": 80,
		"color": ["0x323232FF","0x070707FF"]
		}
	},
	"drawEntities": ["axis","columnChart"],
	"columnChart": {
		"animations": {
			"onInitAnimation": true
		},
	"bar": {
		"fillType": ["color"],
	"color": [
			["0x64A1D6ff"]
		]
	},
	"border": {
		"line": {
			"color": ["0xaaaaaaff"]
			}
		},
	"dataLabels": {
		"placement": "above",
		"font": {
			"size": size,
			"family": ["Verdana"],
		    "style": ["normal"],
			"color": ["0x000000ff"]
			},
       "format" : {
          "prefix":["$"],
          "suffix":[""]
           }
		}
	}
},
	"chartData": {
		"rowNames": {
			"values": kony.retailBanking.barGraphMonthNamesList
},
	"columnNames": {
		"values": ["c1"]
	},
	"data": {
		"c1": kony.retailBanking.barGraphtotalCashMonth
		}
	},
	"chartEvents": {
		"events": ["eventsMap1"],
		"eventsMap1": {
			"onTap": onTap,
			"onPinchZoom": {
			"minimumZoomScale": 1,
			"maximumZoomScale": 2
			},
	"onTouch": {
		"crossHair": {
		"line": {
			"color": ["0xAAAAAAFF"],
			"transparency": [100]
		}
	},
	"dataLabels": {
    "placement": "above",
	"indicators": ["rowName","numberValue"],
	"font": {
		"size": size,
		"family": ["Verdana"],
		"style": ["normal"],
		"color": ["0x000000ff"]
		}
		},
	"border": {
		"line": {
			"color": ["0x000000ff"]
			}
		},
	"background": {
		"fillType": "color",
		"color": ["0xFFFFFFFF"],
	}
	}
	}
	}
	};
	return chartInfo;
}

function onTap(args){
    kony.retailBanking.onClickMonthOverview(args);
}

//creating chart widget...
function Pie_createChartWidget() {
	var chartObj = Pie_createChartJSObject();
	var chartWidget = new kony.ui.Chart2D3D({
	"id": "chartPieid",
	"isVisible": true,
            "height":"100%",     
            "width":"100%",
      		"centerX":"50%",
      		"centerY":"40%",
      		"chartheight":"100%",
             "chartwidth":"100%"
}, {
	"widgetAlignment": constants.WIDGET_ALIGN_CENTER,
    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE,
     "padding" : [5,5,5,5],
     "margin"  : [5,5,5,5],
     "hExpand" : true,
     "vExpand": true, 
	"containerWeight": 100
	}, chartObj);
  	var chartData  = {
			"rowNames": {
				"values": kony.retailBanking.CategoryNameList
				},
			"columnNames": {
	   "values": ["Amount1"]
			},
	"data": {
			"Amount1": kony.retailBanking.MonthDetailsCashFlowPieChart
		}
	}
   chartWidget.setData(chartData);
return chartWidget;
}
//creating chart object with chart properties and chart data...
	function Pie_createChartJSObject() {
		var chartInfo = {
			"chartProperties": {
			"chartHeight": 100,
			"enableScrolling": false,
			"position": [0, 0, 100, 100],
			"title": {
				"visible": true,
				"text": "",
				"font": {
					"size": size,
					"family": ["Helvetica"],
					"style": ["normal"],
					"color": ["0x000000ff"],
					"transparency": [0]
				},
			"position": "top",
			"alignment": "center",
			"direction": "up",
			"containerWt": 10,
			"margin": [0, 0, 0, 0],
			"border": {
				"visible": false,
				"line": {
					"color": ["0xaaaaaaff"],
					"width": [1],
					"transparency": [0]
					}
				},
			"background": {
				"fillType": "gradient",
				"transparency": 100,
				"gradientType":"linearTopToBottom",
				"gradientRatios": [0, 100],
				"color": ["0xF4F5F7FF","0xAAAEB9FF"]
				}
			},
             "legend" : {
				"visible" : false,
			},
			"layerArea": {
				"border": {
					"visible": false,
					"line": {
						"color": ["0xaaaaaaff"],
						"width": [1],
						"transparency": [0]
						}
					},
			"background": {
				"fillType": "gradient",
				"transparency": 100,
				"gradientType":"linearTopToBottom",
				"gradientRatios": [0, 30, 70,100],
				"color": ["0xecedf0FF","0xbabec8FF", "0xadb1bcFF", "0xecedf0FF"]
				}	
			},
			"dataSetMapping": {
				"setId": "dataset1",
				"eventsSetId": "eventsMap1"
				},
			"drawEntities": ["pieChart"],
			"pieChart": {
				"columnId": [0],
				"animations": {
					"onInitAnimation": true
					},
			"spinWheel": false,
			"plotZeroValues": false,
			"plotMissingValues": "assumeZero",
			"direction": "clockWise",
			"startAngle": 0,
			"exploded": false,
			"pieSlice": {
			"fillType": ["color"],
			"transparency": [0],
			"color": ["0xFF4019FF","0x999999FF", "0x64A1D6FF", "0xFEC545FF","0xAB79CFFF","0x5FB336FF","0x3D6DCCFF","0xD6B9EAFF"]
			},
			"border": {
				"visible": true,
				"line": {
					"width": [1],
					"style": ["continuous"],
					"visible": true,
					"color": ["0xFFFFFFFF"],
					"transparency": [0]
				}
			},
			"dataLabels": {
				"visible": true,
				"separator": "space",
				"placement": "inside",
                "indicators": ["percentValue"],
				"orientationAngle": 0,
				"connector": {
					"visible": false,
					"line": {
						"width": [1],
						"style":["continuous"],
						"visible": true,
						"color": ["aaaaaaff"],
						"transparency": [0]
						}
					},
			"font": {
				"family": ["Verdana"],
				"style": ["normal"],
				"size": size,
				"color": ["0x000000ff"]
				},
          "format" : {
          "prefix":[""],
          "suffix":["%"]
           }
			}
		},
		"setZOrderOnTop": false
	},
	"chartData": {},
	"chartEvents": {
		"events": ["eventsMap1"],
		"eventsMap1": {
            "onTap": onTapPieChart,
			"onPinchZoom": {
				"minimumZoomScale": 1,
				"maximumZoomScale": 2
				},
		"onTouch": {
			"crossHair": null,
				"dataLabels": {
				"visible": true,
				"indicators": ["rowName","numberValue"],
				"separator": "space",
				"font": {
				"size": size,
				"family": ["Verdana"],
				"style": ["normal"],
				"color":["0xffffffff"],
				"transparency": [0]
				}
			},
		"border": {
			"visible": true,
			"roundedCorner": false,
			"line": {
			"color":["0xffffffff"],
			"width": [2],
			"transparency": [0]
			}
		},
		"background": {
			"fillType": "color",
			"transparency": 100,
			"color": ["0x000000ff"]
		}
	}
}
}
};
return chartInfo;
}

function onTapPieChart(args){
    var columnNumber = args["columnNumber"];
    var rowNumber = args["rowNumber"];
    var categoryName = kony.retailBanking.CategoryNameList[rowNumber];
    var categoryID = kony.retailBanking.CategoryIdList[rowNumber];
  kony.retailBanking.settingSpecificTransactionList(categoryName,categoryID);
}