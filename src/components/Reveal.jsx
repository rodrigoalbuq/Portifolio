import { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const revealUp = keyframes`
  0% { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
`

const Wrap = styled.div`
  opacity: 0;
  transform: translateY(8px);
  will-change: opacity, transform;
  &[data-visible="true"] {
    opacity: 1;
    transform: none;
    animation: ${revealUp} 360ms ease both;
  }
`

export default function Reveal({ children, delayMs = 0, once = true, threshold = 0.25, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (visible && once) return
    const el = ref.current
    if (!el) return

    const onVisible = () => setVisible(true)

    if (typeof IntersectionObserver !== 'undefined') {
      const obs = new IntersectionObserver((entries) => {
        const e = entries[0]
        if (e && e.isIntersecting) onVisible()
      }, { threshold })
      obs.observe(el)
      return () => obs.disconnect()
    } else {
      onVisible()
    }
  }, [visible, once, threshold])

  const style = delayMs ? { animationDelay: `${delayMs}ms` } : undefined

  return (
    <Wrap ref={ref} data-visible={visible} style={style} {...rest}>
      {children}
    </Wrap>
  )
}
