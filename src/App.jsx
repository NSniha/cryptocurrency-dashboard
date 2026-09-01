import { useEffect, useMemo, useRef, useState } from "react";

/* ===================================
   SVG Assets
=================================== */

const svgData = (svg) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

const logoMark = svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
    <defs>
        <linearGradient id="logoGradient" x1="5" y1="5" x2="45" y2="45">
            <stop stop-color="#00dceb"/>
            <stop offset=".46" stop-color="#278ff3"/>
            <stop offset="1" stop-color="#7143df"/>
        </linearGradient>
    </defs>

    <path d="M6 5h38L22 24.5 44 45H6V5Z" fill="url(#logoGradient)"/>
</svg>
`);

const avatarImage = svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
    <defs>
        <linearGradient id="skinGradient" x1="28" y1="16" x2="50" y2="57">
            <stop stop-color="#f2c99f"/>
            <stop offset="1" stop-color="#c98157"/>
        </linearGradient>
    </defs>

    <circle cx="40" cy="40" r="39" fill="#eee7df"/>

    <path d="M18 79c2-18 10-28 22-28s20 10 22 28H18Z" fill="#3e4d68"/>

    <ellipse cx="40" cy="34" rx="15" ry="18" fill="url(#skinGradient)"/>

    <path d="M24 31c1-16 28-23 33-3-7-7-23-10-33 3Z" fill="#52382d"/>

    <circle cx="34" cy="34" r="1.4" fill="#283044"/>

    <circle cx="46" cy="34" r="1.4" fill="#283044"/>

    <path d="M35 43c3.5 2.6 7 2.6 10 0" fill="none" stroke="#99594d" stroke-width="1.4" stroke-linecap="round"/>

    <path d="M28.5 32.5h10.5M41 32.5h10.5M39 32.5h2" fill="none" stroke="#434a5b" stroke-width="1.2"/>
</svg>
`);

const usFlag = svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
    <defs>
        <clipPath id="flagClip">
            <circle cx="20" cy="20" r="19"/>
        </clipPath>
    </defs>

    <g clip-path="url(#flagClip)">
        <rect width="40" height="40" fill="#fff"/>

        <path fill="#e62f44" d="M0 0h40v4H0zm0 8h40v4H0zm0 8h40v4H0zm0 8h40v4H0zm0 8h40v4H0"/>

        <rect width="18" height="22" fill="#22478c"/>

        <g fill="#fff">
            <circle cx="4" cy="4" r="1"/>
            <circle cx="9" cy="4" r="1"/>
            <circle cx="14" cy="4" r="1"/>
            <circle cx="6.5" cy="9" r="1"/>
            <circle cx="11.5" cy="9" r="1"/>
            <circle cx="4" cy="14" r="1"/>
            <circle cx="9" cy="14" r="1"/>
            <circle cx="14" cy="14" r="1"/>
        </g>
    </g>

    <circle cx="20" cy="20" r="19" fill="none" stroke="#e4e8ef"/>
</svg>
`);

const btcIcon = (background = "#ffb52f") => svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
    <circle cx="22" cy="22" r="21" fill="${background}"/>

    <path d="M27.8 15.1c-.4-3-3-4-6.2-4.3V7.5h-2v3.2H18V7.5h-2v3.3h-4v2.1l3 .5v16.1l-3 .5v2.1h4v3.3h2v-3.2h1.6v3.2h2v-3.3c4-.3 6.8-1.5 7.4-5.3.4-3.1-1.2-4.5-3.8-5.2 1.8-.8 3-2.5 2.6-5.5ZM17.7 15c2.6 0 5.4-.3 5.4 2.4 0 2.5-2.8 2.4-5.4 2.4V15Zm0 12.8v-5.3c3.1 0 6.4-.3 6.4 2.7 0 2.9-3.3 2.6-6.4 2.6Z" fill="#fff"/>
</svg>
`);

const ethIcon = svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
    <circle cx="22" cy="22" r="21" fill="#607ce8"/>

    <path d="m22 7.5-9 14.7 9 5.2 9-5.2L22 7.5Z" fill="#fff"/>

    <path d="m22 29.2-9-5.1L22 36.5l9-12.4-9 5.1Z" fill="#dbe3ff"/>
</svg>
`);

const xrpIcon = svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
    <circle cx="22" cy="22" r="21" fill="#168fc8"/>

    <path d="M10.5 11.8h4.8l7 7.2 7-7.2h4.2L24.4 21c-1.3 1.2-3 1.2-4.3 0l-9.6-9.2Zm23 20.4h-4.8l-7-7.2-7 7.2h-4.2l9.1-9.2c1.3-1.2 3-1.2 4.3 0l9.6 9.2Z" fill="#fff"/>
</svg>
`);

const xemIcon = svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
    <circle cx="22" cy="22" r="21" fill="#18c6b5"/>

    <path d="M10 14.5 22 9l12 5.5c-.5 10.6-4.3 17.5-12 21-7.7-3.5-11.5-10.4-12-21Z" fill="none" stroke="#fff" stroke-width="1.7"/>

    <path d="m13.5 15.4 8.4 5.8 8.6-5.8M22 21.2v9.3" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round"/>
</svg>
`);

const ltcIcon = svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
    <circle cx="22" cy="22" r="21" fill="#b9bbc2"/>

    <path d="m17.4 12.4 6.1-1.3-2.4 10.1 5.6-2.1-.9 3.5-5.6 2.1-1 4.1h11.4l-1 4H12.8l1.7-6.3-3 1.1.9-3.6 3-1.1 2-10.5Z" fill="#fff"/>
</svg>
`);

const etcIcon = svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
    <circle cx="22" cy="22" r="21" fill="#22b76c"/>

    <path d="m22 8-9 14.2 9 4.8 9-4.8L22 8Z" fill="#fff"/>

    <path d="m22 28.9-9-4.9 9 12 9-12-9 4.9Z" fill="#d9f5e5"/>
</svg>
`);

const fctIcon = svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
    <circle cx="22" cy="22" r="21" fill="#7199b3"/>

    <path d="M13 12.5h18v4H17v5.5h11v4H17v8h-4V12.5Z" fill="#fff"/>
</svg>
`);

const lskIcon = svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
    <circle cx="22" cy="22" r="21" fill="#17375f"/>

    <path d="M22 8 11.5 27.2 22 36l10.5-8.8L22 8Zm0 8.4 5.7 10-5.7 4.8-5.7-4.8 5.7-10Z" fill="#fff"/>
</svg>
`);

const adaIcon = svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
    <circle cx="22" cy="22" r="21" fill="#326fd1"/>

    <g fill="#fff">
        <circle cx="22" cy="22" r="3"/>
        <circle cx="22" cy="12" r="1.7"/>
        <circle cx="22" cy="32" r="1.7"/>
        <circle cx="12" cy="22" r="1.7"/>
        <circle cx="32" cy="22" r="1.7"/>
        <circle cx="15" cy="15" r="1.2"/>
        <circle cx="29" cy="15" r="1.2"/>
        <circle cx="15" cy="29" r="1.2"/>
        <circle cx="29" cy="29" r="1.2"/>
    </g>
</svg>
`);

const solIcon = svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
    <defs>
        <linearGradient id="solGradient" x1="10" y1="10" x2="34" y2="34">
            <stop stop-color="#42f6be"/>
            <stop offset=".5" stop-color="#21c5ec"/>
            <stop offset="1" stop-color="#9e50ff"/>
        </linearGradient>
    </defs>

    <circle cx="22" cy="22" r="21" fill="#171d30"/>

    <path d="M13 13h19l-4 4H9l4-4Zm-4 9h19l4 4H13l-4-4Zm4 9h19l-4 4H9l4-4Z" fill="url(#solGradient)"/>
