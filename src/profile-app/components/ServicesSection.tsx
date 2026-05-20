import { Activity, ArrowRight, Building2, Layers, LayoutList, Sparkles, Target, Video } from 'lucide-react'
import { motion } from 'motion/react'

export const ServicesSection = () => {
  return (
    <div className="vbiz-bento-grid grid w-full grid-cols-1 gap-4 pb-20 md:grid-cols-3 lg:grid-cols-4">
      {/* Top Hero Card - Takes up 3 cols on desktop */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200 bg-white/50 p-8 backdrop-blur-xl md:col-span-3 lg:col-span-3 lg:p-10 dark:border-zinc-800/80 dark:bg-zinc-900/50"
      >
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-zinc-100/50 to-transparent dark:from-zinc-800/20" />

        {/* Abstract Background Elements */}
        <div className="pointer-events-none absolute top-0 right-0 -mt-32 -mr-32 rounded-full bg-[#eab308]/10 p-32 blur-3xl transition-transform duration-1000 group-hover:scale-110 dark:bg-[#eab308]/5" />
        <div className="pointer-events-none absolute bottom-0 left-0 -mb-24 -ml-24 rounded-full bg-black/5 p-24 blur-3xl transition-transform delay-100 duration-1000 group-hover:scale-110 dark:bg-white/5" />

        <div className="relative z-10">
          <div className="mb-8 inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white/80 px-3 py-1.5 text-[10px] font-bold tracking-wider text-zinc-700 uppercase shadow-sm backdrop-blur-sm transition-colors dark:border-zinc-700/50 dark:bg-zinc-800/80 dark:text-zinc-300">
            <Layers size={12} className="text-[#eab308]" /> Core Services
          </div>

          <h2 className="mb-6 max-w-2xl text-3xl leading-[1.1] font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-zinc-100">
            {`This Isn't a Business Card.`}
            <br />
            <span className="font-medium text-[#eab308] italic">{`It's a Digital Power Move.`}</span>
          </h2>

          <p className="max-w-xl text-base leading-relaxed font-medium text-zinc-600 lg:text-lg dark:text-zinc-400">
            Professionally built, video-powered virtual business cards designed to capture attention and convert
            introductions into lasting connections.
          </p>
        </div>
      </motion.div>

      {/* Feature 1: Dynamic Intro Video */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200 bg-linear-to-br from-white to-zinc-50 p-6 transition-all duration-500 hover:border-[#eab308]/30 md:col-span-3 lg:col-span-1 lg:p-8 dark:border-zinc-800/80 dark:from-zinc-900 dark:to-zinc-950"
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -mb-16 rounded-full bg-[#eab308]/10 p-12 blur-3xl transition-transform duration-700 group-hover:scale-150" />
        <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-100 text-[#eab308] shadow-sm backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1 dark:border-zinc-700 dark:bg-zinc-800/80">
          <Video size={24} />
        </div>
        <div className="relative z-10 mt-auto">
          <h3 className="mb-2 text-xl leading-tight font-bold text-zinc-900 dark:text-zinc-100">Dynamic Intro Video</h3>
          <p className="text-sm leading-relaxed font-medium text-zinc-600 dark:text-zinc-400">
            Every vBiz Me card begins with a custom intro video that plays the moment your card is opened.
          </p>
        </div>
      </motion.div>

      {/* 2nd Feature: The Invisible Advantage™ (2 cols) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        className="group relative flex min-h-[220px] flex-col justify-center overflow-hidden rounded-3xl border border-zinc-200 bg-white/50 p-6 backdrop-blur-xl transition-colors duration-500 hover:bg-white/80 md:col-span-1 lg:col-span-2 lg:p-8 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:hover:bg-zinc-900/80"
      >
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-1/2 bg-linear-to-l from-zinc-100/50 to-transparent transition-colors duration-700 group-hover:from-zinc-100 dark:from-zinc-800/20 dark:group-hover:from-zinc-800/40" />

        <div className="relative z-10 max-w-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 text-zinc-900 shadow-sm transition-colors group-hover:bg-zinc-900 group-hover:text-white dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-100 dark:group-hover:bg-zinc-100 dark:group-hover:text-zinc-950">
            <Target size={20} />
          </div>
          <h3 className="mb-2 text-xl font-bold tracking-tight text-zinc-900 lg:text-2xl dark:text-zinc-100">
            The Invisible Advantage™
          </h3>
          <p className="text-sm leading-relaxed font-medium text-zinc-600 lg:text-base dark:text-zinc-400">
            Instead of dumping links on a screen, your card guides viewers through a powerful sequence. Control the
            narrative.
          </p>
        </div>
      </motion.div>

      {/* 3rd Feature: Real-Time Analytics (2 cols) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        className="group relative flex flex-col justify-center overflow-hidden rounded-3xl border border-zinc-200 bg-white/50 p-6 backdrop-blur-xl transition-colors duration-500 hover:bg-white/80 md:col-span-2 lg:col-span-2 lg:p-8 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:hover:bg-zinc-900/80"
      >
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-1/2 bg-linear-to-r from-blue-500/5 to-transparent transition-colors duration-700 group-hover:from-blue-500/10" />

        <div className="relative z-10 flex w-full items-start gap-4 lg:gap-6">
          <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 text-blue-500 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:border-blue-500/30 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-blue-400">
            <Activity size={22} />
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold tracking-tight text-zinc-900 lg:text-2xl dark:text-zinc-100">
              Real-Time Analytics
            </h3>
            <p className="max-w-md text-sm leading-relaxed font-medium text-zinc-600 lg:text-base dark:text-zinc-400">
              Track how people interact with your card. Know exactly how your digital introduction is performing in
              real-time.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Grid of the remaining 3 items */}
      {[
        {
          icon: Sparkles,
          title: 'Fully Branded',
          desc: 'Designed to match your brand and personality. Your card becomes a visual extension of your brand.',
        },
        {
          icon: LayoutList,
          title: 'Lead Conversion',
          desc: 'Turn attention into action instantly. Everything prospects need is one tap away.',
        },
        {
          icon: Building2,
          title: 'Team Systems',
          desc: 'Deploy vBiz Me across your organization. Perfect for modern sales teams and agencies.',
        },
      ].map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
          className="group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-white/50 p-6 backdrop-blur-xl transition-colors duration-500 hover:bg-white/80 md:col-span-1 lg:col-span-1 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:hover:bg-zinc-900/80"
        >
          <div className="pointer-events-none absolute top-0 right-0 -mt-16 -mr-16 rounded-full bg-black/5 p-16 blur-3xl transition-transform duration-700 group-hover:scale-110 dark:bg-white/5" />
          <div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 text-zinc-900 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-zinc-900 group-hover:text-white group-hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-100 dark:group-hover:bg-zinc-100 dark:group-hover:text-zinc-950">
            <s.icon size={20} />
          </div>
          <div className="relative z-10 mt-4 w-full">
            <h4 className="mb-2 text-base font-bold text-zinc-900 dark:text-zinc-100">{s.title}</h4>
            <p className="text-sm leading-relaxed font-medium text-zinc-600 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-300">
              {s.desc}
            </p>
          </div>
        </motion.div>
      ))}

      {/* Extra square for 4th col in bottom row if needed */}
      <div className="group relative hidden cursor-default flex-col items-center justify-center overflow-hidden rounded-[1.5rem] border border-dashed border-zinc-200 bg-zinc-50 p-6 text-center opacity-50 backdrop-blur-xl transition-all duration-500 hover:border-[#eab308]/50 hover:opacity-100 lg:col-span-1 lg:flex dark:border-zinc-800/50 dark:bg-zinc-900/30">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200 text-zinc-500 transition-all duration-500 group-hover:rotate-12 group-hover:bg-[#eab308]/10 group-hover:text-[#eab308] dark:bg-zinc-800/50">
          <ArrowRight size={20} />
        </div>
        <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase group-hover:text-[#eab308]">
          Get Started
        </p>
      </div>
    </div>
  )
}
