const PAYMENT_METHODS = [
  { value: 'transfer', label: 'Transferencia bancaria' },
  { value: 'cash', label: 'Efectivo' },
  { value: 'card', label: 'Tarjeta' },
  { value: 'direct_debit', label: 'Domiciliación bancaria' },
]

export default function TotalsPanel({
  subtotal,
  vatAmount,
  retentionAmount,
  total,
  paymentMethod,
  dueDate,
  sendEmailCopy,
  onPaymentMethodChange,
  onDueDateChange,
  onSendEmailCopyChange,
}) {
  const fmt = (n) =>
    n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="sticky top-24">
      {/* Totals — dark header */}
      <div className="rounded-xl overflow-hidden border border-slate-200">
        <div className="bg-slate-900 px-5 py-4 space-y-3">
          <div className="flex justify-between text-sm text-slate-300">
            <span>Subtotal</span>
            <span>{fmt(subtotal)} €</span>
          </div>
          <div className="flex justify-between text-sm text-slate-300">
            <span>Cuota IVA</span>
            <span>+{fmt(vatAmount)} €</span>
          </div>
          {retentionAmount > 0 && (
            <div className="flex justify-between text-sm text-slate-300">
              <span>Retención IRPF</span>
              <span>−{fmt(retentionAmount)} €</span>
            </div>
          )}
          <div className="border-t border-slate-700 pt-3 flex justify-between items-baseline">
            <span className="text-white font-semibold text-sm">Total Final</span>
            <span className="text-white font-bold text-xl">{fmt(total)} €</span>
          </div>
        </div>

        {/* Payment details — light body */}
        <div className="bg-white px-5 py-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">
              Método de Pago
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => onPaymentMethodChange(e.target.value)}
              className="w-full text-sm text-slate-700 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
            >
              {PAYMENT_METHODS.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">
              Fecha de Vencimiento
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => onDueDateChange(e.target.value)}
              className="w-full text-sm text-slate-700 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={sendEmailCopy}
              onChange={(e) => onSendEmailCopyChange(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-slate-600">Enviar copia por email</span>
          </label>

          {/* File drop zone */}
          <div className="border-2 border-dashed border-slate-200 rounded-lg px-4 py-5 text-center hover:border-indigo-400 hover:bg-indigo-50 transition-colors cursor-pointer group">
            <svg className="w-6 h-6 text-slate-300 group-hover:text-indigo-400 mx-auto mb-2 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            <p className="text-xs text-slate-400 group-hover:text-indigo-500 transition-colors">
              Adjuntar archivo
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
