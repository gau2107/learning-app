'use client'

import { useState, useEffect } from 'react'
import { BASEURL } from '../const/const'
import { Highlight, themes } from 'prism-react-renderer'

export default function Param() {

  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const [list, setList] = useState<any>([]);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50


  useEffect(() => {
    async function getList() {
      const resp = await fetch(`${BASEURL}/api/data`);
      const data = await resp.json();
      setList([...data.data]);
    }
    getList();
  }, [])



  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientY)
  }

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientY)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe && currentIndex < list.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && currentIndex < list.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, list.length])

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-black text-white overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="text-center p-4 max-w-md">
        <h1 className="text-2xl font-bold mb-2">{list[currentIndex]?.title}</h1>
        <p className="text-lg mb-2">{list[currentIndex]?.description}</p>
        <div className="text-sm p-2 rounded mb-4 text-left whitespace-pre-wrap break-all overflow-x-hidden bg-gray-800 rounded-md">
          <Highlight theme={themes.vsDark} code={list[currentIndex]?.code || ''} language="javascript">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre style={{ ...style, background: 'transparent', padding: 0, margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all', overflowX: 'hidden' }}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>

      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm opacity-50">
        {currentIndex + 1} / {list.length}
      </div>
    </div>
  )
}