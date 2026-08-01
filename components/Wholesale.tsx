'use client';

import { useState } from 'react';
import { COPY } from '@/lib/data';
import { generateWhatsAppMessage, getWhatsAppLink } from '@/lib/utils';
import type { CheckoutData } from '@/lib/types';

export default function Wholesale() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<CheckoutData>({
    name: '',
    zone: '',
    delivery: 'delivery',
    comments: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.zone.trim()) {
      alert('Por favor completa nombre y detalles del negocio');
      return;
    }

    setIsSubmitting(true);

    const message = generateWhatsAppMessage(
      { items: [], total: 0, totalJars: 0 },
      formData,
      true
    );
    const whatsappLink = getWhatsAppLink(message);

    window.open(whatsappLink, '_blank');

    setTimeout(() => {
      setShowForm(false);
      setFormData({ name: '', zone: '', delivery: 'delivery', comments: '' });
      setIsSubmitting(false);
      alert('Tu solicitud fue enviada. Un miembro de Red Hog se pondrá en contacto pronto.');
    }, 500);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-max">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div>
            <h2 className="headline mb-3">{COPY.wholesale.title}</h2>
            <p className="subheadline mb-4">{COPY.wholesale.subtitle}</p>
            <p className="text-gray-700 mb-6">{COPY.wholesale.description}</p>
          </div>

          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-primary btn-large"
            >
              {COPY.wholesale.cta}
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="bg-redhog-cream rounded-lg p-6 space-y-4">
              <div>
                <label htmlFor="ws-name" className="block text-sm font-semibold mb-2 text-left">
                  Nombre / Nombre del negocio *
                </label>
                <input
                  id="ws-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-redhog-red"
                  placeholder="Tu nombre o nombre del negocio"
                  required
                />
              </div>

              <div>
                <label htmlFor="ws-zone" className="block text-sm font-semibold mb-2 text-left">
                  Tipo de negocio *
                </label>
                <input
                  id="ws-zone"
                  type="text"
                  name="zone"
                  value={formData.zone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-redhog-red"
                  placeholder="Ej: Restaurante, Taquería, Tienda, etc."
                  required
                />
              </div>

              <div>
                <label htmlFor="ws-comments" className="block text-sm font-semibold mb-2 text-left">
                  Detalles sobre tu solicitud
                </label>
                <textarea
                  id="ws-comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-redhog-red"
                  placeholder="Volumen aproximado, ubicación, ideas especiales..."
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 btn btn-outline"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 btn btn-primary"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
