# React.js Interview Question List — Basic → Intermediate → SDE1

This list is organized by topic/sub-topic within each difficulty level, so you can study one concept at a time instead of jumping around. Questions marked **🔥 Frequently Asked** are ones that repeatedly show up across GeeksforGeeks, Glassdoor candidate-submitted interview experiences, Coding Ninjas (Naukri Code360), and general SDE1 frontend rounds — based on the research done for this list (sources at the bottom).

Every answer here is written to be technically accurate — if something has a common misconception attached to it, that's called out explicitly.

---

## LEVEL 1 — BASIC

### Topic 1.1 — Introduction to React & JSX

1. **What is React, and why is it used?** 🔥
   React is a JavaScript library (not a full framework) for building user interfaces, mainly single-page applications, using a component-based architecture. It's used because it makes UI updates efficient and predictable through the Virtual DOM and a one-way data flow.

2. **What is JSX?** 🔥
   JSX (JavaScript XML) is a syntax extension that lets you write HTML-like code inside JavaScript. It is not understood by browsers directly — tools like Babel compile it into `React.createElement()` calls.

3. **Can a browser read JSX directly?**
   No. JSX must be transpiled (usually by Babel) into plain JavaScript (`React.createElement` calls) before the browser can run it.

4. **Why do we use `className` instead of `class` in JSX?**
   Because `class` is a reserved keyword in JavaScript, so JSX uses `className` to avoid a naming conflict, which then maps to the DOM's `class` attribute.

### Topic 1.2 — Components

5. **What is a component in React?** 🔥
   A component is a reusable, independent piece of UI — either a function or a class — that accepts inputs (props) and returns what should appear on the screen.

6. **What is the difference between functional and class components?** 🔥
   Functional components are plain JavaScript functions that return JSX and use Hooks for state/lifecycle. Class components extend `React.Component`, use `this.state`, and lifecycle methods like `componentDidMount`. Functional components with Hooks are the modern standard; class components are mostly seen in legacy codebases now.

7. **What is the difference between an Element and a Component?**
   An element is a plain object describing what to render (the output of `React.createElement`). A component is a function or class that returns elements.

### Topic 1.3 — Props and State

8. **What are props, and are they mutable or immutable?** 🔥
   Props ("properties") are read-only inputs passed from a parent component to a child. They are immutable from the child's perspective — a component must never modify its own props.

9. **What is state in React?** 🔥
   State is data that is local to a component and can change over time, causing the component to re-render when it's updated.

10. **What is the key difference between props and state?** 🔥
    Props are passed in from outside and are read-only; state is managed internally by the component itself and can be changed by that component (via `setState` or a `useState` setter).

11. **Why should you never mutate state directly (e.g., `this.state.value = 5`)?**
    Direct mutation doesn't trigger a re-render and can cause inconsistent UI, because React relies on detecting a *new* state reference to know it needs to update. Always use `setState`/the state setter function instead.

### Topic 1.4 — Events and Conditional Rendering

12. **How does event handling in React differ from plain HTML/DOM?**
    React uses camelCase event names (`onClick` instead of `onclick`) and passes a function reference rather than a string. Under the hood, React attaches a single listener at the root and uses event delegation (in React 17+, delegated to the root container rather than `document`).

13. **What are the different ways to do conditional rendering in React?** 🔥
    Common approaches: `if`/`else` statements before the `return`, the ternary operator (`condition ? A : B`), and the logical `&&` operator (`condition && <Component />`) for showing/hiding elements.

### Topic 1.5 — Lists and Keys

14. **Why does React need a `key` prop when rendering lists?** 🔥
    Keys help React identify which list items changed, were added, or were removed, so it can update the DOM efficiently instead of re-rendering the whole list.

15. **Why is using the array index as a key considered a bad practice?** 🔥
    If the list order changes (items added, removed, or reordered), index-based keys no longer point to the same logical item, which can cause React to mismatch state and UI between renders (a very common source of subtle bugs, especially with input fields inside a list).

### Topic 1.6 — Forms (Controlled Components)

16. **What is a controlled component?** 🔥
    A form input whose value is driven by React state — the input's `value` comes from state, and every change is handled through an `onChange` handler that updates that state.

