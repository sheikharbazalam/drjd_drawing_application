type drawLineprops = Draw &{
color: string
}

export const drawLine = ({prevPoint, currentPoint, ctx,color}: drawLineprops)=>{
    const {x:currX, y:currY} = currentPoint
    const linecolor = color
    const lineWidth = 5

    let startPoint = prevPoint ?? currentPoint
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle  =  linecolor
    ctx.moveTo(startPoint.x, startPoint.y )
    ctx.lineTo(currX, currY)
    ctx.stroke()

    ctx.fillStyle =  linecolor
    ctx.beginPath()
    ctx.arc(startPoint.x, startPoint.y,2,0, 2* Math.PI)
    ctx.fill()
  }