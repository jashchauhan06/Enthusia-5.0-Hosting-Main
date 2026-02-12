import { SITank } from "./SITank";
import { BrowserRouter } from "react-router-dom";

// Standard Footer replacement for standalone
const SimpleFooter = () => (
    <footer className="w-full py-10 bg-[#0d0b09] text-center border-t border-[#5c4d3c]">
        <p className="text-[#a89070] font-mono text-sm">© 2026 SITank. All Rights Reserved.</p>
    </footer>
);

function MainApp() {
    return (
        <div className="flex min-h-svh flex-col bg-[#120f0d] text-[#e8d5b5]">
            <SITank />
            <SimpleFooter />
        </div>
    )
}

export default function App() {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <MainApp />
        </BrowserRouter>
    );
}