17. **What is an uncontrolled component?**
    A form input that manages its own state internally in the DOM, and its value is read using a `ref` rather than through React state.

### Topic 1.7 — Lifting State Up

18. **What does "lifting state up" mean?** 🔥
    When two or more sibling components need to share the same changing data, you move that state up to their closest common parent, which then passes the data back down as props — instead of each sibling keeping its own separate, out-of-sync copy.

19. **How does data flow in React (one-way vs two-way binding)?** 🔥
    React uses one-way (unidirectional) data flow — data flows down from parent to child via props, and a child communicates back up by calling a function passed down to it (e.g., an `onChange` callback), rather than the child directly modifying the parent's state.

---

## LEVEL 2 — INTERMEDIATE

### Topic 2.1 — React Hooks

20. **What are Hooks, and why were they introduced?** 🔥
    Hooks are functions that let functional components use state and other React features (that were previously only available in class components), like `useState` and `useEffect`. They were introduced to make it easier to reuse stateful logic between components without patterns like Higher-Order Components or Render Props.

21. **What are the Rules of Hooks?** 🔥
    Only call Hooks at the top level of a function component (never inside loops, conditions, or nested functions), and only call Hooks from React function components or custom Hooks.

22. **What does the dependency array in `useEffect` control?** 🔥
    It tells React when to re-run the effect. An empty array (`[]`) means the effect runs once after the initial render only. Omitting the array means it runs after every render. Including variables means it re-runs whenever any of those variables change.

23. **What is a common mistake with `useEffect` dependencies?** 🔥
    Forgetting to include a variable the effect actually uses inside the dependency array, which causes the effect to keep using a stale (outdated) value from an earlier render — a very frequently asked "spot the bug" question.

24. **What is the difference between `useEffect` and `useLayoutEffect`?**
    `useEffect` runs asynchronously *after* the browser has painted the screen. `useLayoutEffect` runs synchronously *after* the DOM has been updated but *before* the browser paints — used when you need to measure/adjust the DOM before the user sees anything (e.g., avoiding a visual flicker).

25. **What does `useRef` do, and how is it different from state?** 🔥
    `useRef` returns a mutable object (`{ current: ... }`) that persists across renders. Unlike state, changing `.current` does **not** trigger a re-render. It's commonly used to access a DOM node directly or to store a mutable value that shouldn't cause a re-render.

26. **What is `useReducer`, and when would you use it instead of `useState`?**
    `useReducer` manages state using a reducer function `(state, action) => newState`, similar to Redux. It's preferred over `useState` when state logic is complex, has multiple sub-values, or when the next state depends heavily on the previous one.

### Topic 2.2 — Component Lifecycle

27. **What are the three phases of a React component's lifecycle?** 🔥
    Mounting (component is created and inserted into the DOM), Updating (re-rendered due to changed props/state), and Unmounting (component is removed from the DOM).

28. **How do you replicate `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` using Hooks?** 🔥
    All three can be handled with `useEffect`: an empty dependency array behaves like `componentDidMount`; including dependencies makes it also behave like `componentDidUpdate` for those values; and the function returned from inside `useEffect` (the cleanup function) behaves like `componentWillUnmount`.

### Topic 2.3 — Context API

29. **What problem does the Context API solve?** 🔥
    It solves "prop drilling" — having to pass props down through many intermediate components that don't need them, just so a deeply nested component can access them.

30. **What is a downside of using Context for frequently-changing values?**
    Every component consuming a Context re-renders whenever the Context value changes, even if that component only cares about part of the value — this can hurt performance if not managed carefully (e.g., by splitting contexts or memoizing the value).

### Topic 2.4 — Routing

31. **What does React Router do, and why is it needed?**
    React itself has no built-in routing. React Router is a library that enables client-side navigation between different views/pages in a single-page application without a full page reload.

32. **What is the difference between `<Link>` and a plain `<a>` tag in React Router?**
    `<Link>` performs client-side navigation without a full page reload (preserving app state), while a plain `<a>` tag causes the browser to make a full request and reload the page.

### Topic 2.5 — Higher-Order Components, Render Props, Refs

