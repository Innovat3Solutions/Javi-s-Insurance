import { Navbar, Footer } from '../components/Layout';
import { useLanguage } from '../i18n';

const copy = {
  en: {
    title: 'Terms of Service',
    lastUpdated: 'July 13, 2026',
    intro:
      "These Terms of Service (the \"Terms\") govern your access to and use of the website and services offered by Javi's Insurance Services (\"we,\" \"us,\" or \"our\"). Please read these Terms carefully before using our website. By using this site, you acknowledge that you have read, understood, and agree to be bound by the Terms set out below.",
    sections: [
      {
        heading: 'Acceptance of Terms',
        body: [
          'By accessing or using this website, you agree to be bound by these Terms and by all applicable laws and regulations. If you do not agree with any part of these Terms, you must not access or use this website.',
          'We reserve the right to modify these Terms at any time. Your continued use of the website following the posting of any changes constitutes your acceptance of those changes.',
        ],
      },
      {
        heading: 'About Our Services',
        body: [
          "Javi's Insurance Services is a licensed independent insurance agency. We help individuals and families compare and enroll in health, Medicare, Medicaid, ACA/Marketplace, dental, vision, auto, home, and commercial insurance products.",
          'Our assistance is free to you. As a licensed agency, we are compensated by the insurance carriers when you enroll in a plan, and you pay the same rates as you would by going directly to the carrier or to a government program. Using our services does not add any cost to your premium.',
          'We do not buy, sell, or trade sales leads, and we do not operate an affiliate lead-generation program. The information you provide to us is used solely to help you review your insurance options and to service your inquiry.',
        ],
      },
      {
        heading: 'No Government Affiliation',
        body: [
          'We are not affiliated with, connected to, or endorsed by any federal, state, or local government agency, including but not limited to HealthCare.gov, the Centers for Medicare & Medicaid Services (CMS), Medicare, or Medicaid.',
          'Any references to government programs are provided for informational purposes only. For official information about government programs, please contact the applicable agency directly.',
        ],
      },
      {
        heading: 'Communications & Text Messaging Consent',
        body: [
          'By submitting a form on our website and opting in, you consent to be contacted by Javi\'s Insurance Services by phone, email, and SMS/text message regarding your inquiry, quote request, or existing coverage. This may include calls or messages placed using automated technology.',
          'Message frequency varies. Message and data rates may apply. You can reply STOP at any time to opt out of text messages, or reply HELP for assistance. Your consent to receive marketing or informational messages is not a condition of purchasing any product or service.',
          'No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.',
        ],
      },
      {
        heading: 'Eligibility & Accurate Information',
        body: [
          'You must be at least 18 years of age to use this website and to request quotes or enrollment assistance.',
          'You agree to provide accurate, current, and complete information when you contact us or submit a form. Providing inaccurate information may affect your eligibility for coverage or the accuracy of any quote we provide.',
        ],
      },
      {
        heading: 'Intellectual Property',
        body: [
          "All content on this website, including text, graphics, logos, images, and design, is the property of Javi's Insurance Services or its licensors and is protected by applicable intellectual property laws.",
          'You may not copy, reproduce, distribute, or create derivative works from any content on this website without our prior written permission.',
        ],
      },
      {
        heading: 'Insurance Disclaimers',
        body: [
          'The content on this website is provided for general informational purposes only and is not a complete description of the benefits, terms, conditions, exclusions, or limitations of any insurance plan.',
          'Plans, pricing, and availability vary by state, age, and other factors, and are subject to change. Nothing on this website constitutes an offer of coverage or a guarantee of eligibility.',
          'For advice tailored to your individual situation, please consult one of our licensed agents. Only the official plan documents issued by the insurance carrier govern the actual terms of your coverage.',
        ],
      },
      {
        heading: 'Third-Party Links & Services',
        body: [
          'Our website may contain links to third-party websites, such as HealthCare.gov, and may use third-party tools and services, including an embedded LeadConnector chat widget.',
          'We do not control and are not responsible for the content, privacy practices, or availability of any third-party sites or services. Accessing third-party websites or using third-party tools is done at your own risk and subject to their own terms and policies.',
        ],
      },
      {
        heading: 'Limitation of Liability',
        body: [
          'This website and our services are provided on an "as is" and "as available" basis, without warranties of any kind, whether express or implied.',
          'To the fullest extent permitted by law, Javi\'s Insurance Services shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of, or inability to use, this website or our services.',
        ],
      },
      {
        heading: 'Governing Law',
        body: [
          'These Terms are governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law principles.',
          'Any dispute arising out of or relating to these Terms or your use of the website shall be subject to the exclusive jurisdiction of the courts located in the State of Florida.',
        ],
      },
      {
        heading: 'Changes to These Terms',
        body: [
          'We may update or revise these Terms from time to time to reflect changes in our services, technology, or applicable law.',
          'When we make changes, we will update the "Last updated" date at the top of this page. Your continued use of the website after any changes take effect constitutes your acceptance of the revised Terms.',
        ],
      },
      {
        heading: 'Contact Us',
        body: [
          'If you have any questions about these Terms, please contact us. Javi\'s Insurance Services is licensed in Florida and Texas.',
          'Address: 12518 SW 88th Street, Miami, FL 33186',
          'Email: info@javisservices.com',
          'Phone: (305) 390-8679',
          'WhatsApp: (786) 689-8528',
        ],
      },
    ],
  },
  es: {
    title: 'Términos de Servicio',
    lastUpdated: '13 de julio de 2026',
    intro:
      'Estos Términos de Servicio (los "Términos") rigen su acceso y uso del sitio web y los servicios ofrecidos por Javi\'s Insurance Services ("nosotros" o "nuestro"). Lea atentamente estos Términos antes de utilizar nuestro sitio web. Al utilizar este sitio, usted reconoce que ha leído, comprendido y acepta quedar obligado por los Términos que se establecen a continuación.',
    sections: [
      {
        heading: 'Aceptación de los Términos',
        body: [
          'Al acceder o utilizar este sitio web, usted acepta quedar obligado por estos Términos y por todas las leyes y reglamentos aplicables. Si no está de acuerdo con alguna parte de estos Términos, no debe acceder ni utilizar este sitio web.',
          'Nos reservamos el derecho de modificar estos Términos en cualquier momento. El uso continuado del sitio web tras la publicación de cualquier cambio constituye su aceptación de dichos cambios.',
        ],
      },
      {
        heading: 'Acerca de Nuestros Servicios',
        body: [
          'Javi\'s Insurance Services es una agencia de seguros independiente con licencia. Ayudamos a personas y familias a comparar e inscribirse en productos de seguro de salud, Medicare, Medicaid, ACA/Marketplace, dental, visión, auto, hogar y comercial.',
          'Nuestra asistencia es gratuita para usted. Como agencia con licencia, las compañías de seguros nos compensan cuando usted se inscribe en un plan, y usted paga las mismas tarifas que pagaría si acudiera directamente a la compañía o a un programa gubernamental. Utilizar nuestros servicios no agrega ningún costo a su prima.',
          'No compramos, vendemos ni intercambiamos contactos de venta (leads), y no operamos un programa de afiliados de generación de contactos. La información que usted nos proporciona se utiliza únicamente para ayudarle a revisar sus opciones de seguro y para atender su consulta.',
        ],
      },
      {
        heading: 'Sin Afiliación Gubernamental',
        body: [
          'No estamos afiliados, conectados ni respaldados por ninguna agencia gubernamental federal, estatal o local, incluyendo, entre otros, HealthCare.gov, los Centros de Servicios de Medicare y Medicaid (CMS), Medicare o Medicaid.',
          'Cualquier referencia a programas gubernamentales se proporciona únicamente con fines informativos. Para obtener información oficial sobre programas gubernamentales, comuníquese directamente con la agencia correspondiente.',
        ],
      },
      {
        heading: 'Comunicaciones y Consentimiento para Mensajes de Texto',
        body: [
          'Al enviar un formulario en nuestro sitio web y dar su consentimiento, usted acepta ser contactado por Javi\'s Insurance Services por teléfono, correo electrónico y mensajes SMS/texto en relación con su consulta, solicitud de cotización o cobertura existente. Esto puede incluir llamadas o mensajes realizados mediante tecnología automatizada.',
          'La frecuencia de los mensajes varía. Pueden aplicarse tarifas de mensajes y datos. Puede responder STOP en cualquier momento para dejar de recibir mensajes de texto, o responder HELP para obtener ayuda. Su consentimiento para recibir mensajes de marketing o informativos no es una condición para comprar ningún producto o servicio.',
          'Ninguna información móvil será compartida con terceros/afiliados con fines de marketing/promocionales. Todas las demás categorías excluyen los datos de aceptación (opt-in) y el consentimiento del originador de mensajes de texto; esta información no será compartida con ningún tercero.',
        ],
      },
      {
        heading: 'Elegibilidad e Información Precisa',
        body: [
          'Usted debe tener al menos 18 años de edad para utilizar este sitio web y para solicitar cotizaciones o asistencia con la inscripción.',
          'Usted acepta proporcionar información precisa, actual y completa cuando nos contacte o envíe un formulario. Proporcionar información inexacta puede afectar su elegibilidad para la cobertura o la exactitud de cualquier cotización que le proporcionemos.',
        ],
      },
      {
        heading: 'Propiedad Intelectual',
        body: [
          'Todo el contenido de este sitio web, incluyendo textos, gráficos, logotipos, imágenes y diseño, es propiedad de Javi\'s Insurance Services o de sus licenciantes y está protegido por las leyes de propiedad intelectual aplicables.',
          'No puede copiar, reproducir, distribuir ni crear obras derivadas de ningún contenido de este sitio web sin nuestro permiso previo por escrito.',
        ],
      },
      {
        heading: 'Avisos Legales sobre Seguros',
        body: [
          'El contenido de este sitio web se proporciona únicamente con fines informativos generales y no constituye una descripción completa de los beneficios, términos, condiciones, exclusiones o limitaciones de ningún plan de seguro.',
          'Los planes, precios y disponibilidad varían según el estado, la edad y otros factores, y están sujetos a cambios. Nada en este sitio web constituye una oferta de cobertura ni una garantía de elegibilidad.',
          'Para obtener asesoramiento adaptado a su situación individual, consulte con uno de nuestros agentes con licencia. Solo los documentos oficiales del plan emitidos por la compañía de seguros rigen los términos reales de su cobertura.',
        ],
      },
      {
        heading: 'Enlaces y Servicios de Terceros',
        body: [
          'Nuestro sitio web puede contener enlaces a sitios web de terceros, como HealthCare.gov, y puede utilizar herramientas y servicios de terceros, incluyendo un widget de chat de LeadConnector integrado.',
          'No controlamos ni somos responsables del contenido, las prácticas de privacidad o la disponibilidad de ningún sitio o servicio de terceros. El acceso a sitios web de terceros o el uso de herramientas de terceros se realiza bajo su propio riesgo y está sujeto a sus propios términos y políticas.',
        ],
      },
      {
        heading: 'Limitación de Responsabilidad',
        body: [
          'Este sitio web y nuestros servicios se proporcionan "tal cual" y "según disponibilidad", sin garantías de ningún tipo, ya sean expresas o implícitas.',
          'En la máxima medida permitida por la ley, Javi\'s Insurance Services no será responsable de ningún daño indirecto, incidental, especial, consecuente o punitivo que surja de o esté relacionado con su uso, o la imposibilidad de uso, de este sitio web o de nuestros servicios.',
        ],
      },
      {
        heading: 'Ley Aplicable',
        body: [
          'Estos Términos se rigen e interpretan de acuerdo con las leyes del Estado de Florida, sin tener en cuenta sus principios de conflicto de leyes.',
          'Cualquier disputa que surja de o esté relacionada con estos Términos o con su uso del sitio web estará sujeta a la jurisdicción exclusiva de los tribunales ubicados en el Estado de Florida.',
        ],
      },
      {
        heading: 'Cambios en Estos Términos',
        body: [
          'Podemos actualizar o revisar estos Términos periódicamente para reflejar cambios en nuestros servicios, tecnología o leyes aplicables.',
          'Cuando realicemos cambios, actualizaremos la fecha de "Última actualización" en la parte superior de esta página. El uso continuado del sitio web después de que los cambios entren en vigor constituye su aceptación de los Términos revisados.',
        ],
      },
      {
        heading: 'Contáctenos',
        body: [
          'Si tiene alguna pregunta sobre estos Términos, comuníquese con nosotros. Javi\'s Insurance Services tiene licencia en Florida y Texas.',
          'Dirección: 12518 SW 88th Street, Miami, FL 33186',
          'Email: info@javisservices.com',
          'Phone: (305) 390-8679',
          'WhatsApp: (786) 689-8528',
        ],
      },
    ],
  },
};

export const TermsOfServicePage = () => {
  const { language } = useLanguage();
  const c = copy[language];

  return (
    <div className="min-h-screen bg-white font-sans text-text-main">
      <Navbar />
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-3 text-premium-heading">{c.title}</h1>
        <p className="text-sm text-text-muted mb-8">
          {language === 'es' ? 'Última actualización:' : 'Last updated:'} {c.lastUpdated}
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
      <Footer />
    </div>
  );
};
