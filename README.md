<div align="center">
  <img src="https://i.ibb.co/jJKqgQC/blackui-logo-dark.png" alt="Black UI Logo" width="180" />
  
  <h1 align="center">Black UI</h1>
  
  <p align="center">
    <b>A professionally designed component library & templates market that brings together functionality, accessibility, and beautiful aesthetics for modern applications</b>
  </p>
  
  <p align="center">
    <a href="https://github.com/blackui/blackui/stargazers">
      <img src="https://img.shields.io/github/stars/blackui/blackui?style=flat-square&labelColor=000000&color=4d4d4d" alt="GitHub Stars" />
    </a>
    <a href="https://www.npmjs.com/package/blackui">
      <img src="https://img.shields.io/npm/v/blackui?style=flat-square&labelColor=000000&color=4d4d4d" alt="NPM Version" />
    </a>
    <a href="https://github.com/blackui/blackui/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/blackui/blackui?style=flat-square&labelColor=000000&color=4d4d4d" alt="License" />
    </a>
    <a href="https://blackui.com/discord">
      <img src="https://img.shields.io/discord/1234567890?style=flat-square&labelColor=000000&color=4d4d4d&label=discord" alt="Discord" />
    </a>
  </p>
  
  <br />
  <p align="center">
    <img src="https://i.ibb.co/CtFSK18/blackui-components-display.png" alt="Black UI Components" width="90%" />
  </p>
</div>

<hr />

## 📦 Installation

```bash
# Using npm
npm install blackui

# Using yarn
yarn add blackui

# Using pnpm
pnpm add blackui
```

## 🔧 Requirements

- React 18+
- Tailwind CSS 3.3+
- TypeScript 4.9+ (for TypeScript users)

## 🚀 Quick Start

```jsx
import React from 'react';
import { Button, Card } from 'blackui';

export default function App() {
  return (
    <Card className="p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Welcome to Black UI</h2>
      <p className="text-muted-foreground mb-4">
        Start building beautiful interfaces with our professional components.
      </p>
      <Button>Get Started</Button>
    </Card>
  );
}
```

## ✨ Features

- **🎨 Beautiful Design System** — Sleek, professional aesthetics with carefully crafted components
- **♿ Accessible Components** — WCAG 2.1 compliant with full keyboard navigation and screen reader support
- **🌙 Dark Mode Built-in** — Seamless light and dark mode transitions with consistent theming
- **📱 Fully Responsive** — Components designed to work flawlessly across all device sizes
- **⚡ Performance Optimized** — Efficient rendering with minimal bundle size impact
- **🧩 Highly Customizable** — Flexible theming system that adapts to your brand
- **🔄 Interactive Effects** — Smooth animations and transitions enhance user experience
- **📊 Advanced UI Patterns** — Sophisticated components for complex data visualization and user interactions

## 🧩 Component Library

Black UI includes a comprehensive set of components:

### Layout & Structure
- **Accordion** — Collapsible content panels
- **AspectRatio** — Maintain proportional dimensions
- **Card** — Versatile content containers
- **Resizable** — User-adjustable panels
- **ScrollArea** — Custom scrollable containers
- **Separator** — Visual dividers with various styles
- **Table** — Data-rich displays with sorting and filtering

### Inputs & Forms
- **Button** — Multiple variants and sizes
- **Checkbox** — Customizable selection controls
- **Input** — Text entry with validations
- **InputOTP** — One-time password inputs
- **Label** — Accessible form labels
- **RadioGroup** — Option selection controls
- **Slider** — Range selection with visual feedback
- **Switch** — Toggle controls with animated states
- **Textarea** — Multi-line text input

### Navigation
- **Breadcrumb** — Hierarchical page navigation
- **DynamicNavigation** — Context-aware navigation systems
- **Pagination** — Multi-page content navigation
- **Sidebar** — Collapsible application navigation
- **Tabs** — Content organization and switching

