'use client';

import { useState } from 'react';
import { COPY } from '@/lib/data';
import { generateWhatsAppMessage, getWhatsAppLink } from '@/lib/utils';
import { useCart } from '@/app/providers/CartProvider';
import type { CheckoutData } from '@/lib/types';

interface CheckoutModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CheckoutModal({ onClose, onSuccess }: CheckoutModalProps) {
  const { cart, clearCart } = useCart();
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
      alert('Por favor completa nombre y zona/colonia');
      return;
    }

    setIsSubmitting(true);

    const message = generateWhatsAppMessage(cart, formData, false);
    const whatsappLink = getWhatsAppLink(message);

    window.open(whatsappLink, '_blank');

    setTimeout(() => {
      clearCart();
      onSuccess();
      setIsSubmitting(false);
      alert(COPY.checkout.successMessage);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">{COPY.checkout.title}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 text-2xl leading-none">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              {COPY.checkout.name} *
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-redhog-red"
              placeholder="Tu nombre completo"
              required
            />
          </div>

          <div>
            <label htmlFor="zone" className="block text-sm font-semibold mb-2">
              {COPY.checkout.zone} *
            </label>
            <input
              id="zone"
              type="text"
              name="zone"
              value={formData.zone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-redhog-red"
              placeholder="Ej: Centro, Barrio Antiguo, etc."
              required
            />
          </div>

          <div>
            <label htmlFor="delivery" className="block text-sm font-semibold mb-2">
              {COPY.checkout.delivery} *
            </label>
            <select
              id="delivery"
              name="delivery"
              value={formData.delivery}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-redhog-red"
            >
              <option value="delivery">{COPY.checkout.deliveryOption1}</option>
              <option value="pickup">{COPY.checkout.deliveryOption2}</option>
            </select>
          </div>

          <div>
            <label htmlFor="comments" className="block text-sm font-semibold mb-2">
              {COPY.checkout.comments}
            </label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-redhog-red"
              placeholder="Instrucciones especiales, referencias, etc."
              rows={3}
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-800 whitespace-pre-line">{COPY.checkout.disclaimer}</p>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 btn btn-outline">
              Cancelar
            </button>
            <button type="submit" disabled={isSubmitting} className="flex-1 btn btn-primary">
              {isSubmitting ? 'Enviando...' : 'Enviar por WhatsApp'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
