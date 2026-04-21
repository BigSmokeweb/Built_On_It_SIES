import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchProblems } from '../api.js';
import NavUser from '../components/NavUser';
import { SidebarContent } from '../components/Sidebar';

const allProjects = [
  // ── Web ──────────────────────────────────────────────────────────────────────
  {
    id: 'p1', title: 'NextJS Admin Ultra', badge: 'FRAMEWORK', topic: 'Web',
    desc: 'A high-performance admin dashboard starter kit with full TypeScript support and built-in auth flows.',
    stars: '4.2k', lang: 'TypeScript', tags: ['REACT', 'NEXT.JS', 'TAILWIND'],
    author: 'vercel-labs', time: '2h ago',
    img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=480&h=200&fit=crop',
    color: '#2f81f7', stars_n: 4200,
    features: ['Server-side rendering', 'Role-based access control', 'Dark / light theme', 'REST & GraphQL ready'],
    deps: ['next v14', 'react v18', 'tailwindcss v3', 'prisma v5', 'next-auth v4'],
    readme: 'NextJS Admin Ultra provides a battle-tested foundation for enterprise dashboards. Built with type-safety first, every component ships with full TypeScript definitions. Designed to plug into any REST or GraphQL backend in minutes.',
    version: 'v3.1.0', releaseDate: 'Apr 10, 2024',
    forks: '890', issues: '14', watchers: '310',
  },
  {
    id: 'p7', title: 'VueGlass UI', badge: 'FRONTEND', topic: 'Web',
    desc: 'Beautiful glassmorphism design system for Vue.js with 80+ accessible components and dark-mode support.',
    stars: '3.7k', lang: 'Vue', tags: ['VUE 3', 'TYPESCRIPT', 'A11Y'],
    author: 'vueglass-dev', time: '6h ago',
    img: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=480&h=200&fit=crop',
    color: '#f472b6', stars_n: 3700,
    features: ['80+ UI components', 'WCAG 2.1 compliant', 'Zero runtime dependencies', 'Figma kit included'],
    deps: ['vue v3.4', 'vite v5', 'vitest v1', 'floating-ui v1', 'typescript v5'],
    readme: 'VueGlass UI brings glassmorphism aesthetics to Vue 3 without sacrificing accessibility. Every component meets WCAG 2.1 AA contrast ratios and ships with ARIA labels out of the box. Mix-and-match with your existing styles using CSS custom properties.',
    version: 'v2.0.3', releaseDate: 'Mar 28, 2024',
    forks: '420', issues: '9', watchers: '195',
  },
  {
    id: 'p8', title: 'SvelteKit Commerce', badge: 'E-COMMERCE', topic: 'Web',
    desc: 'Full-stack e-commerce starter built on SvelteKit with Stripe payments, inventory management and SSR.',
    stars: '2.1k', lang: 'JavaScript', tags: ['REACT', 'DOCKER', 'GRPC'],
    author: 'svelte-community', time: '1d ago',
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=480&h=200&fit=crop',
    color: '#ff6b35', stars_n: 2100,
    features: ['Stripe checkout', 'Inventory management', 'Admin panel', 'Edge-ready deployments'],
    deps: ['@sveltejs/kit v2', 'stripe v14', 'drizzle-orm v0.30', 'lucia v3'],
    readme: 'SvelteKit Commerce is the fastest way to launch a production-grade storefront. It includes a complete checkout flow powered by Stripe, a lightweight inventory system, and an admin panel — all optimised for Cloudflare Workers and Vercel Edge.',
    version: 'v1.5.2', releaseDate: 'Apr 5, 2024',
    forks: '310', issues: '22', watchers: '180',
  },

  // ── AI / ML ──────────────────────────────────────────────────────────────────
  {
    id: 'p3', title: 'NeuralNexus AI', badge: 'AI / ML', topic: 'AI/ML',
    desc: 'A comprehensive Python library for deploying neural network models at the edge with minimal dependencies.',
    stars: '54k', lang: 'Python', tags: ['PYTHON', 'PYTORCH', 'CUDA'],
    author: 'deepmind-labs', time: '5m ago',
    img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=480&h=200&fit=crop',
    color: '#3fb950', stars_n: 54000,
    features: ['ONNX & TensorFlow export', 'Quantization & pruning', 'WebAssembly target', 'ARM / RISC-V optimised'],
    deps: ['torch v2.2', 'onnxruntime v1.17', 'numpy v1.26', 'einops v0.7', 'accelerate v0.28'],
    readme: 'NeuralNexus is designed for developers who need maximum performance with minimal footprint. Deploy any PyTorch model to edge hardware with a single CLI command. Supports INT8 quantization, structured pruning, and WebAssembly export for browser inference.',
    version: 'v2.4.5', releaseDate: 'Mar 15, 2024',
    forks: '7800', issues: '41', watchers: '2900',
  },
  {
    id: 'p9', title: 'LangGraph Studio', badge: 'AI / ML', topic: 'AI/ML',
    desc: 'Visual workflow builder for LangChain / LangGraph pipelines with real-time token streaming and trace explorer.',
    stars: '11.4k', lang: 'Python', tags: ['PYTHON', 'PYTORCH', 'DOCKER'],
    author: 'langchain-ai', time: '3h ago',
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=480&h=200&fit=crop',
    color: '#f97316', stars_n: 11400,
    features: ['Drag & drop pipeline editor', 'Real-time token streaming', 'Trace explorer', 'Multi-model routing'],
    deps: ['langchain v0.2', 'langgraph v0.1', 'fastapi v0.111', 'pydantic v2', 'redis v5'],
    readme: 'LangGraph Studio provides a visual canvas to design, debug and deploy multi-agent LLM pipelines. Stream tokens live from OpenAI, Anthropic, or any Ollama model. Every execution is recorded with full trace data so you can replay and compare runs.',
    version: 'v0.9.1', releaseDate: 'Apr 12, 2024',
    forks: '1200', issues: '35', watchers: '680',
  },
  {
    id: 'p10', title: 'VectorVault', badge: 'AI / ML', topic: 'AI/ML',
    desc: 'High-performance vector database built in Rust for sub-millisecond similarity search across billions of embeddings.',
    stars: '28.6k', lang: 'Rust', tags: ['RUST', 'GRPC', 'KUBERNETES'],
    author: 'qdrant-labs', time: '8h ago',
    img: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=480&h=200&fit=crop',
    color: '#a78bfa', stars_n: 28600,
    features: ['HNSW & flat index', 'Payload filtering', 'gRPC & REST API', 'Distributed sharding'],
    deps: ['tokio v1.37', 'tonic v0.11', 'serde v1', 'hdf5 v0.8', 'rocksdb v0.22'],
    readme: 'VectorVault delivers sub-millisecond ANN search on billion-scale corpora. Built on a custom HNSW implementation in Rust, it supports payload filtering, multi-tenancy, and horizontal sharding via a Raft-based consensus layer.',
    version: 'v1.9.0', releaseDate: 'Apr 1, 2024',
    forks: '3400', issues: '28', watchers: '1500',
  },

  // ── DevOps ──────────────────────────────────────────────────────────────────
  {
    id: 'p2', title: 'RustStream Engine', badge: 'SYSTEMS', topic: 'DevOps',
    desc: 'Ultra-fast real-time data streaming engine built entirely in Rust for high-throughput pipelines.',
    stars: '12.8k', lang: 'Rust', tags: ['RUST', 'GRPC', 'DOCKER'],
    author: 'tokio-rs', time: '1d ago',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&h=200&fit=crop',
    color: '#d29922', stars_n: 12800,
    features: ['Zero-copy message passing', 'Back-pressure management', 'Kafka-compatible API', 'Prometheus metrics'],
    deps: ['tokio v1.37', 'rdkafka v0.36', 'opentelemetry v0.22', 'serde v1', 'anyhow v1'],
    readme: 'RustStream is a drop-in Kafka alternative designed for latency-sensitive workloads. Its zero-copy pipeline achieves 10M+ msgs/sec on a single node. Native OpenTelemetry integration means you get traces, metrics, and logs with zero config.',
    version: 'v4.2.1', releaseDate: 'Mar 22, 2024',
    forks: '1550', issues: '18', watchers: '720',
  },
  {
    id: 'p5', title: 'GoScale API Framework', badge: 'BACKEND', topic: 'DevOps',
    desc: 'The ultimate framework for building highly scalable microservices with built-in Prometheus metrics.',
    stars: '19.3k', lang: 'Go', tags: ['GO', 'KUBERNETES', 'PROMETHEUS'],
    author: 'goscale-org', time: '12h ago',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=480&h=200&fit=crop',
    color: '#00bcd4', stars_n: 19300,
    features: ['Service mesh integration', 'Auto-scaling policies', 'Circuit-breaker pattern', 'OpenAPI generator'],
    deps: ['gin v1.9', 'grpc-go v1.63', 'prometheus/client_golang v1.19', 'zap v1.27', 'viper v1.18'],
    readme: 'GoScale strips away the boilerplate of building production microservices. Define your service contract in YAML, and GoScale generates the gRPC server, REST gateway, Prometheus metrics endpoint, distributed trace hooks, and Kubernetes manifests.',
    version: 'v3.7.0', releaseDate: 'Mar 30, 2024',
    forks: '2800', issues: '33', watchers: '1100',
  },
  {
    id: 'p11', title: 'TerraForge IaC', badge: 'DEVOPS', topic: 'DevOps',
    desc: 'Opinionated Terraform module library for AWS, GCP, and Azure — production-ready in under 10 minutes.',
    stars: '6.5k', lang: 'Go', tags: ['GO', 'DOCKER', 'KUBERNETES'],
    author: 'terraforge-io', time: '2d ago',
    img: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=480&h=200&fit=crop',
    color: '#7c3aed', stars_n: 6500,
    features: ['Multi-cloud modules', 'Cost estimation built-in', 'Drift detection', 'GitHub Actions workflows'],
    deps: ['terraform v1.7', 'terragrunt v0.56', 'infracost v0.10', 'checkov v3', 'tflint v0.50'],
    readme: 'TerraForge provides a curated library of battle-hardened Terraform modules covering VPCs, EKS clusters, RDS, and more. Every module ships with automated cost estimates via Infracost and security scanning via Checkov, integrated into ready-to-use GitHub Actions pipelines.',
    version: 'v2.3.0', releaseDate: 'Apr 8, 2024',
    forks: '870', issues: '11', watchers: '390',
  },

  // ── Mobile ──────────────────────────────────────────────────────────────────
  {
    id: 'p4', title: 'SwiftUI MasterKit', badge: 'MOBILE', topic: 'Mobile',
    desc: 'A collection of premium SwiftUI components and animations for building polished iOS applications.',
    stars: '8.1k', lang: 'Swift', tags: ['SWIFT', 'SWIFTUI', 'IOS'],
    author: 'apple-devs', time: '4d ago',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=480&h=200&fit=crop',
    color: '#bc8cff', stars_n: 8100,
    features: ['100+ reusable components', 'Lottie animation support', 'iOS 17 compatible', 'SwiftData ready'],
    deps: ['swift v5.10', 'swiftui', 'lottie-ios v4', 'swift-collections v1.1'],
    readme: 'SwiftUI MasterKit is the design system your iOS app deserves. It ships 100+ production-ready components ranging from simple buttons to complex multi-step forms, all fully compatible with iOS 17 and SwiftData. Animations are powered by Lottie for buttery-smooth 60fps motion.',
    version: 'v2.2.0', releaseDate: 'Apr 2, 2024',
    forks: '920', issues: '16', watchers: '480',
  },
  {
    id: 'p12', title: 'FlutterFlow Kit', badge: 'MOBILE', topic: 'Mobile',
    desc: 'Plug-and-play Flutter widget library with 150+ customisable components, state management and offline sync.',
    stars: '5.3k', lang: 'Kotlin', tags: ['SWIFT', 'IOS', 'A11Y'],
    author: 'flutter-community', time: '6h ago',
    img: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=480&h=200&fit=crop',
    color: '#06b6d4', stars_n: 5300,
    features: ['150+ widgets', 'Riverpod state', 'Hive offline sync', 'Material 3 support'],
    deps: ['flutter v3.19', 'riverpod v2.5', 'hive v2', 'go_router v13', 'freezed v2.4'],
    readme: 'FlutterFlow Kit accelerates cross-platform mobile development with 150+ production widgets. State management is handled by Riverpod, while Hive provides automatic offline sync. Every widget is themeable through Material 3 tokens, keeping your design consistent across Android and iOS.',
    version: 'v3.0.1', releaseDate: 'Mar 18, 2024',
    forks: '620', issues: '20', watchers: '290',
  },
  {
    id: 'p13', title: 'ReactNative Turbo', badge: 'MOBILE', topic: 'Mobile',
    desc: 'Next-generation React Native boilerplate with the New Architecture, Expo SDK 50, and end-to-end testing.',
    stars: '4.7k', lang: 'TypeScript', tags: ['REACT', 'TYPESCRIPT', 'IOS'],
    author: 'callstack-io', time: '3d ago',
    img: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=480&h=200&fit=crop',
    color: '#61dafb', stars_n: 4700,
    features: ['New Architecture (Fabric)', 'Expo SDK 50', 'Detox E2E tests', 'Flipper debugging'],
    deps: ['react-native v0.73', 'expo v50', 'zustand v4.5', 'react-query v5', 'detox v20'],
    readme: 'ReactNative Turbo is the most modern RN boilerplate available. It targets the New Architecture (Fabric renderer + JSI) by default, pairs with Expo SDK 50 for fast OTA updates, and ships pre-configured Detox end-to-end tests so you can ship confidently from day one.',
    version: 'v1.2.0', releaseDate: 'Apr 4, 2024',
    forks: '510', issues: '13', watchers: '260',
  },

  // ── Security ─────────────────────────────────────────────────────────────────
  {
    id: 'p14', title: 'ZeroTrust Guard', badge: 'SECURITY', topic: 'Security',
    desc: 'Open-source zero-trust policy engine for Kubernetes clusters — enforce least-privilege at the pod level.',
    stars: '9.8k', lang: 'Go', tags: ['GO', 'KUBERNETES', 'DOCKER'],
    author: 'opa-team', time: '5h ago',
    img: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=480&h=200&fit=crop',
    color: '#ef4444', stars_n: 9800,
    features: ['OPA Rego policies', 'mTLS enforcement', 'Audit logging', 'Admission webhook'],
    deps: ['opa v0.63', 'envoy v1.29', 'cilium v1.15', 'falco v0.37', 'vault v1.16'],
    readme: 'ZeroTrust Guard wraps HashiCorp Vault, Cilium network policies, and OPA admission webhooks into a single operator. Define your trust posture in HCL, and the operator continuously reconciles cluster state — blocking non-compliant workloads before they ever start.',
    version: 'v1.3.2', releaseDate: 'Apr 14, 2024',
    forks: '1100', issues: '29', watchers: '560',
  },
  {
    id: 'p15', title: 'CryptoAudit CLI', badge: 'SECURITY', topic: 'Security',
    desc: 'Automated cryptography auditing tool that scans codebases for weak algorithms, hardcoded secrets and bad TLS configs.',
    stars: '3.9k', lang: 'Python', tags: ['PYTHON', 'DOCKER', 'A11Y'],
    author: 'trail-of-bits', time: '2d ago',
    img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=480&h=200&fit=crop',
    color: '#fbbf24', stars_n: 3900,
    features: ['200+ crypto detectors', 'SARIF output', 'GitHub Actions integration', 'Custom rule DSL'],
    deps: ['click v8.1', 'semgrep v1.68', 'cryptography v42', 'rich v13', 'pyyaml v6'],
    readme: 'CryptoAudit CLI integrates into any CI pipeline and fails builds that contain weak key sizes, deprecated algorithms (MD5, SHA-1, DES), hardcoded secrets, or misconfigured TLS versions. Findings export as SARIF, making them natively visible in GitHub Code Scanning.',
    version: 'v2.7.0', releaseDate: 'Mar 25, 2024',
    forks: '390', issues: '8', watchers: '210',
  },
  {
    id: 'p16', title: 'PenTest Suite', badge: 'SECURITY', topic: 'Security',
    desc: 'Modular penetration testing framework with automated recon, exploitation modules, and HTML report generation.',
    stars: '7.2k', lang: 'Python', tags: ['PYTHON', 'DOCKER', 'GRPC'],
    author: 'offensive-security', time: '1d ago',
    img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=480&h=200&fit=crop',
    color: '#10b981', stars_n: 7200,
    features: ['Automated recon', 'CVE exploit modules', 'HTML/PDF reports', 'Proxy interceptor'],
    deps: ['scapy v2.5', 'nmap-python v0.7', 'impacket v0.12', 'mitmproxy v10', 'jinja2 v3.1'],
    readme: 'PenTest Suite provides a Metasploit-style framework written entirely in Python. The modular plugin system lets you chain recon → exploitation → post-exploitation stages and automatically generate executive-level HTML reports. All network traffic is routable through the built-in mitmproxy interceptor.',
    version: 'v3.5.0', releaseDate: 'Apr 7, 2024',
    forks: '1800', issues: '44', watchers: '820',
  },

  // ── Data ─────────────────────────────────────────────────────────────────────
  {
    id: 'p17', title: 'SparkForge Pipeline', badge: 'DATA', topic: 'Data',
    desc: 'Declarative Apache Spark pipeline builder with automatic schema evolution, data quality checks and lineage tracking.',
    stars: '14.2k', lang: 'Python', tags: ['PYTHON', 'KUBERNETES', 'DOCKER'],
    author: 'databricks-oss', time: '4h ago',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=480&h=200&fit=crop',
    color: '#f59e0b', stars_n: 14200,
    features: ['Schema evolution', 'Great Expectations integration', 'Delta Lake support', 'OpenLineage compatible'],
    deps: ['pyspark v3.5', 'delta-spark v3.1', 'great-expectations v0.18', 'prefect v2.19', 'pyarrow v15'],
    readme: 'SparkForge replaces hand-written PySpark boilerplate with a declarative YAML pipeline definition. Schema evolution is handled automatically via Delta Lake schema merging, and every run emits OpenLineage events so you can trace data provenance end-to-end in Marquez or DataHub.',
    version: 'v2.1.0', releaseDate: 'Apr 9, 2024',
    forks: '1900', issues: '37', watchers: '840',
  },
  {
    id: 'p18', title: 'VisualQuery Studio', badge: 'DATA', topic: 'Data',
    desc: 'Browser-based SQL & DataFrame editor with live collaboration, auto-complete, and chart generation from query results.',
    stars: '5.6k', lang: 'TypeScript', tags: ['REACT', 'TYPESCRIPT', 'DOCKER'],
    author: 'evidence-dev', time: '7h ago',
    img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=480&h=200&fit=crop',
    color: '#06b6d4', stars_n: 5600,
    features: ['Live collaboration (CRDT)', 'DuckDB in-browser', 'Auto-generated charts', '50+ data connectors'],
    deps: ['duckdb-wasm v1.29', 'monaco-editor v0.47', 'yjs v13.6', 'vega-lite v5.19', 'trpc v11'],
    readme: 'VisualQuery Studio runs DuckDB directly in the browser via WebAssembly, so your data never leaves the machine. Invite collaborators and edit queries simultaneously with CRDT-powered conflict resolution. Any SELECT result can be visualised as a chart with one click using the embedded Vega-Lite engine.',
    version: 'v1.8.0', releaseDate: 'Mar 31, 2024',
    forks: '640', issues: '19', watchers: '320',
  },
  {
    id: 'p19', title: 'StatForge Analytics', badge: 'DATA', topic: 'Data',
    desc: 'End-to-end statistical analysis toolkit for Python — hypothesis testing, Bayesian inference, and publication-ready plots.',
    stars: '8.9k', lang: 'Python', tags: ['PYTHON', 'PYTORCH', 'A11Y'],
    author: 'scipy-contrib', time: '5d ago',
    img: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=480&h=200&fit=crop',
    color: '#8b5cf6', stars_n: 8900,
    features: ['Bayesian A/B testing', 'Causal inference', 'Publication-ready LaTeX plots', 'R integration bridge'],
    deps: ['pymc v5.13', 'arviz v0.18', 'statsmodels v0.14', 'matplotlib v3.8', 'polars v0.20'],
    readme: 'StatForge bridges the gap between quick exploratory analysis and publication-ready research reports. Use the Bayesian A/B testing module for rigorous experimentation, apply causal inference with propensity score matching, and export any plot directly to LaTeX-compatible TikZ or high-DPI SVG.',
    version: 'v4.0.2', releaseDate: 'Mar 10, 2024',
    forks: '1050', issues: '24', watchers: '530',
  },

  // ── Simple / Student Projects ─────────────────────────────────────────────
  {
    id: 'p20', title: 'TaskFlow – Todo App', badge: 'WEB APP', topic: 'Web',
    desc: 'Clean minimal todo & task manager. Drag-and-drop reordering, priority labels, and due dates. Built as a college final-year project.',
    stars: '47', lang: 'JavaScript', tags: ['REACT', 'JAVASCRIPT', 'A11Y'],
    author: 'aarav-mishra', time: '3d ago', stars_n: 47,
    img: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=480&h=200&fit=crop',
    color: '#3fb950', emoji: '✅', version: 'v1.0.0', releaseDate: 'Apr 14, 2024',
    forks: '8', issues: '2', watchers: '12',
    authorInitials: 'AM', authorLocation: 'Mumbai, India',
    authorSite: '', authorEmail: 'aarav.mishra@example.com',
    authorColor: 'linear-gradient(135deg,#3fb950,#06b6d4)',
    features: ['Drag-and-drop tasks', 'Priority labels', 'Due date reminders', 'Dark mode'],
    deps: ['react v18', '@hello-pangea/dnd v16', 'dayjs v1.11', 'lucide-react v0.36'],
    readme: 'TaskFlow is a simple but polished todo app built as a final-year college project. It stores all tasks in localStorage — no backend needed. Tasks support three priority levels, optional due dates, and smooth drag-and-drop reordering.',
    benchmarks: [{ label: 'Lighthouse Score', value: 95, unit: '95 / 100', color: 'var(--green)' }, { label: 'Bundle Size', value: 80, unit: '<45kb gzip', color: 'var(--blue)' }],
    releases: [{ v: 'v1.0.0', date: 'Apr 14, 2024', notes: 'Initial release' }],
  },
  {
    id: 'p21', title: 'SkyCast – Weather App', badge: 'WEB APP', topic: 'Web',
    desc: 'Real-time weather dashboard using the OpenWeather API. 5-day forecast, humidity, wind speed, and UV index with animated icons.',
    stars: '31', lang: 'JavaScript', tags: ['REACT', 'JAVASCRIPT', 'TAILWIND'],
    author: 'priya-nair', time: '1w ago', stars_n: 31,
    img: 'https://images.unsplash.com/photo-1504608524841-42584120d693?w=480&h=200&fit=crop',
    color: '#60a5fa', emoji: '🌤️', version: 'v1.2.0', releaseDate: 'Apr 8, 2024',
    forks: '5', issues: '1', watchers: '9',
    authorInitials: 'PN', authorLocation: 'Pune, India',
    authorSite: '', authorEmail: 'priya.nair@example.com',
    authorColor: 'linear-gradient(135deg,#60a5fa,#a78bfa)',
    features: ['5-day weather forecast', 'City search autocomplete', 'Geolocation support', 'Animated weather icons'],
    deps: ['react v18', 'axios v1.6', 'framer-motion v11', 'tailwindcss v3'],
    readme: "SkyCast fetches live weather data from the OpenWeather API. The home page shows current conditions and a 5-day mini forecast. Geolocation auto-fills the user's city on first load.",
    benchmarks: [{ label: 'Lighthouse Score', value: 91, unit: '91 / 100', color: 'var(--green)' }, { label: 'API Cache TTL', value: 85, unit: '5min', color: 'var(--blue)' }],
    releases: [{ v: 'v1.2.0', date: 'Apr 8, 2024', notes: 'UV index + geolocation' }, { v: 'v1.0.0', date: 'Mar 20, 2024', notes: 'Initial release' }],
  },
  {
    id: 'p22', title: 'BudgetBuddy – Expense Tracker', badge: 'DATA', topic: 'Data',
    desc: 'Personal finance tracker with monthly summaries, pie charts, and CSV export. All data stored locally — no account required.',
    stars: '58', lang: 'TypeScript', tags: ['REACT', 'TYPESCRIPT', 'A11Y'],
    author: 'rohit-kulkarni', time: '5d ago', stars_n: 58,
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=480&h=200&fit=crop',
    color: '#f59e0b', emoji: '💰', version: 'v2.0.0', releaseDate: 'Apr 12, 2024',
    forks: '11', issues: '3', watchers: '22',
    authorInitials: 'RK', authorLocation: 'Bengaluru, India',
    authorSite: '', authorEmail: 'rohit.k@example.com',
    authorColor: 'linear-gradient(135deg,#f59e0b,#ef4444)',
    features: ['Income & expense categories', 'Monthly pie & bar charts', 'CSV export', 'Offline-first IndexedDB'],
    deps: ['react v18', 'recharts v2.12', 'idb v8', 'typescript v5', 'papaparse v5'],
    readme: "BudgetBuddy is a privacy-first expense tracker — all data lives in the browser's IndexedDB. Add transactions, categorise them, and view colour-coded charts for each month. Export everything to CSV.",
    benchmarks: [{ label: 'Lighthouse Score', value: 97, unit: '97 / 100', color: 'var(--green)' }, { label: 'Data load', value: 95, unit: '<50ms for 1k records', color: 'var(--blue)' }],
    releases: [{ v: 'v2.0.0', date: 'Apr 12, 2024', notes: 'Charts rewrite with Recharts' }, { v: 'v1.0.0', date: 'Feb 5, 2024', notes: 'Initial release' }],
  },
  {
    id: 'p23', title: 'DevFolio – Portfolio Template', badge: 'TEMPLATE', topic: 'Web',
    desc: 'Modern developer portfolio template with animated showcase, skills section, MDX blog, and contact form. One-click Vercel deploy.',
    stars: '124', lang: 'TypeScript', tags: ['NEXT.JS', 'TYPESCRIPT', 'TAILWIND'],
    author: 'sneha-sharma', time: '2d ago', stars_n: 124,
    img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=480&h=200&fit=crop',
    color: '#bc8cff', emoji: '🎨', version: 'v3.0.0', releaseDate: 'Apr 15, 2024',
    forks: '83', issues: '7', watchers: '56',
    authorInitials: 'SS', authorLocation: 'Hyderabad, India',
    authorSite: 'snehasharma.dev', authorEmail: 'sneha@snehasharma.dev',
    authorColor: 'linear-gradient(135deg,#bc8cff,#f472b6)',
    features: ['Animated hero section', 'Project showcase grid', 'MDX blog support', 'Resend contact form'],
    deps: ['next v14', 'typescript v5', 'tailwindcss v3', 'framer-motion v11', 'resend v3'],
    readme: 'DevFolio is the portfolio template every developer wishes they started with. Built on Next.js 14 with App Router and MDX for blog posts. Deploy to Vercel in under 2 minutes.',
    benchmarks: [{ label: 'Lighthouse Score', value: 99, unit: '99 / 100', color: 'var(--green)' }, { label: 'TTI', value: 96, unit: '<0.9s on fast 3G', color: 'var(--blue)' }],
    releases: [{ v: 'v3.0.0', date: 'Apr 15, 2024', notes: 'MDX blog + Resend form' }, { v: 'v2.0.0', date: 'Jan 12, 2024', notes: 'Framer animations' }, { v: 'v1.0.0', date: 'Sep 20, 2023', notes: 'Initial release' }],
  },
  {
    id: 'p24', title: 'ChitChat – Real-time Chat', badge: 'WEB APP', topic: 'Web',
    desc: 'Simple real-time group chat using Firebase Realtime Database. Multiple rooms, emoji reactions, file sharing — no sign-up needed.',
    stars: '89', lang: 'JavaScript', tags: ['REACT', 'JAVASCRIPT', 'DOCKER'],
    author: 'arjun-reddy', time: '4d ago', stars_n: 89,
    img: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=480&h=200&fit=crop',
    color: '#34d399', emoji: '💬', version: 'v1.3.0', releaseDate: 'Apr 11, 2024',
    forks: '19', issues: '5', watchers: '34',
    authorInitials: 'AR', authorLocation: 'Chennai, India',
    authorSite: '', authorEmail: 'arjun.reddy@example.com',
    authorColor: 'linear-gradient(135deg,#34d399,#3fb950)',
    features: ['Multiple chat rooms', 'Emoji reactions', 'File & image sharing', 'Online presence indicator'],
    deps: ['react v18', 'firebase v10', 'emoji-picker-react v4', 'react-dropzone v14'],
    readme: "ChitChat uses Firebase Realtime Database for instant message sync. Create a room, share the link, and start chatting — no account required. Messages appear in real-time across all connected browsers.",
    benchmarks: [{ label: 'Message latency', value: 92, unit: '<200ms avg', color: 'var(--green)' }, { label: 'Concurrent users', value: 80, unit: 'Tested with 50', color: 'var(--blue)' }],
    releases: [{ v: 'v1.3.0', date: 'Apr 11, 2024', notes: 'File sharing + reactions' }, { v: 'v1.0.0', date: 'Mar 1, 2024', notes: 'Initial release' }],
  },
  {
    id: 'p25', title: 'QuickNotes – Markdown Notes', badge: 'WEB APP', topic: 'Web',
    desc: 'Distraction-free markdown note-taking with live preview, tag organisation, and AES-256 encrypted Supabase sync.',
    stars: '73', lang: 'TypeScript', tags: ['REACT', 'TYPESCRIPT', 'A11Y'],
    author: 'kavya-iyer', time: '6d ago', stars_n: 73,
    img: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=480&h=200&fit=crop',
    color: '#a78bfa', emoji: '📝', version: 'v1.1.0', releaseDate: 'Apr 9, 2024',
    forks: '14', issues: '4', watchers: '28',
    authorInitials: 'KI', authorLocation: 'Coimbatore, India',
    authorSite: '', authorEmail: 'kavya.iyer@example.com',
    authorColor: 'linear-gradient(135deg,#a78bfa,#bc8cff)',
    features: ['Live markdown preview', 'Tag-based organisation', 'E2E encrypted sync', 'Export to PDF / HTML'],
    deps: ['react v18', 'marked v12', 'supabase-js v2', 'typescript v5', 'html2pdf.js v0.10'],
    readme: "QuickNotes is a distraction-free writing environment. Notes are written in Markdown with a live split-pane preview. All note content is AES-256 encrypted client-side before upload.",
    benchmarks: [{ label: 'Lighthouse Score', value: 94, unit: '94 / 100', color: 'var(--green)' }, { label: 'Save latency', value: 90, unit: '<100ms (debounced)', color: 'var(--blue)' }],
    releases: [{ v: 'v1.1.0', date: 'Apr 9, 2024', notes: 'E2E encryption + PDF export' }, { v: 'v1.0.0', date: 'Mar 15, 2024', notes: 'Initial release' }],
  },
];