33. **What is a Higher-Order Component (HOC)?** 🔥
    A function that takes a component as input and returns a new, enhanced component — used to reuse logic across multiple components (e.g., adding authentication checks or logging). Largely replaced by custom Hooks in modern React, but still a common theory question.

34. **What is the Render Props pattern?**
    A pattern where a component takes a function as a prop (often as its `children`) and calls that function to determine what to render, allowing logic to be shared between components.

35. **What is `forwardRef`, and why is it needed?**
    Refs aren't passed through props by default. `forwardRef` lets a parent component pass a `ref` down to a child so the parent can directly access a DOM node or component instance inside that child.

### Topic 2.6 — Error Boundaries, Fragments, Portals

36. **What is an Error Boundary?** 🔥
    A class component that implements `componentDidCatch` and/or `static getDerivedStateFromError`, used to catch JavaScript errors anywhere in its child component tree and show a fallback UI instead of crashing the whole app.

37. **What errors do Error Boundaries NOT catch?** 🔥 (a very common "gotcha" question)
    They do not catch errors inside event handlers, errors in asynchronous code (like `setTimeout` or `fetch` callbacks), errors during server-side rendering, or errors thrown in the error boundary's own code.

38. **What is a Fragment, and why use it instead of a `<div>`?**
    `<React.Fragment>` (or the shorthand `<>...</>`) lets you group multiple children without adding an extra node to the actual DOM — useful for avoiding unnecessary wrapper `<div>`s, especially in lists or table rows.

39. **What is a Portal, and when would you use one?** 🔥
    `ReactDOM.createPortal()` renders a component's children into a different DOM node outside its parent's DOM hierarchy, while it still behaves like a normal part of the React tree (e.g., event bubbling still works as expected). Commonly used for modals, tooltips, and dropdowns that need to visually escape a parent with `overflow: hidden`.

### Topic 2.7 — Virtual DOM and Reconciliation

40. **What is the Virtual DOM?** 🔥
    A lightweight, in-memory JavaScript representation of the real DOM. React uses it to figure out the minimum number of changes needed before touching the actual (slower) browser DOM.

41. **What is reconciliation?** 🔥
    The process where React compares ("diffs") the new Virtual DOM tree against the previous one, figures out exactly what changed, and applies only those minimal changes to the real DOM — instead of re-rendering the entire page.

42. **What is React Fiber?**
    The reconciliation engine introduced in React 16. It restructures rendering work into small units that can be paused, resumed, or discarded, which enables features like prioritizing urgent updates over less important ones.

### Topic 2.8 — Pure Components, Strict Mode, and Type Checking

43. **What is `React.PureComponent`?**
    A class component base that automatically implements a shallow comparison of props and state in `shouldComponentUpdate`, skipping re-renders when neither has actually changed — the class-component equivalent of wrapping a functional component in `React.memo`.

44. **What is `<React.StrictMode>`, and does it affect production behavior?** 🔥
    A development-only tool that helps surface potential problems (like unsafe lifecycle usage or side effects in render) by intentionally double-invoking certain functions (like component render and some effects) in development. It renders nothing visible and has **no effect in production builds**.

45. **What is the difference between using PropTypes and using TypeScript for type checking in React?**
    PropTypes check prop types **at runtime**, only while the app is actually running, and only for props (with a small performance cost). TypeScript checks types **at compile time**, catching a much wider range of errors (not just props) before the code ever runs, which is why most modern React codebases prefer TypeScript over PropTypes.

---

## LEVEL 3 — SDE1

### Topic 3.1 — Performance Optimization

46. **What does `React.memo` do?** 🔥
    It's a higher-order component that memoizes a functional component — React will skip re-rendering it if its props haven't changed (shallow comparison by default; you can pass a custom comparison function as a second argument).

47. **What is the difference between `useMemo` and `useCallback`?** 🔥 (one of the single most frequently asked React questions)
    `useMemo` memoizes the **result of a computation** (a value), recomputing it only when its dependencies change. `useCallback` memoizes a **function reference itself**, so it doesn't get recreated on every render — this matters mainly when passing that function down to a memoized child component (`React.memo`), to avoid causing it to re-render unnecessarily.

48. **Does using `useCallback` automatically prevent re-renders?** 🔥
    No, by itself it only keeps the function reference stable. It only actually prevents a child's re-render when that child is wrapped in `React.memo` too — the two are meant to be used together.

