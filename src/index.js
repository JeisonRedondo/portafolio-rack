import React from "react";
import ReactDOM from "react-dom/client";

const root = React.createRoot(document.getElementbyId("root"));

function App() {
  return (
    <div>
      <h1>Hello, React con el Jeison</h1>
    </div>
  );
}

root.render(<App />);