const filterOptions = {
  Languages: ['JavaScript','TypeScript','Python','Rust','Go','Swift','Kotlin','C++'],
  Frameworks: ['React','Next.js','Vue','Angular','Svelte','FastAPI','Django'],
  Popularity: ['Most Stars','Most Forks','Most Watched','Trending'],
  License: ['MIT','Apache 2.0','GPL','BSD','ISC'],
  Topics: ['Web','AI/ML','DevOps','Mobile','Security','Data'],
};

const tagColors = {
  REACT:'tag-blue', 'NEXT.JS':'tag-purple', TAILWIND:'tag-blue',
  RUST:'tag-orange', GRPC:'tag-gray', DOCKER:'tag-blue',
  PYTHON:'tag-green', PYTORCH:'tag-orange', CUDA:'tag-red',
  SWIFT:'tag-orange', SWIFTUI:'tag-purple', IOS:'tag-gray',
  GO:'tag-blue', KUBERNETES:'tag-blue', PROMETHEUS:'tag-red',
  'VUE 3':'tag-green', TYPESCRIPT:'tag-blue', A11Y:'tag-gray',
  JAVASCRIPT:'tag-orange',
};
const badgeColors = {
  FRAMEWORK:'badge-blue', SYSTEMS:'badge-orange', 'AI / ML':'badge-green',
  MOBILE:'badge-purple', BACKEND:'badge-blue', FRONTEND:'badge-purple',
  'E-COMMERCE':'badge-orange', DEVOPS:'badge-blue',
  SECURITY:'badge-red', DATA:'badge-green',
  'WEB APP':'badge-blue', TEMPLATE:'badge-purple', OPEN:'badge-green', TAKEN:'badge-orange',
};

