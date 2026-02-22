import { useState, useEffect, useRef } from "react";

// ─── Static Data ────────────────────────────────────────────────────────────
const PLACE = {
  id: 1,
  name: "Juice Junction",
  category: "Juice bar · Beverages · Snacks",
  rating: 4.4,
  reviewCount: 1187,
  priceLevel: "₹",
  address: "Hampankatta, Mangalore, Karnataka 575001",
  phone: "+91 82400 12345",
  website: "juicejunction.in",
  status: "open",
  closesAt: "10:30 PM",
  hours: [
    { day: "Monday", open: "8:00 AM", close: "10:30 PM" },
    { day: "Tuesday", open: "8:00 AM", close: "10:30 PM" },
    { day: "Wednesday", open: "8:00 AM", close: "10:30 PM" },
    { day: "Thursday", open: "8:00 AM", close: "10:30 PM" },
    { day: "Friday", open: "8:00 AM", close: "11:00 PM" },
    { day: "Saturday", open: "8:00 AM", close: "11:00 PM" },
    { day: "Sunday", open: "9:00 AM", close: "10:00 PM" },
  ],
  photos: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80",
      alt: "Fresh juices",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600&q=80",
      alt: "Fruit display",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80",
      alt: "Tropical fruits",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80",
      alt: "Smoothie bowl",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&q=80",
      alt: "Mango juice",
    },
  ],
  tags: ["Fresh juices", "Affordable", "Quick service", "Takeaway"],
  about: "A popular local favourite in Mangalore serving freshly squeezed juices, milkshakes, and tropical fruit blends. Known for their thick mango shakes and sugarcane juice, Juice Junction has been refreshing Mangaloreans since 2005.",
  reviews: [
    {
      id: 1,
      name: "Rahul S.",
      avatar: "R",
      rating: 5,
      time: "1 week ago",
      text: "Best mango juice in all of Mangalore! Super fresh, no added sugar, and incredibly affordable. A must-visit every time I'm in Hampankatta.",
    },
    {
      id: 2,
      name: "Kavya N.",
      avatar: "K",
      rating: 4,
      time: "3 weeks ago",
      text: "Love this place. The coconut water and mixed fruit juice are outstanding. Can get crowded in evenings but worth the wait.",
    },
    {
      id: 3,
      name: "Arjun P.",
      avatar: "A",
      rating: 5,
      time: "2 weeks ago",
      text: "Sugarcane juice here is top-notch. Always clean, always cold, and the staff is very friendly. Great value for money!",
    },
  ],
};

const TODAY = "Wednesday";

// ─── Icons ───────────────────────────────────────────────────────────────────
const Icon = ({ path, size = 18, color = "currentColor", viewBox = "0 0 24 24" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d={path} fill={color} />
  </svg>
);

const StarIcon = ({ filled, half, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    {half ? (
      <>
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stopColor="#f9ab00" />
            <stop offset="50%" stopColor="#e0e0e0" />
          </linearGradient>
        </defs>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#half)" />
      </>
    ) : (
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={filled ? "#f9ab00" : "#e0e0e0"}
      />
    )}
  </svg>
);

const Stars = ({ rating, size = 14 }) => {
  return (
    <div style={{ display: "flex", gap: 1 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon
          key={i}
          filled={rating >= i}
          half={rating > i - 1 && rating < i}
          size={size}
        />
      ))}
    </div>
  );
};

// ─── Skeleton Loader ─────────────────────────────────────────────────────────
const Skeleton = ({ width = "100%", height = 16, radius = 4, style = {} }) => (
  <div
    style={{
      width,
      height,
      borderRadius: radius,
      background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.4s infinite",
      ...style,
    }}
  />
);

const LoadingSkeleton = () => (
  <div style={{ padding: "16px 16px 0" }}>
    <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "hidden" }}>
      {[0, 1, 2].map((i) => (
        <Skeleton key={i} width={120} height={88} radius={8} style={{ flexShrink: 0 }} />
      ))}
    </div>
    <Skeleton width="70%" height={24} style={{ marginBottom: 8 }} />
    <Skeleton width="40%" height={14} style={{ marginBottom: 12 }} />
    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      {[0, 1, 2, 3].map((i) => (
        <Skeleton key={i} width={70} height={70} radius={8} />
      ))}
    </div>
    <Skeleton width="100%" height={1} style={{ marginBottom: 16, background: "#f0f0f0" }} />
    <Skeleton width="60%" height={14} style={{ marginBottom: 8 }} />
    <Skeleton width="50%" height={14} style={{ marginBottom: 8 }} />
    <Skeleton width="55%" height={14} style={{ marginBottom: 24 }} />
  </div>
);