49. **Can overusing `useMemo`/`useCallback` hurt performance?**
    Yes. Every memoized value still costs React some work to check dependencies and store the cache. Using them for cheap computations or where the function isn't passed to a memoized child adds overhead without benefit.

50. **What is code-splitting, and how is it done in React?** 🔥
    Code-splitting breaks the JavaScript bundle into smaller chunks that load on demand instead of all at once, reducing initial load time. In React, this is commonly done with `React.lazy()` combined with `<Suspense>` to show a fallback while the chunk loads.

51. **What is windowing/virtualization, and when would you use it?**
    A technique (via libraries like `react-window` or `react-virtualized`) that only renders the list items currently visible in the viewport instead of the entire list — important for performance when rendering very large lists.

### Topic 3.2 — State Management

52. **When would you reach for Redux instead of just Context + useState?** 🔥
    When the app has complex, frequently-changing global state shared across many unrelated components, needs predictable state transitions (time-travel debugging, middleware for logging/async logic), or when Context re-render performance becomes a real problem.

53. **What are the core building blocks of Redux?** 🔥
    Store (holds the entire state tree), Actions (plain objects describing what happened), Reducers (pure functions that compute the next state from the current state and an action), and `dispatch` (the only way to trigger a state change).

54. **What is Redux Toolkit (RTK), and why is it the recommended approach today?**
    Redux Toolkit is the official, opinionated way to write Redux logic. It reduces boilerplate through `createSlice` (combines actions + reducers) and `configureStore`, and includes good defaults like Immer (so you can "mutate" state in reducers safely) and Redux DevTools support out of the box.

### Topic 3.3 — Custom Hooks

55. **What is a custom Hook?** 🔥
    A JavaScript function whose name starts with `use` and that calls other Hooks inside it, used to extract and reuse stateful logic across multiple components without duplicating code or resorting to HOCs/Render Props.

56. **Write/explain a `useDebounce` custom Hook.** 🔥 (frequent machine-coding question)
    It takes a value and a delay, stores a debounced copy in state, and uses `useEffect` with `setTimeout` to update that state only after the delay has passed without the input changing again — with a cleanup function that clears the timeout if the value changes before the delay finishes. Commonly used for search-as-you-type inputs to avoid firing an API call on every keystroke.

### Topic 3.4 — Testing

57. **What is React Testing Library (RTL), and how is its philosophy different from older tools like Enzyme?** 🔥
    RTL encourages testing components the way a user would actually interact with them (finding elements by visible text/role, simulating clicks) rather than testing internal implementation details (like component instance state), which makes tests less brittle to refactors.

58. **What's the difference between `fireEvent` and `userEvent` in RTL?**
    `fireEvent` dispatches a single, low-level DOM event. `userEvent` simulates a fuller, more realistic sequence of events (e.g., typing simulates individual keydown/keypress/input events per character), closer to real user behavior.

### Topic 3.5 — Security

59. **What is `dangerouslySetInnerHTML`, and why is it risky?** 🔥
    It lets you set an element's inner HTML directly from a string, bypassing React's usual escaping. If that string comes from user input or an untrusted source without sanitization, it can introduce a Cross-Site Scripting (XSS) vulnerability.

60. **Does React automatically protect against XSS?**
    React automatically escapes any values embedded in JSX as text content before rendering, which prevents the most common XSS pattern. However, this protection does **not** extend to `dangerouslySetInnerHTML` or to unsanitized values placed in dangerous attributes (like an `href` containing `javascript:`).

### Topic 3.6 — Machine Coding / Practical Rounds

These are frequently asked as live coding exercises in SDE1 rounds (confirmed as a common Glassdoor/GFG pattern), not just theory:

61. **Build a search box that only calls the API after the user stops typing for 300ms.** 🔥
    Solved using the `useDebounce` custom Hook pattern above.

62. **Build an infinite-scroll list that loads more items as the user scrolls down.** 🔥
    The modern, efficient approach uses the `IntersectionObserver` API watching a sentinel element at the bottom of the list, fetching the next page when it becomes visible — this avoids the performance cost of listening to raw scroll events.

