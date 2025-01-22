sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("dynamicvizchart.controller.Chart", {
        onInit: function () {
            // Sample Data
            var oData = {
                timeRange: "day", // default view
                chartData: [
                    { date: "2025-01-01", value: 30 },
                    { date: "2025-01-02", value: 40 },
                    { date: "2025-01-05", value: 50 },
                    { date: "2025-01-12", value: 60 },
                    { date: "2025-01-19", value: 70 },
                    { date: "2025-01-26", value: 80 },
                    { date: "2025-02-01", value: 90 },
                    { date: "2025-02-10", value: 100 }
                ]
            };

            // Create JSON Model and set it to the view
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);

            // Default data grouping
            this.groupData("day");
        },

        onFilterData: function (oEvent) {
            // Get selected filter type (day, week, month)
            var sFilterType = oEvent.getSource().getSelectedKey();
            this.groupData(sFilterType);
        },

        groupData: function (sFilterType) {
            var aData = this.getView().getModel().getProperty("/chartData");
            var aGroupedData = [];

            if (sFilterType === "day") {
                // Show data as is for daily grouping
                aGroupedData = aData.map(item => ({
                    time: item.date,
                    value: item.value
                }));
            } else if (sFilterType === "week") {
                // Group data into weeks (e.g., W1, W2, etc.)
                aGroupedData = this.groupByWeeks(aData);
            } else if (sFilterType === "month") {
                // Group data into months (e.g., JAN, FEB, etc.)
                aGroupedData = this.groupByMonths(aData);
            }

            // Update the model
            this.getView().getModel().setProperty("/filteredData", aGroupedData);
        },

        groupByWeeks: function (aData) {
            // Define week ranges (W1, W2, etc.)
            var aWeekRanges = [
                { week: "W1", start: "2025-01-01", end: "2025-01-07" },
                { week: "W2", start: "2025-01-08", end: "2025-01-14" },
                { week: "W3", start: "2025-01-15", end: "2025-01-21" },
                { week: "W4", start: "2025-01-22", end: "2025-01-31" }
            ];

            // Aggregate data by week
            var aGrouped = [];
            aWeekRanges.forEach(range => {
                var iTotalValue = aData
                    .filter(item => item.date >= range.start && item.date <= range.end)
                    .reduce((sum, curr) => sum + curr.value, 0);
                if (iTotalValue > 0) {
                    aGrouped.push({ time: range.week, value: iTotalValue });
                }
            });
            return aGrouped;
        },

        groupByMonths: function (aData) {
            // Aggregate data by months (e.g., JAN, FEB, etc.)
            var oMonthMapping = {
                "01": "JAN",
                "02": "FEB",
                "03": "MAR",
                "04": "APR",
                "05": "MAY",
                "06": "JUN",
                "07": "JUL",
                "08": "AUG",
                "09": "SEP",
                "10": "OCT",
                "11": "NOV",
                "12": "DEC"
            };

            var oMonthData = {};
            aData.forEach(item => {
                var sMonth = item.date.split("-")[1]; // Extract month
                var sMonthLabel = oMonthMapping[sMonth];
                oMonthData[sMonthLabel] = (oMonthData[sMonthLabel] || 0) + item.value;
            });

            // Convert to array
            return Object.keys(oMonthData).map(month => ({
                time: month,
                value: oMonthData[month]
            }));
        }
    });
});
