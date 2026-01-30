"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/Footer";

const FAQ_ITEMS = [
    { q: "What is your starting budget?", a: "Our projects typically start from €2k." },
    { q: "Do you travel?", a: "Yes, available worldwide." },
    { q: "Turnaround time?", a: "2-4 weeks depending on scope." }
];

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", company: "", email: "", budget: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            alert("Request sent successfully.");
            setForm({ name: "", company: "", email: "", budget: "", message: "" });
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-rich-black text-off-white selection:bg-gold selection:text-rich-black">
            <main className="max-w-7xl mx-auto px-6 py-32 md:py-48">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">

                    {/* Left Column: Info & FAQ */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col justify-between space-y-16"
                    >
                        {/* Header Info */}
                        <div className="space-y-12">
                            <h1 className="font-display text-5xl md:text-7xl leading-tight">
                                Let's start the <br />
                                <span className="text-gold italic">conversation.</span>
                            </h1>

                            <div className="space-y-8">
                                <a
                                    href="mailto:hello@visualeyes.com"
                                    className="block font-display text-3xl md:text-4xl hover:text-gold transition-colors duration-300"
                                >
                                    hello@visualeyes.com
                                </a>

                                <div className="space-y-4 text-off-white/60 font-light">
                                    <p className="text-lg">12 Rue du Faubourg Saint-Honoré, Paris</p>
                                    <div className="flex gap-6 text-sm tracking-widest uppercase text-off-white/40">
                                        <a href="#" className="hover:text-gold transition-colors">Instagram</a>
                                        <a href="#" className="hover:text-gold transition-colors">LinkedIn</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mini FAQ Accordion */}
                        <div className="border-t border-white/10 pt-8">
                            <span className="text-gold text-xs tracking-[0.2em] uppercase block mb-8">
                                FAQ
                            </span>
                            <div className="space-y-4">
                                {FAQ_ITEMS.map((item, i) => (
                                    <AccordionItem key={i} q={item.q} a={item.a} />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="bg-white/5 p-8 md:p-12 border border-white/10 backdrop-blur-sm"
                    >
                        <form onSubmit={handleSubmit} className="space-y-12">

                            {/* Name */}
                            <div className="group">
                                <label className="block text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:border-gold focus:outline-none transition-colors"
                                    placeholder="Jane Doe"
                                />
                            </div>

                            {/* Company (Optional) */}
                            <div className="group">
                                <label className="block text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Company (Optional)</label>
                                <input
                                    type="text"
                                    value={form.company}
                                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:border-gold focus:outline-none transition-colors"
                                    placeholder="Agency Ltd."
                                />
                            </div>

                            {/* Email */}
                            <div className="group">
                                <label className="block text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:border-gold focus:outline-none transition-colors"
                                    placeholder="jane@agency.com"
                                />
                            </div>

                            {/* Budget Select */}
                            <div className="group">
                                <label className="block text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Budget</label>
                                <select
                                    value={form.budget}
                                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:border-gold focus:outline-none transition-colors appearance-none cursor-pointer"
                                >
                                    <option value="" className="bg-rich-black text-gray-500">Select a range</option>
                                    <option value="2-5k" className="bg-rich-black">€2k — €5k</option>
                                    <option value="5-10k" className="bg-rich-black">€5k — €10k</option>
                                    <option value="10k+" className="bg-rich-black">€10k+</option>
                                </select>
                            </div>

                            {/* Message */}
                            <div className="group">
                                <label className="block text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Message</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:border-gold focus:outline-none transition-colors resize-none"
                                    placeholder="Tell us about your project..."
                                />
                            </div>

                            {/* Submit */}
                            <div className="pt-8 text-right">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-off-white text-rich-black px-10 py-4 uppercase tracking-[0.2em] text-sm hover:bg-gold transition-colors duration-300 disabled:opacity-50"
                                >
                                    {isSubmitting ? "Sending..." : "Send Request"}
                                </button>
                            </div>

                        </form>
                    </motion.div>

                </div>
            </main>
            <Footer />
        </div>
    );
}

function AccordionItem({ q, a }: { q: string, a: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/10 last:border-0 pb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-2 text-left hover:text-gold transition-colors group"
            >
                <span className="font-display text-lg md:text-xl text-off-white group-hover:text-gold transition-colors">{q}</span>
                <span className={cn("text-gold text-xl transition-transform duration-300", isOpen ? "rotate-45" : "rotate-0")}>
                    +
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="font-body text-off-white/60 font-light pt-2 pb-4 leading-relaxed">
                            {a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
