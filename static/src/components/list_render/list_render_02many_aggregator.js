/** @odoo-module **/

import { ListRenderer } from "@web/views/list/list_renderer";
import { registry } from "@web/core/registry";

const formatters = registry.category("formatters");

export class ListRenderO2ManyAggregator extends ListRenderer {
  get aggregates() {
    debugger;
    // в values передаем записи в форме
    const values = this.props.list.records.map((r) => r.data);
    const aggregates = {};
    for (const fieldName in this.props.list.activeFields) {
      const field = this.fields[fieldName];
      const fieldValues = values
        .map((v) => v[fieldName])
        .filter((v) => v || v === 0);
      if (!fieldValues.length) {
        continue;
      }
      const type = field.type;
      if (type !== "integer" && type !== "float" && type !== "monetary") {
        continue;
      }
      const { rawAttrs, widget } = this.props.list.activeFields[fieldName];
      let currencyId;
      if (type === "monetary" || widget === "monetary") {
        const currencyField =
          this.props.list.activeFields[fieldName].options.currency_field ||
          this.fields[fieldName].currency_field ||
          "currency_id";
        currencyId =
          currencyField in this.props.list.activeFields &&
          values[0][currencyField] &&
          values[0][currencyField][0];
        if (currencyId) {
          const sameCurrency = values.every(
            (value) => currencyId === value[currencyField][0]
          );
          if (!sameCurrency) {
            aggregates[fieldName] = {
              help: _t("Different currencies cannot be aggregated"),
              value: "—",
            };
            continue;
          }
        }
      }
      // в func передаем значение, записанное в group_operator в каждом столбце
      const func = field.group_operator;
      if (func) {
        let aggregateValue = 0;
        if (func === "max") {
          aggregateValue = Math.max(-Infinity, ...fieldValues);
        } else if (func === "min") {
          aggregateValue = Math.min(Infinity, ...fieldValues);
        } else if (func === "avg") {
          aggregateValue =
            fieldValues.reduce((acc, val) => acc + val) / fieldValues.length;
        } else if (func === "sum") {
          aggregateValue = fieldValues.reduce((acc, val) => acc + val);
        }

        const formatter =
          formatters.get(widget, false) || formatters.get(type, false);
        const formatOptions = {
          digits: rawAttrs.digits ? JSON.parse(rawAttrs.digits) : undefined,
          escape: true,
        };
        if (currencyId) {
          formatOptions.currencyId = currencyId;
        }
        aggregates[fieldName] = {
          help: rawAttrs[func],
          value: formatter
            ? formatter(aggregateValue, formatOptions)
            : aggregateValue,
        };
      }
    }
    return aggregates;
  }
}

ListRenderO2ManyAggregator.template = "owl.ListRenderO2ManyAggregator";
