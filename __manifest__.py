# -*- coding: utf-8 -*-
{
    'name' : 'One2ManyAggregator',
    'version' : '16.0.1',
    'summary': 'One2ManyAggregator widget',
    'sequence': -1,
    'description': """Widget for aggregation one2many fields""",
    'category': 'OWL',
    'depends' : ['base', 'web'],
    'data': [
    ],
    'demo': [
    ],
    'installable': True,
    'application': True,
    'assets': {
        'web.assets_backend': [
            'one2many_aggregator/static/src/components/*/*.js',
            'one2many_aggregator/static/src/components/*/*.xml',
        ],
    },
}