# 🌸 Lorem Ipsum Bridal Framework — Wedding Coordination Portfolio

A premium, elegant, and minimalist single-page web framework built specifically for modern wedding planners, bridal consultants, and event coordinators. This repository serves as a fully interactive showcase layout for client design consultations and turnkey deployment demos.

🔗 **Live Demo:** [[Insert your GitHub Pages Link Here]](https://kclamano.github.io/demo-site/)

---

## ✨ Features & Architecture

- **Responsive Visual Design:** Engineered with modern liquid layout principles using flexible CSS media breakpoints. Fully optimized for flawless dynamic rendering across desktop, tablet formats, and small-screen configurations (e.g., iPhone SE/14 Pro Max viewports).
- **Interactive Package Selection Arrays:** Fully functional JavaScript dataset binding. Clicking any coordination package handles a smooth navigation scroll context, clears prior data states, and focuses the target form selector with a temporary gold halo glow animation.
- **Client Input Form & Validation Engine:** Includes client-side array checking rules to ensure high-quality user inputs (valid future-date parsing constraints, standard phone context verification regex patterns, and automated form layout resets).
- **Asynchronous Payload Simulation:** Equipped with a clean async dispatch lifecycle structure, ready to easily plug into browser-based webhook delivery nodes such as Formspree, EmailJS, or native server restful APIs.
- **Graceful Performance Fallbacks:** Optimized typography rendering using web font pre-connection handling stacks (`font-display: swap`), backed by a `<noscript>` structural safeguard block for slow networks or offline rendering scenarios.

---

## 🛠️ Tech Stack Employed

- **Markup:** Semantic HTML5 structural blocks for high accessibility (ARIA labels, keyboard tab-index navigation triggers).
- **Styling:** Vanilla CSS3 using centralized Design Tokens (`:root` css variables) for instant brand color adjustments.
- **Logic:** Vanilla JavaScript (ES6+) utilizing standard asynchronous event streams and `IntersectionObserver` layers for dynamic scroll-reveal transitions.

---

## 💡 System Configuration Guide

To reuse this layout configuration or customize the content streams, search for the inline developer notes inside `index.html`:
1. **Changing Hero Images:** Locate the comment `── HOW TO REPLACE THE HERO IMAGE ──` within the `<style>` block and swap out the Unsplash background URL path.
2. **Adjusting Package Pricing:** Update the string arrays within the `#chosenPackage` selector fields to cleanly transition from default placeholder values to your specific localization currencies (e.g., PHP `₱`).
3. **Connecting a Live Mail Backend:** Head over to `async function sendBookingData(data)` and uncomment your preferred operational block (Option A for Formspree, Option B for EmailJS).

---

## 🎨 Inspiration & Credits

- **Design Attribution:** The layout composition, typography visual hierarchy, and warm earth-tone palette tokens used across this framework were deeply inspired by premium aesthetic layouts, photography portfolios, and visual templates discovered on **Pinterest**. 
- **Developer Note:** Built with absolute precision and dedication by a Computer Science student aiming to bridge complex client logic with minimalist, high-end visual design frameworks.

---

## 📜 License

This structural demo framework is available for portfolio inspection and open testing deployment workflows.
