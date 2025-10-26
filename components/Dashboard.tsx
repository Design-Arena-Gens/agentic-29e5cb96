"use client";
import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { VulnerabilityTab } from './VulnerabilityTab';
import { ProjectPortfolioTab } from './ProjectPortfolioTab';
import { ReportingTab } from './ReportingTab';

const TABS = [
  { id: 'vuln', label: 'Vulnerability Management' },
  { id: 'portfolio', label: 'Project Portfolio' },
  { id: 'reporting', label: 'Reporting' },
] as const;

type TabId = typeof TABS[number]['id'];

export function Dashboard() {
  const [active, setActive] = useState<TabId>('vuln');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSidebarOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <aside aria-label="Sidebar" className={classNames(
        'fixed inset-y-0 left-0 z-40 w-72 transform bg-white shadow lg:static lg:translate-x-0 lg:shadow-none',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-4">
          <div aria-hidden className="h-8 w-8 rounded bg-brand-600" />
          <span className="text-lg font-semibold">Dependency-Track</span>
        </div>
        <nav className="p-2" aria-label="Primary">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={classNames('w-full rounded-md px-3 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600',
                active === t.id ? 'bg-brand-50 text-brand-800' : 'hover:bg-slate-50')}
              aria-current={active === t.id ? 'page' : undefined}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="lg:col-start-2">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 shadow-header" role="banner">
          <div className="flex items-center gap-2">
            <button className="lg:hidden btn" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"/></svg>
            </button>
            <h1 className="text-xl font-semibold">OWASP Dependency-Track Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <input aria-label="Search" placeholder="Search projects, CVEs..." className="h-9 w-56 rounded-md border border-slate-300 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600" />
            <div className="flex items-center gap-2">
              <span className="sr-only">User profile</span>
              <div className="h-8 w-8 rounded-full bg-slate-300" aria-hidden />
              <span className="text-sm text-slate-700" aria-hidden>j.doe</span>
            </div>
          </div>
        </header>

        <main className="p-4" id="main" role="main">
          <div className="mb-3 flex items-center gap-2" role="tablist" aria-label="Dashboard sections">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={active === t.id}
                aria-controls={`panel-${t.id}`}
                id={`tab-${t.id}`}
                className={classNames('rounded-md px-3 py-2 text-sm font-medium', active === t.id ? 'bg-brand-600 text-white' : 'bg-white text-slate-900 border border-slate-300 hover:bg-slate-50')}
                onClick={() => setActive(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <section
            id="panel-vuln"
            role="tabpanel"
            aria-labelledby="tab-vuln"
            hidden={active !== 'vuln'}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            <VulnerabilityTab />
          </section>

          <section
            id="panel-portfolio"
            role="tabpanel"
            aria-labelledby="tab-portfolio"
            hidden={active !== 'portfolio'}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            <ProjectPortfolioTab />
          </section>

          <section
            id="panel-reporting"
            role="tabpanel"
            aria-labelledby="tab-reporting"
            hidden={active !== 'reporting'}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            <ReportingTab />
          </section>
        </main>
      </div>

      {/* Sidebar backdrop */}
      {sidebarOpen && (
        <button
          aria-label="Close navigation"
          className="modal-backdrop lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
