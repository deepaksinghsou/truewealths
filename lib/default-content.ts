import { CmsContent } from "@/types/cms";

export const defaultContent: CmsContent = {
  home: {
    heading: "True Wealths",
    subheading: "Real Learning. Real Growth.",
    description: "Helping you create long-term wealth with clarity and discipline.",
    intro:
      "True Wealth is a long-term, education-first financial brand. We help individuals build wealth through understanding, discipline, and structured investing — not shortcuts or tips.",
    steps: [
      "Understand your goals",
      "Build a simple plan",
      "Start disciplined investing",
      "Review & stay aligned"
    ],
    servicesPreview: [
      "Mutual Fund SIP Planning",
      "Goal-Based Investment Planning",
      "Portfolio Review & Guidance"
    ],
    ctaText: "Let’s talk about your long-term financial goals."
  },
  about: {
    heading: "About True Wealth",
    founderName: "Madhav Anand",
    founderRole: "Finance Educator | Mutual Fund Distributor",
    philosophy:
      "We believe real wealth is not built by chasing returns, but by making the right decisions consistently over time. Our approach focuses on learning, discipline, and long-term thinking.",
    credentials: ["NISM Certified", "AMFI Registered (ARN to be updated)"]
  },
  services: {
    heading: "Services",
    items: [
      {
        title: "Mutual Fund SIP Planning",
        description: "Long-term SIP-based investing aligned with your goals."
      },
      {
        title: "Goal-Based Investment Planning",
        description: "Planning for life goals like wealth creation, education, and future needs."
      },
      {
        title: "Portfolio Review & Guidance",
        description: "Reviewing existing investments and aligning them with long-term strategy."
      }
    ]
  },
  howWeWork: {
    heading: "How We Work",
    steps: [
      "We understand your goals",
      "We create a simple long-term plan",
      "You invest with discipline",
      "We review periodically and stay aligned"
    ]
  },
  contact: {
    heading: "Contact",
    mobile: "7461987316",
    email: "truewealths@zohomail.in",
    closingLine: "Reach out to start your wealth journey with clarity."
  },
  legal: {
    heading: "Legal",
    disclaimer:
      "The information on this website is for educational purposes only and should not be considered investment advice or a guaranteed outcome.",
    privacy:
      "We collect only the information you share voluntarily via contact forms. We do not sell your data and use it solely for communication and service support.",
    riskDisclosure:
      "All investments are subject to market risks. Past performance is not indicative of future returns. Please review all scheme-related documents carefully before investing."
  }
};
