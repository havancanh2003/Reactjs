import Header from "./Header";

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <div style={{ padding: "0 5%" }} className="container">{children}</div>
    </div>
  );
}

export default DefaultLayout;
