/** @odoo-module **/

import { registry } from "@web/core/registry";
import { X2ManyField } from "@web/views/fields/x2many/x2many_field";
import { ListRenderO2ManyAggregator } from "@one2many_aggregator/components/list_render/list_render_02many_aggregator";

class One2ManyAggregatorField extends X2ManyField {}

One2ManyAggregatorField.components = { ListRenderO2ManyAggregator };

One2ManyAggregatorField.template = "owl.One2ManyAggregatorField";
One2ManyAggregatorField.supportedTypes = ["one2many"];

registry.category("fields").add("one2manyAggregator", One2ManyAggregatorField);
