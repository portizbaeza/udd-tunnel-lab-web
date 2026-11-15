// Endpoint del formulario de contacto. Corre como función serverless en Vercel.
// Variables de entorno (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY  API key de https://resend.com
//   CONTACT_FROM    remitente verificado en Resend (por defecto onboarding@resend.dev)
//   CONTACT_TO      destino (por defecto notaboringbicho@gmail.com)
import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export const POST: APIRoute = async ({ request }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json(400, { error: "Solicitud inválida." });
  }

  const get = (k: string) => String(form.get(k) ?? "").trim();
  // Campo trampa: si viene lleno es un bot. Respondemos OK sin enviar nada.
  if (get("web")) return json(200, { ok: true });

  const nombre = get("nombre").slice(0, 120);
  const email = get("email").slice(0, 160);
  const motivo = get("motivo").slice(0, 80) || "Contacto";
  const mensaje = get("mensaje").slice(0, 4000);

  if (!nombre || !mensaje || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(422, { error: "Faltan datos: nombre, un email válido y el mensaje." });
  }

  const apiKey = import.meta.env.RESEND_API_KEY ?? process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contacto] Falta RESEND_API_KEY");
    return json(503, { error: "El formulario aún no está configurado." });
  }

  const from = import.meta.env.CONTACT_FROM ?? process.env.CONTACT_FROM ?? "UDD Tunnel Lab <onboarding@resend.dev>";
  const to = import.meta.env.CONTACT_TO ?? process.env.CONTACT_TO ?? "notaboringbicho@gmail.com";

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[tunnel-lab.cl] ${motivo} — ${nombre}`,
      text: `Nombre / empresa: ${nombre}\nEmail: ${email}\nMotivo: ${motivo}\n\n${mensaje}`,
      html: `<p><strong>Nombre / empresa:</strong> ${escape(nombre)}<br><strong>Email:</strong> ${escape(email)}<br><strong>Motivo:</strong> ${escape(motivo)}</p><p style="white-space:pre-wrap">${escape(mensaje)}</p>`,
    });
    if (error) throw new Error(error.message);
    return json(200, { ok: true });
  } catch (err) {
    console.error("[contacto] Error al enviar:", err);
    return json(502, { error: "No se pudo enviar el mensaje en este momento." });
  }
};

export const ALL: APIRoute = () => json(405, { error: "Método no permitido." });
