# Graph Report - .  (2026-07-09)

## Corpus Check
- Large corpus: 127 files · ~811,902 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 325 nodes · 384 edges · 65 communities (31 shown, 34 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.92)
- Token cost: 1,900 input · 2,800 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Auth & Scanner Screens|Auth & Scanner Screens]]
- [[_COMMUNITY_UI Components & Landing|UI Components & Landing]]
- [[_COMMUNITY_App Shell & Firebase|App Shell & Firebase]]
- [[_COMMUNITY_Dependencies|Dependencies]]
- [[_COMMUNITY_Team & Event Media|Team & Event Media]]
- [[_COMMUNITY_Package Configuration|Package Configuration]]
- [[_COMMUNITY_Project Documentation|Project Documentation]]
- [[_COMMUNITY_Interactive Components|Interactive Components]]
- [[_COMMUNITY_CommitGraph Background|CommitGraph Background]]
- [[_COMMUNITY_PWA Manifest|PWA Manifest]]
- [[_COMMUNITY_PaperTexture Background|PaperTexture Background]]
- [[_COMMUNITY_Firebase Service Worker|Firebase Service Worker]]
- [[_COMMUNITY_DSA Event|DSA Event]]
- [[_COMMUNITY_Epoch 4.0 Event|Epoch 4.0 Event]]
- [[_COMMUNITY_Epoch Coins System|Epoch Coins System]]
- [[_COMMUNITY_Gaming Tournament|Gaming Tournament]]
- [[_COMMUNITY_GFG Coding Contest|GFG Coding Contest]]
- [[_COMMUNITY_Gitam University|Gitam University]]
- [[_COMMUNITY_GitHub Pages Workshop|GitHub Pages Workshop]]
- [[_COMMUNITY_Open Source Workshop|Open Source Workshop]]
- [[_COMMUNITY_Test Image JPG|Test Image JPG]]
- [[_COMMUNITY_Test Image WebP|Test Image WebP]]
- [[_COMMUNITY_Venkat Sai JPG|Venkat Sai JPG]]
- [[_COMMUNITY_Venkat Sai WebP|Venkat Sai WebP]]
- [[_COMMUNITY_Epoch Logo|Epoch Logo]]
- [[_COMMUNITY_Event Photo 1|Event Photo 1]]
- [[_COMMUNITY_Event Photo 2|Event Photo 2]]
- [[_COMMUNITY_Event Photo 3|Event Photo 3]]
- [[_COMMUNITY_Event Photo 4|Event Photo 4]]
- [[_COMMUNITY_Event Description|Event Description]]
- [[_COMMUNITY_Gitam Logo|Gitam Logo]]
- [[_COMMUNITY_Gitcoin Logo|Gitcoin Logo]]
- [[_COMMUNITY_Gitcoin Logo Nobg|Gitcoin Logo Nobg]]
- [[_COMMUNITY_Github Logo PNG|Github Logo PNG]]
- [[_COMMUNITY_Github Logo WebP|Github Logo WebP]]
- [[_COMMUNITY_Lakshmi Core Photo|Lakshmi Core Photo]]
- [[_COMMUNITY_Lechakrawarthy Photo|Lechakrawarthy Photo]]
- [[_COMMUNITY_Logo Blue Cropped|Logo Blue Cropped]]
- [[_COMMUNITY_Logo Blue SVG|Logo Blue SVG]]
- [[_COMMUNITY_Ram Photo|Ram Photo]]
- [[_COMMUNITY_Sai Laghuvar Photo|Sai Laghuvar Photo]]
- [[_COMMUNITY_Santosh Photo|Santosh Photo]]
- [[_COMMUNITY_Favicon Dark|Favicon Dark]]
- [[_COMMUNITY_Venkat Sai Person|Venkat Sai Person]]

## God Nodes (most connected - your core abstractions)
1. `Raxios` - 12 edges
2. `Epoch 4.0` - 12 edges
3. `checkAccess()` - 10 edges
4. `useDeviceType()` - 9 edges
5. `GitCoin()` - 6 edges
6. `ErrorBoundary` - 6 edges
7. `scripts` - 5 edges
8. `App()` - 5 edges
9. `useScrollPosition()` - 5 edges
10. `GiantPopup()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Gitam EPOCH 4.0 Website` --describes_website_for--> `Epoch 4.0`  [EXTRACTED]
  README.md → poa.md