63. **Build a simple counter/Todo app using only `useState`.**
    A standard warm-up exercise to check basic comfort with state updates, list rendering, and controlled form inputs together.

### Topic 3.7 — React 18 / React 19 (recent, increasingly asked at SDE1 level)

64. **What is automatic batching in React 18?**
    React 18 batches multiple state updates into a single re-render even when they happen inside promises, `setTimeout`, or native event handlers — previously (React 17 and earlier), batching only happened inside React event handlers.

65. **What is `startTransition`/`useTransition` used for?**
    They let you mark a state update as a lower-priority "transition" so React can keep the UI responsive (e.g., keep an input field typing smoothly) while a more expensive re-render (like filtering a large list) happens in the background.

66. **What are Server Components (React 19)?**
    Components that render entirely on the server, can directly access backend resources (like a database), and send the rendered result to the client while shipping zero JavaScript for that component — reducing bundle size for parts of the UI that don't need interactivity.

67. **What is the `use` Hook introduced in React 19?**
    A Hook that can read the value of a resource such as a Promise or Context. Unlike other Hooks, `use` can be called conditionally or inside loops, which regular Hooks are not allowed to do.

68. **What does the React Compiler do?**
    It's a build-time tool that automatically applies memoization-style optimizations to components, reducing the need to manually add `React.memo`, `useMemo`, and `useCallback` for performance in many common cases.

### Topic 3.8 — Server State / Data Fetching Libraries

69. **Why use a library like React Query (TanStack Query) instead of just `useEffect` + `fetch`?** 🔥
    It handles concerns that are tedious to build correctly by hand: caching, request deduplication, background refetching, loading/error states, and retry logic — all with far less boilerplate than a hand-rolled `useEffect` data-fetching setup.

70. **What is `staleTime` in React Query, and how is it different from cache time (`gcTime`)?**
    `staleTime` controls how long fetched data is considered "fresh" before React Query will refetch it in the background on the next relevant trigger (defaults to `0`, meaning instantly stale). `gcTime` (previously called `cacheTime`) controls how long unused/inactive data stays in memory before being garbage-collected entirely.

71. **What is a common pitfall when using React Query with server-side rendering?**
    Because `staleTime` defaults to `0`, a query rendered on the server can immediately refetch on the client after hydration, causing a redundant duplicate fetch — this is avoided by setting an appropriate `staleTime` and dehydrating/hydrating the same query state on both server and client.

### Topic 3.9 — Design Patterns

72. **What is the Container/Presentational pattern?** 🔥
    Separating a component into a "container" that handles data-fetching/state/logic, and a "presentational" component that only receives data via props and focuses purely on rendering UI. In modern React, the container role is often played by a custom Hook rather than a separate wrapper component.

73. **What is the Compound Components pattern?**
    A pattern where a parent component implicitly shares state/behavior with a set of child components (e.g., `<Select><Select.Option /></Select>`), letting the consumer compose the pieces flexibly while the parent coordinates them internally, typically via Context.

74. **What is the Provider pattern?**
    Using a Context Provider at a high level in the component tree to make shared data or functions available to any descendant component that needs them, without manually threading props through every intermediate level.

### Topic 3.10 — Accessibility (a11y)

75. **Why does accessibility matter in a React interview context?**
    It shows awareness that the UI needs to work for users relying on screen readers, keyboards, or assistive tech — a growing expectation at the SDE1 level, not just a "nice to have."

76. **Name a few basic accessibility practices in React.** 🔥
    Using semantic HTML elements instead of generic `<div>`s wherever possible, adding proper `alt` text on images, ensuring interactive elements are reachable and operable via keyboard (not just mouse/click), and using ARIA attributes only when semantic HTML genuinely can't express the intent.

### Topic 3.11 — LeetCode-Style JavaScript Machine Coding Questions

These are described as "the front-end version of LeetCode questions" — less about complex algorithms, more about practical utility functions used every day in React apps. They repeat constantly across Meta, Amazon, and general frontend interview loops.

77. **Implement `debounce(fn, delay)` from scratch.** 🔥
    Returns a wrapped function that clears any pending timer and starts a new one on every call, only actually invoking `fn` once no new call has happened for `delay` milliseconds. This is the same pattern behind the `useDebounce` custom Hook in Topic 3.3.

