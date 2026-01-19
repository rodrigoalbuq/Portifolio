import emailjs from '@emailjs/browser'

export async function sendEmail({ name, email, message }) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  // Se EmailJS estiver configurado, utilize-o
  if (serviceId && templateId && publicKey) {
    const templateParams = {
      from_name: name,
      from_email: email,
      message,
      subject: `Contato via portfólio - ${name}`,
    }
    return emailjs.send(serviceId, templateId, templateParams, { publicKey })
  }

  // Fallback sem configuração: FormSubmit (envia para o email do portfólio)
  const recipient = import.meta.env.VITE_FALLBACK_RECIPIENT || 'rodrigoalvalbq@gmail.com'
  try {
    const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `Contato via portfólio - ${name}`,
        _replyto: email,
        _captcha: false,
        _template: 'table',
      }),
    })

    const data = await res.json().catch(() => ({}))
    if (!res.ok || (data && data.success !== 'true')) {
      throw new Error('SEND_FAILED')
    }
    return data
  } catch (_err) {
    throw new Error('SEND_FAILED')
  }
}
