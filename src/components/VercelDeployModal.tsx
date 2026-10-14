import { useState } from 'react';
import { X, Rocket, Copy, Check, Terminal, ExternalLink, Globe, ShieldCheck, Github } from 'lucide-react';

interface VercelDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VercelDeployModal({ isOpen, onClose }: VercelDeployModalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const gitCommands = `# 1. Inisialisasi Git di komputer Anda
git init
git add .
git commit -m "feat: ScentShift Authentic Perfume Web App"

# 2. Sambungkan ke repositori GitHub Anda
git branch -M main
git remote add origin https://github.com/USERNAME-ANDA/scentshift.git
git push -u origin main`;

  const vercelCliCommands = `# Pasang Vercel CLI secara global (opsional jika lewat terminal)
npm install -g vercel

# Deploy langsung dari folder proyek Anda
vercel

# Untuk deploy versi production live:
vercel --prod`;

  const vercelConfig = `{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/65 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-stone-200 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-stone-900 text-white">
              <Rocket className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">
                Panduan Deploy Gratis ke Vercel
              </h3>
              <p className="text-xs text-stone-500">
                Hosting cepat, gratis selamanya (Hobby Plan), dengan SSL otomatis & custom domain.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Keunggulan Vercel */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
            <Globe className="w-4 h-4 text-emerald-600 mb-1.5" />
            <p className="text-xs font-bold text-stone-900">100% Gratis Selamanya</p>
            <p className="text-[11px] text-stone-500">Paket Vercel Hobby gratis tanpa perlu kartu kredit.</p>
          </div>
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
            <Github className="w-4 h-4 text-stone-800 mb-1.5" />
            <p className="text-xs font-bold text-stone-900">Auto Deploy dari GitHub</p>
            <p className="text-[11px] text-stone-500">Setiap kali Anda push update ke Git, website otomatis terupdate.</p>
          </div>
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
            <ShieldCheck className="w-4 h-4 text-amber-600 mb-1.5" />
            <p className="text-xs font-bold text-stone-900">vercel.json Siap Pakai</p>
            <p className="text-[11px] text-stone-500">File rewrite sudah kami sediakan agar halaman tidak error 404.</p>
          </div>
        </div>

        {/* 2 Metode Deploy */}
        <div className="space-y-6">
          
          {/* METODE 1 */}
          <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-700 text-white rounded">
                Metode 1 · Paling Direkomendasikan
              </span>
              <span className="text-xs font-semibold text-stone-600">Via GitHub & Vercel Dashboard</span>
            </div>

            <h4 className="text-base font-bold text-stone-900">
              Langkah Deploy via GitHub (Mudah & Otomatis)
            </h4>

            <ol className="list-decimal list-inside space-y-2.5 text-xs text-stone-700 leading-relaxed">
              <li>
                <strong>Download/Simpan Proyek Ini:</strong> Seluruh file proyek sudah terstruktur lengkap dengan Vite + React + Tailwind CSS.
              </li>
              <li>
                <strong>Buat Repositori di GitHub:</strong> Buka <a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-amber-700 font-semibold underline inline-flex items-center gap-0.5">github.com/new <ExternalLink className="w-3 h-3" /></a>, beri nama misalnya <code className="bg-stone-200 px-1 py-0.5 rounded text-[11px]">scentshift-store</code>, lalu klik <em>Create repository</em>.
              </li>
              <li>
                <strong>Push Kode ke GitHub:</strong> Jalankan perintah git di terminal komputer Anda (klik tombol salin di bawah):
              </li>
            </ol>

            <div className="relative">
              <pre className="p-3.5 bg-stone-900 text-stone-200 rounded-xl text-xs font-mono overflow-x-auto">
                {gitCommands}
              </pre>
              <button
                onClick={() => copyToClipboard(gitCommands, 1)}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs flex items-center gap-1 transition-colors cursor-pointer"
              >
                {copiedIndex === 1 ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[11px] text-emerald-300">Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[11px]">Salin Git Commands</span>
                  </>
                )}
              </button>
            </div>

            <ol start={4} className="list-decimal list-inside space-y-2.5 text-xs text-stone-700 leading-relaxed">
              <li>
                <strong>Hubungkan ke Vercel:</strong> Buka <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-amber-700 font-semibold underline inline-flex items-center gap-0.5">vercel.com <ExternalLink className="w-3 h-3" /></a> &gt; Login dengan akun GitHub Anda.
              </li>
              <li>
                <strong>Import Repositori:</strong> Klik tombol <strong>&quot;Add New...&quot;</strong> &gt; <strong>&quot;Project&quot;</strong> &gt; Pilih repositori GitHub Anda dan klik <strong>&quot;Import&quot;</strong>.
              </li>
              <li>
                <strong>Pengaturan Otomatis (Zero-Config):</strong> Vercel otomatis mendeteksi framework <strong>Vite</strong>:
                <ul className="list-disc list-inside ml-4 mt-1 text-stone-600 space-y-0.5">
                  <li>Framework Preset: <code>Vite</code></li>
                  <li>Build Command: <code>npm run build</code></li>
                  <li>Output Directory: <code>dist</code></li>
                </ul>
              </li>
              <li>
                <strong>Klik &quot;Deploy&quot;:</strong> Tunggu sekitar 30-60 detik. Website ScentShift Anda langsung aktif dengan domain seperti <code className="bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded font-mono">scentshift.vercel.app</code>!
              </li>
            </ol>
          </div>

          {/* METODE 2 */}
          <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-stone-800 text-white rounded">
                Metode 2 · Jalur Cepat Terminal
              </span>
              <span className="text-xs font-semibold text-stone-600">Via Vercel CLI</span>
            </div>

            <h4 className="text-base font-bold text-stone-900">
              Deploy Langsung Lewat Baris Perintah (Vercel CLI)
            </h4>

            <p className="text-xs text-stone-600">
              Jika Anda suka menggunakan terminal langsung tanpa perlu push ke GitHub terlebih dahulu:
            </p>

            <div className="relative">
              <pre className="p-3.5 bg-stone-900 text-stone-200 rounded-xl text-xs font-mono overflow-x-auto">
                {vercelCliCommands}
              </pre>
              <button
                onClick={() => copyToClipboard(vercelCliCommands, 2)}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs flex items-center gap-1 transition-colors cursor-pointer"
              >
                {copiedIndex === 2 ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[11px] text-emerald-300">Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[11px]">Salin Perintah CLI</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* File vercel.json info */}
          <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-stone-700" />
                File vercel.json Sudah Disediakan di Proyek Ini
              </p>
              <button
                onClick={() => copyToClipboard(vercelConfig, 3)}
                className="text-[11px] font-semibold text-amber-700 hover:text-amber-800 cursor-pointer flex items-center gap-1"
              >
                {copiedIndex === 3 ? 'Tersalin!' : 'Salin vercel.json'}
              </button>
            </div>
            <p className="text-[11px] text-stone-500">
              Konfigurasi ini memastikan agar rute SPA (Single Page Application) tetap diarahkan ke <code>/index.html</code> sehingga saat pengunjung me-refresh browser tidak terjadi error 404.
            </p>
          </div>

        </div>

        {/* Footer Action */}
        <div className="mt-6 pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-500">
            Perlu bantuan deploy? Chat admin di WhatsApp kapan saja!
          </p>
          <div className="flex gap-2">
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Buka Vercel.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Selesai Membaca
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
