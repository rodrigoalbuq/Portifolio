import { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const revealUp = keyframes`
  0% { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
`

const revealOut = keyframes`
  0% { opacity: 1; transform: translateY(0); filter: blur(0); }
  100% { opacity: 0; transform: translateY(-10px); filter: blur(7px); }
`

const Wrap = styled.div`
  opacity: 0;
  transform: translateY(18px) scale(0.985);
  filter: blur(5px);
  will-change: opacity, transform, filter;
  transition: opacity 1.6s cubic-bezier(0.22, 1, 0.36, 1), transform 1.6s cubic-bezier(0.22, 1, 0.36, 1), filter 1.6s cubic-bezier(0.22, 1, 0.36, 1);
  &[data-visible='true'] {
    opacity: 1;
    transform: none;
    filter: blur(0);
    animation: ${revealUp} 850ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  &[data-focus='true'][data-visible='false'] {
    animation: ${revealOut} 1.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
`

export default function Reveal({ children, delayMs = 0, once = true, focus = false, threshold = 0.25, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (visible && once && !focus) return
    const el = ref.current
    if (!el) return

    const onVisible = () => setVisible(true)

    if (typeof IntersectionObserver !== 'undefined') {
      const obs = new IntersectionObserver(
        (entries) => {
          const e = entries[0]
          if (!e) return
          if (focus) {
            setVisible(e.isIntersecting)
          } else if (e.isIntersecting) {
            onVisible()
          }
        },
        { threshold }
      )
      obs.observe(el)
      return () => obs.disconnect()
    } else {
      onVisible()
    }
  }, [visible, once, focus, threshold])

  const style = delayMs ? { animationDelay: `${delayMs}ms` } : undefined

  return (
    <Wrap ref={ref} data-visible={visible} data-focus={focus} style={style} {...rest}>
      {children}
    </Wrap>
  )
}
