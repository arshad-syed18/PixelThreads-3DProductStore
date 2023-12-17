import { useState } from "react";
import Canvas from "./canvas"
import Customizer from "./pages/Customizer"
import Home from "./pages/Home"

function App() {
  const [mouseMovement, setMouseMovement] = useState(false);

  const handleMouseMove = () => {
    setMouseMovement(!mouseMovement);
    console.log(!mouseMovement);
  }

  return (
    <main className="app transition-all ease-in">
      <Home />
      <Canvas mouseMovement={mouseMovement} />
      <Customizer mouseMovement={mouseMovement} handleMouseMove={handleMouseMove} />
    </main>
  )
}

export default App