// ─── Photo Gallery ───────────────────────────────────────────────────────────
const PhotoGallery = ({ photos, onOpenLightbox }) => {
  const [loaded, setLoaded] = useState({});

  return (
    <div style={{ position: "relative", height: 200, overflow: "hidden", cursor: "pointer" }} onClick={() => onOpenLightbox(0)}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 2, height: "100%" }}>
        {/* Main large photo */}
        <div style={{ gridRow: "1 / 3", position: "relative", overflow: "hidden" }}>
          <img
            src={photos[0].url}
            alt={photos[0].alt}
            onLoad={() => setLoaded((p) => ({ ...p, 0: true }))}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transition: "opacity 0.3s, transform 0.3s",
              opacity: loaded[0] ? 1 : 0,
              transform: "scale(1)",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          />
          {!loaded[0] && <Skeleton width="100%" height="100%" radius={0} />}
        </div>
        {/* Side photos */}
        {[1, 2].map((idx) => (
          <div key={idx} style={{ position: "relative", overflow: "hidden" }}>
            <img
              src={photos[idx].url}
              alt={photos[idx].alt}
              onLoad={() => setLoaded((p) => ({ ...p, [idx]: true }))}
              style={{
                width: "100%", height: "100%", objectFit: "cover",
                transition: "opacity 0.3s, transform 0.3s",
                opacity: loaded[idx] ? 1 : 0,
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            />
            {!loaded[idx] && <Skeleton width="100%" height="100%" radius={0} />}
          </div>
        ))}
      </div>
      {/* See all photos button */}
      <button
        style={{
          position: "absolute", bottom: 10, right: 10,
          background: "rgba(255,255,255,0.92)", backdropFilter: "blur(4px)",
          border: "none", borderRadius: 4, padding: "5px 10px",
          fontSize: 12, fontWeight: 500, cursor: "pointer",
          color: "#202124", boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          fontFamily: "inherit",
        }}
        onClick={(e) => { e.stopPropagation(); onOpenLightbox(0); }}
      >
        See all photos ({photos.length})
      </button>
    </div>
  );
};

// ─── Lightbox ────────────────────────────────────────────────────────────────
const Lightbox = ({ photos, initialIndex, onClose }) => {
  const [current, setCurrent] = useState(initialIndex);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % photos.length);
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [photos.length, onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.92)", display: "flex",
        alignItems: "center", justifyContent: "center",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }}>
        <img
          src={photos[current].url}
          alt={photos[current].alt}
          style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: 4, display: "block" }}
        />
        <button onClick={onClose} style={lbBtn("#fff", "top: 12px; right: 12px")}>✕</button>
        {current > 0 && (
          <button onClick={() => setCurrent((c) => c - 1)} style={lbBtn("#fff", "left: -48px; top: 50%; transform: translateY(-50%)")}>‹</button>
        )}
        {current < photos.length - 1 && (
          <button onClick={() => setCurrent((c) => c + 1)} style={lbBtn("#fff", "right: -48px; top: 50%; transform: translateY(-50%)")}>›</button>
        )}
        <div style={{ textAlign: "center", color: "#aaa", marginTop: 8, fontSize: 13 }}>
          {current + 1} / {photos.length}
        </div>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 8 }}>
          {photos.map((p, i) => (
            <img
              key={p.id}
              src={p.url}
              alt={p.alt}
              onClick={() => setCurrent(i)}
              style={{
                width: 44, height: 32, objectFit: "cover", borderRadius: 3, cursor: "pointer",
                border: i === current ? "2px solid #1a73e8" : "2px solid transparent",
                opacity: i === current ? 1 : 0.6, transition: "all 0.15s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const lbBtn = (color, pos) => ({
  position: "absolute",
  ...(pos.split(";").reduce((acc, p) => {
    const [k, v] = p.trim().split(":");
    if (k && v) acc[k.trim()] = v.trim();
    return acc;
  }, {})),
  background: "rgba(255,255,255,0.12)",
  border: "none", color,
  borderRadius: "50%", width: 36, height: 36,
  cursor: "pointer", fontSize: 20, display: "flex",
  alignItems: "center", justifyContent: "center",
  backdropFilter: "blur(4px)",
});

// ─── Action Buttons ──────────────────────────────────────────────────────────
const ActionButton = ({ icon, label, active, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
        gap: 4, padding: "8px 4px", border: "none", borderRadius: 8,
        background: hovered ? "#f1f3f4" : "transparent",
        cursor: "pointer", transition: "background 0.15s", fontFamily: "inherit",
      }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: "50%",
        background: active ? "#e8f0fe" : "#f1f3f4",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: active ? "#1a73e8" : "#444",
        transition: "all 0.15s",
      }}>
        {icon}
      </div>
      <span style={{ fontSize: 11, color: "#444", fontWeight: 500, lineHeight: 1 }}>{label}</span>
    </button>
  );
};

