sap.ui.define([
  "sap/ui/model/json/JSONModel",
  "sap/ui/Device"
],
  function (JSONModel, Device) {
    "use strict";

    return {
      /**
       * Provides runtime info for the device the UI5 app is running on as JSONModel
       */
      getOption: function (myChart, values) {

        var option;

        let base = +new Date(1988, 9, 3);
        let oneDay = 24 * 3600 * 1000;
        let data = [[base, Math.random() * 300]];
        for (let i = 1; i < 20000; i++) {
          let now = new Date((base += oneDay));
          var val = Math.round((Math.random() - 0.5) * 20 + data[i - 1][1]);
          data.push([+now, val < 0 ? (val * -1) : val]);
        }
        option = {
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%'];
            }
          },
          title: {
            left: 'center',
            text: 'Large Ara Chart'
          },
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'time',
            boundaryGap: false
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
          },
          dataZoom: [
            {
              type: 'inside',
              start: 0,
              end: 20
            },
            {
              start: 0,
              end: 20
            }
          ],
          series: [
            {
              name: 'Fake Data',
              type: 'line',
              smooth: true,
              symbol: 'none',
              areaStyle: {},
              data: data
            }
          ]
        };

        return option;

      }
    };

  });