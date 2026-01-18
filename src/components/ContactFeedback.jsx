import styled from 'styled-components'

const Wrap = styled.div`
  margin-top: 12px;
  padding: 10px 12px;
  background: ${({ theme }) => theme.navBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.text};
`

export default function ContactFeedback() {
  return (
    <Wrap role="status" aria-live="polite">
      Obrigado! Entrarei em contato em breve.
    </Wrap>
  )
}
