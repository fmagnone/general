const app = document.getElementById("app");

function Header() {
  return <h1> Develop. Preview. Ship. Icon: 🚀 </h1>;
}
function HomePage() {
  return (
    <div>
      {/* Nesting the Header component */}
      <Header />
    </div>
  );
}

ReactDOM.render(<HomePage />, app);
