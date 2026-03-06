export default function OfflinePage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#EBF0FA]">
      <div className="text-center space-y-4 px-6">
        <div className="mx-auto w-16 h-16 rounded-[1.25rem] bg-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl border border-white/60 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-slate-800"
          >
            <line x1="2" x2="22" y1="2" y2="22" />
            <path d="M8.5 16.5a5 5 0 0 1 7 0" />
            <path d="M2 8.82a15 15 0 0 1 4.17-2.65" />
            <path d="M10.66 5c4.01-.36 8.14.9 11.34 3.76" />
            <path d="M16.85 11.25a10 10 0 0 1 2.22 1.68" />
            <path d="M5 12.86a10 10 0 0 1 5.17-2.89" />
            <line x1="12" x2="12.01" y1="20" y2="20" />
          </svg>
        </div>
        <h1 className="text-[28px] font-semibold tracking-tight text-slate-900">
          信号中断
        </h1>
        <p className="text-[14px] text-slate-500 font-medium">
          当前处于离线状态，请检查网络连接后重试
        </p>
      </div>
    </div>
  );
}
