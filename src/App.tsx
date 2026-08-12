import "./App.css";

import { useMediaQuery } from "./demo/useMediaQuery";
import { StyledSidebar } from "./demo/StyledSidebar";

function App() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <div className={`flex h-screen ${isMobile ? "flex-col" : "flex-row"}`}>
      <StyledSidebar isMobile={isMobile} />

      <main className="flex min-h-0 min-w-0 flex-1 items-center justify-center bg-stone-50 text-stone-500">
        Main content
      </main>
    </div>
  );
}

export default App;
