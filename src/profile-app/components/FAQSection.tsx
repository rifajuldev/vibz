import { ChevronDown, MessageCircle, Search } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

const faqs = [
  {
    question: '1: What exactly is vBiz Me?',
    answer: (
      <>
        vBiz Me is a{' '}
        <span className="font-bold text-zinc-900 dark:text-zinc-100">video-first digital business card</span>. It opens
        with a quick{' '}
        <span className="font-bold text-zinc-900 dark:text-zinc-100">
          9-second intro video that flows into your logo
        </span>
        , then puts <span className="font-bold text-zinc-900 dark:text-zinc-100">one-tap actions</span> (Book, Call,
        Text, Get a Quote) right under it. People can{' '}
        <span className="font-bold text-zinc-900 dark:text-zinc-100">Save My Info</span> to contacts in one tap, and you
        get <span className="font-bold text-zinc-900 dark:text-zinc-100">analytics</span> on views and clicks. Share by{' '}
        <span className="font-bold text-zinc-900 dark:text-zinc-100">link or QR—no app</span> needed.
      </>
    ),
  },
  {
    question: "2: How's this different from paper cards or link farms?",
    answer: (
      <>
        Paper cards get tossed (<span className="border-b border-[#eab308]/30 text-[#eab308]">88%</span>). Link pages
        are clutter. vBiz Me is a{' '}
        <span className="font-bold text-zinc-900 dark:text-zinc-100">mini commercial built to convert</span>: video up
        top, clear CTAs, and <span className="font-bold text-zinc-900 dark:text-zinc-100">reporting</span> so you know
        {`what's working.`} It drives outcomes—
        <span className="font-bold text-zinc-900 dark:text-zinc-100">bookings, calls, quotes</span>—not link-wandering.
      </>
    ),
  },
  {
    question: '3: Does this replace my website or socials?',
    answer: (
      <>
        No. vBiz Me is the <span className="font-bold text-zinc-900 dark:text-zinc-100">front door</span> that gets
        opened. It funnels attention to your site, reviews, calendar, payments, portfolio, and socials—in the{' '}
        <span className="font-bold text-zinc-900 dark:text-zinc-100">right order</span>.
      </>
    ),
  },
  {
    question: '4: Will the video autoplay with sound?',
    answer: (
      <>
        Browsers block autoplay <span className="font-bold text-zinc-900 dark:text-zinc-100">with sound</span>. Your
        video <span className="font-bold text-zinc-900 dark:text-zinc-100">autoplays muted</span>; users tap to unmute.
        We design around that: the <span className="font-bold text-zinc-900 dark:text-zinc-100">logo locks in</span>{' '}
        after the intro, CTAs are right below, and music/voice plays when they tap.
      </>
    ),
  },
  {
    question: '5: What actions can I add?',
    answer: (
      <>
        The greatest hits:{' '}
        <span className="font-bold text-zinc-900 dark:text-zinc-100">
          Book a Consult, Call Now, Text Me, Get a Quote
        </span>{' '}
        (short form or {`"text a photo for a quote"`}),{' '}
        <span className="font-bold text-zinc-900 dark:text-zinc-100">Pay/Invoice, Reviews, Directions/Maps</span>, plus{' '}
        <span className="font-bold text-zinc-900 dark:text-zinc-100">Save My Info (.vcf)</span>. We can add custom
        buttons and reorder them to match your sales flow.
      </>
    ),
  },
  {
    question: '6: What do the analytics show me?',
    answer: (
      <>
        Clear signal: <span className="font-bold text-zinc-900 dark:text-zinc-100">who viewed, what they tapped</span>,
        and <span className="font-bold text-zinc-900 dark:text-zinc-100">which sections got attention</span> (Book vs.
        Quote vs. Call). Use it to follow up{' '}
        <span className="font-bold text-zinc-900 dark:text-zinc-100">smart, not spammy</span>. If they submit a form,
        {`you'll see their details; otherwise it's behavior data—no creepy tracking.`}
      </>
    ),
  },
  {
    question: '7: How does pricing and setup work—solo and teams?',
    answer: (
      <>
        Keep it lean: a <span className="font-bold text-zinc-900 dark:text-zinc-100">small setup</span> + a{' '}
        <span className="font-bold text-zinc-900 dark:text-zinc-100">low monthly</span> (around{' '}
        <span className="border-b border-[#eab308]/30 text-[#eab308]">under ten bucks</span> tier), with{' '}
        <span className="font-bold text-zinc-900 dark:text-zinc-100">unlimited updates</span>—no printing ever again.
        Teams get <span className="font-bold text-zinc-900 dark:text-zinc-100">on-brand templates</span>,{' '}
        <span className="font-bold text-zinc-900 dark:text-zinc-100">event QR codes</span>, and light CRM/lead routing
        so every rep looks sharp and you can{' '}
        <span className="font-bold text-zinc-900 dark:text-zinc-100">measure conversions</span>.
      </>
    ),
  },
]

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFaqs = faqs.filter((faq) => faq.question.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="w-full pb-20">
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-4">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-white/50 p-8 backdrop-blur-xl lg:col-span-4 lg:p-10 dark:border-zinc-800/80 dark:bg-zinc-900/50"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-zinc-100/50 to-transparent dark:from-zinc-800/20" />

          <div className="pointer-events-none absolute top-0 right-0 -mt-32 -mr-32 rounded-full bg-[#eab308]/10 p-32 blur-3xl transition-transform duration-1000 group-hover:scale-110 dark:bg-[#eab308]/5" />
          <div className="pointer-events-none absolute bottom-0 left-0 -mb-24 -ml-24 rounded-full bg-black/5 p-24 blur-3xl transition-transform delay-100 duration-1000 group-hover:scale-110 dark:bg-white/5" />

          <div className="relative z-10 mb-8 w-full">
            <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-1.5 text-[10px] font-bold tracking-wider text-zinc-600 uppercase shadow-sm backdrop-blur-sm transition-colors dark:border-zinc-700/50 dark:bg-zinc-800/80 dark:text-zinc-300">
              <MessageCircle size={12} className="text-[#eab308]" /> Support & Knowledge Base
            </div>

            <h2 className="mb-4 max-w-2xl text-3xl leading-[1.1] font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-zinc-100">
              Frequently Asked <span className="font-medium text-[#eab308] italic">Questions</span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed font-medium text-zinc-600 dark:text-zinc-400">
              Everything you need to know about vBiz Me and how our digital business cards can transform your
              networking.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-10 w-full border-t border-zinc-200 pt-6 md:w-1/2 dark:border-zinc-800/80"
          >
            <div className="group relative">
              <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-zinc-400 transition-colors group-focus-within:text-zinc-900 dark:text-zinc-500 dark:group-focus-within:text-zinc-300" />
              <input
                type="text"
                placeholder="Search FAQ's..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pr-4 pl-11 text-xs font-medium text-zinc-900 shadow-sm transition-all placeholder:text-zinc-500 hover:border-zinc-300 hover:bg-zinc-100 focus:border-zinc-300 focus:bg-white focus:outline-none lg:text-sm dark:border-zinc-800/80 dark:bg-zinc-950/50 dark:text-zinc-100 dark:hover:border-zinc-700/80 dark:hover:bg-zinc-800/50 dark:focus:border-zinc-700 dark:focus:bg-zinc-800/50"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-20 mt-4 flex flex-col gap-4">
        {filteredFaqs.length > 0 ? (
          <AnimatePresence>
            {filteredFaqs.map((faq, index) => {
              const originalIndex = faqs.findIndex((f) => f.question === faq.question)
              const isOpen = openIndex === originalIndex
              return (
                <motion.div
                  key={originalIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`group relative overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-white/50 shadow-sm backdrop-blur-xl transition-all duration-500 dark:border-zinc-800/80 dark:bg-zinc-900/50 ${isOpen ? 'border-zinc-300/80 bg-zinc-100/30 dark:border-zinc-700/80 dark:bg-zinc-800/30' : 'hover:bg-zinc-50 dark:hover:bg-zinc-900/80'}`}
                >
                  {isOpen && <div className="absolute top-0 left-0 h-full w-1.5 bg-[#eab308]" />}
                  <div className="pointer-events-none absolute top-0 right-0 -mt-8 -mr-8 rounded-full bg-black/5 p-16 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 dark:bg-white/5" />

                  <button
                    onClick={() => setOpenIndex(isOpen ? null : originalIndex)}
                    className="relative z-10 flex w-full cursor-pointer items-center justify-between p-6 text-left focus:outline-none lg:p-8"
                  >
                    <h4
                      className={`pr-8 text-base font-bold transition-colors duration-300 md:text-lg ${isOpen ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-600 group-hover:text-zinc-900 dark:text-zinc-300 dark:group-hover:text-zinc-100'}`}
                    >
                      {faq.question}
                    </h4>
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${isOpen ? 'rotate-180 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950' : 'border border-zinc-200 bg-zinc-100 text-zinc-500 group-hover:bg-white group-hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-zinc-100 dark:group-hover:text-zinc-950'}`}
                    >
                      <ChevronDown size={18} strokeWidth={2.5} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10"
                      >
                        <div className="mt-2 border-t border-zinc-200 px-6 pt-0 pb-8 text-sm leading-relaxed font-medium text-zinc-600 md:text-base lg:px-8 dark:border-zinc-800/50 dark:text-zinc-400">
                          <div className="pt-6">{faq.answer}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full flex flex-col items-center justify-center rounded-[1.5rem] border border-zinc-200 bg-white/50 p-12 text-center backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/50"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-zinc-100 text-zinc-500 dark:bg-zinc-800">
              <MessageCircle size={28} />
            </div>
            <h4 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-100">No answers found</h4>
            <p className="max-w-sm font-medium text-zinc-500">
              {`We couldn't find any FAQs matching your search term. Try another word or contact support.`}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