### Feedback & Status
- **Alert** — Contextual messages with various severities
- **Progress** — Visual indicators for processes
- **Skeleton** — Loading state placeholders
- **Toast** — Temporary notifications with auto-dismiss

### Overlay & Popups
- **AlertDialog** — Confirmation dialogues
- **Dialog** — Modal content containers
- **Drawer** — Side-emerging panels
- **Popover** — Contextual floating content
- **Tooltip** — Information on hover

### Advanced Components
- **AnimatedBlobBackground** — Engaging visual effects
- **Avatar** — User representations with fallbacks
- **BorderBeam** — Animated border highlights
- **Carousel** — Scrollable content showcase
- **Dock** — macOS-style application launchers
- **InteractiveGradient** — Responsive color effects
- **SeasonalHoverCards** — Context-sensitive information cards
- **SmokyCursor** — Engaging cursor trails and effects

## 🎭 Advanced Animations

Black UI incorporates sophisticated animation systems:

```jsx
import { InteractiveGradient } from 'blackui';

function GradientDemo() {
  return (
    <InteractiveGradient 
      className="min-h-[400px] rounded-lg flex items-center justify-center"
      colors={["#ff0080", "#7928ca", "#0070f3"]}
    >
      <div className="text-center text-white p-8">
        <h2 className="text-3xl font-bold mb-4">Interactive Experience</h2>
        <p>Move your cursor to interact with this gradient background</p>
      </div>
    </InteractiveGradient>
  );
}
```

## 🔍 Customization

Black UI components can be customized using Tailwind CSS classes:

```jsx
<Card 
  className="bg-gradient-to-tr from-zinc-900 to-zinc-800 text-white border-none"
  hoverable 
  bordered={false}
>
  <CardHeader>
    <CardTitle size="lg">Custom Card</CardTitle>
    <CardDescription>With gradient background</CardDescription>
  </CardHeader>
  <CardContent>
    This card uses a custom gradient background.
  </CardContent>
  <CardFooter align="end">
    <Button variant="secondary">Cancel</Button>
    <Button>Submit</Button>
  </CardFooter>
</Card>
```

## 🌈 Theming System

Black UI uses CSS variables for theming, making it easy to customize:

```css
:root {
  --primary: 240 5% 10%;
  --primary-foreground: 0 0% 98%;
  
  /* Add your custom theme colors */
  --brand-purple: 267 100% 58%;
  --brand-blue: 214 100% 60%;
}

.dark {
  --primary: 0 0% 98%;
  --primary-foreground: 240 5% 10%;
}
```

## 📊 Component Showcase

<p align="center">
  <img src="https://i.ibb.co/QnNX6j7/blackui-component-showcase.png" alt="Component Showcase" width="100%" />
</p>

## 📖 Documentation

For comprehensive documentation including all components, props, and examples:

[**View Documentation**](https://blackui.com/docs)

## 🛣️ Roadmap

- **Q3 2025** — Template marketplace launch
- **Q4 2025** — Advanced data visualization components
- **Q1 2026** — Headless component options for ultimate flexibility
- **Q2 2026** — Enterprise-focused features and plugins

## 🤝 Contributing

We welcome contributions to Black UI! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read our [Contributing Guidelines](https://blackui.com/contributing) for more details.

## 📋 Changelog

### Version 1.0.0 (June 2025)
- 🎉 Initial stable release with 40+ production-ready components
- 🌙 Dark mode support finalized
- ♿ WCAG 2.1 AA compliance across all components
- 📱 Responsive design for all screen sizes
- 🔧 Theme customization system
- ⚡ Performance optimizations

## 📄 License

Black UI is licensed under the [MIT License](https://github.com/blackui/blackui/blob/main/LICENSE).

---

<div align="center">
  <p>
    <sub>Designed and built with ❤️ by the MuhilanOrg</sub>
  </p>
  <p>
    <a href="https://twitter.com/black_ui">
      <img src="https://img.shields.io/twitter/follow/black_ui?style=social" alt="Twitter" />
    </a>
  </p>
</div>