</svg>
`);

const dogeIcon = svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
    <circle cx="22" cy="22" r="21" fill="#cba83f"/>

    <path d="M15 11h9c7 0 11 4.4 11 11s-4 11-11 11h-9v-8h-3v-4h3V11Zm5 4v6h7v4h-7v4h4c4.1 0 6-2.5 6-7s-1.9-7-6-7h-4Z" fill="#fff"/>
</svg>
`);

const purpleCorner = svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 150">
    <defs>
        <linearGradient id="purpleGradient" x1="0" y1="0" x2="1" y2="1">
            <stop stop-color="#4d6cff"/>
            <stop offset="1" stop-color="#9a70ea"/>
        </linearGradient>
    </defs>

    <path d="M180 0v150H0L180 0Z" fill="url(#purpleGradient)"/>

    <g opacity=".25" fill="none" stroke="#4546bd" stroke-width="5">
        <circle cx="132" cy="93" r="19"/>
        <path d="M110 93h44M132 71v44M93 79l39-26 35 24v43l-35 22-39-22V79Z"/>
    </g>
</svg>
`);

const blueCorner = svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 150">
    <defs>
        <linearGradient id="blueGradient" x1="0" y1="0" x2="1" y2="1">
            <stop stop-color="#32c8ef"/>
            <stop offset="1" stop-color="#168ed9"/>
        </linearGradient>
    </defs>

    <path d="M180 0v150H0L180 0Z" fill="url(#blueGradient)"/>
</svg>
`);

/* ===================================
   Dashboard Data
=================================== */

const coinData = {
    BTC: { symbol: "BTC", name: "Bitcoin", price: 721882, displayPrice: "¥ 721,882", change: "-4.66%", trend: "down", color: "#f4ae31", icon: btcIcon(), high: "725,974", low: "718,000", volume: "677.7 BTC" },
    ETH: { symbol: "ETH", name: "Ethereum", price: 22370, displayPrice: "¥ 22,370", change: "+0.45%", trend: "up", color: "#7188f1", icon: ethIcon, high: "23,018", low: "21,841", volume: "8,936 ETH" },
    XEM: { symbol: "XEM", name: "NEM", price: 10.604, displayPrice: "¥ 10.604", change: "-1.07%", trend: "down", color: "#22c5b4", icon: xemIcon, high: "10.918", low: "10.201", volume: "2.4M XEM" },
    XRP: { symbol: "XRP", name: "Ripple", price: 50.839, displayPrice: "¥ 50.839", change: "+0.66%", trend: "up", color: "#3cb1e5", icon: xrpIcon, high: "51.404", low: "49.832", volume: "6.7M XRP" },
    BCH: { symbol: "BCH", name: "Bitcoin Cash", price: 48676, displayPrice: "¥ 48,676", change: "+0.38%", trend: "up", color: "#ff8e17", icon: btcIcon("#ff8e17"), high: "49,082", low: "47,911", volume: "1,930 BCH" },
    LTC: { symbol: "LTC", name: "Litecoin", price: 5788.5, displayPrice: "¥ 5,788.5", change: "-0.23%", trend: "down", color: "#babdc3", icon: ltcIcon, high: "5,902", low: "5,711", volume: "9,422 LTC" },
    ETC: { symbol: "ETC", name: "Ethereum Classic", price: 1660.7, displayPrice: "¥ 1,660.7", change: "-0.09%", trend: "down", color: "#22b66b", icon: etcIcon, high: "1,681", low: "1,642", volume: "32K ETC" },
    FCT: { symbol: "FCT", name: "Factom", price: 534.68, displayPrice: "¥ 534.68", change: "+8.47%", trend: "up", color: "#729ab4", icon: fctIcon, high: "552.12", low: "488.05", volume: "27K FCT" },
    LSK: { symbol: "LSK", name: "Lisk", price: 321.14, displayPrice: "¥ 321.14", change: "-0.47%", trend: "down", color: "#16375f", icon: lskIcon, high: "326.10", low: "317.42", volume: "88K LSK" },
    ADA: { symbol: "ADA", name: "Cardano", price: 84.34, displayPrice: "¥ 84.34", change: "+2.41%", trend: "up", color: "#3672d4", icon: adaIcon, high: "86.13", low: "81.07", volume: "4.2M ADA" },
    SOL: { symbol: "SOL", name: "Solana", price: 23580, displayPrice: "¥ 23,580", change: "+3.12%", trend: "up", color: "#4adcb7", icon: solIcon, high: "24,004", low: "22,711", volume: "12K SOL" },
    DOGE: { symbol: "DOGE", name: "Dogecoin", price: 23.47, displayPrice: "¥ 23.47", change: "-0.82%", trend: "down", color: "#c8a43e", icon: dogeIcon, high: "24.12", low: "23.10", volume: "6.8M DOGE" },
};

const overviewSymbols = ["BTC", "ETH", "XEM", "XRP"];

const sparkData = {
    BTC: [14, 28, 38, 40, 48, 55, 48, 43, 43, 54, 55, 46, 45, 48, 70, 78, 48, 20, 12, 13, 30, 58, 69, 34],
    ETH: [29, 45, 52, 50, 39, 30, 31, 40, 55, 63, 59, 53, 52, 46, 42, 44, 57, 61, 54, 36, 23, 20, 37, 59],
    XEM: [64, 69, 65, 59, 60, 66, 61, 50, 47, 50, 55, 57, 62, 58, 43, 17, 9, 10, 15, 17, 18, 18, 22, 12],
    XRP: [28, 29, 35, 37, 38, 46, 49, 64, 66, 63, 48, 31, 30, 38, 48, 49, 44, 35, 35, 42, 43, 40, 42, 44],
};

const closeValues = [
    722100, 722700, 723200, 722800, 723500, 722700, 722900, 722300, 723100,
    721700, 722600, 723900, 724400, 724000, 724600, 723700, 722300, 723900,
    724500, 723900, 724700, 724100, 723300, 722900, 723800, 723300, 723700,
    722900, 723500, 723100, 722600, 722000, 721800, 722600, 723100, 724000,
    723700, 724500, 724100, 724900, 724000, 725100, 724200, 723800, 724800,
    724100, 724700, 723600, 724400, 723500, 722900, 722600, 721900, 722700,
    722100, 721900, 722600, 721500, 721100, 720900, 721500, 721000, 721400,
    721100, 722000, 722800, 721900, 723300, 722700, 721600, 722300, 721400,
];

const volumeValues = [
    18, 12, 8, 10, 7, 9, 6, 14, 8, 9, 10, 7, 11, 8, 7, 25, 17, 11,
    9, 8, 10, 15, 7, 29, 15, 11, 9, 7, 12, 10, 11, 18, 13, 14, 9, 15,
    8, 10, 12, 17, 8, 13, 7, 12, 11, 13, 7, 11, 8, 10, 12, 15, 8, 10,
    31, 8, 11, 9, 8, 16, 10, 12, 8, 10, 12, 18, 9, 12, 14, 11, 8, 16,
];

const defaultActivities = [
    { id: 1, date: "2018/10/02 10:57:46", detail: "Deposit Japanese Yen", price: "+10,000 JPY", coin: "JPY" },
    { id: 2, date: "2018/10/10 10:57:46", detail: "Bought Bitcoin", price: "+ 0.00018147 BTC", coin: "BTC" },
    { id: 3, date: "2018/10/10 10:57:46", detail: "Service fee", price: "- 500 JPY", coin: "JPY" },
    { id: 4, date: "2018/10/13 11:24:18", detail: "Bought Ethereum", price: "+ 0.051 ETH", coin: "ETH" },
    { id: 5, date: "2018/10/15 08:32:44", detail: "Received Ripple", price: "+ 138.22 XRP", coin: "XRP" },
    { id: 6, date: "2018/10/17 13:41:23", detail: "Sold NEM", price: "+ 3,421 JPY", coin: "XEM" },
];

