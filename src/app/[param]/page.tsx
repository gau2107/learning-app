'use client'

import { useState, useEffect } from 'react'
import { BASEURL } from '../../const/const'
import { Highlight, themes } from 'prism-react-renderer'
import ReactMarkdown from 'react-markdown'

export default function Param({ params }: { params: Promise<{ param: string }> }) {
  const [param, setParam] = useState<string>('')

  useEffect(() => {
    async function getParams() {
      const resolvedParams = await params;
      setParam(resolvedParams.param);
    }
    getParams();
  }, [params])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const [list, setList] = useState<any>([]);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const changeIndex = (newIndex: number) => {
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < list.length) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex(newIndex)
        setIsTransitioning(false)
      }, 80) // Very quick transition
    }
  }


  useEffect(() => {
    async function getList() {
      if (!param) return; // Don't fetch if param is not yet available
      const resp = await fetch(`${BASEURL}/api/data/${param}`);
      const data = await resp.json();
      setList([...data.data]);
    }
    getList();
  }, [param])



  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientY)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault() // Prevent scrolling during swipe
    setTouchEnd(e.targetTouches[0].clientY)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe && currentIndex < list.length - 1) {
      changeIndex(currentIndex + 1)
    }
    if (isRightSwipe && currentIndex > 0) {
      changeIndex(currentIndex - 1)
    }
  }
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && currentIndex < list.length - 1) {
        changeIndex(currentIndex + 1)
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        changeIndex(currentIndex - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, list.length])

  return (
    <div
      className="flex flex-col items-center h-screen bg-black text-white overflow-hidden pt-0 touch-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className={`text-center p-4 max-w-[800px] transition-opacity duration-75 ease-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <h1 className="text-2xl font-bold mb-2">{list[currentIndex]?.title}</h1>
        <div className="text-sm mb-2 text-left">
          <ReactMarkdown>{list[currentIndex]?.description}</ReactMarkdown>
        </div>
        {list[currentIndex]?.code && (
          <div className="code-section text-sm p-2 rounded mb-4 text-left whitespace-pre-wrap break-all overflow-x-hidden overflow-y-auto max-h-[80vh] bg-gray-800 rounded-md" onTouchStart={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()} onTouchEnd={(e) => e.stopPropagation()}>
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
        )}


      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm opacity-50">
        {currentIndex + 1} / {list.length}
      </div>
    </div>
  )
}