// ─── Hours Section ────────────────────────────────────────────────────────────
const HoursSection = ({ hours, isOpen, closesAt }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={sectionStyle}>
      <button
        onClick={() => setExpanded((e) => !e)}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: 14,
          background: "none", border: "none", padding: 0, cursor: "pointer",
          textAlign: "left", fontFamily: "inherit",
        }}
      >
        <div style={iconWrap}>
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" fill="#70757a" />
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <span style={{ color: isOpen ? "#137333" : "#c5221f", fontWeight: 500, fontSize: 14 }}>
            {isOpen ? "Open" : "Closed"}
          </span>
          {isOpen && (
            <span style={{ color: "#70757a", fontSize: 14 }}>
              {" "}· Closes {closesAt}
            </span>
          )}
        </div>
        <svg
          width={18} height={18} viewBox="0 0 24 24"
          style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s", color: "#70757a", flexShrink: 0 }}
        >
          <path d="M7 10l5 5 5-5z" fill="currentColor" />
        </svg>
      </button>

      <div style={{
        overflow: "hidden",
        maxHeight: expanded ? `${hours.length * 28}px` : 0,
        transition: "max-height 0.3s ease",
      }}>
        <div style={{ paddingLeft: 32, paddingTop: 10 }}>
          {hours.map((h) => (
            <div key={h.day} style={{
              display: "flex", justifyContent: "space-between",
              padding: "3px 0", fontSize: 13,
              fontWeight: h.day === TODAY ? 600 : 400,
              color: h.day === TODAY ? "#202124" : "#70757a",
            }}>
              <span style={{ minWidth: 100 }}>{h.day}</span>
              <span>{h.open} – {h.close}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Info Row ─────────────────────────────────────────────────────────────────
const InfoRow = ({ icon, children, action, actionLabel }) => (
  <div style={{ ...sectionStyle, display: "flex", alignItems: "flex-start", gap: 14 }}>
    <div style={iconWrap}>{icon}</div>
    <div style={{ flex: 1, fontSize: 14, color: "#202124", lineHeight: 1.5 }}>{children}</div>
    {action && (
      <button onClick={action} style={{
        background: "none", border: "none", color: "#1a73e8",
        fontSize: 13, cursor: "pointer", fontFamily: "inherit", flexShrink: 0,
      }}>
        {actionLabel}
      </button>
    )}
  </div>
);

// ─── Review Card ──────────────────────────────────────────────────────────────
const ReviewCard = ({ review }) => (
  <div style={{
    background: "#fff", border: "1px solid #e8eaed", borderRadius: 10,
    padding: "12px 14px", flexShrink: 0, width: 260,
    scrollSnapAlign: "start",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
      <div style={{
        width: 32, height: 32, borderRadius: "50%",
        background: avatarColor(review.avatar),
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontWeight: 700, fontSize: 14, flexShrink: 0,
      }}>
        {review.avatar}
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#202124" }}>{review.name}</div>
        <div style={{ fontSize: 11, color: "#70757a" }}>{review.time}</div>
      </div>
    </div>
    <Stars rating={review.rating} size={12} />
    <p style={{ margin: "6px 0 0", fontSize: 13, color: "#3c4043", lineHeight: 1.5 }}>{review.text}</p>
  </div>
);

const avatarColor = (letter) => {
  const colors = { S: "#ea4335", J: "#1a73e8", P: "#137333", A: "#f9ab00", R: "#fa7b17" };
  return colors[letter] || "#70757a";
};

// ─── Shared styles ────────────────────────────────────────────────────────────
const sectionStyle = {
  padding: "12px 0",
  borderTop: "1px solid #e8eaed",
};

const iconWrap = {
  width: 20, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
  marginTop: 2, color: "#70757a",
};

// ─── Main Panel ───────────────────────────────────────────────────────────────
const PlacePanel = ({ place, loading, onClose }) => {
  const [saved, setSaved] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const scrollRef = useRef(null);

  const tabs = ["Overview", "Reviews", "About"];

  return (
    <>
      <div ref={scrollRef} style={{
        height: "100%", overflowY: "auto", background: "#fff",
        scrollbarWidth: "thin", scrollbarColor: "#dadce0 transparent",
      }}>
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {/* Photo Gallery */}
            <PhotoGallery
              photos={place.photos}
              onOpenLightbox={(i) => { setLightboxIndex(i); setLightboxOpen(true); }}
            />

            {/* Main info */}
            <div style={{ padding: "14px 16px 0" }}>
              <h1 style={{ margin: "0 0 2px", fontSize: 22, fontWeight: 600, color: "#202124", lineHeight: 1.2 }}>
                {place.name}
              </h1>
              <div style={{ fontSize: 13, color: "#70757a", marginBottom: 8 }}>
                {place.category} · {place.priceLevel}
              </div>

              {/* Rating */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
                <span style={{ fontWeight: 700, fontSize: 15, color: "#202124" }}>{place.rating}</span>
                <Stars rating={place.rating} size={15} />
                <a href="#reviews" style={{ fontSize: 13, color: "#1a73e8", textDecoration: "none" }}
                  onClick={(e) => { e.preventDefault(); setActiveTab("reviews"); }}>
                  {place.reviewCount.toLocaleString()} reviews
                </a>
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: 2, marginBottom: 4 }}>
                <ActionButton
                  icon={<svg width={20} height={20} viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/></svg>}
                  label="Directions"
                />
                <ActionButton
                  icon={<svg width={20} height={20} viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/></svg>}
                  label="Call"
                />
                <ActionButton
                  icon={saved
                    ? <svg width={20} height={20} viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" fill="#1a73e8"/></svg>
                    : <svg width={20} height={20} viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z" fill="currentColor"/></svg>
                  }
                  label="Save"
                  active={saved}
                  onClick={() => setSaved((s) => !s)}
                />
                <ActionButton
                  icon={<svg width={20} height={20} viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" fill="currentColor"/></svg>}
                  label="Share"
                />
              </div>
            </div>

            {/* Tags */}
            <div style={{ padding: "4px 16px 8px", display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none" }}>
              {place.tags.map((tag) => (
                <span key={tag} style={{
                  flexShrink: 0, background: "#f1f3f4", borderRadius: 16,
                  padding: "5px 12px", fontSize: 12, color: "#3c4043", fontWeight: 500,
                  cursor: "default", whiteSpace: "nowrap",
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Tabs */}
            <div style={{
              display: "flex", borderBottom: "1px solid #e8eaed",
              padding: "0 16px", position: "sticky", top: 0, background: "#fff", zIndex: 10,
            }}>
              {tabs.map((tab) => {
                const key = tab.toLowerCase();
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(key)}
                    style={{
                      background: "none", border: "none", padding: "10px 12px",
                      fontSize: 13, fontWeight: 500, cursor: "pointer",
                      color: activeTab === key ? "#1a73e8" : "#70757a",
                      borderBottom: activeTab === key ? "2px solid #1a73e8" : "2px solid transparent",
                      marginBottom: -1, transition: "color 0.15s", fontFamily: "inherit",
                    }}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Tab content */}
            <div style={{ padding: "0 16px" }}>
              {activeTab === "overview" && (
                <div>
                  <HoursSection hours={place.hours} isOpen={place.status === "open"} closesAt={place.closesAt} />

                  <InfoRow
                    icon={<svg width={18} height={18} viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#70757a"/></svg>}
                  >
                    {place.address}
                  </InfoRow>

                  <InfoRow
                    icon={<svg width={18} height={18} viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#70757a"/></svg>}
                  >
                    {place.phone}
                  </InfoRow>

                  <InfoRow
                    icon={<svg width={18} height={18} viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z" fill="#70757a"/></svg>}
                  >
                    <a href="#" style={{ color: "#1a73e8", textDecoration: "none" }}>{place.website}</a>
                  </InfoRow>

                  {/* About snippet */}
                  <div style={{ ...sectionStyle }}>
                    <p style={{ margin: 0, fontSize: 13, color: "#3c4043", lineHeight: 1.6 }}>
                      {place.about}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div style={{ paddingTop: 12 }}>
                  {/* Summary */}
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 48, fontWeight: 300, color: "#202124", lineHeight: 1 }}>{place.rating}</div>
                      <Stars rating={place.rating} size={16} />
                      <div style={{ fontSize: 12, color: "#70757a", marginTop: 4 }}>{place.reviewCount.toLocaleString()} reviews</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      {[5, 4, 3, 2, 1].map((n) => {
                        const pct = n === 5 ? 72 : n === 4 ? 19 : n === 3 ? 6 : n === 2 ? 2 : 1;
                        return (
                          <div key={n} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                            <span style={{ fontSize: 11, color: "#70757a", width: 6 }}>{n}</span>
                            <div style={{ flex: 1, height: 6, background: "#e8eaed", borderRadius: 3, overflow: "hidden" }}>
                              <div style={{ width: `${pct}%`, height: "100%", background: "#f9ab00", borderRadius: 3 }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Scrollable review cards */}
                  <div style={{
                    display: "flex", gap: 10, overflowX: "auto", paddingBottom: 12,
                    marginLeft: -16, paddingLeft: 16, marginRight: -16, paddingRight: 16,
                    scrollSnapType: "x mandatory", scrollbarWidth: "none",
                  }}>
                    {place.reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
                  </div>

                  {/* Individual reviews */}
                  {place.reviews.map((r) => (
                    <div key={r.id} style={{ borderTop: "1px solid #e8eaed", paddingTop: 14, marginTop: 4, paddingBottom: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: "50%",
                          background: avatarColor(r.avatar),
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#fff", fontWeight: 700, fontSize: 15,
                        }}>
                          {r.avatar}
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#202124" }}>{r.name}</div>
                          <div style={{ fontSize: 12, color: "#70757a" }}>{r.time}</div>
                        </div>
                      </div>
                      <Stars rating={r.rating} />
                      <p style={{ margin: "6px 0 0", fontSize: 13.5, color: "#3c4043", lineHeight: 1.6 }}>{r.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "about" && (
                <div style={{ paddingTop: 12 }}>
                  <div style={{ ...sectionStyle, borderTop: "none" }}>
                    <h3 style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 600, color: "#202124" }}>About</h3>
                    <p style={{ margin: 0, fontSize: 13.5, color: "#3c4043", lineHeight: 1.7 }}>{place.about}</p>
                  </div>
                  <div style={sectionStyle}>
                    <h3 style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 600, color: "#202124" }}>Popular for</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {place.tags.map((tag) => (
                        <span key={tag} style={{
                          background: "#f1f3f4", borderRadius: 16,
                          padding: "5px 12px", fontSize: 12, color: "#3c4043", fontWeight: 500,
                        }}>✓ {tag}</span>
                      ))}
                    </div>
                  </div>
                  <div style={sectionStyle}>
                    <h3 style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 600, color: "#202124" }}>Contact</h3>
                    <div style={{ fontSize: 13.5, color: "#3c4043", lineHeight: 2 }}>
                      <div>📍 {place.address}</div>
                      <div>📞 {place.phone}</div>
                      <div>🌐 <a href="#" style={{ color: "#1a73e8", textDecoration: "none" }}>{place.website}</a></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom padding */}
            <div style={{ height: 32 }} />
          </>
        )}
      </div>

      {lightboxOpen && (
        <Lightbox photos={place.photos} initialIndex={lightboxIndex} onClose={() => setLightboxOpen(false)} />
      )}
    </>
  );
};

// ─── Map Placeholder ──────────────────────────────────────────────────────────
const MapBackground = () => (
  <div style={{
    position: "absolute", inset: 0,
    background: "#e5e3df",
    overflow: "hidden",
  }}>
    {/* Simplified map-like grid */}
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.6 }}>
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#d0ccc8" strokeWidth="1" />
        </pattern>
        <pattern id="blocks" width="180" height="120" patternUnits="userSpaceOnUse">
          <rect x="10" y="10" width="70" height="40" rx="2" fill="#f5f2ee" stroke="#d0ccc8" strokeWidth="1" />
          <rect x="100" y="10" width="60" height="55" rx="2" fill="#f5f2ee" stroke="#d0ccc8" strokeWidth="1" />
          <rect x="10" y="65" width="50" height="45" rx="2" fill="#f5f2ee" stroke="#d0ccc8" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      <rect width="100%" height="100%" fill="url(#blocks)" />
      {/* Roads */}
      <line x1="0" y1="33%" x2="100%" y2="33%" stroke="#fff" strokeWidth="8" />
      <line x1="0" y1="66%" x2="100%" y2="66%" stroke="#fff" strokeWidth="5" />
      <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#fff" strokeWidth="5" />
      <line x1="65%" y1="0" x2="65%" y2="100%" stroke="#fff" strokeWidth="8" />
    </svg>

    {/* Pin */}
    <div style={{
      position: "absolute", left: "50%", top: "40%",
      transform: "translate(-50%, -100%)",
      display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: "50% 50% 50% 0",
        background: "#ea4335", transform: "rotate(-45deg)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ transform: "rotate(45deg)", color: "#fff", fontSize: 14 }}>🥤</div>
      </div>
      <div style={{
        width: 6, height: 6, background: "rgba(0,0,0,0.2)",
        borderRadius: "50%", marginTop: 2,
        boxShadow: "0 0 0 3px rgba(0,0,0,0.06)",
      }} />
    </div>
  </div>
);

// ─── Bottom Sheet (Mobile) ────────────────────────────────────────────────────
const BottomSheet = ({ place, loading }) => {
  const [snapState, setSnapState] = useState("peek"); // peek | half | full
  const dragRef = useRef(null);
  const startY = useRef(null);
  const startSnap = useRef(null);

  const snapHeights = { peek: 120, half: "55%", full: "92%" };
  const currentHeight = snapHeights[snapState];

  const handleDragStart = (e) => {
    startY.current = e.touches ? e.touches[0].clientY : e.clientY;
    startSnap.current = snapState;
  };

  const handleDragEnd = (e) => {
    const endY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
    const delta = startY.current - endY;

    if (delta > 40) {
      setSnapState((s) => s === "peek" ? "half" : "full");
    } else if (delta < -40) {
      setSnapState((s) => s === "full" ? "half" : "peek");
    }
  };

  return (
    <div
      ref={dragRef}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        height: currentHeight,
        background: "#fff",
        borderRadius: "16px 16px 0 0",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.15)",
        transition: "height 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
        display: "flex", flexDirection: "column",
        zIndex: 100, overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* Handle */}
      <div
        style={{
          display: "flex", justifyContent: "center",
          paddingTop: 10, paddingBottom: 4, cursor: "grab", flexShrink: 0,
        }}
      >
        <div style={{ width: 36, height: 4, borderRadius: 2, background: "#dadce0" }} />
      </div>

      {snapState === "peek" ? (
        // Peek state: just show name, rating, open status
        <div style={{ padding: "4px 16px 12px", cursor: "pointer" }} onClick={() => setSnapState("half")}>
          <div style={{ fontSize: 17, fontWeight: 600, color: "#202124", marginBottom: 4 }}>{place.name}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            <span style={{ fontWeight: 600 }}>{place.rating}</span>
            <Stars rating={place.rating} size={12} />
            <span style={{ color: "#70757a" }}>{place.reviewCount.toLocaleString()}</span>
            <span style={{ color: "#137333", fontWeight: 500 }}>Open</span>
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, overflow: "hidden" }}>
          <PlacePanel place={place} loading={loading} />
        </div>
      )}
    </div>
  );
};

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setPlace(PLACE);
      setLoading(false);
    }, 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'Google Sans', Roboto, Arial, sans-serif; }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 3px; }

        .desktop-panel { display: flex !important; }
        .mobile-sheet { display: none !important; }

        @media (max-width: 768px) {
          .desktop-panel { display: none !important; }
          .mobile-sheet { display: block !important; }
        }
      `}</style>

      <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
        <MapBackground />

        {/* Google Maps top search bar */}
        <div style={{
          position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)",
          zIndex: 50, display: "flex", gap: 8,
        }}>
          <div style={{
            background: "#fff", borderRadius: 24, padding: "8px 16px",
            display: "flex", alignItems: "center", gap: 8,
            boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
            fontSize: 14, color: "#70757a", minWidth: 240,
          }}>
            <svg width={16} height={16} viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="#70757a"/></svg>
            Juice Junction, Mangalore
          </div>
        </div>

        {/* Desktop: side panel */}
        <div className="desktop-panel" style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 400,
          background: "#fff", boxShadow: "2px 0 8px rgba(0,0,0,0.12)",
          zIndex: 100, display: "flex", flexDirection: "column",
          animation: "slideUp 0.3s ease",
        }}>
          <PlacePanel place={loading ? PLACE : place} loading={loading} />
        </div>

        {/* Mobile: bottom sheet */}
        <div className="mobile-sheet" style={{ position: "absolute", inset: 0 }}>
          <BottomSheet place={loading ? PLACE : (place || PLACE)} loading={loading} />
        </div>
      </div>
    </>
  );
}
