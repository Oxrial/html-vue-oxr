// 源
// 目标
// 线型
// 连接端点8个方位
// arrowType 箭头类型
// lineColor 线色
export function lineLinked(
	source,
	target,
	arrowType,
	conn,
	anchor,
	lineColor,
	width
) {
	// 1 单向单箭头；2 双向单箭头 ；3 单向双箭头
	arrowType = arrowType || 2
	let overlays = [['Arrow', { width: 7, length: 5, location: 1 }]]
	if (arrowType === 2) {
		overlays = [
			['Arrow', { width: 7, length: 5, location: 1 }],
			['Arrow', { width: 7, length: 5, location: 0, direction: -1 }]
		]
	}
	// anchor数组进行定位是x、y、dx、dy说明，
	// x代表从左到右（0-1），
	// y代表从上到下（0-1）。
	// dx代表从从左到右（-1-0-1）中间为0，
	// dy代表从上到下（-1-0-1）中间为0。
	// 例如： [0, 0.5, -1, 0]代表leftCenter（left）。 [ 0.7,0,-1,0]
	const common = {
		endpoint: 'Rectangle',
		connector: [conn || 'Flowchart'],
		anchor: anchor || 'Continuous',
		// anchor: [
		//   "Top",
		//   "TopRight",
		//   "Right",
		//   "BottomRight",
		//   "Bottom",
		//   "BottomLeft",
		//   "Left",
		//   "TopLeft"
		// ],
		// 线条样式
		paintStyle: {
			stroke: lineColor || this.$c.Green3,
			strokeWidth: width || 0
		},
		// 点
		// endpoints:
		//   [
		//   ["Dot", { radius: 7 }],
		//   ["Dot", { radius: 11 }]
		//   ]
		//   "Blank",
		// 点样式
		endpointStyle: {
			fill: 'transparent'
			// outlineStroke: "darkgray",
			// outlineWidth: 0
		},
		overlays: overlays
	}
	this.$line.connect(
		{
			source: source,
			target: target
		},
		common
	)

	if (arrowType === 3) {
		jsPlumb.connect(
			{
				source: target,
				target: source
			},
			common
		)
	}
}