78. **Implement `throttle(fn, limit)` from scratch, and explain how it differs from debounce.** 🔥
    Throttle ensures `fn` runs at most once every `limit` milliseconds no matter how many times it's called, useful for things like scroll/resize handlers. Debounce waits for a pause in calls before running once; throttle runs at a steady, capped rate the whole time calls keep coming in.

79. **Implement a deep clone function for a nested object/array.** 🔥
    Needs to recursively copy nested objects/arrays rather than just copying references (which is all a shallow copy like `{...obj}` or `Object.assign` does) — a common follow-up is asking about edge cases like circular references, `Date` objects, or `Map`/`Set`.

80. **Implement `curry(fn)` — function currying.**
    Transforms a function that takes multiple arguments into a sequence of functions that each take a single argument (or fewer arguments), returning a new function until all original arguments have been supplied.

81. **Implement your own version of `Array.prototype.flat(depth)`.**
    Recursively flattens nested arrays up to the given depth — a recursion-pattern question that often comes paired with deep clone and deep equal.

82. **Implement a `memoize(fn)` higher-order function.**
    Wraps a function so that calling it again with the same arguments returns a cached result instead of recomputing — typically implemented using a closure over a cache (often a `Map`, keyed by a serialized form of the arguments).

### Topic 3.12 — FAANG / Company-Specific Interview Experience Questions

These are drawn from publicly reported candidate interview experiences on Glassdoor and similar sources — flagged by company where a specific example is attributed to them.

83. **(Meta) What data structure is the DOM based on? For a balanced tree with `n` nodes, roughly how many levels does it have?** 🔥
    The DOM is a tree. For a balanced tree of `n` nodes, the number of levels is roughly `log(n)` (base equal to the average branching factor) — the same logic as levels in a balanced binary/n-ary tree.

84. **(Meta) Given two identical DOM tree structures A and B, and a node from A, find the corresponding node in B.**
    A common approach: record the path from the given node up to the root of tree A (e.g., the sequence of child indices at each level), then walk that same recorded path down from the root of tree B.

85. **(Meta) Frontend system design: design an infinite-scrolling feed (like a Facebook feed) or a feature like Instagram Stories.** 🔥
    At this level, interviewers expect a discussion of cursor/pagination-based fetching, virtualization so only visible items are rendered, caching pages already loaded, optimistic UI updates, and how you'd structure state for a list that grows without bound.

86. **(Amazon) Why would a React component render twice on a single state update in development, but not in production?** 🔥
    This is almost always `<React.StrictMode>` intentionally double-invoking component functions (and some effects) in development only, to help surface accidental side effects — it does not happen in a production build.

87. **(Amazon) What is the difference between the Macrotask Queue and the Microtask Queue in the JavaScript event loop, and why does it matter for rendering?**
    All pending microtasks (like resolved Promise callbacks) run to completion before the next macrotask (like a `setTimeout` callback) — which is why Promise-based code consistently runs before a `setTimeout(fn, 0)` callback scheduled around the same time, and why long microtask chains can delay a browser repaint.

88. **(Amazon) How would you handle a CORS error coming from your frontend calling an API?**
    A frontend app cannot bypass CORS on its own — cross-origin access must be explicitly permitted by the backend server's response headers (like `Access-Control-Allow-Origin`). The right answer here is explaining *why* the browser blocks it and that it needs to be fixed server-side, not attempting a client-side workaround.

### A note on Red Hat

Publicly available interview-experience data (Glassdoor) for Red Hat's Software Developer role does not show React-specific questions — reported rounds there emphasize cloud migration, Python, Shell/Linux, and scenario-based technical questions rather than a dedicated frontend/React track. If you're specifically interviewing for a frontend/React role at Red Hat, the Basic → SDE1 topics above are still the right preparation, but there isn't verifiable public data to add genuine Red-Hat-specific React questions here — and this list won't invent any just to fill a gap.

---

## How to use this list effectively

