import { Coffee, Mail, Play } from "lucide-react";

const kofiUrl =
  "https://ko-fi.com/kevinenyangila?utm_medium=email&utm_source=onboarding&utm_campaign=SharePage";
const youtubeUrl = "https://www.youtube.com/channel/UC2VyPm_Qer2Cs7EqMDQ-EuA";

const socialItems = [
  {
    key: "email",
    label: "Email",
    getHref: (social) => (social.email ? `mailto:${social.email}` : ""),
    mark: "mail",
    color: "bg-cyan-500 text-slate-950",
  },
  {
    key: "github",
    label: "GitHub",
    getHref: (social) => social.github,
    mark: "GH",
    color: "bg-slate-950 text-white dark:bg-white dark:text-slate-950",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    getHref: (social) => social.linkedin,
    mark: "in",
    color: "bg-blue-600 text-white",
  },
  {
    key: "twitter",
    label: "Twitter",
    getHref: (social) => social.twitter,
    mark: "X",
    color: "bg-black text-white dark:bg-white dark:text-black",
  },
  {
    key: "facebook",
    label: "Facebook",
    getHref: (social) => social.facebook,
    mark: "f",
    color: "bg-blue-700 text-white",
  },
  {
    key: "youtube",
    label: "YouTube channel",
    getHref: (social) => social.youtube || youtubeUrl,
    mark: "youtube",
    color: "bg-red-600 text-white",
  },
  {
    key: "kofi",
    label: "Support on Ko-fi",
    getHref: () => kofiUrl,
    mark: "coffee",
    color: "bg-rose-500 text-white",
  },
];

export default function SocialLinks({ social, className = "" }) {
  const links = socialItems
    .map((item) => ({ ...item, href: item.getHref(social || {}) }))
    .filter((item) => item.href);

  if (links.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap justify-center gap-3 ${className}`}>
      {links.map(({ key, label, href, mark, color }) => {
        const isEmail = href.startsWith("mailto:");

        return (
          <a
            key={key}
            href={href}
            target={isEmail ? undefined : "_blank"}
            rel={isEmail ? undefined : "noreferrer"}
            aria-label={label}
            className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-white/15 hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
          >
            <span
              className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${color}`}
            >
              {mark === "mail" && <Mail size={15} />}
              {mark === "coffee" && <Coffee size={15} />}
              {mark === "youtube" && <Play size={15} fill="currentColor" />}
              {mark !== "mail" && mark !== "coffee" && mark !== "youtube" && mark}
            </span>
            <span>{label}</span>
          </a>
        );
      })}
    </div>
  );
}
