import { useState, useMemo } from 'react'
import ConceptsTable from '../components/invoice/ConceptsTable'
import TotalsPanel from '../components/invoice/TotalsPanel'

const TAX_CONFIG = {
  '21_iva':  { vatRate: 21, retentionRate: 0 },
  '10_iva':  { vatRate: 10, retentionRate: 0 },
  '4_iva':   { vatRate: 4,  retentionRate: 0 },
  'exento':  { vatRate: 0,  retentionRate: 0 },
  '7_ret':   { vatRate: 21, retentionRate: 7 },
  '15_ret':  { vatRate: 21, retentionRate: 15 },
}

const SERIES_OPTIONS = ['F-2024', 'F-2025', 'F-2026', 'PRO-2026', 'REC-2026']

let nextId = 2

function emptyLine() {
  return { id: nextId++, description: '', quantity: 1, unitPrice: 0, taxRate: '21_iva' }
}

export default function CreateInvoice({ onBack }) {
  const [invoiceSeries, setInvoiceSeries] = useState('F-2026')
  const [client, setClient] = useState({ search: '', fullName: '', taxId: '' })
  const [lines, setLines] = useState([
    { id: 1, description: '', quantity: 1, unitPrice: 0, taxRate: '21_iva' },
  ])
  const [paymentMethod, setPaymentMethod] = useState('transfer')
  const [dueDate, setDueDate] = useState('')
  const [sendEmailCopy, setSendEmailCopy] = useState(false)

  const totals = useMemo(() => {
    let subtotal = 0
    let vatAmount = 0
    let retentionAmount = 0

    for (const line of lines) {
      const qty = parseFloat(line.quantity) || 0
      const price = parseFloat(line.unitPrice) || 0
      const lineSubtotal = qty * price
      const { vatRate, retentionRate } = TAX_CONFIG[line.taxRate] ?? { vatRate: 0, retentionRate: 0 }

      subtotal += lineSubtotal
      vatAmount += lineSubtotal * (vatRate / 100)
      retentionAmount += lineSubtotal * (retentionRate / 100)
    }

    return {
      subtotal,
      vatAmount,
      retentionAmount,
      total: subtotal + vatAmount - retentionAmount,
    }
  }, [lines])

  function handleLineChange(id, field, value) {
    setLines((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    )
  }

  function handleAddLine() {
    setLines((prev) => [...prev, emptyLine()])
  }

  function handleRemoveLine(id) {
    setLines((prev) => (prev.length > 1 ? prev.filter((l) => l.id !== id) : prev))
  }

  function handleClientChange(field, value) {
    setClient((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Page header */}
      <div className="bg-white border-b border-slate-200 flex-shrink-0">
        <div className="max-w-screen-xl mx-auto px-6 h-14 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <h1 className="text-base font-bold text-slate-800 flex-1">Nueva Factura</h1>

          <select
            value={invoiceSeries}
            onChange={(e) => setInvoiceSeries(e.target.value)}
            className="text-sm text-slate-700 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white font-medium"
          >
            {SERIES_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 max-w-screen-xl mx-auto w-full px-6 py-6 pb-24">
        <div className="grid grid-cols-12 gap-6">
          {/* Left column */}
          <div className="col-span-8 space-y-5">
            {/* Client section */}
            <div className="bg-white rounded-xl border border-slate-200 px-5 py-4">
              <h2 className="text-sm font-semibold text-slate-700 mb-4">Cliente</h2>

              {/* Search */}
              <div className="relative mb-4">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
                </svg>
                <input
                  type="text"
                  value={client.search}
                  onChange={(e) => handleClientChange('search', e.target.value)}
                  placeholder="Buscar cliente existente..."
                  className="w-full pl-9 pr-4 py-2 text-sm text-slate-700 border border-slate-200 rounded-lg placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Client fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">
                    Razón Social
                  </label>
                  <input
                    type="text"
                    value={client.fullName}
                    onChange={(e) => handleClientChange('fullName', e.target.value)}
                    placeholder="Empresa S.L."
                    className="w-full text-sm text-slate-700 border border-slate-200 rounded-lg px-3 py-2 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">
                    CIF / NIF
                  </label>
                  <input
                    type="text"
                    value={client.taxId}
                    onChange={(e) => handleClientChange('taxId', e.target.value)}
                    placeholder="B12345678"
                    className="w-full text-sm text-slate-700 border border-slate-200 rounded-lg px-3 py-2 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Concepts table */}
            <ConceptsTable
              lines={lines}
              onLineChange={handleLineChange}
              onAddLine={handleAddLine}
              onRemoveLine={handleRemoveLine}
            />
          </div>

          {/* Right column */}
          <div className="col-span-4">
            <TotalsPanel
              subtotal={totals.subtotal}
              vatAmount={totals.vatAmount}
              retentionAmount={totals.retentionAmount}
              total={totals.total}
              paymentMethod={paymentMethod}
              dueDate={dueDate}
              sendEmailCopy={sendEmailCopy}
              onPaymentMethodChange={setPaymentMethod}
              onDueDateChange={setDueDate}
              onSendEmailCopyChange={setSendEmailCopy}
            />
          </div>
        </div>
      </main>

      {/* Sticky footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-10">
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
          <p className="text-xs text-slate-400 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
            </svg>
            Guardado automáticamente
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="text-sm font-medium text-slate-500 hover:text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button className="text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-lg transition-colors">
              Guardar Borrador
            </button>
            <button className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors">
              Finalizar Factura
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
