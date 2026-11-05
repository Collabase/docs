export const SizingCalculator = ({ lang = "en" }) => {
  const copy = {
    en: {
      edition: "Edition",
      community: "Community Edition",
      paid: "Paid licence",
      users: "Users",
      result: "Recommended for production",
      ram: "RAM",
      cpu: "CPU",
      disk: "Disk",
      cpuUnit: "vCPU",
      single: "One server or one namespace. This applies to Docker and to Kubernetes.",
      communityNote: "The Community Edition is limited to 10 users, so the recommendation is fixed.",
      communityUsers: "10 users (maximum)",
      scaleTitle: "Scale out",
      scaleText:
        "From more than 100 users we recommend spreading Collabase over several machines: an external PostgreSQL, S3 object storage and several application instances with a dedicated worker. We size the layout with you.",
      scaleLink: "How to scale out",
      scaleHref: "#scaling-beyond-one-server",
      note: "Starting points. Adjust them with monitoring once people work in Collabase.",
    },
    de: {
      edition: "Edition",
      community: "Community Edition",
      paid: "Bezahlte Lizenz",
      users: "Benutzer",
      result: "Empfehlung für den Produktivbetrieb",
      ram: "RAM",
      cpu: "CPU",
      disk: "Speicher",
      cpuUnit: "vCPU",
      single: "Ein Server oder ein Namespace. Das gilt für Docker und für Kubernetes.",
      communityNote: "Die Community Edition ist auf 10 Benutzer begrenzt, die Empfehlung ist daher fest.",
      communityUsers: "10 Benutzer (Maximum)",
      scaleTitle: "Horizontal skalieren",
      scaleText:
        "Ab mehr als 100 Benutzern empfehlen wir, Collabase auf mehrere Maschinen zu verteilen: eine externe PostgreSQL, S3-Objektspeicher und mehrere Anwendungsinstanzen mit eigenem Worker. Das Layout dimensionieren wir gemeinsam mit dir.",
      scaleLink: "So skalierst du horizontal",
      scaleHref: "#ueber-einen-server-hinaus-skalieren",
      note: "Ausgangswerte. Passe sie mit dem Monitoring an, sobald Leute in Collabase arbeiten.",
    },
  };
  const t = copy[lang] || copy.en;
  const tiers = [50, 100, 150, 200, 500, 1000, 1500];
  const [edition, setEdition] = useState("paid");
  const [tier, setTier] = useState(50);

  const recommend = () => {
    if (edition === "community") return { scale: false, ram: 4, cpu: 2, disk: 20 };
    if (tier <= 50) return { scale: false, ram: 8, cpu: 4, disk: 40 };
    if (tier <= 100) return { scale: false, ram: 16, cpu: 8, disk: 80 };
    return { scale: true };
  };
  const result = recommend();

  const choice = (selected) =>
    "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors " +
    (selected ? "" : "border-zinc-300 text-zinc-700 hover:border-zinc-500 dark:border-zinc-700 dark:text-zinc-200");
  const selectedStyle = { backgroundColor: "#0f4d38", color: "#ffffff", borderColor: "#ccfc75" };
  const choiceStyle = (selected) => (selected ? selectedStyle : undefined);

  const tile = (label, value, unit) => (
    <div className="flex-1 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800" key={label}>
      <div className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-white">
        {value} <span className="text-base font-normal text-zinc-500 dark:text-zinc-400">{unit}</span>
      </div>
    </div>
  );

  return (
    <div className="not-prose my-6 rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
      <div className="mb-4">
        <div className="mb-2 text-sm font-semibold text-zinc-900 dark:text-white">{t.edition}</div>
        <div className="flex flex-wrap gap-2" role="group" aria-label={t.edition}>
          <button type="button" className={choice(edition === "community")} aria-pressed={edition === "community"} style={choiceStyle(edition === "community")} onClick={() => setEdition("community")}>
            {t.community}
          </button>
          <button type="button" className={choice(edition === "paid")} aria-pressed={edition === "paid"} style={choiceStyle(edition === "paid")} onClick={() => setEdition("paid")}>
            {t.paid}
          </button>
        </div>
      </div>
      <div className="mb-5">
        <div className="mb-2 text-sm font-semibold text-zinc-900 dark:text-white">{t.users}</div>
        {edition === "community" ? (
          <div className="text-sm text-zinc-600 dark:text-zinc-300">{t.communityUsers}</div>
        ) : (
          <div className="flex flex-wrap gap-2" role="group" aria-label={t.users}>
            {tiers.map((value) => (
              <button type="button" key={value} className={choice(tier === value)} aria-pressed={tier === value} style={choiceStyle(tier === value)} onClick={() => setTier(value)}>
                {value === 1500 ? "1500+" : value}
              </button>
            ))}
          </div>
        )}
      </div>
      <div aria-live="polite">
        <div className="mb-2 text-sm font-semibold text-zinc-900 dark:text-white">{t.result}</div>
        {result.scale ? (
          <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
            <div className="text-lg font-semibold text-zinc-900 dark:text-white">{t.scaleTitle}</div>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{t.scaleText}</p>
            <a className="mt-2 inline-block text-sm font-medium underline" href={t.scaleHref}>
              {t.scaleLink}
            </a>
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap gap-3">
              {tile(t.ram, result.ram, "GB")}
              {tile(t.cpu, result.cpu, t.cpuUnit)}
              {tile(t.disk, result.disk, "GB")}
            </div>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">{edition === "community" ? t.communityNote : t.single}</p>
          </div>
        )}
        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">{t.note}</p>
      </div>
    </div>
  );
};
