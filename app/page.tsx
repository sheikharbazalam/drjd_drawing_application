"use client";

import React, { FC, useState } from 'react';
import { useDraw } from '@/hooks/useDraw';
import { ChromePicker } from 'react-color';


interface PageProps {}

const Page: FC<PageProps> = () => {
  const [color, setColor]= useState<string>('#000')
  const { canvasRef , onMouseDown, clear} = useDraw(drawLine)

  function drawLine({prevPoint, currentPoint, ctx}: Draw){
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
  return (
    <div className='w-screen h-screen bg-white flex items-center justify-center'>
      <div className ="flex flex-col gap-10 pr-10">
      <ChromePicker color={color} onChange={(e)=> setColor(e.hex)}/>
      <button type="button" onClick={clear} className='p-2 rounded-md border  border-black'>Clear Canvas</button>
      </div>
      <canvas onMouseDown={onMouseDown} ref={canvasRef} width={750} height={750} className='border border-black rounded-md' />
    </div>
  );
}

export default Page;
