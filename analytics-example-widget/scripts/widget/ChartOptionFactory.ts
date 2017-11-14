import { ChartTypesConstants, CommonChartOptions } from 'Charts/Contracts';
import { ViewSize, QueryViewProps, QueryViewState } from "./AnalyticsViewContracts";
import { GroupedWorkItemAggregation } from "../data/ViewQueries";
import { AnalyticsDate } from "../data/AnalyticsTypes";
import { validateGroup } from 'VSS/Controls/Validation';

/**
 * Transforms query results for presentation in a chart.
 * uses underscore.js to help with data-transformation activities.
 */
export class ChartOptionFactory {
    private getUniqueDates(queryResults: GroupedWorkItemAggregation[], dates: AnalyticsDate[]): AnalyticsDate[] {
        return queryResults.map((entry) => entry.DateSK)
            .filter((item, i, arr) => {
                return arr.indexOf(item) === i;
            })
            .map(dateSK => {
                return dates.find(el => dateSK == el.DateSK);
            })
            .sort((a, b) => {
                if (a.DateSK == b.DateSK) return 0;
                return (a.DateSK < b.DateSK) ? -1 : 1;
            });
    }

    private getValuesOfStateCategory(stateCategory: string, queryResults: GroupedWorkItemAggregation[], dates: AnalyticsDate[]): number[] {
        let valuesInState = queryResults.filter((item, i, arr) => {
            return item.StateCategory === stateCategory;
        })
            ;
        return dates.map((date) => {
            let valueAtDate = valuesInState.find(o => {
                return o.DateSK === date.DateSK && o.StateCategory === stateCategory;
            });
            return valueAtDate && valueAtDate.AggregatedValue ? valueAtDate.AggregatedValue : 0;
        });
    }

    private getUniqueTypes(queryResults: GroupedWorkItemAggregation[], dates: AnalyticsDate[]): string[] {
        return queryResults.map((entry) => entry.StateCategory)
            .filter((item, i, arr) => {
                return arr.indexOf(item) === i;
            })
            .sort((a, b) => {
                return a.localeCompare(b);
            });
    }

    public generateChart(size: ViewSize, queryResults: GroupedWorkItemAggregation[], dates: AnalyticsDate[], suppressAnimation: boolean): CommonChartOptions {

        let uniqueDates = this.getUniqueDates(queryResults, dates);
        let uniqueTypes = this.getUniqueTypes(queryResults, dates);

        let series = [];
        for (let i = 0; i < uniqueTypes.length; i++) {
            series.push({
                name: uniqueTypes[i],
                data: this.getValuesOfStateCategory(uniqueTypes[i], queryResults, uniqueDates)
            })
        }

        let chartConfig = {
            chartType: ChartTypesConstants.Line,
            series: series,
            xAxis: {
                labelFormatMode: "dateTime_DayInMonth",
                labelValues: uniqueDates.map(dateString => Date.parse(dateString.Date))
            },
            suppressAnimation: suppressAnimation
        } as CommonChartOptions;

        return chartConfig;
    }
}