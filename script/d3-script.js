var pie = new d3pie("pieChart", {
	"header": {
		"title": {
			"text": "",
			"fontSize": 22,
			"font": "verdana"
		},
		"subtitle": {
			"text": "",
			"color": "#999999",
			"fontSize": 10,
			"font": "verdana"
		},
		"titleSubtitlePadding": 12
	},
	"footer": {
		"color": "#999999",
		"fontSize": 11,
		"font": "open sans",
		"location": "bottom-center"
	},
	"size": {
		"canvasHeight": 550,
		"canvasWidth": 1440,
		"pieInnerRadius": "48%",
		"pieOuterRadius": "88%"
	},
	"data": {
		"sortOrder": "value-desc",
		"content": userData
	},
	"labels": {
		"outer": {
			"hideWhenLessThanPercentage": 1,
			"pieDistance": 32
		},
		"mainLabel": {
			"font": "open sans",
			"fontSize": 16
		},
		"percentage": {
			"color": "#ffffff",
			"font": "open sans",
			"decimalPlaces": 0,
			"fontSize": 16
		},
		"value": {
			"color": "#e1e1e1",
			"font": "open sans",
			"fontSize": 18
		},
		"lines": {
			"enabled": true,
			"color": "#cccccc"
		},
		"truncation": {
			"enabled": true
		}
	},
	"tooltips": {
		"enabled": true,
		"type": "placeholder",
		"fontSize": 16,
		"string": " {value} stemmen",
		"styles": {
			"fadeInSpeed": 31
		}
	},
	"effects": {
		"pullOutSegmentOnClick": {
			"effect": "linear",
			"speed": 400,
			"size": 12
		}
	}
});