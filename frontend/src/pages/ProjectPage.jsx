import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import NavUser from '../components/NavUser';
import {
  fetchProblemById,
  fetchTakers,
  joinProblem,
  fetchSolutions,
  downloadSolution,
  createSolution
} from '../api';

/* ─── SHARED PROJECT DATABASE ────────────────────────────────────────────────
   Mirrors the data in BrowseProjects so clicking any card shows real details.
   ──────────────────────────────────────────────────────────────────────────── */
const projectsDB = {
  p1: {
    title: 'NextJS Admin Ultra', badge: 'FRAMEWORK', topic: 'Web', lang: 'TypeScript',
    tags: ['REACT', 'NEXT.JS', 'TAILWIND'], author: 'vercel-labs', authorInitials: 'VL',
    authorLocation: 'San Francisco, CA', authorSite: 'vercel-labs.dev',
    authorEmail: 'hello@vercel-labs.dev', authorColor: 'linear-gradient(135deg,#2f81f7,#bc8cff)',
    stars: '4.2k', stars_n: 4200, forks: '890', issues: '14', watchers: '310',
    color: '#2f81f7', emoji: '🖥️', version: 'v3.1.0', releaseDate: 'Apr 10, 2024',
    img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=340&fit=crop',
    desc: 'A high-performance admin dashboard starter kit with full TypeScript support and built-in auth flows.',
    readme: 'NextJS Admin Ultra provides a battle-tested foundation for enterprise dashboards. Built with type-safety first, every component ships with full TypeScript definitions. Designed to plug into any REST or GraphQL backend in minutes.\n\nThe project uses the App Router and React Server Components where possible to minimise client-side JavaScript. Authentication is handled by NextAuth.js with adapters for PostgreSQL, MongoDB, and Supabase.',
    features: ['Server-side rendering', 'Role-based access control', 'Dark / light theme', 'REST & GraphQL ready', 'NextAuth.js integration', 'Mobile responsive layouts'],
    deps: ['next v14', 'react v18', 'tailwindcss v3', 'prisma v5', 'next-auth v4'],
    benchmarks: [{ label: 'Lighthouse Score', value: 98, unit: '98 / 100', color: 'var(--green)' }, { label: 'Bundle Size', value: 72, unit: '<120kb gzip', color: 'var(--blue)' }, { label: 'TTFB', value: 90, unit: '<80ms on Vercel', color: 'var(--orange)' }],
    releases: [{ v: 'v3.1.0', date: 'Apr 10, 2024', notes: 'App Router support, RSC migration' }, { v: 'v3.0.0', date: 'Feb 14, 2024', notes: 'Next.js 14 upgrade, Prisma v5' }, { v: 'v2.8.0', date: 'Nov 20, 2023', notes: 'NextAuth.js v4 integration' }],
  },
  p2: {
    title: 'RustStream Engine', badge: 'SYSTEMS', topic: 'DevOps', lang: 'Rust',
    tags: ['RUST', 'GRPC', 'DOCKER'], author: 'tokio-rs', authorInitials: 'TR',
    authorLocation: 'Remote / Open Source', authorSite: 'tokio.rs', authorEmail: 'team@tokio.rs',
    authorColor: 'linear-gradient(135deg,#d29922,#f97316)',
    stars: '12.8k', stars_n: 12800, forks: '1550', issues: '18', watchers: '720',
    color: '#d29922', emoji: '⚡', version: 'v4.2.1', releaseDate: 'Mar 22, 2024',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=340&fit=crop',
    desc: 'Ultra-fast real-time data streaming engine built entirely in Rust for high-throughput pipelines.',
    readme: 'RustStream is a drop-in Kafka alternative designed for latency-sensitive workloads. Its zero-copy pipeline achieves 10M+ msgs/sec on a single node. Native OpenTelemetry integration means you get traces, metrics, and logs with zero config.\n\nBuilt on Tokio\'s async runtime, RustStream scales seamlessly from a single process to a distributed cluster. The Kafka-compatible API means existing consumers require zero code changes.',
    features: ['Zero-copy message passing', 'Back-pressure management', 'Kafka-compatible API', 'Prometheus metrics', 'Distributed partitioning', 'At-least-once delivery'],
    deps: ['tokio v1.37', 'rdkafka v0.36', 'opentelemetry v0.22', 'serde v1', 'anyhow v1'],
    benchmarks: [{ label: 'Throughput', value: 95, unit: '10M+ msgs/sec', color: 'var(--blue)' }, { label: 'Latency P99', value: 80, unit: '<2ms', color: 'var(--green)' }, { label: 'Memory usage', value: 45, unit: '<200MB at 1M msgs', color: 'var(--orange)' }],
    releases: [{ v: 'v4.2.1', date: 'Mar 22, 2024', notes: 'RDMA transport support' }, { v: 'v4.0.0', date: 'Jan 5, 2024', notes: 'Distributed mode GA' }, { v: 'v3.8.0', date: 'Oct 12, 2023', notes: 'Kafka-compatible API' }],
  },
  p3: {
    title: 'NeuralNexus AI', badge: 'AI / ML', topic: 'AI/ML', lang: 'Python',
    tags: ['PYTHON', 'PYTORCH', 'CUDA'], author: 'deepmind-labs', authorInitials: 'DL',
    authorLocation: 'London, UK / Mountain View, CA', authorSite: 'neuralnexus.ai', authorEmail: 'oss@neuralnexus.ai',
    authorColor: 'linear-gradient(135deg,#3fb950,#06b6d4)',
    stars: '54k', stars_n: 54000, forks: '7800', issues: '41', watchers: '2900',
    color: '#3fb950', emoji: '🧠', version: 'v2.4.5', releaseDate: 'Mar 15, 2024',
    img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=340&fit=crop',
    desc: 'A comprehensive Python library for deploying neural network models at the edge with minimal dependencies.',
    readme: 'NeuralNexus is designed for developers who need maximum performance with minimal footprint. Deploy any PyTorch model to edge hardware with a single CLI command. Supports INT8 quantization, structured pruning, and WebAssembly export for browser inference.\n\nThe library abstracts over ONNX Runtime, TensorFlow Lite, and CoreML so you write your inference code once and target any device. A companion CLI handles model optimisation, benchmarking, and packaging.',
    features: ['ONNX & TensorFlow export', 'INT8 quantization & pruning', 'WebAssembly target', 'ARM / RISC-V optimised', 'Multi-backend abstraction', 'CLI model optimiser'],
    deps: ['torch v2.2', 'onnxruntime v1.17', 'numpy v1.26', 'einops v0.7', 'accelerate v0.28'],
    benchmarks: [{ label: 'Inference Speed', value: 92, unit: '1.1ms avg (INT8)', color: 'var(--blue)' }, { label: 'Model Size Reduction', value: 75, unit: '4× smaller after quantization', color: 'var(--green)' }, { label: 'Memory Footprint', value: 30, unit: '<4MB runtime', color: 'var(--orange)' }],
    releases: [{ v: 'v2.4.5', date: 'Mar 15, 2024', notes: 'WebAssembly backend GA' }, { v: 'v2.3.0', date: 'Jan 10, 2024', notes: 'CUDA 12 support' }, { v: 'v2.0.0', date: 'Sep 5, 2023', notes: 'Multi-backend API rewrite' }],
  },
  p4: {
    title: 'SwiftUI MasterKit', badge: 'MOBILE', topic: 'Mobile', lang: 'Swift',
    tags: ['SWIFT', 'SWIFTUI', 'IOS'], author: 'apple-devs', authorInitials: 'AD',
    authorLocation: 'Cupertino, CA', authorSite: 'swiftuimasterkit.dev', authorEmail: 'sdk@swiftuimasterkit.dev',
    authorColor: 'linear-gradient(135deg,#bc8cff,#f472b6)',
    stars: '8.1k', stars_n: 8100, forks: '920', issues: '16', watchers: '480',
    color: '#bc8cff', emoji: '📱', version: 'v2.2.0', releaseDate: 'Apr 2, 2024',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=340&fit=crop',
    desc: 'A collection of premium SwiftUI components and animations for building polished iOS applications.',
    readme: 'SwiftUI MasterKit is the design system your iOS app deserves. It ships 100+ production-ready components ranging from simple buttons to complex multi-step forms, all fully compatible with iOS 17 and SwiftData. Animations are powered by Lottie for buttery-smooth 60fps motion.\n\nEvery component is tested on iPhone 15 and iPad Pro. Theming is driven by a token system — change your brand colour in one place and the entire kit updates automatically.',
    features: ['100+ reusable components', 'Lottie animation support', 'iOS 17 compatible', 'SwiftData ready', 'Token-based theming', 'XCTest UI coverage'],
    deps: ['swift v5.10', 'swiftui', 'lottie-ios v4', 'swift-collections v1.1'],
    benchmarks: [{ label: 'Render Performance', value: 99, unit: '60fps on A14+', color: 'var(--green)' }, { label: 'Binary Size', value: 85, unit: '<2MB added overhead', color: 'var(--blue)' }, { label: 'Compile Time', value: 70, unit: '<3s incremental', color: 'var(--orange)' }],
    releases: [{ v: 'v2.2.0', date: 'Apr 2, 2024', notes: 'SwiftData bindings, visionOS preview' }, { v: 'v2.0.0', date: 'Dec 5, 2023', notes: 'iOS 17 & SwiftUI 5 support' }, { v: 'v1.8.0', date: 'Jun 20, 2023', notes: 'Lottie v4 migration' }],
  },
  p5: {
    title: 'GoScale API Framework', badge: 'BACKEND', topic: 'DevOps', lang: 'Go',
    tags: ['GO', 'KUBERNETES', 'PROMETHEUS'], author: 'goscale-org', authorInitials: 'GS',
    authorLocation: 'Remote / Open Source', authorSite: 'goscale.io', authorEmail: 'team@goscale.io',
    authorColor: 'linear-gradient(135deg,#00bcd4,#3fb950)',
    stars: '19.3k', stars_n: 19300, forks: '2800', issues: '33', watchers: '1100',
    color: '#00bcd4', emoji: '🚀', version: 'v3.7.0', releaseDate: 'Mar 30, 2024',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=340&fit=crop',
    desc: 'The ultimate framework for building highly scalable microservices with built-in Prometheus metrics.',
    readme: 'GoScale strips away the boilerplate of building production microservices. Define your service contract in YAML, and GoScale generates the gRPC server, REST gateway, Prometheus metrics endpoint, distributed trace hooks, and Kubernetes manifests.\n\nGo generate creates everything from a single source-of-truth schema. Circuit breakers, retry policies, and bulkhead patterns are all configurable via struct tags — no middleware chains to reason about.',
    features: ['Service mesh integration', 'Auto-scaling policies', 'Circuit-breaker pattern', 'OpenAPI generator', 'gRPC + REST gateway', 'Distributed tracing'],
    deps: ['gin v1.9', 'grpc-go v1.63', 'prometheus/client_golang v1.19', 'zap v1.27', 'viper v1.18'],
    benchmarks: [{ label: 'Requests / sec', value: 90, unit: '250k req/s (8 cores)', color: 'var(--blue)' }, { label: 'p99 Latency', value: 88, unit: '<3ms', color: 'var(--green)' }, { label: 'Cold-start', value: 95, unit: '<10ms', color: 'var(--orange)' }],
    releases: [{ v: 'v3.7.0', date: 'Mar 30, 2024', notes: 'Kubernetes operator GA' }, { v: 'v3.5.0', date: 'Jan 18, 2024', notes: 'OpenAPI 3.1 generator' }, { v: 'v3.0.0', date: 'Aug 10, 2023', notes: 'gRPC streaming support' }],
  },
  p7: {
    title: 'VueGlass UI', badge: 'FRONTEND', topic: 'Web', lang: 'Vue',
    tags: ['VUE 3', 'TYPESCRIPT', 'A11Y'], author: 'vueglass-dev', authorInitials: 'VG',
    authorLocation: 'Amsterdam, Netherlands', authorSite: 'vueglass.dev', authorEmail: 'hi@vueglass.dev',
    authorColor: 'linear-gradient(135deg,#f472b6,#a78bfa)',
    stars: '3.7k', stars_n: 3700, forks: '420', issues: '9', watchers: '195',
    color: '#f472b6', emoji: '🪟', version: 'v2.0.3', releaseDate: 'Mar 28, 2024',
    img: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=800&h=340&fit=crop',
    desc: 'Beautiful glassmorphism design system for Vue.js with 80+ accessible components and dark-mode support.',
    readme: 'VueGlass UI brings glassmorphism aesthetics to Vue 3 without sacrificing accessibility. Every component meets WCAG 2.1 AA contrast ratios and ships with ARIA labels out of the box. Mix-and-match with your existing styles using CSS custom properties.\n\nThe kit is fully tree-shakeable — only the components you import end up in your bundle. A companion Figma design kit ensures pixel-perfect handoff between designers and developers.',
    features: ['80+ UI components', 'WCAG 2.1 compliant', 'Zero runtime dependencies', 'Figma kit included', 'Tree-shakeable ESM', 'CSS custom property theming'],
    deps: ['vue v3.4', 'vite v5', 'vitest v1', 'floating-ui v1', 'typescript v5'],
    benchmarks: [{ label: 'Bundle Size', value: 85, unit: '<15kb per component', color: 'var(--green)' }, { label: 'a11y Score', value: 100, unit: '100 / 100', color: 'var(--blue)' }, { label: 'SSR Compatible', value: 100, unit: 'Nuxt 3 ready', color: 'var(--orange)' }],
    releases: [{ v: 'v2.0.3', date: 'Mar 28, 2024', notes: 'Vue 3.4 Vapor mode support' }, { v: 'v2.0.0', date: 'Jan 30, 2024', notes: 'Figma kit v2, dark mode tokens' }, { v: 'v1.9.0', date: 'Nov 5, 2023', notes: 'WCAG 2.1 AA audit pass' }],
  },
  p8: {
    title: 'SvelteKit Commerce', badge: 'E-COMMERCE', topic: 'Web', lang: 'JavaScript',
    tags: ['REACT', 'DOCKER', 'GRPC'], author: 'svelte-community', authorInitials: 'SC',
    authorLocation: 'Remote / Open Source', authorSite: 'svelte-commerce.dev', authorEmail: 'hello@svelte-commerce.dev',
    authorColor: 'linear-gradient(135deg,#ff6b35,#fbbf24)',
    stars: '2.1k', stars_n: 2100, forks: '310', issues: '22', watchers: '180',
    color: '#ff6b35', emoji: '🛍️', version: 'v1.5.2', releaseDate: 'Apr 5, 2024',
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=340&fit=crop',
    desc: 'Full-stack e-commerce starter built on SvelteKit with Stripe payments, inventory management and SSR.',
    readme: 'SvelteKit Commerce is the fastest way to launch a production-grade storefront. It includes a complete checkout flow powered by Stripe, a lightweight inventory system, and an admin panel — all optimised for Cloudflare Workers and Vercel Edge.\n\nProduct pages are statically pre-rendered at build time, while the cart and checkout use server-side rendering with Stripe Elements embedded via a secure iframe. The admin panel is protected by Lucia session-based auth.',
    features: ['Stripe checkout', 'Inventory management', 'Admin panel', 'Edge-ready deployments', 'SSG product pages', 'Lucia session auth'],
    deps: ['@sveltejs/kit v2', 'stripe v14', 'drizzle-orm v0.30', 'lucia v3'],
    benchmarks: [{ label: 'Lighthouse Performance', value: 97, unit: '97 / 100', color: 'var(--green)' }, { label: 'Time to Interactive', value: 90, unit: '<1.2s on 4G', color: 'var(--blue)' }, { label: 'Checkout Conversion', value: 78, unit: '+23% vs baseline', color: 'var(--orange)' }],
    releases: [{ v: 'v1.5.2', date: 'Apr 5, 2024', notes: 'Stripe subscriptions support' }, { v: 'v1.4.0', date: 'Feb 10, 2024', notes: 'Cloudflare D1 adapter' }, { v: 'v1.0.0', date: 'Sep 20, 2023', notes: 'Initial release' }],
  },
  p9: {
    title: 'LangGraph Studio', badge: 'AI / ML', topic: 'AI/ML', lang: 'Python',
    tags: ['PYTHON', 'PYTORCH', 'DOCKER'], author: 'langchain-ai', authorInitials: 'LC',
    authorLocation: 'San Francisco, CA', authorSite: 'langchain.com', authorEmail: 'oss@langchain.com',
    authorColor: 'linear-gradient(135deg,#f97316,#fbbf24)',
    stars: '11.4k', stars_n: 11400, forks: '1200', issues: '35', watchers: '680',
    color: '#f97316', emoji: '🔗', version: 'v0.9.1', releaseDate: 'Apr 12, 2024',
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=340&fit=crop',
    desc: 'Visual workflow builder for LangChain / LangGraph pipelines with real-time token streaming and trace explorer.',
    readme: 'LangGraph Studio provides a visual canvas to design, debug and deploy multi-agent LLM pipelines. Stream tokens live from OpenAI, Anthropic, or any Ollama model. Every execution is recorded with full trace data so you can replay and compare runs.\n\nThe UI is a React app that connects to a local FastAPI server. Nodes represent agents or tools; edges represent message passing. Drag to add a new agent, wire it up, and hit Run — Studio injects real inputs and streams the results token-by-token.',
    features: ['Drag & drop pipeline editor', 'Real-time token streaming', 'Trace explorer', 'Multi-model routing', 'Human-in-the-loop nodes', 'State persistence'],
    deps: ['langchain v0.2', 'langgraph v0.1', 'fastapi v0.111', 'pydantic v2', 'redis v5'],
    benchmarks: [{ label: 'Token latency', value: 85, unit: '<120ms first token', color: 'var(--blue)' }, { label: 'Concurrent sessions', value: 70, unit: '50 parallel runs', color: 'var(--green)' }, { label: 'Trace storage', value: 90, unit: '< 5MB per 1k traces', color: 'var(--orange)' }],
    releases: [{ v: 'v0.9.1', date: 'Apr 12, 2024', notes: 'Anthropic Claude 3 support' }, { v: 'v0.8.0', date: 'Mar 1, 2024', notes: 'Human-in-the-loop nodes' }, { v: 'v0.5.0', date: 'Jan 15, 2024', notes: 'Trace explorer panel' }],
  },
  p10: {
    title: 'VectorVault', badge: 'AI / ML', topic: 'AI/ML', lang: 'Rust',
    tags: ['RUST', 'GRPC', 'KUBERNETES'], author: 'qdrant-labs', authorInitials: 'QL',
    authorLocation: 'Berlin, Germany', authorSite: 'qdrant.tech', authorEmail: 'team@qdrant.tech',
    authorColor: 'linear-gradient(135deg,#a78bfa,#2f81f7)',
    stars: '28.6k', stars_n: 28600, forks: '3400', issues: '28', watchers: '1500',
    color: '#a78bfa', emoji: '🗄️', version: 'v1.9.0', releaseDate: 'Apr 1, 2024',
    img: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=340&fit=crop',
    desc: 'High-performance vector database built in Rust for sub-millisecond similarity search across billions of embeddings.',
    readme: 'VectorVault delivers sub-millisecond ANN search on billion-scale corpora. Built on a custom HNSW implementation in Rust, it supports payload filtering, multi-tenancy, and horizontal sharding via a Raft-based consensus layer.\n\nPersistence uses a custom WAL-backed segment store that achieves sequential write speeds comparable to RocksDB while maintaining low read amplification. The gRPC and REST APIs are spec-compliant and have official client libraries in Python, Go, TypeScript, and Rust.',
    features: ['HNSW & flat index', 'Payload filtering', 'gRPC & REST API', 'Distributed sharding', 'Multi-tenancy', 'WAL-backed durability'],
    deps: ['tokio v1.37', 'tonic v0.11', 'serde v1', 'hdf5 v0.8', 'rocksdb v0.22'],
    benchmarks: [{ label: 'ANN Recall', value: 98, unit: '99.2% @ p10', color: 'var(--green)' }, { label: 'QPS', value: 92, unit: '12k queries/sec', color: 'var(--blue)' }, { label: 'Index Build', value: 80, unit: '100M vectors in 8min', color: 'var(--orange)' }],
    releases: [{ v: 'v1.9.0', date: 'Apr 1, 2024', notes: 'Multi-vector colBERT support' }, { v: 'v1.8.0', date: 'Feb 10, 2024', notes: 'Quantization: scalar & product' }, { v: 'v1.5.0', date: 'Oct 2, 2023', notes: 'Distributed sharding GA' }],
  },
  p11: {
    title: 'TerraForge IaC', badge: 'DEVOPS', topic: 'DevOps', lang: 'Go',
    tags: ['GO', 'DOCKER', 'KUBERNETES'], author: 'terraforge-io', authorInitials: 'TF',
    authorLocation: 'Remote / Open Source', authorSite: 'terraforge.io', authorEmail: 'team@terraforge.io',
    authorColor: 'linear-gradient(135deg,#7c3aed,#2f81f7)',
    stars: '6.5k', stars_n: 6500, forks: '870', issues: '11', watchers: '390',
    color: '#7c3aed', emoji: '🏗️', version: 'v2.3.0', releaseDate: 'Apr 8, 2024',
    img: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=340&fit=crop',
    desc: 'Opinionated Terraform module library for AWS, GCP, and Azure — production-ready in under 10 minutes.',
    readme: 'TerraForge provides a curated library of battle-hardened Terraform modules covering VPCs, EKS clusters, RDS, and more. Every module ships with automated cost estimates via Infracost and security scanning via Checkov, integrated into ready-to-use GitHub Actions pipelines.\n\nModules are versioned independently and published to the Terraform Registry. Each module contains a full test suite using Terratest, so you can be confident changes do not break existing infrastructure.',
    features: ['Multi-cloud modules', 'Cost estimation built-in', 'Drift detection', 'GitHub Actions workflows', 'Terratest suites', 'Terraform Registry published'],
    deps: ['terraform v1.7', 'terragrunt v0.56', 'infracost v0.10', 'checkov v3', 'tflint v0.50'],
    benchmarks: [{ label: 'Security Score', value: 95, unit: 'A+ CIS Benchmark', color: 'var(--green)' }, { label: 'Cost Accuracy', value: 92, unit: '±5% of actual AWS bill', color: 'var(--blue)' }, { label: 'Apply Time', value: 85, unit: '<4min full stack', color: 'var(--orange)' }],
    releases: [{ v: 'v2.3.0', date: 'Apr 8, 2024', notes: 'Azure module library complete' }, { v: 'v2.0.0', date: 'Jan 20, 2024', notes: 'GCP module library' }, { v: 'v1.5.0', date: 'Sep 15, 2023', notes: 'Infracost integration' }],
  },
  p12: {
    title: 'FlutterFlow Kit', badge: 'MOBILE', topic: 'Mobile', lang: 'Kotlin',
    tags: ['SWIFT', 'IOS', 'A11Y'], author: 'flutter-community', authorInitials: 'FC',
    authorLocation: 'Remote / Open Source', authorSite: 'flutter-kit.dev', authorEmail: 'team@flutter-kit.dev',
    authorColor: 'linear-gradient(135deg,#06b6d4,#2f81f7)',
    stars: '5.3k', stars_n: 5300, forks: '620', issues: '20', watchers: '290',
    color: '#06b6d4', emoji: '🦋', version: 'v3.0.1', releaseDate: 'Mar 18, 2024',
    img: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&h=340&fit=crop',
    desc: 'Plug-and-play Flutter widget library with 150+ customisable components, state management and offline sync.',
    readme: 'FlutterFlow Kit accelerates cross-platform mobile development with 150+ production widgets. State management is handled by Riverpod, while Hive provides automatic offline sync. Every widget is themeable through Material 3 tokens.\n\nThe kit ships a companion Storybook-style catalogue app that runs on Android, iOS, and the web, so Flutter developers can browse, tweak, and copy-paste components without reading docs.',
    features: ['150+ widgets', 'Riverpod state', 'Hive offline sync', 'Material 3 support', 'Interactive catalogue app', 'Adaptive Android & iOS'],
    deps: ['flutter v3.19', 'riverpod v2.5', 'hive v2', 'go_router v13', 'freezed v2.4'],
    benchmarks: [{ label: 'Widget Render', value: 99, unit: '60fps Pixel 8 / iPhone 15', color: 'var(--green)' }, { label: 'Offline Sync', value: 88, unit: '<50ms rehydration', color: 'var(--blue)' }, { label: 'App Size', value: 82, unit: '+1.8MB overhead', color: 'var(--orange)' }],
    releases: [{ v: 'v3.0.1', date: 'Mar 18, 2024', notes: 'Material 3 Expressive tokens' }, { v: 'v3.0.0', date: 'Jan 12, 2024', notes: 'Flutter 3.16 & Impeller' }, { v: 'v2.8.0', date: 'Oct 1, 2023', notes: 'Riverpod v2 migration' }],
  },
  p13: {
    title: 'ReactNative Turbo', badge: 'MOBILE', topic: 'Mobile', lang: 'TypeScript',
    tags: ['REACT', 'TYPESCRIPT', 'IOS'], author: 'callstack-io', authorInitials: 'CK',
    authorLocation: 'Wrocław, Poland', authorSite: 'callstack.com', authorEmail: 'oss@callstack.com',
    authorColor: 'linear-gradient(135deg,#61dafb,#bc8cff)',
    stars: '4.7k', stars_n: 4700, forks: '510', issues: '13', watchers: '260',
    color: '#61dafb', emoji: '⚛️', version: 'v1.2.0', releaseDate: 'Apr 4, 2024',
    img: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&h=340&fit=crop',
    desc: 'Next-generation React Native boilerplate with the New Architecture, Expo SDK 50, and end-to-end testing.',
    readme: 'ReactNative Turbo is the most modern RN boilerplate available. It targets the New Architecture (Fabric renderer + JSI) by default, pairs with Expo SDK 50 for fast OTA updates, and ships pre-configured Detox end-to-end tests so you can ship confidently from day one.\n\nEnvironment variables are managed by `react-native-dotenv`. Navigation is set up with Expo Router (file-based). Global state uses Zustand; server state uses TanStack Query v5.',
    features: ['New Architecture (Fabric)', 'Expo SDK 50', 'Detox E2E tests', 'Flipper debugging', 'File-based Expo Router', 'Zustand + TanStack Query'],
    deps: ['react-native v0.73', 'expo v50', 'zustand v4.5', 'react-query v5', 'detox v20'],
    benchmarks: [{ label: 'JS Bundle Parse', value: 90, unit: '<200ms cold start', color: 'var(--blue)' }, { label: 'Frame rate', value: 99, unit: '60fps on mid-range', color: 'var(--green)' }, { label: 'OTA Update Size', value: 88, unit: '<500kb delta', color: 'var(--orange)' }],
    releases: [{ v: 'v1.2.0', date: 'Apr 4, 2024', notes: 'Expo Router v3 & SDK 50' }, { v: 'v1.0.0', date: 'Feb 5, 2024', notes: 'New Architecture default' }, { v: 'v0.9.0', date: 'Nov 20, 2023', notes: 'Detox 20 E2E setup' }],
  },
  p14: {
    title: 'ZeroTrust Guard', badge: 'SECURITY', topic: 'Security', lang: 'Go',
    tags: ['GO', 'KUBERNETES', 'DOCKER'], author: 'opa-team', authorInitials: 'OT',
    authorLocation: 'Remote / Open Source', authorSite: 'openpolicyagent.org', authorEmail: 'team@openpolicyagent.org',
    authorColor: 'linear-gradient(135deg,#ef4444,#f97316)',
    stars: '9.8k', stars_n: 9800, forks: '1100', issues: '29', watchers: '560',
    color: '#ef4444', emoji: '🛡️', version: 'v1.3.2', releaseDate: 'Apr 14, 2024',
    img: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&h=340&fit=crop',
    desc: 'Open-source zero-trust policy engine for Kubernetes clusters — enforce least-privilege at the pod level.',
    readme: 'ZeroTrust Guard wraps HashiCorp Vault, Cilium network policies, and OPA admission webhooks into a single operator. Define your trust posture in HCL, and the operator continuously reconciles cluster state — blocking non-compliant workloads before they ever start.\n\nAudit logs are streamed to Elasticsearch or S3 in real time. The policy-as-code model means your security rules live in Git, pass through CI, and are peer-reviewed like any other code change.',
    features: ['OPA Rego policies', 'mTLS enforcement', 'Audit logging', 'Admission webhook', 'GitOps policy workflow', 'Real-time SIEM streaming'],
    deps: ['opa v0.63', 'envoy v1.29', 'cilium v1.15', 'falco v0.37', 'vault v1.16'],
    benchmarks: [{ label: 'Policy Eval Latency', value: 95, unit: '<1ms per request', color: 'var(--green)' }, { label: 'Audit Throughput', value: 88, unit: '50k events/sec', color: 'var(--blue)' }, { label: 'False Positive Rate', value: 97, unit: '<0.1%', color: 'var(--orange)' }],
    releases: [{ v: 'v1.3.2', date: 'Apr 14, 2024', notes: 'Kubernetes 1.30 admission CEL' }, { v: 'v1.2.0', date: 'Feb 20, 2024', notes: 'Falco runtime rules' }, { v: 'v1.0.0', date: 'Oct 10, 2023', notes: 'GA release' }],
  },
  p15: {
    title: 'CryptoAudit CLI', badge: 'SECURITY', topic: 'Security', lang: 'Python',
    tags: ['PYTHON', 'DOCKER', 'A11Y'], author: 'trail-of-bits', authorInitials: 'TB',
    authorLocation: 'New York, NY', authorSite: 'trailofbits.com', authorEmail: 'oss@trailofbits.com',
    authorColor: 'linear-gradient(135deg,#fbbf24,#f97316)',
    stars: '3.9k', stars_n: 3900, forks: '390', issues: '8', watchers: '210',
    color: '#fbbf24', emoji: '🔐', version: 'v2.7.0', releaseDate: 'Mar 25, 2024',
    img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=340&fit=crop',
    desc: 'Automated cryptography auditing tool that scans codebases for weak algorithms, hardcoded secrets and bad TLS configs.',
    readme: 'CryptoAudit CLI integrates into any CI pipeline and fails builds that contain weak key sizes, deprecated algorithms (MD5, SHA-1, DES), hardcoded secrets, or misconfigured TLS versions. Findings export as SARIF, making them natively visible in GitHub Code Scanning.\n\nThe rule set is written in a custom YAML DSL, so adding new detectors requires no Python. Community-contributed rules are published to a registry and auto-updated on each run.',
    features: ['200+ crypto detectors', 'SARIF output', 'GitHub Actions integration', 'Custom rule DSL', 'Auto-updated rule registry', 'Secrets triage dashboard'],
    deps: ['click v8.1', 'semgrep v1.68', 'cryptography v42', 'rich v13', 'pyyaml v6'],
    benchmarks: [{ label: 'Scan Speed', value: 90, unit: '50k LOC/sec', color: 'var(--blue)' }, { label: 'Detection Rate', value: 96, unit: '96% known CWEs', color: 'var(--green)' }, { label: 'False Positives', value: 92, unit: '<4% FPR', color: 'var(--orange)' }],
    releases: [{ v: 'v2.7.0', date: 'Mar 25, 2024', notes: 'PQC algorithm detectors added' }, { v: 'v2.5.0', date: 'Jan 8, 2024', notes: 'SARIF 2.1 export' }, { v: 'v2.0.0', date: 'Aug 5, 2023', notes: 'Custom rule DSL v2' }],
  },
  p16: {
    title: 'PenTest Suite', badge: 'SECURITY', topic: 'Security', lang: 'Python',
    tags: ['PYTHON', 'DOCKER', 'GRPC'], author: 'offensive-security', authorInitials: 'OS',
    authorLocation: 'Remote / Open Source', authorSite: 'pentest-suite.dev', authorEmail: 'team@pentest-suite.dev',
    authorColor: 'linear-gradient(135deg,#10b981,#3fb950)',
    stars: '7.2k', stars_n: 7200, forks: '1800', issues: '44', watchers: '820',
    color: '#10b981', emoji: '🕵️', version: 'v3.5.0', releaseDate: 'Apr 7, 2024',
    img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=340&fit=crop',
    desc: 'Modular penetration testing framework with automated recon, exploitation modules, and HTML report generation.',
    readme: 'PenTest Suite provides a Metasploit-style framework written entirely in Python. The modular plugin system lets you chain recon → exploitation → post-exploitation stages and automatically generate executive-level HTML reports. All network traffic is routable through the built-in mitmproxy interceptor.\n\nEvery module is sandboxed in its own Docker container, so a crashing exploit never takes down the console. The built-in scheduler lets you queue modules to run overnight and email you the report at 8am.',
    features: ['Automated recon', 'CVE exploit modules', 'HTML/PDF reports', 'Proxy interceptor', 'Docker sandboxed modules', 'Overnight scheduler'],
    deps: ['scapy v2.5', 'nmap-python v0.7', 'impacket v0.12', 'mitmproxy v10', 'jinja2 v3.1'],
    benchmarks: [{ label: 'Module Coverage', value: 88, unit: '400+ exploit modules', color: 'var(--blue)' }, { label: 'Recon Speed', value: 85, unit: 'Full scan in <5min', color: 'var(--green)' }, { label: 'Report Quality', value: 90, unit: 'CVSS 3.1 scoring', color: 'var(--orange)' }],
    releases: [{ v: 'v3.5.0', date: 'Apr 7, 2024', notes: 'AI-assisted exploit chaining' }, { v: 'v3.0.0', date: 'Dec 10, 2023', notes: 'Docker sandbox isolation' }, { v: 'v2.5.0', date: 'Jul 20, 2023', notes: 'PDF report export' }],
  },
  p17: {
    title: 'SparkForge Pipeline', badge: 'DATA', topic: 'Data', lang: 'Python',
    tags: ['PYTHON', 'KUBERNETES', 'DOCKER'], author: 'databricks-oss', authorInitials: 'DB',
    authorLocation: 'San Francisco, CA', authorSite: 'sparkforge.dev', authorEmail: 'team@sparkforge.dev',
    authorColor: 'linear-gradient(135deg,#f59e0b,#ef4444)',
    stars: '14.2k', stars_n: 14200, forks: '1900', issues: '37', watchers: '840',
    color: '#f59e0b', emoji: '⚡', version: 'v2.1.0', releaseDate: 'Apr 9, 2024',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=340&fit=crop',
    desc: 'Declarative Apache Spark pipeline builder with automatic schema evolution, data quality checks and lineage tracking.',
    readme: 'SparkForge replaces hand-written PySpark boilerplate with a declarative YAML pipeline definition. Schema evolution is handled automatically via Delta Lake schema merging, and every run emits OpenLineage events so you can trace data provenance end-to-end in Marquez or DataHub.\n\nPipelines are compiled to optimised PySpark DAGs at startup. The built-in Great Expectations integration runs data quality checks as a first-class pipeline step, blocking downstream jobs when expectations fail.',
    features: ['Schema evolution', 'Great Expectations integration', 'Delta Lake support', 'OpenLineage compatible', 'YAML pipeline DSL', 'Prefect orchestration'],
    deps: ['pyspark v3.5', 'delta-spark v3.1', 'great-expectations v0.18', 'prefect v2.19', 'pyarrow v15'],
    benchmarks: [{ label: 'Throughput', value: 92, unit: '1TB/hr on 10 nodes', color: 'var(--blue)' }, { label: 'Schema Merge Time', value: 95, unit: '<30s for 1k columns', color: 'var(--green)' }, { label: 'DQ Check Overhead', value: 88, unit: '<3% runtime cost', color: 'var(--orange)' }],
    releases: [{ v: 'v2.1.0', date: 'Apr 9, 2024', notes: 'Spark Connect remote mode' }, { v: 'v2.0.0', date: 'Feb 1, 2024', notes: 'Delta Lake 3.1 support' }, { v: 'v1.8.0', date: 'Oct 5, 2023', notes: 'OpenLineage integration' }],
  },
  p18: {
    title: 'VisualQuery Studio', badge: 'DATA', topic: 'Data', lang: 'TypeScript',
    tags: ['REACT', 'TYPESCRIPT', 'DOCKER'], author: 'evidence-dev', authorInitials: 'EV',
    authorLocation: 'Remote / Open Source', authorSite: 'evidence.dev', authorEmail: 'oss@evidence.dev',
    authorColor: 'linear-gradient(135deg,#06b6d4,#2f81f7)',
    stars: '5.6k', stars_n: 5600, forks: '640', issues: '19', watchers: '320',
    color: '#06b6d4', emoji: '📊', version: 'v1.8.0', releaseDate: 'Mar 31, 2024',
    img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=340&fit=crop',
    desc: 'Browser-based SQL & DataFrame editor with live collaboration, auto-complete, and chart generation from query results.',
    readme: 'VisualQuery Studio runs DuckDB directly in the browser via WebAssembly, so your data never leaves the machine. Invite collaborators and edit queries simultaneously with CRDT-powered conflict resolution. Any SELECT result can be visualised as a chart with one click using the embedded Vega-Lite engine.\n\nThe Monaco editor is pre-configured with DuckDB SQL dialect hints and auto-complete powered by the live schema. Sessions are persisted to IndexedDB so your work survives a page refresh.',
    features: ['Live collaboration (CRDT)', 'DuckDB in-browser', 'Auto-generated charts', '50+ data connectors', 'Monaco SQL editor', 'IndexedDB session persistence'],
    deps: ['duckdb-wasm v1.29', 'monaco-editor v0.47', 'yjs v13.6', 'vega-lite v5.19', 'trpc v11'],
    benchmarks: [{ label: 'Query Latency', value: 92, unit: '<200ms for 10M rows', color: 'var(--blue)' }, { label: 'Collab Sync', value: 95, unit: '<50ms CRDT merge', color: 'var(--green)' }, { label: 'Chart Render', value: 88, unit: '<300ms for 100k pts', color: 'var(--orange)' }],
    releases: [{ v: 'v1.8.0', date: 'Mar 31, 2024', notes: 'DuckDB 0.10 WASM upgrade' }, { v: 'v1.6.0', date: 'Feb 8, 2024', notes: 'Vega-Lite 5.19 charts' }, { v: 'v1.0.0', date: 'Sep 5, 2023', notes: 'Initial release with DuckDB WASM' }],
  },
  p19: {
    title: 'StatForge Analytics', badge: 'DATA', topic: 'Data', lang: 'Python',
    tags: ['PYTHON', 'PYTORCH', 'A11Y'], author: 'scipy-contrib', authorInitials: 'SC',
    authorLocation: 'Remote / Open Source', authorSite: 'statforge.dev', authorEmail: 'team@statforge.dev',
    authorColor: 'linear-gradient(135deg,#8b5cf6,#a78bfa)',
    stars: '8.9k', stars_n: 8900, forks: '1050', issues: '24', watchers: '530',
    color: '#8b5cf6', emoji: '📈', version: 'v4.0.2', releaseDate: 'Mar 10, 2024',
    img: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&h=340&fit=crop',
    desc: 'End-to-end statistical analysis toolkit for Python — hypothesis testing, Bayesian inference, and publication-ready plots.',
    readme: 'StatForge bridges the gap between quick exploratory analysis and publication-ready research reports. Use the Bayesian A/B testing module for rigorous experimentation, apply causal inference with propensity score matching, and export any plot directly to LaTeX-compatible TikZ or high-DPI SVG.\n\nA two-way R bridge lets you call any CRAN package from Python and get back a Polars DataFrame. Results are annotated with effect sizes and confidence intervals by default, nudging analysts towards more interpretable statistics.',
    features: ['Bayesian A/B testing', 'Causal inference', 'Publication-ready LaTeX plots', 'R integration bridge', 'Effect size annotations', 'Polars-native DataFrame API'],
    deps: ['pymc v5.13', 'arviz v0.18', 'statsmodels v0.14', 'matplotlib v3.8', 'polars v0.20'],
    benchmarks: [{ label: 'MCMC Sampling', value: 85, unit: '10k draws in <4s', color: 'var(--blue)' }, { label: 'Plot Render', value: 92, unit: '<500ms pub-ready SVG', color: 'var(--green)' }, { label: 'R Bridge Latency', value: 80, unit: '<100ms round-trip', color: 'var(--orange)' }],
    releases: [{ v: 'v4.0.2', date: 'Mar 10, 2024', notes: 'PyMC 5.13 compatibility' }, { v: 'v4.0.0', date: 'Jan 2, 2024', notes: 'Polars DataFrame API rewrite' }, { v: 'v3.8.0', date: 'Sep 20, 2023', notes: 'R bridge via rpy2' }],
  },

  /* ── Student Projects ────────────────────────────────────── */
  p20: {
    title: 'TaskFlow – Todo App', badge: 'WEB APP', topic: 'Web', lang: 'JavaScript',
    tags: ['REACT', 'JAVASCRIPT', 'A11Y'], author: 'aarav-mishra', authorInitials: 'AM',
    authorLocation: 'Mumbai, India', authorSite: '', authorEmail: 'aarav.mishra@example.com',
    authorColor: 'linear-gradient(135deg,#3fb950,#06b6d4)',
    stars: '47', stars_n: 47, forks: '8', issues: '2', watchers: '12',
    color: '#3fb950', emoji: '✅', version: 'v1.0.0', releaseDate: 'Apr 14, 2024',
    img: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=340&fit=crop',
    desc: 'Clean minimal todo & task manager. Drag-and-drop reordering, priority labels, and due dates. Built as a college final-year project.',
    readme: 'TaskFlow is a simple but polished todo app built as a final-year college project. All tasks are stored in localStorage so no backend is needed.\n\nTasks support three priority levels (low / medium / high), optional due dates with overdue highlighting, and smooth drag-and-drop reordering powered by @hello-pangea/dnd. A dark-mode toggle persists the preference to localStorage.',
    features: ['Drag-and-drop tasks', 'Priority labels (low/med/high)', 'Due date reminders', 'Dark mode', 'localStorage persistence', 'Mobile responsive'],
    deps: ['react v18', '@hello-pangea/dnd v16', 'dayjs v1.11', 'lucide-react v0.36'],
    benchmarks: [{ label: 'Lighthouse Score', value: 95, unit: '95 / 100', color: 'var(--green)' }, { label: 'Bundle Size', value: 80, unit: '<45kb gzip', color: 'var(--blue)' }],
    releases: [{ v: 'v1.0.0', date: 'Apr 14, 2024', notes: 'Initial release' }],
  },
  p21: {
    title: 'SkyCast – Weather App', badge: 'WEB APP', topic: 'Web', lang: 'JavaScript',
    tags: ['REACT', 'JAVASCRIPT', 'TAILWIND'], author: 'priya-nair', authorInitials: 'PN',
    authorLocation: 'Pune, India', authorSite: '', authorEmail: 'priya.nair@example.com',
    authorColor: 'linear-gradient(135deg,#60a5fa,#a78bfa)',
    stars: '31', stars_n: 31, forks: '5', issues: '1', watchers: '9',
    color: '#60a5fa', emoji: '🌤️', version: 'v1.2.0', releaseDate: 'Apr 8, 2024',
    img: 'https://images.unsplash.com/photo-1504608524841-42584120d693?w=800&h=340&fit=crop',
    desc: 'Real-time weather dashboard using the OpenWeather API. 5-day forecast, humidity, wind speed, and UV index with animated icons.',
    readme: "SkyCast fetches live weather data from the OpenWeather API and presents it in a clean dashboard.\n\nThe home screen shows current temperature, humidity, UV index, and wind speed with animated Lottie weather icons. A 5-day mini forecast bar sits below. Geolocation auto-fills the user's city on first load, and city search provides instant autocomplete.",
    features: ['5-day weather forecast', 'City search autocomplete', 'Geolocation support', 'Animated weather icons', 'UV index display', 'Celsius / Fahrenheit toggle'],
    deps: ['react v18', 'axios v1.6', 'framer-motion v11', 'tailwindcss v3'],
    benchmarks: [{ label: 'Lighthouse Score', value: 91, unit: '91 / 100', color: 'var(--green)' }, { label: 'API cache TTL', value: 85, unit: '5min', color: 'var(--blue)' }],
    releases: [{ v: 'v1.2.0', date: 'Apr 8, 2024', notes: 'UV index + geolocation' }, { v: 'v1.0.0', date: 'Mar 20, 2024', notes: 'Initial release' }],
  },
  p22: {
    title: 'BudgetBuddy – Expense Tracker', badge: 'DATA', topic: 'Data', lang: 'TypeScript',
    tags: ['REACT', 'TYPESCRIPT', 'A11Y'], author: 'rohit-kulkarni', authorInitials: 'RK',
    authorLocation: 'Bengaluru, India', authorSite: '', authorEmail: 'rohit.k@example.com',
    authorColor: 'linear-gradient(135deg,#f59e0b,#ef4444)',
    stars: '58', stars_n: 58, forks: '11', issues: '3', watchers: '22',
    color: '#f59e0b', emoji: '💰', version: 'v2.0.0', releaseDate: 'Apr 12, 2024',
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=340&fit=crop',
    desc: 'Personal finance tracker with monthly summaries, pie charts, and CSV export. All data stored locally — no account required.',
    readme: "BudgetBuddy is a privacy-first expense tracker — all data lives in the browser's IndexedDB, so nothing is ever sent to a server.\n\nAdd income or expense transactions with a category (food, transport, utilities, entertainment, etc.), view colour-coded monthly pie charts, and export any month's data as a CSV for your own records.",
    features: ['Income & expense categories', 'Monthly pie & bar charts', 'CSV export', 'Offline-first IndexedDB', 'Category budget limits', 'Multi-month history'],
    deps: ['react v18', 'recharts v2.12', 'idb v8', 'typescript v5', 'papaparse v5'],
    benchmarks: [{ label: 'Lighthouse Score', value: 97, unit: '97 / 100', color: 'var(--green)' }, { label: 'Data load', value: 95, unit: '<50ms for 1k records', color: 'var(--blue)' }],
    releases: [{ v: 'v2.0.0', date: 'Apr 12, 2024', notes: 'Charts rewrite with Recharts' }, { v: 'v1.0.0', date: 'Feb 5, 2024', notes: 'Initial release' }],
  },
  p23: {
    title: 'DevFolio – Portfolio Template', badge: 'TEMPLATE', topic: 'Web', lang: 'TypeScript',
    tags: ['NEXT.JS', 'TYPESCRIPT', 'TAILWIND'], author: 'sneha-sharma', authorInitials: 'SS',
    authorLocation: 'Hyderabad, India', authorSite: 'snehasharma.dev', authorEmail: 'sneha@snehasharma.dev',
    authorColor: 'linear-gradient(135deg,#bc8cff,#f472b6)',
    stars: '124', stars_n: 124, forks: '83', issues: '7', watchers: '56',
    color: '#bc8cff', emoji: '🎨', version: 'v3.0.0', releaseDate: 'Apr 15, 2024',
    img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=340&fit=crop',
    desc: 'Modern developer portfolio template with animated showcase, skills, MDX blog, and contact form. One-click Vercel deploy.',
    readme: 'DevFolio is the portfolio template every developer wishes they started with. Built on Next.js 14 with App Router and MDX for blog posts.\n\nScroll-triggered Framer Motion animations bring the project cards and skills section to life. The contact form is wired to Resend for email delivery. Clone the repo, update config.js with your details, and deploy to Vercel in under 2 minutes.',
    features: ['Animated hero section', 'Project showcase grid', 'MDX blog support', 'Resend contact form', 'SEO meta + sitemap', 'One-click Vercel deploy'],
    deps: ['next v14', 'typescript v5', 'tailwindcss v3', 'framer-motion v11', 'resend v3'],
    benchmarks: [{ label: 'Lighthouse Score', value: 99, unit: '99 / 100', color: 'var(--green)' }, { label: 'TTI', value: 96, unit: '<0.9s on fast 3G', color: 'var(--blue)' }],
    releases: [{ v: 'v3.0.0', date: 'Apr 15, 2024', notes: 'MDX blog + Resend form' }, { v: 'v2.0.0', date: 'Jan 12, 2024', notes: 'Framer animations' }, { v: 'v1.0.0', date: 'Sep 20, 2023', notes: 'Initial release' }],
  },
  p24: {
    title: 'ChitChat – Real-time Chat', badge: 'WEB APP', topic: 'Web', lang: 'JavaScript',
    tags: ['REACT', 'JAVASCRIPT', 'DOCKER'], author: 'arjun-reddy', authorInitials: 'AR',
    authorLocation: 'Chennai, India', authorSite: '', authorEmail: 'arjun.reddy@example.com',
    authorColor: 'linear-gradient(135deg,#34d399,#3fb950)',
    stars: '89', stars_n: 89, forks: '19', issues: '5', watchers: '34',
    color: '#34d399', emoji: '💬', version: 'v1.3.0', releaseDate: 'Apr 11, 2024',
    img: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=340&fit=crop',
    desc: 'Simple real-time group chat using Firebase Realtime Database. Rooms, emoji reactions, file sharing — no sign-up needed.',
    readme: "ChitChat uses Firebase Realtime Database for instant message sync. Create a room, share the 6-character code, and start chatting — no account required (Firebase anonymous auth).\n\nMessages appear in real-time across all connected browsers. Reactions are stored per-message as emoji counters. File uploads go to Firebase Storage with a 10MB per-file limit.",
    features: ['Multiple chat rooms', 'Emoji reactions', 'File & image sharing', 'Online presence indicator', 'Anonymous auth', 'Message history'],
    deps: ['react v18', 'firebase v10', 'emoji-picker-react v4', 'react-dropzone v14'],
    benchmarks: [{ label: 'Message latency', value: 92, unit: '<200ms avg', color: 'var(--green)' }, { label: 'Concurrent users', value: 80, unit: 'Tested with 50', color: 'var(--blue)' }],
    releases: [{ v: 'v1.3.0', date: 'Apr 11, 2024', notes: 'File sharing + reactions' }, { v: 'v1.0.0', date: 'Mar 1, 2024', notes: 'Initial release' }],
  },
  p25: {
    title: 'QuickNotes – Markdown Notes', badge: 'WEB APP', topic: 'Web', lang: 'TypeScript',
    tags: ['REACT', 'TYPESCRIPT', 'A11Y'], author: 'kavya-iyer', authorInitials: 'KI',
    authorLocation: 'Coimbatore, India', authorSite: '', authorEmail: 'kavya.iyer@example.com',
    authorColor: 'linear-gradient(135deg,#a78bfa,#bc8cff)',
    stars: '73', stars_n: 73, forks: '14', issues: '4', watchers: '28',
    color: '#a78bfa', emoji: '📝', version: 'v1.1.0', releaseDate: 'Apr 9, 2024',
    img: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&h=340&fit=crop',
    desc: 'Distraction-free markdown note-taking with live preview, tag organisation, and AES-256 encrypted Supabase sync.',
    readme: 'QuickNotes is a distraction-free writing environment for developers. Notes are written in Markdown with a live split-pane preview powered by marked.js.\n\nAll note content is AES-256 encrypted client-side using the Web Crypto API before upload — even the Supabase dashboard cannot read your notes. Tag notes and filter the sidebar by tag for quick retrieval.',
    features: ['Live markdown preview', 'Tag-based organisation', 'E2E AES-256 encrypted sync', 'Export to PDF / HTML', 'Offline draft saves', 'Keyboard shortcuts'],
    deps: ['react v18', 'marked v12', 'supabase-js v2', 'typescript v5', 'html2pdf.js v0.10'],
    benchmarks: [{ label: 'Lighthouse Score', value: 94, unit: '94 / 100', color: 'var(--green)' }, { label: 'Save latency', value: 90, unit: '<100ms (debounced)', color: 'var(--blue)' }],
    releases: [{ v: 'v1.1.0', date: 'Apr 9, 2024', notes: 'E2E encryption + PDF export' }, { v: 'v1.0.0', date: 'Mar 15, 2024', notes: 'Initial release' }],
  },
};

