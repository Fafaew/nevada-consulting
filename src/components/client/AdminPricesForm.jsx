'use client';

import { useState } from 'react';

export default function AdminPricesForm({ initialPrices, serviceItems }) {
  const [prices, setPrices] = useState(
    initialPrices.map((p) => ({
      ...p,
      priceBrl: p.priceBrl.toString(),
      priceUsd: p.priceUsd?.toString() ?? '',
    })),
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  function getServiceName(slug) {
    return serviceItems.find((s) => s.slug === slug)?.name?.pt ?? slug;
  }

  function handleChange(slug, field, value) {
    setPrices((prev) =>
      prev.map((p) => (p.slug === slug ? { ...p, [field]: value } : p)),
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/prices', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prices }),
      });

      if (res.ok) {
        setMessage({
          type: 'success',
          text: 'Preços atualizados com sucesso!',
        });
      } else {
        const data = await res.json();
        setMessage({ type: 'error', text: data.error ?? 'Erro ao salvar.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Erro de conexão.' });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
      {prices.map((p) => (
        <div key={p.slug} className='bg-[#1a1a1a] rounded-2xl px-6 py-5'>
          <p className='font-semibold text-white mb-4'>
            {getServiceName(p.slug)}
          </p>
          <div className='flex flex-col sm:flex-row gap-4'>
            <label className='flex flex-col gap-1 flex-1'>
              <span className='text-gray-400 text-sm'>Preço BRL (R$)</span>
              <input
                type='number'
                min='0'
                step='0.01'
                value={p.priceBrl}
                onChange={(e) =>
                  handleChange(p.slug, 'priceBrl', e.target.value)
                }
                className='bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500'
                required
              />
            </label>
            <label className='flex flex-col gap-1 flex-1'>
              <span className='text-gray-400 text-sm'>
                Preço USD ($) — opcional
              </span>
              <input
                type='number'
                min='0'
                step='0.01'
                value={p.priceUsd}
                onChange={(e) =>
                  handleChange(p.slug, 'priceUsd', e.target.value)
                }
                className='bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500'
              />
            </label>
          </div>
        </div>
      ))}

      {message && (
        <p
          className={`text-sm font-medium ${
            message.type === 'success' ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {message.text}
        </p>
      )}

      <button
        type='submit'
        disabled={saving}
        className='self-start bg-purple-600 hover:bg-purple-700 disabled:opacity-50 transition-colors text-white font-semibold px-8 py-3 rounded-full text-sm'
      >
        {saving ? 'Salvando...' : 'Salvar preços'}
      </button>
    </form>
  );
}