- Go through **Basic** first even if you feel confident — several "easy" questions (like the `useEffect` dependency array gotcha, or index-as-key) are exactly where candidates lose points at every level.
- For the **SDE1** section, be ready to actually write code for Topic 3.6 on a shared editor or whiteboard, not just explain it verbally.
- If asked a question you don't know, it's better to reason out loud about how you'd figure it out (e.g., "I'd check the docs for X, but my understanding is...") than to guess confidently and be wrong — interviewers at this level are also evaluating how you think, not just memorized answers.

---

## Sources

This list was compiled after reviewing current React interview-question coverage and reported interview experiences from:

- [Top 60+ React Interview Questions and Answers - GeeksforGeeks](https://www.geeksforgeeks.org/reactjs/react-interview-questions/)
- [React Interview Questions and Answers – Intermediate Level - GeeksforGeeks](https://www.geeksforgeeks.org/reactjs-interview-questions-and-answers-intermediate-level/)
- [Top 30+ React Interview Questions and Answers - Advanced Level - GeeksforGeeks](https://www.geeksforgeeks.org/reactjs/reactjs-interview-question-and-answers-advance-level/)
- [Top 30+ React Hooks Interview Questions & Answers - GeeksforGeeks](https://www.geeksforgeeks.org/top-react-hooks-interview-questions-answers/)
- [Code 360 (Coding Ninjas / Naukri) - ReactJS Interview Questions](https://www.naukri.com/code360/library/reactjs-interview-questions)
- [React js developer Interview Questions - Glassdoor](https://www.glassdoor.com/Interview/react-js-developer-interview-questions-SRCH_KO0,18.htm)
- [React developer Interview Questions - Glassdoor](https://www.glassdoor.com/Interview/react-developer-interview-questions-SRCH_KO0,15.htm)
- [100+ React Interview Questions Straight from Ex-interviewers (2026) - GreatFrontEnd](https://www.greatfrontend.com/blog/100-react-interview-questions-straight-from-ex-interviewers)
- [30 Essential React Hooks Interview Questions - GreatFrontEnd](https://www.greatfrontend.com/blog/30-essential-react-hooks-interview-questions-you-must-know)
- [70+ React Interview Questions and Answers (2026) - InterviewBit](https://www.interviewbit.com/react-interview-questions/)
- [React 19 : New Features and Updates - GeeksforGeeks](https://www.geeksforgeeks.org/reactjs/react-19-new-features-and-updates/)
- [20+ Frontend Machine Coding Interview Questions (JS + React) - FrontendGeek](https://www.frontendgeek.com/blogs/20-frontend-machine-coding-interview-questions-js-react)
- [Design Patterns for React Interviews - GreatFrontEnd](https://www.greatfrontend.com/react-interview-playbook/react-design-patterns)
- [Container and Presentational pattern in React - LearnersBucket](https://learnersbucket.com/examples/interview/container-and-presentational-pattern-in-react/)
- [Server Rendering & Hydration - TanStack Query Docs](https://tanstack.com/query/v5/docs/framework/react/guides/ssr)
- [20+ Frontend Machine Coding Interview Questions (JS + React) - FrontendGeek](https://www.frontendgeek.com/blogs/20-frontend-machine-coding-interview-questions-js-react)
- [JavaScript Interview Questions (Machine Coding) - Front End Interview Handbook](https://www.frontendinterviewhandbook.com/coding/javascript-utility-function)
- [Meta Interview Experience & Questions - Glassdoor](https://www.glassdoor.com/Interview/Meta-Front-End-Engineer-Interview-Questions-EI_IE40772.0,4_KO5,23.htm)
- [Meta Front End Engineer Interview (questions, process, prep) - IGotAnOffer](https://igotanoffer.com/blogs/tech/facebook-front-end-engineer-interview)
- [Amazon Front End Developer Interview Experience & Questions - Glassdoor](https://www.glassdoor.com/Interview/Amazon-Front-End-Developer-Interview-Questions-EI_IE6036.0,6_KO7,26.htm)
- [Amazon Front End Interview Questions - Front End Interview Handbook](https://www.frontendinterviewhandbook.com/companies/amazon-front-end-interview-questions)
- [Red Hat Software Developer Interview Experience & Questions - Glassdoor](https://www.glassdoor.com/Interview/Red-Hat-Software-Developer-Interview-Questions-EI_IE8868.0,7_KO8,26.htm)
