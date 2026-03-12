const invoices = [
  { id: 'FAC-2026-042', client: 'Tech Solutions SL', amount: 2400.0, date: '08 Jun 2026', status: 'cobrada' },
  { id: 'FAC-2026-041', client: 'Distribuciones Pérez', amount: 1850.5, date: '05 Jun 2026', status: 'pendiente' },
  { id: 'FAC-2026-040', client: 'Consultoría Norte SA', amount: 3200.0, date: '02 Jun 2026', status: 'cobrada' },
  { id: 'FAC-2026-039', client: 'Servicios Digitales CB', amount: 960.0, date: '28 May 2026', status: 'vencida' },
  { id: 'FAC-2026-038', client: 'Inversiones del Sur SL', amount: 5500.0, date: '25 May 2026', status: 'pendiente' },
]

const statusConfig = {
  cobrada: { label: 'Cobrada', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  pendiente: { label: 'Pendiente', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  vencida: { label: 'Vencida', className: 'bg-rose-50 text-rose-700 border-rose-200' },
}

export default function RecentInvoices() {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div>
          <p className="text-sm font-semibold text-slate-800">Facturas Recientes</p>
          <p className="text-xs text-slate-400 mt-0.5">Últimas 5 facturas emitidas</p>
        </div>
        <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
          Ver todas →
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Nº Factura</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Cliente</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Fecha</th>
              <th className="text-right px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Importe</th>
              <th className="text-center px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Estado</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {invoices.map((inv) => {
              const { label, className } = statusConfig[inv.status]
              return (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-500">{inv.id}</td>
                  <td className="px-5 py-3.5 font-medium text-slate-700">{inv.client}</td>
                  <td className="px-5 py-3.5 text-slate-500 text-xs">{inv.date}</td>
                  <td className="px-5 py-3.5 text-right font-semibold text-slate-800">
                    {inv.amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${className}`}>
                      {label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
