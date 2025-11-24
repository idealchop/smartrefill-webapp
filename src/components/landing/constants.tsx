
import { LayoutDashboard, HeartHandshake, UserCheck, AppWindow, GitBranch, Terminal, Users } from "lucide-react";

export const header = {
    logo: "https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/Brand%20Logo%2FAsset%2022.png?alt=media&token=f7458efe-afd7-4006-862e-40c8d524c080",
    brand: "Smart Refill",
    navLinks: [
        { text: "About Us", href: "/about" },
        {
            trigger: "Products",
            content: {
                title: "Our Products",
                subtitle: "Solutions for every part of the water refilling ecosystem.",
                items: [
                    {
                        href: "/water-refilling-stations",
                        title: "Operations Platform",
                        badge: "Smart Refill",
                        badgeClass: "",
                        description: "Empowering water refilling stations with a smart, AI-powered platform that simplifies operations for both owners and team — all in one system."
                    },
                    {
                        href: "/franchising",
                        title: "Refill Operators",
                        badge: "Franchising",
                        badgeClass: "border-white bg-gradient-to-br from-slate-200 to-slate-400 text-white animate-shine",
                        description: "A next-generation water refilling station in the Philippines— fully accredited and ready for success from day one."
                    },
                    {
                        href: "/business",
                        title: "Smart Refill",
                        badge: "Business",
                        badgeClass: "bg-gradient-to-br from-yellow-300 to-amber-500 text-white border-amber-600/50",
                        description: "Get access to 100+ accredited water refilling stations — delivering safe, clean water straight to your business."
                    }
                ]
            }
        },
        {
            trigger: "✨ What’s in the App",
            content: {
                title: "What’s in the App",
                subtitle: "Smart Refill comes with everything you need to grow, stay in control and connect with your customers — all in one platform.",
                features: [
                    {
                        icon: AppWindow,
                        title: "Operational Platform",
                        description: "Your all-in-one dashboard to automate operations — from orders, deliveries, and sales, to inventory, staff, and maintenance."
                    },
                    {
                        icon: GitBranch,
                        title: "Acquire Customers",
                        description: "Acquire new customers through Smart Refill Business and the River Mobile App."
                    },
                    {
                        icon: Terminal,
                        title: "Offline-Ready App",
                        description: "No internet? No problem. Smart Refill keeps running and automatically syncs when you're back online."
                    },
                    {
                        icon: Users,
                        title: "Roles & Permissions",
                        description: "Give your team the right access — whether admin, cashier, or delivery staff — so they have the tools they need, and nothing they don’t."
                    }
                ]
            }
        },
        { text: "Client Portal", href: "/client-login", className: "font-semibold" }
    ],
    ctaButton: "My Station's Account",
    mobileNav: {
        title: "Mobile Navigation Menu",
        links: [
            { text: "About Us", href: "/about" },
            {
                text: "Products",
                items: [
                    { text: "Operations Platform", href: "/water-refilling-stations" },
                    { text: "Franchising", href: "/franchising" },
                    { text: "Business", href: "/business" }
                ]
            },
            { text: "FAQs", href: "/#faq" },
            { text: "Client Portal", href: "/client-login" }
        ]
    }
}

export const hero = {
    title: "Automate Water Refills to Drive Business Growth",
    subtitle: "No manual orders. No supply gaps. Just automated, continuous water refills for every business.",
    button: "Join Smart Refill",
    underButton: "Start your digital journey for free. No payment needed.",
    logo: "https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/Brand%20Logo%2FAsset%2022.png?alt=media&token=f7458efe-afd7-4006-862e-40c8d524c080",
    mainImage: "https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/App-Image%2Fwater-stations-main-dashboard.png?alt=media&token=397a8653-f6ba-4fc6-b2c1-2a86e5c53ab8"
}

export const secondSection = {
    title: "The Philippines’ first AI-driven solution that automates water refills for every business",
    subtitle: "Your water refills — automatic and safe. No re-order messages needed.",
    station: {
        title: "I’m a Water Refilling Station",
        subtitle: "(Manage your station digitally and grow sales)",
        button: "Create an Account"
    },
    business: {
        title: "I’m a Business or Office",
        subtitle: "(Get safe, automated water refills for your workplace)",
        button: "Choose a Plan"
    }
}

export const features = {
    title: "The Future of Water Refilling, In Your Hands",
    subtitle: "Designed to make refilling stations smarter, faster, and future-ready.",
    interactiveFeatures: [
        {
            title: "Smart Platform — Built for Water Refilling Stations",
            description: "Run your entire refilling station on one easy platform. Track sales, deliveries, inventory, team, and customer engagement — all in real time. With AI tools designed for the refilling industry, you’ll operate smoother, faster, and more profitably.",
            icon: LayoutDashboard,
            image: "https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/App-Image%2Fwater-refilling-stations-operations03.png?alt=media&token=739804dd-4b00-41b2-85a1-a90b542e3e88"
        },
        {
            title: "Partner in Growth & Compliance",
            description: "We’ll guide you every step of the way. From pen-and-paper to digital, we make the shift simple — at no extra cost. Plus, we help you grow sales, reach more customers, and stay compliant so your business runs stronger and safer for the community.",
            icon: HeartHandshake,
            image: "https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/App-Image%2Fwater-refilling-stations-platform.png?alt=media&token=9ac95656-d4c8-4ead-a236-f23702ddda48"
        },
        {
            title: "Customer Growth, Built In",
            description: "Acquire new customers directly through the River Mobile App and Smart Refill Business — automatically added to your Station's Platform. From new orders to delivery, everything flows in one streamlined system, so you can serve more customers without extra work.",
            icon: UserCheck,
            image: "https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/App-Image%2Fwater-refilling-stations-operationS_02.png?alt=media&token=9e2f529d-2254-4601-bb7f-60a39f02919c"
        }
    ]
}