const PAGE_SIZE = 6;

export default function Explore() {
  const [activeTab, setActiveTab] = useState('Trending');
  const [view, setView] = useState('grid');
  const [openFilter, setOpenFilter] = useState('Languages');
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [navSidebarOpen, setNavSidebarOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(true);
  const [checkedFilters, setCheckedFilters] = useState({});
  const [search, setSearch] = useState('');
  const [searchParams] = useSearchParams();

  // Real data state
  const [dbProblems, setDbProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch problems from backend
  useEffect(() => {
    const loadProblems = async () => {
      try {
        setLoading(true);
        const { data } = await fetchProblems();
        // Map backend fields to frontend expected structure
        const mapped = data.map(p => ({
          id: p.id,
          title: p.title,
          badge: p.status === 'open' ? 'OPEN' : 'TAKEN',
          desc: p.description,
          stars: '0',
          lang: 'N/A',
          tags: [],
          author: p.taken_by || 'Anonymous',
          time: new Date(p.created_at).toLocaleDateString(),
          stars_n: 0,
          topic: 'General',
          img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=480&h=200&fit=crop',
          color: '#2f81f7'
        }));
        setDbProblems(mapped);
      } catch (err) {
        console.error('Failed to fetch problems:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProblems();
  }, []);

  // Pre-apply topic filter from URL
  useEffect(() => {
    const topic = searchParams.get('topic');
    if (topic) {
      setCheckedFilters({ Topics: [topic] });
      setOpenFilter('Topics');
    }
  }, [searchParams]);

  const tabs = ['Trending','Recent','Most Stars','New Releases'];

  const toggleFilter = (section, item) => {
    setCheckedFilters(prev => {
      const sectionFilters = prev[section] || [];
      const exists = sectionFilters.includes(item);
      return {
        ...prev,
        [section]: exists ? sectionFilters.filter(i => i !== item) : [...sectionFilters, item],
      };
    });
    setPage(1);
  };

  const clearAll = () => { setCheckedFilters({}); setPage(1); };

  const activeFilterCount = Object.values(checkedFilters).flat().length;

  // Always show mock projects + any real DB submissions combined
  const displayProjects = [...dbProblems, ...allProjects];

  const sorted = useMemo(() => {
    let list = [...displayProjects];
    if (activeTab === 'Most Stars') list.sort((a, b) => (b.stars_n || 0) - (a.stars_n || 0));
    else if (activeTab === 'Recent') list.sort((a, b) => (a.time || '').localeCompare(b.time || ''));
    else if (activeTab === 'Trending') list.sort((a, b) => (b.stars_n || 0) - (a.stars_n || 0));
    return list;
  }, [activeTab, displayProjects]);

  const filtered = useMemo(() => {
    let list = sorted;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || (p.author || '').toLowerCase().includes(q) || (p.tags || []).some(t => t.toLowerCase().includes(q)));
    }
    const langs = checkedFilters['Languages'] || [];
    if (langs.length) list = list.filter(p => langs.includes(p.lang));
    const topics = checkedFilters['Topics'] || [];
    if (topics.length) list = list.filter(p => topics.includes(p.topic));
    return list;
  }, [sorted, checkedFilters, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* NAV SIDEBAR OVERLAY — button 2 */}
      {navSidebarOpen && (
        <div onClick={() => setNavSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.55)', zIndex: 198, backdropFilter: 'blur(2px)' }} />
      )}
      <aside style={{
        position: 'fixed', left: navSidebarOpen ? 0 : '-260px', top: 0, width: 220,
        height: '100vh', background: 'var(--bg)', borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        transition: 'left .3s cubic-bezier(.4,0,.2,1)', zIndex: 199,
        boxShadow: navSidebarOpen ? '4px 0 24px rgba(0,0,0,.5)' : 'none',
        overflow: 'hidden auto', padding: '16px 0',
      }}>
        <SidebarContent onClick={() => setNavSidebarOpen(false)} />
      </aside>

      {/* TOP NAV WRAPPER */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <nav style={{
          height: navOpen ? 57 : 0,
          overflow: 'hidden',
          background: 'rgba(13,17,23,.95)',
          borderBottom: navOpen ? '1px solid var(--border)' : 'none',
          display: 'flex', alignItems: 'center',
          padding: navOpen ? '0 clamp(12px,3vw,20px)' : '0',
          gap: 8,
          backdropFilter: 'blur(12px)',
          transition: 'height .35s cubic-bezier(.4,0,.2,1), padding .35s',
          animation: 'slideDown .4s ease',
        }}>
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:8, fontWeight:700, fontSize:15, color:'var(--text)', marginRight:8, whiteSpace:'nowrap', textDecoration:'none' }}>
            <div style={{ width:28, height:28, background:'var(--blue)', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13 }}>⊞</div>
            Built On It
          </Link>
          <button className="topnav-link active" style={{ background:'var(--bg4)', color:'var(--text)', padding:'5px 12px', borderRadius:6, border:'none', cursor:'pointer', fontSize:14 }}>Explore</button>
          <div style={{ flex:1, maxWidth:380, position:'relative', marginLeft:8 }}>
            <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'var(--text3)', fontSize:13 }}>🔍</span>
            <input className="input" placeholder="Search projects, stacks, or authors..." style={{ paddingLeft:32, height:34 }} value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <div style={{ marginLeft:'auto', display:'flex', gap:8, alignItems:'center' }}>
            <button className="btn-icon">🔔</button>
            <NavUser />
            {/* Nav toggle */}
            <button onClick={() => setNavOpen(false)} title="Hide navigation"
              style={{ width:28, height:28, borderRadius:'50%', background:'var(--bg3)', border:'1px solid var(--border2)', color:'var(--text2)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0, transition:'all .18s', fontSize:14 }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--bg4)'; e.currentTarget.style.boxShadow='0 0 0 2px rgba(47,129,247,.3)'; e.currentTarget.style.color='var(--text)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--bg3)'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.color='var(--text2)'; }}>↑</button>
          </div>
        </nav>
        {/* Restore tab */}
        <div style={{ position:'absolute', top:0, left:'50%', transform:`translateX(-50%) translateY(${navOpen ? '-100%' : '0'})`, transition:'transform .35s cubic-bezier(.4,0,.2,1)', zIndex:101 }}>
          <button onClick={() => setNavOpen(true)} style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 16px', background:'rgba(13,17,23,.97)', border:'1px solid var(--border2)', borderTop:'none', borderRadius:'0 0 10px 10px', color:'var(--text2)', fontSize:12, fontWeight:600, cursor:'pointer', backdropFilter:'blur(12px)', boxShadow:'0 4px 20px rgba(0,0,0,.4)', transition:'all .18s', letterSpacing:'.3px' }}
            onMouseEnter={e => { e.currentTarget.style.color='var(--text)'; e.currentTarget.style.boxShadow='0 4px 24px rgba(47,129,247,.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.color='var(--text2)'; e.currentTarget.style.boxShadow='0 4px 20px rgba(0,0,0,.4)'; }}>
            <span style={{ fontSize:11 }}>↓</span> Built On It
          </button>
        </div>
      </div>

      <div style={{ display:'flex' }}>
        {/* FILTER SIDEBAR + TOGGLE WRAPPER */}
        <div style={{ position:'relative', display:'flex', flexShrink:0 }}>
          <aside style={{
            width: sidebarOpen ? 240 : 0,
            padding: sidebarOpen ? '20px 16px' : 0,
            borderRight: sidebarOpen ? '1px solid var(--border)' : 'none',
            position: 'sticky',
            top: navOpen ? 57 : 0,
            height: navOpen ? 'calc(100vh - 57px)' : '100vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            flexShrink: 0,
            animation: 'fadeInLeft .4s ease',
            transition: 'width .35s cubic-bezier(.4,0,.2,1), padding .35s, top .35s, height .35s',
          }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
              <span style={{ fontWeight:600, fontSize:13, whiteSpace:'nowrap' }}>
                FILTERS {activeFilterCount > 0 && <span style={{ background:'var(--blue)', color:'#fff', borderRadius:10, padding:'1px 6px', fontSize:10, marginLeft:4 }}>{activeFilterCount}</span>}
              </span>
              <button className="btn-ghost" onClick={clearAll} style={{ color:'var(--blue)', fontSize:12, padding:'2px 6px', whiteSpace:'nowrap' }}>Clear all</button>
            </div>
            {Object.entries(filterOptions).map(([section, items]) => (
              <div key={section} style={{ marginBottom:4 }}>
                <button onClick={() => setOpenFilter(openFilter === section ? null : section)} style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 12px', background: openFilter===section ? 'rgba(47,129,247,.1)' : 'transparent', border:'none', borderRadius:6, cursor:'pointer', color: openFilter===section ? 'var(--blue)' : 'var(--text2)', fontSize:13, fontWeight:500, transition:'all .15s' }}>
                  <span style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span>{section==='Languages' ? '‹›' : section==='Frameworks' ? '◈' : section==='Popularity' ? '★' : section==='License' ? '⚖' : '◆'}</span>
                    {section}
                    {(checkedFilters[section]||[]).length > 0 && <span style={{ background:'var(--blue)', color:'#fff', borderRadius:10, padding:'0px 5px', fontSize:9 }}>{(checkedFilters[section]||[]).length}</span>}
                  </span>
                  <span style={{ fontSize:10, transition:'transform .2s', transform: openFilter===section ? 'rotate(180deg)' : 'none' }}>▼</span>
                </button>
                {openFilter === section && (
                  <div style={{ padding:'4px 8px 8px 24px', animation:'fadeIn .2s ease' }}>
                    {items.map(item => (
                      <label key={item} style={{ display:'flex', alignItems:'center', gap:8, padding:'4px 6px', cursor:'pointer', color: (checkedFilters[section]||[]).includes(item) ? 'var(--text)' : 'var(--text2)', fontSize:12, borderRadius:4 }}>
                        <input type="checkbox" checked={(checkedFilters[section]||[]).includes(item)} onChange={() => toggleFilter(section, item)} style={{ accentColor:'var(--blue)' }} />
                        {item}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div style={{ marginTop:20 }}>
              <div style={{ fontWeight:600, fontSize:11, color:'var(--text3)', textTransform:'uppercase', letterSpacing:1, marginBottom:10 }}>POPULAR TAGS</div>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                {['React','TypeScript','Python','Rust','Tailwind','AI'].map(t => (
                  <span key={t} className="tag tag-blue" style={{ cursor:'pointer', padding:'3px 10px' }} onClick={() => setSearch(t)}>{t}</span>
                ))}
              </div>
            </div>
          </aside>

          {/* BUTTON 1: Filter sidebar toggle */}
          <div style={{ position:'sticky', top: navOpen ? 57 : 0, alignSelf:'flex-start', height:0, transition:'top .35s cubic-bezier(.4,0,.2,1)', zIndex:50 }}>
            <button onClick={() => setSidebarOpen(o => !o)} title={sidebarOpen ? 'Collapse filters (1)' : 'Expand filters (1)'}
              style={{ position:'absolute', left:0, top:20, width:20, height:52, background:'var(--bg2)', border:'1px solid var(--border2)', borderLeft:'none', borderRadius:'0 8px 8px 0', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'var(--text2)', fontSize:12, fontWeight:700, transition:'all .18s', boxShadow:'2px 0 8px rgba(0,0,0,.3)' }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--bg3)'; e.currentTarget.style.color='var(--text)'; e.currentTarget.style.boxShadow='2px 0 12px rgba(47,129,247,.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--bg2)'; e.currentTarget.style.color='var(--text2)'; e.currentTarget.style.boxShadow='2px 0 8px rgba(0,0,0,.3)'; }}>
              {sidebarOpen ? '‹' : '›'}
            </button>
            {/* BUTTON 2: Nav sidebar toggle */}
            <button onClick={() => setNavSidebarOpen(o => !o)} title="Navigation sidebar (2)"
              style={{ position:'absolute', left:0, top:80, width:20, height:52, background: navSidebarOpen ? 'var(--blue)' : 'var(--bg2)', border:'1px solid var(--border2)', borderLeft:'none', borderRadius:'0 8px 8px 0', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color: navSidebarOpen ? '#fff' : 'var(--text2)', fontSize:11, fontWeight:700, transition:'all .18s', boxShadow:'2px 0 8px rgba(0,0,0,.3)' }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--blue)'; e.currentTarget.style.color='#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background= navSidebarOpen ? 'var(--blue)' : 'var(--bg2)'; e.currentTarget.style.color= navSidebarOpen ? '#fff' : 'var(--text2)'; }}>
              ⊞
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <main style={{ flex:1, padding:'20px 24px', animation:'fadeIn .4s ease .1s both', minWidth:0 }}>
          {/* TABS + CONTROLS */}
<div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20, flexWrap:'wrap', gap:12 }}>
  <div style={{ display:'flex', gap:4 }}>
    {tabs.map(t => (
      <button key={t} onClick={() => { setActiveTab(t); setPage(1); }} style={{ padding:'6px 16px', borderRadius:100, border:'none', cursor:'pointer', fontSize:13, fontWeight: activeTab===t ? 600 : 400, background: activeTab===t ? 'var(--text)' : 'transparent', color: activeTab===t ? 'var(--bg)' : 'var(--text2)', transition:'all .18s' }}>{t}</button>
    ))}
  </div>
  <div style={{ display:'flex', alignItems:'center', gap:12 }}>
    <span style={{ color:'var(--text2)', fontSize:12 }}>Showing {filtered.length} projects</span>
    <div style={{ display:'flex', border:'1px solid var(--border)', borderRadius:6, overflow:'hidden' }}>
      {[['⊞','grid'],['☰','list']].map(([ic, v]) => (
        <button key={v} onClick={() => setView(v)} style={{ padding:'5px 10px', border:'none', cursor:'pointer', background: view===v ? 'var(--bg4)' : 'var(--bg2)', color: view===v ? 'var(--text)' : 'var(--text2)', fontSize:14, transition:'all .15s' }}>{ic}</button>
      ))}
    </div>
    <Link to="/submit" className="btn btn-primary btn-sm" style={{ whiteSpace:'nowrap' }}>
      + Submit Problem
    </Link>
  </div>
</div>

          {/* PROJECTS */}
          {paginated.length === 0 ? (
            <div style={{ textAlign:'center', padding:'60px 0', color:'var(--text2)' }}>
              <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
              <div style={{ fontWeight:600 }}>No projects match your filters</div>
              <button className="btn btn-primary btn-sm" style={{ marginTop:16 }} onClick={clearAll}>Clear filters</button>
            </div>
          ) : view === 'grid' ? (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:16, marginBottom:32 }}>
              {paginated.map((p, i) => (
                <Link to={`/project/${p.id}`} key={p.id} className="card" style={{ padding:0, overflow:'hidden', textDecoration:'none', display:'block', animation:`fadeIn .4s ease ${i * 0.07}s both` }}>
                  <div style={{ height:120, position:'relative', overflow:'hidden' }}>
                    <img src={p.img} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform .3s' }} onMouseEnter={e => e.target.style.transform='scale(1.05)'} onMouseLeave={e => e.target.style.transform='scale(1)'} />
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,.7))' }} />
                    <span className={`badge ${badgeColors[p.badge]||'badge-blue'}`} style={{ position:'absolute', top:10, left:10 }}>{p.badge}</span>
                  </div>
                  <div style={{ padding:'14px 16px' }}>
                    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:6 }}>
                      <span style={{ fontWeight:700, fontSize:14, color:'var(--text)' }}>{p.title}</span>
                      <span style={{ color:'var(--orange)', fontSize:12, display:'flex', alignItems:'center', gap:3 }}>⭐ {p.stars}</span>
                    </div>
                    <p style={{ color:'var(--text2)', fontSize:12, lineHeight:1.5, marginBottom:10 }}>{p.desc}</p>
                    <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:10 }}>
                      {p.tags.map(t => <span key={t} className={`tag ${tagColors[t]||'tag-gray'}`}>{t}</span>)}
                    </div>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:11, color:'var(--text3)' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                        <div style={{ width:18, height:18, borderRadius:'50%', background:'var(--blue)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:9 }}>👤</div>
                        <span>{p.author}</span>
                      </div>
                      <span>Updated {p.time}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:32 }}>
              {paginated.map((p, i) => (
                <Link to={`/project/${p.id}`} key={p.id} className="card" style={{ padding:'14px 18px', textDecoration:'none', display:'flex', alignItems:'center', gap:16, animation:`fadeIn .3s ease ${i * 0.05}s both` }}>
                  <img src={p.img} alt={p.title} style={{ width:72, height:52, objectFit:'cover', borderRadius:6, flexShrink:0 }} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                      <span style={{ fontWeight:700, fontSize:14 }}>{p.title}</span>
                      <span className={`badge ${badgeColors[p.badge]||'badge-blue'}`} style={{ fontSize:9 }}>{p.badge}</span>
                    </div>
                    <p style={{ color:'var(--text2)', fontSize:12, marginBottom:6, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.desc}</p>
                    <div style={{ display:'flex', gap:5 }}>
                      {p.tags.map(t => <span key={t} className={`tag ${tagColors[t]||'tag-gray'}`}>{t}</span>)}
                    </div>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:4, flexShrink:0 }}>
                    <span style={{ color:'var(--orange)', fontSize:13 }}>⭐ {p.stars}</span>
                    <span style={{ color:'var(--text3)', fontSize:11 }}>{p.time}</span>
                    <span style={{ color:'var(--text2)', fontSize:11 }}>{p.lang}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, marginBottom:40 }}>
              <button className="btn btn-outline btn-sm" style={{ padding:'5px 10px' }} disabled={page <= 1} onClick={() => setPage(p => p - 1)}>‹</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)} style={{ width:34, height:34, borderRadius:6, border:`1px solid ${page===p ? 'var(--blue)' : 'var(--border)'}`, background: page===p ? 'var(--blue)' : 'transparent', color: page===p ? '#fff' : 'var(--text2)', cursor:'pointer', fontSize:13, transition:'all .15s' }}>{p}</button>
              ))}
              <button className="btn btn-outline btn-sm" style={{ padding:'5px 10px' }} disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>›</button>
            </div>
          )}

          {/* FOOTER */}
          <footer style={{ borderTop:'1px solid var(--border)', paddingTop:40 }}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:24, marginBottom:24 }}>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:8, fontWeight:700, marginBottom:10 }}>
                  <div style={{ width:22, height:22, background:'var(--blue)', borderRadius:5, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11 }}>⊞</div>
                  Built On It
                </div>
                <p style={{ color:'var(--text2)', fontSize:12, lineHeight:1.6 }}>The ultimate discovery platform for high-quality open source projects and developer resources.</p>
                <div style={{ display:'flex', gap:8, marginTop:10 }}>
                  {['🌐','📧','💬'].map(ic => <button key={ic} className="btn-icon" style={{ fontSize:13 }}>{ic}</button>)}
                </div>
              </div>
              {[
                { t:'PRODUCT', l:['Project Search','Top Developers','Collections','Analytics'] },
                { t:'COMMUNITY', l:['Contribute','Showcase','Forums','Sponsorship'] },
                { t:'LEGAL', l:['Privacy Policy','Terms of Service','Cookie Policy'] },
              ].map(col => (
                <div key={col.t}>
                  <div style={{ fontWeight:600, fontSize:11, color:'var(--text3)', textTransform:'uppercase', letterSpacing:1, marginBottom:10 }}>{col.t}</div>
                  {col.l.map(l => <div key={l} style={{ color:'var(--text2)', fontSize:13, marginBottom:7, cursor:'pointer' }}>{l}</div>)}
                </div>
              ))}
            </div>
            <div style={{ borderTop:'1px solid var(--border)', paddingTop:16, textAlign:'center' }}>
              <span style={{ color:'var(--text3)', fontSize:12 }}>© 2024 Built On It Inc. Built for developers by developers.</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

