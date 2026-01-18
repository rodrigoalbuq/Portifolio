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
  transition: transform 0.15s ease;
  &:hover { transform: translateY(-1px); }
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
  transition: background 0.2s ease, transform 0.1s ease;
  &:hover { background: ${({ theme }) => theme.accentHover}; transform: translateY(-1px); }
`

/* Removidos links duplicados: estão no Footer */

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [feedbackVisible, setFeedbackVisible] = useState(false)
  const [sending, setSending] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const ContactFeedback = lazy(() => import('../components/ContactFeedback.jsx'))

  useEffect(() => {
    if (!feedbackVisible) return
    const t = setTimeout(() => setFeedbackVisible(false), 4000)
    return () => clearTimeout(t)
  }, [feedbackVisible])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setSending(true)
    try {
      await sendEmail({ name, email, message })
      setFeedbackVisible(true)
      setName('')
      setEmail('')
      setMessage('')
    } catch (_err) {
      setErrorMsg('Falha ao enviar. Tente novamente em instantes.')
    } finally {
      setSending(false)
    }
  }

  return (
    <Section className="fade-in">
      <Title>Contato</Title>
      <Grid>
        <Card>
          <form onSubmit={handleSubmit}>
            <Label htmlFor="contact-name">Nome</Label>
            <Input
              id="contact-name"
              placeholder="Por favor, digite seu nome"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              onInvalid={(e) => e.target.setCustomValidity('Por favor, informe seu nome (mínimo 2 caracteres).')}
              onInput={(e) => e.target.setCustomValidity('')}
            />
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              placeholder="Por favor, digite seu email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              onInvalid={(e) => e.target.setCustomValidity('Informe um email válido.')}
              onInput={(e) => e.target.setCustomValidity('')}
            />
            <Label htmlFor="contact-message">Mensagem</Label>
            <Textarea
              id="contact-message"
              placeholder="Por favor, digite o motivo do contato"
              name="message"
              autoComplete="on"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              minLength={5}
              onInvalid={(e) => e.target.setCustomValidity('Escreva sua mensagem (mínimo 5 caracteres).')}
              onInput={(e) => e.target.setCustomValidity('')}
            />
            <Button type="submit" disabled={sending}>{sending ? 'Enviando…' : 'Enviar'}</Button>
            {errorMsg && (
              <div style={{ marginTop: 10, color: '#ef4444' }}>{errorMsg}</div>
            )}
            {feedbackVisible && (
              <Suspense fallback={<div style={{ marginTop: 12 }}>Carregando confirmação…</div>}>
                <ContactFeedback />
              </Suspense>
            )}
          </form>
        </Card>
      </Grid>
    </Section>
  )
}