export const faqs = {
    title: "Frequently Asked Questions",
    subtitle: "Have questions? We've got answers. If you need more help, feel free to contact us.",
    questions: [
        {
            question: "What is Smart Refill?",
            answer: {
                text: "Smart Refill is the Philippines’ first technology platform built to empower water refilling station owners. It helps you manage orders, deliveries, inventory, and customer communication—all in one easy-to-use dashboard."
            }
        },
        {
            question: "How can Smart Refill help my business?",
            answer: {
                text: "With Smart Refill, you can:",
                points: [
                    "Automate customer reminders and orders",
                    "Track deliveries in real time",
                    "Manage inventory and pricing digitally",
                    "Generate reports to understand business performance",
                    "Save time by reducing manual processes",
                ]
            }
        },
        {
            question: "Do I need to be tech-savvy to use Smart Refill?",
            answer: {
                text: "Not at all! Smart Refill is designed for water station owners—even if you have little to no technical background. If you know how to use a smartphone or Facebook, you can easily use Smart Refill."
            }
        },
        {
            question: "How does Smart Refill keep customer data safe?",
            answer: {
                text: "We strictly comply with the Data Privacy Act of 2012 (RA 10173). All customer information such as names, phone numbers, and addresses are encrypted and securely stored. We only collect information that is necessary to complete orders, deliveries, and reminders."
            }
        },
        {
            question: "Can Smart Refill work offline?",
            answer: {
                text: "Yes! Our system uses offline caching so you can still record orders and manage your data even without internet. Once you’re back online, all updates automatically sync to the cloud."
            }
        },
        {
            question: "Do customers need to install an app?",
            answer: {
                text: "No need! Customers can order through SMS, Messenger, or directly from your team. Smart Refill digitizes these requests and keeps everything in one place for you."
            }
        },
        {
            question: "What kind of support do you provide?",
            answer: {
                text: "We’re with you every step of the way! Our support includes:",
                points: [
                    "24/7 chat support for quick help anytime",
                    "Virtual tutorials to guide you through the app at your own pace",
                    "Onsite training (by request) for non-techy users and early app adopters",
                    "Step-by-step onboarding so your whole team feels confident using Smart Refill",
                    "With River AI inside the platform, you’ll also have a digital companion ready to assist you in real time."
                ]
            }
        },
        {
            question: "How can Smart Refill boost my sales?",
            answer: {
                text: "Smart Refill helps you keep repeat customers, gain new ones through River mobile and our partners, and serve more orders faster with automated tools. No extra onboarding needed—once you become an accredited Smart Refill partner, these features are automatically activated in your app."
            }
        }
    ]
};

export const testimonials = [
  {
    quote: "Dati, kailangan ko pang mag-follow up sa supplier tuwing nauubos ang tubig. Ngayon, automated na — dumadating na lang si Smart Refill on schedule.",
    name: "Business Owner",
    station: "BPO Company",
    avatar: "https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/App-Image%2Ffilipino-1.jpg?alt=media&token=c19825b7-7e61-4648-9f34-896a77517a26"
  },
  {
    quote: "Ang galing! Hindi na ako nag-aalala sa tubig ng staff namin — consistent, malinis, at laging on time.",
    name: "Office Manager",
    station: "Tech Startup",
    avatar: "https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/App-Image%2Ffilipino-2.jpg?alt=media&token=27339d84-f726-444a-a035-c331a99908a8"
  },
  {
    quote: "Mas madali na ang monitoring ng consumption namin. Kita ko agad kung ilang gallons na nagamit sa dashboard.",
    name: "Admin Head",
    station: "Manufacturing Plant",
    avatar: "https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/App-Image%2Ffilipino-3.jpg?alt=media&token=1c6b5413-524a-4a69-826a-8d132646c879"
  },
  {
    quote: "Nabawasan pa gastos namin dahil wala nang double delivery at manual recording. Lahat digital na sa Smart Refill.",
    name: "Clinic Owner",
    station: "Healthcare Facility",
    avatar: "https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/App-Image%2Ffilipino-4.jpg?alt=media&token=d1f5bf9f-6893-4375-9c59-1d55e09f56a"
  },
  {
    quote: "Sulit ang subscription — predictable ang billing, walang hidden charges, at may support pa kung may concern.",
    name: "Restaurant Chain Owner",
    station: "F&B Group",
    avatar: "https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/App-Image%2Ffilipino-5.jpg?alt=media&token=123a6331-b883-4c0b-939e-2e4530869766"
  },
  {
    quote: "Smart Refill helped us focus on our business instead of managing deliveries — hassle-free, reliable, and eco-friendly.",
    name: "HR Manager",
    station: "Corporate Office",
    avatar: "https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/App-Image%2Ffilipino-6.jpg?alt=media&token=e9e61427-4a74-4b52-b884-a15d7e48b888"
  }
];

export const simplify = {
    title: "One app to simplify operations and multiply your sales.",
    subtitle: "Join the growing community of smart water station owners in the Philippines.",
    button: "Create Account"
}

export const footer = {
    brand: "Smart Refill",
    motto: "Empowering Water Stations.",
    copyright: "© 2025 Smart Refill",
    links: [
        { text: "Terms", href: "/terms" },
        { text: "Privacy", href: "/privacy" },
        { text: "Help", href: "#" },
        { text: "Contact", href: "#" }
    ]
}
