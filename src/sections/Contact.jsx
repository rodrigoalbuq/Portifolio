// Parágrafo informativo com cor do tema (muted)
const InfoText = styled.p`
  color: ${({ theme }) => theme.muted};
`;
import styled from 'styled-components'
import { useState, useEffect, Suspense, lazy } from 'react'
import { sendEmail } from '../services/email.js'

const Section = styled.section`
  max-width: 1120px;
  margin: 0 auto;
  padding: 24px;
  color: ${({ theme }) => theme.text};
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const Title = styled.h2`
  margin: 0 0 12px 0;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  width: 100%;
  max-width: 640px;
`

const Card = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 16px;
  /* largura original, sem max-width e margin centralizada */
  transition: transform 0.15s ease;
  &:hover {
    transform: translateY(-1px);
  }
`

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.muted};
`

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.navBg};
  color: ${({ theme }) => theme.text};
  margin-bottom: 12px;
  &:invalid {
    border-color: ${({ theme }) => theme.error};
  }
  &:focus:invalid {
    outline: none;
    border-color: ${({ theme }) => theme.error};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.error}40`};
  }
  &:valid {
    border-color: ${({ theme }) => theme.valid};
  }
  &:focus:valid {
    outline: none;
    border-color: ${({ theme }) => theme.valid};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.valid}40`};
  }
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.navBg};
  color: ${({ theme }) => theme.text};
  margin-bottom: 12px;
  min-height: 120px;
  &:invalid {
    border-color: ${({ theme }) => theme.error};
  }
  &:focus:invalid {
    outline: none;
    border-color: ${({ theme }) => theme.error};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.error}40`};
  }
  &:valid {
    border-color: ${({ theme }) => theme.valid};
  }
  &:focus:valid {
    outline: none;
    border-color: ${({ theme }) => theme.valid};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.valid}40`};
  }
`

const Button = styled.button`
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.bg};
  padding: 10px 14px;
  border: 0;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.1s ease;
  &:hover {
    background: ${({ theme }) => theme.accentHover};
    transform: translateY(-1px);
  }
`

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [feedbackVisible, setFeedbackVisible] = useState(false)
  const [sending, setSending] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  // Esconde feedback automaticamente após 4s
  useEffect(() => {
    if (feedbackVisible) {
      const timer = setTimeout(() => setFeedbackVisible(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [feedbackVisible])
  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    setErrorMsg('')
    setFeedbackVisible(false)
    try {
      await sendEmail({ name, email, message })
      setName('')
      setEmail('')
      setMessage('')
      setFeedbackVisible(true)
    } catch (_err) {
      setErrorMsg('Não foi possível enviar sua mensagem. Tente novamente mais tarde.')
      setFeedbackVisible(true)
    } finally {
      setSending(false)
    }
  }

  const ContactFeedback = lazy(() => import('../components/ContactFeedback.jsx'))

  return (
    <Section id="contato">
      <Title>Contato</Title>
      <InfoText>Fique à vontade para entrar em contato comigo através do formulário abaixo.</InfoText>
      <Grid>
        <Card>
          <form onSubmit={handleSubmit} autoComplete="off">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Seu nome"
              autoComplete="name"
            />
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
              autoComplete="email"
            />
            <Label htmlFor="message">Mensagem</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Como posso ajudar?"
              autoComplete="off"
            />
            <Button type="submit" disabled={sending}>
              {sending ? 'Enviando...' : 'Enviar'}
            </Button>
          </form>
          <Suspense fallback={null}>
            {feedbackVisible && <ContactFeedback errorMsg={errorMsg} />}
          </Suspense>
        </Card>
      </Grid>
    </Section>
  )
}
