import styled from 'styled-components'
import { useState, useEffect, Suspense, useContext } from 'react'
import { sendEmail } from '../services/email.js'
import { LanguageContext } from '../components/Header.jsx'
import { translations } from '../data/translations.js'
import ContactFeedback from '../components/ContactFeedback.jsx'

const InfoText = styled.p`
  color: ${({ theme }) => theme.muted};
  margin: 0 0 24px;
  max-width: 620px;
  line-height: 1.7;
  text-align: center;
`

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [feedbackVisible, setFeedbackVisible] = useState(false)
  const [sending, setSending] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const { lang } = useContext(LanguageContext) || { lang: 'pt' }
  const t = translations[lang]

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
      setErrorMsg(
        lang === 'pt'
          ? 'Não foi possível enviar sua mensagem. Tente novamente mais tarde.'
          : 'Could not send your message. Please try again later.'
      )
      setFeedbackVisible(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <Section className="fade-in" id="contato">
      <Title>{t.contact}</Title>
      <InfoText>
        {lang === 'pt'
          ? 'Entre em contato para dúvidas, sugestões ou oportunidades.'
          : 'Get in touch for questions, suggestions or opportunities.'}
      </InfoText>
      <Grid>
        <Card>
          <form onSubmit={handleSubmit} autoComplete="off">
            <Label htmlFor="name">{lang === 'pt' ? 'Nome' : 'Name'}</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder={lang === 'pt' ? 'Seu nome' : 'Your name'}
              autoComplete="name"
            />
            <Label htmlFor="email">{lang === 'pt' ? 'Email' : 'Email'}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={lang === 'pt' ? 'seu@email.com' : 'your@email.com'}
              autoComplete="email"
            />
            <Label htmlFor="message">{lang === 'pt' ? 'Mensagem' : 'Message'}</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder={lang === 'pt' ? 'Como posso ajudar?' : 'How can I help?'}
              autoComplete="off"
            />
            <Button type="submit" disabled={sending}>
              {sending
                ? lang === 'pt'
                  ? 'Enviando...'
                  : 'Sending...'
                : lang === 'pt'
                  ? 'Enviar'
                  : 'Send'}
            </Button>
          </form>
          <Suspense fallback={null}>
            {feedbackVisible && <ContactFeedback errorMsg={errorMsg} lang={lang} />}
          </Suspense>
        </Card>
      </Grid>
    </Section>
  )
}

const Section = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 112px 24px 48px;
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h2`
  margin: 0 0 12px 0;
  font-size: clamp(2.1rem, 3vw, 3.4rem);
  letter-spacing: -0.06em;
  font-weight: 700;
  text-align: center;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  width: 100%;
  max-width: 720px;
  justify-items: center;
`

const Card = styled.div`
  background: rgba(255,255,255,0.06);
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 28px;
  width: 100%;
  transition: transform 0.15s ease, border-color 0.2s ease;
  &:hover {
    border-color: ${({ theme }) => theme.accent};
    transform: translateY(-1px);
  }
`

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.muted};
  font-weight: 600;
`

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.border};
  background: rgba(15, 23, 42, 0.03);
  color: ${({ theme }) => theme.text};
  margin-bottom: 14px;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.08);
  }
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 14px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.border};
  background: rgba(15, 23, 42, 0.03);
  color: ${({ theme }) => theme.text};
  margin-bottom: 14px;
  min-height: 140px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.08);
  }
`

const Button = styled.button`
  background: ${({ theme }) => theme.accent};
  color: #fff;
  padding: 12px 18px;
  border: 0;
  border-radius: 5px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
  &:hover {
    transform: translateY(-1px);
    opacity: 0.96;
  }
  &:disabled {
    cursor: wait;
    opacity: 0.65;
  }
`
