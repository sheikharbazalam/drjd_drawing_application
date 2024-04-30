"use client";

import React, { FC, useEffect, useState } from 'react';
import { useDraw } from '@/hooks/useDraw';
import { ChromePicker } from 'react-color';
import {io} from 'socket.io-client';
import { drawLine } from '@/utils/drawLine';
const socket  = io('http://localhost:3005/')

interface PageProps {}
type DrawLineProps = {
  prevPoint:Point | null
  currentPoint:Point
  color : string
}

const Page: FC<PageProps> = () => {
  const [color, setColor]= useState<string>('#000')
  const { canvasRef , onMouseDown, clear} = useDraw(createLine)

 useEffect(()=>{
  const ctx = canvasRef.current?.getContext('2d')
  socket.on('draw-line',({prevPoint, currentPoint, color}: DrawLineProps)=>{
    if(!ctx) return
    drawLine({prevPoint, currentPoint,ctx, color})
  })
  socket.on('clear',clear)
 },[canvasRef, clear]);
    



  
  function createLine({prevPoint, currentPoint, ctx}: Draw){
    socket.emit('draw-line', ({prevPoint, currentPoint, color}))
    drawLine({prevPoint, currentPoint,ctx,color})
  }
  return (
    <div className='w-screen h-screen bg-white flex items-center justify-center'>
      <div className ="flex flex-col gap-10 pr-10">
      <ChromePicker color={color} onChange={(e)=> setColor(e.hex)}/>
      <button type="button" onClick={()=> socket.emit('clear')} className='p-2 rounded-md border  border-black' >Clear Canvas</button>
      </div>
      <canvas onMouseDown={onMouseDown} ref={canvasRef} width={750} height={750} className='border border-black rounded-md' />
    </div>
  );
}

export default Page;
