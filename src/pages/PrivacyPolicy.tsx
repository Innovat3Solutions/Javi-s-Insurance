import { Navbar, Footer } from '../components/Layout';
import { useLanguage } from '../i18n';

type Section = { heading: string; body: string[] };

const copy = {
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'June 16, 2026',
    intro:
      "Javi's Insurance Services (“we,” “us,” or “our”) respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains what information we collect, how we use and share it, and the choices you have. It applies to our website, our online forms, and the phone, email, and text communications you have with our licensed agents. By using our website or contacting us, you agree to the practices described in this policy.",
    sections: [
      {
        heading: 'Information We Collect',
        body: [
          'We collect personal information that you voluntarily provide to us when you complete a form on our website, request a quote, or contact us for assistance. This information may include your first and last name, phone number, email address, ZIP code or county, household size and income range, and your coverage preferences and eligibility details. We collect this information so that our licensed agents can understand your needs and help you find appropriate insurance coverage.',
          'We also automatically collect certain usage data when you visit our website. This may include your IP address, browser type, device information, and the pages you view. This information is gathered through cookies and analytics tools and helps us understand how visitors use our site so we can improve it.',
        ],
      },
      {
        heading: 'How We Use Your Information',
        body: [
          'We use the information we collect to respond to your inquiries, provide insurance quotes, and offer enrollment assistance. We may contact you by phone, email, or text message to discuss coverage options that may fit your needs.',
          'We also use your information to comply with our legal and regulatory obligations as a licensed insurance agency and to operate, maintain, and improve our website and services.',
        ],
      },
      {
        heading: 'SMS / Text Messaging & Phone Communications',
        body: [
          "By providing your phone number and opting in through our forms, you consent to receive calls and SMS/text messages from Javi's Insurance Services regarding your insurance inquiry and coverage options.",
          'Message frequency varies. Message and data rates may apply. You can opt out at any time by replying STOP; reply HELP for assistance.',
          'Consent to receive messages is not a condition of any purchase. Carriers are not liable for delayed or undelivered messages.',
        ],
      },
      {
        heading: 'Mobile Information & Third-Party Sharing',
        body: [
          'No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Information sharing to subcontractors in support services, such as customer service, is permitted. All other use case categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.',
        ],
      },
      {
        heading: 'How We Share Information',
        body: [
          'We do not sell your personal information. We do not buy, sell, or trade sales leads.',
          'We share your information only with the licensed insurance carriers and plans you ask us to obtain quotes from, and with service providers (for example, our CRM and customer-service tools) that are bound by confidentiality obligations. In every case, we share information solely to serve your request.',
        ],
      },
      {
        heading: 'Data Security',
        body: [
          'We maintain reasonable administrative and technical safeguards designed to protect your personal information, including SSL encryption for data transmitted through our website.',
          'While we take these measures seriously, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.',
        ],
      },
      {
        heading: 'Cookies & Website Widgets',
        body: [
          'We use cookies and analytics tools to understand how visitors interact with our website and to improve our services. You can control cookies through your browser settings.',
          'Our website also includes an embedded chat widget (LeadConnector) that allows us to respond to your inquiries directly on the site.',
        ],
      },
      {
        heading: 'Your Rights & Choices',
        body: [
          'You may opt out of our communications at any time by replying STOP to a text message or by contacting us directly.',
          'You may also request access to the personal information we hold about you or request that we delete it. To make such a request, please contact us using the information provided below.',
        ],
      },
      {
        heading: "Children's Privacy",
        body: [
          'Our services are not directed to children under the age of 18, and our website is not intended for children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us so we can remove it.',
        ],
      },
      {
        heading: 'Changes to This Policy',
        body: [
          'We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. When we do, we will post the updated policy on this page and revise the “Last updated” date above.',
        ],
      },
      {
        heading: 'Contact Us',
        body: [
          "If you have any questions about this Privacy Policy or our privacy practices, please contact Javi's Insurance Services, licensed in Florida and Texas.",
          'Address: 12518 SW 88th Street, Miami, FL 33186',
          'Email: info@javisservices.com. Phone: (305) 390-8679. WhatsApp: (786) 689-8528.',
        ],
      },
    ] as Section[],
  },
  es: {
    title: 'Política de Privacidad',
    lastUpdated: '16 de junio de 2026',
    intro:
      "Javi's Insurance Services (“nosotros” o “nuestro”) respeta su privacidad y se compromete a proteger la información personal que usted comparte con nosotros. Esta Política de Privacidad explica qué información recopilamos, cómo la usamos y compartimos, y las opciones que usted tiene. Se aplica a nuestro sitio web, a nuestros formularios en línea y a las comunicaciones por teléfono, correo electrónico y mensajes de texto que usted mantenga con nuestros agentes licenciados. Al utilizar nuestro sitio web o comunicarse con nosotros, usted acepta las prácticas descritas en esta política.",
    sections: [
      {
        heading: 'Información que Recopilamos',
        body: [
          'Recopilamos la información personal que usted nos proporciona voluntariamente cuando completa un formulario en nuestro sitio web, solicita una cotización o se comunica con nosotros para obtener asistencia. Esta información puede incluir su nombre y apellido, número de teléfono, dirección de correo electrónico, código postal o condado, tamaño del hogar y rango de ingresos, así como sus preferencias de cobertura y detalles de elegibilidad. Recopilamos esta información para que nuestros agentes licenciados puedan comprender sus necesidades y ayudarle a encontrar la cobertura de seguro adecuada.',
          'También recopilamos automáticamente ciertos datos de uso cuando usted visita nuestro sitio web. Estos pueden incluir su dirección IP, tipo de navegador, información del dispositivo y las páginas que visualiza. Esta información se recopila mediante cookies y herramientas de análisis, y nos ayuda a comprender cómo utilizan los visitantes nuestro sitio para poder mejorarlo.',
        ],
      },
      {
        heading: 'Cómo Usamos su Información',
        body: [
          'Usamos la información que recopilamos para responder a sus consultas, proporcionar cotizaciones de seguros y ofrecer asistencia con la inscripción. Podemos comunicarnos con usted por teléfono, correo electrónico o mensaje de texto para conversar sobre las opciones de cobertura que puedan ajustarse a sus necesidades.',
          'También usamos su información para cumplir con nuestras obligaciones legales y regulatorias como agencia de seguros licenciada, y para operar, mantener y mejorar nuestro sitio web y nuestros servicios.',
        ],
      },
      {
        heading: 'SMS / Mensajes de Texto y Comunicaciones Telefónicas',
        body: [
          "Al proporcionar su número de teléfono y dar su consentimiento a través de nuestros formularios, usted acepta recibir llamadas y mensajes SMS/de texto de Javi's Insurance Services en relación con su consulta de seguro y sus opciones de cobertura.",
          'La frecuencia de los mensajes puede variar. Pueden aplicarse tarifas de mensajes y datos. Usted puede darse de baja en cualquier momento respondiendo STOP; responda HELP para obtener ayuda.',
          'El consentimiento para recibir mensajes no es una condición para ninguna compra. Los operadores (carriers) no son responsables de los mensajes retrasados o no entregados.',
        ],
      },
      {
        heading: 'Información Móvil y Divulgación a Terceros',
        body: [
          'Ninguna información móvil será compartida con terceros ni afiliados con fines de marketing o promocionales. Se permite compartir información con subcontratistas que brindan servicios de soporte, tales como el servicio al cliente. Todas las demás categorías de casos de uso excluyen los datos de aceptación (opt-in) y el consentimiento del originador de mensajes de texto; esta información no será compartida con ningún tercero.',
        ],
      },
      {
        heading: 'Cómo Compartimos la Información',
        body: [
          'No vendemos su información personal. No compramos, vendemos ni intercambiamos contactos de ventas (leads).',
          'Compartimos su información únicamente con las aseguradoras y los planes licenciados a los que usted nos pide que solicitemos cotizaciones, y con proveedores de servicios (por ejemplo, nuestras herramientas de CRM y servicio al cliente) que están obligados por acuerdos de confidencialidad. En todos los casos, compartimos la información únicamente para atender su solicitud.',
        ],
      },
      {
        heading: 'Seguridad de los Datos',
        body: [
          'Mantenemos salvaguardas administrativas y técnicas razonables diseñadas para proteger su información personal, incluida la encriptación SSL para los datos transmitidos a través de nuestro sitio web.',
          'Si bien tomamos estas medidas con seriedad, tenga en cuenta que ningún método de transmisión por internet ni de almacenamiento electrónico es 100% seguro, y no podemos garantizar una seguridad absoluta.',
        ],
      },
      {
        heading: 'Cookies y Widgets del Sitio Web',
        body: [
          'Usamos cookies y herramientas de análisis para comprender cómo interactúan los visitantes con nuestro sitio web y para mejorar nuestros servicios. Usted puede controlar las cookies a través de la configuración de su navegador.',
          'Nuestro sitio web también incluye un widget de chat integrado (LeadConnector) que nos permite responder a sus consultas directamente en el sitio.',
        ],
      },
      {
        heading: 'Sus Derechos y Opciones',
        body: [
          'Usted puede darse de baja de nuestras comunicaciones en cualquier momento respondiendo STOP a un mensaje de texto o comunicándose directamente con nosotros.',
          'También puede solicitar acceso a la información personal que tenemos sobre usted o solicitar que la eliminemos. Para realizar dicha solicitud, comuníquese con nosotros utilizando la información que se proporciona a continuación.',
        ],
      },
      {
        heading: 'Privacidad de los Niños',
        body: [
          'Nuestros servicios no están dirigidos a menores de 18 años, y nuestro sitio web no está destinado a menores de 13 años. No recopilamos de manera consciente información personal de niños. Si usted cree que un niño nos ha proporcionado información personal, comuníquese con nosotros para que podamos eliminarla.',
        ],
      },
      {
        heading: 'Cambios a Esta Política',
        body: [
          'Podemos actualizar esta Política de Privacidad ocasionalmente para reflejar cambios en nuestras prácticas o por razones legales, operativas o regulatorias. Cuando lo hagamos, publicaremos la política actualizada en esta página y revisaremos la fecha de “Última actualización” indicada arriba.',
        ],
      },
      {
        heading: 'Contáctenos',
        body: [
          "Si tiene alguna pregunta sobre esta Política de Privacidad o sobre nuestras prácticas de privacidad, comuníquese con Javi's Insurance Services, con licencia en Florida y Texas.",
          'Dirección: 12518 SW 88th Street, Miami, FL 33186',
          'Correo electrónico: info@javisservices.com. Teléfono: (305) 390-8679. WhatsApp: (786) 689-8528.',
        ],
      },
    ] as Section[],
  },
};

export const PrivacyPolicyPage = () => {
  const { language } = useLanguage();
  const c = copy[language];

  return (
    <div className="min-h-screen bg-white font-sans text-text-main">
      <Navbar />
      <main>
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold mb-3 text-premium-heading">{c.title}</h1>
          <p className="text-text-muted mb-8">
            {language === 'es' ? 'Última actualización' : 'Last updated'}: {c.lastUpdated}
          </p>
          <p className="text-text-muted leading-relaxed mb-4">{c.intro}</p>

          {c.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-2xl font-bold mt-10 mb-3 text-text-main">{section.heading}</h2>
              {section.body.map((paragraph, i) => (
                <p key={i} className="text-text-muted leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};