const tabs = ['README', 'Features', 'Benchmarks', 'Dependencies', 'Releases'];

const badgeColors = {
  FRAMEWORK:'badge-blue', SYSTEMS:'badge-orange', 'AI / ML':'badge-green',
  MOBILE:'badge-purple', BACKEND:'badge-blue', FRONTEND:'badge-purple',
  'E-COMMERCE':'badge-orange', DEVOPS:'badge-blue', SECURITY:'badge-red', DATA:'badge-green',
  'WEB APP':'badge-blue', TEMPLATE:'badge-purple', OPEN:'badge-green', TAKEN:'badge-orange',
};

const tagColors = {
  REACT:'tag-blue','NEXT.JS':'tag-purple',TAILWIND:'tag-blue',
  RUST:'tag-orange',GRPC:'tag-gray',DOCKER:'tag-blue',
  PYTHON:'tag-green',PYTORCH:'tag-orange',CUDA:'tag-red',
  SWIFT:'tag-orange',SWIFTUI:'tag-purple',IOS:'tag-gray',
  GO:'tag-blue',KUBERNETES:'tag-blue',PROMETHEUS:'tag-red',
  'VUE 3':'tag-green',TYPESCRIPT:'tag-blue',A11Y:'tag-gray',
  JAVASCRIPT:'tag-orange',
};