const news = [
    { id: 1, date: "Today", time: "11:36", title: "Beyond Bad Trades: Cybersecurity Risks to Cryptocurrency Exchange Users", description: "Cryptocurrency-related threats continue to evolve as cybercriminals adopt increasingly sophisticated methods.", corner: purpleCorner, category: "Security" },
    { id: 2, date: "Yesterday", time: "18:20", title: "Ripple plans another technology upgrade focused on scalability and transaction performance.", description: "The development roadmap outlines improvements to network speed, reliability and developer tooling.", corner: blueCorner, category: "Ripple" },
    { id: 3, date: "Aug 28", time: "09:18", title: "Ethereum market activity increases as traders prepare for upcoming network changes.", description: "Trading volume increased across several major markets while Ethereum maintained a stable range.", corner: purpleCorner, category: "Ethereum" },
];

const menuItems = [
    { label: "Dashboard", icon: "home", active: true },
    { label: "Exchange", icon: "sync-outline" },
    { label: "My Wallet", icon: "wallet-outline", arrow: true },
    { label: "Tradeview", icon: "stats-chart-outline" },
];

const accountItems = [
    { label: "Notifications", icon: "megaphone-outline" },
    { label: "Settings", icon: "settings-outline" },
    { label: "FAQ", icon: "help-circle-outline" },
];

const transactionItems = ["Buy & Sell Coin", "Deposit Yen", "Withdraw Yen", "Send Coin", "Receive Coin", "Deposit Coin"];

const activityFilters = ["ALL", "BTC", "ETH", "XRP", "XEM", "JPY"];

const timeFrames = ["1 min", "5 min", "15 min", "1", "4 hr", "1 day"];

function Icon({ name, className = "" }) {
    return <ion-icon name={name} class={className}></ion-icon>;
}

/* ===================================
   Sidebar
=================================== */