- `Gitam Github EPOCH Website Entry` --represents_event_website--> `Epoch 4.0`  [EXTRACTED]
  public/index.html → poa.md
- `LotteryQR()` --calls--> `checkAccess()`  [EXTRACTED]
  src/screens/LotteryQR/index.js → src/utils/auth.js
- `Notify()` --calls--> `checkAccess()`  [EXTRACTED]
  src/screens/Notify/index.js → src/utils/auth.js
- `PaymentScannerPage()` --calls--> `checkAccess()`  [EXTRACTED]
  src/screens/Scanner/index.js → src/utils/auth.js

## Import Cycles
- 1-file cycle: `src/screens/About/About.js -> src/screens/About/About.js`

## Communities (65 total, 34 thin omitted)

### Community 0 - "Auth & Scanner Screens"
Cohesion: 0.09
Nodes (25): GitCoin(), AnimatedCharacters(), ForgotPasswordModal(), TermsModal(), LotteryQR(), Notify(), FailureModal(), PaymentScannerPage() (+17 more)

### Community 1 - "UI Components & Landing"
Cohesion: 0.09
Nodes (17): StarfieldBG(), UniverseBG(), ErrorBoundary, Header(), Slider(), useHoveredMenu(), Home(), useDeviceType() (+9 more)

### Community 2 - "App Shell & Firebase"
Cohesion: 0.09
Nodes (23): firebase, Account, App(), AuthPage, LotteryQR, Notify, protectedRoutes, Scanner (+15 more)

### Community 3 - "Dependencies"
Cohesion: 0.10
Nodes (21): dependencies, antd, axios, framer-motion, lucide-react, qrcode, react, react-dom (+13 more)

### Community 4 - "Team & Event Media"
Cohesion: 0.11
Nodes (20): Epoch 4.0 Tech Fest, Gitcoin, 48h Notification - Epoch 4.0 Push Notification UI, Gitcoin Notification - GitCoin Credit Push Notification UI, Afreen D - Outreach Coordinator, Epoch 4.0, Anees - Content Manager, Epoch 4.0, Chandrika R - Content Manager, Epoch 4.0, Devi Priya - Outreach Manager, Epoch 4.0 (+12 more)

### Community 5 - "Package Configuration"
Cohesion: 0.11
Nodes (18): browserslist, development, production, devDependencies, autoprefixer, @babel/plugin-proposal-private-property-in-object, postcss, tailwindcss (+10 more)

### Community 6 - "Project Documentation"
Cohesion: 0.12
Nodes (17): DoSL, Epoch 4.0, Epoch Coins, Epoch Coins System, Flashmob, Gaming Tournament, GeeksforGeeks, GeeksforGeeks Contest (+9 more)

### Community 7 - "Interactive Components"
Cohesion: 0.27
Nodes (6): Peep(), PeepParent(), GiantPopup(), PlusIcon(), FAQ(), Intro()

### Community 8 - "CommitGraph Background"
Cohesion: 0.24
Nodes (5): buildWordMask(), clamp(), CommitGraphBG(), FONT_5X7, CommitGraphSection()

### Community 9 - "PWA Manifest"
Cohesion: 0.25
Nodes (7): background_color, display, icons, name, short_name, start_url, theme_color

## Knowledge Gaps
- **108 isolated node(s):** `name`, `version`, `private`, `@tailwindcss/aspect-ratio`, `@tailwindcss/forms` (+103 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **34 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Dependencies` to `App Shell & Firebase`, `Package Configuration`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Why does `firebase` connect `App Shell & Firebase` to `Dependencies`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Why does `Raxios` connect `Auth & Scanner Screens` to `App Shell & Firebase`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Are the 9 inferred relationships involving `Epoch 4.0 Tech Fest` (e.g. with `48h Notification - Epoch 4.0 Push Notification UI` and `Gitcoin Notification - GitCoin Credit Push Notification UI`) actually correct?**
  _`Epoch 4.0 Tech Fest` has 9 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _109 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Auth & Scanner Screens` be split into smaller, more focused modules?**
  _Cohesion score 0.08776595744680851 - nodes in this community are weakly interconnected._
- **Should `UI Components & Landing` be split into smaller, more focused modules?**
  _Cohesion score 0.08717948717948718 - nodes in this community are weakly interconnected._