export default function ProjectDetail() {
  const { id } = useParams();

  /* ── Look up local project data ────────────────────────────────────────── */
  const localProject = projectsDB[id] || null;

  /* ── Backend data (problems) ───────────────────────────────────────────── */
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ── UI state ──────────────────────────────────────────────────────────── */
  const [activeTab, setActiveTab] = useState('README');
  const [starred, setStarred] = useState(false);
  const [starCount, setStarCount] = useState(localProject?.stars_n || 1000);
  const [copied, setCopied] = useState(false);
  const [supported, setSupported] = useState(false);

  /* ── Backend: takers ───────────────────────────────────────────────────── */
  const [takers, setTakers] = useState([]);

  /* ── Backend: solutions ────────────────────────────────────────────────── */
  const [solutions, setSolutions] = useState([]);
  const [loadingSolutions, setLoadingSolutions] = useState(true);
  const [showSolutionForm, setShowSolutionForm] = useState(false);
  const [solutionText, setSolutionText] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [solutionFile, setSolutionFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  /* ── Fetch backend problem (only for IDs that look like UUIDs / ints) ─── */
  useEffect(() => {
    const loadProblem = async () => {
      if (localProject) {
        /* We have rich local data — still try backend but don't block UI */
        setLoading(false);
        try {
          const { data } = await fetchProblemById(id);
          setProblem(data);
        } catch {
          /* backend 404 is fine for local mock projects */
        }
        return;
      }
      try {
        setLoading(true);
        const { data } = await fetchProblemById(id);
        setProblem(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load problem');
      } finally {
        setLoading(false);
      }
    };
    loadProblem();
  }, [id, localProject]);

  /* ── Fetch takers & solutions ──────────────────────────────────────────── */
  useEffect(() => {
    if (!problem?.id && !localProject) return;
    const problemId = problem?.id || id;
    const loadTakers = async () => {
      try { const { data } = await fetchTakers(problemId); setTakers(data); } catch {}
    };
    const loadSolutions = async () => {
      try {
        setLoadingSolutions(true);
        const { data } = await fetchSolutions(problemId);
        setSolutions(data);
      } catch { } finally { setLoadingSolutions(false); }
    };
    loadTakers();
    loadSolutions();
  }, [problem, id, localProject]);

  /* ── Handlers ──────────────────────────────────────────────────────────── */
  const handleJoinProblem = async () => {
    const studentName = prompt('Enter your name to join this project:');
    if (!studentName) return;
    try {
      await joinProblem(id, studentName);
      alert('You have joined the project!');
      const { data } = await fetchTakers(id);
      setTakers(data);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to join');
    }
  };

  const handleSubmitSolution = async (e) => {
    e.preventDefault();
    if (!solutionText && !githubLink && !solutionFile) {
      alert('Please provide text, a GitHub link, or a file.');
      return;
    }
    setSubmitting(true);
    const formData = new FormData();
    if (solutionText) formData.append('text', solutionText);
    if (githubLink) formData.append('github_link', githubLink);
    if (solutionFile) formData.append('file', solutionFile);
    try {
      await createSolution(id, formData);
      alert('Solution posted!');
      setSolutionText(''); setGithubLink(''); setSolutionFile(null);
      setShowSolutionForm(false);
      const { data } = await fetchSolutions(id);
      setSolutions(data);
    } catch { alert('Failed to post solution'); } finally { setSubmitting(false); }
  };

  const handleSolutionDownload = async (solutionId) => {
    try {
      const response = await downloadSolution(solutionId);
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'solution-file';
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+?)"?$/);
        if (match) filename = match[1];
      }
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url; link.setAttribute('download', filename);
      document.body.appendChild(link); link.click(); link.remove();
      window.URL.revokeObjectURL(url);
    } catch { alert('Failed to download file'); }
  };

  const handleStar = () => {
    setStarred(s => !s);
    setStarCount(n => starred ? n - 1 : n + 1);
  };

  const handleCopy = () => {
    const repoSlug = (localProject?.title || 'project').toLowerCase().replace(/\s+/g, '-');
    navigator.clipboard?.writeText(`git clone https://github.com/${localProject?.author || 'example'}/${repoSlug}.git`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSupport = () => { setSupported(true); setTimeout(() => setSupported(false), 2000); };

  const formatStars = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n;

  /* ── Resolve display data: prefer localProject, fall back to backend ───── */
  const proj = localProject || (problem ? {
    title: problem.title, badge: problem.status === 'open' ? 'OPEN' : 'TAKEN', topic: 'General',
    lang: 'N/A', tags: [], author: problem.taken_by || 'Anonymous',
    authorInitials: (problem.taken_by || 'A')[0].toUpperCase(),
    authorLocation: 'Unknown', authorSite: '', authorEmail: '',
    authorColor: 'linear-gradient(135deg,#2f81f7,#bc8cff)',
    stars: '0', stars_n: 0, forks: '0', issues: '0', watchers: '0',
    color: '#2f81f7', emoji: '⚙️', version: 'v1.0.0', releaseDate: '',
    img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=340&fit=crop',
    desc: problem.description,
    readme: problem.description,
    features: [], deps: [],
    benchmarks: [{ label: 'Progress', value: 50, unit: 'In development', color: 'var(--blue)' }],
    releases: [],
  } : null);

  if (loading && !localProject) return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', color: 'var(--text2)' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
        <div style={{ fontWeight: 600 }}>Loading project...</div>
      </div>
    </div>
  );

  if (error && !localProject) return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', color: 'var(--text2)' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>❌</div>
        <div style={{ fontWeight: 600 }}>{error}</div>
        <Link to="/explore" className="btn btn-primary btn-sm" style={{ marginTop: 16 }}>← Back to Explore</Link>
      </div>
    </div>
  );

  if (!proj) return null;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* TOPNAV */}
      <nav style={{ height: 57, background: 'rgba(13,17,23,.95)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 clamp(12px,3vw,20px)', gap: 10, position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(12px)', animation: 'slideDown .4s ease' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
          <div style={{ width: 28, height: 28, background: 'var(--blue)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>⊞</div>
          Built On It
        </Link>
        <Link to="/explore" style={{ color: 'var(--text2)', fontSize: 12, textDecoration: 'none', padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg3)', transition: 'all .15s', whiteSpace: 'nowrap' }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--border2)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.borderColor = 'var(--border)'; }}>
          ← Explore
        </Link>
        <div style={{ flex: 1, maxWidth: 380, position: 'relative', minWidth: 0 }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)' }}>🔍</span>
          <input className="input" placeholder="Search projects, authors, or tags..." style={{ paddingLeft: 32, height: 34 }} />
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, flexShrink: 0 }}>
          <button className="btn-icon">🔔</button>
          <NavUser />
        </div>
      </nav>

      {/* HERO BANNER */}
      <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
        <img src={proj.img} alt={proj.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,17,23,.3) 0%, rgba(13,17,23,.85) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: '0 clamp(16px,4vw,40px) 24px', gap: 16 }}>
          <div style={{ width: 64, height: 64, background: `${proj.color}28`, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, border: `1.5px solid ${proj.color}55`, flexShrink: 0, animation: 'float 4s ease-in-out infinite' }}>
            {proj.emoji}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: 'clamp(1.2rem,3vw,1.8rem)', fontWeight: 800, letterSpacing: -0.5, color: '#fff' }}>{proj.title}</h1>
              <span className={`badge ${badgeColors[proj.badge] || 'badge-blue'}`} style={{ fontSize: 10 }}>{proj.badge}</span>
              {problem && (
                <span className="badge" style={{ fontSize: 10, background: problem.status === 'open' ? 'rgba(63,185,80,0.2)' : 'rgba(210,153,34,0.2)', color: problem.status === 'open' ? '#56d364' : '#e3b341', border: `1px solid ${problem.status === 'open' ? 'rgba(63,185,80,.35)' : 'rgba(210,153,34,.35)'}` }}>
                  {problem.status === 'open' ? '🟢 OPEN' : '🟡 TAKEN'}
                </span>
              )}
            </div>
            <div style={{ color: 'rgba(255,255,255,.7)', fontSize: 13, marginTop: 4 }}>by {proj.author} • {proj.lang} • {proj.version}</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(16px,3vw,28px) clamp(14px,3vw,24px)', display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 24, animation: 'fadeIn .4s ease' }} className="project-detail-grid">

        {/* LEFT COLUMN */}
        <div>
          {/* ACTION BAR */}
          <div className="card" style={{ padding: '16px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {proj.tags.map(t => <span key={t} className={`tag ${tagColors[t] || 'tag-gray'}`}>{t}</span>)}
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="btn btn-secondary" onClick={handleCopy}
                style={{ transition: 'all .2s', background: copied ? 'rgba(63,185,80,.12)' : undefined, borderColor: copied ? 'var(--green)' : undefined, color: copied ? 'var(--green)' : undefined }}>
                {copied ? '✓ Copied!' : '📋 Clone'}
              </button>
              <button className="btn btn-secondary" onClick={handleStar}
                style={{ transition: 'all .2s', background: starred ? 'rgba(210,153,34,.12)' : undefined, borderColor: starred ? 'var(--orange)' : undefined, color: starred ? 'var(--orange)' : undefined }}>
                {starred ? '★' : '⭐'} {formatStars(starCount)}
              </button>
            </div>
          </div>

          {/* TABS */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{ padding: '10px 18px', border: 'none', cursor: 'pointer', background: 'transparent', color: activeTab === tab ? 'var(--text)' : 'var(--text2)', fontSize: 13, fontWeight: activeTab === tab ? 600 : 400, borderBottom: `2px solid ${activeTab === tab ? 'var(--blue)' : 'transparent'}`, transition: 'all .18s', whiteSpace: 'nowrap', marginBottom: -1 }}>
                {tab}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <div className="card" style={{ padding: 28, borderRadius: '0 0 var(--radius-lg) var(--radius-lg)', borderTop: 'none', animation: 'fadeIn .3s ease' }}>

            {/* README */}
            {activeTab === 'README' && (
              <>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 14 }}>About {proj.title}</h2>
                <p style={{ color: 'var(--text2)', fontSize: 13.5, lineHeight: 1.75, marginBottom: 24 }}>
                  {proj.readme}
                </p>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 14 }}>Key Features</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24 }}>
                  {(proj.features || []).map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text2)', fontSize: 13 }}>
                      <span style={{ color: 'var(--blue)', fontSize: 15 }}>✅</span>
                      {f}
                    </div>
                  ))}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 14 }}>Quick Start</h3>
                <div style={{ background: 'var(--bg3)', borderRadius: 8, padding: '16px 20px', border: '1px solid var(--border)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.8 }}>
                  <div style={{ color: 'var(--text3)' }}># Install</div>
                  <div><span style={{ color: '#f97583' }}>{proj.lang === 'Python' ? 'pip install' : proj.lang === 'Rust' ? 'cargo add' : proj.lang === 'Go' ? 'go get' : 'npm install'}</span>{' '}
                    <span style={{ color: '#a5d6ff' }}>{(proj.title || '').toLowerCase().replace(/\s+/g, '-')}</span></div>
                  <div style={{ marginTop: 8, color: 'var(--text3)' }}># Version</div>
                  <div><span style={{ color: '#79b8ff' }}>{proj.version}</span></div>
                </div>
              </>
            )}

            {/* FEATURES */}
            {activeTab === 'Features' && (
              <div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 16 }}>All Features</h2>
                <div style={{ display: 'grid', gap: 10 }}>
                  {(proj.features || []).map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'var(--bg3)', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13, color: 'var(--text2)' }}>
                      <span style={{ color: 'var(--green)', fontSize: 16 }}>✓</span> {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BENCHMARKS */}
            {activeTab === 'Benchmarks' && (
              <div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 16 }}>Performance Benchmarks</h2>
                {(proj.benchmarks || []).map(b => (
                  <div key={b.label} style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                      <span style={{ fontWeight: 600 }}>{b.label}</span>
                      <span style={{ color: 'var(--text2)' }}>{b.unit}</span>
                    </div>
                    <div style={{ height: 8, background: 'var(--bg3)', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${b.value}%`, background: b.color, borderRadius: 4, transition: 'width 1s ease', boxShadow: `0 0 8px ${b.color}66` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* DEPENDENCIES */}
            {activeTab === 'Dependencies' && (
              <div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 16 }}>Dependencies</h2>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {(proj.deps || []).map(d => <span key={d} className="tag tag-gray" style={{ fontSize: 12, padding: '5px 12px' }}>{d}</span>)}
                </div>
              </div>
            )}

            {/* RELEASES */}
            {activeTab === 'Releases' && (
              <div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 16 }}>Release History</h2>
                {(proj.releases || []).map(r => (
                  <div key={r.v} style={{ padding: '14px 16px', background: 'var(--bg3)', borderRadius: 8, border: '1px solid var(--border)', marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, color: 'var(--blue)' }}>{r.v}</span>
                      <span style={{ color: 'var(--text3)', fontSize: 12 }}>{r.date}</span>
                    </div>
                    <p style={{ color: 'var(--text2)', fontSize: 13, margin: 0 }}>{r.notes}</p>
                  </div>
                ))}
                {(proj.releases || []).length === 0 && (
                  <p style={{ color: 'var(--text2)', fontSize: 13 }}>No releases yet.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR — sticky, scrollable, compact */}
        <div className="proj-sidebar" style={{
          display: 'flex', flexDirection: 'column', gap: 14,
          position: 'sticky', top: 73,
          maxHeight: 'calc(100vh - 90px)',
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingRight: 4,
          scrollbarWidth: 'thin',
          scrollbarColor: '#3d444d #0d1117',
        }}>

          {/* STATS */}
          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 12, fontSize: 13 }}>Project Stats</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { label: 'STARS', value: formatStars(starCount), icon: '⭐', color: '#e3b341' },
                { label: 'FORKS', value: proj.forks || '—', icon: '🍴', color: '#56d364' },
                { label: 'ISSUES', value: proj.issues || '—', icon: '🔴', color: '#f85149' },
                { label: 'WATCHERS', value: proj.watchers || '—', icon: '👁️', color: '#79b8ff' },
              ].map(s => (
                <div key={s.label} style={{ background: 'var(--bg3)', borderRadius: 7, padding: '10px 12px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 9, color: 'var(--text3)', fontWeight: 600, letterSpacing: 1, marginBottom: 3 }}>{s.label}</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 700, lineHeight: 1, color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* OWNER */}
          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 12, fontSize: 13 }}>Owner</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: proj.authorColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                {proj.authorInitials || '??'}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{proj.author}</div>
                <div style={{ color: 'var(--text2)', fontSize: 11 }}>{proj.authorLocation}</div>
              </div>
            </div>
            <button
              className={`btn ${supported ? 'btn-secondary' : 'btn-primary'} btn-sm`}
              style={{ width: '100%', justifyContent: 'center', transition: 'all .2s' }}
              onClick={handleSupport}>
              {supported ? '💚 Thank you!' : 'Support Project'}
            </button>
          </div>

          {/* SOLUTIONS */}
          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 12, fontSize: 13 }}>💡 Solutions ({solutions.length})</h3>
            {loadingSolutions ? (
              <p style={{ color: 'var(--text2)', fontSize: 12 }}>Loading...</p>
            ) : solutions.length === 0 ? (
              <p style={{ color: 'var(--text2)', fontSize: 12 }}>No solutions yet. Be the first!</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 180, overflowY: 'auto' }}>
                {solutions.map((sol) => (
                  <div key={sol.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 10 }}>
                    {sol.solution_type === 'text' && <p style={{ color: 'var(--text2)', fontSize: 12, lineHeight: 1.5 }}>{sol.text}</p>}
                    {sol.solution_type === 'github' && (
                      <a href={sol.github_link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 5 }}>🔗 View on GitHub →</a>
                    )}
                    {sol.solution_type === 'file' && (
                      <div>
                        <p style={{ color: 'var(--text2)', fontSize: 12, marginBottom: 5 }}>📎 {sol.file_path?.split('/').pop() || 'Attached file'}</p>
                        <button className="btn btn-secondary btn-sm" onClick={() => handleSolutionDownload(sol.id)} style={{ fontSize: 11 }}>⬇️ Download</button>
                      </div>
                    )}
                    <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 5 }}>Posted {new Date(sol.created_at).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            )}
            <button className="btn btn-outline btn-sm" style={{ width: '100%', marginTop: 12 }} onClick={() => setShowSolutionForm(!showSolutionForm)}>
              {showSolutionForm ? 'Cancel' : '+ Post Solution'}
            </button>
          </div>

          {/* SOLUTION FORM */}
          {showSolutionForm && (
            <div className="card" style={{ padding: 16 }}>
              <h4 style={{ fontWeight: 600, marginBottom: 10, fontSize: 13 }}>Post Your Solution</h4>
              <form onSubmit={handleSubmitSolution}>
                <textarea className="input" placeholder="Describe your solution..." rows={3} value={solutionText} onChange={e => setSolutionText(e.target.value)} style={{ marginBottom: 8 }} />
                <input className="input" placeholder="GitHub URL (optional)" value={githubLink} onChange={e => setGithubLink(e.target.value)} style={{ marginBottom: 8 }} />
                <input type="file" onChange={e => setSolutionFile(e.target.files[0])} style={{ marginBottom: 10, fontSize: 12 }} />
                <button type="submit" className="btn btn-primary btn-sm" disabled={submitting} style={{ width: '100%' }}>
                  {submitting ? 'Posting...' : 'Submit Solution'}
                </button>
              </form>
            </div>
          )}

          {/* COLLABORATORS */}
          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 12, fontSize: 13 }}>👥 Collaborators ({takers.length})</h3>
            {takers.length === 0 ? (
              <p style={{ color: 'var(--text2)', fontSize: 12 }}>Be the first to join!</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {takers.map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff' }}>
                      {t.student_name.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ fontSize: 12 }}>{t.student_name}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text3)' }}>{new Date(t.taken_at).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            )}
            <button className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: 12, justifyContent: 'center' }} onClick={handleJoinProblem}>🤝 Join Project</button>
          </div>

          {/* QUICK LINKS + DEPS compact card */}
          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 12, fontSize: 13 }}>Quick Links</h3>
            {[{ icon: '‹›', label: 'Source Code', href: '#' }, { icon: '📚', label: 'Tutorials', href: '/tutorials' }, { icon: '💬', label: 'Community', href: '#' }].map(l => (
              <a key={l.label} href={l.href}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', background: 'var(--bg3)', borderRadius: 6, marginBottom: 6, border: '1px solid var(--border)', cursor: 'pointer', transition: 'all .15s', textDecoration: 'none', color: 'inherit', fontSize: 12 }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border2)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span>{l.icon}</span>{l.label}</div>
                <span style={{ color: 'var(--text3)', fontSize: 10 }}>↗</span>
              </a>
            ))}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, marginTop: 4 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text3)', marginBottom: 8 }}>DEPENDENCIES</div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {(proj.deps || []).map(d => <span key={d} className="tag tag-gray" style={{ fontSize: 10 }}>{d}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: 'clamp(14px,3vw,20px) clamp(14px,3vw,24px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text2)', fontSize: 13 }}>
          <div style={{ width: 18, height: 18, background: 'var(--blue)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>⊞</div>
          Built On It © 2024. Built for developers.
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {[['Privacy', '/privacy'], ['Terms', '/terms'], ['Contact', '/contact']].map(([l, to]) =>
            <Link key={l} to={to} style={{ color: 'var(--text2)', fontSize: 13, textDecoration: 'none' }}>{l}</Link>
          )}
        </div>
      </footer>

      <style>{`
        @media(min-width:769px){.project-detail-grid{grid-template-columns:minmax(0,1fr) 320px!important}}
        .project-detail-grid>div:first-child{min-width:0}
        .proj-sidebar::-webkit-scrollbar{width:5px}
        .proj-sidebar::-webkit-scrollbar-track{background:#0d1117;border-radius:3px}
        .proj-sidebar::-webkit-scrollbar-thumb{background:#3d444d;border-radius:3px}
        .proj-sidebar::-webkit-scrollbar-thumb:hover{background:#6e7681}
      `}</style>
    </div>
  );
}