function Sidebar({ open, onClose, desktopCollapsed }) {
    const [transactionsOpen, setTransactionsOpen] = useState(true);

    return (
        <>
            <button type="button" onClick={onClose} aria-label="Close navigation" className={`sidebar-overlay fixed inset-0 z-40 xl:hidden ${open ? "is-visible" : ""}`}></button>

            <aside className={`dashboard-sidebar fixed inset-y-0 left-0 z-50 flex w-[282px] flex-col overflow-y-auto bg-[#1f263e] text-[#aeb6c8] xl:w-[217px] ${open ? "is-mobile-open" : ""} ${desktopCollapsed ? "is-desktop-collapsed" : ""}`}>
                <div className="sidebar-brand-row flex h-[72px] shrink-0 items-center border-b border-white/[0.055] px-[17px] xl:px-[22px]">
                    <a href="#dashboard" className="flex min-w-0 flex-1 items-center gap-[11px]" aria-label="Coinspace home">
                        <img src={logoMark} alt="Coinspace" className="h-[35px] w-[35px] shrink-0" />

                        <span className="truncate text-[15px] font-light tracking-[0.145em] text-[#eef1f8]">
                            COINSPACE
                        </span>
                    </a>

                    <button type="button" onClick={onClose} className="sidebar-close ml-[14px] flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[9px] text-[25px] text-white xl:hidden" aria-label="Close menu">
                        <Icon name="close-outline" />
                    </button>
                </div>

                <nav className="flex-1 pb-[18px]">
                    <div className="px-[23px] pb-[17px] pt-[19px]">
                        <h2 className="text-[18px] font-semibold leading-none text-white">Quick Access</h2>
                    </div>

                    {menuItems.map((item) => (
                        <button key={item.label} type="button" className={`sidebar-link flex h-[42px] w-full items-center border-l-[4px] px-[18px] text-left text-[13px] ${item.active ? "is-active" : ""}`}>
                            <Icon name={item.icon} className="mr-[11px] text-[21px]" />

                            <span>{item.label}</span>

                            {item.arrow && <Icon name="chevron-forward-outline" className="ml-auto text-[16px] text-[#45bde9]" />}
                        </button>
                    ))}

                    <div className="px-[23px] pb-[17px] pt-[23px]">
                        <h2 className="text-[18px] font-semibold leading-none text-white">Service</h2>
                    </div>

                    <button type="button" onClick={() => setTransactionsOpen((value) => !value)} aria-expanded={transactionsOpen} className="sidebar-link flex h-[42px] w-full items-center border-l-[4px] border-transparent bg-[#303750] px-[18px] text-left text-[13px] text-white">
                        <Icon name="business-outline" className="mr-[11px] text-[21px]" />

                        <span>Transactions</span>

                        <span className="ml-auto mr-[8px] flex h-[16px] min-w-[21px] items-center justify-center rounded-full bg-[#ef6682] px-[5px] text-[8px] text-white">
                            3
                        </span>

                        <Icon name={transactionsOpen ? "chevron-down-outline" : "chevron-forward-outline"} className="text-[15px] text-[#41bde9]" />
                    </button>

                    <div className={`grid transition-[grid-template-rows] duration-300 ${transactionsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                        <div className="overflow-hidden">
                            {transactionItems.map((item) => (
                                <button key={item} type="button" className="sidebar-sub-link block h-[40px] w-full pl-[59px] pr-[14px] text-left text-[13px]">
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button type="button" className="sidebar-link flex h-[42px] w-full items-center px-[22px] text-left text-[13px]">
                        <Icon name="gift-outline" className="mr-[11px] text-[21px]" />

                        <span>Rewards</span>

                        <Icon name="chevron-forward-outline" className="ml-auto text-[16px] text-[#43bee9]" />
                    </button>

                    <button type="button" className="sidebar-link flex h-[42px] w-full items-center px-[22px] text-left text-[13px]">
                        <Icon name="bulb-outline" className="mr-[11px] text-[21px]" />

                        <span>Utility Plan</span>

                        <Icon name="chevron-forward-outline" className="ml-auto text-[16px] text-[#43bee9]" />
                    </button>

                    <div className="px-[23px] pb-[17px] pt-[23px]">
                        <h2 className="text-[18px] font-semibold leading-none text-white">Account</h2>
                    </div>

                    {accountItems.map((item) => (
                        <button key={item.label} type="button" className="sidebar-link flex h-[42px] w-full items-center px-[22px] text-left text-[13px]">
                            <Icon name={item.icon} className="mr-[11px] text-[21px]" />

                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <button type="button" className="sidebar-link flex h-[50px] shrink-0 items-center border-t border-white/[0.06] px-[22px] text-left text-[13px]">
                    <Icon name="power-outline" className="mr-[10px] text-[22px]" />

                    <span>Log Out</span>
                </button>
            </aside>
        </>
    );
}

/* ===================================
   Header
=================================== */

function Header({ onMenu, selectedSymbol, onSelectCoin, desktopCollapsed }) {
    const [query, setQuery] = useState("");
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    const notificationRef = useRef(null);

    const searchResults = useMemo(() => {
        if (!query.trim()) return [];

        const term = query.toLowerCase();

        return Object.values(coinData)
            .filter((coin) => coin.symbol.toLowerCase().includes(term) || coin.name.toLowerCase().includes(term))
            .slice(0, 6);
    }, [query]);

    useEffect(() => {
        const handleOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setNotificationsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutside);

        return () => document.removeEventListener("mousedown", handleOutside);
    }, []);

    const chooseCoin = (symbol) => {
        onSelectCoin(symbol);
        setQuery("");
    };

    return (
        <header className={`dashboard-header fixed left-0 right-0 top-0 z-30 h-[68px] border-b border-[#edf0f7] bg-white sm:h-[72px] ${desktopCollapsed ? "sidebar-is-collapsed" : ""}`}>
            <div className="header-container mx-auto flex h-full w-full max-w-[1400px] items-center px-[9px] sm:px-5 xl:px-[30px]">

                {/* Hamburger */}
                <button type="button" onClick={onMenu} className="header-icon-button shrink-0" aria-label="Toggle navigation">
                    <Icon name="menu-outline" />
                </button>

                {/* Mobile logo */}
                <a href="#dashboard" className="mobile-header-brand ml-[3px] flex min-w-0 items-center sm:hidden" aria-label="Coinspace home">
                    <img src={logoMark} alt="Coinspace" className="h-[30px] w-[30px] shrink-0" />

                    <span className="mobile-header-brand-name truncate text-[11px] font-medium tracking-[0.105em] text-[#3a4459]">
                        COINSPACE
                    </span>
                </a>

                {/* Desktop cube */}
                <button type="button" className="cube-btn header-icon-button ml-[4px] mr-[12px] hidden sm:flex" aria-label="Applications">
                    <Icon name="cube-outline" />
                </button>

                {/* Desktop search */}
                <div className="relative hidden w-[260px] sm:flex">
                    <Icon name="search-outline" className="absolute left-[13px] top-1/2 z-10 -translate-y-1/2 text-[21px] text-[#50bdeb]" />

                    <input
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Type any cryptocurrency..."
                        aria-label="Search cryptocurrency"
                        className="dashboard-search h-[36px] w-full rounded-full border-0 bg-[#f7f9fc] pl-[41px] pr-[15px] text-[11px] outline-none"
                    />

                    {searchResults.length > 0 && (
                        <div className="search-results absolute left-0 right-0 top-[44px] overflow-hidden rounded-[9px] border border-[#e2e7f0] bg-white">
                            {searchResults.map((coin) => (
                                <button key={coin.symbol} type="button" onClick={() => chooseCoin(coin.symbol)} className="flex w-full items-center px-[12px] py-[10px] text-left hover:bg-[#f8faff]">
                                    <img src={coin.icon} alt={`${coin.name} logo`} className="mr-[9px] h-[24px] w-[24px]" />

                                    <span>
                                        <strong className="block text-[11px] font-medium text-[#364055]">{coin.symbol}</strong>

                                        <span className="text-[9px] text-[#aeb5c1]">{coin.name}</span>
                                    </span>

                                    <span className="ml-auto text-[10px] text-[#4f596b]">{coin.displayPrice}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Header right controls */}
                <div className="header-right-actions ml-auto flex items-center">

                    <button type="button" className="header-profile-button" aria-label="Profile">
                        <img src={avatarImage} alt="User profile" className="rounded-full" />
                    </button>

                    <button type="button" className="header-icon-button" aria-label="Settings">
                        <Icon name="settings-outline" />
                    </button>
                    
                    <div ref={notificationRef} className="relative">
                        <button
                            type="button"
                            onClick={() => setNotificationsOpen((value) => !value)}
                            className={`header-notification-button ${notificationsOpen ? "is-active" : ""}`}
                            aria-label="Notifications"
                            aria-expanded={notificationsOpen}
                        >
                            <Icon name="megaphone-outline" />

                            <span className="notification-count absolute flex items-center justify-center rounded-full bg-[#ef6682] text-white">
                                3
                            </span>
                        </button>

                        {notificationsOpen && (
                            <div className="notification-panel absolute right-[-42px] top-[48px] w-[285px] overflow-hidden rounded-[10px] border border-[#e1e6ef] bg-white sm:right-0">
                                <div className="flex items-center border-b border-[#edf0f6] px-[14px] py-[12px]">
                                    <strong className="text-[12px] font-semibold text-[#30384a]">Notifications</strong>

                                    <button type="button" className="ml-auto text-[9px] text-[#5669ed]">
                                        Mark all read
                                    </button>
                                </div>

                                <button type="button" className="block w-full px-[14px] py-[11px] text-left hover:bg-[#fafbff]">
                                    <span className="block text-[11px] text-[#465064]">Bitcoin price alert</span>

                                    <span className="mt-[3px] block text-[9px] text-[#aeb5bf]">BTC dropped below ¥ 722,000</span>
                                </button>

                                <button type="button" className="block w-full border-t border-[#f0f2f7] px-[14px] py-[11px] text-left hover:bg-[#fafbff]">
                                    <span className="block text-[11px] text-[#465064]">Deposit completed</span>

                                    <span className="mt-[3px] block text-[9px] text-[#aeb5bf]">Your Ethereum deposit has been confirmed.</span>
                                </button>

                                <button type="button" className="block w-full border-t border-[#f0f2f7] px-[14px] py-[11px] text-left hover:bg-[#fafbff]">
                                    <span className="block text-[11px] text-[#465064]">Account security</span>

                                    <span className="mt-[3px] block text-[9px] text-[#aeb5bf]">A new sign-in was detected.</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Desktop language only */}
                    <button type="button" className="language-button hidden sm:flex" aria-label="English language">
                        <img src={usFlag} alt="United States flag" className="h-[27px] w-[27px]" />
                    </button>
                </div>
            </div>
        </header>
    );
}

/* ===================================
   Toolbar
=================================== */

function DashboardToolbar() {
    return (
        <div className="mb-[10px] flex min-h-[32px] items-center justify-between">
            <div className="flex items-center gap-[5px] text-[11px] text-[#596377]">
                <span className="triangle-dark"></span>

                <span>Welcome</span>

                <span className="text-[#b8bdc8]">/</span>

                <strong className="font-semibold text-[#1749d4]">Dashboard</strong>

                <span className="triangle-blue"></span>
            </div>

            <div className="hidden items-center gap-[8px] sm:flex">
                <button type="button" className="toolbar-button" aria-label="Grid view">
                    <Icon name="grid-outline" />
                </button>

                <button type="button" className="toolbar-button muted" aria-label="Previous">
                    <Icon name="chevron-back-outline" />
                </button>

                <button type="button" className="toolbar-button cyan" aria-label="Next">
                    <Icon name="chevron-forward-outline" />
                </button>
            </div>
        </div>
    );
}

/* ===================================
   Sparkline
=================================== */

function Sparkline({ symbol, values, color }) {
    const width = 260;
    const height = 58;

    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = Math.max(max - min, 1);

    const points = values.map((value, index) => {
        const x = (index / (values.length - 1)) * width;
        const y = 54 - ((value - min) / range) * 45;

        return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="h-[52px] w-full" aria-hidden="true">
            <defs>
                <linearGradient id={`spark-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity=".18" />

                    <stop offset="100%" stopColor={color} stopOpacity=".01" />
                </linearGradient>
            </defs>

            <polygon points={`0,58 ${points} 260,58`} fill={`url(#spark-${symbol})`} />

            <polyline points={points} fill="none" stroke={color} strokeWidth=".9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

/* ===================================
   Coin Overview
=================================== */

function CoinOverview({ selectedSymbol, onSelectCoin }) {
    const sliderRef = useRef(null);

    const [activeSlide, setActiveSlide] = useState(0);

    const goToSlide = (index) => {
        const slider = sliderRef.current;
        const target = slider?.children[index];

        if (!target) return;

        target.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
        });

        setActiveSlide(index);
    };

    const handleScroll = () => {
        const slider = sliderRef.current;

        if (!slider || window.innerWidth >= 640) return;

        const cards = Array.from(slider.children);
        const center = slider.scrollLeft + slider.clientWidth / 2;

        let selected = 0;
        let nearest = Infinity;

        cards.forEach((card, index) => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = Math.abs(cardCenter - center);

            if (distance < nearest) {
                nearest = distance;
                selected = index;
            }
        });

        setActiveSlide(selected);
    };

    return (
        <section className="coin-overview-section mb-[17px]" aria-label="Cryptocurrency overview">
            <div className="mb-[9px] flex items-center justify-between sm:hidden">
                <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#99a3b5]">
                    Market Overview
                </span>

                <div className="flex gap-[5px]">
                    <button type="button" onClick={() => goToSlide(Math.max(0, activeSlide - 1))} disabled={activeSlide === 0} className="mobile-slider-arrow" aria-label="Previous cryptocurrency">
                        <Icon name="chevron-back-outline" />
                    </button>

                    <button type="button" onClick={() => goToSlide(Math.min(overviewSymbols.length - 1, activeSlide + 1))} disabled={activeSlide === overviewSymbols.length - 1} className="mobile-slider-arrow" aria-label="Next cryptocurrency">
                        <Icon name="chevron-forward-outline" />
                    </button>
                </div>
            </div>

            <div ref={sliderRef} onScroll={handleScroll} className="coin-overview-track">
                {overviewSymbols.map((symbol) => {
                    const coin = coinData[symbol];

                    return (
                        <button key={symbol} type="button" onClick={() => onSelectCoin(symbol)} className={`coin-card relative h-[108px] overflow-hidden rounded-[11px] border bg-white px-[12px] pb-[3px] pt-[10px] text-left ${selectedSymbol === symbol ? "is-selected" : ""}`}>
                            <div className="flex items-start">
                                <img src={coin.icon} alt={`${coin.name} logo`} className="mr-[10px] h-[25px] w-[25px] shrink-0" />

                                <div>
                                    <h2 className="text-[15px] font-normal leading-[17px] text-[#434b59]">{coin.symbol}</h2>

                                    <p className="mt-[2px] text-[10px] font-light text-[#b8bbc2]">{coin.name}</p>
                                </div>

                                <div className="ml-auto text-right">
                                    <strong className="block whitespace-nowrap text-[15px] font-normal leading-[17px] text-[#161d2b]">{coin.displayPrice}</strong>

                                    <span className={`mt-[7px] flex items-center justify-end gap-[2px] whitespace-nowrap text-[10px] ${coin.trend === "up" ? "text-[#14c1b2]" : "text-[#ff5579]"}`}>
                                        {coin.change}

                                        <Icon name={coin.trend === "up" ? "arrow-up-outline" : "arrow-down-outline"} className="text-[13px]" />
                                    </span>
                                </div>
                            </div>

                            <div className="-mx-[1px] mt-[1px]">
                                <Sparkline symbol={symbol} values={sparkData[symbol]} color={coin.color} />
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="mt-[8px] flex justify-center gap-[5px] sm:hidden">
                {overviewSymbols.map((symbol, index) => (
                    <button key={symbol} type="button" onClick={() => goToSlide(index)} className={`slider-dot ${activeSlide === index ? "is-active" : ""}`} aria-label={`Show ${symbol}`}></button>
                ))}
            </div>
        </section>
    );
}

/* ===================================
   Candlestick Chart
=================================== */

function CandlestickChart({ symbol, frame }) {
    const seed = symbol.charCodeAt(0) + symbol.charCodeAt(symbol.length - 1) + frame.length * 5;

    const minPrice = 719000;
    const maxPrice = 726000;
    const graphLeft = 8;
    const graphRight = 805;
    const graphTop = 14;
    const graphBottom = 233;
    const graphHeight = graphBottom - graphTop;

    const step = (graphRight - graphLeft) / closeValues.length;

    const candleWidth = Math.max(step * 0.48, 3.6);

    const transformed = closeValues.map((value, index) => value + ((seed % 7) - 3) * 90 + Math.sin((index + seed) * 0.21) * 95);

    const priceToY = (price) => graphTop + ((maxPrice - price) / (maxPrice - minPrice)) * graphHeight;

    return (
        <div className="chart-shell relative w-full overflow-hidden">
            <svg viewBox="0 0 850 322" preserveAspectRatio="none" className="h-full w-full min-w-[600px]" role="img" aria-label={`${symbol} price chart`}>
                {[726000, 725000, 724000, 723000, 722000, 721000, 720000, 719000].map((price) => {
                    const y = priceToY(price);

                    return (
                        <g key={price}>
                            <line x1="0" y1={y} x2="808" y2={y} stroke="#eef1f8" strokeWidth=".8" />

                            <text x="847" y={y + 3} textAnchor="end" fill="#b7bdc7" fontSize="8.5">
                                {price}
                            </text>
                        </g>
                    );
                })}

                {transformed.map((close, index) => {
                    const open = index === 0 ? close - 220 : transformed[index - 1];

                    const volatility = 240 + (index % 5) * 105;

                    const high = Math.min(Math.max(open, close) + volatility, maxPrice);
                    const low = Math.max(Math.min(open, close) - volatility * 0.85, minPrice);

                    const x = graphLeft + index * step + step / 2;

                    const openY = priceToY(open);
                    const closeY = priceToY(close);
                    const highY = priceToY(high);
                    const lowY = priceToY(low);

                    const rising = close >= open;

                    const color = rising ? "#38d2eb" : "#9c7efe";

                    const bodyTop = Math.min(openY, closeY);

                    const bodyHeight = Math.max(Math.abs(closeY - openY), 3);

                    return (
                        <g key={index} className="candle-item">
                            <line x1={x} y1={highY} x2={x} y2={lowY} stroke={color} strokeWidth="1.7" strokeLinecap="round" />

                            <rect x={x - candleWidth / 2} y={bodyTop} width={candleWidth} height={bodyHeight} rx=".8" fill={color} />
                        </g>
                    );
                })}

                {volumeValues.map((value, index) => {
                    const x = graphLeft + index * step + step / 2;
                    const height = value * 1.68;

                    return <rect key={index} x={x - candleWidth / 2} y={282 - height} width={candleWidth} height={height} rx=".5" fill="#eaf0fc" />;
                })}

                <line x1="0" y1="283" x2="808" y2="283" stroke="#eef1f7" strokeWidth=".8" />

                {["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00"].map((time, index) => (
                    <text key={time} x={index * 98.6} y="300" fill="#b7bdc7" fontSize="9">
                        {time}
                    </text>
                ))}
            </svg>
        </div>
    );
}

/* ===================================
   Buy Modal
=================================== */

function BuyModal({ coin, open, onClose, onSuccess }) {
    const [amount, setAmount] = useState("");

    useEffect(() => {
        if (!open) setAmount("");
    }, [open]);

    if (!open) return null;

    const submit = (event) => {
        event.preventDefault();

        if (!amount || Number(amount) <= 0) return;

        onSuccess(Number(amount));

        onClose();
    };

    return (
        <div className="modal-overlay fixed inset-0 z-[100] flex items-center justify-center px-4">
            <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close dialog"></button>

            <form onSubmit={submit} className="modal-card relative z-10 w-full max-w-[390px] rounded-[14px] bg-white p-[22px]">
                <div className="flex items-center">
                    <img src={coin.icon} alt={`${coin.name} logo`} className="mr-[10px] h-[34px] w-[34px]" />

                    <div>
                        <strong className="block text-[15px] font-semibold text-[#273147]">Buy {coin.name}</strong>

                        <span className="text-[10px] text-[#aab2bf]">{coin.displayPrice}</span>
                    </div>

                    <button type="button" onClick={onClose} className="ml-auto flex h-[38px] w-[38px] items-center justify-center rounded-[8px] bg-[#f5f7fb] text-[23px] text-[#7d8798]" aria-label="Close">
                        <Icon name="close-outline" />
                    </button>
                </div>

                <label className="mt-[20px] block text-[11px] text-[#596476]" htmlFor="buy-amount">
                    Amount ({coin.symbol})
                </label>

                <div className="mt-[7px] flex h-[44px] items-center rounded-[7px] border border-[#e1e6ef] px-[12px] focus-within:border-[#6476ed]">
                    <input id="buy-amount" value={amount} onChange={(event) => setAmount(event.target.value)} type="number" step="any" min="0" placeholder="0.00" className="h-full flex-1 border-0 bg-transparent text-[13px] text-[#303a50] outline-none" />

                    <span className="text-[11px] text-[#8d96a6]">{coin.symbol}</span>
                </div>

                <div className="mt-[12px] flex items-center justify-between rounded-[7px] bg-[#f7f9fd] px-[12px] py-[10px]">
                    <span className="text-[10px] text-[#9aa2b0]">Estimated value</span>

                    <strong className="text-[11px] font-medium text-[#424d61]">
                        {amount ? `¥ ${(Number(amount) * coin.price).toLocaleString(undefined, { maximumFractionDigits: 2 })}` : "¥ 0"}
                    </strong>
                </div>

                <button type="submit" className="mt-[18px] h-[43px] w-full rounded-[6px] bg-gradient-to-r from-[#075bfa] to-[#7557ec] text-[12px] font-medium text-white">
                    Confirm Purchase
                </button>
            </form>
        </div>
    );
}

/* ===================================
   Trading Panel
=================================== */

function TradingPanel({ selectedSymbol, onActivityAdd }) {
    const [frame, setFrame] = useState("1");
    const [buyOpen, setBuyOpen] = useState(false);
    const [alertActive, setAlertActive] = useState(false);

    const coin = coinData[selectedSymbol];

    const handlePurchase = (amount) => {
        onActivityAdd({
            id: Date.now(),
            date: new Date().toLocaleString(),
            detail: `Bought ${coin.name}`,
            price: `+ ${amount} ${coin.symbol}`,
            coin: coin.symbol,
        });
    };

    return (
        <>
            <div className="min-w-0 xl:border-r xl:border-[#e1e6f3]">
                <div className="flex h-[48px] items-center border-b border-[#e1e6f3] px-[15px] sm:px-[23px]">
                    <img src={coin.icon} alt={`${coin.name} logo`} className="mr-[8px] h-[22px] w-[22px]" />

                    <strong className="text-[15px] font-semibold text-[#202739]">{coin.symbol}</strong>

                    <span className="ml-[9px] text-[10px] text-[#b8bdc6]">/JPY</span>

                    <Icon name="chevron-down-outline" className="ml-[5px] text-[13px] text-[#47bae6]" />

                    <button type="button" onClick={() => setBuyOpen(true)} className="buy-button ml-auto h-[29px] min-w-[68px] rounded-[4px] bg-gradient-to-r from-[#075bfa] to-[#7659eb] px-[11px] text-[10px] font-medium text-white">
                        BUY
                    </button>
                </div>

                <div className="flex min-h-[49px] flex-wrap items-center gap-x-[20px] gap-y-[6px] border-b border-[#e8ebf4] px-[15px] py-[7px] sm:px-[23px]">
                    <strong className="text-[19px] font-normal leading-none text-[#253149]">
                        {coin.displayPrice.replace("¥ ", "")}
                    </strong>

                    <span className={`flex items-center gap-[3px] text-[10px] ${coin.trend === "up" ? "text-[#12bcae]" : "text-[#ff5278]"}`}>
                        {coin.change}

                        <Icon name={coin.trend === "up" ? "arrow-up-outline" : "arrow-down-outline"} className="text-[13px]" />
                    </span>

                    <div className="hidden items-center gap-x-[13px] text-[10px] lg:flex">
                        <span className="text-[#b4bac4]">High</span>
                        <span className="text-[#495266]">{coin.high}</span>

                        <span className="text-[#b4bac4]">Low</span>
                        <span className="text-[#495266]">{coin.low}</span>

                        <span className="text-[#b4bac4]">24h Volume</span>
                        <span className="text-[#495266]">{coin.volume}</span>
                    </div>

                    <button type="button" onClick={() => setAlertActive((value) => !value)} className={`price-alert-button ml-auto flex items-center gap-[7px] text-[10px] ${alertActive ? "is-active" : ""}`}>
                        <span className="hidden sm:inline">{alertActive ? "Alert On" : "Price Alert"}</span>

                        <span className="flex h-[25px] w-[25px] items-center justify-center rounded-full border text-[13px]">
                            <Icon name={alertActive ? "notifications" : "notifications-outline"} />
                        </span>
                    </button>
                </div>

                <div className="hide-scrollbar flex h-[43px] items-center gap-[29px] overflow-x-auto border-b border-[#f0f2f7] px-[15px] sm:px-[23px]">
                    {timeFrames.map((item) => (
                        <button key={item} type="button" onClick={() => setFrame(item)} className={`relative h-full shrink-0 text-[10px] ${frame === item ? "text-[#2a3349]" : "text-[#b8bdc7]"}`}>
                            {item}

                            {frame === item && <span className="absolute bottom-0 left-1/2 h-[3px] w-[20px] -translate-x-1/2 rounded-full bg-[#5367ff]"></span>}
                        </button>
                    ))}
                </div>

                <div className="chart-wrapper bg-[#fafbff] px-[13px] pb-[8px] pt-[2px] sm:px-[23px]">
                    <CandlestickChart symbol={selectedSymbol} frame={frame} />
                </div>
            </div>

            <BuyModal coin={coin} open={buyOpen} onClose={() => setBuyOpen(false)} onSuccess={handlePurchase} />
        </>
    );
}

/* ===================================
   Market Cap
=================================== */

function MarketCap({ selectedSymbol, onSelectCoin }) {
    const [expanded, setExpanded] = useState(false);

    const symbols = ["BTC", "BCH", "ETH", "LTC", "ETC", "XRP", "FCT", "LSK", "XEM", "ADA", "SOL", "DOGE"];

    const visible = expanded ? symbols : symbols.slice(0, 9);

    return (
        <aside className="bg-white">
            <div className="flex h-[48px] items-center border-b border-[#e1e6f3] px-[18px]">
                <span className="triangle-blue-large mr-[7px]"></span>

                <h2 className="text-[15px] font-semibold text-[#202739]">Market Cap</h2>

                <button type="button" className="ml-auto flex h-[32px] w-[32px] items-center justify-center text-[18px] text-[#9ea4af]" aria-label="Sort market">
                    <Icon name="swap-vertical-outline" />
                </button>
            </div>

            {visible.map((symbol) => {
                const coin = coinData[symbol];

                return (
                    <button key={symbol} type="button" onClick={() => onSelectCoin(symbol)} className={`market-row flex h-[47px] w-full items-center border-b border-[#e8ecf4] px-[18px] text-left ${selectedSymbol === symbol ? "is-active" : ""}`}>
                        <img src={coin.icon} alt={`${coin.name} logo`} className="mr-[9px] h-[20px] w-[20px]" />

                        <span className="text-[10.5px] font-medium text-[#4e5769]">{coin.symbol}</span>

                        <span className="ml-auto whitespace-nowrap text-[10px] text-[#273148]">{coin.displayPrice}</span>

                        <span className={`ml-[10px] flex min-w-[57px] items-center justify-end gap-[2px] whitespace-nowrap text-[10px] ${coin.trend === "up" ? "text-[#13c0b1]" : "text-[#ff5579]"}`}>
                            {coin.change}

                            <Icon name={coin.trend === "up" ? "arrow-up-outline" : "arrow-down-outline"} className="text-[13px]" />
                        </span>
                    </button>
                );
            })}

            <div className="flex h-[35px] items-center justify-between px-[18px]">
                <button type="button" onClick={() => setExpanded((value) => !value)} className="text-[9px] font-medium text-[#7b8494] hover:text-[#5264ec]">
                    {expanded ? "Show less" : "View more"}
                </button>

                <Icon name="information-circle-outline" className="text-[18px] text-[#727c8d]" />
            </div>
        </aside>
    );
}

function TradingArea({ selectedSymbol, onSelectCoin, onActivityAdd }) {
    return (
        <section className="dashboard-card mb-[18px] overflow-hidden rounded-[11px] border border-[#dfe5f9] bg-white xl:grid xl:grid-cols-[minmax(0,1fr)_270px]">
            <TradingPanel selectedSymbol={selectedSymbol} onActivityAdd={onActivityAdd} />

            <div className="border-t border-[#e1e6f3] xl:border-t-0">
                <MarketCap selectedSymbol={selectedSymbol} onSelectCoin={onSelectCoin} />
            </div>
        </section>
    );
}

/* ===================================
   Latest Activities
=================================== */

function LatestActivities({ activitiesData }) {
    const [filter, setFilter] = useState("ALL");
    const [showAll, setShowAll] = useState(false);

    const filtered = useMemo(() => {
        const rows = filter === "ALL" ? activitiesData : activitiesData.filter((activity) => activity.coin === filter);

        return showAll ? rows : rows.slice(0, 4);
    }, [filter, activitiesData, showAll]);

    return (
        <section className="dashboard-card overflow-hidden rounded-[11px] border border-[#dfe5f9] bg-white">
            <div className="border-b border-[#e5e9f2] px-[17px] pt-[13px] sm:px-[20px]">
                <div className="flex items-center">
                    <span className="triangle-blue-large mr-[6px]"></span>

                    <h2 className="text-[15px] font-semibold text-[#202739]">Latest Activities</h2>

                    <button type="button" onClick={() => setShowAll((value) => !value)} className="ml-auto text-[9px] font-medium text-[#8e97a5] hover:text-[#5364e9]">
                        {showAll ? "Compact" : "View all"}
                    </button>
                </div>

                <div className="hide-scrollbar mt-[8px] flex h-[38px] items-start gap-[26px] overflow-x-auto">
                    {activityFilters.map((item) => (
                        <button key={item} type="button" onClick={() => setFilter(item)} className={`relative h-[31px] shrink-0 text-[10px] ${filter === item ? "text-[#323a4e]" : "text-[#b9bec7]"}`}>
                            {item}

                            {filter === item && <span className="absolute bottom-0 left-1/2 h-[3px] w-[20px] -translate-x-1/2 rounded bg-[#5264ff]"></span>}
                        </button>
                    ))}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] border-collapse text-left">
                    <thead>
                        <tr className="h-[35px] border-b border-[#e7ebf3] text-[11px] text-[#343d51]">
                            <th className="w-[32%] px-[18px] font-normal">Date</th>

                            <th className="px-[18px] font-normal">Detail</th>

                            <th className="px-[18px] text-right font-normal">Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map((activity) => (
                            <tr key={activity.id} className="activity-row h-[46px] border-b border-[#edf0f6] text-[11px] text-[#465067]">
                                <td className="whitespace-nowrap px-[18px]">{activity.date}</td>

                                <td className="px-[18px]">{activity.detail}</td>

                                <td className={`whitespace-nowrap px-[18px] text-right ${activity.price.trim().startsWith("-") ? "text-[#815fff]" : "text-[#5669ff]"}`}>
                                    {activity.price}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

/* ===================================
   Newsfeed
=================================== */

function CryptoNewsfeed() {
    const [subscribed, setSubscribed] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const visibleNews = expanded ? news : news.slice(0, 2);

    return (
        <section className="dashboard-card rounded-[11px] border border-[#dfe5f9] bg-white px-[17px] pb-[17px] pt-[13px] sm:px-[20px]">
            <div className="mb-[16px] flex items-center">
                <span className="triangle-blue-large mr-[6px]"></span>

                <h2 className="text-[15px] font-semibold text-[#202739]">Crypto Newsfeed</h2>

                <button type="button" onClick={() => setSubscribed((value) => !value)} className={`subscribe-button ml-auto h-[30px] rounded-[4px] border px-[13px] text-[10px] ${subscribed ? "is-active" : ""}`}>
                    {subscribed ? "Subscribed" : "Subscribe"}
                </button>
            </div>

            <div className="space-y-[14px]">
                {visibleNews.map((item) => (
                    <article key={item.id} className="news-card relative min-h-[118px] overflow-hidden rounded-[10px] border border-[#dfe5f9] p-[12px] pr-[105px]">
                        <p className="text-[10px] text-[#414a5e]">
                            {item.date}&nbsp;&nbsp; {item.time}
                        </p>

                        <h3 className="mt-[14px] max-w-[420px] text-[12px] font-normal leading-[16px] text-[#4e5767]">
                            {item.title}
                        </h3>

                        <p className="mt-[6px] hidden max-w-[430px] text-[10px] font-light leading-[15px] text-[#c0c4cb] sm:block">
                            {item.description}
                        </p>

                        <img src={item.corner} alt="" className="pointer-events-none absolute bottom-0 right-0 h-full w-[120px] object-cover object-right-bottom" />

                        <span className="absolute bottom-[8px] right-[10px] text-[10px] text-white">
                            {item.category}
                        </span>
                    </article>
                ))}
            </div>

            <button type="button" onClick={() => setExpanded((value) => !value)} className="mt-[11px] text-[9px] font-medium text-[#9098a7] hover:text-[#5365ee]">
                {expanded ? "Show less news" : "More news"}
            </button>
        </section>
    );
}

/* ===================================
   Chat Response Engine
=================================== */

function getChatResponse(message) {
    const original = message.trim();

    const text = original.toLowerCase();

    if (/\b(hi|hello|hey|hii|hola)\b/.test(text)) {
        return "Hello! Welcome to Coinspace support. How can I help you today?";
    }

    if (text.includes("btc") || text.includes("bitcoin")) {
        return `Bitcoin is currently shown at ${coinData.BTC.displayPrice} with a ${coinData.BTC.change} demo market movement.`;
    }

    if (text.includes("eth") || text.includes("ethereum")) {
        return `Ethereum is currently shown at ${coinData.ETH.displayPrice}. Select ETH from Market Cap to update the trading panel.`;
    }

    if (text.includes("xrp") || text.includes("ripple")) {
        return `Ripple is currently shown at ${coinData.XRP.displayPrice} with a ${coinData.XRP.change} demo movement.`;
    }

    if (text.includes("price") || text.includes("market")) {
        return "You can check prices from the top market cards or Market Cap panel. Selecting a cryptocurrency updates the main trading area.";
    }

    if (text.includes("buy") || text.includes("purchase")) {
        return "Select a cryptocurrency, click BUY, enter an amount and confirm. The demo purchase will automatically appear in Latest Activities.";
    }

    if (text.includes("deposit")) {
        return "Open Transactions from the sidebar and choose Deposit Yen or Deposit Coin.";
    }

    if (text.includes("withdraw")) {
        return "Open Transactions and choose Withdraw Yen. A real application should verify the balance and destination before completing the withdrawal.";
    }

    if (text.includes("wallet")) {
        return "My Wallet is available under Quick Access. It can contain balances, wallet addresses and transfer history.";
    }

    if (text.includes("fee")) {
        return "Fees vary by transaction and cryptocurrency. Latest Activities currently contains example fee information.";
    }

    if (text.includes("security") || text.includes("password") || text.includes("login")) {
        return "For security, use a strong password, enable two-factor authentication and never share your password, private key or recovery phrase.";
    }

    if (text.includes("help") || text.includes("support")) {
        return "I can help with prices, buying, wallets, deposits, withdrawals, fees and dashboard navigation.";
    }

    if (text.includes("thanks") || text.includes("thank")) {
        return "You’re welcome! Send another message anytime if you need help.";
    }

    return `Thanks for your message: “${original.length > 65 ? `${original.slice(0, 65)}…` : original}”. Tell me a little more about what you need and I’ll guide you through the relevant Coinspace feature.`;
}

/* ===================================
   Support Chat
=================================== */

function SupportChat() {
    const [open, setOpen] = useState(false);

    const [input, setInput] = useState("");

    const [replying, setReplying] = useState(false);

    const [messages, setMessages] = useState([
        {
            id: 1,
            type: "agent",
            text: "Hello! I’m Coinspace support. How can I help you today?",
        },
    ]);

    const messagesRef = useRef(null);

    useEffect(() => {
        if (!messagesRef.current) return;

        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, [messages, replying]);

    const sendMessage = (event) => {
        event.preventDefault();

        const message = input.trim();

        if (!message || replying) return;

        setMessages((current) => [
            ...current,
            {
                id: Date.now(),
                type: "user",
                text: message,
            },
        ]);

        setInput("");

        setReplying(true);

        window.setTimeout(() => {
            setMessages((current) => [
                ...current,
                {
                    id: Date.now() + 1,
                    type: "agent",
                    text: getChatResponse(message),
                },
            ]);

            setReplying(false);
        }, 650);
    };

    return (
        <div className="support-root fixed bottom-[16px] right-[16px] z-40 sm:bottom-[22px] sm:right-[22px]">
            <div className={`chat-panel absolute bottom-[70px] right-0 w-[300px] origin-bottom-right overflow-hidden rounded-[13px] border border-[#dce3ef] bg-white ${open ? "is-open" : ""}`}>
                <div className="flex items-center border-b border-[#edf0f6] px-[16px] py-[13px]">
                    <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[10px] bg-[#1f263e] text-[21px] text-white">
                        <Icon name="chatbubble-ellipses" />
                    </div>

                    <div className="ml-[10px]">
                        <strong className="block text-[12px] font-semibold text-[#263047]">
                            Coinspace Support
                        </strong>

                        <span className="mt-[1px] flex items-center gap-[4px] text-[9px] text-[#27af91]">
                            <span className="h-[6px] w-[6px] rounded-full bg-[#26cda3]"></span>
                            Online now
                        </span>
                    </div>
                </div>

                <div ref={messagesRef} className="chat-messages max-h-[270px] min-h-[170px] overflow-y-auto bg-[#fbfcff] px-[13px] py-[13px]">
                    <div className="space-y-[9px]">
                        {messages.map((message) => (
                            <div key={message.id} className={`chat-bubble max-w-[86%] rounded-[9px] px-[11px] py-[8px] text-[10px] leading-[15px] ${message.type === "user" ? "ml-auto bg-[#5669ee] text-white" : "bg-white text-[#657085] shadow-[0_2px_7px_rgba(51,67,100,.04)]"}`}>
                                {message.text}
                            </div>
                        ))}

                        {replying && (
                            <div className="inline-flex items-center gap-[4px] rounded-[9px] bg-white px-[12px] py-[10px] shadow-[0_2px_7px_rgba(51,67,100,.04)]">
                                <span className="typing-dot"></span>

                                <span className="typing-dot"></span>

                                <span className="typing-dot"></span>
                            </div>
                        )}
                    </div>
                </div>

                <form onSubmit={sendMessage} className="flex items-center gap-[7px] border-t border-[#edf0f6] bg-white p-[12px]">
                    <input type="text" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Write a message..." className="chat-input h-[40px] min-w-0 flex-1 rounded-[7px] border border-[#dfe5ee] px-[11px] text-[10px] text-[#465167] outline-none" />

                    <button type="submit" disabled={!input.trim() || replying} className="chat-send flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[7px] bg-[#5365ec] text-[18px] text-white" aria-label="Send message">
                        <Icon name="send" />
                    </button>
                </form>
            </div>

            <button type="button" onClick={() => setOpen((value) => !value)} className={`chat-trigger relative flex h-[60px] w-[60px] items-center justify-center rounded-[13px] bg-[#1f263e] text-[33px] text-white ${open ? "is-active" : ""}`} aria-label={open ? "Close support chat" : "Open support chat"}>
                <Icon name={open ? "close-outline" : "chatbubble-ellipses"} />

                {!open && <span className="chat-online absolute right-[5px] top-[5px] h-[11px] w-[11px] rounded-full border-[2px] border-[#1f263e] bg-[#20d5a7]"></span>}
            </button>
        </div>
    );
}

/* ===================================
   Application
=================================== */

export default function App() {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const [desktopCollapsed, setDesktopCollapsed] = useState(false);

    const [selectedSymbol, setSelectedSymbol] = useState("BTC");

    const [activityRows, setActivityRows] = useState(defaultActivities);

    const toggleNavigation = () => {
        if (window.matchMedia("(min-width: 1280px)").matches) {
            setDesktopCollapsed((value) => !value);

            return;
        }

        setMobileSidebarOpen(true);
    };

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setMobileSidebarOpen(false);
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => window.removeEventListener("keydown", handleEscape);
    }, []);

    useEffect(() => {
        if (window.innerWidth >= 1280) return undefined;

        document.body.style.overflow = mobileSidebarOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileSidebarOpen]);

    const addActivity = (activity) => {
        setActivityRows((rows) => [activity, ...rows]);
    };

    return (
        <div id="dashboard" className="min-h-screen bg-[#f3f6fe] text-[#4e5760]">
            <Sidebar
                open={mobileSidebarOpen}
                onClose={() => setMobileSidebarOpen(false)}
                desktopCollapsed={desktopCollapsed}
            />

            <Header
                onMenu={toggleNavigation}
                selectedSymbol={selectedSymbol}
                onSelectCoin={setSelectedSymbol}
                desktopCollapsed={desktopCollapsed}
            />

            <main className={`dashboard-main min-h-screen pt-[68px] sm:pt-[72px] ${desktopCollapsed ? "sidebar-is-collapsed" : ""}`}>
                <div className="dashboard-container mx-auto w-full max-w-[1400px] px-[10px] pb-[30px] pt-[16px] sm:px-5 sm:pt-[24px] xl:px-[30px]">
                    <DashboardToolbar />

                    <CoinOverview
                        selectedSymbol={selectedSymbol}
                        onSelectCoin={setSelectedSymbol}
                    />

                    <TradingArea
                        selectedSymbol={selectedSymbol}
                        onSelectCoin={setSelectedSymbol}
                        onActivityAdd={addActivity}
                    />

                    <div className="grid grid-cols-1 gap-[18px] xl:grid-cols-2">
                        <LatestActivities activitiesData={activityRows} />

                        <CryptoNewsfeed />
                    </div>
                </div>
            </main>

            <SupportChat />
        </div>
    );
}