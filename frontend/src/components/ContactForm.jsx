import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, ExternalLink, Mail, MessageSquare, Send, Share2, User } from "lucide-react";
import apiService from "../services/apiService";

export default function ContactForm({ data }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await apiService.sendContactEmail(formData);
      setSubmitStatus({
        type: "success",
        message: "Message sent successfully!",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error.message || "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const social = data?.social || {};
  const socialLinks = [
    { label: "Email", href: social.email ? `mailto:${social.email}` : "", icon: Mail },
    { label: "GitHub", href: social.github, icon: Code2 },
    { label: "LinkedIn", href: social.linkedin, icon: ExternalLink },
    { label: "Twitter", href: social.twitter, icon: Share2 },
    { label: "Facebook", href: social.facebook, icon: Share2 },
  ].filter((item) => item.href);

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-6 text-center">
        {" "}
        Send a Message{" "}
      </h3>
      {socialLinks.length > 0 && (
        <div className="mb-6 flex flex-wrap justify-center gap-3">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
              className="flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-sm transition-colors hover:border-cyan-400 hover:text-cyan-400"
            >
              <Icon size={16} />
              {label}
            </a>
          ))}
        </div>
      )}
      {submitStatus && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-lg ${
            submitStatus.type === "success"
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-red-500/20 text-red-400 border border-red-500/30"
          }`}
        >
          {submitStatus.message}{" "}
        </motion.div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <User size={16} className="inline mr-2" />
              Name *
            </label>{" "}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Mail size={16} className="inline mr-2" />
              Email *
            </label>{" "}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
              placeholder="your.email@example.com"
            />
          </div>{" "}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Subject *
          </label>{" "}
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
            placeholder="What's this about?"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            <MessageSquare size={16} className="inline mr-2" />
            Message *
          </label>{" "}
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors resize-vertical"
            placeholder="Tell me about your project or inquiry..."
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-slate-950 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-950">
                {" "}
              </div>
              Sending...{" "}
            </>
          ) : (
            <>
              <Send size={16} />
              Send Message{" "}
            </>
          )}{" "}
        </button>{" "}
      </form>{" "}
    </div>
  );
}
