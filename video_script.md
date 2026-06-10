[Visual]
Screen showing the HomePage of College Sathi. Highlight the clean navigation bar with the unified search and the predictor tool.

[Audio]
"Hi, I'm Rohan. This is College Sathi, a full-stack platform I built to help students discover and compare colleges. I'm going to give you a quick walkthrough of the features and explain the architecture and engineering decisions behind them."

[Visual]
Hover over the 'Discover' tab in the navbar to reveal the mega-menu dropdown (Engineering, Medicine, etc.). Then navigate to the Login Page, showing the background image and the Google/GitHub buttons.

[Audio]
"Let's start with authentication. Users can log in quickly using OAuth via Google or GitHub. From an architecture standpoint, delegating authentication to established OAuth providers was a deliberate decision. The tradeoff here is that we rely on third-party uptime, but in exchange, we avoid the security risks of storing passwords and offer a much smoother onboarding experience. An edge case I had to handle here is failed auth callbacks—if the provider times out or the user cancels the login midway, the app catches the error and gracefully returns them to the login screen with a friendly message instead of a broken redirect page."

[Visual]
Navigate to the 'Top Colleges This Season' listing page. Use the sidebar filters on the left—adjust the Fee Range slider and check a Location box. 

[Audio]
"Once logged in, you hit the discovery engine. The UI updates instantly as you apply sidebar filters like fee ranges and locations. From an architecture standpoint, I chose to process this filtering on the client to ensure zero-latency updates. The tradeoff is that while it's incredibly fast for our current dataset, it will require moving to server-side processing as the database scales. An edge case I handled here was mutually exclusive filters—if a user selects filters that contradict each other, the system instantly renders a clean 'No Results Found' state instead of breaking the UI."

[Visual]
Click into a specific college (like IIT Madras or IIM Ahmedabad) to open its Details page.

[Audio]
"Clicking into a college brings up the details and analytics. Building data visualizations comes with its own edge cases, primarily around missing data. Real-world APIs are rarely perfect. I built the frontend components to be resilient; if the backend returns null or missing data for a specific metric, the component gracefully hides that section rather than throwing a render error that ruins the user experience."

[Visual]
Navigate to the Compare Colleges page. Show the side-by-side table of two colleges (e.g., IIM Ahmedabad and IIT Madras). Point out the green 'BEST' badges highlighting the winning metrics.

[Audio]
"This is the Compare Tool. Notice the dynamic logic that automatically calculates and tags the 'BEST' metric between the chosen colleges. Building this required managing complex state across different routes so the app remembers which colleges you pinned. A major edge case here is mobile responsiveness. Comparing large data tables on a phone is notoriously difficult. To solve this, I designed the layout to automatically detect screen size and stack the comparison columns vertically on smaller devices, ensuring the data remains readable."

[Visual]
Navigate back to the Home page or the Expert Counselling section.

[Audio]
"Stepping back to the overall architecture, I intentionally separated the frontend presentation layer from the backend logic to keep the codebase modular. This makes the system scalable and allows the APIs to be reused in the future. That covers the core features, tradeoffs, and edge cases I tackled while building College Sathi. Thank you."
