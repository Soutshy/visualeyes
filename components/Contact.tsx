"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["PORTRAIT", "MODE", "SPORT", "EVENT"];

export function Contact() {
    const [formState, setFormState] = useState({ name: "", email: "", message: "", category: "MODE" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate sending
        setTimeout(() => {
            setIsSubmitting(false);
            alert("Request sent successfully.");
            setFormState({ name: "", email: "", message: "", category: "MODE" });
        }, 1500);
    };

    return (
        <section id="contact" className="bg-rich-black py-32 md:py-48 px-6 relative overflow-hidden">

            <div className="max-w-2xl mx-auto relative z-10">

                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-gold text-xs tracking-[0.3em] uppercase block mb-4">Get in Touch</span>
                    <h2 className="font-display text-5xl md:text-7xl text-off-white mb-6 uppercase tracking-widest">
                        Start the dialogue.
                    </h2>
                    <p className="font-body text-xl text-off-white/60 font-light max-w-2xl mx-auto">
                        You have a vision. We have the eyes. Let’s create something timeless.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-16">

                    {/* Name Input */}
                    <div className="group relative">
                        <input
                            type="text"
                            id="name"
                            required
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            className="block w-full bg-transparent border-b border-white/20 py-4 text-off-white text-xl font-display focus:border-gold focus:outline-none transition-colors placeholder:text-transparent peer"
                            placeholder="Name"
                        />
                        <label
                            htmlFor="name"
                            className={cn(
                                "absolute left-0 top-4 text-off-white/40 text-sm tracking-widest transition-all duration-300 pointer-events-none",
                                "peer-focus:-translate-y-8 peer-focus:text-xs peer-focus:text-gold",
                                formState.name && "-translate-y-8 text-xs text-gold"
                            )}
                        >
                            NAME
                        </label>
                    </div>

                    {/* Email Input */}
                    <div className="group relative">
                        <input
                            type="email"
                            id="email"
                            required
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            className="block w-full bg-transparent border-b border-white/20 py-4 text-off-white text-xl font-display focus:border-gold focus:outline-none transition-colors placeholder:text-transparent peer"
                            placeholder="Email"
                        />
                        <label
                            htmlFor="email"
                            className={cn(
                                "absolute left-0 top-4 text-off-white/40 text-sm tracking-widest transition-all duration-300 pointer-events-none",
                                "peer-focus:-translate-y-8 peer-focus:text-xs peer-focus:text-gold",
                                formState.email && "-translate-y-8 text-xs text-gold"
                            )}
                        >
                            EMAIL
                        </label>
                    </div>

                    {/* Category Selection (Custom Radio) */}
                    <div className="space-y-6">
                        <span className="text-off-white/40 text-xs tracking-[0.2em] uppercase block">Category</span>
                        <div className="flex flex-wrap gap-x-8 gap-y-4">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setFormState({ ...formState, category: cat })}
                                    className={cn(
                                        "text-sm tracking-[0.2em] uppercase transition-all duration-300 border-b border-transparent pb-1",
                                        formState.category === cat
                                            ? "text-gold border-gold"
                                            : "text-off-white/40 hover:text-off-white"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Message Input */}
                    <div className="group relative">
                        <textarea
                            id="message"
                            required
                            rows={1}
                            value={formState.message}
                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                            className="block w-full bg-transparent border-b border-white/20 py-4 text-off-white text-xl font-display focus:border-gold focus:outline-none transition-colors placeholder:text-transparent peer resize-none min-h-[60px]"
                            placeholder="Message"
                        />
                        <label
                            htmlFor="message"
                            className={cn(
                                "absolute left-0 top-4 text-off-white/40 text-sm tracking-widest transition-all duration-300 pointer-events-none",
                                "peer-focus:-translate-y-8 peer-focus:text-xs peer-focus:text-gold",
                                formState.message && "-translate-y-8 text-xs text-gold"
                            )}
                        >
                            MESSAGE
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-12">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-off-white text-rich-black py-4 px-8 mt-8 uppercase tracking-[0.2em] text-sm hover:bg-gold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Sending...' : 'INITIATE PROJECT'}
                        </button>
                    </div>

                </form>
            </div>
        </section>
    );
}
